using System.Drawing;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;

namespace CRM.Enterprise.Api.Reporting;

public sealed class EmbeddedLibraryTelerikReport : Report
{
    private static readonly Color Gray900 = Color.FromArgb(15, 23, 42);
    private static readonly Color Gray700 = Color.FromArgb(51, 65, 85);
    private static readonly Color Gray500 = Color.FromArgb(100, 116, 139);
    private static readonly Color Gray200 = Color.FromArgb(226, 232, 240);
    private static readonly Color Blue600 = Color.FromArgb(37, 99, 235);
    private static readonly Color HeaderBackground = Color.FromArgb(239, 246, 255);

    private const string PreviewSql = """
        IF @ReportKey = 'open-opportunities-by-owner'
        BEGIN
            SELECT TOP 25
                u.FullName AS Col1,
                s.Name AS Col2,
                CONCAT(COUNT(o.Id), ' open') AS Col3,
                CONCAT('$', FORMAT(SUM(o.Amount), '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY SUM(o.Amount) DESC, u.FullName) AS Sort1
            FROM [crm].[Opportunities] o
            INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId
            INNER JOIN [identity].[Users] u ON u.Id = o.OwnerId
            WHERE o.TenantId = @TenantId
              AND o.IsDeleted = 0
              AND o.IsClosed = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@Stage = '' OR s.Name = @Stage)
              AND (@DateFrom = '' OR CAST(o.ExpectedCloseDate AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(o.ExpectedCloseDate AS date) <= CAST(@DateTo AS date))
            GROUP BY u.FullName, s.Name
            ORDER BY SUM(o.Amount) DESC, u.FullName;
            RETURN;
        END

        IF @ReportKey = 'pending-deal-approval'
        BEGIN
            SELECT TOP 25
                COALESCE(d.WorkflowDealName, o.Name, 'Decision Request') AS Col1,
                COALESCE(d.WorkflowName, 'Deal Approval Workflow') AS Col2,
                COALESCE(d.Status, 'Pending') AS Col3,
                COALESCE(CONCAT('Due ', CONVERT(varchar(10), d.DueAtUtc, 120)), 'No SLA') AS Col4,
                ROW_NUMBER() OVER (ORDER BY d.RequestedOnUtc DESC) AS Sort1
            FROM [crm].[DecisionRequests] d
            LEFT JOIN [crm].[Opportunities] o ON o.Id = d.EntityId AND d.EntityType = 'Opportunity'
            WHERE d.TenantId = @TenantId
              AND d.IsDeleted = 0
              AND (@ApprovalStatus = '' OR d.Status = @ApprovalStatus)
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(d.RequestedByUserId AS nvarchar(36))
                    )
                  )
              AND (@DateFrom = '' OR CAST(d.RequestedOnUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(d.RequestedOnUtc AS date) <= CAST(@DateTo AS date))
            ORDER BY d.RequestedOnUtc DESC;
            RETURN;
        END

        IF @ReportKey = 'lead-conversion-summary'
        BEGIN
            SELECT
                COALESCE(l.Source, 'Unspecified') AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CAST(SUM(CASE WHEN l.QualifiedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col3,
                CONCAT(CAST(SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), ' converted') AS Col4,
                ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, COALESCE(l.Source, 'Unspecified')) AS Sort1
            FROM [crm].[Leads] l
            WHERE l.TenantId = @TenantId
              AND l.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@LeadSource = '' OR COALESCE(l.Source, '') = @LeadSource)
              AND (@DateFrom = '' OR CAST(l.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(l.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY COALESCE(l.Source, 'Unspecified')
            ORDER BY COUNT(*) DESC, COALESCE(l.Source, 'Unspecified');
            RETURN;
        END

        IF @ReportKey = 'sales-activities-by-owner'
        BEGIN
            SELECT
                u.FullName AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CAST(SUM(CASE WHEN a.CompletedDateUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col3,
                CAST(SUM(CASE WHEN a.CompletedDateUtc IS NULL AND a.DueDateUtc < GETUTCDATE() THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, u.FullName) AS Sort1
            FROM [crm].[Activities] a
            INNER JOIN [identity].[Users] u ON u.Id = a.OwnerId
            WHERE a.TenantId = @TenantId
              AND a.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(a.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@Status = '' OR (
                    (@Status = 'Completed' AND a.CompletedDateUtc IS NOT NULL) OR
                    (@Status = 'Open' AND a.CompletedDateUtc IS NULL) OR
                    (@Status = 'Overdue' AND a.CompletedDateUtc IS NULL AND a.DueDateUtc < GETUTCDATE())
                  ))
              AND (@DateFrom = '' OR CAST(a.DueDateUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(a.DueDateUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY u.FullName
            ORDER BY COUNT(*) DESC, u.FullName;
            RETURN;
        END

        IF @ReportKey IN ('forecast-summary', 'forecast-distribution', 'revenue-forecast')
        BEGIN
            SELECT
                COALESCE(NULLIF(o.ForecastCategory, ''), 'Unassigned') AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CONCAT('$', FORMAT(SUM(o.Amount), '#,0')) AS Col3,
                CONCAT('$', FORMAT(SUM(o.Amount * (o.Probability / 100.0)), '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY SUM(o.Amount) DESC, COALESCE(NULLIF(o.ForecastCategory, ''), 'Unassigned')) AS Sort1
            FROM [crm].[Opportunities] o
            LEFT JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId
            WHERE o.TenantId = @TenantId
              AND o.IsDeleted = 0
              AND o.IsClosed = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@Stage = '' OR s.Name = @Stage)
              AND (@DateFrom = '' OR CAST(o.ExpectedCloseDate AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(o.ExpectedCloseDate AS date) <= CAST(@DateTo AS date))
            GROUP BY COALESCE(NULLIF(o.ForecastCategory, ''), 'Unassigned')
            ORDER BY SUM(o.Amount) DESC, COALESCE(NULLIF(o.ForecastCategory, ''), 'Unassigned');
            RETURN;
        END

        IF @ReportKey = 'pipeline-stage-mix'
        BEGIN
            ;WITH StageData AS (
                SELECT
                    s.Name AS StageName,
                    s.[Order] AS StageOrder,
                    COUNT(o.Id) AS DealCount,
                    SUM(o.Amount) AS TotalValue
                FROM [crm].[Opportunities] o
                INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId
                WHERE o.TenantId = @TenantId
                  AND o.IsDeleted = 0
                  AND o.IsClosed = 0
                  AND (
                        @OwnerUserId = '' OR EXISTS (
                            SELECT 1
                            FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                            WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                        )
                      )
                  AND (@Stage = '' OR s.Name = @Stage)
                  AND (@DateFrom = '' OR CAST(o.ExpectedCloseDate AS date) >= CAST(@DateFrom AS date))
                  AND (@DateTo = '' OR CAST(o.ExpectedCloseDate AS date) <= CAST(@DateTo AS date))
                GROUP BY s.Name, s.[Order]
            )
            SELECT
                StageName AS Col1,
                CAST(DealCount AS nvarchar(50)) AS Col2,
                CONCAT('$', FORMAT(TotalValue, '#,0')) AS Col3,
                CONCAT(CAST(CAST((100.0 * TotalValue / NULLIF(SUM(TotalValue) OVER (), 0)) AS decimal(10, 1)) AS nvarchar(20)), '%') AS Col4,
                ROW_NUMBER() OVER (ORDER BY StageOrder) AS Sort1
            FROM StageData
            ORDER BY StageOrder;
            RETURN;
        END

        IF @ReportKey = 'revenue-and-conversion-trend'
        BEGIN
            ;WITH LeadMonths AS (
                SELECT
                    DATEFROMPARTS(YEAR(l.CreatedAtUtc), MONTH(l.CreatedAtUtc), 1) AS PeriodStart,
                    COUNT(*) AS LeadsCreated,
                    SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS LeadsConverted
                FROM [crm].[Leads] l
                WHERE l.TenantId = @TenantId
                  AND l.IsDeleted = 0
                  AND (
                        @OwnerUserId = '' OR EXISTS (
                            SELECT 1
                            FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                            WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                        )
                      )
                  AND (@DateFrom = '' OR CAST(l.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
                  AND (@DateTo = '' OR CAST(l.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
                GROUP BY DATEFROMPARTS(YEAR(l.CreatedAtUtc), MONTH(l.CreatedAtUtc), 1)
            ),
            RevenueMonths AS (
                SELECT
                    DATEFROMPARTS(YEAR(o.UpdatedAtUtc), MONTH(o.UpdatedAtUtc), 1) AS PeriodStart,
                    SUM(CASE WHEN o.IsWon = 1 THEN o.Amount ELSE 0 END) AS WonRevenue
                FROM [crm].[Opportunities] o
                WHERE o.TenantId = @TenantId
                  AND o.IsDeleted = 0
                  AND o.IsClosed = 1
                  AND (
                        @OwnerUserId = '' OR EXISTS (
                            SELECT 1
                            FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                            WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                        )
                      )
                  AND (@DateFrom = '' OR CAST(o.UpdatedAtUtc AS date) >= CAST(@DateFrom AS date))
                  AND (@DateTo = '' OR CAST(o.UpdatedAtUtc AS date) <= CAST(@DateTo AS date))
                GROUP BY DATEFROMPARTS(YEAR(o.UpdatedAtUtc), MONTH(o.UpdatedAtUtc), 1)
            )
            SELECT
                CONVERT(varchar(7), COALESCE(lm.PeriodStart, rm.PeriodStart), 120) AS Col1,
                CONCAT('$', FORMAT(COALESCE(rm.WonRevenue, 0), '#,0')) AS Col2,
                CAST(COALESCE(lm.LeadsCreated, 0) AS nvarchar(50)) AS Col3,
                CAST(COALESCE(lm.LeadsConverted, 0) AS nvarchar(50)) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COALESCE(lm.PeriodStart, rm.PeriodStart) DESC) AS Sort1
            FROM LeadMonths lm
            FULL OUTER JOIN RevenueMonths rm ON rm.PeriodStart = lm.PeriodStart
            ORDER BY COALESCE(lm.PeriodStart, rm.PeriodStart) DESC;
            RETURN;
        END

        IF @ReportKey = 'win-loss-analysis'
        BEGIN
            SELECT
                CASE WHEN o.IsWon = 1 THEN 'Won' ELSE 'Lost' END AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CONCAT('$', FORMAT(SUM(o.Amount), '#,0')) AS Col3,
                CONCAT('$', FORMAT(AVG(o.Amount), '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY o.IsWon DESC) AS Sort1
            FROM [crm].[Opportunities] o
            WHERE o.TenantId = @TenantId
              AND o.IsDeleted = 0
              AND o.IsClosed = 1
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@DateFrom = '' OR CAST(o.UpdatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(o.UpdatedAtUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY o.IsWon
            ORDER BY o.IsWon DESC;
            RETURN;
        END

        IF @ReportKey = 'sales-cycle-duration'
        BEGIN
            SELECT
                COALESCE(s.Name, 'Unstaged') AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CONCAT(CAST(CAST(AVG(CAST(DATEDIFF(day, o.CreatedAtUtc, COALESCE(o.UpdatedAtUtc, GETUTCDATE())) AS float)) AS decimal(10,1)) AS nvarchar(50)), ' days') AS Col3,
                CONCAT('$', FORMAT(AVG(o.Amount), '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY AVG(CAST(DATEDIFF(day, o.CreatedAtUtc, COALESCE(o.UpdatedAtUtc, GETUTCDATE())) AS float)) DESC) AS Sort1
            FROM [crm].[Opportunities] o
            LEFT JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId
            WHERE o.TenantId = @TenantId
              AND o.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@Stage = '' OR s.Name = @Stage)
              AND (@DateFrom = '' OR CAST(o.UpdatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(o.UpdatedAtUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY COALESCE(s.Name, 'Unstaged')
            ORDER BY AVG(CAST(DATEDIFF(day, o.CreatedAtUtc, COALESCE(o.UpdatedAtUtc, GETUTCDATE())) AS float)) DESC;
            RETURN;
        END

        IF @ReportKey = 'top-deals'
        BEGIN
            SELECT TOP 25
                o.Name AS Col1,
                COALESCE(a.Name, 'No account') AS Col2,
                COALESCE(s.Name, 'Unstaged') AS Col3,
                CONCAT('$', FORMAT(o.Amount, '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY o.Amount DESC, o.Name) AS Sort1
            FROM [crm].[Opportunities] o
            LEFT JOIN [crm].[Accounts] a ON a.Id = o.AccountId
            LEFT JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId
            WHERE o.TenantId = @TenantId
              AND o.IsDeleted = 0
              AND o.IsClosed = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@Stage = '' OR s.Name = @Stage)
              AND (@DateFrom = '' OR CAST(o.ExpectedCloseDate AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(o.ExpectedCloseDate AS date) <= CAST(@DateTo AS date))
            ORDER BY o.Amount DESC, o.Name;
            RETURN;
        END

        IF @ReportKey = 'lead-conversion-funnel'
        BEGIN
            SELECT 'New Leads' AS Col1, CAST(COUNT(*) AS nvarchar(50)) AS Col2, '' AS Col3, '' AS Col4, 1 AS Sort1
            FROM [crm].[Leads] l
            WHERE l.TenantId = @TenantId AND l.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@DateFrom = '' OR CAST(l.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(l.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            UNION ALL
            SELECT 'Qualified', CAST(COUNT(*) AS nvarchar(50)), '', '', 2
            FROM [crm].[Leads] l
            WHERE l.TenantId = @TenantId AND l.IsDeleted = 0 AND l.QualifiedAtUtc IS NOT NULL
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@DateFrom = '' OR CAST(l.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(l.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            UNION ALL
            SELECT 'Converted', CAST(COUNT(*) AS nvarchar(50)), '', '', 3
            FROM [crm].[Leads] l
            WHERE l.TenantId = @TenantId AND l.IsDeleted = 0 AND l.ConvertedAtUtc IS NOT NULL
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@DateFrom = '' OR CAST(l.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(l.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            ORDER BY Sort1;
            RETURN;
        END

        IF @ReportKey = 'lead-source-performance'
        BEGIN
            SELECT
                COALESCE(l.Source, 'Unspecified') AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CAST(SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col3,
                CONCAT(CAST(CAST((100.0 * SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0)) AS decimal(10,1)) AS nvarchar(20)), '%') AS Col4,
                ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, COALESCE(l.Source, 'Unspecified')) AS Sort1
            FROM [crm].[Leads] l
            WHERE l.TenantId = @TenantId
              AND l.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@LeadSource = '' OR COALESCE(l.Source, '') = @LeadSource)
              AND (@DateFrom = '' OR CAST(l.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(l.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY COALESCE(l.Source, 'Unspecified')
            ORDER BY COUNT(*) DESC, COALESCE(l.Source, 'Unspecified');
            RETURN;
        END

        IF @ReportKey = 'lead-aging'
        BEGIN
            ;WITH LeadAging AS (
                SELECT
                    CASE
                        WHEN DATEDIFF(day, l.CreatedAtUtc, GETUTCDATE()) <= 7 THEN '0-7 days'
                        WHEN DATEDIFF(day, l.CreatedAtUtc, GETUTCDATE()) <= 14 THEN '8-14 days'
                        WHEN DATEDIFF(day, l.CreatedAtUtc, GETUTCDATE()) <= 30 THEN '15-30 days'
                        ELSE '31+ days'
                    END AS AgeBucket,
                    CASE
                        WHEN DATEDIFF(day, l.CreatedAtUtc, GETUTCDATE()) <= 7 THEN 1
                        WHEN DATEDIFF(day, l.CreatedAtUtc, GETUTCDATE()) <= 14 THEN 2
                        WHEN DATEDIFF(day, l.CreatedAtUtc, GETUTCDATE()) <= 30 THEN 3
                        ELSE 4
                    END AS SortBucket
                FROM [crm].[Leads] l
                WHERE l.TenantId = @TenantId
                  AND l.IsDeleted = 0
                  AND l.ConvertedAtUtc IS NULL
                  AND (
                        @OwnerUserId = '' OR EXISTS (
                            SELECT 1
                            FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                            WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                        )
                      )
                  AND (@LeadSource = '' OR COALESCE(l.Source, '') = @LeadSource)
            )
            SELECT
                AgeBucket AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                '' AS Col3,
                '' AS Col4,
                MIN(SortBucket) AS Sort1
            FROM LeadAging
            GROUP BY AgeBucket
            ORDER BY MIN(SortBucket);
            RETURN;
        END

        IF @ReportKey = 'lead-score-distribution'
        BEGIN
            ;WITH ScoreBands AS (
                SELECT
                    CASE
                        WHEN COALESCE(l.AiScore, l.Score) >= 80 THEN '80-100'
                        WHEN COALESCE(l.AiScore, l.Score) >= 60 THEN '60-79'
                        WHEN COALESCE(l.AiScore, l.Score) >= 40 THEN '40-59'
                        ELSE '0-39'
                    END AS Band,
                    CASE
                        WHEN COALESCE(l.AiScore, l.Score) >= 80 THEN 1
                        WHEN COALESCE(l.AiScore, l.Score) >= 60 THEN 2
                        WHEN COALESCE(l.AiScore, l.Score) >= 40 THEN 3
                        ELSE 4
                    END AS SortBand,
                    COALESCE(l.AiScore, l.Score) AS EffectiveScore,
                    l.AiConfidence
                FROM [crm].[Leads] l
                WHERE l.TenantId = @TenantId
                  AND l.IsDeleted = 0
                  AND (
                        @OwnerUserId = '' OR EXISTS (
                            SELECT 1
                            FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                            WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                        )
                      )
                  AND (@LeadSource = '' OR COALESCE(l.Source, '') = @LeadSource)
            )
            SELECT
                Band AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CONCAT('Avg score ', CAST(CAST(AVG(CAST(EffectiveScore AS float)) AS decimal(10,1)) AS nvarchar(30))) AS Col3,
                CONCAT('Conf ', CAST(CAST(AVG(COALESCE(AiConfidence, 0)) AS decimal(10,2)) AS nvarchar(30))) AS Col4,
                MIN(SortBand) AS Sort1
            FROM ScoreBands
            GROUP BY Band
            ORDER BY MIN(SortBand);
            RETURN;
        END

        IF @ReportKey = 'lead-quality-vs-conversation-signal'
        BEGIN
            SELECT TOP 25
                CONCAT(l.FirstName, ' ', l.LastName) AS Col1,
                u.FullName AS Col2,
                CONCAT('Q ', CAST(l.Score AS nvarchar(20))) AS Col3,
                CONCAT('Conv ', CAST(COALESCE(l.ConversationScore, 0) AS nvarchar(20))) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COALESCE(l.ConversationScore, 0) DESC, l.Score DESC) AS Sort1
            FROM [crm].[Leads] l
            INNER JOIN [identity].[Users] u ON u.Id = l.OwnerId
            WHERE l.TenantId = @TenantId
              AND l.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(l.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@LeadSource = '' OR COALESCE(l.Source, '') = @LeadSource)
              AND (@DateFrom = '' OR CAST(l.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(l.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            ORDER BY COALESCE(l.ConversationScore, 0) DESC, l.Score DESC;
            RETURN;
        END

        IF @ReportKey = 'cqvs-readiness-heatmap'
        BEGIN
            SELECT * FROM (
                SELECT 'Budget availability' AS Col1, CAST(SUM(CASE WHEN NULLIF(BudgetAvailability, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col2, CAST(SUM(CASE WHEN BudgetValidatedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col3, CAST(COUNT(*) - SUM(CASE WHEN NULLIF(BudgetAvailability, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col4, 1 AS Sort1 FROM [crm].[Leads] WHERE TenantId = @TenantId AND IsDeleted = 0
                UNION ALL
                SELECT 'Readiness to spend', CAST(SUM(CASE WHEN NULLIF(ReadinessToSpend, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(SUM(CASE WHEN ReadinessValidatedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(COUNT(*) - SUM(CASE WHEN NULLIF(ReadinessToSpend, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), 2 FROM [crm].[Leads] WHERE TenantId = @TenantId AND IsDeleted = 0
                UNION ALL
                SELECT 'Buying timeline', CAST(SUM(CASE WHEN NULLIF(BuyingTimeline, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(SUM(CASE WHEN BuyingTimelineValidatedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(COUNT(*) - SUM(CASE WHEN NULLIF(BuyingTimeline, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), 3 FROM [crm].[Leads] WHERE TenantId = @TenantId AND IsDeleted = 0
                UNION ALL
                SELECT 'Problem severity', CAST(SUM(CASE WHEN NULLIF(ProblemSeverity, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(SUM(CASE WHEN ProblemSeverityValidatedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(COUNT(*) - SUM(CASE WHEN NULLIF(ProblemSeverity, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), 4 FROM [crm].[Leads] WHERE TenantId = @TenantId AND IsDeleted = 0
                UNION ALL
                SELECT 'Economic buyer', CAST(SUM(CASE WHEN NULLIF(EconomicBuyer, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(SUM(CASE WHEN EconomicBuyerValidatedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(COUNT(*) - SUM(CASE WHEN NULLIF(EconomicBuyer, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), 5 FROM [crm].[Leads] WHERE TenantId = @TenantId AND IsDeleted = 0
                UNION ALL
                SELECT 'ICP fit', CAST(SUM(CASE WHEN NULLIF(IcpFit, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(SUM(CASE WHEN IcpFitValidatedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), CAST(COUNT(*) - SUM(CASE WHEN NULLIF(IcpFit, '') IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)), 6 FROM [crm].[Leads] WHERE TenantId = @TenantId AND IsDeleted = 0
            ) q
            ORDER BY Sort1;
            RETURN;
        END

        IF @ReportKey IN ('manager-pipeline-health', 'pipeline-health-scorecard')
        BEGIN
            ;WITH LastActivity AS (
                SELECT RelatedEntityId, MAX(COALESCE(CompletedDateUtc, DueDateUtc, CreatedAtUtc)) AS LastTouch
                FROM [crm].[Activities]
                WHERE TenantId = @TenantId
                  AND IsDeleted = 0
                  AND RelatedEntityType = 3
                GROUP BY RelatedEntityId
            )
            SELECT
                COALESCE(s.Name, 'Unstaged') AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CAST(SUM(CASE WHEN la.LastTouch IS NULL OR la.LastTouch < DATEADD(day, -7, GETUTCDATE()) THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col3,
                CONCAT('$', FORMAT(SUM(o.Amount * (o.Probability / 100.0)), '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY SUM(o.Amount) DESC, COALESCE(s.Name, 'Unstaged')) AS Sort1
            FROM [crm].[Opportunities] o
            LEFT JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId
            LEFT JOIN LastActivity la ON la.RelatedEntityId = o.Id
            WHERE o.TenantId = @TenantId
              AND o.IsDeleted = 0
              AND o.IsClosed = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@Stage = '' OR s.Name = @Stage)
              AND (@DateFrom = '' OR CAST(o.ExpectedCloseDate AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(o.ExpectedCloseDate AS date) <= CAST(@DateTo AS date))
            GROUP BY COALESCE(s.Name, 'Unstaged')
            ORDER BY SUM(o.Amount) DESC, COALESCE(s.Name, 'Unstaged');
            RETURN;
        END

        IF @ReportKey = 'activity-summary'
        BEGIN
            SELECT
                CAST(a.Type AS nvarchar(50)) AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CAST(SUM(CASE WHEN a.CompletedDateUtc IS NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col3,
                CAST(SUM(CASE WHEN a.CompletedDateUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, CAST(a.Type AS nvarchar(50))) AS Sort1
            FROM [crm].[Activities] a
            WHERE a.TenantId = @TenantId
              AND a.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(a.OwnerId AS nvarchar(36))
                    )
                  )
              AND (@Status = '' OR (
                    (@Status = 'Completed' AND a.CompletedDateUtc IS NOT NULL) OR
                    (@Status = 'Open' AND a.CompletedDateUtc IS NULL) OR
                    (@Status = 'Overdue' AND a.CompletedDateUtc IS NULL AND a.DueDateUtc < GETUTCDATE())
                  ))
              AND (@DateFrom = '' OR CAST(a.DueDateUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(a.DueDateUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY a.Type
            ORDER BY COUNT(*) DESC, CAST(a.Type AS nvarchar(50));
            RETURN;
        END

        IF @ReportKey = 'team-performance'
        BEGIN
            SELECT
                u.FullName AS Col1,
                CAST(COUNT(DISTINCT o.Id) AS nvarchar(50)) AS Col2,
                CONCAT('$', FORMAT(COALESCE(SUM(o.Amount), 0), '#,0')) AS Col3,
                CAST(COALESCE(MAX(act.CompletedCount), 0) AS nvarchar(50)) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(o.Amount), 0) DESC, u.FullName) AS Sort1
            FROM [identity].[Users] u
            LEFT JOIN [crm].[Opportunities] o ON o.OwnerId = u.Id AND o.TenantId = @TenantId AND o.IsDeleted = 0 AND o.IsClosed = 0
            OUTER APPLY (
                SELECT COUNT(*) AS CompletedCount
                FROM [crm].[Activities] a
                WHERE a.OwnerId = u.Id
                  AND a.TenantId = @TenantId
                  AND a.IsDeleted = 0
                  AND a.CompletedDateUtc IS NOT NULL
            ) act
            WHERE u.TenantId = @TenantId
              AND u.IsDeleted = 0
              AND (
                    @OwnerUserId = '' OR EXISTS (
                        SELECT 1
                        FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                        WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(u.Id AS nvarchar(36))
                    )
                  )
            GROUP BY u.FullName
            ORDER BY COALESCE(SUM(o.Amount), 0) DESC, u.FullName;
            RETURN;
        END

        IF @ReportKey = 'customer-growth'
        BEGIN
            SELECT
                CONVERT(varchar(7), DATEFROMPARTS(YEAR(a.CreatedAtUtc), MONTH(a.CreatedAtUtc), 1), 120) AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CONCAT('$', FORMAT(COALESCE(SUM(a.AnnualRevenue), 0), '#,0')) AS Col3,
                COALESCE(MAX(a.Industry), 'Mixed') AS Col4,
                ROW_NUMBER() OVER (ORDER BY DATEFROMPARTS(YEAR(a.CreatedAtUtc), MONTH(a.CreatedAtUtc), 1) DESC) AS Sort1
            FROM [crm].[Accounts] a
            WHERE a.TenantId = @TenantId
              AND a.IsDeleted = 0
              AND COALESCE(a.LifecycleStage, '') = 'Customer'
              AND (@DateFrom = '' OR CAST(a.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(a.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY DATEFROMPARTS(YEAR(a.CreatedAtUtc), MONTH(a.CreatedAtUtc), 1)
            ORDER BY DATEFROMPARTS(YEAR(a.CreatedAtUtc), MONTH(a.CreatedAtUtc), 1) DESC;
            RETURN;
        END

        IF @ReportKey = 'customer-revenue-concentration'
        BEGIN
            SELECT TOP 25
                a.Name AS Col1,
                CONCAT('$', FORMAT(COALESCE(a.AnnualRevenue, 0), '#,0')) AS Col2,
                CAST(COUNT(o.Id) AS nvarchar(50)) AS Col3,
                CONCAT('$', FORMAT(COALESCE(SUM(o.Amount), 0), '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COALESCE(a.AnnualRevenue, 0) DESC, a.Name) AS Sort1
            FROM [crm].[Accounts] a
            LEFT JOIN [crm].[Opportunities] o ON o.AccountId = a.Id AND o.IsDeleted = 0
            WHERE a.TenantId = @TenantId
              AND a.IsDeleted = 0
              AND (@DateFrom = '' OR CAST(a.CreatedAtUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(a.CreatedAtUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY a.Name, a.AnnualRevenue
            ORDER BY COALESCE(a.AnnualRevenue, 0) DESC, a.Name;
            RETURN;
        END

        IF @ReportKey = 'campaign-roi'
        BEGIN
            SELECT
                c.Name AS Col1,
                CAST(COUNT(DISTINCT cm.Id) AS nvarchar(50)) AS Col2,
                CONCAT('$', FORMAT(COALESCE(c.BudgetActual, 0), '#,0')) AS Col3,
                CONCAT('$', FORMAT(COALESCE(c.BudgetPlanned, 0), '#,0')) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COALESCE(c.BudgetActual, 0) DESC, c.Name) AS Sort1
            FROM [crm].[Campaigns] c
            LEFT JOIN [crm].[CampaignMembers] cm ON cm.CampaignId = c.Id AND cm.IsDeleted = 0
            WHERE c.TenantId = @TenantId
              AND c.IsDeleted = 0
              AND (@DateFrom = '' OR CAST(c.StartDateUtc AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(c.StartDateUtc AS date) <= CAST(@DateTo AS date))
            GROUP BY c.Name, c.BudgetActual, c.BudgetPlanned
            ORDER BY COALESCE(c.BudgetActual, 0) DESC, c.Name;
            RETURN;
        END

        IF @ReportKey = 'email-engagement'
        BEGIN
            SELECT
                COALESCE(t.Name, e.Subject) AS Col1,
                CAST(COUNT(*) AS nvarchar(50)) AS Col2,
                CAST(SUM(CASE WHEN e.OpenedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col3,
                CAST(SUM(CASE WHEN e.ClickedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS nvarchar(50)) AS Col4,
                ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, COALESCE(t.Name, e.Subject)) AS Sort1
            FROM [crm].[EmailLogs] e
            LEFT JOIN [crm].[EmailTemplates] t ON t.Id = e.TemplateId
            WHERE e.TenantId = @TenantId
              AND e.IsDeleted = 0
              AND (@DateFrom = '' OR CAST(COALESCE(e.SentAtUtc, e.CreatedAtUtc) AS date) >= CAST(@DateFrom AS date))
              AND (@DateTo = '' OR CAST(COALESCE(e.SentAtUtc, e.CreatedAtUtc) AS date) <= CAST(@DateTo AS date))
            GROUP BY COALESCE(t.Name, e.Subject)
            ORDER BY COUNT(*) DESC, COALESCE(t.Name, e.Subject);
            RETURN;
        END

        SELECT
            'Report preview is not implemented yet.' AS Col1,
            @ReportTitle AS Col2,
            '' AS Col3,
            '' AS Col4,
            1 AS Sort1;
        """;

    public EmbeddedLibraryTelerikReport()
    {
        Name = "EmbeddedLibraryTelerikReport";
        Width = Unit.Cm(18.5);
        PageSettings.PaperKind = System.Drawing.Printing.PaperKind.Custom;
        PageSettings.PaperSize = new SizeU(Unit.Cm(27.94), Unit.Cm(21.59));
        PageSettings.Margins = new MarginsU(Unit.Cm(1), Unit.Cm(1), Unit.Cm(1), Unit.Cm(1));

        AddHiddenParameter("TenantId");
        AddHiddenParameter("ReportKey");
        AddHiddenParameter("ReportTitle");
        AddHiddenParameter("ReportDescription");
        AddHiddenParameter("DateFrom");
        AddHiddenParameter("DateTo");
        AddHiddenParameter("OwnerUserId");
        AddHiddenParameter("Stage");
        AddHiddenParameter("Status");
        AddHiddenParameter("ApprovalStatus");
        AddHiddenParameter("LeadSource");
        AddHiddenParameter("Header1");
        AddHiddenParameter("Header2");
        AddHiddenParameter("Header3");
        AddHiddenParameter("Header4");

        var sqlDs = new SqlDataSource
        {
            Name = "EmbeddedLibraryData",
            ConnectionString = "=ConnectionStrings.SqlServer",
            SelectCommand = PreviewSql,
            ProviderName = "System.Data.SqlClient"
        };
        AddSqlParam(sqlDs, "@TenantId", "=Parameters.TenantId.Value");
        AddSqlParam(sqlDs, "@ReportKey", "=Parameters.ReportKey.Value");
        AddSqlParam(sqlDs, "@ReportTitle", "=Parameters.ReportTitle.Value");
        AddSqlParam(sqlDs, "@DateFrom", "=Parameters.DateFrom.Value");
        AddSqlParam(sqlDs, "@DateTo", "=Parameters.DateTo.Value");
        AddSqlParam(sqlDs, "@OwnerUserId", "=Parameters.OwnerUserId.Value");
        AddSqlParam(sqlDs, "@Stage", "=Parameters.Stage.Value");
        AddSqlParam(sqlDs, "@Status", "=Parameters.Status.Value");
        AddSqlParam(sqlDs, "@ApprovalStatus", "=Parameters.ApprovalStatus.Value");
        AddSqlParam(sqlDs, "@LeadSource", "=Parameters.LeadSource.Value");

        Items.Add(CreateHeaderSection());
        Items.Add(CreateDetailSection(sqlDs));
        Items.Add(CreateFooterSection());
    }

    private void AddHiddenParameter(string name)
    {
        ReportParameters.Add(new ReportParameter
        {
            Name = name,
            Type = ReportParameterType.String,
            Visible = false,
            AllowBlank = true,
            AllowNull = true,
            Value = string.Empty
        });
    }

    private static void AddSqlParam(SqlDataSource dataSource, string name, string expression)
        => dataSource.Parameters.Add(new SqlDataSourceParameter(name, System.Data.DbType.String, expression));

    private static ReportHeaderSection CreateHeaderSection()
    {
        var header = new ReportHeaderSection { Height = Unit.Cm(3.2) };

        header.Items.Add(new TextBox
        {
            Value = "= Parameters.ReportTitle.Value",
            Location = new PointU(Unit.Cm(0), Unit.Cm(0.3)),
            Size = new SizeU(Unit.Cm(18.5), Unit.Cm(0.9)),
            Style = { Font = { Bold = true, Size = Unit.Point(20) }, Color = Gray900 }
        });

        header.Items.Add(new TextBox
        {
            Value = "= Parameters.ReportDescription.Value",
            Location = new PointU(Unit.Cm(0), Unit.Cm(1.35)),
            Size = new SizeU(Unit.Cm(18.5), Unit.Cm(0.6)),
            Style = { Font = { Size = Unit.Point(9) }, Color = Gray700 }
        });

        header.Items.Add(new TextBox
        {
            Value = "= 'Generated: ' + Format('{0:MMMM d, yyyy  h:mm tt}', Now())",
            Location = new PointU(Unit.Cm(0), Unit.Cm(2.1)),
            Size = new SizeU(Unit.Cm(10), Unit.Cm(0.4)),
            Style = { Font = { Size = Unit.Point(8), Italic = true }, Color = Gray500 }
        });

        header.Items.Add(new TextBox
        {
            Value = "",
            Location = new PointU(Unit.Cm(0), Unit.Cm(2.7)),
            Size = new SizeU(Unit.Cm(18.5), Unit.Cm(0.03)),
            Style = { BackgroundColor = Gray200 }
        });

        return header;
    }

    private static DetailSection CreateDetailSection(SqlDataSource sqlDs)
    {
        var detail = new DetailSection { Height = Unit.Cm(12.5) };
        detail.Items.Add(CreateSummaryTable(sqlDs));
        return detail;
    }

    private static Table CreateSummaryTable(SqlDataSource sqlDs)
    {
        var table = new Table
        {
            Location = new PointU(Unit.Cm(0), Unit.Cm(0.4)),
            Size = new SizeU(Unit.Cm(18.5), Unit.Cm(9.5)),
            DataSource = sqlDs
        };

        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(4.8)));
        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(4.3)));
        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(4.7)));
        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(4.7)));

        var detailGroup = new TableGroup { Name = "detailGroup" };
        detailGroup.Groupings.Add(new Grouping());
        table.RowGroups.Add(detailGroup);

        table.ColumnGroups.Add(CreateColumnGroup("col1", "= Parameters.Header1.Value"));
        table.ColumnGroups.Add(CreateColumnGroup("col2", "= Parameters.Header2.Value"));
        table.ColumnGroups.Add(CreateColumnGroup("col3", "= Parameters.Header3.Value"));
        table.ColumnGroups.Add(CreateColumnGroup("col4", "= Parameters.Header4.Value"));

        table.Body.Rows.Add(new TableBodyRow(Unit.Cm(0.8)));

        table.Body.SetCellContent(0, 0, CreateValueCell("=Fields.Col1"));
        table.Body.SetCellContent(0, 1, CreateValueCell("=Fields.Col2"));
        table.Body.SetCellContent(0, 2, CreateValueCell("=Fields.Col3"));
        table.Body.SetCellContent(0, 3, CreateValueCell("=Fields.Col4"));

        return table;
    }

    private static TextBox CreateValueCell(string value)
    {
        var textBox = new TextBox
        {
            Value = value,
            Style =
            {
                Font = { Size = Unit.Point(9) },
                Color = Gray700,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Left = Unit.Point(7), Right = Unit.Point(7), Top = Unit.Point(5), Bottom = Unit.Point(5) }
            }
        };
        textBox.Style.BorderStyle.Bottom = BorderType.Solid;
        textBox.Style.BorderColor.Bottom = Color.FromArgb(30, 15, 23, 42);
        textBox.Style.BorderWidth.Bottom = Unit.Point(1);
        return textBox;
    }

    private static TableGroup CreateColumnGroup(string name, string titleExpression)
    {
        var header = new TextBox
        {
            Value = titleExpression,
            Style =
            {
                Font = { Size = Unit.Point(9), Bold = true },
                Color = Blue600,
                BackgroundColor = HeaderBackground,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Left = Unit.Point(7), Right = Unit.Point(7), Top = Unit.Point(5), Bottom = Unit.Point(5) }
            }
        };
        header.Style.BorderStyle.Bottom = BorderType.Solid;
        header.Style.BorderColor.Bottom = Gray200;
        header.Style.BorderWidth.Bottom = Unit.Point(1);

        return new TableGroup
        {
            Name = name,
            ReportItem = header
        };
    }

    private static ReportFooterSection CreateFooterSection()
    {
        var footer = new ReportFooterSection { Height = Unit.Cm(0.9) };
        footer.Items.Add(new TextBox
        {
            Value = "CRM Enterprise • Embedded report preview",
            Location = new PointU(Unit.Cm(0), Unit.Cm(0.2)),
            Size = new SizeU(Unit.Cm(10), Unit.Cm(0.4)),
            Style = { Font = { Size = Unit.Point(8) }, Color = Gray500 }
        });
        return footer;
    }
}
