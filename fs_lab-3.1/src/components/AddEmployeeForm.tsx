import { useState } from "react";

type AddEmployeeFormProps = {
  departments: string[];
  onAdd: (firstName: string, department: string) => void;
};

export function AddEmployeeForm({ departments, onAdd }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [department, setDepartment] = useState<string>(departments[0] ?? "");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear old validation messages
    setErrors([]);

    const trimmedFirstName = firstName.trim();
    const trimmedDepartment = department.trim();

    const newErrors: string[] = [];

    if (trimmedFirstName.length < 3) {
      newErrors.push("First name must be at least 3 characters.");
    }

    if (!departments.includes(trimmedDepartment)) {
      newErrors.push("Please select an existing department.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(trimmedFirstName, trimmedDepartment);

    // Reset form fields after success
    setFirstName("");
    setDepartment(departments[0] ?? "");
  };

  return (
    <section>
      <h2>Add Employee</h2>

      {errors.length > 0 ? (
        <div>
          {errors.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="At least 3 characters"
          />
        </label>

        <label>
          Department
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
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
