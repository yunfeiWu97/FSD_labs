import "./App.css";
import { useState } from "react";
import { employees as employeeData } from "./data/employees";
import { groupByDepartment } from "./utils/groupByDepartment";
import { DepartmentSection } from "./components/DepartmentSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AddEmployeeForm } from "./components/AddEmployeeForm";
import type { Employee } from "./types/employee";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(employeeData);

  const departments = groupByDepartment(employees);

  const departmentNames = departments.map((d) => d.name);

  const handleAddEmployee = (firstName: string, department: string) => {
    setEmployees((oldEmployees) => {
      const newEmployee: Employee = {
        firstName: firstName,
        department: department,
      };

      return [...oldEmployees, newEmployee];
    });
  };

  return (
    <div className="page">
      <SiteHeader />

      <main className="site-main">
        {departments.map((department) => (
          <DepartmentSection key={department.name} department={department} />
        ))}

        <AddEmployeeForm
          departments={departmentNames}
          onAdd={handleAddEmployee}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
