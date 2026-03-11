import { HttpContextToken } from '@angular/common/http';

export const SKIP_LOADING_OVERLAY = new HttpContextToken<boolean>(() => false);
export const SHOW_LOADING_OVERLAY = new HttpContextToken<boolean>(() => false);
