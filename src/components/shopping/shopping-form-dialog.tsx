"use client";

import { useState } from "react";

import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { Modal } from "@/components/ui/modal";
import type { ShoppingItem, ShoppingItemDraft, ShoppingStatus, ShoppingUnit } from "@/models/app";

type ShoppingFormDialogProps = {
  mode: "create" | "edit";
  initialItem?: ShoppingItem | null;
  unitOptions: ShoppingUnit[];
  onClose: () => void;
  onSubmit: (values: ShoppingItemDraft) => void;
};

const statusOptions: ShoppingStatus[] = ["Offen", "Wird besorgt", "Erledigt"];

export function ShoppingFormDialog({
  mode,
  initialItem,
  unitOptions,
  onClose,
  onSubmit,
}: ShoppingFormDialogProps) {
  const [name, setName] = useState(initialItem?.name ?? "");
  const [quantity, setQuantity] = useState(String(initialItem?.quantity ?? 1));
  const [unit, setUnit] = useState<ShoppingUnit>(initialItem?.unit ?? unitOptions[0]);
  const [status, setStatus] = useState<ShoppingStatus>(initialItem?.status ?? "Offen");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      quantity: Number(quantity),
      unit,
      status,
      source: initialItem?.manualQuantity === 0 ? initialItem.source : "Manuell",
    });
  }

  return (
    <Modal
      title={mode === "create" ? "Artikel hinzufügen" : "Artikel bearbeiten"}
      description="Artikel, Menge, Einheit und Status lokal verwalten."
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="space-y-2 text-sm font-medium text-foreground">
          <span>Artikelname</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-3">
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Menge</span>
            <input
              required
              min="0"
              step="0.01"
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
              onChange={(event) => setUnit(event.target.value as ShoppingUnit)}
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
              onChange={(event) => setStatus(event.target.value as ShoppingStatus)}
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

        <ActionButtons>
          <ActionButton type="submit" variant="primary">
            Speichern
          </ActionButton>
          <ActionButton onClick={onClose}>Abbrechen</ActionButton>
        </ActionButtons>
      </form>
    </Modal>
  );
}