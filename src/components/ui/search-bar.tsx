type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  srLabel: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder,
  srLabel,
}: SearchBarProps) {
  return (
    <label className="block w-full">
      <span className="sr-only">{srLabel}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
      />
    </label>
  );
}