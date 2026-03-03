/*
  Targeted production-safe cleanup for test leads and related CRM records.

  Default mode is DRY RUN (rollback).
  Set @Execute = 1 to commit.

  Intended for records like:
    - Display name starts with 'Docs Witness '
    - CompanyName = 'QA'
*/

USE [CRMEnterprise];
GO

SET NOCOUNT ON;

DECLARE @TenantId UNIQUEIDENTIFIER = NULL; -- Optional: set to target one tenant only.
DECLARE @LeadDisplayNamePrefix NVARCHAR(200) = N'Docs Witness ';
DECLARE @CompanyName NVARCHAR(200) = N'QA'; -- Set NULL to ignore company filter.
DECLARE @Execute BIT = 0; -- 0 = dry run (ROLLBACK), 1 = commit (COMMIT)

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID('tempdb..#TargetLeads') IS NOT NULL DROP TABLE #TargetLeads;
    IF OBJECT_ID('tempdb..#TargetOpportunities') IS NOT NULL DROP TABLE #TargetOpportunities;
    IF OBJECT_ID('tempdb..#TargetContacts') IS NOT NULL DROP TABLE #TargetContacts;
    IF OBJECT_ID('tempdb..#TargetAccounts') IS NOT NULL DROP TABLE #TargetAccounts;
    IF OBJECT_ID('tempdb..#TargetAnyEntityIds') IS NOT NULL DROP TABLE #TargetAnyEntityIds;

    SELECT l.Id, l.ContactId, l.AccountId, l.ConvertedOpportunityId
    INTO #TargetLeads
    FROM [crm].[Leads] l
    WHERE l.IsDeleted = 0
      AND (@TenantId IS NULL OR l.TenantId = @TenantId)
      AND LTRIM(RTRIM(CONCAT(ISNULL(l.FirstName, N''), N' ', ISNULL(l.LastName, N'')))) LIKE @LeadDisplayNamePrefix + N'%'
      AND (@CompanyName IS NULL OR ISNULL(l.CompanyName, N'') = @CompanyName);

    SELECT DISTINCT o.Id
    INTO #TargetOpportunities
    FROM [crm].[Opportunities] o
    WHERE o.IsDeleted = 0
      AND (
            o.Id IN (SELECT ConvertedOpportunityId FROM #TargetLeads WHERE ConvertedOpportunityId IS NOT NULL)
            OR (
                (@TenantId IS NULL OR o.TenantId = @TenantId)
                AND o.Name LIKE @LeadDisplayNamePrefix + N'%'
            )
          );

    SELECT DISTINCT c.Id
    INTO #TargetContacts
    FROM [crm].[Contacts] c
    WHERE c.IsDeleted = 0
      AND (
            c.Id IN (SELECT ContactId FROM #TargetLeads WHERE ContactId IS NOT NULL)
            OR (
                (@TenantId IS NULL OR c.TenantId = @TenantId)
                AND LTRIM(RTRIM(CONCAT(ISNULL(c.FirstName, N''), N' ', ISNULL(c.LastName, N'')))) LIKE @LeadDisplayNamePrefix + N'%'
            )
          );

    SELECT DISTINCT a.Id
    INTO #TargetAccounts
    FROM [crm].[Accounts] a
    WHERE a.IsDeleted = 0
      AND (
            a.Id IN (SELECT AccountId FROM #TargetLeads WHERE AccountId IS NOT NULL)
            OR (
                (@TenantId IS NULL OR a.TenantId = @TenantId)
                AND a.Name LIKE @LeadDisplayNamePrefix + N'%'
            )
          );

    SELECT Id
    INTO #TargetAnyEntityIds
    FROM (
        SELECT Id FROM #TargetLeads
        UNION
        SELECT Id FROM #TargetOpportunities
        UNION
        SELECT Id FROM #TargetContacts
        UNION
        SELECT Id FROM #TargetAccounts
    ) ids;

    SELECT
        TargetLeadCount = (SELECT COUNT(*) FROM #TargetLeads),
        TargetOpportunityCount = (SELECT COUNT(*) FROM #TargetOpportunities),
        TargetContactCount = (SELECT COUNT(*) FROM #TargetContacts),
        TargetAccountCount = (SELECT COUNT(*) FROM #TargetAccounts);

    IF NOT EXISTS (SELECT 1 FROM #TargetLeads)
    BEGIN
        PRINT 'No matching leads found. Nothing to delete.';
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    DELETE FROM [crm].[DecisionRequests]
    WHERE EntityId IN (SELECT Id FROM #TargetAnyEntityIds)
      AND LOWER(EntityType) IN (N'lead', N'opportunity', N'contact', N'account');

    DELETE FROM [crm].[EmailLogs]
    WHERE RelatedEntityId IN (SELECT Id FROM #TargetAnyEntityIds);

    DELETE FROM [crm].[CampaignMembers]
    WHERE EntityId IN (SELECT Id FROM #TargetLeads)
      AND LOWER(EntityType) = N'lead';

    DELETE FROM [crm].[AttributionExplainabilityEvents]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[CampaignAttributions]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[Attachments]
    WHERE RelatedEntityId IN (SELECT Id FROM #TargetAnyEntityIds);

    DELETE FROM [crm].[CustomFieldValues]
    WHERE EntityId IN (SELECT Id FROM #TargetAnyEntityIds)
      AND LOWER(EntityName) IN (N'lead', N'opportunity', N'contact', N'account');

    DELETE FROM [crm].[AuditEvents]
    WHERE EntityId IN (SELECT Id FROM #TargetAnyEntityIds)
      AND LOWER(EntityType) IN (N'lead', N'opportunity', N'contact', N'account');

    DELETE FROM [crm].[Activities]
    WHERE LeadId IN (SELECT Id FROM #TargetLeads)
       OR OpportunityId IN (SELECT Id FROM #TargetOpportunities)
       OR ContactId IN (SELECT Id FROM #TargetContacts)
       OR RelatedEntityId IN (SELECT Id FROM #TargetAnyEntityIds);

    DELETE FROM [crm].[LeadStatusHistories]
    WHERE LeadId IN (SELECT Id FROM #TargetLeads);

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

    DELETE ql
    FROM [crm].[OpportunityQuoteLines] ql
    INNER JOIN [crm].[OpportunityQuotes] q ON ql.OpportunityQuoteId = q.Id
    WHERE q.OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[OpportunityQuotes]
    WHERE OpportunityId IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[Opportunities]
    WHERE Id IN (SELECT Id FROM #TargetOpportunities);

    DELETE FROM [crm].[Leads]
    WHERE Id IN (SELECT Id FROM #TargetLeads);

    DELETE c
    FROM [crm].[Contacts] c
    WHERE c.Id IN (SELECT Id FROM #TargetContacts)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Leads] l WHERE l.ContactId = c.Id)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Opportunities] o WHERE o.PrimaryContactId = c.Id)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Activities] a WHERE a.ContactId = c.Id);

    DELETE a
    FROM [crm].[Accounts] a
    WHERE a.Id IN (SELECT Id FROM #TargetAccounts)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Leads] l WHERE l.AccountId = a.Id)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Contacts] c WHERE c.AccountId = a.Id)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Opportunities] o WHERE o.AccountId = a.Id)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Accounts] child WHERE child.ParentAccountId = a.Id)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Activities] act WHERE act.RelatedEntityId = a.Id)
      AND NOT EXISTS (SELECT 1 FROM [crm].[Attachments] att WHERE att.RelatedEntityId = a.Id);

    SELECT
        RemainingLeadCount = (SELECT COUNT(*) FROM [crm].[Leads] l
                              WHERE (@TenantId IS NULL OR l.TenantId = @TenantId)
                                AND LTRIM(RTRIM(CONCAT(ISNULL(l.FirstName, N''), N' ', ISNULL(l.LastName, N'')))) LIKE @LeadDisplayNamePrefix + N'%'
                                AND (@CompanyName IS NULL OR ISNULL(l.CompanyName, N'') = @CompanyName));

    IF @Execute = 1
    BEGIN
        COMMIT TRANSACTION;
        PRINT 'Committed cleanup successfully.';
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
