import "./App.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import OrganizationPage from "./pages/OrganizationPage";
import type { Employee } from "./types/employee";
import { employeeRepo } from "./repositories/employeeRepo";
import { groupByDepartment } from "./utils/groupByDepartment";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const loadedEmployees = await employeeRepo.getEmployees();
        setEmployees(loadedEmployees);
      } catch (error) {
        console.error(error);
      }
    }

    void loadEmployees();
  }, []);

  const departments = groupByDepartment(employees);
  const departmentNames = departments.map((department) => department.name);

  function handleEmployeesUpdated(updatedEmployees: Employee[]) {
    setEmployees(updatedEmployees);
  }

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
              onEmployeesUpdated={handleEmployeesUpdated}
            />
          }
        />

        <Route path="organization" element={<OrganizationPage />} />

        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Route>
    </Routes>
  );
}