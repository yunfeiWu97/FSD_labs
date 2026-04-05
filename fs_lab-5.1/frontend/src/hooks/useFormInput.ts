import { useState } from "react";

export type ValidationResult = {
  isValid: boolean;
  messages: string[];
};

export type Validator<T> = (value: T) => ValidationResult;

export function useFormInput<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  function onChange(nextValue: T): void {
    setValue(nextValue);
  }

  function validate(validator: Validator<T>): ValidationResult {
    const result = validator(value);
    setMessages(result.messages);
    return result;
  }

  function clearMessages(): void {
    setMessages([]);
  }

  return {
    value,
    setValue,
    messages,
    setMessages,
    onChange,
    validate,
    clearMessages,
  };
}
