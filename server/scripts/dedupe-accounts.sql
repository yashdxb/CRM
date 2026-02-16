/*
  Merge duplicate customer accounts by tenant + normalized account name.
  - Keeps the oldest non-deleted account as canonical.
  - Re-points transactional references to canonical account.
  - Soft-deletes duplicate account rows.
  - Safe to run repeatedly.
*/

USE [CRMEnterprise];
GO

SET NOCOUNT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID('tempdb..#AccountDuplicateMap') IS NOT NULL
        DROP TABLE #AccountDuplicateMap;

    ;WITH RankedAccounts AS (
        SELECT
            a.Id,
            a.TenantId,
            NormalizedName = LOWER(LTRIM(RTRIM(a.Name))),
            a.CreatedAtUtc,
            rn = ROW_NUMBER() OVER (
                PARTITION BY a.TenantId, LOWER(LTRIM(RTRIM(a.Name)))
                ORDER BY a.CreatedAtUtc ASC, a.Id ASC),
            keepId = FIRST_VALUE(a.Id) OVER (
                PARTITION BY a.TenantId, LOWER(LTRIM(RTRIM(a.Name)))
                ORDER BY a.CreatedAtUtc ASC, a.Id ASC)
        FROM [crm].[Accounts] a
        WHERE a.IsDeleted = 0
          AND a.Name IS NOT NULL
          AND LTRIM(RTRIM(a.Name)) <> ''
    )
    SELECT
        duplicateId = ra.Id,
        keepId = ra.keepId,
        ra.TenantId,
        ra.NormalizedName
    INTO #AccountDuplicateMap
    FROM RankedAccounts ra
    WHERE ra.rn > 1;

    DECLARE @DuplicateCount INT = (SELECT COUNT(*) FROM #AccountDuplicateMap);

    IF @DuplicateCount > 0
    BEGIN
        UPDATE c
        SET c.AccountId = m.keepId
        FROM [crm].[Contacts] c
        INNER JOIN #AccountDuplicateMap m ON c.AccountId = m.duplicateId;

        UPDATE l
        SET l.AccountId = m.keepId
        FROM [crm].[Leads] l
        INNER JOIN #AccountDuplicateMap m ON l.AccountId = m.duplicateId;

        UPDATE o
        SET o.AccountId = m.keepId
        FROM [crm].[Opportunities] o
        INNER JOIN #AccountDuplicateMap m ON o.AccountId = m.duplicateId;

        UPDATE a
        SET a.ParentAccountId = m.keepId
        FROM [crm].[Accounts] a
        INNER JOIN #AccountDuplicateMap m ON a.ParentAccountId = m.duplicateId;

        UPDATE a
        SET a.ParentAccountId = NULL
        FROM [crm].[Accounts] a
        WHERE a.ParentAccountId = a.Id;

        UPDATE act
        SET act.RelatedEntityId = m.keepId
        FROM [crm].[Activities] act
        INNER JOIN #AccountDuplicateMap m ON act.RelatedEntityId = m.duplicateId
        WHERE act.RelatedEntityType = 3;

        UPDATE att
        SET att.RelatedEntityId = m.keepId
        FROM [crm].[Attachments] att
        INNER JOIN #AccountDuplicateMap m ON att.RelatedEntityId = m.duplicateId
        WHERE att.RelatedEntityType = 3;

        UPDATE cf
        SET cf.EntityId = m.keepId
        FROM [crm].[CustomFieldValues] cf
        INNER JOIN #AccountDuplicateMap m ON cf.EntityId = m.duplicateId
        WHERE LOWER(cf.EntityName) = 'account';

        UPDATE ae
        SET ae.EntityId = m.keepId
        FROM [crm].[AuditEvents] ae
        INNER JOIN #AccountDuplicateMap m ON ae.EntityId = m.duplicateId
        WHERE LOWER(ae.EntityType) = 'account';

        UPDATE a
        SET
            a.IsDeleted = 1,
            a.DeletedAtUtc = COALESCE(a.DeletedAtUtc, SYSUTCDATETIME()),
            a.UpdatedAtUtc = SYSUTCDATETIME(),
            a.Description = CASE
                WHEN a.Description IS NULL OR LTRIM(RTRIM(a.Description)) = ''
                    THEN 'Merged into account ' + CONVERT(varchar(36), m.keepId)
                ELSE a.Description + ' | Merged into account ' + CONVERT(varchar(36), m.keepId)
            END
        FROM [crm].[Accounts] a
        INNER JOIN #AccountDuplicateMap m ON a.Id = m.duplicateId
        WHERE a.IsDeleted = 0;
    END

    SELECT
        DuplicateRowsMerged = @DuplicateCount,
        DuplicateGroupsRemaining = (
            SELECT COUNT(*)
            FROM (
                SELECT a.TenantId, LOWER(LTRIM(RTRIM(a.Name))) AS NormalizedName
                FROM [crm].[Accounts] a
                WHERE a.IsDeleted = 0
                  AND a.Name IS NOT NULL
                  AND LTRIM(RTRIM(a.Name)) <> ''
                GROUP BY a.TenantId, LOWER(LTRIM(RTRIM(a.Name)))
                HAVING COUNT(*) > 1
            ) g
        );

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
