import type { Role } from "../types/Role";

const leadershipAndManagement: Role[] = [
  // TODO: Replace with Leadership & Management data from case study (pg. 15)
  { firstName: "First", lastName: "Last", role: "Role Title" },
];

export default function OrganizationPage() {
  return (
    <>
      <h2>Organization</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "720px" }}>
        {leadershipAndManagement.map((person) => {
          const fullName = `${person.firstName} ${person.lastName}`;

          return (
            <div
              key={fullName}
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
