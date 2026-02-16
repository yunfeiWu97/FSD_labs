import type { Department, Employee } from "../types/employee";

export function groupByDepartment(items: Employee[]): Department[] {
  const map = new Map<string, Employee[]>();

  items.forEach((employee) => {
    const department = employee.department;
    if (!map.has(department)) map.set(department, []);
    map.get(department)!.push(employee);
  });

  const departments: Department[] = Array.from(map.entries()).map(
    ([departmentName, employeesInDepartment]) => {
      const sortedEmployees = employeesInDepartment.slice().sort((firstEmployee, secondEmployee) => {
        const firstEmployeeName = `${firstEmployee.lastName ?? ""} ${firstEmployee.firstName}`.trim();
        const secondEmployeeName = `${secondEmployee.lastName ?? ""} ${secondEmployee.firstName}`.trim();
        return firstEmployeeName.localeCompare(secondEmployeeName);
      });

      return { name: departmentName, employees: sortedEmployees };
    }
  );

  return departments.sort((firstDepartment, secondDepartment) =>
    firstDepartment.name.localeCompare(secondDepartment.name)
  );
}
