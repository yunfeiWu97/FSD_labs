import { useState } from "react";
import TextInputField from "./TextInputField";
import { organizationRepo } from "../repositories/organizationRepo";
import type { OrganizationRecord } from "../types/organization";

type Props = {
  onCreated: () => void;
};

export default function AddOrganizationRecordForm({ onCreated }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");

  const [firstNameMessages, setFirstNameMessages] = useState<string[]>([]);
  const [roleMessages, setRoleMessages] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFirstNameMessages([]);
    setRoleMessages([]);

    const nextFirstNameMessages: string[] = [];
    const nextRoleMessages: string[] = [];

    if (firstName.trim().length < 3) {
      nextFirstNameMessages.push("First name must be at least 3 characters long.");
    }

    if (role.trim().length === 0) {
      nextRoleMessages.push("Role is required.");
    }

    if (nextFirstNameMessages.length > 0 || nextRoleMessages.length > 0) {
      setFirstNameMessages(nextFirstNameMessages);
      setRoleMessages(nextRoleMessages);
      return;
    }

    const roleIsOccupied = await organizationRepo.roleIsOccupied(role);

    if (roleIsOccupied) {
      setRoleMessages(["This role is already assigned."]);
      return;
    }

    const record: OrganizationRecord = {
      firstName,
      lastName,
      role,
    };

    await organizationRepo.create(record);
    await onCreated();

    setFirstName("");
    setLastName("");
    setRole("");
  };

  return (
    <section>
      <h2>Add Role</h2>

      <form onSubmit={handleSubmit}>
        <TextInputField
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          messages={firstNameMessages}
          placeholder="At least 3 characters"
        />

        <TextInputField
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          messages={[]}
        />

        <TextInputField
          label="Role"
          value={role}
          onChange={setRole}
          messages={roleMessages}
          placeholder="Unique role"
        />

        <button type="submit">Add</button>
      </form>
    </section>
  );
}