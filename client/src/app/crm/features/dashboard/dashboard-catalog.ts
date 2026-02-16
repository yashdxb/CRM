export type DashboardChartId = 'revenue' | 'growth';

export type DashboardCatalogItem = { id: string; label: string; icon: string };
export type DashboardChartCatalogItem = { id: DashboardChartId; label: string; icon: string };

// Single source of truth for dashboard packs + customize layout.
export const DASHBOARD_CARD_CATALOG: DashboardCatalogItem[] = [
  { id: 'pipeline', label: 'Pipeline by Stage', icon: 'pi pi-filter' },
  { id: 'truth-metrics', label: 'Truth Metrics', icon: 'pi pi-verified' },
  { id: 'risk-register', label: 'Risk Register', icon: 'pi pi-exclamation-triangle' },
  { id: 'execution-guide', label: 'Execution Guide', icon: 'pi pi-compass' },
  { id: 'confidence-forecast', label: 'Confidence Forecast', icon: 'pi pi-chart-line' },
  { id: 'forecast-scenarios', label: 'Forecast Scenarios', icon: 'pi pi-sliders-h' },
  { id: 'my-forecast', label: 'My Forecast', icon: 'pi pi-bolt' },
  { id: 'expansion-signals', label: 'Expansion Signals', icon: 'pi pi-sparkles' },
  { id: 'accounts', label: 'Recent Accounts', icon: 'pi pi-building' },
  { id: 'manager-health', label: 'Pipeline Health', icon: 'pi pi-shield' },
  { id: 'activity-mix', label: 'Activity Mix', icon: 'pi pi-chart-pie' },
  { id: 'conversion', label: 'Conversion Trend', icon: 'pi pi-percentage' },
  { id: 'top-performers', label: 'Top Performers', icon: 'pi pi-trophy' },
  { id: 'my-tasks', label: 'My Task', icon: 'pi pi-check-square' },
  { id: 'timeline', label: 'Activity Timeline', icon: 'pi pi-clock' },
  { id: 'health', label: 'Business Health', icon: 'pi pi-heart' }
];

export const DASHBOARD_CHART_CATALOG: DashboardChartCatalogItem[] = [
  { id: 'revenue', label: 'Revenue Trend', icon: 'pi pi-chart-line' },
  { id: 'growth', label: 'Customer Growth', icon: 'pi pi-users' }
];
