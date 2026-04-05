type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  messages: string[];
  placeholder?: string;
};

export default function TextInputField({ label, value, onChange, messages, placeholder }: Props) {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {messages.map((m) => (
        <p key={m}>{m}</p>
      ))}
    </label>
  );
}