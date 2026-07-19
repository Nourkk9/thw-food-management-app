import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { StatusBadge } from "@/components/ui/status-badge";
import { getMealStatusTone } from "@/lib/meal-plan";
import type { MealPlanSlot, MealType } from "@/models/app";

type MealSlotCardProps = {
  date: string;
  slot: MealPlanSlot;
  compact?: boolean;
  onSelectRecipe: (date: string, mealType: MealType) => void;
  onEdit: (date: string, mealType: MealType) => void;
  onRemove: (date: string, mealType: MealType) => void;
};

export function MealSlotCard({
  date,
  slot,
  compact = false,
  onSelectRecipe,
  onEdit,
  onRemove,
}: MealSlotCardProps) {
  return (
    <div className="rounded-xl border border-thw-ice bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{slot.mealType}</p>
          <p className="text-sm text-thw-steel">
            {slot.recipeName || "Kein Rezept ausgewählt"}
          </p>
          <p className="text-xs text-thw-steel">{slot.persons} Personen</p>
        </div>
        <StatusBadge label={slot.status} toneClassName={getMealStatusTone(slot.status)} />
      </div>

      <ActionButtons className={`mt-4 ${compact ? "" : "sm:flex-nowrap"}`}>
        <ActionButton
          onClick={() => onSelectRecipe(date, slot.mealType)}
          className="text-thw-navy hover:border-[#cfe1f2] hover:bg-[#f8fbfe]"
        >
          {slot.recipeId ? "Anpassen" : "Rezept wählen"}
        </ActionButton>
        <ActionButton onClick={() => onEdit(date, slot.mealType)}>Bearbeiten</ActionButton>
        <ActionButton variant="danger" onClick={() => onRemove(date, slot.mealType)}>
          Leeren
        </ActionButton>
      </ActionButtons>
    </div>
  );
}