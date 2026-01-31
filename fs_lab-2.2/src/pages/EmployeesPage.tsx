import { AddEmployeeForm } from "../components/AddEmployeeForm";
import { DepartmentSection } from "../components/DepartmentSection";
import type { Department } from "../types/employee";

type EmployeesPageProps = {
  departments: Department[];
  departmentNames: string[];
  onAddEmployee: (firstName: string, departmentName: string) => void;
};

export default function EmployeesPage({
  departments,
  departmentNames,
  onAddEmployee,
}: EmployeesPageProps) {
  return (
    <>
      <h2>Employees</h2>

      <AddEmployeeForm departments={departmentNames} onAdd={onAddEmployee} />

      {departments.map((department) => (
        <DepartmentSection key={department.name} department={department} />
      ))}
    </>
  );
}
