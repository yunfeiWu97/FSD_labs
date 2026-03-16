export interface Employee {
  firstName: string;
  lastName?: string;
  department: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}
