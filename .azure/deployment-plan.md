# Azure Deployment Plan

## 1. Workspace Analysis
- Status: Complete
- Mode: MODIFY
- Summary: Existing CRM Enterprise monorepo with Angular client, ASP.NET Core API, and Dockerized local SQL Server.

## 2. Requirements
- Status: Complete
- Azure subscription: `Azure subscription 1` (`27558510-9159-4d04-a674-7bf3ec6fd5c6`)
- Azure account: `innolabspublic@gmail.com`
- Region: `canadacentral`
- Frontend hosting model: Azure App Service Linux
- Database authentication: standard SQL authentication with a single provided admin password stored securely in Azure configuration.

## 3. Codebase Scan
- Status: Complete
- Client: Angular 21 app in `client/`.
- API: ASP.NET Core 10 API in `server/src/CRM.Enterprise.Api`.
- Local SQL: Docker Compose uses SQL Server container on port 1433.
- Existing app config already contains Azure-oriented settings and connection-string placeholders.

## 4. Recipe Selection
- Status: Complete
- Recipe: Azure Developer CLI preparation with separate frontend and API hosting.

## 5. Architecture
- Status: Complete
- Frontend: Azure App Service on Linux hosting the Angular `client/` production server.
- API: Azure App Service on Linux running the ASP.NET Core API from `server/src/CRM.Enterprise.Api`.
- Database: Azure SQL Database in `canadacentral` with standard SQL authentication and a secret-managed admin password.
- Secrets: Azure App Service configuration / managed identity / Key Vault as needed; avoid hardcoded secrets in source control.
- Notes: Use the current repo structure without moving application code.

## 6. Final Plan
- Status: Ready for Validation
- Build and deploy the Angular client and ASP.NET Core API as separate Azure workloads in `canadacentral`.
- Provision Azure SQL Database for the API data layer with standard SQL authentication.
- Keep credentials out of the repo and reuse the authenticated Azure session for deployment setup.

## 7. Validation Proof
- Status: Pending
