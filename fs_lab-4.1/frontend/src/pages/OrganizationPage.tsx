import { useState } from "react";
import AddOrganizationRecordForm from "../components/AddOrganizationRecordForm";
import { organizationRepo } from "../repositories/organizationRepo";
import type { OrganizationRecord } from "../types/organization";

// Initial organization data (moved from page into repo-managed flow)
const initialLeadershipAndManagement: OrganizationRecord[] = [
  { firstName: "Jo-Anne", lastName: "Sinclair", role: "CEO/Chair of Board" },
  { firstName: "Jackson", lastName: "Smith", role: "COO/VP Operations" },
  { firstName: "Susan", lastName: "Thomas", role: "CFO/VP Administration" },
  { firstName: "Richa", lastName: "Kaur", role: "VP Client Services" },
  { firstName: "Josee", lastName: "Benjamin", role: "CIO" },
  { firstName: "Vincent", lastName: "Grey", role: "VP Sales & Marketing" },
  { firstName: "Rupa", lastName: "Kharki", role: "Director Financial and Audit Svcs (she/her/hers)" },
  { firstName: "Xun", lastName: "Kuang", role: "Director Human Resources" },
  { firstName: "Stien", lastName: "Pedersen", role: "Director Legal Services/General Counsel" },
  { firstName: "Sandra", lastName: "Bear", role: "Director Information Technology" },
  { firstName: "Gus", lastName: "Blue", role: "Director Information Security and CISSO" },
  { firstName: "Sam", lastName: "Kong", role: "Director Accounting" },
  { firstName: "Valentine", lastName: "Smith", role: "Director Physical Security" },
  { firstName: "Mariya", lastName: "Kaperski", role: "Director Facilities" },
  { firstName: "Abd", lastName: "al-Hamid Alami", role: "Manager, Business Continuity and Disaster Recovery" },
  { firstName: "Victoria", lastName: "Gray", role: "Manager, Internal Audit" },
  { firstName: "Cheryl", lastName: "Guru", role: "Chief Architect" },
  { firstName: "Jean", lastName: "Ngoy", role: "Manager, Security Architecture" },
  { firstName: "Kris", lastName: "Gold", role: "Solution Architect, Online Banking" },
  { firstName: "Isaac", lastName: "Smith", role: "Manager, Application Solutions" },
  { firstName: "Payton", lastName: "Frost", role: "Lead Developer, Online Banking" },
  { firstName: "Samantha", lastName: "Nettle", role: "Manager, Operational Risk" },
  { firstName: "Yolanda", lastName: "Ferreira", role: "Manager, Vendor Relations" },
  { firstName: "Samir", lastName: "Hassan", role: "Manager, Purchasing" },
  { firstName: "Yuna", lastName: "Aikawa", role: "Manager, Communications" },
  { firstName: "Jonathan", lastName: "Carberry", role: "Manager Customer Experience and Community Eng." },
  { firstName: "Roland", lastName: "Wei", role: "Manager of Sales" },
  { firstName: "Pran", lastName: "Singh", role: "Manager, Marketing" },
  { firstName: "Linda", lastName: "Analyst", role: "Business Analyst, Online Banking" },
  { firstName: "Esra", lastName: "Sedge", role: "Manager, Contract Management" },
  { firstName: "Pranee", lastName: "Tan", role: "Manager, Compliance Management" },
  { firstName: "Karmen", lastName: "Spruce", role: "Manager IT End User Service Desk" },
  { firstName: "Haydar", lastName: "Katirci", role: "Manager IT End User Computing" },
  { firstName: "Jill", lastName: "Harkness", role: "Manager IT Telecom and Infrastructure" },
  { firstName: "Tim", lastName: "Morrison", role: "Manager, Data Center and Hosting Services" },
  { firstName: "Aleksandr", lastName: "Milosevic", role: "Manager of IT Risk Management" },
  { firstName: "Jim", lastName: "Wingnut", role: "Manager IT, project management office" },

  // Vacant roles (still listed on the page)
  { firstName: "Left", lastName: "Vacant", role: "for future expansion" },
  { firstName: "Left", lastName: "Vacant", role: "for future expansion" },
  { firstName: "Left", lastName: "Vacant", role: "for future expansion" },
  { firstName: "Left", lastName: "Vacant", role: "for future expansion" },
  { firstName: "Left", lastName: "Vacant", role: "for future expansion" },
  { firstName: "Left", lastName: "Vacant", role: "for future expansion" },
];

export default function OrganizationPage() {
  // Seed repo once (simple approach for labs)
  const [records, setRecords] = useState<OrganizationRecord[]>(() => {
    const existing = organizationRepo.getAll();
    if (existing.length === 0) {
      // add initial data into repo
      initialLeadershipAndManagement.forEach((r) => {
        organizationRepo.create(r);
      });
      return organizationRepo.getAll();
    }
    return existing;
  });

  return (
    <>
      <h2>Organization</h2>

      <AddOrganizationRecordForm onCreated={setRecords} />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "720px" }}>
        {records.map((person) => {
          const fullName = `${person.firstName} ${person.lastName}`;
          const key = `${person.role}-${fullName}`;

          return (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              <span style={{ fontWeight: 600 }}>{fullName}</span>
              <span>{person.role}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}