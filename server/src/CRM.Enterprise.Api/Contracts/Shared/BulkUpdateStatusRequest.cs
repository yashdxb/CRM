using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Shared;

public class BulkUpdateStatusRequest
{
    public IReadOnlyCollection<Guid> Ids { get; set; } = Array.Empty<Guid>();
    public string Status { get; set; } = string.Empty;
}
