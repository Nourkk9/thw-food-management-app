import type { ShoppingItem, ShoppingStatus } from "@/models/app";

import { ShoppingSourceBadge } from "@/components/shopping/shopping-source-badge";
import { ShoppingStatusBadge } from "@/components/shopping/shopping-status-badge";

const statusOptions: ShoppingStatus[] = ["Offen", "Wird besorgt", "Erledigt"];

type ShoppingItemCardProps = {
  item: ShoppingItem;
  onStatusChange: (item: ShoppingItem, status: ShoppingStatus) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (item: ShoppingItem) => void;
};

export function ShoppingItemCard({
  item,
  onStatusChange,
  onEdit,
  onDelete,
}: ShoppingItemCardProps) {
  return (
    <article className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{item.name}</h2>
          <p className="mt-1 text-sm text-thw-steel">
            {item.quantity} {item.unit}
          </p>
        </div>
        <ShoppingStatusBadge status={item.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <ShoppingSourceBadge source={item.source} />
      </div>

      <label className="mt-4 block space-y-2 text-sm font-medium text-foreground">
        <span>Status</span>
        <select
          value={item.status}
          onChange={(event) => onStatusChange(item, event.target.value as ShoppingStatus)}
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