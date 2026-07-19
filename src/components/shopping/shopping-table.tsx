import type { ShoppingItem, ShoppingStatus } from "@/models/app";

import { ShoppingSourceBadge } from "@/components/shopping/shopping-source-badge";
import { ShoppingStatusBadge } from "@/components/shopping/shopping-status-badge";

const statusOptions: ShoppingStatus[] = ["Offen", "Wird besorgt", "Erledigt"];

type ShoppingTableProps = {
  items: ShoppingItem[];
  onStatusChange: (item: ShoppingItem, status: ShoppingStatus) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (item: ShoppingItem) => void;
};

export function ShoppingTable({
  items,
  onStatusChange,
  onEdit,
  onDelete,
}: ShoppingTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-thw-ice bg-white shadow-[var(--shadow-panel)] lg:block">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-thw-ice bg-[#f9fafb] text-left text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
            <th className="px-5 py-4">Artikel</th>
            <th className="px-5 py-4">Menge</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Quelle</th>
            <th className="px-5 py-4">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-thw-ice last:border-b-0">
              <td className="px-5 py-4 font-medium text-foreground">{item.name}</td>
              <td className="px-5 py-4 text-sm text-foreground">
                {item.quantity} {item.unit}
              </td>
              <td className="px-5 py-4">
                <div className="space-y-2">
                  <ShoppingStatusBadge status={item.status} />
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
                </div>
              </td>
              <td className="px-5 py-4">
                <ShoppingSourceBadge source={item.source} />
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