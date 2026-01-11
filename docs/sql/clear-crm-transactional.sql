-- Clears CRM transactional data for all tenants.
-- Keeps master/config tables: LeadStatuses, OpportunityStages, CustomFieldDefinitions, LeadAssignmentRules.
-- Safe to rerun.

USE [CRMEnterprise];
GO

BEGIN TRANSACTION;

DELETE FROM [crm].[Attachments];
DELETE FROM [crm].[LeadStatusHistories];
DELETE FROM [crm].[OpportunityStageHistories];
DELETE FROM [crm].[Activities];
DELETE FROM [crm].[CustomFieldValues];
DELETE FROM [crm].[ImportJobs];

UPDATE [crm].[Leads]
SET [ConvertedOpportunityId] = NULL
WHERE [ConvertedOpportunityId] IS NOT NULL;

DELETE FROM [crm].[Opportunities];
DELETE FROM [crm].[Leads];
DELETE FROM [crm].[Contacts];
DELETE FROM [crm].[Accounts];
DELETE from crm.LeadAssignmentRules;
DELETE FROM [crm].AuditEvents;

COMMIT TRANSACTION;
GO

PRINT 'CRM transactional data cleared.';
