export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
}

export const emptyEmployee = (): Employee => ({
  firstName: '', lastName: '', email: '', position: '', department: '',
});
