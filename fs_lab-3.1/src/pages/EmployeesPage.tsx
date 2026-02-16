import { AddEmployeeForm } from "../components/AddEmployeeForm";
import { DepartmentSection } from "../components/DepartmentSection";
import type { Department, Employee } from "../types/employee";

type EmployeesPageProps = {
  departments: Department[];
  departmentNames: string[];
  onEmployeesUpdated: (employees: Employee[]) => void;
};

export default function EmployeesPage({
  departments,
  departmentNames,
  onEmployeesUpdated,
}: EmployeesPageProps) {
  return (
    <>
      <h2>Employees</h2>

      <AddEmployeeForm departments={departmentNames} onAdd={onEmployeesUpdated} />

      {departments.map((department) => (
        <DepartmentSection key={department.name} department={department} />
      ))}
    </>
  );
}
