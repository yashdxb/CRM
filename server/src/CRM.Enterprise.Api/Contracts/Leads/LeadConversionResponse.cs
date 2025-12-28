using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public record LeadConversionResponse(
    Guid LeadId,
    Guid? AccountId,
    Guid? ContactId,
    Guid? OpportunityId);
