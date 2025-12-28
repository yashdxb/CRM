import { DatePipe, DecimalPipe, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';

import { DashboardDataService } from '../services/dashboard-data.service';
import { DashboardSummary } from '../models/dashboard.model';
import { Customer } from '../../customers/models/customer.model';
import { Activity } from '../../activities/models/activity.model';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, DecimalPipe, CurrencyPipe, ChartModule, BreadcrumbsComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage implements OnInit {
  private readonly dashboardData = inject(DashboardDataService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly summarySignal = toSignal(this.dashboardData.getSummary(), { initialValue: null });

  protected readonly summary = computed(() => this.summarySignal());
  
  protected readonly greeting = this.getGreeting();
  
  // Chart configurations
  protected revenueChartData: any;
  protected revenueChartOptions: any;
  protected customerGrowthData: any;
  protected customerGrowthOptions: any;
  protected activityDonutData: any;
  protected activityDonutOptions: any;
  protected pipelineChartData: any;
  protected pipelineChartOptions: any;
  protected conversionChartData: any;
  protected conversionChartOptions: any;
  
  protected readonly kpis = computed(() => {
    const data = this.summary();
    if (!data) return [];
    return [
      { label: 'Accounts', value: data.totalCustomers, sub: 'Total records' },
      { label: 'Open opportunities', value: data.openOpportunities, sub: 'Active pipeline' },
      { label: 'Pipeline value', value: data.pipelineValueTotal, sub: 'Open forecast' },
      { label: 'Tasks due today', value: data.tasksDueToday, sub: 'Focus list' },
      { label: 'Upcoming activities', value: data.upcomingActivities, sub: 'Next 7 days' }
    ];
  });
  
  protected readonly secondaryKpis = computed(() => {
    const data = this.summary();
    if (!data) return [];
    return [
      { label: 'Accounts', value: data.totalCustomers, trend: 0, percentage: 100, icon: 'pi-building', color: 'cyan' },
      { label: 'Open Opps', value: data.openOpportunities, trend: 0, percentage: 100, icon: 'pi-briefcase', color: 'purple' },
      { label: 'Tasks Due', value: data.tasksDueToday, trend: 0, percentage: 100, icon: 'pi-calendar', color: 'success' },
      { label: 'Next 7 Days', value: data.upcomingActivities, trend: 0, percentage: 100, icon: 'pi-clock', color: 'orange' }
    ];
  });
  
  protected readonly customerBreakdown = computed(() => {
    const data = this.summary();
    if (!data) return [];
    return [
      { label: 'Lead', value: data.leads, accent: 'teal' },
      { label: 'Prospect', value: data.prospects, accent: 'amber' },
      { label: 'Customer', value: data.activeCustomers, accent: 'emerald' }
    ];
  });
  
  protected readonly recentAccounts = computed(() => this.summary()?.recentCustomers?.slice(0, 5) ?? []);
  protected readonly upcomingActivities = computed(() => this.summary()?.activitiesNextWeek?.slice(0, 6) ?? []);
  protected readonly topPerformers = computed(() => this.summary()?.topPerformers ?? []);
  protected readonly activityBreakdown = computed(() => this.summary()?.activityBreakdown ?? []);
  protected readonly pipelineValue = computed(() => this.summary()?.pipelineValue ?? []);
  
  protected readonly activityStats = computed(() => {
    const data = this.summary();
    const upcoming = data?.upcomingActivities ?? 0;
    const overdue = data?.overdueActivities ?? 0;
    const total = upcoming + overdue;
    const completion = total ? Math.round((upcoming / total) * 100) : 100;
    return { upcoming, overdue, completion };
  });
  
  protected readonly totalPipelineValue = computed(() => {
    const pipeline = this.pipelineValue();
    const summary = this.summary();
    if (summary?.pipelineValueTotal) {
      return summary.pipelineValueTotal;
    }
    return pipeline.reduce((sum, stage) => sum + stage.value, 0);
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCharts();
    }
  }

  private initCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = '#64748b';
    const textColorSecondary = '#94a3b8';
    const surfaceBorder = 'rgba(148, 163, 184, 0.1)';
    
    // Gradient colors
    const primaryColor = '#667eea';
    const cyanColor = '#06b6d4';
    const purpleColor = '#a855f7';
    const successColor = '#22c55e';
    const orangeColor = '#f97316';

    // Revenue Chart (Area)
    this.revenueChartData = {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue',
          data: [85000, 98000, 112000, 125000, 142000, 168000],
          fill: true,
          borderColor: primaryColor,
          backgroundColor: this.createGradient(primaryColor, 0.3),
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: primaryColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
    
    this.revenueChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (ctx: any) => `$${ctx.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColorSecondary }
        },
        y: {
          grid: { color: surfaceBorder },
          ticks: { 
            color: textColorSecondary,
            callback: (value: number) => `$${(value / 1000)}k`
          }
        }
      }
    };

    // Customer Growth (Bar)
    this.customerGrowthData = {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'New Customers',
          data: [35, 42, 48, 55, 62, 78],
          backgroundColor: [
            `${cyanColor}cc`,
            `${primaryColor}cc`,
            `${purpleColor}cc`,
            `${successColor}cc`,
            `${primaryColor}cc`,
            `${cyanColor}cc`
          ],
          borderRadius: 8,
          borderSkipped: false
        }
      ]
    };
    
    this.customerGrowthOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColorSecondary }
        },
        y: {
          grid: { color: surfaceBorder },
          ticks: { color: textColorSecondary }
        }
      }
    };

    // Activity Donut
    this.activityDonutData = {
      labels: ['Calls', 'Emails', 'Meetings', 'Tasks'],
      datasets: [
        {
          data: [25, 35, 20, 20],
          backgroundColor: [cyanColor, purpleColor, primaryColor, successColor],
          borderWidth: 0,
          hoverOffset: 8
        }
      ]
    };
    
    this.activityDonutOptions = {
      cutout: '70%',
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: true,
            padding: 16,
            font: { size: 11 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: any) => `${ctx.label}: ${ctx.raw}%`
          }
        }
      }
    };

    // Pipeline Chart (Horizontal Bar)
    this.pipelineChartData = {
      labels: ['Qualification', 'Proposal', 'Negotiation', 'Closed Won'],
      datasets: [
        {
          label: 'Value',
          data: [125000, 196000, 180000, 312000],
          backgroundColor: [
            cyanColor,
            purpleColor,
            orangeColor,
            successColor
          ],
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    };
    
    this.pipelineChartOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: any) => `$${ctx.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: surfaceBorder },
          ticks: { 
            color: textColorSecondary,
            callback: (value: number) => `$${(value / 1000)}k`
          }
        },
        y: {
          grid: { display: false },
          ticks: { color: textColor, font: { weight: 500 } }
        }
      }
    };

    // Conversion Trend (Line)
    this.conversionChartData = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
      datasets: [
        {
          label: 'Conversion Rate',
          data: [18, 22, 20, 28, 32, 38],
          fill: false,
          borderColor: successColor,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: successColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    };
    
    this.conversionChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: any) => `${ctx.raw}%`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColorSecondary }
        },
        y: {
          grid: { color: surfaceBorder },
          ticks: { 
            color: textColorSecondary,
            callback: (value: number) => `${value}%`
          },
          min: 0,
          max: 50
        }
      }
    };
  }

  private createGradient(color: string, alpha: number): string {
    return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
  }

  protected statusSeverity(status: Customer['status']) {
    switch (status) {
      case 'Lead':
        return 'info';
      case 'Prospect':
        return 'warn';
      default:
        return 'info';
    }
  }

  protected activitySeverity(status: Activity['status']) {
    if (status === 'Overdue') return 'danger';
    if (status === 'Upcoming') return 'info';
    return 'info';
  }
  
  protected getFunnelWidth(index: number): number {
    const widths = [100, 75, 50];
    return widths[index] ?? 50;
  }
  
  protected getConversionRate(index: number): number {
    const breakdown = this.customerBreakdown();
    if (index >= breakdown.length - 1) return 0;
    const current = breakdown[index].value;
    const next = breakdown[index + 1].value;
    if (current === 0) return 0;
    return Math.round((next / current) * 100);
  }
  
  protected getTotalConversion(): number {
    const breakdown = this.customerBreakdown();
    if (breakdown.length < 2) return 0;
    const first = breakdown[0].value;
    const last = breakdown[breakdown.length - 1].value;
    if (first === 0) return 0;
    return Math.round((last / first) * 100);
  }
  
  protected getHealthProgress(): string {
    const completion = this.activityStats().completion;
    const circumference = 2 * Math.PI * 54;
    const progress = (completion / 100) * circumference;
    return `${progress} ${circumference}`;
  }
  
  protected getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      'Call': 'pi-phone',
      'Email': 'pi-envelope',
      'Meeting': 'pi-video',
      'Task': 'pi-check-square'
    };
    return icons[type] || 'pi-circle';
  }
  
  protected getActivityColor(type: string): string {
    const colors: Record<string, string> = {
      'Call': 'cyan',
      'Email': 'purple',
      'Meeting': 'primary',
      'Task': 'success'
    };
    return colors[type] || 'primary';
  }
  
  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
