import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Layout from "./components/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import OrganizationPage from "./pages/OrganizationPage";
import type { Employee, Department } from "./types/employee";
import { employeeRepo } from "./repositories/employeeRepo";

function groupEmployeesByDepartment(employees: Employee[]): Department[] {
  const departmentMap = new Map<string, Employee[]>();

  employees.forEach((employee) => {
    const currentEmployees = departmentMap.get(employee.department) ?? [];
    departmentMap.set(employee.department, [...currentEmployees, employee]);
  });

  return Array.from(departmentMap.entries()).map(([name, employeesInDepartment]) => ({
    name,
    employees: employeesInDepartment,
  }));
}

export default function App() {
  const queryClient = useQueryClient();

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => employeeRepo.getEmployees(),
  });

  const departments = groupEmployeesByDepartment(employees);
  const departmentNames = departments.map((department) => department.name);

  function handleEmployeesUpdated(updatedEmployees: Employee[]) {
    queryClient.setQueryData(["employees"], updatedEmployees);
  }

  if (isLoading) {
    return <p>Loading employees...</p>;
  }

  if (isError) {
    return <p>{(error as Error).message || "Failed to load employees."}</p>;
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