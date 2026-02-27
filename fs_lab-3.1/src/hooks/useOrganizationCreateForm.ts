import { useState } from "react";
import { useFormInput } from "./useFormInput";
import { organizationService } from "../services/organizationService";
import type { OrganizationRecord } from "../types/organization";

export function useOrganizationCreateForm() {
  const firstNameInput = useFormInput<string>("");
  const lastNameInput = useFormInput<string>("");
  const roleInput = useFormInput<string>("");

  const [created, setCreated] = useState<OrganizationRecord[] | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    firstNameInput.clearMessages();
    lastNameInput.clearMessages();
    roleInput.clearMessages();

    const result = organizationService.tryCreate({
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      role: roleInput.value,
    });

    if (!result.ok) {
      firstNameInput.setMessages(result.errors.firstName ?? []);
      lastNameInput.setMessages(result.errors.lastName ?? []);
      roleInput.setMessages(result.errors.role ?? []);
      setCreated(null);
      return;
    }

    setCreated(result.updated);

    firstNameInput.setValue("");
    lastNameInput.setValue("");
    roleInput.setValue("");
  }

  return {
    firstNameInput,
    lastNameInput,
    roleInput,
    created,
    handleSubmit,
  };
}