import { HttpContextToken } from '@angular/common/http';

export const SKIP_LOADING_OVERLAY = new HttpContextToken<boolean>(() => false);
