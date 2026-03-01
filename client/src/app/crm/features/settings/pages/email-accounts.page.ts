import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { EmailConnectionService, EmailConnection } from '../services/email-connection.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

@Component({
  selector: 'app-email-accounts-page',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    RouterLink,
    ButtonModule,
    MessageModule,
    SkeletonModule,
    TagModule,
    ConfirmDialogModule,
    BreadcrumbsComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './email-accounts.page.html',
  styleUrl: './email-accounts.page.scss'
})
export class EmailAccountsPage implements OnInit {
  private readonly connectionService = inject(EmailConnectionService);
  private readonly toastService = inject(AppToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly confirmationService = inject(ConfirmationService);

  protected readonly loading = signal(true);
  protected readonly connecting = signal<string | null>(null);
  protected readonly testing = signal<string | null>(null);
  protected readonly connections = signal<EmailConnection[]>([]);

  // OAuth state for security verification
  private oauthState: string | null = null;
  private pendingProvider: string | null = null;

  ngOnInit(): void {
    this.loadConnections();
    this.handleOAuthCallback();
  }

  loadConnections(): void {
    this.loading.set(true);
    this.connectionService.getConnections().subscribe({
      next: (response) => {
        this.connections.set(response.items);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load email connections:', err);
        this.toastService.show('error', 'Failed to load email accounts');
        this.loading.set(false);
      }
    });
  }

  connectMicrosoft365(): void {
    this.startOAuth('Microsoft365');
  }

  connectGmail(): void {
    this.startOAuth('Gmail');
  }

  private startOAuth(provider: string): void {
    this.connecting.set(provider);
    const redirectUri = this.getRedirectUri();

    this.connectionService.startOAuth(provider, redirectUri).subscribe({
      next: (response) => {
        // Store state for CSRF verification
        this.oauthState = response.state;
        this.pendingProvider = provider;
        sessionStorage.setItem('oauth_state', response.state);
        sessionStorage.setItem('oauth_provider', provider);
        
        // Redirect to OAuth provider
        window.location.href = response.authorizationUrl;
      },
      error: (err) => {
        console.error('Failed to start OAuth:', err);
        this.toastService.show('error', 'Failed to start connection. Please try again.');
        this.connecting.set(null);
      }
    });
  }

  private handleOAuthCallback(): void {
    // Check if we're returning from OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      this.toastService.show('error', `OAuth error: ${error}`);
      this.clearOAuthParams();
      this.cleanUrl();
      return;
    }

    if (code && state) {
      const savedState = sessionStorage.getItem('oauth_state');
      const savedProvider = sessionStorage.getItem('oauth_provider');

      // If no saved state, this is likely a page refresh after OAuth completed
      // Just clean up the URL silently
      if (!savedState || !savedProvider) {
        this.cleanUrl();
        return;
      }

      // Compare decoded states to handle URL encoding differences
      const decodedState = decodeURIComponent(state);
      const decodedSavedState = decodeURIComponent(savedState);

      if (decodedState !== decodedSavedState) {
        console.error('OAuth state mismatch:', { received: decodedState, saved: decodedSavedState });
        this.toastService.show('error', 'Invalid OAuth state. Please try again.');
        this.clearOAuthParams();
        this.cleanUrl();
        return;
      }

      this.completeOAuth(savedProvider, code, state);
    }
  }

  private cleanUrl(): void {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  private completeOAuth(provider: string, code: string, state: string): void {
    this.connecting.set(provider);
    const redirectUri = this.getRedirectUri();

    this.connectionService.completeOAuth(provider, code, redirectUri, state).subscribe({
      next: (connection) => {
        this.toastService.show('success', `Connected ${connection.emailAddress} successfully!`);
        this.loadConnections();
        this.connecting.set(null);
        this.clearOAuthParams();
        this.cleanUrl();
      },
      error: (err) => {
        console.error('Failed to complete OAuth:', err);
        const errorMessage = err.error?.error || err.message || 'Failed to connect email account. Please try again.';
        this.toastService.show('error', errorMessage);
        this.connecting.set(null);
        this.clearOAuthParams();
        this.cleanUrl();
      }
    });
  }

  setPrimary(connection: EmailConnection): void {
    this.connectionService.setPrimary(connection.id).subscribe({
      next: () => {
        this.toastService.show('success', `${connection.emailAddress} is now your primary email`);
        this.loadConnections();
      },
      error: (err) => {
        console.error('Failed to set primary:', err);
        this.toastService.show('error', 'Failed to set primary email');
      }
    });
  }

  testConnection(connection: EmailConnection): void {
    this.testing.set(connection.id);
    
    this.connectionService.testConnection(connection.id).subscribe({
      next: (result) => {
        if (result.success) {
          this.toastService.show('success', `Connection verified! Found ${result.inboxCount} messages in inbox.`);
        } else {
          this.toastService.show('error', `Connection test failed: ${result.errorMessage}`);
        }
        this.testing.set(null);
      },
      error: (err) => {
        console.error('Failed to test connection:', err);
        this.toastService.show('error', 'Failed to test connection');
        this.testing.set(null);
      }
    });
  }

  confirmDisconnect(connection: EmailConnection): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to disconnect ${connection.emailAddress}? You will no longer be able to send emails from this account.`,
      header: 'Disconnect Email Account',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Disconnect',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.disconnect(connection)
    });
  }

  private disconnect(connection: EmailConnection): void {
    this.connectionService.disconnect(connection.id).subscribe({
      next: () => {
        this.toastService.show('success', `Disconnected ${connection.emailAddress}`);
        this.loadConnections();
      },
      error: (err) => {
        console.error('Failed to disconnect:', err);
        this.toastService.show('error', 'Failed to disconnect email account');
      }
    });
  }

  private getRedirectUri(): string {
    return `${window.location.origin}/app/settings/email-accounts`;
  }

  private clearOAuthParams(): void {
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('oauth_provider');
    this.oauthState = null;
    this.pendingProvider = null;
  }

  getProviderIcon(provider: string): string {
    return provider === 'Microsoft365' ? 'pi pi-microsoft' : 'pi pi-google';
  }

  getProviderColor(provider: string): string {
    return provider === 'Microsoft365' ? '#00a4ef' : '#ea4335';
  }

  getStatusSeverity(connection: EmailConnection): 'success' | 'danger' | 'warn' {
    if (!connection.isActive) return 'danger';
    if (connection.lastError) return 'warn';
    return 'success';
  }

  getStatusLabel(connection: EmailConnection): string {
    if (!connection.isActive) return 'Inactive';
    if (connection.lastError) return 'Error';
    return 'Active';
  }
}
