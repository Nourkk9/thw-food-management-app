import { cn } from "@/lib/utils";

type FilterBarProps<T extends string> = {
  options: T[];
  activeValue: T;
  onChange: (value: T) => void;
  className?: string;
};

export function FilterBar<T extends string>({
  options,
  activeValue,
  onChange,
  className,
}: FilterBarProps<T>) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const active = option === activeValue;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-[#eef5fb] text-thw-navy"
                : "border border-thw-ice bg-white text-thw-steel hover:bg-[#f9fafb]",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}