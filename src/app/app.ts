import { Component } from '@angular/core';
import { EmployeesPage } from './features/employees/pages/employees-page/employees-page';

@Component({
  selector: 'app-root',
  imports: [EmployeesPage],
  template: `<main class="wrap"><app-employees-page /></main>`,
  styles: `.wrap { max-width: 960px; margin: 0 auto; padding: 24px 16px; }`,
})
export class App {}
