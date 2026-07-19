import type { MaterialShoppingItem, MaterialShoppingStatus } from "@/models/app";

import { MaterialShoppingStatusBadge } from "@/components/material-shopping/material-shopping-status-badge";

const statusOptions: MaterialShoppingStatus[] = ["Offen", "Wird besorgt", "Erledigt"];

type MaterialShoppingTableProps = {
  items: MaterialShoppingItem[];
  onStatusChange: (item: MaterialShoppingItem, status: MaterialShoppingStatus) => void;
  onToggleCompleted: (item: MaterialShoppingItem) => void;
  onEdit: (item: MaterialShoppingItem) => void;
  onDelete: (item: MaterialShoppingItem) => void;
};

export function MaterialShoppingTable({
  items,
  onStatusChange,
  onToggleCompleted,
  onEdit,
  onDelete,
}: MaterialShoppingTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-thw-ice bg-white shadow-[var(--shadow-panel)] lg:block">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-thw-ice bg-[#f9fafb] text-left text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
            <th className="px-5 py-4">Erledigt</th>
            <th className="px-5 py-4">Material</th>
            <th className="px-5 py-4">Kategorie</th>
            <th className="px-5 py-4">Menge</th>
            <th className="px-5 py-4">Zuständig</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={`border-b border-thw-ice last:border-b-0 ${item.status === "Erledigt" ? "opacity-60" : ""}`}
            >
              <td className="px-5 py-4">
                <input
                  type="checkbox"
                  checked={item.status === "Erledigt"}
                  onChange={() => onToggleCompleted(item)}
                  className="h-4 w-4 cursor-pointer rounded border-thw-ice accent-thw-navy"
                  aria-label={`${item.name} als erledigt markieren`}
                />
              </td>
              <td className="px-5 py-4">
                <div>
                  <p className={`font-medium text-foreground ${item.status === "Erledigt" ? "line-through" : ""}`}>
                    {item.name}
                  </p>
                  {item.note ? (
                    <p className="mt-0.5 text-xs text-thw-steel">{item.note}</p>
                  ) : null}
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-foreground">{item.category}</td>
              <td className="px-5 py-4 text-sm text-foreground">
                {item.quantity} {item.unit}
              </td>
              <td className="px-5 py-4 text-sm text-foreground">{item.responsiblePerson}</td>
              <td className="px-5 py-4">
                <div className="space-y-2">
                  <MaterialShoppingStatusBadge status={item.status} />
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
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
