import { Component, inject, OnInit, signal } from '@angular/core';
// import { ConfigService } from '../../../../core/config/config.service';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { EmployeeList } from '../../components/employee-list/employee-list';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-page',
  imports: [EmployeeForm, EmployeeList],
  templateUrl: './employees-page.html',
  styleUrl: './employees-page.css',
})
export class EmployeesPage implements OnInit {
  svc = inject(EmployeeService);
  // cfg = inject(ConfigService).config;
  selected = signal<Employee | null>(null);

  ngOnInit() { this.svc.load(); }

  onSave(emp: Employee) {
    const current = this.selected();
    if (current) {
      this.svc.update({ ...emp, id: current.id }, () => this.selected.set(null));
    } else {
      this.svc.create(emp);
    }
  }

  onRemove(emp: Employee) {
    if (confirm(`Delete ${emp.firstName} ${emp.lastName}?`)) this.svc.delete(emp.id!);
  }
}
