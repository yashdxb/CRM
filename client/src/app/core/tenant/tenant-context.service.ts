import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface TenantContext {
  id: string;
  key: string;
  name: string;
  industryPreset?: string | null;
  verticalPresetConfiguration: {
    presetId: string;
    vocabulary: {
      leadQualificationLabel: string;
      opportunitySingularLabel: string;
      opportunityPluralLabel: string;
      pipelineLabel: string;
      qualificationGuidance: string;
    };
    brokerageLeadProfileCatalog: {
      buyerTypes: string[];
      motivationUrgencies: string[];
      financingReadinessOptions: string[];
      preApprovalStatuses: string[];
      preferredAreas: string[];
      propertyTypes: string[];
      budgetBands: string[];
    };
    dashboardPackDefaults: string[];
    reportLibraryHighlights: string[];
    workflowTemplateHighlights: string[];
  };
  industryModules?: string[];
  featureFlags?: Record<string, boolean>;
}

@Injectable({ providedIn: 'root' })
export class TenantContextService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getTenantContext() {
    return this.http.get<TenantContext>(`${this.baseUrl}/api/tenant-context`);
  }
}
