import type { Employee } from "../types/employee";
import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";
import { employeeRepo } from "../repositories/employeeRepo";

type AddEmployeeFormProps = {
  departments: string[];
  onAdd: (employees: Employee[]) => void; 
};

export function AddEmployeeForm({ departments, onAdd }: AddEmployeeFormProps) {
  const firstNameInput = useFormInput<string>("");
  const departmentInput = useFormInput<string>(departments[0] ?? "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // clear old messages
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

    // success: repo already created the employee, refresh employees from repo
    const updatedEmployees = employeeRepo.getEmployees();
    onAdd(updatedEmployees);

    // reset fields
    firstNameInput.setValue("");
    departmentInput.setValue(departments[0] ?? "");
  };

  return (
    <section>
      <h2>Add Employee</h2>

      {/* Messages for First Name */}
      {firstNameInput.messages.length > 0 ? (
        <div>
          {firstNameInput.messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}

      {/* Messages for Department */}
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
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add</button>
      </form>
    </section>
  );
}
