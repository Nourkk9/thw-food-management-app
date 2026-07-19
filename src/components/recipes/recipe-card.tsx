import type { Ingredient, Recipe } from "@/models/app";

function previewList(items: Ingredient[]) {
  const preview = items.slice(0, 3).map(
    (ingredient) => `${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`,
  );

  if (items.length <= 3) {
    return preview.join(", ");
  }

  return `${preview.join(", ")} ...`;
}

type RecipeCardProps = {
  recipe: Recipe;
  onShowDetails: (recipe: Recipe) => void;
  onAddToPlan: (recipe: Recipe) => void;
  onAddToCart: (recipe: Recipe) => void;
};

export function RecipeCard({
  recipe,
  onShowDetails,
  onAddToPlan,
  onAddToCart,
}: RecipeCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{recipe.name}</h2>
          <p className="text-sm leading-6 text-thw-steel">{recipe.description}</p>
        </div>
        {recipe.isVegetarian ? (
          <span className="inline-flex rounded-full bg-[#eef5fb] px-3 py-1 text-xs font-medium text-thw-navy">
            Vegetarisch
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-thw-steel">
        <span className="rounded-full bg-[#f9fafb] px-3 py-1">{recipe.category}</span>
        <span className="rounded-full bg-[#f9fafb] px-3 py-1">
          Basis: {recipe.basePersons} Personen
        </span>
        <span className="rounded-full bg-[#f9fafb] px-3 py-1">
          {recipe.cookingTimeMinutes} Min.
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
          Zutaten
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground">
          {previewList(recipe.ingredients)}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onShowDetails(recipe)}
          className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-thw-navy transition-colors hover:border-[#cfe1f2] hover:bg-[#f8fbfe]"
        >
          Details
        </button>
        <button
          type="button"
          onClick={() => onAddToPlan(recipe)}
          className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb]"
        >
          Zum Plan hinzufügen
        </button>
        <button
          type="button"
          onClick={() => onAddToCart(recipe)}
          className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb]"
        >
          Zutaten vormerken
        </button>
      </div>
    </article>
  );
}