import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

import { CrmLandingService } from './services/crm-landing.service';
import { CrmLandingVm } from './models/crm-landing.models';
import { BreadcrumbsComponent } from '../../core/breadcrumbs';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    AvatarModule,
    TagModule,
    ProgressBarModule,
    SkeletonModule,
    TooltipModule,
    BreadcrumbsComponent,
],
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage implements OnInit {
  private readonly svc = inject(CrmLandingService);
  private readonly router = inject(Router);

  vm: CrmLandingVm | null = null;
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.vm = this.svc.getVm();
  }

  onGetStarted(): void {
    // TODO: route to auth/register or app shell
    console.log('Get Started');
  }

  onWatchDemo(): void {
    // TODO: open demo modal or navigate to demo
    console.log('Watch Demo');
  }

  onSignIn(): void {
    void this.router.navigate(['/login']);
  }
}
