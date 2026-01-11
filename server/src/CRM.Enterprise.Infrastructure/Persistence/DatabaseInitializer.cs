using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Security;
using CRM.Enterprise.Application.Tenants;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace CRM.Enterprise.Infrastructure.Persistence;

public class DatabaseInitializer : IDatabaseInitializer
{
        private async Task SeedSampleSuppliersAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.Suppliers.IgnoreQueryFilters().AnyAsync(s => s.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var now = DateTime.UtcNow;
            var suppliers = new[]
            {
                new Supplier
                {
                    Name = "Acme Manufacturing",
                    Category = "Industrial",
                    Status = "Active",
                    Country = "USA",
                    Website = "https://acme.com",
                    ContactName = "John Doe",
                    ContactEmail = "john.doe@acme.com",
                    ContactPhone = "555-1001",
                    Notes = "Preferred supplier for widgets.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new Supplier
                {
                    Name = "Global Supplies Ltd.",
                    Category = "Wholesale",
                    Status = "Pending Approval",
                    Country = "UK",
                    Website = "https://globalsupplies.co.uk",
                    ContactName = "Jane Smith",
                    ContactEmail = "jane.smith@globalsupplies.co.uk",
                    ContactPhone = "555-2002",
                    Notes = "Awaiting compliance review.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new Supplier
                {
                    Name = "Pacific Traders",
                    Category = "Retail",
                    Status = "Approved",
                    Country = "Canada",
                    Website = "https://pacifictraders.ca",
                    ContactName = "Carlos Ruiz",
                    ContactEmail = "carlos.ruiz@pacifictraders.ca",
                    ContactPhone = "555-3003",
                    Notes = "Ready to start transacting.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new Supplier
                {
                    Name = "Dragon Electronics",
                    Category = "Electronics",
                    Status = "On Hold",
                    Country = "China",
                    Website = "https://dragonelec.cn",
                    ContactName = "Wei Zhang",
                    ContactEmail = "wei.zhang@dragonelec.cn",
                    ContactPhone = "555-4004",
                    Notes = "Quality issue under investigation.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new Supplier
                {
                    Name = "EuroTech GmbH",
                    Category = "Technology",
                    Status = "Blocked",
                    Country = "Germany",
                    Website = "https://eurotech.de",
                    ContactName = "Hans Mueller",
                    ContactEmail = "hans.mueller@eurotech.de",
                    ContactPhone = "555-5005",
                    Notes = "Compliance violation - export restrictions.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new Supplier
                {
                    Name = "New Ventures Co.",
                    Category = "Services",
                    Status = "Draft",
                    Country = "India",
                    Website = "https://newventures.in",
                    ContactName = "Priya Sharma",
                    ContactEmail = "priya.sharma@newventures.in",
                    ContactPhone = "555-7007",
                    Notes = "Profile incomplete - awaiting documents.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.Suppliers.AddRange(suppliers);
        }

        private async Task SeedItemMasterAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.ItemMasters.IgnoreQueryFilters().AnyAsync(i => i.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var now = DateTime.UtcNow;
            var items = new[]
            {
                new ItemMaster
                {
                    Sku = "ELEC-001",
                    Name = "Industrial Circuit Board",
                    Description = "High-performance PCB for automation systems",
                    CategoryName = "Electronics",
                    DefaultUom = "Piece",
                    IsActive = true,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new ItemMaster
                {
                    Sku = "RAW-002",
                    Name = "Stainless Steel Sheet",
                    Description = "304 grade stainless steel, 4x8 feet",
                    CategoryName = "Raw Materials",
                    DefaultUom = "Sheet",
                    IsActive = true,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new ItemMaster
                {
                    Sku = "OFF-005",
                    Name = "Premium Paper Reams A4",
                    Description = "80gsm white office paper, 500 sheets per ream",
                    CategoryName = "Office Supplies",
                    DefaultUom = "Carton",
                    IsActive = true,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new ItemMaster
                {
                    Sku = "PACK-010",
                    Name = "Heavy Duty Corrugated Box",
                    Description = "Double-wall corrugated box for heavy shipments",
                    CategoryName = "Packaging",
                    DefaultUom = "Box",
                    IsActive = true,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new ItemMaster
                {
                    Sku = "MRO-014",
                    Name = "Safety Gloves - Nitrile",
                    Description = "Industrial grade nitrile gloves (100/box)",
                    CategoryName = "MRO",
                    DefaultUom = "Box",
                    IsActive = true,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.ItemMasters.AddRange(items);
        }

        private async Task SeedPriceListsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.PriceLists.IgnoreQueryFilters().AnyAsync(p => p.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var itemMasters = await _dbContext.ItemMasters
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId)
                .OrderBy(i => i.Name)
                .ToListAsync(cancellationToken);

            if (itemMasters.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var coreList = new PriceList
            {
                Name = "Core Supplier Costs",
                Currency = "USD",
                Status = "Active",
                ValidFrom = now.Date,
                Notes = "Baseline supplier cost list.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            foreach (var item in itemMasters.Take(3))
            {
                coreList.Items.Add(new PriceListItem
                {
                    ItemMasterId = item.Id,
                    Uom = item.DefaultUom ?? "Each",
                    UnitPrice = item.Sku.StartsWith("RAW") ? 120.00m : 48.50m,
                    MinQty = 1,
                    LeadTimeDays = 7,
                    IsActive = true
                });
            }

            var promoList = new PriceList
            {
                Name = "Quarterly Contract Rates",
                Currency = "USD",
                Status = "Draft",
                ValidFrom = now.Date,
                ValidTo = now.Date.AddMonths(3),
                Notes = "Draft list for upcoming contract negotiations.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            foreach (var item in itemMasters.Skip(1).Take(3))
            {
                promoList.Items.Add(new PriceListItem
                {
                    ItemMasterId = item.Id,
                    Uom = item.DefaultUom ?? "Each",
                    UnitPrice = 42.00m,
                    MinQty = 10,
                    LeadTimeDays = 14,
                    IsActive = true
                });
            }

            _dbContext.PriceLists.AddRange(coreList, promoList);
        }

        private async Task SeedSupplierComplianceAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierCertifications.IgnoreQueryFilters().AnyAsync(c => c.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow.Date;
            var certifications = new[]
            {
                new SupplierCertification
                {
                    SupplierId = suppliers[0].Id,
                    Name = "ISO 9001",
                    Issuer = "ISO",
                    IssuedOn = now.AddYears(-2),
                    ExpiresOn = now.AddYears(1),
                    Status = "Active",
                    Notes = "Quality management certification.",
                    TenantId = tenantId,
                    CreatedAtUtc = DateTime.UtcNow
                },
                new SupplierCertification
                {
                    SupplierId = suppliers.Count > 1 ? suppliers[1].Id : suppliers[0].Id,
                    Name = "ISO 14001",
                    Issuer = "ISO",
                    IssuedOn = now.AddYears(-1),
                    ExpiresOn = now.AddYears(2),
                    Status = "Active",
                    Notes = "Environmental management certification.",
                    TenantId = tenantId,
                    CreatedAtUtc = DateTime.UtcNow
                },
                new SupplierCertification
                {
                    SupplierId = suppliers.Count > 2 ? suppliers[2].Id : suppliers[0].Id,
                    Name = "RoHS Compliance",
                    Issuer = "EU",
                    IssuedOn = now.AddMonths(-6),
                    ExpiresOn = now.AddMonths(18),
                    Status = "Active",
                    Notes = "Restriction of hazardous substances.",
                    TenantId = tenantId,
                    CreatedAtUtc = DateTime.UtcNow
                }
            };

            _dbContext.SupplierCertifications.AddRange(certifications);
        }

        private async Task SeedSupplierScorecardsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierScorecards.IgnoreQueryFilters().AnyAsync(s => s.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var periodStart = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1).AddMonths(-1);
            var periodEnd = periodStart.AddMonths(1).AddDays(-1);

            var scorecards = suppliers.Take(3).Select((supplier, index) => new SupplierScorecard
            {
                SupplierId = supplier.Id,
                PeriodStart = periodStart,
                PeriodEnd = periodEnd,
                QualityScore = 88 + index,
                DeliveryScore = 82 + index,
                CostScore = 90 - index,
                OverallScore = 86 + index,
                Notes = "Monthly performance snapshot.",
                TenantId = tenantId,
                CreatedAtUtc = DateTime.UtcNow
            }).ToList();

            _dbContext.SupplierScorecards.AddRange(scorecards);
        }

        private async Task SeedSupplierContactsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierContacts.IgnoreQueryFilters().AnyAsync(c => c.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var contacts = new[]
            {
                new SupplierContact
                {
                    SupplierId = suppliers[0].Id,
                    FullName = "Alex Morgan",
                    Title = "Account Manager",
                    Email = "alex.morgan@acme.com",
                    Phone = "555-1100",
                    Department = "Sales",
                    IsPrimary = true,
                    Notes = "Primary point of contact.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new SupplierContact
                {
                    SupplierId = suppliers.Count > 1 ? suppliers[1].Id : suppliers[0].Id,
                    FullName = "Rina Patel",
                    Title = "Compliance Lead",
                    Email = "rina.patel@globalsupplies.co.uk",
                    Phone = "555-2200",
                    Department = "Compliance",
                    IsPrimary = true,
                    Notes = "Handles certifications and audits.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new SupplierContact
                {
                    SupplierId = suppliers.Count > 2 ? suppliers[2].Id : suppliers[0].Id,
                    FullName = "Marcus Lee",
                    Title = "Operations Manager",
                    Email = "marcus.lee@pacifictraders.ca",
                    Phone = "555-3300",
                    Department = "Operations",
                    IsPrimary = true,
                    Notes = "Logistics and delivery escalation contact.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.SupplierContacts.AddRange(contacts);
        }

        private async Task SeedSupplierAddressesAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierAddresses.IgnoreQueryFilters().AnyAsync(a => a.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var addresses = new[]
            {
                new SupplierAddress
                {
                    SupplierId = suppliers[0].Id,
                    Label = "Headquarters",
                    Line1 = "1200 Industrial Blvd",
                    City = "Cleveland",
                    State = "OH",
                    PostalCode = "44114",
                    Country = "USA",
                    IsPrimary = true,
                    Notes = "Primary billing address.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new SupplierAddress
                {
                    SupplierId = suppliers.Count > 1 ? suppliers[1].Id : suppliers[0].Id,
                    Label = "Distribution Center",
                    Line1 = "45 Docklands Way",
                    City = "London",
                    State = "Greater London",
                    PostalCode = "E16 1AA",
                    Country = "UK",
                    IsPrimary = true,
                    Notes = "Main logistics hub.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new SupplierAddress
                {
                    SupplierId = suppliers.Count > 2 ? suppliers[2].Id : suppliers[0].Id,
                    Label = "Warehouse",
                    Line1 = "78 Lakeshore Road",
                    City = "Toronto",
                    State = "ON",
                    PostalCode = "M5J 2N1",
                    Country = "Canada",
                    IsPrimary = true,
                    Notes = "Secondary fulfillment site.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.SupplierAddresses.AddRange(addresses);
        }

        private async Task SeedSupplierDocumentsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierDocuments.IgnoreQueryFilters().AnyAsync(d => d.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow.Date;
            var documents = new[]
            {
                new SupplierDocument
                {
                    SupplierId = suppliers[0].Id,
                    DocumentType = "Contract",
                    Title = "Master Supply Agreement",
                    FileName = "msa-acme.pdf",
                    StoragePath = "scm/docs/msa-acme.pdf",
                    IssuedOn = now.AddMonths(-6),
                    ExpiresOn = now.AddYears(1),
                    Status = "Active",
                    Notes = "Signed contract on file.",
                    TenantId = tenantId,
                    CreatedAtUtc = DateTime.UtcNow
                },
                new SupplierDocument
                {
                    SupplierId = suppliers.Count > 1 ? suppliers[1].Id : suppliers[0].Id,
                    DocumentType = "Insurance",
                    Title = "Liability Insurance Certificate",
                    FileName = "insurance-globalsupplies.pdf",
                    StoragePath = "scm/docs/insurance-globalsupplies.pdf",
                    IssuedOn = now.AddMonths(-3),
                    ExpiresOn = now.AddMonths(9),
                    Status = "Active",
                    Notes = "Coverage verified.",
                    TenantId = tenantId,
                    CreatedAtUtc = DateTime.UtcNow
                },
                new SupplierDocument
                {
                    SupplierId = suppliers.Count > 2 ? suppliers[2].Id : suppliers[0].Id,
                    DocumentType = "Certification",
                    Title = "ISO 9001 Certificate",
                    FileName = "iso9001-pacifictraders.pdf",
                    StoragePath = "scm/docs/iso9001-pacifictraders.pdf",
                    IssuedOn = now.AddYears(-1),
                    ExpiresOn = now.AddYears(2),
                    Status = "Active",
                    Notes = "Uploaded for audit.",
                    TenantId = tenantId,
                    CreatedAtUtc = DateTime.UtcNow
                }
            };

            _dbContext.SupplierDocuments.AddRange(documents);
        }

        private async Task SeedSupplierIssuesAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierIssues.IgnoreQueryFilters().AnyAsync(i => i.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var issues = new[]
            {
                new SupplierIssue
                {
                    SupplierId = suppliers[0].Id,
                    Title = "Late shipment incidents",
                    Description = "Two late deliveries reported in the last 30 days.",
                    Severity = "High",
                    Status = "Open",
                    OpenedOn = now.AddDays(-12),
                    Owner = "Supply Chain Team",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new SupplierIssue
                {
                    SupplierId = suppliers.Count > 1 ? suppliers[1].Id : suppliers[0].Id,
                    Title = "Quality deviation - packaging",
                    Description = "Packaging quality below spec for recent batch.",
                    Severity = "Medium",
                    Status = "Investigating",
                    OpenedOn = now.AddDays(-6),
                    Owner = "Quality Manager",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new SupplierIssue
                {
                    SupplierId = suppliers.Count > 2 ? suppliers[2].Id : suppliers[0].Id,
                    Title = "Compliance audit overdue",
                    Description = "Annual compliance audit not completed.",
                    Severity = "Low",
                    Status = "Open",
                    OpenedOn = now.AddDays(-30),
                    Owner = "Compliance Lead",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.SupplierIssues.AddRange(issues);
        }

        private async Task SeedSupplierKpisAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierKpis.IgnoreQueryFilters().AnyAsync(k => k.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var periodStart = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1).AddMonths(-1);
            var periodEnd = periodStart.AddMonths(1).AddDays(-1);
            var now = DateTime.UtcNow;

            var kpis = suppliers.Take(3).Select((supplier, index) => new SupplierKpi
            {
                SupplierId = supplier.Id,
                PeriodStart = periodStart,
                PeriodEnd = periodEnd,
                OnTimeDeliveryRate = 92 + index,
                DefectRate = 1.8m - (index * 0.2m),
                FillRate = 95 + index,
                CostVariance = 1.2m - (index * 0.1m),
                LeadTimeDays = 7 + index,
                ResponsivenessScore = 88 + index,
                Notes = "Monthly KPI snapshot.",
                TenantId = tenantId,
                CreatedAtUtc = now
            }).ToList();

            _dbContext.SupplierKpis.AddRange(kpis);
        }

        private async Task SeedPurchaseOrdersAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.PurchaseOrders.IgnoreQueryFilters().AnyAsync(p => p.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            var items = await _dbContext.ItemMasters
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0 || items.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var po = new PurchaseOrder
            {
                OrderNumber = $"PO-{now:yyyyMMdd}-001",
                SupplierId = suppliers[0].Id,
                OrderDate = now.Date,
                ExpectedDeliveryDate = now.Date.AddDays(14),
                Status = "Approved",
                Currency = "USD",
                Notes = "Initial purchase order.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            var lineItems = items.Take(3).Select((item, index) => new PurchaseOrderLine
            {
                ItemMasterId = item.Id,
                Description = item.Name,
                Uom = item.DefaultUom ?? "Each",
                Quantity = 10 + (index * 5),
                UnitPrice = 45 + (index * 5),
                LineTotal = (10 + (index * 5)) * (45 + (index * 5))
            }).ToList();

            po.TotalAmount = lineItems.Sum(l => l.LineTotal);
            foreach (var line in lineItems)
            {
                po.Lines.Add(line);
            }

            _dbContext.PurchaseOrders.Add(po);
        }

        private async Task SeedPurchaseOrderApprovalsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.PurchaseOrderApprovals.IgnoreQueryFilters().AnyAsync(a => a.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var purchaseOrders = await _dbContext.PurchaseOrders
                .IgnoreQueryFilters()
                .Where(p => p.TenantId == tenantId && !p.IsDeleted)
                .OrderBy(p => p.OrderNumber)
                .ToListAsync(cancellationToken);

            if (purchaseOrders.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var approvals = new[]
            {
                new PurchaseOrderApproval
                {
                    PurchaseOrderId = purchaseOrders[0].Id,
                    ApproverRole = "Procurement Manager",
                    Status = "Approved",
                    RequestedOn = now.AddDays(-2),
                    DecisionOn = now.AddDays(-1),
                    Notes = "Approved within budget.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.PurchaseOrderApprovals.AddRange(approvals);
        }

        private async Task SeedPurchaseOrderChangesAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.PurchaseOrderChanges.IgnoreQueryFilters().AnyAsync(c => c.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var purchaseOrders = await _dbContext.PurchaseOrders
                .IgnoreQueryFilters()
                .Where(p => p.TenantId == tenantId && !p.IsDeleted)
                .OrderBy(p => p.OrderNumber)
                .ToListAsync(cancellationToken);

            if (purchaseOrders.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var po = purchaseOrders[0];

            var change = new PurchaseOrderChange
            {
                PurchaseOrderId = po.Id,
                ChangeType = "Quantity Update",
                Reason = "Increase order quantity due to demand spike.",
                PreviousTotal = po.TotalAmount,
                NewTotal = po.TotalAmount + 250m,
                Status = "Approved",
                RequestedOn = now.AddDays(-1),
                ApprovedOn = now,
                ApprovedBy = "Procurement Manager",
                Notes = "Approved with updated total.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            _dbContext.PurchaseOrderChanges.Add(change);
        }

        private async Task SeedCarriersAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.Carriers.IgnoreQueryFilters().AnyAsync(c => c.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var now = DateTime.UtcNow;
            var carriers = new[]
            {
                new Carrier
                {
                    Name = "NorthEdge Logistics",
                    Code = "NEL",
                    Status = "Active",
                    ContactName = "Logan Avery",
                    ContactEmail = "logan.avery@northedge-logistics.demo",
                    ContactPhone = "+1 (555) 220-1188",
                    Website = "https://northedge-logistics.demo",
                    Notes = "Primary regional carrier.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new Carrier
                {
                    Name = "BlueWave Freight",
                    Code = "BWF",
                    Status = "Active",
                    ContactName = "Maya Singh",
                    ContactEmail = "maya.singh@bluewave-freight.demo",
                    ContactPhone = "+1 (555) 220-2299",
                    Website = "https://bluewave-freight.demo",
                    Notes = "International freight partner.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.Carriers.AddRange(carriers);
        }

        private async Task SeedShipmentsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.Shipments.IgnoreQueryFilters().AnyAsync(s => s.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var carrier = await _dbContext.Carriers
                .IgnoreQueryFilters()
                .Where(c => c.TenantId == tenantId && !c.IsDeleted)
                .OrderBy(c => c.Name)
                .FirstOrDefaultAsync(cancellationToken);

            var purchaseOrder = await _dbContext.PurchaseOrders
                .IgnoreQueryFilters()
                .Include(p => p.Lines)
                .Where(p => p.TenantId == tenantId && !p.IsDeleted)
                .OrderBy(p => p.OrderNumber)
                .FirstOrDefaultAsync(cancellationToken);

            if (carrier is null || purchaseOrder is null)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var shipment = new Shipment
            {
                ShipmentNumber = $"SHP-{now:yyyyMMdd}-001",
                Status = "In Transit",
                CarrierId = carrier.Id,
                PurchaseOrderId = purchaseOrder.Id,
                ShippedDate = now.Date.AddDays(-1),
                ExpectedDeliveryDate = now.Date.AddDays(3),
                TrackingNumber = $"TRK-{now:MMddHHmm}-A1",
                Mode = "Ground",
                Origin = "Dallas, TX",
                Destination = "Seattle, WA",
                Notes = "First shipment against PO.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            var lineNumber = 1;
            foreach (var line in purchaseOrder.Lines)
            {
                shipment.Lines.Add(new ShipmentLine
                {
                    LineNumber = lineNumber++,
                    ItemMasterId = line.ItemMasterId,
                    Description = line.Description,
                    Uom = line.Uom,
                    Quantity = line.Quantity,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                });
            }

            _dbContext.Shipments.Add(shipment);
        }

        private async Task SeedGoodsReceiptsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.GoodsReceipts.IgnoreQueryFilters().AnyAsync(r => r.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var shipment = await _dbContext.Shipments
                .IgnoreQueryFilters()
                .Include(s => s.Lines)
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.ShipmentNumber)
                .FirstOrDefaultAsync(cancellationToken);

            if (shipment is null)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var receipt = new GoodsReceipt
            {
                ReceiptNumber = $"GRN-{now:yyyyMMdd}-001",
                Status = "Received",
                PurchaseOrderId = shipment.PurchaseOrderId,
                ShipmentId = shipment.Id,
                ReceivedDate = now.Date,
                ReceivedBy = "Warehouse Team",
                Notes = "Received in full.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            var lineNumber = 1;
            foreach (var line in shipment.Lines)
            {
                receipt.Lines.Add(new GoodsReceiptLine
                {
                    LineNumber = lineNumber++,
                    ItemMasterId = line.ItemMasterId,
                    Description = line.Description,
                    Uom = line.Uom,
                    QuantityReceived = line.Quantity,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                });
            }

            _dbContext.GoodsReceipts.Add(receipt);
        }

        private async Task SeedWarehousesAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.Warehouses.IgnoreQueryFilters().AnyAsync(w => w.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var now = DateTime.UtcNow;
            var warehouses = new[]
            {
                new Warehouse
                {
                    Name = "Dallas Distribution Center",
                    Code = "DAL-01",
                    Status = "Active",
                    AddressLine1 = "1200 Logistics Parkway",
                    City = "Dallas",
                    State = "TX",
                    PostalCode = "75201",
                    Country = "USA",
                    ContactName = "Aiden Brooks",
                    ContactEmail = "aiden.brooks@warehouse.demo",
                    ContactPhone = "+1 (555) 220-3301",
                    Notes = "Primary US distribution hub.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                },
                new Warehouse
                {
                    Name = "Seattle Regional Warehouse",
                    Code = "SEA-02",
                    Status = "Active",
                    AddressLine1 = "500 Harbor Way",
                    City = "Seattle",
                    State = "WA",
                    PostalCode = "98101",
                    Country = "USA",
                    ContactName = "Harper Lin",
                    ContactEmail = "harper.lin@warehouse.demo",
                    ContactPhone = "+1 (555) 220-3302",
                    Notes = "Supports West Coast deliveries.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                }
            };

            _dbContext.Warehouses.AddRange(warehouses);
        }

        private async Task SeedInventoryItemsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.InventoryItems.IgnoreQueryFilters().AnyAsync(i => i.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var warehouses = await _dbContext.Warehouses
                .IgnoreQueryFilters()
                .Where(w => w.TenantId == tenantId && !w.IsDeleted)
                .OrderBy(w => w.Name)
                .ToListAsync(cancellationToken);

            var items = await _dbContext.ItemMasters
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.Name)
                .ToListAsync(cancellationToken);

            if (warehouses.Count == 0 || items.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var inventory = new List<InventoryItem>();

            foreach (var warehouse in warehouses)
            {
                foreach (var item in items.Take(4))
                {
                    var onHand = 120 + (warehouse.Name.GetHashCode() + item.Name.GetHashCode()) % 40;
                    if (onHand < 0)
                    {
                        onHand *= -1;
                    }

                    var reserved = Math.Max(5, onHand * 0.1m);
                    inventory.Add(new InventoryItem
                    {
                        WarehouseId = warehouse.Id,
                        ItemMasterId = item.Id,
                        OnHandQty = onHand,
                        ReservedQty = reserved,
                        AvailableQty = onHand - reserved,
                        ReorderPoint = 30,
                        SafetyStock = 15,
                        LeadTimeDays = 7,
                        LastCountedAt = now.Date.AddDays(-7),
                        TenantId = tenantId,
                        CreatedAtUtc = now
                    });
                }
            }

            _dbContext.InventoryItems.AddRange(inventory);
        }

        private async Task SeedReorderRulesAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.ReorderRules.IgnoreQueryFilters().AnyAsync(r => r.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var warehouses = await _dbContext.Warehouses
                .IgnoreQueryFilters()
                .Where(w => w.TenantId == tenantId && !w.IsDeleted)
                .OrderBy(w => w.Name)
                .ToListAsync(cancellationToken);

            var items = await _dbContext.ItemMasters
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.Name)
                .ToListAsync(cancellationToken);

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (warehouses.Count == 0 || items.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var rules = new List<ReorderRule>();
            var supplierId = suppliers.FirstOrDefault()?.Id;

            foreach (var warehouse in warehouses)
            {
                foreach (var item in items.Take(3))
                {
                    rules.Add(new ReorderRule
                    {
                        ItemMasterId = item.Id,
                        WarehouseId = warehouse.Id,
                        SupplierId = supplierId,
                        ReorderPoint = 25,
                        TargetStock = 120,
                        SafetyStock = 15,
                        LeadTimeDays = 7,
                        IsActive = true,
                        Notes = "Default replenishment rule.",
                        TenantId = tenantId,
                        CreatedAtUtc = now
                    });
                }
            }

            _dbContext.ReorderRules.AddRange(rules);
        }

        private async Task SeedInspectionsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.Inspections.IgnoreQueryFilters().AnyAsync(i => i.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var supplier = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .FirstOrDefaultAsync(cancellationToken);

            var item = await _dbContext.ItemMasters
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.Name)
                .FirstOrDefaultAsync(cancellationToken);

            var purchaseOrder = await _dbContext.PurchaseOrders
                .IgnoreQueryFilters()
                .Where(p => p.TenantId == tenantId && !p.IsDeleted)
                .OrderBy(p => p.OrderNumber)
                .FirstOrDefaultAsync(cancellationToken);

            var receipt = await _dbContext.GoodsReceipts
                .IgnoreQueryFilters()
                .Where(r => r.TenantId == tenantId && !r.IsDeleted)
                .OrderBy(r => r.ReceiptNumber)
                .FirstOrDefaultAsync(cancellationToken);

            if (item is null)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var inspection = new Inspection
            {
                InspectionNumber = $"INSP-{now:yyyyMMdd}-001",
                Status = "Completed",
                InspectionDate = now.Date,
                InspectorName = "Jordan Patel",
                SupplierId = supplier?.Id,
                ItemMasterId = item.Id,
                PurchaseOrderId = purchaseOrder?.Id,
                GoodsReceiptId = receipt?.Id,
                Result = "Pass",
                Notes = "Incoming inspection completed with no issues.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            _dbContext.Inspections.Add(inspection);
        }

        private async Task SeedNonConformancesAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.NonConformances.IgnoreQueryFilters().AnyAsync(n => n.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var inspection = await _dbContext.Inspections
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.InspectionNumber)
                .FirstOrDefaultAsync(cancellationToken);

            var supplier = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .FirstOrDefaultAsync(cancellationToken);

            var item = await _dbContext.ItemMasters
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.Name)
                .FirstOrDefaultAsync(cancellationToken);

            if (item is null)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var nonConformance = new NonConformance
            {
                ReferenceNumber = $"NC-{now:yyyyMMdd}-001",
                Status = "Open",
                Severity = "High",
                ReportedDate = now.Date,
                ReportedBy = "Quality Team",
                SupplierId = supplier?.Id,
                ItemMasterId = item.Id,
                InspectionId = inspection?.Id,
                PurchaseOrderId = inspection?.PurchaseOrderId,
                GoodsReceiptId = inspection?.GoodsReceiptId,
                Description = "Surface defects detected on incoming batch.",
                Disposition = "Hold for review",
                DueDate = now.Date.AddDays(7),
                Notes = "Escalated to supplier for corrective action.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            _dbContext.NonConformances.Add(nonConformance);
        }

        private async Task SeedCorrectiveActionsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.CorrectiveActions.IgnoreQueryFilters().AnyAsync(c => c.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var nonConformance = await _dbContext.NonConformances
                .IgnoreQueryFilters()
                .Where(n => n.TenantId == tenantId && !n.IsDeleted)
                .OrderBy(n => n.ReferenceNumber)
                .FirstOrDefaultAsync(cancellationToken);

            if (nonConformance is null)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var action = new CorrectiveAction
            {
                ActionNumber = $"CA-{now:yyyyMMdd}-001",
                Status = "In Progress",
                ActionType = "Supplier Corrective Action",
                Owner = "Quality Manager",
                NonConformanceId = nonConformance.Id,
                SupplierId = nonConformance.SupplierId,
                OpenedDate = now.Date,
                DueDate = now.Date.AddDays(10),
                RootCause = "Packaging damage during transit.",
                ActionPlan = "Update packaging spec and retrain supplier.",
                VerificationNotes = "Follow-up inspection scheduled.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            _dbContext.CorrectiveActions.Add(action);
        }

        private async Task SeedSpendAnalyticsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SpendAnalyticsSnapshots.IgnoreQueryFilters().AnyAsync(s => s.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var periodStart = new DateTime(now.Year, now.Month, 1).AddMonths(-1);
            var periodEnd = periodStart.AddMonths(1).AddDays(-1);

            var snapshots = suppliers.Take(3).Select((supplier, index) => new SpendAnalyticsSnapshot
            {
                PeriodStart = periodStart,
                PeriodEnd = periodEnd,
                SupplierId = supplier.Id,
                Category = index == 0 ? "Raw Materials" : index == 1 ? "Packaging" : "Components",
                Currency = "USD",
                TotalSpend = 85000 + (index * 12000),
                Savings = 4200 + (index * 800),
                PurchaseOrderCount = 6 + index,
                AvgLeadTimeDays = 6 + index,
                Notes = "Monthly spend snapshot.",
                TenantId = tenantId,
                CreatedAtUtc = now
            }).ToList();

            _dbContext.SpendAnalyticsSnapshots.AddRange(snapshots);
        }

        private async Task SeedSupplierPerformanceAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierPerformanceSnapshots.IgnoreQueryFilters().AnyAsync(s => s.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var periodStart = new DateTime(now.Year, now.Month, 1).AddMonths(-1);
            var periodEnd = periodStart.AddMonths(1).AddDays(-1);

            var snapshots = suppliers.Take(3).Select((supplier, index) =>
            {
                var onTime = 92 + index;
                var defect = 1.2m + (index * 0.4m);
                var fill = 95 - index;
                var costVar = 1.5m - (index * 0.2m);
                var responsiveness = 88 + (index * 2);
                var overall = Math.Round((onTime + fill + responsiveness) / 3m, 2);

                return new SupplierPerformanceSnapshot
                {
                    SupplierId = supplier.Id,
                    PeriodStart = periodStart,
                    PeriodEnd = periodEnd,
                    OnTimeDeliveryRate = onTime,
                    DefectRate = defect,
                    FillRate = fill,
                    CostVariance = costVar,
                    ResponsivenessScore = responsiveness,
                    OverallScore = overall,
                    Notes = "Monthly supplier performance snapshot.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                };
            }).ToList();

            _dbContext.SupplierPerformanceSnapshots.AddRange(snapshots);
        }

        private async Task SeedSavingsTrackingAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SavingsTrackingSnapshots.IgnoreQueryFilters().AnyAsync(s => s.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var suppliers = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .ToListAsync(cancellationToken);

            if (suppliers.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var periodStart = new DateTime(now.Year, now.Month, 1).AddMonths(-1);
            var periodEnd = periodStart.AddMonths(1).AddDays(-1);

            var snapshots = suppliers.Take(3).Select((supplier, index) =>
            {
                var baseline = 98000 + (index * 9000);
                var actual = baseline - (4200 + (index * 600));
                var savings = baseline - actual;
                var rate = Math.Round((savings / baseline) * 100m, 2);

                return new SavingsTrackingSnapshot
                {
                    PeriodStart = periodStart,
                    PeriodEnd = periodEnd,
                    SupplierId = supplier.Id,
                    Category = index == 0 ? "Raw Materials" : index == 1 ? "Packaging" : "Components",
                    Currency = "USD",
                    BaselineSpend = baseline,
                    ActualSpend = actual,
                    SavingsAmount = savings,
                    SavingsRate = rate,
                    Initiative = "Supplier renegotiation",
                    Notes = "Monthly savings snapshot.",
                    TenantId = tenantId,
                    CreatedAtUtc = now
                };
            }).ToList();

            _dbContext.SavingsTrackingSnapshots.AddRange(snapshots);
        }

        private async Task SeedRfqsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.Rfqs.IgnoreQueryFilters().AnyAsync(r => r.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var items = await _dbContext.ItemMasters
                .IgnoreQueryFilters()
                .Where(i => i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.Name)
                .ToListAsync(cancellationToken);

            if (items.Count == 0)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var rfq = new Rfq
            {
                RfqNumber = $"RFQ-{now:yyyyMMdd}-001",
                Title = "Electronics Components - Q1",
                Status = "Published",
                IssueDate = now.Date.AddDays(-5),
                CloseDate = now.Date.AddDays(7),
                Type = "Standard",
                Currency = "USD",
                Description = "Quarterly sourcing for core components.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            var lineNumber = 1;
            foreach (var item in items.Take(3))
            {
                rfq.Lines.Add(new RfqLine
                {
                    LineNumber = lineNumber++,
                    ItemMasterId = item.Id,
                    Description = item.Name,
                    Uom = item.DefaultUom ?? "Each",
                    Quantity = 100 + (lineNumber * 10),
                    TargetPrice = 45 + (lineNumber * 2),
                    TenantId = tenantId,
                    CreatedAtUtc = now
                });
            }

            _dbContext.Rfqs.Add(rfq);
        }

        private async Task SeedSupplierQuotesAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.SupplierQuotes.IgnoreQueryFilters().AnyAsync(q => q.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var rfq = await _dbContext.Rfqs
                .IgnoreQueryFilters()
                .Include(r => r.Lines)
                .Where(r => r.TenantId == tenantId && !r.IsDeleted)
                .OrderBy(r => r.RfqNumber)
                .FirstOrDefaultAsync(cancellationToken);

            var supplier = await _dbContext.Suppliers
                .IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId && !s.IsDeleted)
                .OrderBy(s => s.Name)
                .FirstOrDefaultAsync(cancellationToken);

            if (rfq is null || supplier is null)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var quote = new SupplierQuote
            {
                RfqId = rfq.Id,
                SupplierId = supplier.Id,
                QuoteNumber = $"Q-{now:yyyyMMdd}-001",
                Status = "Submitted",
                SubmittedDate = now.Date.AddDays(-1),
                Currency = rfq.Currency ?? "USD",
                Notes = "Competitive pricing based on volume.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            var lineNumber = 1;
            foreach (var line in rfq.Lines)
            {
                var unitPrice = (line.TargetPrice ?? 40) - 2;
                var lineTotal = unitPrice * line.Quantity;
                quote.Lines.Add(new SupplierQuoteLine
                {
                    LineNumber = lineNumber++,
                    RfqLineId = line.Id,
                    ItemMasterId = line.ItemMasterId,
                    Description = line.Description,
                    Uom = line.Uom,
                    Quantity = line.Quantity,
                    UnitPrice = unitPrice,
                    LineTotal = lineTotal,
                    TenantId = tenantId,
                    CreatedAtUtc = now
                });
            }

            quote.TotalAmount = quote.Lines.Sum(l => l.LineTotal);
            _dbContext.SupplierQuotes.Add(quote);
        }

        private async Task SeedRfqAwardsAsync(Guid tenantId, CancellationToken cancellationToken)
        {
            if (await _dbContext.RfqAwards.IgnoreQueryFilters().AnyAsync(a => a.TenantId == tenantId, cancellationToken))
            {
                return;
            }

            var quote = await _dbContext.SupplierQuotes
                .IgnoreQueryFilters()
                .Where(q => q.TenantId == tenantId && !q.IsDeleted)
                .OrderBy(q => q.QuoteNumber)
                .FirstOrDefaultAsync(cancellationToken);

            if (quote is null)
            {
                return;
            }

            var now = DateTime.UtcNow;
            var award = new RfqAward
            {
                RfqId = quote.RfqId,
                SupplierId = quote.SupplierId,
                AwardNumber = $"AWD-{now:yyyyMMdd}-001",
                AwardDate = now.Date,
                Status = "Awarded",
                AwardAmount = quote.TotalAmount ?? 0,
                Currency = quote.Currency ?? "USD",
                Notes = "Awarded based on best overall value.",
                TenantId = tenantId,
                CreatedAtUtc = now
            };

            _dbContext.RfqAwards.Add(award);
        }
    private readonly CrmDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly ITenantProvider _tenantProvider;
    private readonly IConfiguration _configuration;

    public DatabaseInitializer(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        ITenantProvider tenantProvider,
        IConfiguration configuration)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _tenantProvider = tenantProvider;
        _configuration = configuration;
    }

    private readonly (string Name, string Email, string TimeZone, string Locale, string[] Roles, string Password)[] _seedUsers =
    {
        ("Super Admin", "super.admin@crmenterprise.demo", "UTC", "en-US", new[] { Permissions.RoleNames.SuperAdmin }, "ChangeThisSuper!1"),
        ("Yasser Ahamed", "yasser.ahamed@live.com", "UTC", "en-US", new[] { "Admin" }, "ChangeThisAdmin!1"),
        ("Jordan Patel", "jordan.patel@crmenterprise.demo", "America/New_York", "en-US", new[] { "Sales Manager" }, "ChangeThisSales!1"),
        ("Ava Chen", "ava.chen@crmenterprise.demo", "America/Los_Angeles", "en-US", new[] { "Sales Rep" }, "ChangeThisRep!1"),
        ("Leo Martins", "leo.martins@crmenterprise.demo", "Europe/London", "en-GB", new[] { "Marketing Ops" }, "ChangeThisMops!1"),
        ("Priya Nair", "priya.nair@crmenterprise.demo", "Asia/Kolkata", "en-IN", new[] { "Customer Success" }, "ChangeThisCsm!1"),
        ("Nina Okafor", "nina.okafor@crmenterprise.demo", "America/Chicago", "en-US", new[] { "Support" }, "ChangeThisSup!1" )
    };

    private readonly (string Name, string Description, string[] Permissions)[] _roleDefinitions =
    {
        (Permissions.RoleNames.SuperAdmin, "Platform super administrator", Permissions.AllKeys.ToArray()),
        (
            Permissions.RoleNames.Admin,
            "System administrator",
            Permissions.WorkspaceAdminKeys.Concat(new[] { Permissions.Policies.AuditView }).Distinct().ToArray()
        ),
        (
            Permissions.RoleNames.SalesManager,
            "Manages team pipeline and forecasts",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.LeadsView,
                Permissions.Policies.LeadsManage,
                Permissions.Policies.OpportunitiesView,
                Permissions.Policies.OpportunitiesManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.SalesRep,
            "Owns assigned accounts and opportunities",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.LeadsView,
                Permissions.Policies.LeadsManage,
                Permissions.Policies.OpportunitiesView,
                Permissions.Policies.OpportunitiesManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.MarketingOps,
            "Runs campaigns and lead intake",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.LeadsView,
                Permissions.Policies.LeadsManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.CustomerSuccess,
            "Manages onboarding and renewals",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.Support,
            "Handles escalations and tickets",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        )
    };

    private static readonly HashSet<string> PermissionCatalog = new(Permissions.AllKeys, StringComparer.OrdinalIgnoreCase);

    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        await _dbContext.Database.MigrateAsync(cancellationToken);

        await SeedPermissionCatalogAsync(cancellationToken);

        var defaultTenant = await EnsureDefaultTenantAsync(cancellationToken);
        var seedTenants = await EnsureSeedTenantsAsync(defaultTenant.Key, cancellationToken);

        await BackfillTenantIdsAsync(defaultTenant.Id, cancellationToken);
        await SeedTenantDataAsync(defaultTenant, cancellationToken);
        await SeedAuditEventsAsync(defaultTenant.Id, cancellationToken);
        
        // All sample data seeding disabled
        // await SeedSampleSuppliersAsync(defaultTenant.Id, cancellationToken);
        // await SeedItemMasterAsync(defaultTenant.Id, cancellationToken);
        // await SeedPriceListsAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierComplianceAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierScorecardsAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierContactsAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierAddressesAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierDocumentsAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierIssuesAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierKpisAsync(defaultTenant.Id, cancellationToken);
        // await SeedPurchaseOrdersAsync(defaultTenant.Id, cancellationToken);
        // await SeedPurchaseOrderApprovalsAsync(defaultTenant.Id, cancellationToken);
        // await SeedPurchaseOrderChangesAsync(defaultTenant.Id, cancellationToken);
        // await SeedCarriersAsync(defaultTenant.Id, cancellationToken);
        // await SeedShipmentsAsync(defaultTenant.Id, cancellationToken);
        // await SeedGoodsReceiptsAsync(defaultTenant.Id, cancellationToken);
        // await SeedWarehousesAsync(defaultTenant.Id, cancellationToken);
        // await SeedInventoryItemsAsync(defaultTenant.Id, cancellationToken);
        // await SeedReorderRulesAsync(defaultTenant.Id, cancellationToken);
        // await SeedInspectionsAsync(defaultTenant.Id, cancellationToken);
        // await SeedNonConformancesAsync(defaultTenant.Id, cancellationToken);
        // await SeedCorrectiveActionsAsync(defaultTenant.Id, cancellationToken);
        // await SeedSpendAnalyticsAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierPerformanceAsync(defaultTenant.Id, cancellationToken);
        // await SeedSavingsTrackingAsync(defaultTenant.Id, cancellationToken);
        // await SeedRfqsAsync(defaultTenant.Id, cancellationToken);
        // await SeedSupplierQuotesAsync(defaultTenant.Id, cancellationToken);
        // await SeedRfqAwardsAsync(defaultTenant.Id, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        foreach (var tenant in seedTenants)
        {
            await SeedTenantDataAsync(tenant, cancellationToken);
            // All sample data seeding disabled for seed tenants
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task SeedRolesAsync(CancellationToken cancellationToken)
    {
        foreach (var (name, description, permissions) in _roleDefinitions)
        {
            var role = await EnsureRoleAsync(name, description, cancellationToken);
            await SyncRolePermissionsAsync(role, permissions, cancellationToken);
        }
    }

    private async Task SeedPermissionCatalogAsync(CancellationToken cancellationToken)
    {
        var existingKeys = await _dbContext.PermissionCatalogEntries
            .Select(entry => entry.Key)
            .ToListAsync(cancellationToken);

        var existingKeySet = new HashSet<string>(existingKeys, StringComparer.OrdinalIgnoreCase);
        var entriesToAdd = Permissions.Definitions
            .Where(definition => !existingKeySet.Contains(definition.Key))
            .Select(definition => new PermissionCatalogEntry
            {
                Id = Guid.NewGuid(),
                Key = definition.Key,
                Label = definition.Label,
                Description = definition.Description
            })
            .ToList();

        if (entriesToAdd.Count == 0)
        {
            return;
        }

        _dbContext.PermissionCatalogEntries.AddRange(entriesToAdd);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task SeedUsersAsync(CancellationToken cancellationToken)
    {
        foreach (var (name, email, tz, locale, roles, password) in _seedUsers)
        {
            await EnsureDemoUserAsync(name, email, tz, locale, roles, password, cancellationToken);
        }
    }

    private async Task SeedLeadStatusesAsync(CancellationToken cancellationToken)
    {
        var existingNames = await _dbContext.LeadStatuses
            .Select(s => s.Name)
            .ToListAsync(cancellationToken);

        var now = DateTime.UtcNow;
        var statuses = new[]
        {
            new LeadStatus { Name = "New", Order = 1, IsDefault = true, IsClosed = false, CreatedAtUtc = now },
            new LeadStatus { Name = "Contacted", Order = 2, IsClosed = false, CreatedAtUtc = now },
            new LeadStatus { Name = "Qualified", Order = 3, IsClosed = false, CreatedAtUtc = now },
            new LeadStatus { Name = "Converted", Order = 4, IsClosed = true, CreatedAtUtc = now },
            new LeadStatus { Name = "Lost", Order = 5, IsClosed = true, CreatedAtUtc = now }
        };

        foreach (var status in statuses)
        {
            if (!existingNames.Contains(status.Name))
            {
                _dbContext.LeadStatuses.Add(status);
            }
        }
    }

    private async Task SeedLeadAssignmentRulesAsync(CancellationToken cancellationToken)
    {
        if (await _dbContext.LeadAssignmentRules.AnyAsync(cancellationToken))
        {
            return;
        }

        _dbContext.LeadAssignmentRules.Add(new LeadAssignmentRule
        {
            Name = "Default Round Robin",
            Type = "RoundRobin",
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow
        });
    }

    private async Task SeedOpportunityStagesAsync(CancellationToken cancellationToken)
    {
        if (await _dbContext.OpportunityStages.AnyAsync(cancellationToken))
        {
            return;
        }

        var now = DateTime.UtcNow;
        var stages = new[]
        {
            new OpportunityStage { Name = "Prospecting", Order = 1, IsClosedStage = false, ForecastCategory = "Pipeline", CreatedAtUtc = now },
            new OpportunityStage { Name = "Qualification", Order = 2, IsClosedStage = false, ForecastCategory = "Pipeline", CreatedAtUtc = now },
            new OpportunityStage { Name = "Proposal", Order = 3, IsClosedStage = false, ForecastCategory = "Best Case", CreatedAtUtc = now },
            new OpportunityStage { Name = "Negotiation", Order = 4, IsClosedStage = false, ForecastCategory = "Commit", CreatedAtUtc = now },
            new OpportunityStage { Name = "Closed Won", Order = 5, IsClosedStage = true, ForecastCategory = "Closed", CreatedAtUtc = now },
            new OpportunityStage { Name = "Closed Lost", Order = 6, IsClosedStage = true, ForecastCategory = "Omitted", CreatedAtUtc = now }
        };

        _dbContext.OpportunityStages.AddRange(stages);
    }

    private async Task SeedSampleDataAsync(CancellationToken cancellationToken)
    {
        if (await _dbContext.Accounts.AnyAsync(cancellationToken))
        {
            return;
        }

        var ownerEmails = new[] { "jordan.patel@crmenterprise.demo", "yasser.ahamed@live.com" };
        var owner = await _dbContext.Users.FirstOrDefaultAsync(u => ownerEmails.Contains(u.Email), cancellationToken)
            ?? await _dbContext.Users.FirstOrDefaultAsync(cancellationToken);

        if (owner is null)
        {
            return;
        }

        var now = DateTime.UtcNow;

        var cedar = new Account
        {
            Name = "Cedar Analytics",
            AccountNumber = "C-1001",
            Phone = "+1 555-0101",
            LifecycleStage = "Customer",
            Industry = "Analytics",
            OwnerId = owner.Id,
            Description = "Analytics platform customer",
            CreatedAtUtc = now.AddDays(-30)
        };

        var evergreen = new Account
        {
            Name = "Evergreen Foods",
            AccountNumber = "C-1002",
            Phone = "+1 555-0102",
            LifecycleStage = "Lead",
            Industry = "CPG",
            OwnerId = owner.Id,
            Description = "Food manufacturer lead",
            CreatedAtUtc = now.AddDays(-14)
        };

        var latitude = new Account
        {
            Name = "Latitude Ventures",
            AccountNumber = "C-1003",
            Phone = "+1 555-0103",
            LifecycleStage = "Prospect",
            Industry = "VC",
            OwnerId = owner.Id,
            Description = "Investment firm prospect",
            CreatedAtUtc = now.AddDays(-7)
        };

        _dbContext.Accounts.AddRange(cedar, evergreen, latitude);

        _dbContext.Contacts.AddRange(
            new Contact
            {
                FirstName = "Liam",
                LastName = "Murphy",
                Email = "liam.murphy@cedaranalytics.com",
                Phone = "+1 555-1101",
                Account = cedar,
                OwnerId = owner.Id,
                LifecycleStage = "Customer",
                CreatedAtUtc = now.AddDays(-28)
            },
            new Contact
            {
                FirstName = "Daniel",
                LastName = "Wu",
                Email = "daniel.wu@evergreenfoods.com",
                Phone = "+1 555-1102",
                Account = evergreen,
                OwnerId = owner.Id,
                LifecycleStage = "Lead",
                CreatedAtUtc = now.AddDays(-12)
            },
            new Contact
            {
                FirstName = "Carlos",
                LastName = "Mendes",
                Email = "carlos.mendes@latitude.vc",
                Phone = "+1 555-1103",
                Account = latitude,
                OwnerId = owner.Id,
                LifecycleStage = "Prospect",
                CreatedAtUtc = now.AddDays(-6)
            });

        _dbContext.Activities.AddRange(
            new Activity
            {
                Subject = "Renewal prep",
                Description = "Prep renewal deck for Cedar Analytics",
                Type = ActivityType.Meeting,
                RelatedEntityType = ActivityRelationType.Account,
                RelatedEntityId = cedar.Id,
                OwnerId = owner.Id,
                DueDateUtc = now.AddDays(1),
                Location = "Video call",
                Priority = "High",
                CreatedAtUtc = now
            },
            new Activity
            {
                Subject = "Lead qualification",
                Description = "Qualify Evergreen Foods lead",
                Type = ActivityType.Call,
                RelatedEntityType = ActivityRelationType.Account,
                RelatedEntityId = evergreen.Id,
                OwnerId = owner.Id,
                DueDateUtc = now.AddDays(2),
                Priority = "Normal",
                CreatedAtUtc = now
            },
            new Activity
            {
                Subject = "Send pricing sheet",
                Description = "Share pricing with Latitude Ventures",
                Type = ActivityType.Email,
                RelatedEntityType = ActivityRelationType.Account,
                RelatedEntityId = latitude.Id,
                OwnerId = owner.Id,
                DueDateUtc = now.AddDays(3),
                Priority = "Normal",
                CreatedAtUtc = now
            });
    }

    private async Task<Tenant> EnsureDefaultTenantAsync(CancellationToken cancellationToken)
    {
        var defaultKey = _configuration["Tenant:DefaultKey"] ?? "default";
        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Key == defaultKey, cancellationToken);
        if (tenant is not null)
        {
            return tenant;
        }

        tenant = new Tenant
        {
            Key = defaultKey,
            Name = "Default Workspace",
            TimeZone = "UTC",
            Currency = "USD",
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Tenants.Add(tenant);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return tenant;
    }

    private async Task<IReadOnlyList<Tenant>> EnsureSeedTenantsAsync(string defaultKey, CancellationToken cancellationToken)
    {
        var seedKeys = _configuration.GetSection("Tenant:SeedKeys").Get<string[]>() ?? Array.Empty<string>();
        if (seedKeys.Length == 0)
        {
            return Array.Empty<Tenant>();
        }

        var tenants = new List<Tenant>();
        var added = false;
        foreach (var rawKey in seedKeys)
        {
            var key = rawKey?.Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(key) || string.Equals(key, defaultKey, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            var existing = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Key == key, cancellationToken);
            if (existing is not null)
            {
                tenants.Add(existing);
                continue;
            }

            var name = char.ToUpperInvariant(key[0]) + key[1..] + " Workspace";
            var tenant = new Tenant
            {
                Key = key,
                Name = name,
                TimeZone = "UTC",
                Currency = "USD",
                CreatedAtUtc = DateTime.UtcNow
            };
            _dbContext.Tenants.Add(tenant);
            tenants.Add(tenant);
            added = true;
        }

        if (added)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return tenants;
    }

    private async Task SeedTenantDataAsync(Tenant tenant, CancellationToken cancellationToken)
    {
        var originalTenantId = _tenantProvider.TenantId;
        var originalTenantKey = _tenantProvider.TenantKey;

        try
        {
            _tenantProvider.SetTenant(tenant.Id, tenant.Key);
            await SeedRolesAsync(cancellationToken);
            await SeedUsersAsync(cancellationToken);
            await SeedLeadAssignmentRulesAsync(cancellationToken);
            await SeedOpportunityStagesAsync(cancellationToken);
            // CRM sample data seeding disabled
            // await SeedSampleDataAsync(cancellationToken);
        }
        finally
        {
            _tenantProvider.SetTenant(originalTenantId, originalTenantKey);
        }
    }

    private async Task SeedAuditEventsAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        if (tenantId == Guid.Empty)
        {
            return;
        }

        var existing = await _dbContext.AuditEvents.IgnoreQueryFilters()
            .AnyAsync(a => a.TenantId == tenantId, cancellationToken);

        if (existing)
        {
            return;
        }

        var user = await _dbContext.Users.IgnoreQueryFilters()
            .Where(u => u.TenantId == tenantId && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .FirstOrDefaultAsync(cancellationToken);

        var now = DateTime.UtcNow;
        var entries = new List<AuditEvent>
        {
            new()
            {
                TenantId = tenantId,
                EntityType = "Lead",
                EntityId = Guid.NewGuid(),
                Action = "StatusChanged",
                Field = "Status",
                OldValue = "New",
                NewValue = "Contacted",
                ChangedByUserId = user?.Id,
                ChangedByName = user?.FullName,
                CreatedAtUtc = now.AddMinutes(-45),
                CreatedBy = user?.FullName ?? "system"
            },
            new()
            {
                TenantId = tenantId,
                EntityType = "Opportunity",
                EntityId = Guid.NewGuid(),
                Action = "Updated",
                Field = "Stage",
                OldValue = "Discovery",
                NewValue = "Proposal",
                ChangedByUserId = user?.Id,
                ChangedByName = user?.FullName,
                CreatedAtUtc = now.AddMinutes(-25),
                CreatedBy = user?.FullName ?? "system"
            },
            new()
            {
                TenantId = tenantId,
                EntityType = "Activity",
                EntityId = Guid.NewGuid(),
                Action = "Completed",
                Field = "Status",
                OldValue = "Open",
                NewValue = "Completed",
                ChangedByUserId = user?.Id,
                ChangedByName = user?.FullName,
                CreatedAtUtc = now.AddMinutes(-10),
                CreatedBy = user?.FullName ?? "system"
            }
        };

        _dbContext.AuditEvents.AddRange(entries);
    }

    private async Task BackfillTenantIdsAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        if (tenantId == Guid.Empty)
        {
            return;
        }

        await NormalizeAndDeduplicateUsersAsync(tenantId, cancellationToken);

        await _dbContext.Users.IgnoreQueryFilters()
            .Where(u => u.TenantId == Guid.Empty && !u.IsDeleted)
            .ExecuteUpdateAsync(s => s.SetProperty(u => u.TenantId, tenantId), cancellationToken);

        await _dbContext.Roles.IgnoreQueryFilters()
            .Where(r => r.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(r => r.TenantId, tenantId), cancellationToken);

        await _dbContext.UserRoles.IgnoreQueryFilters()
            .Where(ur => ur.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(ur => ur.TenantId, tenantId), cancellationToken);

        await _dbContext.RolePermissions.IgnoreQueryFilters()
            .Where(rp => rp.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(rp => rp.TenantId, tenantId), cancellationToken);

        await _dbContext.Accounts.IgnoreQueryFilters()
            .Where(a => a.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(a => a.TenantId, tenantId), cancellationToken);

        await _dbContext.Contacts.IgnoreQueryFilters()
            .Where(c => c.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.TenantId, tenantId), cancellationToken);

        await _dbContext.Leads.IgnoreQueryFilters()
            .Where(l => l.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(l => l.TenantId, tenantId), cancellationToken);

        // Merge LeadStatuses that already exist in the target tenant before moving empty-tenant rows.
        await _dbContext.Database.ExecuteSqlInterpolatedAsync(
            $"""
             UPDATE l
             SET l.LeadStatusId = target.Id
             FROM crm.Leads l
             INNER JOIN crm.LeadStatuses emptyStatus
                 ON emptyStatus.Id = l.LeadStatusId
                 AND emptyStatus.TenantId = '00000000-0000-0000-0000-000000000000'
             INNER JOIN crm.LeadStatuses target
                 ON target.TenantId = {tenantId}
                 AND target.Name = emptyStatus.Name;

             UPDATE h
             SET h.LeadStatusId = target.Id
             FROM crm.LeadStatusHistories h
             INNER JOIN crm.LeadStatuses emptyStatus
                 ON emptyStatus.Id = h.LeadStatusId
                 AND emptyStatus.TenantId = '00000000-0000-0000-0000-000000000000'
             INNER JOIN crm.LeadStatuses target
                 ON target.TenantId = {tenantId}
                 AND target.Name = emptyStatus.Name;

             DELETE ls
             FROM crm.LeadStatuses ls
             INNER JOIN crm.LeadStatuses target
                 ON target.TenantId = {tenantId}
                 AND target.Name = ls.Name
             WHERE ls.TenantId = '00000000-0000-0000-0000-000000000000';
             """,
            cancellationToken);

        await _dbContext.LeadStatuses.IgnoreQueryFilters()
            .Where(ls => ls.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(ls => ls.TenantId, tenantId), cancellationToken);

        await _dbContext.LeadStatusHistories.IgnoreQueryFilters()
            .Where(lsh => lsh.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(lsh => lsh.TenantId, tenantId), cancellationToken);

        await _dbContext.LeadAssignmentRules.IgnoreQueryFilters()
            .Where(rule => rule.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(rule => rule.TenantId, tenantId), cancellationToken);

        await _dbContext.Opportunities.IgnoreQueryFilters()
            .Where(o => o.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(o => o.TenantId, tenantId), cancellationToken);

        await _dbContext.OpportunityStages.IgnoreQueryFilters()
            .Where(os => os.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(os => os.TenantId, tenantId), cancellationToken);

        await _dbContext.OpportunityStageHistories.IgnoreQueryFilters()
            .Where(osh => osh.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(osh => osh.TenantId, tenantId), cancellationToken);

        await _dbContext.Activities.IgnoreQueryFilters()
            .Where(a => a.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(a => a.TenantId, tenantId), cancellationToken);

        await _dbContext.CustomFieldDefinitions.IgnoreQueryFilters()
            .Where(cfd => cfd.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(cfd => cfd.TenantId, tenantId), cancellationToken);

        await _dbContext.CustomFieldValues.IgnoreQueryFilters()
            .Where(cfv => cfv.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(cfv => cfv.TenantId, tenantId), cancellationToken);
    }

    private async Task NormalizeAndDeduplicateUsersAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        const string normalizeSql = """
            UPDATE [identity].[Users]
            SET [EmailNormalized] = LOWER(LTRIM(RTRIM([Email])))
            WHERE [TenantId] = '00000000-0000-0000-0000-000000000000'
              AND ([EmailNormalized] IS NULL OR [EmailNormalized] = '')
              AND [Email] IS NOT NULL;
            """;

        var dedupeAgainstTargetSql = $"""
            WITH Collisions AS (
                SELECT [u].[Id]
                FROM [identity].[Users] AS [u]
                WHERE [u].[TenantId] = '00000000-0000-0000-0000-000000000000'
                  AND [u].[IsDeleted] = 0
                  AND [u].[EmailNormalized] IS NOT NULL
                  AND EXISTS (
                      SELECT 1
                      FROM [identity].[Users] AS [t]
                      WHERE [t].[TenantId] = '{tenantId}'
                        AND [t].[IsDeleted] = 0
                        AND [t].[EmailNormalized] = [u].[EmailNormalized]
                  )
            )
            UPDATE [identity].[Users]
            SET [IsDeleted] = 1,
                [IsActive] = 0,
                [UpdatedAtUtc] = SYSUTCDATETIME(),
                [UpdatedBy] = 'system'
            WHERE [Id] IN (SELECT [Id] FROM Collisions);
            """;

        const string dedupeSql = """
            WITH Ranked AS (
                SELECT [Id],
                       ROW_NUMBER() OVER (
                           PARTITION BY [EmailNormalized]
                           ORDER BY [CreatedAtUtc] DESC, [Id] DESC
                       ) AS rn
                FROM [identity].[Users]
                WHERE [TenantId] = '00000000-0000-0000-0000-000000000000'
                  AND [IsDeleted] = 0
                  AND [EmailNormalized] IS NOT NULL
            )
            UPDATE [identity].[Users]
            SET [IsDeleted] = 1,
                [IsActive] = 0,
                [UpdatedAtUtc] = SYSUTCDATETIME(),
                [UpdatedBy] = 'system'
            WHERE [Id] IN (SELECT [Id] FROM Ranked WHERE rn > 1);
            """;

        await _dbContext.Database.ExecuteSqlRawAsync(normalizeSql, cancellationToken);
        await _dbContext.Database.ExecuteSqlRawAsync(dedupeAgainstTargetSql, cancellationToken);
        await _dbContext.Database.ExecuteSqlRawAsync(dedupeSql, cancellationToken);
    }

    private async Task<User> EnsureDemoUserAsync(
        string fullName,
        string email,
        string timeZone,
        string locale,
        IEnumerable<string> roleNames,
        string defaultPassword,
        CancellationToken cancellationToken)
    {
        var normalizedEmail = NormalizeEmail(email);
        var tenantId = _tenantProvider.TenantId;
        var user = await _dbContext.Users
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(u =>
                u.TenantId == tenantId &&
                (u.EmailNormalized == normalizedEmail ||
                 (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)),
                cancellationToken);
        if (user is null)
        {
            user = new User
            {
                FullName = fullName,
                Email = normalizedEmail,
                EmailNormalized = normalizedEmail,
                TimeZone = timeZone,
                Locale = locale,
                IsActive = true
            };
            _dbContext.Users.Add(user);
        }
        else
        {
            user.FullName = fullName;
            user.Email = normalizedEmail;
            user.EmailNormalized = normalizedEmail;
            user.TimeZone = timeZone;
            user.Locale = locale;
            user.IsActive = true;
        }

        if (string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, defaultPassword);
        }

        await SyncRoleAssignmentsAsync(user, roleNames, cancellationToken);
        return user;
    }

    private static string NormalizeEmail(string? email)
    {
        return (email ?? string.Empty).Trim().ToLowerInvariant();
    }

    private async Task SyncRoleAssignmentsAsync(User user, IEnumerable<string> roleNames, CancellationToken cancellationToken)
    {
        var roleSet = roleNames.ToHashSet(StringComparer.OrdinalIgnoreCase);
        if (roleSet.Count == 0)
        {
            return;
        }

        var tenantId = _tenantProvider.TenantId;
        var roleIds = await _dbContext.Roles
            .IgnoreQueryFilters()
            .Where(r => roleSet.Contains(r.Name) && !r.IsDeleted && r.TenantId == tenantId)
            .Select(r => r.Id)
            .ToListAsync(cancellationToken);

        var existing = await _dbContext.UserRoles
            .IgnoreQueryFilters()
            .Where(ur => ur.UserId == user.Id && (ur.TenantId == tenantId || ur.TenantId == Guid.Empty))
            .ToListAsync(cancellationToken);
        foreach (var link in existing.Where(ur => ur.TenantId == Guid.Empty))
        {
            link.TenantId = tenantId;
        }

        var assigned = existing.Select(ur => ur.RoleId).ToHashSet();
        var staleLinks = existing.Where(ur => !roleIds.Contains(ur.RoleId)).ToList();
        if (staleLinks.Count > 0)
        {
            _dbContext.UserRoles.RemoveRange(staleLinks);
        }

        foreach (var roleId in roleIds)
        {
            if (!assigned.Contains(roleId))
            {
                _dbContext.UserRoles.Add(new UserRole
                {
                    UserId = user.Id,
                    RoleId = roleId,
                    CreatedAtUtc = DateTime.UtcNow
                });
            }
        }
    }

    private async Task SyncRolePermissionsAsync(Role role, IEnumerable<string> permissions, CancellationToken cancellationToken)
    {
        var desired = permissions
            .Where(permission => !string.IsNullOrWhiteSpace(permission) && PermissionCatalog.Contains(permission))
            .Select(permission => permission!.Trim())
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        var existing = await _dbContext.RolePermissions
            .IgnoreQueryFilters()
            .Where(rp => rp.RoleId == role.Id)
            .ToListAsync(cancellationToken);
        var tenantId = _tenantProvider.TenantId;
        foreach (var permission in existing.Where(rp => rp.TenantId != tenantId))
        {
            permission.TenantId = tenantId;
        }
        var local = _dbContext.RolePermissions.Local
            .Where(rp => rp.RoleId == role.Id)
            .Select(rp => rp.Permission)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        if (desired.Count == 0)
        {
            if (existing.Count > 0)
            {
                _dbContext.RolePermissions.RemoveRange(existing);
            }
            return;
        }

        var stale = existing
            .Where(rp => !desired.Contains(rp.Permission))
            .ToList();

        if (stale.Count > 0)
        {
            _dbContext.RolePermissions.RemoveRange(stale);
        }

        foreach (var permission in desired)
        {
            var alreadyAssigned = existing.Any(rp => string.Equals(rp.Permission, permission, StringComparison.OrdinalIgnoreCase));
            if (!alreadyAssigned && local.Contains(permission))
            {
                alreadyAssigned = true;
            }
            if (!alreadyAssigned)
            {
                _dbContext.RolePermissions.Add(new RolePermission
                {
                    RoleId = role.Id,
                    Permission = permission
                });
                local.Add(permission);
            }
        }
    }

    private async Task<Role> EnsureRoleAsync(string name, string description, CancellationToken cancellationToken)
    {
        var existing = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Name == name, cancellationToken);
        if (existing is not null)
        {
            return existing;
        }

        var role = new Role
        {
            Name = name,
            Description = description,
            CreatedAtUtc = DateTime.UtcNow
        };
        _dbContext.Roles.Add(role);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return role;
    }
}
