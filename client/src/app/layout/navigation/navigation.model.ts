export interface NavLink {
  label: string;
  icon: string;
  path: string;
  badge?: string;
  disabled?: boolean;
  permission?: string;
  featureFlag?: string;
  pack?: 'supply-chain';
  module?: string;
  children?: NavLink[];
}

export interface Option<T = string> {
  label: string;
  value: T;
}
