import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee, emptyEmployee } from '../../models/employee.model';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  /** Employee being edited; null means "add new". */
  employee = input<Employee | null>(null);
  saved = output<Employee>();
  cancelled = output<void>();

  // Local form state; resets whenever the `employee` input changes
  form = linkedSignal<Employee>(() => ({ ...(this.employee() ?? emptyEmployee()) }));

  isEditing = computed(() => this.employee() !== null);

  emailInvalid = computed(() => {
    const email = this.form().email.trim();
    return email.length > 0 && !EMAIL_RE.test(email);
  });

  isValid = computed(() => {
    const f = this.form();
    return !!(
      f.firstName.trim() &&
      f.lastName.trim() &&
      f.position.trim() &&
      f.department.trim() &&
      EMAIL_RE.test(f.email.trim())
    );
  });

  setField<K extends keyof Employee>(key: K, value: Employee[K]) {
    this.form.update(f => ({ ...f, [key]: value }));
  }

  submit() {
    if (!this.isValid()) return;
    const f = this.form();
    this.saved.emit({
      ...f,
      firstName: f.firstName.trim(),
      lastName: f.lastName.trim(),
      email: f.email.trim(),
      position: f.position.trim(),
      department: f.department.trim(),
    });
    if (!this.isEditing()) this.form.set(emptyEmployee());
  }
}