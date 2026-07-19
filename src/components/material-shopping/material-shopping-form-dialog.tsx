"use client";

import { useState } from "react";

import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { Modal } from "@/components/ui/modal";
import type {
  MaterialShoppingCategory,
  MaterialShoppingItem,
  MaterialShoppingItemDraft,
  MaterialShoppingStatus,
  MaterialShoppingUnit,
} from "@/models/app";

type MaterialShoppingFormDialogProps = {
  mode: "create" | "edit";
  initialItem?: MaterialShoppingItem | null;
  categoryOptions: MaterialShoppingCategory[];
  unitOptions: MaterialShoppingUnit[];
  onClose: () => void;
  onSubmit: (values: MaterialShoppingItemDraft) => void;
};

const statusOptions: MaterialShoppingStatus[] = ["Offen", "Wird besorgt", "Erledigt"];

export function MaterialShoppingFormDialog({
  mode,
  initialItem,
  categoryOptions,
  unitOptions,
  onClose,
  onSubmit,
}: MaterialShoppingFormDialogProps) {
  const [name, setName] = useState(initialItem?.name ?? "");
  const [category, setCategory] = useState<MaterialShoppingCategory>(
    initialItem?.category ?? categoryOptions[0],
  );
  const [quantity, setQuantity] = useState(String(initialItem?.quantity ?? 1));
  const [unit, setUnit] = useState<MaterialShoppingUnit>(
    initialItem?.unit ?? unitOptions[0],
  );
  const [status, setStatus] = useState<MaterialShoppingStatus>(
    initialItem?.status ?? "Offen",
  );
  const [responsiblePerson, setResponsiblePerson] = useState(
    initialItem?.responsiblePerson ?? "",
  );
  const [note, setNote] = useState(initialItem?.note ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      category,
      quantity: Number(quantity),
      unit,
      status,
      responsiblePerson: responsiblePerson.trim(),
      note: note.trim() || undefined,
    });
  }

  return (
    <Modal
      title={mode === "create" ? "Material hinzufügen" : "Material bearbeiten"}
      description="Verbrauchsmaterial und Ausrüstung für den Einsatz verwalten."
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="space-y-2 text-sm font-medium text-foreground">
          <span>Materialname</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Kategorie</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as MaterialShoppingCategory)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Zuständige Person</span>
            <input
              required
              value={responsiblePerson}
              onChange={(event) => setResponsiblePerson(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Menge</span>
            <input
              required
              min="0"
              step="1"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Einheit</span>
            <select
              value={unit}
              onChange={(event) => setUnit(event.target.value as MaterialShoppingUnit)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              {unitOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as MaterialShoppingStatus)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium text-foreground">
          <span>Hinweis (optional)</span>
          <textarea
            rows={2}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
          />
        </label>

        <ActionButtons>
          <ActionButton type="button" variant="secondary" onClick={onClose}>
            Abbrechen
          </ActionButton>
          <ActionButton type="submit" variant="primary">
            {mode === "create" ? "Hinzufügen" : "Speichern"}
          </ActionButton>
        </ActionButtons>
      </form>
    </Modal>
  );
}
