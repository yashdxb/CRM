using System.Globalization;
using System.Text.Json;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Properties;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Properties;

public sealed class PropertyService : IPropertyService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;

    public PropertyService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PropertySearchResultDto> SearchAsync(PropertySearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Properties
            .Include(p => p.Account)
            .Include(p => p.PrimaryContact)
            .AsNoTracking()
            .Where(p => !p.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(p =>
                p.Address.ToLower().Contains(term) ||
                (p.MlsNumber ?? string.Empty).ToLower().Contains(term) ||
                (p.City ?? string.Empty).ToLower().Contains(term) ||
                (p.Neighborhood ?? string.Empty).ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Status) && Enum.TryParse<PropertyStatus>(request.Status, true, out var statusFilter))
        {
            query = query.Where(p => p.Status == statusFilter);
        }

        if (!string.IsNullOrWhiteSpace(request.PropertyType) && Enum.TryParse<PropertyType>(request.PropertyType, true, out var typeFilter))
        {
            query = query.Where(p => p.PropertyType == typeFilter);
        }

        if (!string.IsNullOrWhiteSpace(request.City))
        {
            var city = request.City.ToLower();
            query = query.Where(p => (p.City ?? string.Empty).ToLower().Contains(city));
        }

        var total = await query.CountAsync(cancellationToken);

        var sortedQuery = (request.SortBy ?? "newest").Trim().ToLowerInvariant() switch
        {
            "price_asc" => query.OrderBy(p => p.ListPrice).ThenByDescending(p => p.CreatedAtUtc),
            "price_desc" => query.OrderByDescending(p => p.ListPrice).ThenByDescending(p => p.CreatedAtUtc),
            "address" => query.OrderBy(p => p.Address).ThenByDescending(p => p.CreatedAtUtc),
            _ => query.OrderByDescending(p => p.CreatedAtUtc)
        };

        var items = await sortedQuery
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new
            {
                p.Id,
                p.MlsNumber,
                p.Address,
                p.City,
                p.Province,
                p.PostalCode,
                p.Country,
                p.ListPrice,
                p.SalePrice,
                p.Currency,
                p.ListingDateUtc,
                p.SoldDateUtc,
                Status = p.Status.ToString(),
                PropertyType = p.PropertyType.ToString(),
                p.Bedrooms,
                p.Bathrooms,
                p.SquareFeet,
                p.LotSizeSqFt,
                p.YearBuilt,
                p.GarageSpaces,
                p.Description,
                p.Features,
                p.PhotoUrls,
                p.VirtualTourUrl,
                p.CommissionRate,
                p.BuyerAgentCommission,
                p.SellerAgentCommission,
                p.CoListingAgentId,
                p.OwnerId,
                p.AccountId,
                AccountName = p.Account != null ? p.Account.Name : null,
                p.PrimaryContactId,
                PrimaryContactName = p.PrimaryContact != null
                    ? (p.PrimaryContact.FirstName + " " + p.PrimaryContact.LastName)
                    : null,
                p.OpportunityId,
                p.Neighborhood,
                p.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var userIds = items
            .SelectMany(i => new[] { i.OwnerId, i.CoListingAgentId ?? Guid.Empty })
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();
        var owners = await _dbContext.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var result = items.Select(i =>
        {
            var ownerName = owners.FirstOrDefault(o => o.Id == i.OwnerId)?.FullName ?? "Unassigned";
            return new PropertyListItemDto(
                i.Id,
                i.MlsNumber,
                i.Address,
                i.City,
                i.Province,
                i.PostalCode,
                i.Country,
                i.ListPrice,
                i.SalePrice,
                i.Currency,
                i.ListingDateUtc,
                i.SoldDateUtc,
                i.Status,
                i.PropertyType,
                i.Bedrooms,
                i.Bathrooms,
                i.SquareFeet,
                i.LotSizeSqFt,
                i.YearBuilt,
                i.GarageSpaces,
                i.Description,
                i.Features,
                i.PhotoUrls,
                i.VirtualTourUrl,
                i.CommissionRate,
                i.BuyerAgentCommission,
                i.SellerAgentCommission,
                i.CoListingAgentId,
                owners.FirstOrDefault(o => o.Id == i.CoListingAgentId)?.FullName,
                i.OwnerId,
                ownerName,
                i.AccountId,
                i.AccountName,
                i.PrimaryContactId,
                i.PrimaryContactName,
                i.OpportunityId,
                i.Neighborhood,
                i.CreatedAtUtc);
        }).ToList();

        return new PropertySearchResultDto(result, total);
    }

    public async Task<PropertyListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var property = await _dbContext.Properties
            .Include(p => p.Account)
            .Include(p => p.PrimaryContact)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        if (property is null)
        {
            return null;
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == property.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";
        var coListingAgentName = property.CoListingAgentId.HasValue
            ? await _dbContext.Users
                .Where(u => u.Id == property.CoListingAgentId.Value)
                .Select(u => u.FullName)
                .FirstOrDefaultAsync(cancellationToken)
            : null;

        return new PropertyListItemDto(
            property.Id,
            property.MlsNumber,
            property.Address,
            property.City,
            property.Province,
            property.PostalCode,
            property.Country,
            property.ListPrice,
            property.SalePrice,
            property.Currency,
            property.ListingDateUtc,
            property.SoldDateUtc,
            property.Status.ToString(),
            property.PropertyType.ToString(),
            property.Bedrooms,
            property.Bathrooms,
            property.SquareFeet,
            property.LotSizeSqFt,
            property.YearBuilt,
            property.GarageSpaces,
            property.Description,
            property.Features,
            property.PhotoUrls,
            property.VirtualTourUrl,
            property.CommissionRate,
            property.BuyerAgentCommission,
            property.SellerAgentCommission,
            property.CoListingAgentId,
            coListingAgentName,
            property.OwnerId,
            ownerName,
            property.AccountId,
            property.Account?.Name,
            property.PrimaryContactId,
            property.PrimaryContact != null
                ? (property.PrimaryContact.FirstName + " " + property.PrimaryContact.LastName)
                : null,
            property.OpportunityId,
            property.Neighborhood,
            property.CreatedAtUtc);
    }

    public async Task<PropertyOperationResult<PropertyListItemDto>> CreateAsync(PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        return await ExecuteAtomicAsync(async () =>
        {
            var ownerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);

            var property = new Property
            {
                MlsNumber = request.MlsNumber,
                Address = request.Address,
                City = request.City,
                Province = request.Province,
                PostalCode = request.PostalCode,
                Country = request.Country,
                ListPrice = request.ListPrice,
                SalePrice = request.SalePrice,
                Currency = request.Currency ?? "CAD",
                ListingDateUtc = request.ListingDateUtc,
                SoldDateUtc = request.SoldDateUtc,
                Status = ParseStatus(request.Status),
                PropertyType = ParsePropertyType(request.PropertyType),
                Bedrooms = request.Bedrooms,
                Bathrooms = request.Bathrooms,
                SquareFeet = request.SquareFeet,
                LotSizeSqFt = request.LotSizeSqFt,
                YearBuilt = request.YearBuilt,
                GarageSpaces = request.GarageSpaces,
                Description = request.Description,
                Features = request.Features,
                PhotoUrls = NormalizePhotoUrls(request.PhotoUrls),
                VirtualTourUrl = request.VirtualTourUrl,
                CommissionRate = request.CommissionRate,
                BuyerAgentCommission = request.BuyerAgentCommission,
                SellerAgentCommission = request.SellerAgentCommission,
                CoListingAgentId = request.CoListingAgentId,
                OwnerId = ownerId,
                AccountId = request.AccountId,
                PrimaryContactId = request.PrimaryContactId,
                OpportunityId = request.OpportunityId,
                Neighborhood = request.Neighborhood,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.Properties.Add(property);
            await _dbContext.SaveChangesAsync(cancellationToken);

            await EnsureLifecycleEventsAsync(property, null, actor, cancellationToken);
            await EvaluateAlertRulesAsync(property, "property.created", cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            var dto = await GetAsync(property.Id, cancellationToken);
            return PropertyOperationResult<PropertyListItemDto>.Ok(dto!);
        }, "Unable to create property.", cancellationToken);
    }

    public async Task<PropertyOperationResult<bool>> UpdateAsync(Guid id, PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        return await ExecuteAtomicAsync(async () =>
        {
            var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);
            if (property is null)
            {
                return PropertyOperationResult<bool>.NotFoundResult();
            }

            var previousSnapshot = CaptureSnapshot(property);

            property.MlsNumber = request.MlsNumber;
            property.Address = request.Address;
            property.City = request.City;
            property.Province = request.Province;
            property.PostalCode = request.PostalCode;
            property.Country = request.Country;
            property.ListPrice = request.ListPrice;
            property.SalePrice = request.SalePrice;
            property.Currency = request.Currency ?? property.Currency;
            property.ListingDateUtc = request.ListingDateUtc;
            property.SoldDateUtc = request.SoldDateUtc;
            property.Status = ParseStatus(request.Status);
            property.PropertyType = ParsePropertyType(request.PropertyType);
            property.Bedrooms = request.Bedrooms;
            property.Bathrooms = request.Bathrooms;
            property.SquareFeet = request.SquareFeet;
            property.LotSizeSqFt = request.LotSizeSqFt;
            property.YearBuilt = request.YearBuilt;
            property.GarageSpaces = request.GarageSpaces;
            property.Description = request.Description;
            property.Features = request.Features;
            property.PhotoUrls = NormalizePhotoUrls(request.PhotoUrls);
            property.VirtualTourUrl = request.VirtualTourUrl;
            property.CommissionRate = request.CommissionRate;
            property.BuyerAgentCommission = request.BuyerAgentCommission;
            property.SellerAgentCommission = request.SellerAgentCommission;
            property.CoListingAgentId = request.CoListingAgentId;
            property.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
            property.AccountId = request.AccountId;
            property.PrimaryContactId = request.PrimaryContactId;
            property.OpportunityId = request.OpportunityId;
            property.Neighborhood = request.Neighborhood;
            property.UpdatedAtUtc = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);

            if (previousSnapshot.ListPrice != property.ListPrice
                && previousSnapshot.ListPrice.HasValue
                && property.ListPrice.HasValue)
            {
                await RecordPriceChangeAsync(
                    property,
                    previousSnapshot.ListPrice.Value,
                    property.ListPrice.Value,
                    actor.UserName ?? "System",
                    null,
                    cancellationToken);
            }

            await EnsureLifecycleEventsAsync(property, previousSnapshot, actor, cancellationToken);
            if (HasAlertRelevantChanges(previousSnapshot, property))
            {
                await EvaluateAlertRulesAsync(property, "property.updated", cancellationToken);
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
            return PropertyOperationResult<bool>.Ok(true);
        }, "Unable to update property.", cancellationToken);
    }

    public async Task<PropertyOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);
        if (property is null)
        {
            return PropertyOperationResult<bool>.NotFoundResult();
        }

        property.IsDeleted = true;
        property.DeletedAtUtc = DateTime.UtcNow;
        await RecordEventAsync(property.Id, "deleted", "Property archived", actor.UserName, "pi-trash", "inactive", cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return PropertyOperationResult<bool>.Ok(true);
    }

    public async Task<IReadOnlyList<ShowingDto>> GetShowingsAsync(Guid propertyId, CancellationToken ct = default)
    {
        return await _dbContext.PropertyShowings
            .AsNoTracking()
            .Where(s => s.PropertyId == propertyId && !s.IsDeleted)
            .OrderByDescending(s => s.ScheduledAtUtc)
            .Select(s => new ShowingDto(
                s.Id, s.PropertyId, s.AgentId, s.AgentName,
                s.VisitorName, s.VisitorEmail, s.VisitorPhone,
                s.ScheduledAtUtc, s.DurationMinutes, s.Feedback, s.Rating,
                s.Status.ToString(), s.CreatedAtUtc))
            .ToListAsync(ct);
    }

    public async Task<PropertyOperationResult<ShowingDto>> CreateShowingAsync(Guid propertyId, CreateShowingRequest request, ActorContext actor, CancellationToken ct = default)
    {
        return await ExecuteAtomicAsync(async () =>
        {
            var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == propertyId && !p.IsDeleted, ct);
            if (property is null)
            {
                return PropertyOperationResult<ShowingDto>.NotFoundResult();
            }

            var entity = new PropertyShowing
            {
                PropertyId = propertyId,
                AgentId = request.AgentId,
                AgentName = request.AgentName,
                VisitorName = request.VisitorName,
                VisitorEmail = request.VisitorEmail,
                VisitorPhone = request.VisitorPhone,
                ScheduledAtUtc = request.ScheduledAtUtc,
                DurationMinutes = request.DurationMinutes,
                Status = Enum.TryParse<ShowingStatus>(request.Status, true, out var st) ? st : ShowingStatus.Scheduled,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.PropertyShowings.Add(entity);
            await _dbContext.SaveChangesAsync(ct);

            await RecordEventAsync(propertyId, "showing.scheduled", "Showing scheduled", request.VisitorName, "pi-calendar", "showing", ct);
            await EvaluateAlertRulesAsync(property, "property.showing.scheduled", ct);
            await _dbContext.SaveChangesAsync(ct);

            return PropertyOperationResult<ShowingDto>.Ok(new ShowingDto(
                entity.Id, entity.PropertyId, entity.AgentId, entity.AgentName,
                entity.VisitorName, entity.VisitorEmail, entity.VisitorPhone,
                entity.ScheduledAtUtc, entity.DurationMinutes, entity.Feedback, entity.Rating,
                entity.Status.ToString(), entity.CreatedAtUtc));
        }, "Unable to create showing.", ct);
    }

    public async Task<PropertyOperationResult<ShowingDto>> UpdateShowingAsync(Guid propertyId, Guid showingId, UpdateShowingRequest request, ActorContext actor, CancellationToken ct = default)
    {
        var entity = await _dbContext.PropertyShowings
            .FirstOrDefaultAsync(s => s.Id == showingId && s.PropertyId == propertyId && !s.IsDeleted, ct);
        if (entity is null)
        {
            return PropertyOperationResult<ShowingDto>.NotFoundResult();
        }

        if (request.AgentId.HasValue)
        {
            entity.AgentId = request.AgentId;
        }
        if (request.AgentName is not null)
        {
            entity.AgentName = request.AgentName;
        }
        if (request.VisitorName is not null)
        {
            entity.VisitorName = request.VisitorName;
        }
        if (request.VisitorEmail is not null)
        {
            entity.VisitorEmail = request.VisitorEmail;
        }
        if (request.VisitorPhone is not null)
        {
            entity.VisitorPhone = request.VisitorPhone;
        }
        if (request.ScheduledAtUtc.HasValue)
        {
            entity.ScheduledAtUtc = request.ScheduledAtUtc.Value;
        }
        if (request.DurationMinutes.HasValue)
        {
            entity.DurationMinutes = request.DurationMinutes;
        }
        if (request.Feedback is not null)
        {
            entity.Feedback = request.Feedback;
        }
        if (request.Rating.HasValue)
        {
            entity.Rating = request.Rating;
        }
        if (request.Status is not null && Enum.TryParse<ShowingStatus>(request.Status, true, out var st))
        {
            entity.Status = st;
        }

        entity.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(ct);

        await RecordEventAsync(propertyId, "showing.updated", "Showing updated", entity.VisitorName, "pi-calendar-clock", "showing", ct);
        await _dbContext.SaveChangesAsync(ct);

        return PropertyOperationResult<ShowingDto>.Ok(new ShowingDto(
            entity.Id, entity.PropertyId, entity.AgentId, entity.AgentName,
            entity.VisitorName, entity.VisitorEmail, entity.VisitorPhone,
            entity.ScheduledAtUtc, entity.DurationMinutes, entity.Feedback, entity.Rating,
            entity.Status.ToString(), entity.CreatedAtUtc));
    }

    public async Task<IReadOnlyList<PropertyDocumentDto>> GetDocumentsAsync(Guid propertyId, CancellationToken ct = default)
    {
        return await _dbContext.PropertyDocuments
            .AsNoTracking()
            .Where(d => d.PropertyId == propertyId && !d.IsDeleted)
            .OrderByDescending(d => d.UploadedAtUtc)
            .Select(d => new PropertyDocumentDto(
                d.Id, d.PropertyId, d.FileName, d.FileUrl,
                d.FileSize, d.MimeType, d.Category.ToString(),
                d.UploadedBy, d.UploadedAtUtc))
            .ToListAsync(ct);
    }

    public async Task<PropertyOperationResult<PropertyDocumentDto>> CreateDocumentAsync(Guid propertyId, CreateDocumentRequest request, ActorContext actor, CancellationToken ct = default)
    {
        return await ExecuteAtomicAsync(async () =>
        {
            var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == propertyId && !p.IsDeleted, ct);
            if (property is null)
            {
                return PropertyOperationResult<PropertyDocumentDto>.NotFoundResult();
            }

            var category = Enum.TryParse<DocumentCategory>(request.Category, true, out var cat) ? cat : DocumentCategory.Other;
            var entity = new PropertyDocument
            {
                PropertyId = propertyId,
                FileName = request.FileName,
                FileUrl = request.FileUrl,
                FileSize = request.FileSize,
                MimeType = request.MimeType,
                Category = category,
                UploadedBy = actor.UserName,
                UploadedAtUtc = DateTime.UtcNow,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.PropertyDocuments.Add(entity);
            if (category == DocumentCategory.Photo)
            {
                property.PhotoUrls = AppendPhotoUrl(property.PhotoUrls, entity.FileUrl);
            }

            await _dbContext.SaveChangesAsync(ct);

            await RecordEventAsync(
                propertyId,
                category == DocumentCategory.Photo ? "photo.uploaded" : "document.uploaded",
                category == DocumentCategory.Photo ? "Photo uploaded" : "Document uploaded",
                entity.FileName,
                category == DocumentCategory.Photo ? "pi-image" : "pi-file",
                category == DocumentCategory.Photo ? "media" : "document",
                ct);
            await EvaluateAlertRulesAsync(property, category == DocumentCategory.Photo ? "property.photo.uploaded" : "property.document.uploaded", ct);
            await _dbContext.SaveChangesAsync(ct);

            return PropertyOperationResult<PropertyDocumentDto>.Ok(ToDocumentDto(entity));
        }, "Unable to create document.", ct);
    }

    public async Task<PropertyOperationResult<PropertyDocumentDto>> RegisterPhotoAsync(Guid propertyId, RegisterPropertyPhotoRequest request, ActorContext actor, CancellationToken ct = default)
    {
        return await CreateDocumentAsync(
            propertyId,
            new CreateDocumentRequest(request.FileName, request.FileUrl, request.FileSize, request.MimeType, DocumentCategory.Photo.ToString()),
            actor,
            ct);
    }

    public async Task<PropertyOperationResult<bool>> DeleteDocumentAsync(Guid propertyId, Guid documentId, ActorContext actor, CancellationToken ct = default)
    {
        var entity = await _dbContext.PropertyDocuments
            .FirstOrDefaultAsync(d => d.Id == documentId && d.PropertyId == propertyId && !d.IsDeleted, ct);
        if (entity is null)
        {
            return PropertyOperationResult<bool>.NotFoundResult();
        }

        entity.IsDeleted = true;
        entity.DeletedAtUtc = DateTime.UtcNow;

        if (entity.Category == DocumentCategory.Photo)
        {
            var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == propertyId && !p.IsDeleted, ct);
            if (property is not null)
            {
                property.PhotoUrls = RemovePhotoUrl(property.PhotoUrls, entity.FileUrl);
            }
        }

        await _dbContext.SaveChangesAsync(ct);
        await RecordEventAsync(
            propertyId,
            entity.Category == DocumentCategory.Photo ? "photo.deleted" : "document.deleted",
            entity.Category == DocumentCategory.Photo ? "Photo removed" : "Document removed",
            entity.FileName,
            entity.Category == DocumentCategory.Photo ? "pi-image" : "pi-file-minus",
            entity.Category == DocumentCategory.Photo ? "media" : "document",
            ct);
        await _dbContext.SaveChangesAsync(ct);
        return PropertyOperationResult<bool>.Ok(true);
    }

    public async Task<IReadOnlyList<PropertyActivityDto>> GetActivitiesAsync(Guid propertyId, CancellationToken ct = default)
    {
        return await _dbContext.PropertyActivities
            .AsNoTracking()
            .Where(a => a.PropertyId == propertyId && !a.IsDeleted)
            .OrderByDescending(a => a.CreatedAtUtc)
            .Select(a => new PropertyActivityDto(
                a.Id, a.PropertyId, a.Type.ToString(), a.Subject, a.Description,
                a.DueDate, a.CompletedDate,
                a.Status.ToString(), a.Priority.ToString(),
                a.AssignedToId, a.AssignedToName, a.CreatedByName,
                a.CreatedAtUtc))
            .ToListAsync(ct);
    }

    public async Task<PropertyOperationResult<PropertyActivityDto>> CreateActivityAsync(Guid propertyId, CreatePropertyActivityRequest request, ActorContext actor, CancellationToken ct = default)
    {
        var propertyExists = await _dbContext.Properties.AnyAsync(p => p.Id == propertyId && !p.IsDeleted, ct);
        if (!propertyExists)
        {
            return PropertyOperationResult<PropertyActivityDto>.NotFoundResult();
        }

        var entity = new PropertyActivity
        {
            PropertyId = propertyId,
            Type = Enum.TryParse<ActivityType>(request.Type, true, out var t) ? t : ActivityType.Task,
            Subject = request.Subject,
            Description = request.Description,
            DueDate = request.DueDate,
            Status = Enum.TryParse<PropertyActivityStatus>(request.Status, true, out var s) ? s : PropertyActivityStatus.Open,
            Priority = Enum.TryParse<PropertyActivityPriority>(request.Priority, true, out var p) ? p : PropertyActivityPriority.Medium,
            AssignedToId = request.AssignedToId,
            AssignedToName = request.AssignedToName,
            CreatedByName = actor.UserName,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.PropertyActivities.Add(entity);
        await _dbContext.SaveChangesAsync(ct);

        await RecordEventAsync(propertyId, "activity.created", "Activity created", entity.Subject, "pi-check-square", "activity", ct);
        await _dbContext.SaveChangesAsync(ct);

        return PropertyOperationResult<PropertyActivityDto>.Ok(new PropertyActivityDto(
            entity.Id, entity.PropertyId, entity.Type.ToString(), entity.Subject,
            entity.Description, entity.DueDate, entity.CompletedDate,
            entity.Status.ToString(), entity.Priority.ToString(),
            entity.AssignedToId, entity.AssignedToName, entity.CreatedByName,
            entity.CreatedAtUtc));
    }

    public async Task<PropertyOperationResult<PropertyActivityDto>> UpdateActivityAsync(Guid propertyId, Guid activityId, UpdatePropertyActivityRequest request, ActorContext actor, CancellationToken ct = default)
    {
        var entity = await _dbContext.PropertyActivities
            .FirstOrDefaultAsync(a => a.Id == activityId && a.PropertyId == propertyId && !a.IsDeleted, ct);
        if (entity is null)
        {
            return PropertyOperationResult<PropertyActivityDto>.NotFoundResult();
        }

        if (request.Type is not null && Enum.TryParse<ActivityType>(request.Type, true, out var t))
        {
            entity.Type = t;
        }
        if (request.Subject is not null)
        {
            entity.Subject = request.Subject;
        }
        if (request.Description is not null)
        {
            entity.Description = request.Description;
        }
        if (request.DueDate.HasValue)
        {
            entity.DueDate = request.DueDate;
        }
        if (request.CompletedDate.HasValue)
        {
            entity.CompletedDate = request.CompletedDate;
        }
        if (request.Status is not null && Enum.TryParse<PropertyActivityStatus>(request.Status, true, out var s))
        {
            entity.Status = s;
        }
        if (request.Priority is not null && Enum.TryParse<PropertyActivityPriority>(request.Priority, true, out var p))
        {
            entity.Priority = p;
        }
        if (request.AssignedToId.HasValue)
        {
            entity.AssignedToId = request.AssignedToId;
        }
        if (request.AssignedToName is not null)
        {
            entity.AssignedToName = request.AssignedToName;
        }

        entity.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(ct);

        await RecordEventAsync(propertyId, "activity.updated", "Activity updated", entity.Subject, "pi-pencil", "activity", ct);
        await _dbContext.SaveChangesAsync(ct);

        return PropertyOperationResult<PropertyActivityDto>.Ok(new PropertyActivityDto(
            entity.Id, entity.PropertyId, entity.Type.ToString(), entity.Subject,
            entity.Description, entity.DueDate, entity.CompletedDate,
            entity.Status.ToString(), entity.Priority.ToString(),
            entity.AssignedToId, entity.AssignedToName, entity.CreatedByName,
            entity.CreatedAtUtc));
    }

    public async Task<IReadOnlyList<PriceChangeDto>> GetPriceHistoryAsync(Guid propertyId, CancellationToken ct = default)
    {
        return await _dbContext.PropertyPriceChanges
            .AsNoTracking()
            .Where(pc => pc.PropertyId == propertyId && !pc.IsDeleted)
            .OrderByDescending(pc => pc.ChangedAtUtc)
            .Select(pc => new PriceChangeDto(
                pc.Id, pc.PropertyId, pc.PreviousPrice, pc.NewPrice,
                pc.ChangedAtUtc, pc.ChangedBy, pc.Reason))
            .ToListAsync(ct);
    }

    public async Task<PropertyOperationResult<PriceChangeDto>> AddPriceChangeAsync(Guid propertyId, AddPriceChangeRequest request, ActorContext actor, CancellationToken ct = default)
    {
        return await ExecuteAtomicAsync(async () =>
        {
            var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == propertyId && !p.IsDeleted, ct);
            if (property is null)
            {
                return PropertyOperationResult<PriceChangeDto>.NotFoundResult();
            }

            property.ListPrice = request.NewPrice;
            property.UpdatedAtUtc = DateTime.UtcNow;

            var entity = await RecordPriceChangeAsync(
                property,
                request.PreviousPrice,
                request.NewPrice,
                request.ChangedBy ?? actor.UserName ?? "System",
                request.Reason,
                ct);
            await EvaluateAlertRulesAsync(property, "property.price.changed", ct);
            await _dbContext.SaveChangesAsync(ct);

            return PropertyOperationResult<PriceChangeDto>.Ok(new PriceChangeDto(
                entity.Id, entity.PropertyId, entity.PreviousPrice, entity.NewPrice,
                entity.ChangedAtUtc, entity.ChangedBy, entity.Reason));
        }, "Unable to record price change.", ct);
    }

    public async Task<IReadOnlyList<PropertyTimelineEventDto>> GetTimelineAsync(Guid propertyId, CancellationToken ct = default)
    {
        var items = await _dbContext.PropertyEvents
            .AsNoTracking()
            .Where(e => e.PropertyId == propertyId && !e.IsDeleted)
            .OrderBy(e => e.OccurredAtUtc)
            .ThenBy(e => e.CreatedAtUtc)
            .Select(e => new PropertyTimelineEventDto(
                e.Id,
                e.PropertyId,
                e.EventType,
                e.Label,
                e.Description,
                e.Icon,
                e.Variant,
                e.OccurredAtUtc))
            .ToListAsync(ct);

        if (items.Count > 0)
        {
            return items;
        }

        var property = await _dbContext.Properties
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == propertyId && !p.IsDeleted, ct);

        return property is null ? [] : BuildFallbackTimeline(property);
    }

    public async Task<IReadOnlyList<PropertyAlertRuleDto>> GetAlertRulesAsync(Guid propertyId, CancellationToken ct = default)
    {
        var items = await _dbContext.PropertyAlertRules
            .AsNoTracking()
            .Where(r => r.PropertyId == propertyId && !r.IsDeleted)
            .OrderByDescending(r => r.CreatedAtUtc)
            .ToListAsync(ct);

        return items.Select(ToAlertRuleDto).ToList();
    }

    public async Task<PropertyOperationResult<PropertyAlertRuleDto>> CreateAlertRuleAsync(Guid propertyId, CreatePropertyAlertRuleRequest request, ActorContext actor, CancellationToken ct = default)
    {
        return await ExecuteAtomicAsync(async () =>
        {
            var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == propertyId && !p.IsDeleted, ct);
            if (property is null)
            {
                return PropertyOperationResult<PropertyAlertRuleDto>.NotFoundResult();
            }

            var entity = new PropertyAlertRule
            {
                PropertyId = propertyId,
                ClientName = request.ClientName.Trim(),
                ClientEmail = request.ClientEmail.Trim(),
                CriteriaJson = JsonSerializer.Serialize(request.Criteria, JsonOptions),
                Frequency = NormalizeFrequency(request.Frequency),
                IsActive = true,
                MatchCount = 0,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.PropertyAlertRules.Add(entity);
            await _dbContext.SaveChangesAsync(ct);

            await RecordEventAsync(propertyId, "alert.created", "Alert rule created", entity.ClientName, "pi-bell", "alert", ct);
            await CreateAlertNotificationIfMatchedAsync(property, entity, "property.alert.created", ct);
            await _dbContext.SaveChangesAsync(ct);

            return PropertyOperationResult<PropertyAlertRuleDto>.Ok(ToAlertRuleDto(entity));
        }, "Unable to create alert rule.", ct);
    }

    public async Task<PropertyOperationResult<PropertyAlertRuleDto>> ToggleAlertRuleAsync(Guid propertyId, Guid ruleId, TogglePropertyAlertRuleRequest request, ActorContext actor, CancellationToken ct = default)
    {
        return await ExecuteAtomicAsync(async () =>
        {
            var entity = await _dbContext.PropertyAlertRules
                .FirstOrDefaultAsync(r => r.Id == ruleId && r.PropertyId == propertyId && !r.IsDeleted, ct);
            if (entity is null)
            {
                return PropertyOperationResult<PropertyAlertRuleDto>.NotFoundResult();
            }

            entity.IsActive = request.IsActive;
            entity.UpdatedAtUtc = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync(ct);

            await RecordEventAsync(
                propertyId,
                request.IsActive ? "alert.activated" : "alert.paused",
                request.IsActive ? "Alert activated" : "Alert paused",
                entity.ClientName,
                "pi-bell",
                "alert",
                ct);
            await _dbContext.SaveChangesAsync(ct);

            return PropertyOperationResult<PropertyAlertRuleDto>.Ok(ToAlertRuleDto(entity));
        }, "Unable to update alert rule.", ct);
    }

    private async Task<PropertyOperationResult<T>> ExecuteAtomicAsync<T>(
        Func<Task<PropertyOperationResult<T>>> operation,
        string errorMessage,
        CancellationToken cancellationToken)
    {
        var strategy = _dbContext.Database.CreateExecutionStrategy();
        return await strategy.ExecuteAsync(async () =>
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var result = await operation();
                if (!result.Success || result.NotFound)
                {
                    await transaction.RollbackAsync(cancellationToken);
                    return result;
                }

                await transaction.CommitAsync(cancellationToken);
                return result;
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                return PropertyOperationResult<T>.Fail(errorMessage);
            }
        });
    }

    public async Task<IReadOnlyList<PropertyAlertNotificationDto>> GetAlertNotificationsAsync(Guid propertyId, CancellationToken ct = default)
    {
        return await _dbContext.PropertyAlertNotifications
            .AsNoTracking()
            .Where(n => n.PropertyId == propertyId && !n.IsDeleted)
            .OrderByDescending(n => n.SentAtUtc)
            .Select(n => new PropertyAlertNotificationDto(
                n.Id,
                n.PropertyId,
                n.RuleId,
                n.ClientName,
                n.ClientEmail,
                n.MatchedProperties,
                n.SentAtUtc,
                n.Status,
                n.TriggeredBy))
            .ToListAsync(ct);
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, ActorContext actor, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
        {
            var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
            if (exists)
            {
                return requestedOwnerId.Value;
            }
        }

        if (actor.UserId.HasValue && actor.UserId.Value != Guid.Empty)
        {
            return actor.UserId.Value;
        }

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId;
    }

    private async Task EnsureLifecycleEventsAsync(Property property, PropertySnapshot? previousSnapshot, ActorContext actor, CancellationToken ct)
    {
        if (previousSnapshot is null)
        {
            await RecordEventAsync(property.Id, "created", "Record created", actor.UserName, "pi-plus-circle", "created", ct, property.CreatedAtUtc);
            if (property.ListingDateUtc.HasValue)
            {
                await RecordEventAsync(property.Id, "listed", "Listed on market", null, "pi-megaphone", "listed", ct, property.ListingDateUtc.Value);
            }
            await RecordEventAsync(property.Id, $"status.{property.Status}", $"Status set to {property.Status}", null, "pi-sync", "status", ct);
            if (property.SoldDateUtc.HasValue)
            {
                await RecordEventAsync(property.Id, "sold", "Sold", null, "pi-check-circle", "sold", ct, property.SoldDateUtc.Value);
            }
            return;
        }

        if (!string.Equals(previousSnapshot.Address, property.Address, StringComparison.Ordinal) ||
            !string.Equals(previousSnapshot.City, property.City, StringComparison.Ordinal) ||
            previousSnapshot.OwnerId != property.OwnerId)
        {
            await RecordEventAsync(property.Id, "updated", "Record details updated", actor.UserName, "pi-pencil", "updated", ct);
        }

        if (previousSnapshot.Status != property.Status)
        {
            await RecordEventAsync(property.Id, $"status.{property.Status}", $"Status changed to {property.Status}", actor.UserName, "pi-sync", "status", ct);
        }

        if (previousSnapshot.ListingDateUtc != property.ListingDateUtc && property.ListingDateUtc.HasValue)
        {
            await RecordEventAsync(property.Id, "listed", "Listed on market", null, "pi-megaphone", "listed", ct, property.ListingDateUtc.Value);
        }

        if (previousSnapshot.SoldDateUtc != property.SoldDateUtc && property.SoldDateUtc.HasValue)
        {
            await RecordEventAsync(property.Id, "sold", "Sold", null, "pi-check-circle", "sold", ct, property.SoldDateUtc.Value);
        }
    }

    private async Task<PropertyPriceChange> RecordPriceChangeAsync(
        Property property,
        decimal previousPrice,
        decimal newPrice,
        string changedBy,
        string? reason,
        CancellationToken ct)
    {
        var entity = new PropertyPriceChange
        {
            PropertyId = property.Id,
            PreviousPrice = previousPrice,
            NewPrice = newPrice,
            ChangedAtUtc = DateTime.UtcNow,
            ChangedBy = changedBy,
            Reason = reason,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.PropertyPriceChanges.Add(entity);
        var description = $"{FormatCurrency(previousPrice, property.Currency)} -> {FormatCurrency(newPrice, property.Currency)}";
        if (!string.IsNullOrWhiteSpace(reason))
        {
            description = $"{description} ({reason.Trim()})";
        }

        await RecordEventAsync(property.Id, "property.price.changed", "Price updated", description, "pi-dollar", "price", ct);
        return entity;
    }

    private static string FormatCurrency(decimal amount, string? currency)
    {
        var currencyCode = string.IsNullOrWhiteSpace(currency) ? "CAD" : currency.Trim().ToUpperInvariant();
        var symbol = currencyCode switch
        {
            "USD" => "$",
            "CAD" => "CA$",
            _ => $"{currencyCode} "
        };

        return string.Create(
            CultureInfo.InvariantCulture,
            $"{symbol}{decimal.Round(amount, 0):N0}");
    }

    private async Task RecordEventAsync(
        Guid propertyId,
        string eventType,
        string label,
        string? description,
        string icon,
        string variant,
        CancellationToken ct,
        DateTime? occurredAtUtc = null)
    {
        var entity = new PropertyEvent
        {
            PropertyId = propertyId,
            EventType = eventType,
            Label = label,
            Description = string.IsNullOrWhiteSpace(description) ? null : description,
            Icon = icon,
            Variant = variant,
            OccurredAtUtc = occurredAtUtc ?? DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.PropertyEvents.Add(entity);
        await Task.CompletedTask;
    }

    private async Task EvaluateAlertRulesAsync(Property property, string trigger, CancellationToken ct)
    {
        var rules = await _dbContext.PropertyAlertRules
            .Where(r => r.PropertyId == property.Id && !r.IsDeleted && r.IsActive)
            .ToListAsync(ct);

        foreach (var rule in rules)
        {
            await CreateAlertNotificationIfMatchedAsync(property, rule, trigger, ct);
        }
    }

    private async Task CreateAlertNotificationIfMatchedAsync(Property property, PropertyAlertRule rule, string trigger, CancellationToken ct)
    {
        var criteria = ParseCriteria(rule.CriteriaJson);
        if (!MatchesCriteria(property, criteria))
        {
            return;
        }

        rule.MatchCount += 1;
        rule.LastNotifiedAtUtc = DateTime.UtcNow;
        var notification = new PropertyAlertNotification
        {
            PropertyId = property.Id,
            RuleId = rule.Id,
            ClientName = rule.ClientName,
            ClientEmail = rule.ClientEmail,
            MatchedProperties = 1,
            SentAtUtc = DateTime.UtcNow,
            Status = "Sent",
            TriggeredBy = trigger,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.PropertyAlertNotifications.Add(notification);
        await Task.CompletedTask;
    }

    private static bool MatchesCriteria(Property property, PropertyAlertCriteriaRequest criteria)
    {
        if (criteria.MinPrice.HasValue && (!property.ListPrice.HasValue || property.ListPrice.Value < criteria.MinPrice.Value))
        {
            return false;
        }

        if (criteria.MaxPrice.HasValue && (!property.ListPrice.HasValue || property.ListPrice.Value > criteria.MaxPrice.Value))
        {
            return false;
        }

        if (criteria.MinBedrooms.HasValue && (!property.Bedrooms.HasValue || property.Bedrooms.Value < criteria.MinBedrooms.Value))
        {
            return false;
        }

        if (criteria.PropertyTypes is { Count: > 0 } &&
            !criteria.PropertyTypes.Contains(property.PropertyType.ToString(), StringComparer.OrdinalIgnoreCase))
        {
            return false;
        }

        if (criteria.Cities is { Count: > 0 } &&
            !criteria.Cities.Contains(property.City ?? string.Empty, StringComparer.OrdinalIgnoreCase))
        {
            return false;
        }

        if (criteria.Neighborhoods is { Count: > 0 } &&
            !criteria.Neighborhoods.Contains(property.Neighborhood ?? string.Empty, StringComparer.OrdinalIgnoreCase))
        {
            return false;
        }

        return true;
    }

    private static PropertyAlertRuleDto ToAlertRuleDto(PropertyAlertRule entity)
    {
        var criteria = ParseCriteria(entity.CriteriaJson);
        return new PropertyAlertRuleDto(
            entity.Id,
            entity.PropertyId,
            entity.ClientName,
            entity.ClientEmail,
            new PropertyAlertCriteriaDto(
                criteria.MinPrice,
                criteria.MaxPrice,
                criteria.PropertyTypes,
                criteria.MinBedrooms,
                criteria.Cities,
                criteria.Neighborhoods),
            entity.Frequency,
            entity.IsActive,
            entity.MatchCount,
            entity.LastNotifiedAtUtc,
            entity.CreatedAtUtc);
    }

    private static PropertyAlertCriteriaRequest ParseCriteria(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return new PropertyAlertCriteriaRequest(null, null, null, null, null, null);
        }

        try
        {
            return JsonSerializer.Deserialize<PropertyAlertCriteriaRequest>(json, JsonOptions)
                ?? new PropertyAlertCriteriaRequest(null, null, null, null, null, null);
        }
        catch (JsonException)
        {
            return new PropertyAlertCriteriaRequest(null, null, null, null, null, null);
        }
    }

    private static string NormalizeFrequency(string? frequency)
    {
        return frequency?.Trim() switch
        {
            "Instant" => "Instant",
            "Weekly" => "Weekly",
            _ => "Daily"
        };
    }

    private static PropertyStatus ParseStatus(string? status)
    {
        if (string.IsNullOrWhiteSpace(status))
        {
            return PropertyStatus.Draft;
        }

        return Enum.TryParse<PropertyStatus>(status, true, out var result) ? result : PropertyStatus.Draft;
    }

    private static PropertyType ParsePropertyType(string? propertyType)
    {
        if (string.IsNullOrWhiteSpace(propertyType))
        {
            return PropertyType.Detached;
        }

        return Enum.TryParse<PropertyType>(propertyType, true, out var result) ? result : PropertyType.Detached;
    }

    private static PropertyDocumentDto ToDocumentDto(PropertyDocument entity)
        => new(
            entity.Id,
            entity.PropertyId,
            entity.FileName,
            entity.FileUrl,
            entity.FileSize,
            entity.MimeType,
            entity.Category.ToString(),
            entity.UploadedBy,
            entity.UploadedAtUtc);

    private static string? NormalizePhotoUrls(string? urls)
    {
        if (string.IsNullOrWhiteSpace(urls))
        {
            return null;
        }

        var normalized = urls
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(url => !string.IsNullOrWhiteSpace(url))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        return normalized.Length == 0 ? null : string.Join(", ", normalized);
    }

    private static string AppendPhotoUrl(string? existingUrls, string fileUrl)
    {
        var urls = (existingUrls ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(url => !string.IsNullOrWhiteSpace(url))
            .ToList();

        if (!urls.Contains(fileUrl, StringComparer.OrdinalIgnoreCase))
        {
            urls.Add(fileUrl);
        }

        return string.Join(", ", urls);
    }

    private static string? RemovePhotoUrl(string? existingUrls, string fileUrl)
    {
        var urls = (existingUrls ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(url => !url.Equals(fileUrl, StringComparison.OrdinalIgnoreCase))
            .ToArray();

        return urls.Length == 0 ? null : string.Join(", ", urls);
    }

    private static bool HasAlertRelevantChanges(PropertySnapshot previousSnapshot, Property property)
    {
        return previousSnapshot.Status != property.Status
            || previousSnapshot.ListPrice != property.ListPrice
            || previousSnapshot.Bedrooms != property.Bedrooms
            || previousSnapshot.City != property.City
            || previousSnapshot.Neighborhood != property.Neighborhood
            || previousSnapshot.PropertyType != property.PropertyType;
    }

    private static IReadOnlyList<PropertyTimelineEventDto> BuildFallbackTimeline(Property property)
    {
        var items = new List<PropertyTimelineEventDto>
        {
            new(Guid.NewGuid(), property.Id, "created", "Record created", null, "pi-plus-circle", "created", property.CreatedAtUtc),
            new(Guid.NewGuid(), property.Id, $"status.{property.Status}", $"Status set to {property.Status}", null, "pi-sync", "status", property.UpdatedAtUtc ?? property.CreatedAtUtc)
        };

        if (property.ListingDateUtc.HasValue)
        {
            items.Add(new(Guid.NewGuid(), property.Id, "listed", "Listed on market", null, "pi-megaphone", "listed", property.ListingDateUtc.Value));
        }

        if (property.SoldDateUtc.HasValue)
        {
            items.Add(new(Guid.NewGuid(), property.Id, "sold", "Sold", null, "pi-check-circle", "sold", property.SoldDateUtc.Value));
        }

        return items.OrderBy(i => i.OccurredAtUtc).ToList();
    }

    private static PropertySnapshot CaptureSnapshot(Property property)
        => new(
            property.Address,
            property.City,
            property.OwnerId,
            property.Status,
            property.ListingDateUtc,
            property.SoldDateUtc,
            property.ListPrice,
            property.Bedrooms,
            property.Neighborhood,
            property.PropertyType);

    private sealed record PropertySnapshot(
        string Address,
        string? City,
        Guid OwnerId,
        PropertyStatus Status,
        DateTime? ListingDateUtc,
        DateTime? SoldDateUtc,
        decimal? ListPrice,
        int? Bedrooms,
        string? Neighborhood,
        PropertyType PropertyType);
}
