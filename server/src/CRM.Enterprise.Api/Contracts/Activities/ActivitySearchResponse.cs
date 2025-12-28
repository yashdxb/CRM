using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Activities;

public record ActivitySearchResponse(IEnumerable<ActivityListItem> Items, int Total);
