/*
  Purge all opportunities (deals) and related records.

  Default mode is DRY RUN (rollback).
  Set @Execute = 1 to commit.
*/

USE [CRMEnterprise];
GO

SET NOCOUNT ON;

DECLARE @TenantId UNIQUEIDENTIFIER = NULL; -- Optional: set to target one tenant only.
DECLARE @Execute BIT = 0; -- 0 = dry run (ROLLBACK), 1 = commit (COMMIT)

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID('tempdb..#TargetOpportunities') IS NOT NULL DROP TABLE #TargetOpportunities;

    SELECT o.Id
    INTO #TargetOpportunities
    FROM [crm].[Opportunities] o
    WHERE o.IsDeleted = 0
      AND (@TenantId IS NULL OR o.TenantId = @TenantId);

    SELECT TargetOpportunityCount = COUNT(*)
    FROM #TargetOpportunities;

    IF NOT EXISTS (SELECT 1 FROM #TargetOpportunities)
    BEGIN
        PRINT 'No opportunities found. Nothing to delete.';
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    UPDATE l
    SET l.ConvertedOpportunityId = NULL
    FROM [crm].[Leads] l
    WHERE l.ConvertedOpportunityId IN (SELECT Id FROM #TargetOpportunities);

    UPDATE o
    SET o.RenewalOfOpportunityId = NULL
    FROM [crm].[Opportunities] o
    WHERE o.RenewalOfOpportunityId IN (SELECT Id FROM #TargetOpportunities);

    UPDATE o
    SET o.RenewalOpportunityId = NULL
    FROM [crm].[Opportunities] o
    WHERE o.RenewalOpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[AttributionExplainabilityEvents]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[CampaignAttributions]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[DecisionRequests]
    WHERE EntityId IN (SELECT Id FROM #TargetOpportunities)
      AND LOWER(EntityType) = N'opportunity';

    DELETE FROM [crm].[EmailLogs]
    WHERE RelatedEntityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[Attachments]
    WHERE RelatedEntityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[CustomFieldValues]
    WHERE EntityId IN (SELECT Id FROM #TargetOpportunities)
      AND LOWER(EntityName) = N'opportunity';

    DELETE FROM [crm].[AuditEvents]
    WHERE EntityId IN (SELECT Id FROM #TargetOpportunities)
      AND LOWER(EntityType) = N'opportunity';

    DELETE FROM [crm].[Activities]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities)
       OR (RelatedEntityId IN (SELECT Id FROM #TargetOpportunities));

    DELETE ql
    FROM [crm].[OpportunityQuoteLines] ql
    INNER JOIN [crm].[OpportunityQuotes] q ON ql.OpportunityQuoteId = q.Id
    WHERE q.OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityQuotes]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityApprovals]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityApprovalChains]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityReviewChecklistItems]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityOnboardingItems]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityTeamMembers]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityStageHistories]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[Opportunities]
    WHERE Id IN (SELECT Id FROM #TargetOpportunities);

    SELECT RemainingOpportunityCount = COUNT(*)
    FROM [crm].[Opportunities] o
    WHERE o.IsDeleted = 0
      AND (@TenantId IS NULL OR o.TenantId = @TenantId);

    IF @Execute = 1
    BEGIN
        COMMIT TRANSACTION;
        PRINT 'Committed opportunity cleanup successfully.';
    END
    ELSE
    BEGIN
        ROLLBACK TRANSACTION;
        PRINT 'Dry run only (rolled back). Set @Execute = 1 to commit.';
    END
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
