import type { Department } from "../types/employee";

type Props = {
  department: Department;
};

export function DepartmentSection({ department }: Props) {
  return (
    <section className="department">
      <h2>{department.name}</h2>
      <ul className="employee-list">
        {department.employees.map((employee) => {
          const fullName = `${employee.firstName}${employee.lastName ? " " + employee.lastName : ""}`;
          return <li key={`${department.name}-${fullName}`}>{fullName}</li>;
        })}
      </ul>
    </section>
  );
}
