/*
  Clear transactional CRM data for ALL tenants.
  - Keeps identity tables (users/roles/tenants/permissions).
  - Keeps master/reference data (lead statuses, stages, assignment rules).
  - Removes CRM transactional records only.
  - Safe to run repeatedly.
*/

SET NOCOUNT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    /* CRM transactional */
    DELETE FROM [crm].[LeadStatusHistories];
    DELETE FROM [crm].[OpportunityStageHistories];
    DELETE FROM [crm].[Activities];
    DELETE FROM [crm].[AuditEvents];
    DELETE FROM [crm].[Attachments];
    DELETE FROM [crm].[CustomFieldValues];
    DELETE FROM [crm].[Leads];
    DELETE FROM [crm].[Opportunities];
    DELETE FROM [crm].[Contacts];
    DELETE FROM [crm].[Accounts];
    DELETE FROM [crm].[ImportJobs];

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
