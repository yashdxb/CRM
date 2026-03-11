-- ============================================================
-- CRM Enterprise: Delete ALL transactional data
-- PRESERVE: Lead "Rob" (078ddd15-b6f3-41f2-a7eb-08a3d4d9ac39)
-- PRESERVE: All lookup/reference/config/identity tables
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

    -- Opportunity children
    DELETE FROM crm.OpportunityQuoteLines;
    PRINT 'Deleted OpportunityQuoteLines';
    DELETE FROM crm.OpportunityQuotes;
    PRINT 'Deleted OpportunityQuotes';
    DELETE FROM crm.OpportunityStageHistories;
    PRINT 'Deleted OpportunityStageHistories';
    DELETE FROM crm.OpportunityApprovalChains;
    PRINT 'Deleted OpportunityApprovalChains';
    DELETE FROM crm.OpportunityApprovals;
    PRINT 'Deleted OpportunityApprovals';
    DELETE FROM crm.OpportunityReviewChecklistItems;
    PRINT 'Deleted OpportunityReviewChecklistItems';
    DELETE FROM crm.OpportunityTeamMembers;
    PRINT 'Deleted OpportunityTeamMembers';
    DELETE FROM crm.OpportunityContactRoles;
    PRINT 'Deleted OpportunityContactRoles';
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
    DELETE FROM crm.Contacts;
    PRINT 'Deleted Contacts';
    DELETE FROM crm.Accounts;
    PRINT 'Deleted Accounts';

    -- Delete all leads EXCEPT Rob
    DELETE FROM crm.Leads WHERE Id != '078ddd15-b6f3-41f2-a7eb-08a3d4d9ac39';
    PRINT 'Deleted Leads (except Rob)';

    COMMIT TRANSACTION;
    PRINT '';
    PRINT '=== CLEANUP COMPLETE ===';

END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'ERROR: ' + ERROR_MESSAGE();
    PRINT 'Transaction rolled back - no data was deleted.';
END CATCH
