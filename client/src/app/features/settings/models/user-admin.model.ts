export interface RoleSummary {
  id: string;
  name: string;
  description?: string | null;
  permissions: string[];
  isSystem: boolean;
}

export interface PermissionDefinition {
  key: string;
  label: string;
  description: string;
}

export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAtUtc: string;
  lastLoginAtUtc?: string | null;
}

export interface UserSearchResponse {
  items: UserListItem[];
  total: number;
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
  permissions: string[];
}
