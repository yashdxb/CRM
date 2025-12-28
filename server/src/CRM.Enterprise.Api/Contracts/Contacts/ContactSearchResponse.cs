using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Contacts;

public record ContactSearchResponse(IEnumerable<ContactListItem> Items, int Total);
