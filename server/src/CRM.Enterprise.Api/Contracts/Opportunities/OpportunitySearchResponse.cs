using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunitySearchResponse(IEnumerable<OpportunityListItem> Items, int Total);
