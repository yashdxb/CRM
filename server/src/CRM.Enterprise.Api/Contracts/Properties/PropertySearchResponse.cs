using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Properties;

public record PropertySearchResponse(IEnumerable<PropertyListItem> Items, int Total);
