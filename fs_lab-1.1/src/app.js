document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const copyrightEl = document.getElementById("copyright");

  if (copyrightEl) {
    copyrightEl.textContent = `Copyright Pixell River Financial ${year}.`;
  }

  // Employee rendering
  const directoryEl = document.getElementById("app");
  if (!directoryEl) return;
  directoryEl.innerHTML = "";

  // --- Data from case study ---
  const employees = [
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
    { firstName: "Onatah", lastName: "Redhawk", department: "IT Technician" }
  ];

  // --- Group by department ---
  const deptMap = new Map();

  employees.forEach((employee) => {
    const deptName = employee.department;
    if (!deptMap.has(deptName)) deptMap.set(deptName, []);
    deptMap.get(deptName).push(employee);
  });

  // --- Render ---
  const sortedDepartments = Array.from(deptMap.keys()).sort((a, b) => a.localeCompare(b));

  sortedDepartments.forEach((deptName) => {
    const section = document.createElement("section");
    section.className = "department";

    const h2 = document.createElement("h2");
    h2.textContent = deptName;

    const ul = document.createElement("ul");
    ul.className = "employee-list";

    const employeesInDept = deptMap.get(deptName);
    employeesInDept
      .slice()
      .sort((a, b) => {
        const aName = `${a.lastName || ""} ${a.firstName}`.trim();
        const bName = `${b.lastName || ""} ${b.firstName}`.trim();
        return aName.localeCompare(bName);
      })
      .forEach((employee) => {
        const li = document.createElement("li");
        li.textContent = `${employee.firstName}${employee.lastName ? " " + employee.lastName : ""}`;
        ul.appendChild(li);
      });

    section.appendChild(h2);
    section.appendChild(ul);
    directoryEl.appendChild(section);
  });
});

