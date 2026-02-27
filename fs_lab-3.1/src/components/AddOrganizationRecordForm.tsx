import { useEffect } from "react";
import TextInputField from "./TextInputField";
import { useOrganizationCreateForm } from "../hooks/useOrganizationCreateForm";
import type { OrganizationRecord } from "../types/organization";

type Props = {
  onCreated: (updatedRecords: OrganizationRecord[]) => void;
};

export default function AddOrganizationRecordForm({ onCreated }: Props) {
  const { firstNameInput, lastNameInput, roleInput, created, handleSubmit } =
    useOrganizationCreateForm();

  useEffect(() => {
    if (created) {
      onCreated(created);
    }
  }, [created, onCreated]);

  return (
    <section>
      <h2>Add Role</h2>

      <form onSubmit={handleSubmit}>
        <TextInputField
          label="First Name"
          value={firstNameInput.value}
          onChange={firstNameInput.onChange}
          messages={firstNameInput.messages}
          placeholder="At least 3 characters"
        />

        <TextInputField
          label="Last Name"
          value={lastNameInput.value}
          onChange={lastNameInput.onChange}
          messages={lastNameInput.messages}
        />

        <TextInputField
          label="Role"
          value={roleInput.value}
          onChange={roleInput.onChange}
          messages={roleInput.messages}
          placeholder="Unique role"
        />

        <button type="submit">Add</button>
      </form>
    </section>
  );
}