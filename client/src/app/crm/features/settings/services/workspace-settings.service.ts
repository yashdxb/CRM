import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApplyVerticalPresetRequest, UpdateWorkspaceSettingsRequest, WorkspaceSettings } from '../models/workspace-settings.model';

@Injectable({ providedIn: 'root' })
export class WorkspaceSettingsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getSettings() {
    return this.http.get<WorkspaceSettings>(`${this.baseUrl}/api/workspace`);
  }

  updateSettings(payload: UpdateWorkspaceSettingsRequest) {
    return this.http.put<WorkspaceSettings>(`${this.baseUrl}/api/workspace`, payload);
  }

  applyVerticalPreset(payload: ApplyVerticalPresetRequest) {
    return this.http.post<WorkspaceSettings>(`${this.baseUrl}/api/workspace/vertical-preset`, payload);
  }
}
