"use client";

import { useState } from "react";
import { toast } from "sonner";

import { RecipeCard } from "@/components/recipes/recipe-card";
import { RecipeDetailDialog } from "@/components/recipes/recipe-detail-dialog";
import { RecipeFormDialog } from "@/components/recipes/recipe-form-dialog";
import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { useAppStore } from "@/store/useAppStore";
import type { Recipe, RecipeDraft, RecipeFilter } from "@/models/app";

function matchesFilter(recipe: Recipe, filter: RecipeFilter) {
  if (filter === "Alle") {
    return true;
  }

  if (filter === "Vegetarisch") {
    return recipe.isVegetarian;
  }

  if (filter === "Fleisch") {
    const haystack = [
      recipe.name,
      recipe.description,
      ...recipe.ingredients.map((ingredient) => ingredient.name),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes("fleisch");
  }

  return recipe.category === filter;
}

type RecipesModuleProps = {
  filterOptions: RecipeFilter[];
};

export function RecipesModule({ filterOptions }: RecipesModuleProps) {
  const recipes = useAppStore((state) => state.recipes);
  const addRecipe = useAppStore((state) => state.addRecipe);
  const updateRecipe = useAppStore((state) => state.updateRecipe);
  const removeRecipe = useAppStore((state) => state.removeRecipe);
  const addMealToPlan = useAppStore((state) => state.addMealToPlan);
  const addRecipeIngredientsToShoppingList = useAppStore(
    (state) => state.addRecipeIngredientsToShoppingList,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<RecipeFilter>("Alle");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      recipe.name.toLowerCase().includes(normalizedSearch) ||
      recipe.description.toLowerCase().includes(normalizedSearch) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(normalizedSearch),
      );

    return matchesSearch && matchesFilter(recipe, activeFilter);
  });

  function handleCreateRecipe() {
    setSelectedRecipe(null);
    setEditingRecipe(null);
    setFormMode("create");
  }

  function handleEditRecipe(recipe: Recipe) {
    setSelectedRecipe(null);
    setEditingRecipe(recipe);
    setFormMode("edit");
  }

  function handleSaveRecipe(values: RecipeDraft) {
    if (formMode === "edit" && editingRecipe) {
      updateRecipe(editingRecipe.id, values);
      toast.success(`Rezept „${values.name}“ wurde aktualisiert.`);
    } else {
      addRecipe(values);
      toast.success(`Rezept „${values.name}“ wurde erstellt.`);
    }

    setEditingRecipe(null);
    setFormMode(null);
  }

  function handleDeleteRecipe(recipe: Recipe) {
    removeRecipe(recipe.id);
    setSelectedRecipe(null);
    toast.success(`Rezept „${recipe.name}“ wurde gelöscht.`);
  }

  function handleAddToPlan(recipe: Recipe) {
    const placement = addMealToPlan(recipe.id);

    if (!placement) {
      toast.error("Rezept konnte nicht zum Essensplan hinzugefügt werden.");
      return;
    }

    toast.success(
      `Rezept „${recipe.name}“ wurde für ${placement.mealType} am ${placement.date} eingeplant.`,
    );
  }

  function handleAddToCart(recipe: Recipe) {
    const itemCount = addRecipeIngredientsToShoppingList(recipe.id);
    toast.success(`${itemCount} Zutaten für „${recipe.name}“ wurden vorgemerkt.`);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Rezepte"
        subtitle="Rezepte mit Basis-Personenzahl, Zutatenmengen und direkter Planungsanbindung."
      />

      <section className="space-y-4 rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
        <ActionButtons>
          <ActionButton variant="primary" onClick={handleCreateRecipe}>
            Neues Rezept
          </ActionButton>
        </ActionButtons>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rezept oder Zutat suchen..."
            srLabel="Rezept suchen"
          />

          <FilterBar
            options={filterOptions}
            activeValue={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </section>

      {filteredRecipes.length === 0 ? (
        <EmptyState message="Keine Rezepte für die aktuelle Suche oder den gewählten Filter gefunden." />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onShowDetails={setSelectedRecipe}
              onAddToPlan={handleAddToPlan}
              onAddToCart={handleAddToCart}
            />
          ))}
        </section>
      )}

      {selectedRecipe ? (
        <RecipeDetailDialog
          recipe={selectedRecipe}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      ) : null}

      {formMode ? (
        <RecipeFormDialog
          mode={formMode}
          initialRecipe={editingRecipe}
          onClose={() => {
            setEditingRecipe(null);
            setFormMode(null);
          }}
          onSubmit={handleSaveRecipe}
        />
      ) : null}
    </div>
  );
}