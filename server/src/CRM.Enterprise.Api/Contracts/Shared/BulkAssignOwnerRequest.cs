using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Shared;

public class BulkAssignOwnerRequest
{
    public IReadOnlyCollection<Guid> Ids { get; set; } = Array.Empty<Guid>();
    public Guid OwnerId { get; set; }
}
