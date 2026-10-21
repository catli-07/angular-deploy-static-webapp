import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/config/config.service';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);

  private _employees = signal<Employee[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly employees = this._employees.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly count = computed(() => this._employees().length);

  private get url() {
    return `${this.config.apiBaseUrl}/employees`;
  }

  load() {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<Employee[]>(this.url).subscribe({
      next: (data) => { this._employees.set(data); this._loading.set(false); },
      error: (e) => this.fail('Could not load employees', e),
    });
  }

  create(emp: Employee, done?: () => void) {
    this.http.post<Employee>(this.url, emp).subscribe({
      next: (created) => { this._employees.update(l => [...l, created]); done?.(); },
      error: (e) => this.fail('Could not add employee', e),
    });
  }

  update(emp: Employee, done?: () => void) {
    this.http.put<Employee | null>(`${this.url}/${emp.id}`, emp).subscribe({
      next: (res) => {
        const saved = res ?? emp; // PUT may return 204 No Content
        this._employees.update(l => l.map(x => (x.id === emp.id ? saved : x)));
        done?.();
      },
      error: (e) => this.fail('Could not update employee', e),
    });
  }

  delete(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => this._employees.update(l => l.filter(x => x.id !== id)),
      error: (e) => this.fail('Could not delete employee', e),
    });
  }

  private fail(msg: string, e: unknown) {
    console.error(e);
    this._error.set(msg);
    this._loading.set(false);
  }
}
