# Salesforce CDC Integration Runbook

> **Doc Role**
> - **Category**: Operational Guide
> - **Source of truth**: No
> - **Canonical reference**: `docs/PROJECT_MASTER.md`
> - **Owner**: Engineering
> - **Created**: May 31, 2026

This runbook records the local Salesforce Change Data Capture spike completed in `SalesForceCdsSubscriber`. It is intended as a reusable reference for bringing Salesforce Account/Contact change ingestion into the CRM Enterprise application.

Do not store Salesforce client secrets, passwords, security tokens, access tokens, or replay checkpoints in this document.

---

## Proven Outcome

The local .NET worker successfully:

1. Authenticated to Salesforce without browser login by using OAuth client credentials flow.
2. Queried Salesforce REST API:
   ```sql
   SELECT Id, Name FROM Account LIMIT 1
   ```
3. Connected to Salesforce CometD:
   ```text
   /cometd/60.0
   ```
4. Subscribed to:
   ```text
   /data/AccountChangeEvent
   /data/ContactChangeEvent
   ```
5. Received Account CDC events for create and update operations.
6. Logged changed fields and changed values from the CDC payload.

Observed examples:

```text
Account CREATE, replayId 843540
Account UPDATE, replayId 843542, ChangedValues: Rating=Hot
Account UPDATE, replayId 843543, ChangedValues: Rating=Cold
Account UPDATE, replayId 843545, ChangedValues: Website=www.northedgesystem.com, Ownership=Private
```

---

## Salesforce Configuration

### External Client App

The Salesforce app used in the spike was an External Client App configured for no-browser server-to-server access.

Required OAuth scope:

```text
Manage user data via APIs (api)
```

Avoid granting `Full access (full)` for production unless there is a temporary debugging need. For long-term operation, keep the OAuth scope narrow and restrict the Run As user permissions.

### Client Credentials Flow

Enable:

```text
Enable Client Credentials Flow
```

Then configure the client credentials Run As user on the app policies/manage page:

```text
Run As = Salesforce integration user
```

The spike failed until a Run As user was configured. Salesforce returned:

```json
{"error":"invalid_grant","error_description":"no client credentials user enabled"}
```

### Login URL

Client credentials flow must use the Salesforce My Domain URL, not the generic login URL.

Pattern:

```text
https://<my-domain>.my.salesforce.com
```

Local spike value:

```text
https://orgfarm-f2e3f12343-dev-ed.develop.my.salesforce.com
```

### Change Data Capture

In Salesforce Setup, enable Change Data Capture for:

```text
Account
Contact
```

That enables:

```text
/data/AccountChangeEvent
/data/ContactChangeEvent
```

---

## Local Spike Implementation

Local project:

```text
/Users/yasserahmed/Desktop/Development Projects/SalesForceCdsSubscriber
```

Important files:

```text
SalesforceAuthService.cs
SalesforceRestService.cs
SalesforceCdcService.cs
Worker.cs
Program.cs
appsettings.Development.json
```

Packages already present:

```text
Microsoft.Extensions.Hosting
Microsoft.Extensions.Http
Newtonsoft.Json
```

### appsettings.Development.json Shape

Do not commit real secrets.

```json
{
  "Salesforce": {
    "LoginUrl": "https://<my-domain>.my.salesforce.com",
    "ClientId": "<consumer-key>",
    "ClientSecret": "<consumer-secret>",
    "ReplayFrom": -2
  }
}
```

`ReplayFrom` was set to `-2` during the spike so retained events are replayed during local testing. For production, persist replay IDs and resume from the last processed replay ID per channel.

### Auth Request

The working token request uses:

```text
POST /services/oauth2/token
grant_type=client_credentials
client_id=<consumer-key>
client_secret=<consumer-secret>
```

The old username/password flow was intentionally abandoned. It failed under the current Salesforce External Client App setup and is not preferred for this worker.

### REST Verification

Before CDC, verify the token can call REST:

```http
GET /services/data/v60.0/query?q=SELECT%20Id%2C%20Name%20FROM%20Account%20LIMIT%201
Authorization: Bearer <access-token>
```

The spike confirmed REST access by logging:

```text
Account: Edge Communications (001dL00002B563sQAB)
```

### CometD CDC Flow

CometD endpoint:

```text
https://<my-domain>.my.salesforce.com/cometd/60.0
```

Required sequence:

1. Handshake with long-polling support.
2. Include replay extension declaration:
   ```json
   {
     "ext": {
       "replay": true
     }
   }
   ```
3. Subscribe to Account and Contact CDC channels.
4. Include replay extension on subscribe:
   ```json
   {
     "ext": {
       "replay": {
         "/data/AccountChangeEvent": -2
       }
     }
   }
   ```
5. Call `/meta/connect` in a long-poll loop.

Important implementation lesson: Salesforce can return data messages interleaved with meta subscribe responses. The subscriber must scan all returned messages and handle both:

```text
/meta/subscribe
/data/AccountChangeEvent
/data/ContactChangeEvent
```

The first CDC implementation assumed the first returned message was always the subscribe response, which caused a false failure when Salesforce returned an Account event during subscription.

---

## Event Payload Notes

CDC changed field names are available at:

```text
data.payload.ChangeEventHeader.changedFields
```

Record IDs are available at:

```text
data.payload.ChangeEventHeader.recordIds
```

Replay ID is available at:

```text
data.event.replayId
```

Changed values can be read directly from the payload by field name when Salesforce includes the field:

```text
data.payload.<FieldName>
```

Example:

```text
ChangedFields: Website, Ownership, LastModifiedDate
ChangedValues: Website=www.northedgesystem.com, Ownership=Private
```

`LastModifiedDate` is a system timestamp and should usually be ignored for business-change routing.

CDC gives the new value. It does not generally provide the old value. If old-versus-new comparison is needed, compare the CDC payload against the CRM staging table or current CRM record snapshot.

---

## Recommended CRM Enterprise Integration Direction

### Now

Move the spike into Infrastructure as a Salesforce integration boundary:

```text
CRM.Enterprise.Infrastructure/Integrations/Salesforce
```

Suggested abstractions:

```text
ISalesforceTokenProvider
ISalesforceRestClient
ISalesforceCdcSubscriber
ISalesforceCdcEventHandler
```

Suggested configuration:

```text
Salesforce:LoginUrl
Salesforce:ClientId
Salesforce:ClientSecret
Salesforce:ApiVersion
Salesforce:ReplayFrom
Salesforce:Channels
```

Store secrets in environment/App Service/Key Vault, not `appsettings*.json`.

### Next

Persist inbound events before applying CRM writes.

Suggested SQL staging table fields:

```text
Id
TenantId
SourceSystem
Channel
EntityName
ChangeType
ReplayId
RecordId
ChangedFieldsJson
PayloadJson
ReceivedAtUtc
ProcessedAtUtc
ProcessingStatus
ErrorMessage
```

Use the staging table to provide:

1. Replay safety.
2. Idempotency by channel + replay ID.
3. Error recovery.
4. Auditability.

### Later

Map Salesforce Account/Contact into CRM Enterprise domain records through application services, not direct database writes. Keep tenant resolution explicit because Salesforce records do not inherently know the CRM tenant.

Potential routing model:

```text
Salesforce Account -> CRM Customer/Account
Salesforce Contact -> CRM Contact
```

Before writing production sync logic, define field mapping, tenant mapping, duplicate handling, ownership rules, and conflict behavior.

---

## Production Cautions

1. Use least privilege for the Salesforce Run As user.
2. Do not use `full` OAuth scope unless temporarily debugging.
3. Persist replay IDs per channel.
4. Treat client credentials access tokens as short-lived and request new tokens as needed.
5. Add retry/backoff around token, REST, handshake, subscribe, and connect calls.
6. Handle CometD disconnect/advice responses.
7. Log replay IDs and record IDs, but avoid logging secrets or sensitive field values in production.
8. Keep CDC ingestion separate from ERP sync until Salesforce events are staged and observable.

---

## Verified Local Commands

From the spike project:

```bash
cd "/Users/yasserahmed/Desktop/Development Projects/SalesForceCdsSubscriber"
dotnet build
dotnet run
```

Expected successful startup logs:

```text
Connected to Salesforce
Instance URL: https://<my-domain>.my.salesforce.com
Salesforce CDC handshake successful
Subscribed to /data/AccountChangeEvent
Subscribed to /data/ContactChangeEvent
Listening for Salesforce CDC events
```
