import type { MaterialShoppingItem, MaterialShoppingStatus } from "@/models/app";

import { MaterialShoppingStatusBadge } from "@/components/material-shopping/material-shopping-status-badge";

const statusOptions: MaterialShoppingStatus[] = ["Offen", "Wird besorgt", "Erledigt"];

type MaterialShoppingItemCardProps = {
  item: MaterialShoppingItem;
  onStatusChange: (item: MaterialShoppingItem, status: MaterialShoppingStatus) => void;
  onToggleCompleted: (item: MaterialShoppingItem) => void;
  onEdit: (item: MaterialShoppingItem) => void;
  onDelete: (item: MaterialShoppingItem) => void;
};

export function MaterialShoppingItemCard({
  item,
  onStatusChange,
  onToggleCompleted,
  onEdit,
  onDelete,
}: MaterialShoppingItemCardProps) {
  return (
    <article
      className={`rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)] ${item.status === "Erledigt" ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={item.status === "Erledigt"}
            onChange={() => onToggleCompleted(item)}
            className="mt-1 h-4 w-4 cursor-pointer rounded border-thw-ice accent-thw-navy"
            aria-label={`${item.name} als erledigt markieren`}
          />
          <div>
            <h2
              className={`text-lg font-semibold text-foreground ${item.status === "Erledigt" ? "line-through" : ""}`}
            >
              {item.name}
            </h2>
            <p className="mt-1 text-sm text-thw-steel">
              {item.quantity} {item.unit} · {item.category}
            </p>
            {item.responsiblePerson ? (
              <p className="mt-0.5 text-sm text-thw-steel">
                Zuständig: {item.responsiblePerson}
              </p>
            ) : null}
            {item.note ? (
              <p className="mt-1 text-sm text-thw-steel italic">{item.note}</p>
            ) : null}
          </div>
        </div>
        <MaterialShoppingStatusBadge status={item.status} />
      </div>

      <label className="mt-4 block space-y-2 text-sm font-medium text-foreground">
        <span>Status</span>
        <select
          value={item.status}
          onChange={(event) =>
            onStatusChange(item, event.target.value as MaterialShoppingStatus)
          }
          className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-thw-navy transition-colors hover:border-[#cfe1f2] hover:bg-[#f8fbfe]"
        >
          Bearbeiten
        </button>
        <button
          type="button"
          onClick={() => onDelete(item)}
          className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-[#b42318] transition-colors hover:bg-[#fff6f5]"
        >
          Löschen
        </button>
      </div>
    </article>
  );
}
