import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
  confirmLeaveWithUnsavedChanges?(): boolean | Promise<boolean> | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (component.hasUnsavedChanges?.()) {
    if (component.confirmLeaveWithUnsavedChanges) {
      return component.confirmLeaveWithUnsavedChanges();
    }
    return window.confirm('You have unsaved changes. Are you sure you want to leave?');
  }
  return true;
};
