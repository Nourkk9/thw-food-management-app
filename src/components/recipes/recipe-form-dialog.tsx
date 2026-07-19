"use client";

import { useState } from "react";

import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { Modal } from "@/components/ui/modal";
import type { Ingredient, Recipe, RecipeCategory, RecipeDraft, ShoppingUnit } from "@/models/app";

const categoryOptions: RecipeCategory[] = ["Frühstück", "Mittagessen", "Abendessen"];
const unitOptions: ShoppingUnit[] = ["kg", "g", "Stück", "Liter"];

function createEmptyIngredient(): Ingredient {
  return {
    id: `ingredient-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    quantity: 1,
    unit: "kg",
  };
}

type RecipeFormDialogProps = {
  mode: "create" | "edit";
  initialRecipe?: Recipe | null;
  onClose: () => void;
  onSubmit: (values: RecipeDraft) => void;
};

export function RecipeFormDialog({
  mode,
  initialRecipe,
  onClose,
  onSubmit,
}: RecipeFormDialogProps) {
  const [name, setName] = useState(initialRecipe?.name ?? "");
  const [description, setDescription] = useState(initialRecipe?.description ?? "");
  const [category, setCategory] = useState<RecipeCategory>(
    initialRecipe?.category ?? "Mittagessen",
  );
  const [basePersons, setBasePersons] = useState(String(initialRecipe?.basePersons ?? 10));
  const [cookingTimeMinutes, setCookingTimeMinutes] = useState(
    String(initialRecipe?.cookingTimeMinutes ?? 30),
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialRecipe?.ingredients.length
      ? initialRecipe.ingredients.map((ingredient) => ({ ...ingredient }))
      : [createEmptyIngredient()],
  );
  const [isVegetarian, setIsVegetarian] = useState(initialRecipe?.isVegetarian ?? false);

  function updateIngredient(
    ingredientId: string,
    field: keyof Ingredient,
    value: string | number,
  ) {
    setIngredients((current) =>
      current.map((ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, [field]: value }
          : ingredient,
      ),
    );
  }

  function removeIngredient(ingredientId: string) {
    setIngredients((current) =>
      current.length === 1
        ? current
        : current.filter((ingredient) => ingredient.id !== ingredientId),
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      category,
      basePersons: Number(basePersons),
      cookingTimeMinutes: Number(cookingTimeMinutes),
      isVegetarian,
      ingredients: ingredients
        .map((ingredient) => ({
          ...ingredient,
          name: ingredient.name.trim(),
          quantity: Number(ingredient.quantity),
        }))
        .filter((ingredient) => ingredient.name.length > 0 && ingredient.quantity > 0),
    });
  }

  return (
    <Modal
      title={mode === "create" ? "Neues Rezept" : "Rezept bearbeiten"}
      description="Rezeptdaten mit Basis-Personenzahl und Zutatenmengen lokal pflegen."
      onClose={onClose}
      maxWidthClassName="max-w-4xl"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Name</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Kategorie</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as RecipeCategory)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium text-foreground">
          <span>Beschreibung</span>
          <textarea
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Basis-Personen</span>
            <input
              required
              min="1"
              type="number"
              value={basePersons}
              onChange={(event) => setBasePersons(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Kochzeit in Minuten</span>
            <input
              required
              min="1"
              type="number"
              value={cookingTimeMinutes}
              onChange={(event) => setCookingTimeMinutes(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            />
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Zutaten</p>
              <p className="text-sm text-thw-steel">
                Mengen beziehen sich auf die eingetragene Basis-Personenzahl.
              </p>
            </div>
            <ActionButton type="button" onClick={() => setIngredients((current) => [...current, createEmptyIngredient()])}>
              Zutat hinzufügen
            </ActionButton>
          </div>

          <div className="space-y-3">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="grid gap-3 rounded-xl border border-thw-ice bg-[#f9fafb] p-4 md:grid-cols-[minmax(0,1.6fr)_140px_140px_auto]"
              >
                <label className="space-y-2 text-sm font-medium text-foreground">
                  <span>Name</span>
                  <input
                    required
                    value={ingredient.name}
                    onChange={(event) => updateIngredient(ingredient.id, "name", event.target.value)}
                    className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-foreground">
                  <span>Menge</span>
                  <input
                    required
                    min="0.01"
                    step="0.01"
                    type="number"
                    value={ingredient.quantity}
                    onChange={(event) =>
                      updateIngredient(ingredient.id, "quantity", Number(event.target.value))
                    }
                    className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-foreground">
                  <span>Einheit</span>
                  <select
                    value={ingredient.unit}
                    onChange={(event) =>
                      updateIngredient(ingredient.id, "unit", event.target.value as ShoppingUnit)
                    }
                    className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
                  >
                    {unitOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex items-end">
                  <ActionButton
                    type="button"
                    variant="danger"
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={ingredients.length === 1}
                    className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Entfernen
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-lg border border-thw-ice px-3 py-3 text-sm text-foreground">
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={(event) => setIsVegetarian(event.target.checked)}
            className="h-4 w-4 rounded border-thw-ice text-thw-navy"
          />
          <span>Vegetarisch</span>
        </label>

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