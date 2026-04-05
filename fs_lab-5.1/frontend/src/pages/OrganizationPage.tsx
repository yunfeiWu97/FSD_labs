import { SignedIn, SignedOut, SignInButton } from "@clerk/react";
import { useEffect, useState } from "react";
import AddOrganizationRecordForm from "../components/AddOrganizationRecordForm";
import { organizationRepo } from "../repositories/organizationRepo";
import type { OrganizationRecord } from "../types/organization";

export default function OrganizationPage() {
  const [records, setRecords] = useState<OrganizationRecord[]>([]);

  useEffect(() => {
    async function loadOrganizationRecords() {
      try {
        const loadedRecords = await organizationRepo.getAll();
        setRecords(loadedRecords);
      } catch (error) {
        console.error(error);
      }
    }

    void loadOrganizationRecords();
  }, []);

  async function handleOrganizationRecordsUpdated() {
    try {
      const updatedRecords = await organizationRepo.getAll();
      setRecords(updatedRecords);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Organization</h2>

      <SignedIn>
        <AddOrganizationRecordForm onCreated={handleOrganizationRecordsUpdated} />
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
          <p style={{ marginTop: 0 }}>You must be logged in to create a new organization entry.</p>
          <SignInButton mode="modal">
            <button type="button">Log In</button>
          </SignInButton>
        </div>
      </SignedOut>

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