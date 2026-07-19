"use client";

import { useState } from "react";

import type {
  MaterialCategory,
  MaterialDraft,
  MaterialItem,
} from "@/models/app";

const categoryOptions: MaterialCategory[] = [
  "Frühstück",
  "Mittagessen",
  "Abendessen",
];

type MaterialFormDialogProps = {
  mode: "create" | "edit";
  initialMaterial?: MaterialItem | null;
  onClose: () => void;
  onSubmit: (values: MaterialDraft) => void;
};

export function MaterialFormDialog({
  mode,
  initialMaterial,
  onClose,
  onSubmit,
}: MaterialFormDialogProps) {
  const [name, setName] = useState(initialMaterial?.name ?? "");
  const [quantity, setQuantity] = useState(String(initialMaterial?.quantity ?? 1));
  const [unit, setUnit] = useState(initialMaterial?.unit ?? "Stück");
  const [expirationDate, setExpirationDate] = useState(
    initialMaterial?.expirationDate ?? "2026-06-15",
  );
  const [storageLocation, setStorageLocation] = useState(
    initialMaterial?.storageLocation ?? "Küche",
  );
  const [categories, setCategories] = useState<MaterialCategory[]>(
    initialMaterial?.categories ?? [],
  );

  function toggleCategory(category: MaterialCategory) {
    setCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((entry) => entry !== category)
        : [...currentCategories, category],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      quantity: Number(quantity),
      unit: unit.trim(),
      expirationDate,
      storageLocation: storageLocation.trim(),
      categories,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-thw-ice bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === "create" ? "Material hinzufügen" : "Material bearbeiten"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-thw-steel">
              Materialien, Mengen, Lagerorte und MHD lokal verwalten.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-thw-steel"
          >
            Schließen
          </button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-foreground">
              <span>Materialname</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-foreground">
              <span>Einheit</span>
              <input
                required
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-foreground">
              <span>Menge</span>
              <input
                required
                min="0"
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-foreground">
              <span>MHD</span>
              <input
                required
                type="date"
                value={expirationDate}
                onChange={(event) => setExpirationDate(event.target.value)}
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Lagerort</span>
            <input
              required
              value={storageLocation}
              onChange={(event) => setStorageLocation(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            />
          </label>

          <fieldset className="space-y-3 rounded-xl border border-thw-ice p-4">
            <legend className="px-1 text-sm font-medium text-foreground">
              Kategorien
            </legend>
            <div className="grid gap-3 md:grid-cols-3">
              {categoryOptions.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 rounded-lg border border-thw-ice px-3 py-3 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 rounded border-thw-ice text-thw-navy"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-thw-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0b4a8d]"
            >
              Speichern
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center rounded-lg border border-thw-ice px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb]"
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}