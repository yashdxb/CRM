export interface SupplierRegistration {
  companyName: string;
  taxId: string;
  businessType: BusinessType;
  industry: string;
  yearEstablished: number;
  numberOfEmployees: string;
  website?: string;

  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  primaryContactPosition: string;

  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  certifications: CertificationUpload[];

  username: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export enum BusinessType {
  MANUFACTURER = 'Manufacturer',
  DISTRIBUTOR = 'Distributor',
  SERVICE_PROVIDER = 'Service Provider',
  CONSULTANT = 'Consultant',
  WHOLESALER = 'Wholesaler',
  RETAILER = 'Retailer'
}

export interface CertificationUpload {
  id?: string;
  type: string;
  number: string;
  issuedDate: Date | null;
  expiryDate: Date | null;
  issuingAuthority: string;
  file: File | null;
  fileName?: string;
  fileSize?: number;
}

export const CERTIFICATION_TYPES = [
  'ISO 9001 - Quality Management',
  'ISO 14001 - Environmental Management',
  'ISO 27001 - Information Security',
  'ISO 45001 - Occupational Health & Safety',
  'CE Marking',
  'FDA Approval',
  'GMP - Good Manufacturing Practice',
  'HACCP - Food Safety',
  'FSC - Forest Stewardship Council',
  'Halal Certification',
  'Kosher Certification',
  'Organic Certification',
  'Fair Trade',
  'UL Certification',
  'CSA Certification',
  'OSHA Compliance',
  'Other'
];

export const INDUSTRIES = [
  'Electronics & Technology',
  'Manufacturing',
  'Food & Beverage',
  'Pharmaceuticals',
  'Automotive',
  'Aerospace',
  'Construction',
  'Textiles & Apparel',
  'Packaging',
  'Chemical',
  'Medical Devices',
  'Agriculture',
  'Office Supplies',
  'Industrial Equipment',
  'Raw Materials',
  'Other'
];

export const EMPLOYEE_RANGES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];
