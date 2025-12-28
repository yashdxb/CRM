using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Leads;

public record LeadSearchResponse(IEnumerable<LeadListItem> Items, int Total);
