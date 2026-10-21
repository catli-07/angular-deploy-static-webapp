import { Injectable, signal } from '@angular/core';
import { AppConfig } from './app-config.model';

/** Loads config.json before the app starts so the API URL is changeable without a rebuild. */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly _config = signal<AppConfig>({ apiBaseUrl: 'web-api-forreact-g5h4ekecekh7cpbd.southeastasia-01.azurewebsites.net/api' });
  readonly config = this._config.asReadonly();

  get apiBaseUrl(): string {
    return this._config().apiBaseUrl.replace(/\/+$/, '');
  }

  async load(): Promise<void> {
    try {
      const res = await fetch('config.json', { cache: 'no-store' });
      if (res.ok) this._config.set({ ...this._config(), ...(await res.json()) });
    } catch {
      console.warn('config.json not found, using default API URL');
    }
  }
}
