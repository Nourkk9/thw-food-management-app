"use client";

import { useState } from "react";

import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { FormField } from "@/components/ui/form-field";
import { Modal } from "@/components/ui/modal";
import { mealTypes } from "@/lib/meal-plan";
import type {
  MealPlanDay,
  MealPlanDraft,
  MealPlanSlot,
  MealStatus,
  MealType,
  Recipe,
} from "@/models/app";

const statusOptions: MealStatus[] = ["Geplant", "Offen"];

type MealPlanFormDialogProps = {
  mode: "create" | "edit";
  dayOptions: MealPlanDay[];
  recipeOptions: Recipe[];
  initialDate: string;
  initialSlot: MealPlanSlot;
  onClose: () => void;
  onSubmit: (values: MealPlanDraft) => void;
};

export function MealPlanFormDialog({
  mode,
  dayOptions,
  recipeOptions,
  initialDate,
  initialSlot,
  onClose,
  onSubmit,
}: MealPlanFormDialogProps) {
  const [date, setDate] = useState(initialDate);
  const [mealType, setMealType] = useState<MealType>(initialSlot.mealType);
  const [recipeId, setRecipeId] = useState(initialSlot.recipeId ?? "");
  const [persons, setPersons] = useState(String(initialSlot.persons || 100));
  const [status, setStatus] = useState<MealStatus>(initialSlot.status);

  const selectedRecipe = recipeOptions.find((recipe) => recipe.id === recipeId) ?? null;

  function handleRecipeChange(nextRecipeId: string) {
    setRecipeId(nextRecipeId);
    setStatus(nextRecipeId ? "Geplant" : "Offen");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      date,
      mealType,
      recipeId: recipeId || null,
      recipeName: selectedRecipe?.name ?? "",
      persons: Number(persons),
      status: recipeId ? status : "Offen",
    });
  }

  return (
    <Modal
      title={mode === "create" ? "Mahlzeit hinzufügen" : "Mahlzeit bearbeiten"}
      description="Tag, Mahlzeit, Rezept, Personenanzahl und Status für den Wochenplan festlegen."
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Tag">
            <select
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              {dayOptions.map((day) => (
                <option key={day.date} value={day.date}>
                  {day.dayName} - {day.date}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Mahlzeit">
            <select
              value={mealType}
              onChange={(event) => setMealType(event.target.value as MealType)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              {mealTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Rezept">
            <select
              value={recipeId}
              onChange={(event) => handleRecipeChange(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              <option value="">Kein Rezept ausgewählt</option>
              {recipeOptions.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Anzahl Personen">
            <input
              required
              min="1"
              type="number"
              value={persons}
              onChange={(event) => setPersons(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            />
          </FormField>
        </div>

        <FormField label="Status">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as MealStatus)}
            className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            disabled={!recipeId}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>

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