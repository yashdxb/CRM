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
    DELETE FROM [crm].[AssistantMessages];
    DELETE FROM [crm].[AssistantThreads];
    DELETE FROM [crm].[Attachments];
    DELETE FROM [crm].[LeadStatusHistories];
    DELETE FROM [crm].[OpportunityStageHistories];
    DELETE FROM [crm].[OpportunityApprovals];
    DELETE FROM [crm].[OpportunityApprovalChains];
    DELETE FROM [crm].[OpportunityReviewChecklistItems];
    DELETE FROM [crm].[OpportunityOnboardingItems];
    DELETE FROM [crm].[OpportunityTeamMembers];
    DELETE FROM [crm].[Activities];
    DELETE FROM [crm].[CustomFieldValues];
    DELETE FROM [crm].[ImportJobs];
    DELETE FROM [crm].[AuditEvents];
    DELETE FROM [crm].[Leads];
    DELETE FROM [crm].[Opportunities];
    DELETE FROM [crm].[Contacts];
    DELETE FROM [crm].[Accounts];

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
