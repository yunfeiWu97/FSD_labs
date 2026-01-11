import "./App.css";

type Employee = {
  firstName: string;
  lastName?: string;
  department: string;
};

const employees: Employee[] = [
  { firstName: "Zoë", lastName: "Robins", department: "Administration" },
  { firstName: "Madeleine", lastName: "Madden", department: "Administration" },
  { firstName: "Josha", lastName: "Sadowski", department: "Audit" },
  { firstName: "Kate", lastName: "Fleetwood", department: "Audit" },
  { firstName: "Priyanka", lastName: "Bose", department: "Banking Operations" },
  { firstName: "Hammed", lastName: "Animashaun", department: "Banking Operations" },
  { firstName: "Álvaro", lastName: "Morte", department: "Banking Operations" },
  { firstName: "Taylor", lastName: "Napier", department: "Banking Operations" },
  { firstName: "Alan", lastName: "Simmonds", department: "Banking Operations" },
  { firstName: "Gil", lastName: "Cardinal", department: "Communications" },
  { firstName: "Richard", lastName: "J. Lewis", department: "Communications" },
  { firstName: "Randy", lastName: "Bradshaw", department: "Corporate Services" },
  { firstName: "Tracey", lastName: "Cook", department: "Corporate Services" },
  { firstName: "Lubomir", lastName: "Mykytiuk", department: "Corporate Services" },
  { firstName: "Dakota", lastName: "House", department: "Facilities" },
  { firstName: "Lori Lea", lastName: "Okemah", department: "Facilities" },
  { firstName: "Renae", lastName: "Morrisseau", department: "Facilities" },
  { firstName: "Rick", lastName: "Belcourt", department: "Facilities" },
  { firstName: "Selina", lastName: "Hanusa", department: "Financial Services" },
  { firstName: "Buffy", lastName: "Gaudry", department: "Financial Services" },
  { firstName: "Shaneen Ann", lastName: "Fox", department: "Financial Services" },
  { firstName: "Allan", lastName: "Little", department: "Financial Services" },
  { firstName: "Danny", lastName: "Rabbit", department: "Financial Services" },
  { firstName: "Jesse Ed", lastName: "Azure", department: "Human Resources" },
  { firstName: "Stacy", lastName: "Da Silva", department: "Human Resources" },
  { firstName: "Vladimír", lastName: "Valenta", department: "Human Resources" },
  { firstName: "Samone", lastName: "Sayeses-Whitney", department: "Human Resources" },
  { firstName: "Paul", lastName: "Coeur", department: "Human Resources" },
  { firstName: "Graham", lastName: "Greene", department: "Information Technology" },
  { firstName: "Sandika", lastName: "Evergreen", department: "Information Technology" },
  { firstName: "Jennifer", lastName: "Rodriguez (Software Developer)", department: "Information Technology" },
  { firstName: "Aiyana", lastName: "Littlebear", department: "IT Technician" },
  { firstName: "Inara", lastName: "Thunderbird", department: "IT Technician" },
  { firstName: "Kaya", lastName: "Runningbrook", department: "IT Technician" },
  { firstName: "Elara", lastName: "Firehawk", department: "IT Technician" },
  { firstName: "Siona", lastName: "Moonflower", department: "IT Technician" },
  { firstName: "Kaiyu", lastName: "Greywolf", department: "IT Technician" },
  { firstName: "Ayawamat", lastName: "Nightwind", department: "IT Technician" },
  { firstName: "Tala", lastName: "Braveheart", department: "IT Technician" },
  { firstName: "Iniko", lastName: "Stonebear", department: "IT Technician" },
  { firstName: "Onatah", lastName: "Redhawk", department: "IT Technician" },
];

type Department = {
  name: string;
  employees: Employee[];
};

function groupByDepartment(items: Employee[]): Department[] {
  const map = new Map<string, Employee[]>();

  items.forEach((employee) => {
    const department = employee.department;
    if (!map.has(department)) map.set(department, []);
    map.get(department)!.push(employee);
  });

  const departments: Department[] = Array.from(map.entries()).map(([name, employeesInDept]) => {
    const sortedEmployees = employeesInDept.slice().sort((a, b) => {
      const aName = `${a.lastName ?? ""} ${a.firstName}`.trim();
      const bName = `${b.lastName ?? ""} ${b.firstName}`.trim();
      return aName.localeCompare(bName);
    });

    return { name, employees: sortedEmployees };
  });

  return departments.sort((a, b) => a.name.localeCompare(b.name));
}

export default function App() {
  const year = new Date().getFullYear();
  const departments = groupByDepartment(employees);

  return (
    <div className="page">
      <header className="site-header">
        <a href="#" className="logo-link" aria-label="Pixell River Financial">
          <img className="logo" src="/pixell-river-logo.svg" alt="Pixell River Financial logo" />
        </a>

        <div className="header-right">
          <h1>Pixell River Employee Directory</h1>
          <p className="greeting">Welcome! Browse employees by department.</p>
        </div>
      </header>

      <main className="site-main">
        {departments.map((department) => (
          <section key={department.name} className="department">
            <h2>{department.name}</h2>
            <ul className="employee-list">
              {department.employees.map((employee) => {
                const fullName = `${employee.firstName}${employee.lastName ? " " + employee.lastName : ""}`;
                return <li key={`${department.name}-${fullName}`}>{fullName}</li>;
              })}
            </ul>
          </section>
        ))}
      </main>

      <footer className="site-footer">Copyright Pixell River Financial {year}.</footer>
    </div>
  );
}
