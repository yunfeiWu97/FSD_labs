import "./App.css";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { employees as employeeData } from "./data/employees";
import { groupByDepartment } from "./utils/groupByDepartment";
import Layout from "./components/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import OrganizationPage from "./pages/OrganizationPage";
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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/employees" replace />} />

        <Route
          path="employees"
          element={
            <EmployeesPage
              departments={departments}
              departmentNames={departmentNames}
              onAddEmployee={handleAddEmployee}
            />
          }
        />

        <Route path="organization" element={<OrganizationPage />} />

        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Route>
    </Routes>
  );
}