using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Customers;

public record CustomerSearchResponse(IEnumerable<CustomerListItem> Items, int Total);
