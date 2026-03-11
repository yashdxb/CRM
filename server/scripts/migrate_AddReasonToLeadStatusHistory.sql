IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [Accounts] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [AccountNumber] nvarchar(max) NULL,
        [Industry] nvarchar(max) NULL,
        [Website] nvarchar(max) NULL,
        [Phone] nvarchar(max) NULL,
        [ParentAccountId] uniqueidentifier NULL,
        [OwnerId] uniqueidentifier NOT NULL,
        [LifecycleStage] nvarchar(max) NULL,
        [ActivityScore] int NOT NULL,
        [Territory] nvarchar(max) NULL,
        [Description] nvarchar(max) NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Accounts] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Accounts_Accounts_ParentAccountId] FOREIGN KEY ([ParentAccountId]) REFERENCES [Accounts] ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [CustomFieldDefinitions] (
        [Id] uniqueidentifier NOT NULL,
        [EntityName] nvarchar(max) NOT NULL,
        [DisplayName] nvarchar(max) NOT NULL,
        [SchemaName] nvarchar(max) NOT NULL,
        [DataType] int NOT NULL,
        [IsRequired] bit NOT NULL,
        [IsActive] bit NOT NULL,
        [Order] int NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CustomFieldDefinitions] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [LeadStatuses] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Order] int NOT NULL,
        [IsDefault] bit NOT NULL,
        [IsClosed] bit NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_LeadStatuses] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [OpportunityStages] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Order] int NOT NULL,
        [IsClosedStage] bit NOT NULL,
        [ForecastCategory] nvarchar(max) NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityStages] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [Roles] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [Users] (
        [Id] uniqueidentifier NOT NULL,
        [FullName] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [TimeZone] nvarchar(max) NULL,
        [Locale] nvarchar(max) NULL,
        [IsActive] bit NOT NULL,
        [LastLoginAtUtc] datetime2 NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [Contacts] (
        [Id] uniqueidentifier NOT NULL,
        [FirstName] nvarchar(max) NOT NULL,
        [LastName] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NULL,
        [Phone] nvarchar(max) NULL,
        [Mobile] nvarchar(max) NULL,
        [JobTitle] nvarchar(max) NULL,
        [AccountId] uniqueidentifier NULL,
        [OwnerId] uniqueidentifier NOT NULL,
        [LinkedInProfile] nvarchar(max) NULL,
        [LifecycleStage] nvarchar(max) NULL,
        [ActivityScore] int NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Contacts] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Contacts_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [CustomFieldValues] (
        [Id] uniqueidentifier NOT NULL,
        [CustomFieldDefinitionId] uniqueidentifier NOT NULL,
        [EntityId] uniqueidentifier NOT NULL,
        [EntityName] nvarchar(max) NOT NULL,
        [TextValue] nvarchar(max) NULL,
        [NumberValue] decimal(18,2) NULL,
        [CurrencyValue] decimal(18,2) NULL,
        [DateValue] datetime2 NULL,
        [BooleanValue] bit NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CustomFieldValues] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_CustomFieldValues_CustomFieldDefinitions_CustomFieldDefinitionId] FOREIGN KEY ([CustomFieldDefinitionId]) REFERENCES [CustomFieldDefinitions] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [UserRoles] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [RoleId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_UserRoles] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [Opportunities] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [AccountId] uniqueidentifier NOT NULL,
        [PrimaryContactId] uniqueidentifier NULL,
        [StageId] uniqueidentifier NOT NULL,
        [OwnerId] uniqueidentifier NOT NULL,
        [Amount] decimal(18,2) NOT NULL,
        [Currency] nvarchar(max) NOT NULL,
        [Probability] decimal(18,2) NOT NULL,
        [ExpectedCloseDate] datetime2 NULL,
        [ForecastCategory] nvarchar(max) NULL,
        [Summary] nvarchar(max) NULL,
        [IsClosed] bit NOT NULL,
        [IsWon] bit NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Opportunities] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Opportunities_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Opportunities_Contacts_PrimaryContactId] FOREIGN KEY ([PrimaryContactId]) REFERENCES [Contacts] ([Id]),
        CONSTRAINT [FK_Opportunities_OpportunityStages_StageId] FOREIGN KEY ([StageId]) REFERENCES [OpportunityStages] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [Leads] (
        [Id] uniqueidentifier NOT NULL,
        [FirstName] nvarchar(max) NOT NULL,
        [LastName] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NULL,
        [Phone] nvarchar(max) NULL,
        [CompanyName] nvarchar(max) NULL,
        [JobTitle] nvarchar(max) NULL,
        [LeadStatusId] uniqueidentifier NOT NULL,
        [OwnerId] uniqueidentifier NOT NULL,
        [Source] nvarchar(max) NULL,
        [Score] int NOT NULL,
        [AccountId] uniqueidentifier NULL,
        [ContactId] uniqueidentifier NULL,
        [ConvertedOpportunityId] uniqueidentifier NULL,
        [QualifiedAtUtc] datetime2 NULL,
        [ConvertedAtUtc] datetime2 NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Leads] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Leads_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]),
        CONSTRAINT [FK_Leads_Contacts_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [Contacts] ([Id]),
        CONSTRAINT [FK_Leads_LeadStatuses_LeadStatusId] FOREIGN KEY ([LeadStatusId]) REFERENCES [LeadStatuses] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Leads_Opportunities_ConvertedOpportunityId] FOREIGN KEY ([ConvertedOpportunityId]) REFERENCES [Opportunities] ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [OpportunityStageHistories] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [OpportunityStageId] uniqueidentifier NOT NULL,
        [ChangedAtUtc] datetime2 NOT NULL,
        [ChangedBy] nvarchar(max) NULL,
        [Notes] nvarchar(max) NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityStageHistories] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityStageHistories_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [Opportunities] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_OpportunityStageHistories_OpportunityStages_OpportunityStageId] FOREIGN KEY ([OpportunityStageId]) REFERENCES [OpportunityStages] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [Activities] (
        [Id] uniqueidentifier NOT NULL,
        [Subject] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NULL,
        [Type] int NOT NULL,
        [RelatedEntityType] int NOT NULL,
        [RelatedEntityId] uniqueidentifier NOT NULL,
        [OwnerId] uniqueidentifier NOT NULL,
        [DueDateUtc] datetime2 NULL,
        [CompletedDateUtc] datetime2 NULL,
        [Location] nvarchar(max) NULL,
        [IsAllDay] bit NOT NULL,
        [Priority] nvarchar(max) NULL,
        [ExternalReference] nvarchar(max) NULL,
        [ContactId] uniqueidentifier NULL,
        [LeadId] uniqueidentifier NULL,
        [OpportunityId] uniqueidentifier NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Activities] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Activities_Contacts_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [Contacts] ([Id]),
        CONSTRAINT [FK_Activities_Leads_LeadId] FOREIGN KEY ([LeadId]) REFERENCES [Leads] ([Id]),
        CONSTRAINT [FK_Activities_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [Opportunities] ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE TABLE [LeadStatusHistories] (
        [Id] uniqueidentifier NOT NULL,
        [LeadId] uniqueidentifier NOT NULL,
        [LeadStatusId] uniqueidentifier NOT NULL,
        [ChangedAtUtc] datetime2 NOT NULL,
        [ChangedBy] nvarchar(max) NULL,
        [Notes] nvarchar(max) NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_LeadStatusHistories] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_LeadStatusHistories_LeadStatuses_LeadStatusId] FOREIGN KEY ([LeadStatusId]) REFERENCES [LeadStatuses] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_LeadStatusHistories_Leads_LeadId] FOREIGN KEY ([LeadId]) REFERENCES [Leads] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Accounts_ParentAccountId] ON [Accounts] ([ParentAccountId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Activities_ContactId] ON [Activities] ([ContactId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Activities_LeadId] ON [Activities] ([LeadId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Activities_OpportunityId] ON [Activities] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Contacts_AccountId] ON [Contacts] ([AccountId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_CustomFieldValues_CustomFieldDefinitionId] ON [CustomFieldValues] ([CustomFieldDefinitionId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Leads_AccountId] ON [Leads] ([AccountId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Leads_ContactId] ON [Leads] ([ContactId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Leads_ConvertedOpportunityId] ON [Leads] ([ConvertedOpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Leads_LeadStatusId] ON [Leads] ([LeadStatusId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_LeadStatusHistories_LeadId] ON [LeadStatusHistories] ([LeadId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_LeadStatusHistories_LeadStatusId] ON [LeadStatusHistories] ([LeadStatusId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Opportunities_AccountId] ON [Opportunities] ([AccountId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Opportunities_PrimaryContactId] ON [Opportunities] ([PrimaryContactId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Opportunities_StageId] ON [Opportunities] ([StageId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_OpportunityStageHistories_OpportunityId] ON [OpportunityStageHistories] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_OpportunityStageHistories_OpportunityStageId] ON [OpportunityStageHistories] ([OpportunityStageId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_UserRoles_RoleId] ON [UserRoles] ([RoleId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_UserRoles_UserId] ON [UserRoles] ([UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221184835_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251221184835_InitialCreate', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221224912_AddUserPasswordHash'
)
BEGIN
    ALTER TABLE [Users] ADD [PasswordHash] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251221224912_AddUserPasswordHash'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251221224912_AddUserPasswordHash', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251225043856_AddRolePermissions'
)
BEGIN
    ALTER TABLE [Opportunities] ADD [WinLossReason] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251225043856_AddRolePermissions'
)
BEGIN
    CREATE TABLE [RolePermissions] (
        [Id] uniqueidentifier NOT NULL,
        [RoleId] uniqueidentifier NOT NULL,
        [Permission] nvarchar(256) NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_RolePermissions] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RolePermissions_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251225043856_AddRolePermissions'
)
BEGIN
    CREATE INDEX [IX_RolePermissions_RoleId] ON [RolePermissions] ([RoleId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251225043856_AddRolePermissions'
)
BEGIN
    CREATE UNIQUE INDEX [IX_RolePermissions_RoleId_Permission] ON [RolePermissions] ([RoleId], [Permission]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251225043856_AddRolePermissions'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251225043856_AddRolePermissions', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    DROP INDEX [IX_RolePermissions_RoleId] ON [RolePermissions];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    IF SCHEMA_ID(N'crm') IS NULL EXEC(N'CREATE SCHEMA [crm];');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    IF SCHEMA_ID(N'identity') IS NULL EXEC(N'CREATE SCHEMA [identity];');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [identity] TRANSFER [Users];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [identity] TRANSFER [UserRoles];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [identity] TRANSFER [Roles];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [identity] TRANSFER [RolePermissions];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [OpportunityStages];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [OpportunityStageHistories];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [Opportunities];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [LeadStatusHistories];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [LeadStatuses];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [Leads];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [CustomFieldValues];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [CustomFieldDefinitions];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [Contacts];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [Activities];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER SCHEMA [crm] TRANSFER [Accounts];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    ALTER TABLE [crm].[Accounts] ADD [LastViewedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251226155030_AddSchemasAndAccountViews'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251226155030_AddSchemasAndAccountViews', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [identity].[UserRoles] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [identity].[RolePermissions] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[OpportunityStages] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[OpportunityStageHistories] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[LeadStatusHistories] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[LeadStatuses] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[CustomFieldValues] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[CustomFieldDefinitions] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[Contacts] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[Activities] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    ALTER TABLE [crm].[Accounts] ADD [TenantId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE TABLE [identity].[Tenants] (
        [Id] uniqueidentifier NOT NULL,
        [Key] nvarchar(max) NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [TimeZone] nvarchar(max) NOT NULL,
        [Currency] nvarchar(max) NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [UpdatedAtUtc] datetime2 NULL,
        CONSTRAINT [PK_Tenants] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_Users_TenantId] ON [identity].[Users] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_UserRoles_TenantId] ON [identity].[UserRoles] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_Roles_TenantId] ON [identity].[Roles] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_RolePermissions_TenantId] ON [identity].[RolePermissions] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_OpportunityStages_TenantId] ON [crm].[OpportunityStages] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_OpportunityStageHistories_TenantId] ON [crm].[OpportunityStageHistories] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_Opportunities_TenantId] ON [crm].[Opportunities] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_LeadStatusHistories_TenantId] ON [crm].[LeadStatusHistories] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_LeadStatuses_TenantId] ON [crm].[LeadStatuses] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_Leads_TenantId] ON [crm].[Leads] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_CustomFieldValues_TenantId] ON [crm].[CustomFieldValues] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_CustomFieldDefinitions_TenantId] ON [crm].[CustomFieldDefinitions] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_Contacts_TenantId] ON [crm].[Contacts] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_Activities_TenantId] ON [crm].[Activities] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    CREATE INDEX [IX_Accounts_TenantId] ON [crm].[Accounts] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033027_AddTenantScoping'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251227033027_AddTenantScoping', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033159_AddTenantKeyIndex'
)
BEGIN
    DECLARE @var nvarchar(max);
    SELECT @var = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[identity].[Tenants]') AND [c].[name] = N'Key');
    IF @var IS NOT NULL EXEC(N'ALTER TABLE [identity].[Tenants] DROP CONSTRAINT ' + @var + ';');
    ALTER TABLE [identity].[Tenants] ALTER COLUMN [Key] nvarchar(450) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033159_AddTenantKeyIndex'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Tenants_Key] ON [identity].[Tenants] ([Key]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227033159_AddTenantKeyIndex'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251227033159_AddTenantKeyIndex', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227165244_AddLeadAssignmentRules'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [Territory] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227165244_AddLeadAssignmentRules'
)
BEGIN
    CREATE TABLE [crm].[LeadAssignmentRules] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Type] nvarchar(max) NOT NULL,
        [IsActive] bit NOT NULL,
        [Territory] nvarchar(max) NULL,
        [AssignedUserId] uniqueidentifier NULL,
        [LastAssignedUserId] uniqueidentifier NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_LeadAssignmentRules] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227165244_AddLeadAssignmentRules'
)
BEGIN
    CREATE INDEX [IX_LeadAssignmentRules_TenantId] ON [crm].[LeadAssignmentRules] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251227165244_AddLeadAssignmentRules'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251227165244_AddLeadAssignmentRules', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251228033047_AddApprovalThresholds'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ApprovalAmountThreshold] decimal(18,2) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251228033047_AddApprovalThresholds'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ApprovalApproverRole] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251228033047_AddApprovalThresholds'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251228033047_AddApprovalThresholds', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251229061408_AddPermissionCatalog'
)
BEGIN
    CREATE TABLE [identity].[PermissionCatalog] (
        [Id] uniqueidentifier NOT NULL,
        [Key] nvarchar(200) NOT NULL,
        [Label] nvarchar(200) NOT NULL,
        [Description] nvarchar(500) NOT NULL,
        CONSTRAINT [PK_PermissionCatalog] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251229061408_AddPermissionCatalog'
)
BEGIN
    CREATE UNIQUE INDEX [IX_PermissionCatalog_Key] ON [identity].[PermissionCatalog] ([Key]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251229061408_AddPermissionCatalog'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251229061408_AddPermissionCatalog', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251230223751_AddAttachments'
)
BEGIN
    CREATE TABLE [crm].[Attachments] (
        [Id] uniqueidentifier NOT NULL,
        [FileName] nvarchar(max) NOT NULL,
        [ContentType] nvarchar(max) NOT NULL,
        [Size] bigint NOT NULL,
        [StoragePath] nvarchar(max) NOT NULL,
        [RelatedEntityType] int NOT NULL,
        [RelatedEntityId] uniqueidentifier NOT NULL,
        [UploadedById] uniqueidentifier NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Attachments] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251230223751_AddAttachments'
)
BEGIN
    CREATE INDEX [IX_Attachments_TenantId] ON [crm].[Attachments] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251230223751_AddAttachments'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251230223751_AddAttachments', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231195646_AddNotificationPreferences'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [NotificationPreferencesJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231195646_AddNotificationPreferences'
)
BEGIN
    CREATE TABLE [crm].[ImportJobs] (
        [Id] uniqueidentifier NOT NULL,
        [EntityType] nvarchar(60) NOT NULL,
        [FileName] nvarchar(260) NOT NULL,
        [FilePath] nvarchar(500) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [TotalRows] int NOT NULL,
        [Imported] int NOT NULL,
        [Skipped] int NOT NULL,
        [ErrorsJson] nvarchar(max) NULL,
        [ErrorMessage] nvarchar(max) NULL,
        [CompletedAtUtc] datetime2 NULL,
        [RequestedById] uniqueidentifier NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_ImportJobs] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231195646_AddNotificationPreferences'
)
BEGIN
    CREATE INDEX [IX_ImportJobs_Status] ON [crm].[ImportJobs] ([Status]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231195646_AddNotificationPreferences'
)
BEGIN
    CREATE INDEX [IX_ImportJobs_TenantId] ON [crm].[ImportJobs] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231195646_AddNotificationPreferences'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251231195646_AddNotificationPreferences', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231220446_AddUserEmailNormalized'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [EmailNormalized] nvarchar(320) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231220446_AddUserEmailNormalized'
)
BEGIN
    UPDATE [identity].[Users]
    SET [EmailNormalized] = LOWER(LTRIM(RTRIM([Email])))
    WHERE [Email] IS NOT NULL AND [EmailNormalized] IS NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231220446_AddUserEmailNormalized'
)
BEGIN
    WITH ranked AS (
        SELECT
            [Id],
            [TenantId],
            [EmailNormalized],
            ROW_NUMBER() OVER (
                PARTITION BY [TenantId], [EmailNormalized]
                ORDER BY [IsDeleted] ASC, [LastLoginAtUtc] DESC, [CreatedAtUtc] DESC, [Id] ASC
            ) AS rn
        FROM [identity].[Users]
        WHERE [EmailNormalized] IS NOT NULL
    )
    UPDATE u
    SET [IsDeleted] = 1,
        [IsActive] = 0,
        [DeletedAtUtc] = SYSUTCDATETIME(),
        [DeletedBy] = 'dedupe'
    FROM [identity].[Users] u
    INNER JOIN ranked r ON u.[Id] = r.[Id]
    WHERE r.rn > 1 AND u.[IsDeleted] = 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231220446_AddUserEmailNormalized'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_Users_TenantId_EmailNormalized] ON [identity].[Users] ([TenantId], [EmailNormalized]) WHERE [EmailNormalized] IS NOT NULL AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231220446_AddUserEmailNormalized'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251231220446_AddUserEmailNormalized', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231225141_AddLeadAiScoring'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [AiConfidence] decimal(5,4) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231225141_AddLeadAiScoring'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [AiRationale] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231225141_AddLeadAiScoring'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [AiScore] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231225141_AddLeadAiScoring'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [AiScoredAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251231225141_AddLeadAiScoring'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251231225141_AddLeadAiScoring', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260102012723_AddTenantIndustryConfig'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [IndustryModules] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260102012723_AddTenantIndustryConfig'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [IndustryPreset] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260102012723_AddTenantIndustryConfig'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260102012723_AddTenantIndustryConfig', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260103183150_AddSupplyChainSuppliers'
)
BEGIN
    IF SCHEMA_ID(N'scm') IS NULL EXEC(N'CREATE SCHEMA [scm];');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260103183150_AddSupplyChainSuppliers'
)
BEGIN
    CREATE TABLE [scm].[Suppliers] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Category] nvarchar(120) NULL,
        [Status] nvarchar(60) NULL,
        [Country] nvarchar(120) NULL,
        [Website] nvarchar(300) NULL,
        [ContactName] nvarchar(200) NULL,
        [ContactEmail] nvarchar(320) NULL,
        [ContactPhone] nvarchar(60) NULL,
        [Notes] nvarchar(max) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Suppliers] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260103183150_AddSupplyChainSuppliers'
)
BEGIN
    CREATE INDEX [IX_Suppliers_TenantId] ON [scm].[Suppliers] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260103183150_AddSupplyChainSuppliers'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260103183150_AddSupplyChainSuppliers', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104034927_AddItemMaster'
)
BEGIN
    CREATE TABLE [scm].[ItemMasters] (
        [Id] uniqueidentifier NOT NULL,
        [Sku] nvarchar(60) NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Description] nvarchar(800) NULL,
        [CategoryName] nvarchar(160) NULL,
        [DefaultUom] nvarchar(40) NULL,
        [IsActive] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_ItemMasters] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104034927_AddItemMaster'
)
BEGIN
    CREATE INDEX [IX_ItemMasters_TenantId] ON [scm].[ItemMasters] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104034927_AddItemMaster'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104034927_AddItemMaster', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104050158_AddPriceLists'
)
BEGIN
    CREATE TABLE [scm].[PriceLists] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Currency] nvarchar(10) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [ValidFrom] datetime2 NULL,
        [ValidTo] datetime2 NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_PriceLists] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104050158_AddPriceLists'
)
BEGIN
    CREATE TABLE [scm].[PriceListItems] (
        [Id] uniqueidentifier NOT NULL,
        [PriceListId] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NOT NULL,
        [Uom] nvarchar(40) NULL,
        [UnitPrice] decimal(18,2) NOT NULL,
        [MinQty] int NULL,
        [MaxQty] int NULL,
        [LeadTimeDays] int NULL,
        [IsActive] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_PriceListItems] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PriceListItems_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_PriceListItems_PriceLists_PriceListId] FOREIGN KEY ([PriceListId]) REFERENCES [scm].[PriceLists] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104050158_AddPriceLists'
)
BEGIN
    CREATE INDEX [IX_PriceListItems_ItemMasterId] ON [scm].[PriceListItems] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104050158_AddPriceLists'
)
BEGIN
    CREATE INDEX [IX_PriceListItems_PriceListId] ON [scm].[PriceListItems] ([PriceListId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104050158_AddPriceLists'
)
BEGIN
    CREATE INDEX [IX_PriceListItems_TenantId] ON [scm].[PriceListItems] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104050158_AddPriceLists'
)
BEGIN
    CREATE INDEX [IX_PriceLists_TenantId] ON [scm].[PriceLists] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104050158_AddPriceLists'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104050158_AddPriceLists', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104051915_AddSupplierComplianceScorecards'
)
BEGIN
    CREATE TABLE [scm].[SupplierCertifications] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Issuer] nvarchar(200) NULL,
        [IssuedOn] datetime2 NULL,
        [ExpiresOn] datetime2 NULL,
        [Status] nvarchar(60) NOT NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierCertifications] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierCertifications_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104051915_AddSupplierComplianceScorecards'
)
BEGIN
    CREATE TABLE [scm].[SupplierScorecards] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [PeriodStart] datetime2 NOT NULL,
        [PeriodEnd] datetime2 NOT NULL,
        [QualityScore] decimal(5,2) NOT NULL,
        [DeliveryScore] decimal(5,2) NOT NULL,
        [CostScore] decimal(5,2) NOT NULL,
        [OverallScore] decimal(5,2) NOT NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierScorecards] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierScorecards_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104051915_AddSupplierComplianceScorecards'
)
BEGIN
    CREATE INDEX [IX_SupplierCertifications_SupplierId] ON [scm].[SupplierCertifications] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104051915_AddSupplierComplianceScorecards'
)
BEGIN
    CREATE INDEX [IX_SupplierCertifications_TenantId] ON [scm].[SupplierCertifications] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104051915_AddSupplierComplianceScorecards'
)
BEGIN
    CREATE INDEX [IX_SupplierScorecards_SupplierId] ON [scm].[SupplierScorecards] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104051915_AddSupplierComplianceScorecards'
)
BEGIN
    CREATE INDEX [IX_SupplierScorecards_TenantId] ON [scm].[SupplierScorecards] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104051915_AddSupplierComplianceScorecards'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104051915_AddSupplierComplianceScorecards', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053316_AddSupplierContacts'
)
BEGIN
    CREATE TABLE [scm].[SupplierContacts] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [FullName] nvarchar(200) NOT NULL,
        [Title] nvarchar(120) NULL,
        [Email] nvarchar(320) NULL,
        [Phone] nvarchar(60) NULL,
        [Department] nvarchar(120) NULL,
        [IsPrimary] bit NOT NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierContacts] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierContacts_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053316_AddSupplierContacts'
)
BEGIN
    CREATE INDEX [IX_SupplierContacts_SupplierId] ON [scm].[SupplierContacts] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053316_AddSupplierContacts'
)
BEGIN
    CREATE INDEX [IX_SupplierContacts_TenantId] ON [scm].[SupplierContacts] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053316_AddSupplierContacts'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104053316_AddSupplierContacts', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053850_AddSupplierAddresses'
)
BEGIN
    CREATE TABLE [scm].[SupplierAddresses] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [Label] nvarchar(120) NOT NULL,
        [Line1] nvarchar(200) NOT NULL,
        [Line2] nvarchar(200) NULL,
        [City] nvarchar(120) NULL,
        [State] nvarchar(120) NULL,
        [PostalCode] nvarchar(30) NULL,
        [Country] nvarchar(120) NULL,
        [IsPrimary] bit NOT NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierAddresses] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierAddresses_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053850_AddSupplierAddresses'
)
BEGIN
    CREATE INDEX [IX_SupplierAddresses_SupplierId] ON [scm].[SupplierAddresses] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053850_AddSupplierAddresses'
)
BEGIN
    CREATE INDEX [IX_SupplierAddresses_TenantId] ON [scm].[SupplierAddresses] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104053850_AddSupplierAddresses'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104053850_AddSupplierAddresses', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104054542_AddSupplierDocuments'
)
BEGIN
    CREATE TABLE [scm].[SupplierDocuments] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [DocumentType] nvarchar(100) NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [FileName] nvarchar(260) NULL,
        [StoragePath] nvarchar(500) NULL,
        [IssuedOn] datetime2 NULL,
        [ExpiresOn] datetime2 NULL,
        [Status] nvarchar(60) NOT NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierDocuments] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierDocuments_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104054542_AddSupplierDocuments'
)
BEGIN
    CREATE INDEX [IX_SupplierDocuments_SupplierId] ON [scm].[SupplierDocuments] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104054542_AddSupplierDocuments'
)
BEGIN
    CREATE INDEX [IX_SupplierDocuments_TenantId] ON [scm].[SupplierDocuments] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104054542_AddSupplierDocuments'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104054542_AddSupplierDocuments', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104055240_AddSupplierIssues'
)
BEGIN
    CREATE TABLE [scm].[SupplierIssues] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [Description] nvarchar(2000) NULL,
        [Severity] nvarchar(30) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [OpenedOn] datetime2 NOT NULL,
        [ClosedOn] datetime2 NULL,
        [Owner] nvarchar(200) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierIssues] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierIssues_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104055240_AddSupplierIssues'
)
BEGIN
    CREATE INDEX [IX_SupplierIssues_SupplierId] ON [scm].[SupplierIssues] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104055240_AddSupplierIssues'
)
BEGIN
    CREATE INDEX [IX_SupplierIssues_TenantId] ON [scm].[SupplierIssues] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104055240_AddSupplierIssues'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104055240_AddSupplierIssues', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104060412_AddSupplierKpis'
)
BEGIN
    CREATE TABLE [scm].[SupplierKpis] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [PeriodStart] datetime2 NOT NULL,
        [PeriodEnd] datetime2 NOT NULL,
        [OnTimeDeliveryRate] decimal(6,2) NULL,
        [DefectRate] decimal(6,2) NULL,
        [FillRate] decimal(6,2) NULL,
        [CostVariance] decimal(8,2) NULL,
        [LeadTimeDays] decimal(6,2) NULL,
        [ResponsivenessScore] decimal(6,2) NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierKpis] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierKpis_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104060412_AddSupplierKpis'
)
BEGIN
    CREATE INDEX [IX_SupplierKpis_SupplierId] ON [scm].[SupplierKpis] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104060412_AddSupplierKpis'
)
BEGIN
    CREATE INDEX [IX_SupplierKpis_TenantId] ON [scm].[SupplierKpis] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104060412_AddSupplierKpis'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104060412_AddSupplierKpis', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    CREATE TABLE [scm].[PurchaseOrders] (
        [Id] uniqueidentifier NOT NULL,
        [OrderNumber] nvarchar(60) NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [OrderDate] datetime2 NOT NULL,
        [ExpectedDeliveryDate] datetime2 NULL,
        [Status] nvarchar(40) NOT NULL,
        [Currency] nvarchar(10) NOT NULL,
        [TotalAmount] decimal(18,2) NOT NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_PurchaseOrders] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PurchaseOrders_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    CREATE TABLE [scm].[PurchaseOrderLines] (
        [Id] uniqueidentifier NOT NULL,
        [PurchaseOrderId] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NOT NULL,
        [Description] nvarchar(500) NULL,
        [Uom] nvarchar(40) NULL,
        [Quantity] int NOT NULL,
        [UnitPrice] decimal(18,2) NOT NULL,
        [LineTotal] decimal(18,2) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_PurchaseOrderLines] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PurchaseOrderLines_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_PurchaseOrderLines_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [scm].[PurchaseOrders] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrderLines_ItemMasterId] ON [scm].[PurchaseOrderLines] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrderLines_PurchaseOrderId] ON [scm].[PurchaseOrderLines] ([PurchaseOrderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrderLines_TenantId] ON [scm].[PurchaseOrderLines] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrders_SupplierId] ON [scm].[PurchaseOrders] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrders_TenantId] ON [scm].[PurchaseOrders] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104061319_AddPurchaseOrders'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104061319_AddPurchaseOrders', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104141713_AddPurchaseOrderApprovals'
)
BEGIN
    CREATE TABLE [scm].[PurchaseOrderApprovals] (
        [Id] uniqueidentifier NOT NULL,
        [PurchaseOrderId] uniqueidentifier NOT NULL,
        [ApproverRole] nvarchar(120) NOT NULL,
        [ApproverUserId] uniqueidentifier NULL,
        [Status] nvarchar(40) NOT NULL,
        [RequestedOn] datetime2 NOT NULL,
        [DecisionOn] datetime2 NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_PurchaseOrderApprovals] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PurchaseOrderApprovals_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [scm].[PurchaseOrders] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104141713_AddPurchaseOrderApprovals'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrderApprovals_PurchaseOrderId] ON [scm].[PurchaseOrderApprovals] ([PurchaseOrderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104141713_AddPurchaseOrderApprovals'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrderApprovals_TenantId] ON [scm].[PurchaseOrderApprovals] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104141713_AddPurchaseOrderApprovals'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104141713_AddPurchaseOrderApprovals', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104143327_AddPurchaseOrderChanges'
)
BEGIN
    CREATE TABLE [scm].[PurchaseOrderChanges] (
        [Id] uniqueidentifier NOT NULL,
        [PurchaseOrderId] uniqueidentifier NOT NULL,
        [ChangeType] nvarchar(60) NOT NULL,
        [Reason] nvarchar(500) NOT NULL,
        [PreviousTotal] decimal(18,2) NULL,
        [NewTotal] decimal(18,2) NULL,
        [Status] nvarchar(40) NOT NULL,
        [RequestedOn] datetime2 NOT NULL,
        [ApprovedOn] datetime2 NULL,
        [ApprovedBy] nvarchar(200) NULL,
        [Notes] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_PurchaseOrderChanges] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PurchaseOrderChanges_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [scm].[PurchaseOrders] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104143327_AddPurchaseOrderChanges'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrderChanges_PurchaseOrderId] ON [scm].[PurchaseOrderChanges] ([PurchaseOrderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104143327_AddPurchaseOrderChanges'
)
BEGIN
    CREATE INDEX [IX_PurchaseOrderChanges_TenantId] ON [scm].[PurchaseOrderChanges] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104143327_AddPurchaseOrderChanges'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104143327_AddPurchaseOrderChanges', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE TABLE [scm].[Carriers] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Code] nvarchar(60) NULL,
        [Status] nvarchar(40) NULL,
        [ContactName] nvarchar(200) NULL,
        [ContactEmail] nvarchar(320) NULL,
        [ContactPhone] nvarchar(60) NULL,
        [Website] nvarchar(300) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Carriers] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE TABLE [scm].[Shipments] (
        [Id] uniqueidentifier NOT NULL,
        [ShipmentNumber] nvarchar(60) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [CarrierId] uniqueidentifier NOT NULL,
        [PurchaseOrderId] uniqueidentifier NULL,
        [ShippedDate] datetime2 NULL,
        [ExpectedDeliveryDate] datetime2 NULL,
        [TrackingNumber] nvarchar(100) NULL,
        [Mode] nvarchar(50) NULL,
        [Origin] nvarchar(200) NULL,
        [Destination] nvarchar(200) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Shipments] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Shipments_Carriers_CarrierId] FOREIGN KEY ([CarrierId]) REFERENCES [scm].[Carriers] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Shipments_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [scm].[PurchaseOrders] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE TABLE [scm].[GoodsReceipts] (
        [Id] uniqueidentifier NOT NULL,
        [ReceiptNumber] nvarchar(60) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [PurchaseOrderId] uniqueidentifier NULL,
        [ShipmentId] uniqueidentifier NULL,
        [ReceivedDate] datetime2 NOT NULL,
        [ReceivedBy] nvarchar(200) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_GoodsReceipts] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_GoodsReceipts_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [scm].[PurchaseOrders] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_GoodsReceipts_Shipments_ShipmentId] FOREIGN KEY ([ShipmentId]) REFERENCES [scm].[Shipments] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE TABLE [scm].[ShipmentLines] (
        [Id] uniqueidentifier NOT NULL,
        [ShipmentId] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NULL,
        [LineNumber] int NOT NULL,
        [Description] nvarchar(300) NULL,
        [Uom] nvarchar(40) NULL,
        [Quantity] decimal(18,2) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_ShipmentLines] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ShipmentLines_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_ShipmentLines_Shipments_ShipmentId] FOREIGN KEY ([ShipmentId]) REFERENCES [scm].[Shipments] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE TABLE [scm].[GoodsReceiptLines] (
        [Id] uniqueidentifier NOT NULL,
        [GoodsReceiptId] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NULL,
        [LineNumber] int NOT NULL,
        [Description] nvarchar(300) NULL,
        [Uom] nvarchar(40) NULL,
        [QuantityReceived] decimal(18,2) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_GoodsReceiptLines] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_GoodsReceiptLines_GoodsReceipts_GoodsReceiptId] FOREIGN KEY ([GoodsReceiptId]) REFERENCES [scm].[GoodsReceipts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_GoodsReceiptLines_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_Carriers_TenantId] ON [scm].[Carriers] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_GoodsReceiptLines_GoodsReceiptId] ON [scm].[GoodsReceiptLines] ([GoodsReceiptId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_GoodsReceiptLines_ItemMasterId] ON [scm].[GoodsReceiptLines] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_GoodsReceiptLines_TenantId] ON [scm].[GoodsReceiptLines] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_GoodsReceipts_PurchaseOrderId] ON [scm].[GoodsReceipts] ([PurchaseOrderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_GoodsReceipts_ShipmentId] ON [scm].[GoodsReceipts] ([ShipmentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_GoodsReceipts_TenantId] ON [scm].[GoodsReceipts] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_ShipmentLines_ItemMasterId] ON [scm].[ShipmentLines] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_ShipmentLines_ShipmentId] ON [scm].[ShipmentLines] ([ShipmentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_ShipmentLines_TenantId] ON [scm].[ShipmentLines] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_Shipments_CarrierId] ON [scm].[Shipments] ([CarrierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_Shipments_PurchaseOrderId] ON [scm].[Shipments] ([PurchaseOrderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    CREATE INDEX [IX_Shipments_TenantId] ON [scm].[Shipments] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104150223_AddLogisticsTables'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104150223_AddLogisticsTables', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104151048_AddWarehouses'
)
BEGIN
    CREATE TABLE [scm].[Warehouses] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Code] nvarchar(60) NULL,
        [Status] nvarchar(40) NULL,
        [AddressLine1] nvarchar(200) NULL,
        [AddressLine2] nvarchar(200) NULL,
        [City] nvarchar(120) NULL,
        [State] nvarchar(120) NULL,
        [PostalCode] nvarchar(40) NULL,
        [Country] nvarchar(120) NULL,
        [ContactName] nvarchar(200) NULL,
        [ContactEmail] nvarchar(320) NULL,
        [ContactPhone] nvarchar(60) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Warehouses] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104151048_AddWarehouses'
)
BEGIN
    CREATE INDEX [IX_Warehouses_TenantId] ON [scm].[Warehouses] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104151048_AddWarehouses'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104151048_AddWarehouses', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152132_AddInventoryItems'
)
BEGIN
    CREATE TABLE [scm].[InventoryItems] (
        [Id] uniqueidentifier NOT NULL,
        [WarehouseId] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NOT NULL,
        [OnHandQty] decimal(18,2) NOT NULL,
        [AvailableQty] decimal(18,2) NOT NULL,
        [ReservedQty] decimal(18,2) NOT NULL,
        [ReorderPoint] decimal(18,2) NOT NULL,
        [SafetyStock] decimal(18,2) NOT NULL,
        [LeadTimeDays] int NOT NULL,
        [LastCountedAt] datetime2 NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_InventoryItems] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_InventoryItems_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_InventoryItems_Warehouses_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [scm].[Warehouses] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152132_AddInventoryItems'
)
BEGIN
    CREATE INDEX [IX_InventoryItems_ItemMasterId] ON [scm].[InventoryItems] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152132_AddInventoryItems'
)
BEGIN
    CREATE INDEX [IX_InventoryItems_TenantId] ON [scm].[InventoryItems] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152132_AddInventoryItems'
)
BEGIN
    CREATE INDEX [IX_InventoryItems_WarehouseId] ON [scm].[InventoryItems] ([WarehouseId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152132_AddInventoryItems'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104152132_AddInventoryItems', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152815_AddReorderRules'
)
BEGIN
    CREATE TABLE [scm].[ReorderRules] (
        [Id] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NULL,
        [WarehouseId] uniqueidentifier NULL,
        [ReorderPoint] decimal(18,2) NOT NULL,
        [TargetStock] decimal(18,2) NOT NULL,
        [SafetyStock] decimal(18,2) NOT NULL,
        [LeadTimeDays] int NOT NULL,
        [IsActive] bit NOT NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_ReorderRules] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ReorderRules_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_ReorderRules_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_ReorderRules_Warehouses_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [scm].[Warehouses] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152815_AddReorderRules'
)
BEGIN
    CREATE INDEX [IX_ReorderRules_ItemMasterId] ON [scm].[ReorderRules] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152815_AddReorderRules'
)
BEGIN
    CREATE INDEX [IX_ReorderRules_SupplierId] ON [scm].[ReorderRules] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152815_AddReorderRules'
)
BEGIN
    CREATE INDEX [IX_ReorderRules_TenantId] ON [scm].[ReorderRules] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152815_AddReorderRules'
)
BEGIN
    CREATE INDEX [IX_ReorderRules_WarehouseId] ON [scm].[ReorderRules] ([WarehouseId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104152815_AddReorderRules'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104152815_AddReorderRules', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104154627_AddInspections'
)
BEGIN
    CREATE TABLE [scm].[Inspections] (
        [Id] uniqueidentifier NOT NULL,
        [InspectionNumber] nvarchar(60) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [InspectionDate] datetime2 NOT NULL,
        [InspectorName] nvarchar(200) NULL,
        [SupplierId] uniqueidentifier NULL,
        [ItemMasterId] uniqueidentifier NULL,
        [PurchaseOrderId] uniqueidentifier NULL,
        [GoodsReceiptId] uniqueidentifier NULL,
        [Result] nvarchar(120) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Inspections] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Inspections_GoodsReceipts_GoodsReceiptId] FOREIGN KEY ([GoodsReceiptId]) REFERENCES [scm].[GoodsReceipts] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_Inspections_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_Inspections_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [scm].[PurchaseOrders] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_Inspections_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104154627_AddInspections'
)
BEGIN
    CREATE INDEX [IX_Inspections_GoodsReceiptId] ON [scm].[Inspections] ([GoodsReceiptId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104154627_AddInspections'
)
BEGIN
    CREATE INDEX [IX_Inspections_ItemMasterId] ON [scm].[Inspections] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104154627_AddInspections'
)
BEGIN
    CREATE INDEX [IX_Inspections_PurchaseOrderId] ON [scm].[Inspections] ([PurchaseOrderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104154627_AddInspections'
)
BEGIN
    CREATE INDEX [IX_Inspections_SupplierId] ON [scm].[Inspections] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104154627_AddInspections'
)
BEGIN
    CREATE INDEX [IX_Inspections_TenantId] ON [scm].[Inspections] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104154627_AddInspections'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104154627_AddInspections', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    CREATE TABLE [scm].[NonConformances] (
        [Id] uniqueidentifier NOT NULL,
        [ReferenceNumber] nvarchar(60) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [Severity] nvarchar(40) NOT NULL,
        [ReportedDate] datetime2 NOT NULL,
        [ReportedBy] nvarchar(200) NULL,
        [SupplierId] uniqueidentifier NULL,
        [ItemMasterId] uniqueidentifier NULL,
        [InspectionId] uniqueidentifier NULL,
        [PurchaseOrderId] uniqueidentifier NULL,
        [GoodsReceiptId] uniqueidentifier NULL,
        [Description] nvarchar(2000) NULL,
        [Disposition] nvarchar(200) NULL,
        [DueDate] datetime2 NULL,
        [ClosedDate] datetime2 NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_NonConformances] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_NonConformances_GoodsReceipts_GoodsReceiptId] FOREIGN KEY ([GoodsReceiptId]) REFERENCES [scm].[GoodsReceipts] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_NonConformances_Inspections_InspectionId] FOREIGN KEY ([InspectionId]) REFERENCES [scm].[Inspections] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_NonConformances_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_NonConformances_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [scm].[PurchaseOrders] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_NonConformances_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    CREATE INDEX [IX_NonConformances_GoodsReceiptId] ON [scm].[NonConformances] ([GoodsReceiptId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    CREATE INDEX [IX_NonConformances_InspectionId] ON [scm].[NonConformances] ([InspectionId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    CREATE INDEX [IX_NonConformances_ItemMasterId] ON [scm].[NonConformances] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    CREATE INDEX [IX_NonConformances_PurchaseOrderId] ON [scm].[NonConformances] ([PurchaseOrderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    CREATE INDEX [IX_NonConformances_SupplierId] ON [scm].[NonConformances] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    CREATE INDEX [IX_NonConformances_TenantId] ON [scm].[NonConformances] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104155311_AddNonConformances'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104155311_AddNonConformances', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104160529_AddCorrectiveActions'
)
BEGIN
    CREATE TABLE [scm].[CorrectiveActions] (
        [Id] uniqueidentifier NOT NULL,
        [ActionNumber] nvarchar(60) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [ActionType] nvarchar(80) NULL,
        [Owner] nvarchar(200) NULL,
        [NonConformanceId] uniqueidentifier NULL,
        [SupplierId] uniqueidentifier NULL,
        [OpenedDate] datetime2 NOT NULL,
        [DueDate] datetime2 NULL,
        [ClosedDate] datetime2 NULL,
        [RootCause] nvarchar(2000) NULL,
        [ActionPlan] nvarchar(2000) NULL,
        [VerificationNotes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CorrectiveActions] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_CorrectiveActions_NonConformances_NonConformanceId] FOREIGN KEY ([NonConformanceId]) REFERENCES [scm].[NonConformances] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_CorrectiveActions_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104160529_AddCorrectiveActions'
)
BEGIN
    CREATE INDEX [IX_CorrectiveActions_NonConformanceId] ON [scm].[CorrectiveActions] ([NonConformanceId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104160529_AddCorrectiveActions'
)
BEGIN
    CREATE INDEX [IX_CorrectiveActions_SupplierId] ON [scm].[CorrectiveActions] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104160529_AddCorrectiveActions'
)
BEGIN
    CREATE INDEX [IX_CorrectiveActions_TenantId] ON [scm].[CorrectiveActions] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104160529_AddCorrectiveActions'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104160529_AddCorrectiveActions', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104161429_AddSpendAnalyticsSnapshots'
)
BEGIN
    CREATE TABLE [scm].[SpendAnalyticsSnapshots] (
        [Id] uniqueidentifier NOT NULL,
        [PeriodStart] datetime2 NOT NULL,
        [PeriodEnd] datetime2 NOT NULL,
        [SupplierId] uniqueidentifier NULL,
        [Category] nvarchar(160) NULL,
        [Currency] nvarchar(10) NOT NULL,
        [TotalSpend] decimal(18,2) NOT NULL,
        [Savings] decimal(18,2) NOT NULL,
        [PurchaseOrderCount] int NOT NULL,
        [AvgLeadTimeDays] decimal(6,2) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SpendAnalyticsSnapshots] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SpendAnalyticsSnapshots_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104161429_AddSpendAnalyticsSnapshots'
)
BEGIN
    CREATE INDEX [IX_SpendAnalyticsSnapshots_SupplierId] ON [scm].[SpendAnalyticsSnapshots] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104161429_AddSpendAnalyticsSnapshots'
)
BEGIN
    CREATE INDEX [IX_SpendAnalyticsSnapshots_TenantId] ON [scm].[SpendAnalyticsSnapshots] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104161429_AddSpendAnalyticsSnapshots'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104161429_AddSpendAnalyticsSnapshots', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104162114_AddSupplierPerformanceSnapshots'
)
BEGIN
    CREATE TABLE [scm].[SupplierPerformanceSnapshots] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [PeriodStart] datetime2 NOT NULL,
        [PeriodEnd] datetime2 NOT NULL,
        [OnTimeDeliveryRate] decimal(5,2) NOT NULL,
        [DefectRate] decimal(5,2) NOT NULL,
        [FillRate] decimal(5,2) NOT NULL,
        [CostVariance] decimal(6,2) NOT NULL,
        [ResponsivenessScore] decimal(5,2) NOT NULL,
        [OverallScore] decimal(5,2) NOT NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierPerformanceSnapshots] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierPerformanceSnapshots_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104162114_AddSupplierPerformanceSnapshots'
)
BEGIN
    CREATE INDEX [IX_SupplierPerformanceSnapshots_SupplierId] ON [scm].[SupplierPerformanceSnapshots] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104162114_AddSupplierPerformanceSnapshots'
)
BEGIN
    CREATE INDEX [IX_SupplierPerformanceSnapshots_TenantId] ON [scm].[SupplierPerformanceSnapshots] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104162114_AddSupplierPerformanceSnapshots'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104162114_AddSupplierPerformanceSnapshots', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104163030_AddSavingsTrackingSnapshots'
)
BEGIN
    CREATE TABLE [scm].[SavingsTrackingSnapshots] (
        [Id] uniqueidentifier NOT NULL,
        [PeriodStart] datetime2 NOT NULL,
        [PeriodEnd] datetime2 NOT NULL,
        [SupplierId] uniqueidentifier NULL,
        [Category] nvarchar(160) NULL,
        [Currency] nvarchar(10) NOT NULL,
        [BaselineSpend] decimal(18,2) NOT NULL,
        [ActualSpend] decimal(18,2) NOT NULL,
        [SavingsAmount] decimal(18,2) NOT NULL,
        [SavingsRate] decimal(6,2) NOT NULL,
        [Initiative] nvarchar(200) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SavingsTrackingSnapshots] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SavingsTrackingSnapshots_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104163030_AddSavingsTrackingSnapshots'
)
BEGIN
    CREATE INDEX [IX_SavingsTrackingSnapshots_SupplierId] ON [scm].[SavingsTrackingSnapshots] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104163030_AddSavingsTrackingSnapshots'
)
BEGIN
    CREATE INDEX [IX_SavingsTrackingSnapshots_TenantId] ON [scm].[SavingsTrackingSnapshots] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104163030_AddSavingsTrackingSnapshots'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104163030_AddSavingsTrackingSnapshots', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE TABLE [scm].[Rfqs] (
        [Id] uniqueidentifier NOT NULL,
        [RfqNumber] nvarchar(60) NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [IssueDate] datetime2 NOT NULL,
        [CloseDate] datetime2 NULL,
        [Type] nvarchar(80) NULL,
        [Currency] nvarchar(10) NULL,
        [Description] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Rfqs] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE TABLE [scm].[RfqAwards] (
        [Id] uniqueidentifier NOT NULL,
        [RfqId] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [AwardNumber] nvarchar(60) NOT NULL,
        [AwardDate] datetime2 NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [AwardAmount] decimal(18,2) NOT NULL,
        [Currency] nvarchar(10) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_RfqAwards] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RfqAwards_Rfqs_RfqId] FOREIGN KEY ([RfqId]) REFERENCES [scm].[Rfqs] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_RfqAwards_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE TABLE [scm].[RfqLines] (
        [Id] uniqueidentifier NOT NULL,
        [RfqId] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NULL,
        [LineNumber] int NOT NULL,
        [Description] nvarchar(300) NULL,
        [Uom] nvarchar(40) NULL,
        [Quantity] decimal(18,2) NOT NULL,
        [TargetPrice] decimal(18,2) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_RfqLines] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RfqLines_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_RfqLines_Rfqs_RfqId] FOREIGN KEY ([RfqId]) REFERENCES [scm].[Rfqs] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE TABLE [scm].[SupplierQuotes] (
        [Id] uniqueidentifier NOT NULL,
        [RfqId] uniqueidentifier NOT NULL,
        [SupplierId] uniqueidentifier NOT NULL,
        [QuoteNumber] nvarchar(60) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [SubmittedDate] datetime2 NOT NULL,
        [Currency] nvarchar(10) NULL,
        [TotalAmount] decimal(18,2) NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierQuotes] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierQuotes_Rfqs_RfqId] FOREIGN KEY ([RfqId]) REFERENCES [scm].[Rfqs] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_SupplierQuotes_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [scm].[Suppliers] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE TABLE [scm].[SupplierQuoteLines] (
        [Id] uniqueidentifier NOT NULL,
        [SupplierQuoteId] uniqueidentifier NOT NULL,
        [RfqLineId] uniqueidentifier NULL,
        [ItemMasterId] uniqueidentifier NULL,
        [LineNumber] int NOT NULL,
        [Description] nvarchar(300) NULL,
        [Uom] nvarchar(40) NULL,
        [Quantity] decimal(18,2) NOT NULL,
        [UnitPrice] decimal(18,2) NOT NULL,
        [LineTotal] decimal(18,2) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupplierQuoteLines] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupplierQuoteLines_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_SupplierQuoteLines_RfqLines_RfqLineId] FOREIGN KEY ([RfqLineId]) REFERENCES [scm].[RfqLines] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_SupplierQuoteLines_SupplierQuotes_SupplierQuoteId] FOREIGN KEY ([SupplierQuoteId]) REFERENCES [scm].[SupplierQuotes] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_RfqAwards_RfqId] ON [scm].[RfqAwards] ([RfqId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_RfqAwards_SupplierId] ON [scm].[RfqAwards] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_RfqAwards_TenantId] ON [scm].[RfqAwards] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_RfqLines_ItemMasterId] ON [scm].[RfqLines] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_RfqLines_RfqId] ON [scm].[RfqLines] ([RfqId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_RfqLines_TenantId] ON [scm].[RfqLines] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_Rfqs_TenantId] ON [scm].[Rfqs] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_SupplierQuoteLines_ItemMasterId] ON [scm].[SupplierQuoteLines] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_SupplierQuoteLines_RfqLineId] ON [scm].[SupplierQuoteLines] ([RfqLineId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_SupplierQuoteLines_SupplierQuoteId] ON [scm].[SupplierQuoteLines] ([SupplierQuoteId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_SupplierQuoteLines_TenantId] ON [scm].[SupplierQuoteLines] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_SupplierQuotes_RfqId] ON [scm].[SupplierQuotes] ([RfqId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_SupplierQuotes_SupplierId] ON [scm].[SupplierQuotes] ([SupplierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    CREATE INDEX [IX_SupplierQuotes_TenantId] ON [scm].[SupplierQuotes] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260104165648_AddSourcingSchemas'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260104165648_AddSourcingSchemas', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105043426_AddLeadStatusUniqueIndex'
)
BEGIN
    ALTER TABLE [scm].[SupplierQuoteLines] DROP CONSTRAINT [FK_SupplierQuoteLines_RfqLines_RfqLineId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105043426_AddLeadStatusUniqueIndex'
)
BEGIN
    DECLARE @var1 nvarchar(max);
    SELECT @var1 = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[crm].[LeadStatuses]') AND [c].[name] = N'Name');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [crm].[LeadStatuses] DROP CONSTRAINT ' + @var1 + ';');
    ALTER TABLE [crm].[LeadStatuses] ALTER COLUMN [Name] nvarchar(450) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105043426_AddLeadStatusUniqueIndex'
)
BEGIN
    WITH ranked AS (
        SELECT
            Id,
            TenantId,
            Name,
            ROW_NUMBER() OVER (
                PARTITION BY TenantId, Name
                ORDER BY CreatedAtUtc, Id
            ) AS rn,
            MIN(Id) OVER (PARTITION BY TenantId, Name) AS canonical_id
        FROM crm.LeadStatuses
    )
    UPDATE l
    SET l.LeadStatusId = r.canonical_id
    FROM crm.Leads l
    INNER JOIN ranked r ON r.Id = l.LeadStatusId
    WHERE r.rn > 1 AND r.Id <> r.canonical_id;

    WITH ranked AS (
        SELECT
            Id,
            TenantId,
            Name,
            ROW_NUMBER() OVER (
                PARTITION BY TenantId, Name
                ORDER BY CreatedAtUtc, Id
            ) AS rn,
            MIN(Id) OVER (PARTITION BY TenantId, Name) AS canonical_id
        FROM crm.LeadStatuses
    )
    UPDATE h
    SET h.LeadStatusId = r.canonical_id
    FROM crm.LeadStatusHistories h
    INNER JOIN ranked r ON r.Id = h.LeadStatusId
    WHERE r.rn > 1 AND r.Id <> r.canonical_id;

    WITH ranked AS (
        SELECT
            Id,
            TenantId,
            Name,
            ROW_NUMBER() OVER (
                PARTITION BY TenantId, Name
                ORDER BY CreatedAtUtc, Id
            ) AS rn
        FROM crm.LeadStatuses
    )
    DELETE ls
    FROM crm.LeadStatuses ls
    INNER JOIN ranked r ON r.Id = ls.Id
    WHERE r.rn > 1;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105043426_AddLeadStatusUniqueIndex'
)
BEGIN
    CREATE UNIQUE INDEX [IX_LeadStatuses_TenantId_Name] ON [crm].[LeadStatuses] ([TenantId], [Name]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105043426_AddLeadStatusUniqueIndex'
)
BEGIN
    ALTER TABLE [scm].[SupplierQuoteLines] ADD CONSTRAINT [FK_SupplierQuoteLines_RfqLines_RfqLineId] FOREIGN KEY ([RfqLineId]) REFERENCES [scm].[RfqLines] ([Id]) ON DELETE NO ACTION;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105043426_AddLeadStatusUniqueIndex'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260105043426_AddLeadStatusUniqueIndex', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105053855_AddActivityOutcome'
)
BEGIN
    ALTER TABLE [crm].[Activities] ADD [Outcome] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260105053855_AddActivityOutcome'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260105053855_AddActivityOutcome', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260110084705_AddAuditEvents'
)
BEGIN
    CREATE TABLE [crm].[AuditEvents] (
        [Id] uniqueidentifier NOT NULL,
        [EntityType] nvarchar(80) NOT NULL,
        [EntityId] uniqueidentifier NOT NULL,
        [Action] nvarchar(80) NOT NULL,
        [Field] nvarchar(120) NULL,
        [OldValue] nvarchar(2000) NULL,
        [NewValue] nvarchar(2000) NULL,
        [ChangedByUserId] uniqueidentifier NULL,
        [ChangedByName] nvarchar(max) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_AuditEvents] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260110084705_AddAuditEvents'
)
BEGIN
    CREATE INDEX [IX_AuditEvents_TenantId] ON [crm].[AuditEvents] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260110084705_AddAuditEvents'
)
BEGIN
    CREATE INDEX [IX_AuditEvents_TenantId_EntityType_EntityId_CreatedAtUtc] ON [crm].[AuditEvents] ([TenantId], [EntityType], [EntityId], [CreatedAtUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260110084705_AddAuditEvents'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260110084705_AddAuditEvents', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260112075837_AddCommandCenterLayoutJson'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [CommandCenterLayoutJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260112075837_AddCommandCenterLayoutJson'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260112075837_AddCommandCenterLayoutJson', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260117070000_AddUserLoginLocation'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [LastLoginIp] nvarchar(64) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260117070000_AddUserLoginLocation'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [LastLoginLocation] nvarchar(256) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260117070000_AddUserLoginLocation'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260117070000_AddUserLoginLocation', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260118165324_AddTimeZones'
)
BEGIN
    CREATE TABLE [crm].[TimeZones] (
        [Id] uniqueidentifier NOT NULL,
        [IanaId] nvarchar(80) NOT NULL,
        [Label] nvarchar(160) NOT NULL,
        [UtcOffsetMinutes] int NOT NULL,
        [FlagCode] nvarchar(8) NOT NULL,
        [IsActive] bit NOT NULL,
        [SortOrder] int NOT NULL,
        CONSTRAINT [PK_TimeZones] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260118165324_AddTimeZones'
)
BEGIN
    CREATE UNIQUE INDEX [IX_TimeZones_IanaId] ON [crm].[TimeZones] ([IanaId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260118165324_AddTimeZones'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260118165324_AddTimeZones', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260119120000_AddUserMustChangePassword'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [MustChangePassword] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260119120000_AddUserMustChangePassword'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260119120000_AddUserMustChangePassword', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260120192352_AddInviteTokens'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [InviteTokenExpiresAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260120192352_AddInviteTokens'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [InviteTokenHash] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260120192352_AddInviteTokens'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260120192352_AddInviteTokens', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125152725_AddLeadOutcomeFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [DisqualifiedReason] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125152725_AddLeadOutcomeFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [FirstTouchDueAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125152725_AddLeadOutcomeFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [FirstTouchedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125152725_AddLeadOutcomeFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [NurtureFollowUpAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125152725_AddLeadOutcomeFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [QualifiedNotes] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125152725_AddLeadOutcomeFields'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260125152725_AddLeadOutcomeFields', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125195816_AddContactBuyingRole'
)
BEGIN
    ALTER TABLE [crm].[Contacts] ADD [BuyingRole] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125195816_AddContactBuyingRole'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260125195816_AddContactBuyingRole', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125210020_AddOpportunityApprovals'
)
BEGIN
    CREATE TABLE [crm].[OpportunityApprovals] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [ApproverRole] nvarchar(max) NOT NULL,
        [ApproverUserId] uniqueidentifier NULL,
        [RequestedByUserId] uniqueidentifier NULL,
        [Status] nvarchar(max) NOT NULL,
        [RequestedOn] datetime2 NOT NULL,
        [DecisionOn] datetime2 NULL,
        [Notes] nvarchar(max) NULL,
        [Amount] decimal(18,2) NOT NULL,
        [Currency] nvarchar(max) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityApprovals] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityApprovals_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125210020_AddOpportunityApprovals'
)
BEGIN
    CREATE INDEX [IX_OpportunityApprovals_OpportunityId] ON [crm].[OpportunityApprovals] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125210020_AddOpportunityApprovals'
)
BEGIN
    CREATE INDEX [IX_OpportunityApprovals_TenantId] ON [crm].[OpportunityApprovals] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260125210020_AddOpportunityApprovals'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260125210020_AddOpportunityApprovals', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DiscountAmount] decimal(18,2) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DiscountPercent] decimal(5,2) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [LegalNotes] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [LegalReviewStatus] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [PricingNotes] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [SecurityNotes] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [SecurityReviewStatus] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126031041_AddOpportunityReviewFields'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260126031041_AddOpportunityReviewFields', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126032654_AddOpportunityApprovalPurpose'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovals] ADD [Purpose] nvarchar(40) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126032654_AddOpportunityApprovalPurpose'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260126032654_AddOpportunityApprovalPurpose', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126033911_AddOpportunityReviewChecklistItems'
)
BEGIN
    CREATE TABLE [crm].[OpportunityReviewChecklistItems] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [Type] nvarchar(40) NOT NULL,
        [Title] nvarchar(240) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [Notes] nvarchar(max) NULL,
        [CompletedAtUtc] datetime2 NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityReviewChecklistItems] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityReviewChecklistItems_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126033911_AddOpportunityReviewChecklistItems'
)
BEGIN
    CREATE INDEX [IX_OpportunityReviewChecklistItems_OpportunityId] ON [crm].[OpportunityReviewChecklistItems] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126033911_AddOpportunityReviewChecklistItems'
)
BEGIN
    CREATE INDEX [IX_OpportunityReviewChecklistItems_TenantId] ON [crm].[OpportunityReviewChecklistItems] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260126033911_AddOpportunityReviewChecklistItems'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260126033911_AddOpportunityReviewChecklistItems', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [ContractEndDateUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [ContractStartDateUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [OpportunityType] nvarchar(max) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [Renewal30TaskCreatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [Renewal60TaskCreatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [Renewal90TaskCreatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [RenewalOfOpportunityId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [RenewalOpportunityId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260127090243_AddOpportunityRenewals'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260127090243_AddOpportunityRenewals', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128023230_AddActivityTemplateKey'
)
BEGIN
    ALTER TABLE [crm].[Activities] ADD [TemplateKey] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128023230_AddActivityTemplateKey'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260128023230_AddActivityTemplateKey', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128030733_AddOpportunityTeamMembers'
)
BEGIN
    CREATE TABLE [crm].[OpportunityTeamMembers] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [Role] nvarchar(max) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityTeamMembers] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityTeamMembers_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_OpportunityTeamMembers_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128030733_AddOpportunityTeamMembers'
)
BEGIN
    CREATE UNIQUE INDEX [IX_OpportunityTeamMembers_OpportunityId_UserId] ON [crm].[OpportunityTeamMembers] ([OpportunityId], [UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128030733_AddOpportunityTeamMembers'
)
BEGIN
    CREATE INDEX [IX_OpportunityTeamMembers_TenantId] ON [crm].[OpportunityTeamMembers] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128030733_AddOpportunityTeamMembers'
)
BEGIN
    CREATE INDEX [IX_OpportunityTeamMembers_UserId] ON [crm].[OpportunityTeamMembers] ([UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128030733_AddOpportunityTeamMembers'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260128030733_AddOpportunityTeamMembers', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DeliveryCompletedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DeliveryHandoffRisks] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DeliveryHandoffScope] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DeliveryHandoffTimeline] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DeliveryOwnerId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [DeliveryStatus] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    CREATE TABLE [crm].[OpportunityOnboardingItems] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [Type] nvarchar(450) NOT NULL,
        [Title] nvarchar(450) NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        [DueDateUtc] datetime2 NULL,
        [CompletedAtUtc] datetime2 NULL,
        [Notes] nvarchar(max) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityOnboardingItems] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityOnboardingItems_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    CREATE INDEX [IX_OpportunityOnboardingItems_OpportunityId_Type_Title] ON [crm].[OpportunityOnboardingItems] ([OpportunityId], [Type], [Title]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    CREATE INDEX [IX_OpportunityOnboardingItems_TenantId] ON [crm].[OpportunityOnboardingItems] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260128114751_AddOpportunityOnboardingAndDelivery'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260128114751_AddOpportunityOnboardingAndDelivery', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260129003805_AddAssistantChat'
)
BEGIN
    CREATE TABLE [crm].[AssistantMessages] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [Role] nvarchar(max) NOT NULL,
        [Content] nvarchar(max) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_AssistantMessages] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260129003805_AddAssistantChat'
)
BEGIN
    CREATE TABLE [crm].[AssistantThreads] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [ThreadId] nvarchar(max) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_AssistantThreads] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260129003805_AddAssistantChat'
)
BEGIN
    CREATE INDEX [IX_AssistantMessages_TenantId] ON [crm].[AssistantMessages] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260129003805_AddAssistantChat'
)
BEGIN
    CREATE INDEX [IX_AssistantMessages_TenantId_UserId_CreatedAtUtc] ON [crm].[AssistantMessages] ([TenantId], [UserId], [CreatedAtUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260129003805_AddAssistantChat'
)
BEGIN
    CREATE INDEX [IX_AssistantThreads_TenantId] ON [crm].[AssistantThreads] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260129003805_AddAssistantChat'
)
BEGIN
    CREATE UNIQUE INDEX [IX_AssistantThreads_TenantId_UserId] ON [crm].[AssistantThreads] ([TenantId], [UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260129003805_AddAssistantChat'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260129003805_AddAssistantChat', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260201054419_AddLeadCadenceChannels'
)
BEGIN
    CREATE TABLE [crm].[LeadCadenceChannels] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Order] int NOT NULL,
        [IsActive] bit NOT NULL,
        [IsDefault] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_LeadCadenceChannels] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260201054419_AddLeadCadenceChannels'
)
BEGIN
    CREATE INDEX [IX_LeadCadenceChannels_TenantId] ON [crm].[LeadCadenceChannels] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260201054419_AddLeadCadenceChannels'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260201054419_AddLeadCadenceChannels', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [BudgetAvailability] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [BudgetEvidence] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [BuyingTimeline] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [EconomicBuyer] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [EconomicBuyerEvidence] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [IcpFit] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [IcpFitEvidence] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ProblemEvidence] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ProblemSeverity] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ReadinessEvidence] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ReadinessToSpend] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [TimelineEvidence] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260202000356_AddLeadQualificationFactors'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260202000356_AddLeadQualificationFactors', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260204233855_AddLeadQualificationValidationDates'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [BudgetValidatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260204233855_AddLeadQualificationValidationDates'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [BuyingTimelineValidatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260204233855_AddLeadQualificationValidationDates'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [EconomicBuyerValidatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260204233855_AddLeadQualificationValidationDates'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [IcpFitValidatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260204233855_AddLeadQualificationValidationDates'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ProblemSeverityValidatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260204233855_AddLeadQualificationValidationDates'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ReadinessValidatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260204233855_AddLeadQualificationValidationDates'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260204233855_AddLeadQualificationValidationDates', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207011241_AddRoleLevelsAndDashboardDefaults'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [DashboardLayoutDefaultsJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207011241_AddRoleLevelsAndDashboardDefaults'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [Level] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207011241_AddRoleLevelsAndDashboardDefaults'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260207011241_AddRoleLevelsAndDashboardDefaults', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207120000_AddActivityNextStepFields'
)
BEGIN
    ALTER TABLE [crm].[Activities] ADD [NextStepSubject] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207120000_AddActivityNextStepFields'
)
BEGIN
    ALTER TABLE [crm].[Activities] ADD [NextStepDueDateUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207120000_AddActivityNextStepFields'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260207120000_AddActivityNextStepFields', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207121500_AddLeadRoutingReason'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [RoutingReason] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207121500_AddLeadRoutingReason'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260207121500_AddLeadRoutingReason', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207222951_AddOpportunityQualificationFitFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [BuyingProcess] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207222951_AddOpportunityQualificationFitFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [Requirements] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207222951_AddOpportunityQualificationFitFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [SuccessCriteria] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260207222951_AddOpportunityQualificationFitFields'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260207222951_AddOpportunityQualificationFitFields', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208045440_AddApprovalWorkflowPolicyJson'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ApprovalWorkflowJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208045440_AddApprovalWorkflowPolicyJson'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208045440_AddApprovalWorkflowPolicyJson', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovals] ADD [ApprovalChainId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovals] ADD [StepOrder] int NOT NULL DEFAULT 1;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    CREATE TABLE [crm].[OpportunityApprovalChains] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [RequestedByUserId] uniqueidentifier NULL,
        [Purpose] nvarchar(max) NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        [CurrentStep] int NOT NULL,
        [TotalSteps] int NOT NULL,
        [StepsJson] nvarchar(max) NOT NULL,
        [RequestedOn] datetime2 NOT NULL,
        [CompletedOn] datetime2 NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityApprovalChains] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityApprovalChains_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    CREATE INDEX [IX_OpportunityApprovals_ApprovalChainId] ON [crm].[OpportunityApprovals] ([ApprovalChainId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    CREATE INDEX [IX_OpportunityApprovalChains_OpportunityId] ON [crm].[OpportunityApprovalChains] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    CREATE INDEX [IX_OpportunityApprovalChains_TenantId] ON [crm].[OpportunityApprovalChains] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovals] ADD CONSTRAINT [FK_OpportunityApprovals_OpportunityApprovalChains_ApprovalChainId] FOREIGN KEY ([ApprovalChainId]) REFERENCES [crm].[OpportunityApprovalChains] ([Id]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208050343_AddOpportunityApprovalChains'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208050343_AddOpportunityApprovalChains', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [HierarchyLevel] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [HierarchyPath] nvarchar(450) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [ParentRoleId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN

    UPDATE [identity].[Roles]
    SET HierarchyLevel = 1,
        HierarchyPath = CAST(Id AS nvarchar(450))
    WHERE HierarchyLevel IS NULL AND HierarchyPath IS NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    CREATE INDEX [IX_Roles_ParentRoleId] ON [identity].[Roles] ([ParentRoleId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_Roles_TenantId_HierarchyPath] ON [identity].[Roles] ([TenantId], [HierarchyPath]) WHERE [HierarchyPath] IS NOT NULL AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_Roles_TenantId_ParentRoleId] ON [identity].[Roles] ([TenantId], [ParentRoleId]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD CONSTRAINT [FK_Roles_Roles_ParentRoleId] FOREIGN KEY ([ParentRoleId]) REFERENCES [identity].[Roles] ([Id]) ON DELETE NO ACTION;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208064929_AddRoleHierarchy'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208064929_AddRoleHierarchy', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208140152_AddRoleVisibilityScope'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [VisibilityScope] int NOT NULL DEFAULT 1;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208140152_AddRoleVisibilityScope'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208140152_AddRoleVisibilityScope', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208150337_AddDashboardTemplates'
)
BEGIN
    CREATE TABLE [DashboardTemplates] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(160) NOT NULL,
        [Description] nvarchar(500) NULL,
        [LayoutJson] nvarchar(max) NOT NULL,
        [IsDefault] bit NOT NULL DEFAULT CAST(0 AS bit),
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_DashboardTemplates] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208150337_AddDashboardTemplates'
)
BEGIN
    CREATE INDEX [IX_DashboardTemplates_TenantId] ON [DashboardTemplates] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208150337_AddDashboardTemplates'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_DashboardTemplates_TenantId_IsDefault] ON [DashboardTemplates] ([TenantId], [IsDefault]) WHERE [IsDefault] = 1 AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208150337_AddDashboardTemplates'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208150337_AddDashboardTemplates', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [SecurityLevelId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    CREATE TABLE [SecurityLevelDefinitions] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(120) NOT NULL,
        [Description] nvarchar(500) NULL,
        [Rank] int NOT NULL,
        [IsDefault] bit NOT NULL DEFAULT CAST(0 AS bit),
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SecurityLevelDefinitions] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    CREATE INDEX [IX_Roles_SecurityLevelId] ON [identity].[Roles] ([SecurityLevelId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    CREATE INDEX [IX_SecurityLevelDefinitions_TenantId] ON [SecurityLevelDefinitions] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_SecurityLevelDefinitions_TenantId_IsDefault] ON [SecurityLevelDefinitions] ([TenantId], [IsDefault]) WHERE [IsDefault] = 1 AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_SecurityLevelDefinitions_TenantId_Name] ON [SecurityLevelDefinitions] ([TenantId], [Name]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD CONSTRAINT [FK_Roles_SecurityLevelDefinitions_SecurityLevelId] FOREIGN KEY ([SecurityLevelId]) REFERENCES [SecurityLevelDefinitions] ([Id]) ON DELETE NO ACTION;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208152258_AddSecurityLevelDefinitions'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208152258_AddSecurityLevelDefinitions', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208173342_AddRoleBasePermissions'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [BasePermissionsJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208173342_AddRoleBasePermissions'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [BasePermissionsUpdatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208173342_AddRoleBasePermissions'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [DriftAcceptedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208173342_AddRoleBasePermissions'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [DriftAcceptedBy] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208173342_AddRoleBasePermissions'
)
BEGIN
    ALTER TABLE [identity].[Roles] ADD [DriftNotes] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208173342_AddRoleBasePermissions'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208173342_AddRoleBasePermissions', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208203420_AddOpportunityAutomationRulesAndLeadSlaSettings'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [LeadFirstTouchSlaHours] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208203420_AddOpportunityAutomationRulesAndLeadSlaSettings'
)
BEGIN
    CREATE TABLE [crm].[OpportunityStageAutomationRules] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(450) NOT NULL,
        [StageName] nvarchar(450) NOT NULL,
        [TaskSubject] nvarchar(max) NOT NULL,
        [TaskDescription] nvarchar(max) NULL,
        [DueInDays] int NOT NULL,
        [Priority] nvarchar(max) NULL,
        [IsActive] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityStageAutomationRules] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208203420_AddOpportunityAutomationRulesAndLeadSlaSettings'
)
BEGIN
    CREATE INDEX [IX_OpportunityStageAutomationRules_TenantId] ON [crm].[OpportunityStageAutomationRules] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208203420_AddOpportunityAutomationRulesAndLeadSlaSettings'
)
BEGIN
    CREATE INDEX [IX_OpportunityStageAutomationRules_TenantId_StageName_Name] ON [crm].[OpportunityStageAutomationRules] ([TenantId], [StageName], [Name]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208203420_AddOpportunityAutomationRulesAndLeadSlaSettings'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208203420_AddOpportunityAutomationRulesAndLeadSlaSettings', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208232853_AddOpportunityCloseDefaults'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [DefaultContractTermMonths] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208232853_AddOpportunityCloseDefaults'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [DefaultDeliveryOwnerRoleId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208232853_AddOpportunityCloseDefaults'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208232853_AddOpportunityCloseDefaults', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208234709_AddLeadLossFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [LossCompetitor] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208234709_AddLeadLossFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [LossNotes] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208234709_AddLeadLossFields'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [LossReason] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260208234709_AddLeadLossFields'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260208234709_AddLeadLossFields', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260209190809_AddUserMonthlyQuota'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [MonthlyQuota] decimal(18,2) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260209190809_AddUserMonthlyQuota'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260209190809_AddUserMonthlyQuota', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260209201729_AddCurrencyDefinitions'
)
BEGIN
    CREATE TABLE [crm].[Currencies] (
        [Id] uniqueidentifier NOT NULL,
        [Code] nvarchar(8) NOT NULL,
        [Name] nvarchar(120) NOT NULL,
        [Symbol] nvarchar(16) NOT NULL,
        [IsActive] bit NOT NULL,
        [SortOrder] int NOT NULL,
        CONSTRAINT [PK_Currencies] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260209201729_AddCurrencyDefinitions'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Currencies_Code] ON [crm].[Currencies] ([Code]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260209201729_AddCurrencyDefinitions'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260209201729_AddCurrencyDefinitions', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210015108_AddOpportunityProposalFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [ProposalGeneratedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210015108_AddOpportunityProposalFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [ProposalLink] nvarchar(1024) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210015108_AddOpportunityProposalFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [ProposalNotes] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210015108_AddOpportunityProposalFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [ProposalSentAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210015108_AddOpportunityProposalFields'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [ProposalStatus] nvarchar(40) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210015108_AddOpportunityProposalFields'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260210015108_AddOpportunityProposalFields', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210021250_AddOpportunityPreSalesDetails'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [PreSalesApproach] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210021250_AddOpportunityPreSalesDetails'
)
BEGIN
    ALTER TABLE [crm].[Opportunities] ADD [PreSalesScope] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260210021250_AddOpportunityPreSalesDetails'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260210021250_AddOpportunityPreSalesDetails', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260212032355_AddLeadPhoneType'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [PhoneTypeId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260212032355_AddLeadPhoneType'
)
BEGIN
    CREATE TABLE [crm].[PhoneTypes] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(80) NOT NULL,
        [IsActive] bit NOT NULL,
        [SortOrder] int NOT NULL,
        [IsDefault] bit NOT NULL,
        CONSTRAINT [PK_PhoneTypes] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260212032355_AddLeadPhoneType'
)
BEGIN
    CREATE INDEX [IX_Leads_PhoneTypeId] ON [crm].[Leads] ([PhoneTypeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260212032355_AddLeadPhoneType'
)
BEGIN
    CREATE UNIQUE INDEX [IX_PhoneTypes_Name] ON [crm].[PhoneTypes] ([Name]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260212032355_AddLeadPhoneType'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD CONSTRAINT [FK_Leads_PhoneTypes_PhoneTypeId] FOREIGN KEY ([PhoneTypeId]) REFERENCES [crm].[PhoneTypes] ([Id]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260212032355_AddLeadPhoneType'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260212032355_AddLeadPhoneType', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260215170257_AddUserLastInviteSentAtUtc'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [LastInviteSentAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260215170257_AddUserLastInviteSentAtUtc'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260215170257_AddUserLastInviteSentAtUtc', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260219224000_AddAssistantActionScoringPolicySettings'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [AssistantActionScoringPolicyJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260219224000_AddAssistantActionScoringPolicySettings'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260219224000_AddAssistantActionScoringPolicySettings', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260223120000_AddSupportingDocumentPolicySettings'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [SupportingDocumentPolicyJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260223120000_AddSupportingDocumentPolicySettings'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260223120000_AddSupportingDocumentPolicySettings', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE TABLE [crm].[DecisionRequests] (
        [Id] uniqueidentifier NOT NULL,
        [LegacyApprovalId] uniqueidentifier NULL,
        [LegacyApprovalChainId] uniqueidentifier NULL,
        [Type] nvarchar(80) NOT NULL,
        [EntityType] nvarchar(80) NOT NULL,
        [EntityId] uniqueidentifier NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [Priority] nvarchar(32) NULL,
        [RiskLevel] nvarchar(32) NULL,
        [RequestedByUserId] uniqueidentifier NULL,
        [RequestedOnUtc] datetime2 NOT NULL,
        [DueAtUtc] datetime2 NULL,
        [CompletedAtUtc] datetime2 NULL,
        [PolicyReason] nvarchar(2000) NULL,
        [PayloadJson] nvarchar(max) NULL,
        [PolicySnapshotJson] nvarchar(max) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_DecisionRequests] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE TABLE [crm].[DecisionActionLogs] (
        [Id] uniqueidentifier NOT NULL,
        [DecisionRequestId] uniqueidentifier NOT NULL,
        [Action] nvarchar(64) NOT NULL,
        [ActorUserId] uniqueidentifier NULL,
        [ActorName] nvarchar(200) NULL,
        [Notes] nvarchar(max) NULL,
        [Field] nvarchar(120) NULL,
        [OldValue] nvarchar(2000) NULL,
        [NewValue] nvarchar(2000) NULL,
        [ActionAtUtc] datetime2 NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_DecisionActionLogs] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_DecisionActionLogs_DecisionRequests_DecisionRequestId] FOREIGN KEY ([DecisionRequestId]) REFERENCES [crm].[DecisionRequests] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE TABLE [crm].[DecisionSteps] (
        [Id] uniqueidentifier NOT NULL,
        [DecisionRequestId] uniqueidentifier NOT NULL,
        [StepOrder] int NOT NULL,
        [StepType] nvarchar(40) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [ApproverRole] nvarchar(120) NULL,
        [AssigneeUserId] uniqueidentifier NULL,
        [DueAtUtc] datetime2 NULL,
        [CompletedAtUtc] datetime2 NULL,
        [Notes] nvarchar(max) NULL,
        [AssigneeNameSnapshot] nvarchar(200) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_DecisionSteps] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_DecisionSteps_DecisionRequests_DecisionRequestId] FOREIGN KEY ([DecisionRequestId]) REFERENCES [crm].[DecisionRequests] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE INDEX [IX_DecisionRequests_TenantId_CreatedAtUtc] ON [crm].[DecisionRequests] ([TenantId], [Status], [CreatedAtUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE INDEX [IX_DecisionRequests_TenantId_EntityType_EntityId] ON [crm].[DecisionRequests] ([TenantId], [EntityType], [EntityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_DecisionRequests_TenantId_LegacyApprovalId] ON [crm].[DecisionRequests] ([TenantId], [LegacyApprovalId]) WHERE [LegacyApprovalId] IS NOT NULL AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE INDEX [IX_DecisionActionLogs_TenantId_DecisionRequestId_ActionAtUtc] ON [crm].[DecisionActionLogs] ([TenantId], [DecisionRequestId], [ActionAtUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE INDEX [IX_DecisionActionLogs_DecisionRequestId] ON [crm].[DecisionActionLogs] ([DecisionRequestId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_DecisionSteps_TenantId_DecisionRequestId_StepOrder] ON [crm].[DecisionSteps] ([TenantId], [DecisionRequestId], [StepOrder]) WHERE [TenantId] IS NOT NULL AND [DecisionRequestId] IS NOT NULL AND [StepOrder] IS NOT NULL');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    CREATE INDEX [IX_DecisionSteps_DecisionRequestId] ON [crm].[DecisionSteps] ([DecisionRequestId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260224030000_AddDecisionInboxGenericEngineTables'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260224030000_AddDecisionInboxGenericEngineTables', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260225025500_AddDecisionEscalationPolicySettings'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [DecisionEscalationPolicyJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260225025500_AddDecisionEscalationPolicySettings'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260225025500_AddDecisionEscalationPolicySettings', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260226121000_AddUserUiPreferencesJson'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [UiPreferencesJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260226121000_AddUserUiPreferencesJson'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260226121000_AddUserUiPreferencesJson', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE TABLE [crm].[Campaigns] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(180) NOT NULL,
        [Type] nvarchar(64) NOT NULL,
        [Channel] nvarchar(64) NOT NULL,
        [Status] nvarchar(32) NOT NULL,
        [OwnerUserId] uniqueidentifier NOT NULL,
        [StartDateUtc] datetime2 NULL,
        [EndDateUtc] datetime2 NULL,
        [BudgetPlanned] decimal(18,2) NOT NULL,
        [BudgetActual] decimal(18,2) NOT NULL,
        [Objective] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_Campaigns] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Campaigns_Users_OwnerUserId] FOREIGN KEY ([OwnerUserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE TABLE [crm].[CampaignAttributions] (
        [Id] uniqueidentifier NOT NULL,
        [CampaignId] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [Model] nvarchar(40) NOT NULL,
        [AttributedAmount] decimal(18,2) NOT NULL,
        [AttributedUtc] datetime2 NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CampaignAttributions] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_CampaignAttributions_Campaigns_CampaignId] FOREIGN KEY ([CampaignId]) REFERENCES [crm].[Campaigns] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_CampaignAttributions_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE TABLE [crm].[CampaignMembers] (
        [Id] uniqueidentifier NOT NULL,
        [CampaignId] uniqueidentifier NOT NULL,
        [EntityType] nvarchar(24) NOT NULL,
        [EntityId] uniqueidentifier NOT NULL,
        [ResponseStatus] nvarchar(32) NOT NULL,
        [AddedUtc] datetime2 NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CampaignMembers] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_CampaignMembers_Campaigns_CampaignId] FOREIGN KEY ([CampaignId]) REFERENCES [crm].[Campaigns] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE INDEX [IX_CampaignAttributions_CampaignId] ON [crm].[CampaignAttributions] ([CampaignId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE INDEX [IX_CampaignAttributions_OpportunityId] ON [crm].[CampaignAttributions] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE INDEX [IX_CampaignAttributions_TenantId] ON [crm].[CampaignAttributions] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_CampaignAttributions_TenantId_OpportunityId_Model] ON [crm].[CampaignAttributions] ([TenantId], [OpportunityId], [Model]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE INDEX [IX_CampaignMembers_CampaignId] ON [crm].[CampaignMembers] ([CampaignId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE INDEX [IX_CampaignMembers_TenantId] ON [crm].[CampaignMembers] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_CampaignMembers_TenantId_CampaignId_EntityType_EntityId] ON [crm].[CampaignMembers] ([TenantId], [CampaignId], [EntityType], [EntityId]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_CampaignMembers_TenantId_EntityType_EntityId] ON [crm].[CampaignMembers] ([TenantId], [EntityType], [EntityId]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE INDEX [IX_Campaigns_OwnerUserId] ON [crm].[Campaigns] ([OwnerUserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    CREATE INDEX [IX_Campaigns_TenantId] ON [crm].[Campaigns] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_Campaigns_TenantId_Name] ON [crm].[Campaigns] ([TenantId], [Name]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228063522_AddMarketingCampaigns'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260228063522_AddMarketingCampaigns', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE TABLE [crm].[AttributionExplainabilityEvents] (
        [Id] uniqueidentifier NOT NULL,
        [CampaignId] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [Model] nvarchar(40) NOT NULL,
        [SourceEntityType] nvarchar(24) NOT NULL,
        [SourceEntityId] uniqueidentifier NOT NULL,
        [MemberAddedUtc] datetime2 NOT NULL,
        [AttributedUtc] datetime2 NOT NULL,
        [RuleVersion] nvarchar(64) NOT NULL,
        [EvidenceJson] nvarchar(4000) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_AttributionExplainabilityEvents] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AttributionExplainabilityEvents_Campaigns_CampaignId] FOREIGN KEY ([CampaignId]) REFERENCES [crm].[Campaigns] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_AttributionExplainabilityEvents_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE TABLE [crm].[CampaignInsightSnapshots] (
        [Id] uniqueidentifier NOT NULL,
        [CampaignId] uniqueidentifier NOT NULL,
        [Score] int NOT NULL,
        [Trend] nvarchar(16) NOT NULL,
        [CalculationWindowDays] int NOT NULL,
        [ReasonChipsJson] nvarchar(4000) NOT NULL,
        [MetricsJson] nvarchar(4000) NOT NULL,
        [ComputedUtc] datetime2 NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CampaignInsightSnapshots] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_CampaignInsightSnapshots_Campaigns_CampaignId] FOREIGN KEY ([CampaignId]) REFERENCES [crm].[Campaigns] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE TABLE [crm].[CampaignRecommendations] (
        [Id] uniqueidentifier NOT NULL,
        [CampaignId] uniqueidentifier NOT NULL,
        [Type] nvarchar(120) NOT NULL,
        [Severity] nvarchar(16) NOT NULL,
        [Title] nvarchar(240) NOT NULL,
        [Description] nvarchar(2000) NOT NULL,
        [ImpactEstimate] decimal(18,2) NOT NULL,
        [Confidence] decimal(4,3) NOT NULL,
        [EvidenceJson] nvarchar(4000) NOT NULL,
        [Status] nvarchar(24) NOT NULL,
        [GeneratedUtc] datetime2 NOT NULL,
        [ExpiresUtc] datetime2 NULL,
        [DecidedUtc] datetime2 NULL,
        [DecidedByUserId] uniqueidentifier NULL,
        [DecisionReason] nvarchar(1000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CampaignRecommendations] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_CampaignRecommendations_Campaigns_CampaignId] FOREIGN KEY ([CampaignId]) REFERENCES [crm].[Campaigns] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE TABLE [crm].[CampaignRecommendationDecisions] (
        [Id] uniqueidentifier NOT NULL,
        [RecommendationId] uniqueidentifier NOT NULL,
        [Decision] nvarchar(24) NOT NULL,
        [Reason] nvarchar(1000) NULL,
        [DecidedUtc] datetime2 NOT NULL,
        [DecidedByUserId] uniqueidentifier NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_CampaignRecommendationDecisions] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_CampaignRecommendationDecisions_CampaignRecommendations_RecommendationId] FOREIGN KEY ([RecommendationId]) REFERENCES [crm].[CampaignRecommendations] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_AttributionExplainabilityEvents_CampaignId] ON [crm].[AttributionExplainabilityEvents] ([CampaignId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_AttributionExplainabilityEvents_OpportunityId] ON [crm].[AttributionExplainabilityEvents] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_AttributionExplainabilityEvents_TenantId] ON [crm].[AttributionExplainabilityEvents] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_AttributionExplainabilityEvents_TenantId_OpportunityId_Model_AttributedUtc] ON [crm].[AttributionExplainabilityEvents] ([TenantId], [OpportunityId], [Model], [AttributedUtc]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_CampaignInsightSnapshots_CampaignId] ON [crm].[CampaignInsightSnapshots] ([CampaignId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_CampaignInsightSnapshots_TenantId] ON [crm].[CampaignInsightSnapshots] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_CampaignInsightSnapshots_TenantId_CampaignId_ComputedUtc] ON [crm].[CampaignInsightSnapshots] ([TenantId], [CampaignId], [ComputedUtc]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_CampaignRecommendationDecisions_RecommendationId] ON [crm].[CampaignRecommendationDecisions] ([RecommendationId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_CampaignRecommendationDecisions_TenantId] ON [crm].[CampaignRecommendationDecisions] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_CampaignRecommendationDecisions_TenantId_RecommendationId_DecidedUtc] ON [crm].[CampaignRecommendationDecisions] ([TenantId], [RecommendationId], [DecidedUtc]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_CampaignRecommendations_CampaignId] ON [crm].[CampaignRecommendations] ([CampaignId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    CREATE INDEX [IX_CampaignRecommendations_TenantId] ON [crm].[CampaignRecommendations] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_CampaignRecommendations_TenantId_CampaignId_Status_GeneratedUtc] ON [crm].[CampaignRecommendations] ([TenantId], [CampaignId], [Status], [GeneratedUtc]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228145243_AddMarketingRevenueInsights'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260228145243_AddMarketingRevenueInsights', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE TABLE [crm].[OpportunityQuotes] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [QuoteNumber] nvarchar(40) NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [PriceListId] uniqueidentifier NULL,
        [Currency] nvarchar(10) NOT NULL,
        [Subtotal] decimal(18,2) NOT NULL,
        [DiscountAmount] decimal(18,2) NOT NULL,
        [TaxAmount] decimal(18,2) NOT NULL,
        [TotalAmount] decimal(18,2) NOT NULL,
        [Notes] nvarchar(2000) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityQuotes] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityQuotes_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_OpportunityQuotes_PriceLists_PriceListId] FOREIGN KEY ([PriceListId]) REFERENCES [scm].[PriceLists] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE TABLE [crm].[OpportunityQuoteLines] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityQuoteId] uniqueidentifier NOT NULL,
        [ItemMasterId] uniqueidentifier NOT NULL,
        [Description] nvarchar(1000) NULL,
        [Quantity] decimal(18,3) NOT NULL,
        [UnitPrice] decimal(18,2) NOT NULL,
        [DiscountPercent] decimal(5,2) NOT NULL,
        [LineTotal] decimal(18,2) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityQuoteLines] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityQuoteLines_ItemMasters_ItemMasterId] FOREIGN KEY ([ItemMasterId]) REFERENCES [scm].[ItemMasters] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_OpportunityQuoteLines_OpportunityQuotes_OpportunityQuoteId] FOREIGN KEY ([OpportunityQuoteId]) REFERENCES [crm].[OpportunityQuotes] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE INDEX [IX_OpportunityQuoteLines_ItemMasterId] ON [crm].[OpportunityQuoteLines] ([ItemMasterId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE INDEX [IX_OpportunityQuoteLines_OpportunityQuoteId] ON [crm].[OpportunityQuoteLines] ([OpportunityQuoteId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE INDEX [IX_OpportunityQuoteLines_TenantId] ON [crm].[OpportunityQuoteLines] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_OpportunityQuoteLines_TenantId_OpportunityQuoteId_ItemMasterId] ON [crm].[OpportunityQuoteLines] ([TenantId], [OpportunityQuoteId], [ItemMasterId]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE INDEX [IX_OpportunityQuotes_OpportunityId] ON [crm].[OpportunityQuotes] ([OpportunityId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE INDEX [IX_OpportunityQuotes_PriceListId] ON [crm].[OpportunityQuotes] ([PriceListId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    CREATE INDEX [IX_OpportunityQuotes_TenantId] ON [crm].[OpportunityQuotes] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_OpportunityQuotes_TenantId_OpportunityId_QuoteNumber] ON [crm].[OpportunityQuotes] ([TenantId], [OpportunityId], [QuoteNumber]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228183217_AddOpportunityQuotes'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260228183217_AddOpportunityQuotes', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228210626_AddItemMasterSkuUniqueness'
)
BEGIN
    CREATE UNIQUE INDEX [IX_ItemMasters_TenantId_Sku_IsDeleted] ON [scm].[ItemMasters] ([TenantId], [Sku], [IsDeleted]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260228210626_AddItemMasterSkuUniqueness'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260228210626_AddItemMasterSkuUniqueness', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301045731_AddTenantFeatureFlagsJson'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [FeatureFlagsJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301045731_AddTenantFeatureFlagsJson'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260301045731_AddTenantFeatureFlagsJson', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE TABLE [crm].[EmailTemplates] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Description] nvarchar(1000) NULL,
        [Subject] nvarchar(500) NOT NULL,
        [HtmlBody] nvarchar(max) NOT NULL,
        [TextBody] nvarchar(max) NULL,
        [Category] nvarchar(100) NULL,
        [IsActive] bit NOT NULL,
        [IsSystem] bit NOT NULL,
        [Variables] nvarchar(2000) NULL,
        [UsageCount] int NOT NULL,
        [LastUsedAtUtc] datetime2 NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_EmailTemplates] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE TABLE [UserEmailConnections] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [Provider] int NOT NULL,
        [EmailAddress] nvarchar(256) NOT NULL,
        [DisplayName] nvarchar(256) NOT NULL,
        [AccessTokenEncrypted] nvarchar(4000) NOT NULL,
        [RefreshTokenEncrypted] nvarchar(4000) NOT NULL,
        [TokenExpiresAtUtc] datetime2 NOT NULL,
        [Scopes] nvarchar(2000) NOT NULL,
        [IsPrimary] bit NOT NULL,
        [IsActive] bit NOT NULL,
        [LastSyncAtUtc] datetime2 NULL,
        [LastError] nvarchar(2000) NULL,
        [FailureCount] int NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_UserEmailConnections] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserEmailConnections_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE TABLE [crm].[EmailLogs] (
        [Id] uniqueidentifier NOT NULL,
        [ToEmail] nvarchar(256) NOT NULL,
        [ToName] nvarchar(256) NULL,
        [CcEmails] nvarchar(1000) NULL,
        [BccEmails] nvarchar(1000) NULL,
        [Subject] nvarchar(500) NOT NULL,
        [HtmlBody] nvarchar(max) NOT NULL,
        [TextBody] nvarchar(max) NULL,
        [Status] int NOT NULL,
        [MessageId] nvarchar(256) NULL,
        [ExternalId] nvarchar(256) NULL,
        [ErrorMessage] nvarchar(2000) NULL,
        [RetryCount] int NOT NULL,
        [SentAtUtc] datetime2 NULL,
        [DeliveredAtUtc] datetime2 NULL,
        [OpenedAtUtc] datetime2 NULL,
        [ClickedAtUtc] datetime2 NULL,
        [BouncedAtUtc] datetime2 NULL,
        [BounceReason] nvarchar(1000) NULL,
        [RelatedEntityType] int NULL,
        [RelatedEntityId] uniqueidentifier NULL,
        [TemplateId] uniqueidentifier NULL,
        [SenderId] uniqueidentifier NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_EmailLogs] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_EmailLogs_EmailTemplates_TemplateId] FOREIGN KEY ([TemplateId]) REFERENCES [crm].[EmailTemplates] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_EmailLogs_Users_SenderId] FOREIGN KEY ([SenderId]) REFERENCES [identity].[Users] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_EmailLogs_MessageId] ON [crm].[EmailLogs] ([MessageId]) WHERE [MessageId] IS NOT NULL');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE INDEX [IX_EmailLogs_SenderId] ON [crm].[EmailLogs] ([SenderId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE INDEX [IX_EmailLogs_TemplateId] ON [crm].[EmailLogs] ([TemplateId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE INDEX [IX_EmailLogs_TenantId] ON [crm].[EmailLogs] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_EmailLogs_TenantId_RelatedEntityType_RelatedEntityId] ON [crm].[EmailLogs] ([TenantId], [RelatedEntityType], [RelatedEntityId]) WHERE [RelatedEntityId] IS NOT NULL');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_EmailLogs_TenantId_Status] ON [crm].[EmailLogs] ([TenantId], [Status]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_EmailLogs_TenantId_ToEmail] ON [crm].[EmailLogs] ([TenantId], [ToEmail]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE INDEX [IX_EmailTemplates_TenantId] ON [crm].[EmailTemplates] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_EmailTemplates_TenantId_Category] ON [crm].[EmailTemplates] ([TenantId], [Category]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_EmailTemplates_TenantId_IsActive] ON [crm].[EmailTemplates] ([TenantId], [IsActive]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_EmailTemplates_TenantId_Name] ON [crm].[EmailTemplates] ([TenantId], [Name]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE INDEX [IX_UserEmailConnections_TenantId] ON [UserEmailConnections] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_UserEmailConnections_TenantId_UserId] ON [UserEmailConnections] ([TenantId], [UserId]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_UserEmailConnections_TenantId_UserId_Provider] ON [UserEmailConnections] ([TenantId], [UserId], [Provider]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    CREATE INDEX [IX_UserEmailConnections_UserId] ON [UserEmailConnections] ([UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260301145652_AddUserEmailConnections'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260301145652_AddUserEmailConnections', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    ALTER TABLE [scm].[ItemMasters] ADD [ItemType] nvarchar(24) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE TABLE [crm].[DirectChatThreads] (
        [Id] uniqueidentifier NOT NULL,
        [Title] nvarchar(max) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_DirectChatThreads] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE TABLE [UserMailMessages] (
        [Id] uniqueidentifier NOT NULL,
        [ConnectionId] uniqueidentifier NOT NULL,
        [ExternalId] nvarchar(max) NOT NULL,
        [InternetMessageId] nvarchar(max) NULL,
        [ConversationId] nvarchar(max) NULL,
        [Subject] nvarchar(max) NOT NULL,
        [BodyPreview] nvarchar(max) NOT NULL,
        [BodyHtml] nvarchar(max) NULL,
        [BodyText] nvarchar(max) NULL,
        [FromEmail] nvarchar(max) NOT NULL,
        [FromName] nvarchar(max) NULL,
        [ToRecipientsJson] nvarchar(max) NOT NULL,
        [CcRecipientsJson] nvarchar(max) NULL,
        [BccRecipientsJson] nvarchar(max) NULL,
        [Folder] int NOT NULL,
        [ExternalFolderId] nvarchar(max) NULL,
        [IsRead] bit NOT NULL,
        [IsStarred] bit NOT NULL,
        [HasAttachments] bit NOT NULL,
        [AttachmentsJson] nvarchar(max) NULL,
        [Importance] int NOT NULL,
        [ReceivedAtUtc] datetime2 NOT NULL,
        [SentAtUtc] datetime2 NULL,
        [IsDraft] bit NOT NULL,
        [LastSyncAtUtc] datetime2 NOT NULL,
        [ChangeKey] nvarchar(max) NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_UserMailMessages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserMailMessages_UserEmailConnections_ConnectionId] FOREIGN KEY ([ConnectionId]) REFERENCES [UserEmailConnections] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE TABLE [crm].[DirectChatMessages] (
        [Id] uniqueidentifier NOT NULL,
        [ThreadId] uniqueidentifier NOT NULL,
        [SenderUserId] uniqueidentifier NOT NULL,
        [Content] nvarchar(4000) NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_DirectChatMessages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_DirectChatMessages_DirectChatThreads_ThreadId] FOREIGN KEY ([ThreadId]) REFERENCES [crm].[DirectChatThreads] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE TABLE [crm].[DirectChatParticipants] (
        [Id] uniqueidentifier NOT NULL,
        [ThreadId] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [IsArchived] bit NOT NULL,
        [ArchivedAtUtc] datetime2 NULL,
        [LastClearedAtUtc] datetime2 NULL,
        [LastReadAtUtc] datetime2 NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_DirectChatParticipants] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_DirectChatParticipants_DirectChatThreads_ThreadId] FOREIGN KEY ([ThreadId]) REFERENCES [crm].[DirectChatThreads] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE INDEX [IX_DirectChatMessages_TenantId] ON [crm].[DirectChatMessages] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE INDEX [IX_DirectChatMessages_ThreadId_CreatedAtUtc] ON [crm].[DirectChatMessages] ([ThreadId], [CreatedAtUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE INDEX [IX_DirectChatParticipants_TenantId] ON [crm].[DirectChatParticipants] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE UNIQUE INDEX [IX_DirectChatParticipants_ThreadId_UserId] ON [crm].[DirectChatParticipants] ([ThreadId], [UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE INDEX [IX_DirectChatParticipants_UserId_IsArchived] ON [crm].[DirectChatParticipants] ([UserId], [IsArchived]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE INDEX [IX_DirectChatThreads_TenantId] ON [crm].[DirectChatThreads] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE INDEX [IX_UserMailMessages_ConnectionId] ON [UserMailMessages] ([ConnectionId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    CREATE INDEX [IX_UserMailMessages_TenantId] ON [UserMailMessages] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303012414_AddDirectChat'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260303012414_AddDirectChat', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE TABLE [crm].[SupportQueues] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(120) NOT NULL,
        [Description] nvarchar(max) NULL,
        [IsActive] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupportQueues] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE TABLE [crm].[SupportSlaPolicies] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(120) NOT NULL,
        [Priority] nvarchar(32) NOT NULL,
        [Severity] nvarchar(16) NOT NULL,
        [FirstResponseTargetMinutes] int NOT NULL,
        [ResolutionTargetMinutes] int NOT NULL,
        [EscalationMinutes] int NOT NULL,
        [BusinessHoursJson] nvarchar(max) NULL,
        [IsActive] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupportSlaPolicies] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE TABLE [crm].[SupportQueueMembers] (
        [Id] uniqueidentifier NOT NULL,
        [QueueId] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [IsActive] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupportQueueMembers] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupportQueueMembers_SupportQueues_QueueId] FOREIGN KEY ([QueueId]) REFERENCES [crm].[SupportQueues] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_SupportQueueMembers_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE TABLE [crm].[SupportCases] (
        [Id] uniqueidentifier NOT NULL,
        [CaseNumber] nvarchar(40) NOT NULL,
        [Subject] nvarchar(240) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        [Status] nvarchar(40) NOT NULL,
        [Priority] nvarchar(32) NOT NULL,
        [Severity] nvarchar(16) NOT NULL,
        [Category] nvarchar(80) NOT NULL,
        [Subcategory] nvarchar(120) NULL,
        [Source] nvarchar(32) NOT NULL,
        [AccountId] uniqueidentifier NULL,
        [ContactId] uniqueidentifier NULL,
        [QueueId] uniqueidentifier NULL,
        [OwnerUserId] uniqueidentifier NULL,
        [SlaPolicyId] uniqueidentifier NOT NULL,
        [FirstResponseDueUtc] datetime2 NOT NULL,
        [ResolutionDueUtc] datetime2 NOT NULL,
        [FirstRespondedUtc] datetime2 NULL,
        [ResolvedUtc] datetime2 NULL,
        [ClosedUtc] datetime2 NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupportCases] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupportCases_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [crm].[Accounts] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_SupportCases_Contacts_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [crm].[Contacts] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_SupportCases_SupportQueues_QueueId] FOREIGN KEY ([QueueId]) REFERENCES [crm].[SupportQueues] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_SupportCases_SupportSlaPolicies_SlaPolicyId] FOREIGN KEY ([SlaPolicyId]) REFERENCES [crm].[SupportSlaPolicies] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_SupportCases_Users_OwnerUserId] FOREIGN KEY ([OwnerUserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE TABLE [crm].[SupportCaseComments] (
        [Id] uniqueidentifier NOT NULL,
        [CaseId] uniqueidentifier NOT NULL,
        [AuthorUserId] uniqueidentifier NULL,
        [Body] nvarchar(max) NOT NULL,
        [IsInternal] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupportCaseComments] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupportCaseComments_SupportCases_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [crm].[SupportCases] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_SupportCaseComments_Users_AuthorUserId] FOREIGN KEY ([AuthorUserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE TABLE [crm].[SupportCaseEscalationEvents] (
        [Id] uniqueidentifier NOT NULL,
        [CaseId] uniqueidentifier NOT NULL,
        [Type] nvarchar(32) NOT NULL,
        [ActorUserId] uniqueidentifier NULL,
        [Notes] nvarchar(max) NULL,
        [OccurredUtc] datetime2 NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupportCaseEscalationEvents] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupportCaseEscalationEvents_SupportCases_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [crm].[SupportCases] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_SupportCaseEscalationEvents_Users_ActorUserId] FOREIGN KEY ([ActorUserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE TABLE [crm].[SupportEmailBindings] (
        [Id] uniqueidentifier NOT NULL,
        [ExternalThreadKey] nvarchar(200) NOT NULL,
        [CaseId] uniqueidentifier NOT NULL,
        [LastMessageUtc] datetime2 NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_SupportEmailBindings] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_SupportEmailBindings_SupportCases_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [crm].[SupportCases] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseComments_AuthorUserId] ON [crm].[SupportCaseComments] ([AuthorUserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseComments_CaseId] ON [crm].[SupportCaseComments] ([CaseId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseComments_TenantId] ON [crm].[SupportCaseComments] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseComments_TenantId_CaseId_CreatedAtUtc] ON [crm].[SupportCaseComments] ([TenantId], [CaseId], [CreatedAtUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseEscalationEvents_ActorUserId] ON [crm].[SupportCaseEscalationEvents] ([ActorUserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseEscalationEvents_CaseId] ON [crm].[SupportCaseEscalationEvents] ([CaseId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseEscalationEvents_TenantId] ON [crm].[SupportCaseEscalationEvents] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCaseEscalationEvents_TenantId_CaseId_OccurredUtc] ON [crm].[SupportCaseEscalationEvents] ([TenantId], [CaseId], [OccurredUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCases_AccountId] ON [crm].[SupportCases] ([AccountId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCases_ContactId] ON [crm].[SupportCases] ([ContactId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCases_OwnerUserId] ON [crm].[SupportCases] ([OwnerUserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCases_QueueId] ON [crm].[SupportCases] ([QueueId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCases_SlaPolicyId] ON [crm].[SupportCases] ([SlaPolicyId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCases_TenantId] ON [crm].[SupportCases] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE UNIQUE INDEX [IX_SupportCases_TenantId_CaseNumber] ON [crm].[SupportCases] ([TenantId], [CaseNumber]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportCases_TenantId_Status_Priority_QueueId_OwnerUserId_UpdatedAtUtc] ON [crm].[SupportCases] ([TenantId], [Status], [Priority], [QueueId], [OwnerUserId], [UpdatedAtUtc]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportEmailBindings_CaseId] ON [crm].[SupportEmailBindings] ([CaseId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportEmailBindings_TenantId] ON [crm].[SupportEmailBindings] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE UNIQUE INDEX [IX_SupportEmailBindings_TenantId_ExternalThreadKey] ON [crm].[SupportEmailBindings] ([TenantId], [ExternalThreadKey]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportQueueMembers_QueueId] ON [crm].[SupportQueueMembers] ([QueueId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportQueueMembers_TenantId] ON [crm].[SupportQueueMembers] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE UNIQUE INDEX [IX_SupportQueueMembers_TenantId_QueueId_UserId] ON [crm].[SupportQueueMembers] ([TenantId], [QueueId], [UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportQueueMembers_UserId] ON [crm].[SupportQueueMembers] ([UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportQueues_TenantId] ON [crm].[SupportQueues] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE UNIQUE INDEX [IX_SupportQueues_TenantId_Name] ON [crm].[SupportQueues] ([TenantId], [Name]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportSlaPolicies_TenantId] ON [crm].[SupportSlaPolicies] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    CREATE INDEX [IX_SupportSlaPolicies_TenantId_Priority_Severity_IsActive] ON [crm].[SupportSlaPolicies] ([TenantId], [Priority], [Severity], [IsActive]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303161852_AddHelpDeskModule'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260303161852_AddHelpDeskModule', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303170453_AddUserAudienceToUsers'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [Audience] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260303170453_AddUserAudienceToUsers'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260303170453_AddUserAudienceToUsers', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260305013516_AddHelpDeskClosureAndCsat'
)
BEGIN
    ALTER TABLE [crm].[SupportCases] ADD [ClosureReason] nvarchar(120) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260305013516_AddHelpDeskClosureAndCsat'
)
BEGIN
    ALTER TABLE [crm].[SupportCases] ADD [CsatFeedback] nvarchar(2000) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260305013516_AddHelpDeskClosureAndCsat'
)
BEGIN
    ALTER TABLE [crm].[SupportCases] ADD [CsatScore] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260305013516_AddHelpDeskClosureAndCsat'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260305013516_AddHelpDeskClosureAndCsat', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260305014204_AddTenantReportDesignerPermission'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ReportDesignerRequiredPermission] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260305014204_AddTenantReportDesignerPermission'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260305014204_AddTenantReportDesignerPermission', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    DECLARE @var2 nvarchar(max);
    SELECT @var2 = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[crm].[OpportunityApprovalChains]') AND [c].[name] = N'Status');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [crm].[OpportunityApprovalChains] DROP CONSTRAINT ' + @var2 + ';');
    ALTER TABLE [crm].[OpportunityApprovalChains] ALTER COLUMN [Status] nvarchar(40) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    DECLARE @var3 nvarchar(max);
    SELECT @var3 = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[crm].[OpportunityApprovalChains]') AND [c].[name] = N'Purpose');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [crm].[OpportunityApprovalChains] DROP CONSTRAINT ' + @var3 + ';');
    ALTER TABLE [crm].[OpportunityApprovalChains] ALTER COLUMN [Purpose] nvarchar(80) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovalChains] ADD [DecisionRequestId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovalChains] ADD [WorkflowKey] nvarchar(80) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovalChains] ADD [WorkflowName] nvarchar(160) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovalChains] ADD [WorkflowVersion] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_OpportunityApprovalChains_TenantId_DecisionRequestId] ON [crm].[OpportunityApprovalChains] ([TenantId], [DecisionRequestId]) WHERE [DecisionRequestId] IS NOT NULL AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    CREATE INDEX [IX_OpportunityApprovalChains_TenantId_OpportunityId_Status_RequestedOn] ON [crm].[OpportunityApprovalChains] ([TenantId], [OpportunityId], [Status], [RequestedOn]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260307213119_AddWorkflowExecutionMetadataToApprovalChains', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ApprovalWorkflowDraftJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ApprovalWorkflowPublishedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ApprovalWorkflowPublishedBy] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [ApprovalWorkflowPublishedJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    DECLARE @var4 nvarchar(max);
    SELECT @var4 = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[crm].[OpportunityApprovals]') AND [c].[name] = N'ApproverRole');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [crm].[OpportunityApprovals] DROP CONSTRAINT ' + @var4 + ';');
    ALTER TABLE [crm].[OpportunityApprovals] ALTER COLUMN [ApproverRole] nvarchar(120) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[OpportunityApprovals] ADD [ApproverRoleId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionSteps] ADD [ApproverRoleId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionRequests] ADD [WorkflowDealId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionRequests] ADD [WorkflowDealName] nvarchar(240) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionRequests] ADD [WorkflowExecutionId] uniqueidentifier NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionRequests] ADD [WorkflowName] nvarchar(160) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionRequests] ADD [WorkflowStepNodeId] nvarchar(120) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionRequests] ADD [WorkflowStepOrder] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    ALTER TABLE [crm].[DecisionRequests] ADD [WorkflowVersion] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    EXEC(N'CREATE INDEX [IX_DecisionRequests_TenantId_WorkflowExecutionId] ON [crm].[DecisionRequests] ([TenantId], [WorkflowExecutionId]) WHERE [WorkflowExecutionId] IS NOT NULL AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308023703_AddWorkflowLifecycleAndDecisionLinks'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260308023703_AddWorkflowLifecycleAndDecisionLinks', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308093601_AddEntraIdentityBindingAndAuthConfig'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [EntraObjectId] nvarchar(128) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308093601_AddEntraIdentityBindingAndAuthConfig'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [EntraTenantId] nvarchar(128) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308093601_AddEntraIdentityBindingAndAuthConfig'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [EntraUpn] nvarchar(320) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308093601_AddEntraIdentityBindingAndAuthConfig'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_Users_TenantId_EntraTenantId_EntraObjectId] ON [identity].[Users] ([TenantId], [EntraTenantId], [EntraObjectId]) WHERE [EntraTenantId] IS NOT NULL AND [EntraObjectId] IS NOT NULL AND [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308093601_AddEntraIdentityBindingAndAuthConfig'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260308093601_AddEntraIdentityBindingAndAuthConfig', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308183712_AddUserLoginEnvironmentFields'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [LastLoginDeviceType] nvarchar(32) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308183712_AddUserLoginEnvironmentFields'
)
BEGIN
    ALTER TABLE [identity].[Users] ADD [LastLoginPlatform] nvarchar(64) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260308183712_AddUserLoginEnvironmentFields'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260308183712_AddUserLoginEnvironmentFields', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309025727_AddLeadConversationScoreSnapshot'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ConversationScore] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309025727_AddLeadConversationScoreSnapshot'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ConversationScoreLabel] nvarchar(32) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309025727_AddLeadConversationScoreSnapshot'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ConversationScoreReasonsJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309025727_AddLeadConversationScoreSnapshot'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ConversationScoreUpdatedAtUtc] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309025727_AddLeadConversationScoreSnapshot'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [ConversationSignalAvailable] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309025727_AddLeadConversationScoreSnapshot'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260309025727_AddLeadConversationScoreSnapshot', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [VerticalPresetConfigJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [BudgetBand] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [BuyerType] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [FinancingReadiness] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [MotivationUrgency] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [PreApprovalStatus] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [PreferredArea] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    ALTER TABLE [crm].[Leads] ADD [PreferredPropertyType] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309084653_AddVerticalPresetRealEstateLeadProfile'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260309084653_AddVerticalPresetRealEstateLeadProfile', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309152000_AddLeadDispositionPolicySettings'
)
BEGIN
    ALTER TABLE [identity].[Tenants] ADD [LeadDispositionPolicyJson] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260309152000_AddLeadDispositionPolicySettings'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260309152000_AddLeadDispositionPolicySettings', N'10.0.3');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260311015828_AddReasonToLeadStatusHistory'
)
BEGIN
    ALTER TABLE [crm].[LeadStatusHistories] ADD [Reason] nvarchar(500) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260311015828_AddReasonToLeadStatusHistory'
)
BEGIN
    CREATE TABLE [crm].[OpportunityContactRoles] (
        [Id] uniqueidentifier NOT NULL,
        [OpportunityId] uniqueidentifier NOT NULL,
        [ContactId] uniqueidentifier NOT NULL,
        [Role] nvarchar(max) NOT NULL,
        [Notes] nvarchar(max) NULL,
        [IsPrimary] bit NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NULL,
        [UpdatedAtUtc] datetime2 NULL,
        [UpdatedBy] nvarchar(max) NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedAtUtc] datetime2 NULL,
        [DeletedBy] nvarchar(max) NULL,
        CONSTRAINT [PK_OpportunityContactRoles] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OpportunityContactRoles_Contacts_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [crm].[Contacts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_OpportunityContactRoles_Opportunities_OpportunityId] FOREIGN KEY ([OpportunityId]) REFERENCES [crm].[Opportunities] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260311015828_AddReasonToLeadStatusHistory'
)
BEGIN
    CREATE INDEX [IX_OpportunityContactRoles_ContactId] ON [crm].[OpportunityContactRoles] ([ContactId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260311015828_AddReasonToLeadStatusHistory'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_OpportunityContactRoles_OpportunityId_ContactId] ON [crm].[OpportunityContactRoles] ([OpportunityId], [ContactId]) WHERE [IsDeleted] = 0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260311015828_AddReasonToLeadStatusHistory'
)
BEGIN
    CREATE INDEX [IX_OpportunityContactRoles_TenantId] ON [crm].[OpportunityContactRoles] ([TenantId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260311015828_AddReasonToLeadStatusHistory'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260311015828_AddReasonToLeadStatusHistory', N'10.0.3');
END;

COMMIT;
GO

