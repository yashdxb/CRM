import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BookDemoRequest, CrmLandingVm } from '../models/crm-landing.models';

@Injectable({ providedIn: 'root' })
export class CrmLandingService {
  private readonly http = inject(HttpClient);

  getVm(): CrmLandingVm {
    return {
      dashboard: {
        newLeads: 58,
        newLeadsProgress: 58,
        pipelineValue: 120500,
        pipelineProgress: 72,
        winRate: 72
      },
      funnel: {
        leads: 78,
        qualified: 54,
        proposal: 36,
        won: 22
      },
      tasks: [
        { title: 'Call John', time: '10:00 AM', icon: 'pi-phone', badge: 'Due', severity: 'warn' },
        { title: 'Follow Up with Sarah', time: '1:30 PM', icon: 'pi-comments', badge: 'Today', severity: 'info' },
        { title: 'Send Proposal', time: '4:15 PM', icon: 'pi-send', badge: 'High', severity: 'danger' }
      ],
      lead: {
        name: 'Michael Roberts',
        role: 'Potential Client',
        email: 'michael@email.com',
        phone: '(123) 456-7890',
        stage: 'Negotiation',
        value: 15000,
        avatarUrl: '/assets/avatars/lead1.png'
      }
    };
  }

  bookDemo(payload: BookDemoRequest) {
    const url = `${environment.apiUrl}/api/auth/book-demo`;
    return this.http.post<void>(url, payload);
  }
}
