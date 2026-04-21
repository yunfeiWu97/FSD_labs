  import { SignedIn, SignedOut, SignInButton } from "@clerk/react";
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

        <SignedIn>
          <AddEmployeeForm departments={departmentNames} onAdd={onEmployeesUpdated} />
        </SignedIn>

        <SignedOut>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "16px",
              maxWidth: "360px",
              backgroundColor: "#f8f8f8",
            }}
          >
            <p style={{ marginTop: 0 }}>You must be logged in to create a new employee.</p>
            <SignInButton mode="modal">
              <button type="button">Log In</button>
            </SignInButton>
          </div>
        </SignedOut>

        {departments.map((department) => (
          <DepartmentSection key={department.name} department={department} />
        ))}
      </>
    );
  }