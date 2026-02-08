export interface RoleSummary {
  id: string;
  name: string;
  description?: string | null;
  parentRoleId?: string | null;
  hierarchyLevel?: number | null;
  hierarchyPath?: string | null;
  visibilityScope?: string | null;
  securityLevelId?: string | null;
  securityLevelName?: string | null;
  permissions: string[];
  inheritedPermissions: string[];
  basePermissions: string[];
  basePermissionsUpdatedAtUtc?: string | null;
  driftNotes?: string | null;
  driftAcceptedAtUtc?: string | null;
  driftAcceptedBy?: string | null;
  isSystem: boolean;
}

export interface PermissionDefinition {
  key: string;
  label: string;
  description: string;
  capability: string;
}

export interface RoleIntentPack {
  key: string;
  label: string;
  description: string;
  permissions: string[];
}

export interface PermissionPackPreset {
  key: string;
  label: string;
  description: string;
  hierarchyLevel: number;
  permissions: string[];
}

export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAtUtc: string;
  lastLoginAtUtc?: string | null;
  lastLoginLocation?: string | null;
  lastLoginIp?: string | null;
  timeZone?: string | null;
  isOnline?: boolean | null;
}

export interface UserSearchResponse {
  items: UserListItem[];
  total: number;
}

export interface UserLookupItem {
  id: string;
  fullName: string;
  email: string;
}

export interface UserDetailResponse {
  id: string;
  fullName: string;
  email: string;
  timeZone?: string | null;
  locale?: string | null;
  isActive: boolean;
  createdAtUtc: string;
  lastLoginAtUtc?: string | null;
  roleIds: string[];
  roles: string[];
}

export interface UserSearchRequest {
  search?: string;
  includeInactive?: boolean;
  page?: number;
  pageSize?: number;
}

export interface UpsertUserRequest {
  fullName: string;
  email: string;
  timeZone?: string | null;
  locale?: string | null;
  isActive: boolean;
  roleIds: string[];
  temporaryPassword?: string | null;
}

export interface ResetPasswordRequest {
  temporaryPassword: string;
}

export interface UpsertRoleRequest {
  name: string;
  description?: string | null;
  parentRoleId?: string | null;
  visibilityScope?: string | null;
  securityLevelId?: string | null;
  permissions: string[];
  acceptDrift?: boolean | null;
  driftNotes?: string | null;
}

export interface UpsertSecurityLevelRequest {
  name: string;
  description?: string | null;
  rank: number;
  isDefault?: boolean | null;
}

export interface SecurityLevelDefinition {
  id: string;
  name: string;
  description?: string | null;
  rank: number;
  isDefault: boolean;
}
