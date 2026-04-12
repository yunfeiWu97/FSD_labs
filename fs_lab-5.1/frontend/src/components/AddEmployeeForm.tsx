import { useAuth } from "@clerk/react";
import type { Employee } from "../types/employee";
import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";
import { employeeRepo } from "../repositories/employeeRepo";

type AddEmployeeFormProps = {
  departments: string[];
  onAdd: (employees: Employee[]) => void;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function AddEmployeeForm({ departments, onAdd }: AddEmployeeFormProps) {
  const { getToken } = useAuth();

  const firstNameInput = useFormInput<string>("");
  const departmentInput = useFormInput<string>(departments[0] ?? "");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    firstNameInput.clearMessages();
    departmentInput.clearMessages();

    const result = employeeService.tryCreateEmployee({
      firstName: firstNameInput.value,
      department: departmentInput.value,
      departments,
    });

    if (!result.ok) {
      firstNameInput.setMessages(result.errors.firstName ?? []);
      departmentInput.setMessages(result.errors.department ?? []);
      return;
    }

    const token = await getToken();

    const response = await fetch(`${apiBaseUrl}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        department: departmentInput.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create employee");
    }

    const updatedEmployees = await employeeRepo.getEmployees();
    onAdd(updatedEmployees);

    firstNameInput.setValue("");
    departmentInput.setValue(departments[0] ?? "");
  };

  return (
    <section>
      <h2>Add Employee</h2>

      {firstNameInput.messages.length > 0 ? (
        <div>
          {firstNameInput.messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}

      {departmentInput.messages.length > 0 ? (
        <div>
          {departmentInput.messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstNameInput.value}
            onChange={(e) => firstNameInput.onChange(e.target.value)}
            placeholder="At least 3 characters"
          />
        </label>

        <label>
          Department
          <select
            value={departmentInput.value}
            onChange={(e) => departmentInput.onChange(e.target.value)}
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add</button>
      </form>
    </section>
  );
}