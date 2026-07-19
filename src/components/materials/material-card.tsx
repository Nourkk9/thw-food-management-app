import {
  formatMaterialDate,
  getMaterialStatus,
} from "@/lib/materials";
import type { MaterialItem } from "@/models/app";

import { MaterialCategoryBadge } from "@/components/materials/material-category-badge";
import { MaterialStatusBadge } from "@/components/materials/material-status-badge";

type MaterialCardProps = {
  material: MaterialItem;
  onEdit: (material: MaterialItem) => void;
  onDelete: (material: MaterialItem) => void;
};

export function MaterialCard({
  material,
  onEdit,
  onDelete,
}: MaterialCardProps) {
  const status = getMaterialStatus(material.expirationDate);

  return (
    <article className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{material.name}</h2>
          <p className="mt-1 text-sm text-thw-steel">{material.storageLocation}</p>
        </div>
        <MaterialStatusBadge status={status} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
            Menge
          </p>
          <p className="mt-1 text-sm text-foreground">
            {material.quantity} {material.unit}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
            MHD
          </p>
          <p className="mt-1 text-sm text-foreground">
            {formatMaterialDate(material.expirationDate)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
          Kategorien
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {material.categories.map((category) => (
            <MaterialCategoryBadge key={category} category={category} />
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
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
    </article>
  );
}