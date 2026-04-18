export const unsavedChangesGuard = (component) => {
    if (component.hasUnsavedChanges?.()) {
        if (component.confirmLeaveWithUnsavedChanges) {
            return component.confirmLeaveWithUnsavedChanges();
        }
        return window.confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
};
