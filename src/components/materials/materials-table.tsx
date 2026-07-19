import {
  formatMaterialDate,
  getMaterialStatus,
} from "@/lib/materials";
import type { MaterialItem } from "@/models/app";

import { MaterialCategoryBadge } from "@/components/materials/material-category-badge";
import { MaterialStatusBadge } from "@/components/materials/material-status-badge";

type MaterialsTableProps = {
  materials: MaterialItem[];
  onEdit: (material: MaterialItem) => void;
  onDelete: (material: MaterialItem) => void;
};

export function MaterialsTable({
  materials,
  onEdit,
  onDelete,
}: MaterialsTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-thw-ice bg-white shadow-[var(--shadow-panel)] lg:block">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-thw-ice bg-[#f9fafb] text-left text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
            <th className="px-5 py-4">Material</th>
            <th className="px-5 py-4">Menge</th>
            <th className="px-5 py-4">MHD</th>
            <th className="px-5 py-4">Lagerort</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Kategorien</th>
            <th className="px-5 py-4">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => {
            const status = getMaterialStatus(material.expirationDate);

            return (
              <tr key={material.id} className="border-b border-thw-ice last:border-b-0">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-foreground">{material.name}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-foreground">
                  {material.quantity} {material.unit}
                </td>
                <td className="px-5 py-4 text-sm text-foreground">
                  {formatMaterialDate(material.expirationDate)}
                </td>
                <td className="px-5 py-4 text-sm text-foreground">
                  {material.storageLocation}
                </td>
                <td className="px-5 py-4">
                  <MaterialStatusBadge status={status} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {material.categories.map((category) => (
                      <MaterialCategoryBadge key={category} category={category} />
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(material)}
                      className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-thw-navy transition-colors hover:border-[#cfe1f2] hover:bg-[#f8fbfe]"
                    >
                      Bearbeiten
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(material)}
                      className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-[#b42318] transition-colors hover:bg-[#fff6f5]"
                    >
                      Löschen
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}