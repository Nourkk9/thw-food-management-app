import { Modal } from "@/components/ui/modal";
import type { Recipe } from "@/models/app";

type RecipeDetailDialogProps = {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
  onClose: () => void;
};

export function RecipeDetailDialog({
  recipe,
  onEdit,
  onDelete,
  onClose,
}: RecipeDetailDialogProps) {
  return (
    <Modal
      title={recipe.name}
      description={recipe.description}
      onClose={onClose}
      maxWidthClassName="max-w-3xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-thw-ice bg-[#f9fafb] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
              Kategorie
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{recipe.category}</p>
          </div>
          <div className="rounded-xl border border-thw-ice bg-[#f9fafb] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
              Basis-Personen
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{recipe.basePersons}</p>
          </div>
          <div className="rounded-xl border border-thw-ice bg-[#f9fafb] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-thw-steel">
              Kochzeit
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {recipe.cookingTimeMinutes} Minuten
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-thw-ice p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Zutaten</p>
            {recipe.isVegetarian ? (
              <span className="inline-flex rounded-full bg-[#eef5fb] px-3 py-1 text-xs font-medium text-thw-navy">
                Vegetarisch
              </span>
            ) : null}
          </div>

          <ul className="mt-4 space-y-2 text-sm text-thw-steel">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-thw-ice bg-[#f9fafb] px-3 py-2"
              >
                <span className="font-medium text-foreground">{ingredient.name}</span>
                <span>
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onEdit(recipe)}
            className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-thw-navy transition-colors hover:border-[#cfe1f2] hover:bg-[#f8fbfe]"
          >
            Bearbeiten
          </button>
          <button
            type="button"
            onClick={() => onDelete(recipe)}
            className="inline-flex items-center rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-[#b42318] transition-colors hover:bg-[#fff6f5]"
          >
            Löschen
          </button>
        </div>
      </div>
    </Modal>
  );
}