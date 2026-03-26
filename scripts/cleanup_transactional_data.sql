-- ============================================================
-- CRM Enterprise: Delete transactional CRM data plus requested deal lookup rows
-- PRESERVE: Identity tables and other lookup/reference/config tables
-- ============================================================

SET NOCOUNT ON;
BEGIN TRANSACTION;

BEGIN TRY

    -- ========================================
    -- Phase 1: Delete deepest children first
    -- ========================================

    -- Campaign children
    DELETE FROM crm.CampaignRecommendationDecisions;
    PRINT 'Deleted CampaignRecommendationDecisions';
    DELETE FROM crm.CampaignRecommendations;
    PRINT 'Deleted CampaignRecommendations';
    DELETE FROM crm.CampaignInsightSnapshots;
    PRINT 'Deleted CampaignInsightSnapshots';
    DELETE FROM crm.CampaignAttributions;
    PRINT 'Deleted CampaignAttributions';
    DELETE FROM crm.AttributionExplainabilityEvents;
    PRINT 'Deleted AttributionExplainabilityEvents';
    DELETE FROM crm.CampaignMembers;
    PRINT 'Deleted CampaignMembers';
    IF OBJECT_ID('crm.CampaignEmailRecipients', 'U') IS NOT NULL
    BEGIN
        DELETE FROM crm.CampaignEmailRecipients;
        PRINT 'Deleted CampaignEmailRecipients';
    END;
    IF OBJECT_ID('crm.CampaignEmails', 'U') IS NOT NULL
    BEGIN
        DELETE FROM crm.CampaignEmails;
        PRINT 'Deleted CampaignEmails';
    END;

    -- Opportunity children
    DELETE FROM crm.OpportunityQuoteLines;
    PRINT 'Deleted OpportunityQuoteLines';
    DELETE FROM crm.OpportunityQuotes;
    PRINT 'Deleted OpportunityQuotes';
    DELETE FROM crm.OpportunityStageHistories;
    PRINT 'Deleted OpportunityStageHistories';
    DELETE FROM crm.OpportunityApprovals;
    PRINT 'Deleted OpportunityApprovals';
    DELETE FROM crm.OpportunityApprovalChains;
    PRINT 'Deleted OpportunityApprovalChains';
    IF OBJECT_ID('crm.PendingWorkflowDelays', 'U') IS NOT NULL
    BEGIN
        DELETE FROM crm.PendingWorkflowDelays;
        PRINT 'Deleted PendingWorkflowDelays';
    END;
    DELETE FROM crm.OpportunityReviewChecklistItems;
    PRINT 'Deleted OpportunityReviewChecklistItems';
    DELETE FROM crm.OpportunityTeamMembers;
    PRINT 'Deleted OpportunityTeamMembers';
    DELETE FROM crm.OpportunityContactRoles;
    PRINT 'Deleted OpportunityContactRoles';
    IF OBJECT_ID('crm.AccountContactRoles', 'U') IS NOT NULL
    BEGIN
        DELETE FROM crm.AccountContactRoles;
        PRINT 'Deleted AccountContactRoles';
    END;
    DELETE FROM crm.OpportunityOnboardingItems;
    PRINT 'Deleted OpportunityOnboardingItems';

    -- Decision children
    DELETE FROM crm.DecisionActionLogs;
    PRINT 'Deleted DecisionActionLogs';
    DELETE FROM crm.DecisionSteps;
    PRINT 'Deleted DecisionSteps';
    DELETE FROM crm.DecisionRequests;
    PRINT 'Deleted DecisionRequests';

    -- Support children
    DELETE FROM crm.SupportCaseComments;
    PRINT 'Deleted SupportCaseComments';
    DELETE FROM crm.SupportCaseEscalationEvents;
    PRINT 'Deleted SupportCaseEscalationEvents';
    DELETE FROM crm.SupportEmailBindings;
    PRINT 'Deleted SupportEmailBindings';

    -- Chat children
    DELETE FROM crm.DirectChatMessages;
    PRINT 'Deleted DirectChatMessages';
    DELETE FROM crm.DirectChatParticipants;
    PRINT 'Deleted DirectChatParticipants';

    -- Lead children
    DELETE FROM crm.LeadStatusHistories;
    PRINT 'Deleted LeadStatusHistories';

    -- ========================================
    -- Phase 2: Polymorphic/independent tables
    -- ========================================
    DELETE FROM crm.Activities;
    PRINT 'Deleted Activities';
    DELETE FROM crm.Attachments;
    PRINT 'Deleted Attachments';
    DELETE FROM crm.AuditEvents;
    PRINT 'Deleted AuditEvents';
    DELETE FROM crm.CustomFieldValues;
    PRINT 'Deleted CustomFieldValues';
    DELETE FROM crm.EmailLogs;
    PRINT 'Deleted EmailLogs';
    DELETE FROM crm.ImportJobs;
    PRINT 'Deleted ImportJobs';
    DELETE FROM crm.AssistantMessages;
    PRINT 'Deleted AssistantMessages';
    DELETE FROM crm.AssistantThreads;
    PRINT 'Deleted AssistantThreads';
    DELETE FROM dbo.UserMailMessages;
    PRINT 'Deleted UserMailMessages';
    DELETE FROM dbo.UserEmailConnections;
    PRINT 'Deleted UserEmailConnections';
    IF OBJECT_ID('crm.CrmEmailLinks', 'U') IS NOT NULL
    BEGIN
        DELETE FROM crm.CrmEmailLinks;
        PRINT 'Deleted CrmEmailLinks';
    END;

    -- ========================================
    -- Phase 3: Clear Lead FKs before parents
    -- ========================================
    UPDATE crm.Leads SET ConvertedOpportunityId = NULL WHERE ConvertedOpportunityId IS NOT NULL;
    PRINT 'Cleared Lead.ConvertedOpportunityId';
    UPDATE crm.Leads SET AccountId = NULL WHERE AccountId IS NOT NULL;
    PRINT 'Cleared Lead.AccountId';
    UPDATE crm.Leads SET ContactId = NULL WHERE ContactId IS NOT NULL;
    PRINT 'Cleared Lead.ContactId';

    -- ========================================
    -- Phase 4: Parent transactional tables
    -- ========================================
    DELETE FROM crm.Campaigns;
    PRINT 'Deleted Campaigns';
    DELETE FROM crm.Opportunities;
    PRINT 'Deleted Opportunities';
    DELETE FROM crm.SupportCases;
    PRINT 'Deleted SupportCases';
    DELETE FROM crm.DirectChatThreads;
    PRINT 'Deleted DirectChatThreads';
    IF OBJECT_ID('crm.ContactTags', 'U') IS NOT NULL
    BEGIN
        DELETE FROM crm.ContactTags;
        PRINT 'Deleted ContactTags';
    END;
    DELETE FROM crm.Contacts;
    PRINT 'Deleted Contacts';
    IF OBJECT_ID('crm.AccountTeamMembers', 'U') IS NOT NULL
    BEGIN
        DELETE FROM crm.AccountTeamMembers;
        PRINT 'Deleted AccountTeamMembers';
    END;
    DELETE FROM crm.Accounts;
    PRINT 'Deleted Accounts';

    DELETE FROM crm.Leads;
    PRINT 'Deleted Leads';

    -- ========================================
    -- Phase 5: Requested deal lookup cleanup
    -- ========================================
    IF OBJECT_ID('dbo.DealSegments', 'U') IS NOT NULL
    BEGIN
        DELETE FROM dbo.DealSegments;
        PRINT 'Deleted DealSegments';
    END;
    IF OBJECT_ID('dbo.DealTypes', 'U') IS NOT NULL
    BEGIN
        DELETE FROM dbo.DealTypes;
        PRINT 'Deleted DealTypes';
    END;

    COMMIT TRANSACTION;
    PRINT '';
    PRINT '=== CLEANUP COMPLETE ===';

END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'ERROR: ' + ERROR_MESSAGE();
    PRINT 'Transaction rolled back - no data was deleted.';
END CATCH
