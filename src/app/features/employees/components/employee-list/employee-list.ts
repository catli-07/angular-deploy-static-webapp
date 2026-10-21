import { Component, input, output } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees = input.required<Employee[]>();
  loading = input(false);
  edit = output<Employee>();
  remove = output<Employee>();
}
