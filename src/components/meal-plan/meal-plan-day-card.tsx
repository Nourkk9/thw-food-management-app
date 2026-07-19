import { formatMealPlanDate, mealTypes } from "@/lib/meal-plan";
import type { MealPlanDay, MealType } from "@/models/app";

import { MealSlotCard } from "@/components/meal-plan/meal-slot-card";

type MealPlanDayCardProps = {
  day: MealPlanDay;
  compact?: boolean;
  onSelectRecipe: (date: string, mealType: MealType) => void;
  onEdit: (date: string, mealType: MealType) => void;
  onRemove: (date: string, mealType: MealType) => void;
};

export function MealPlanDayCard({
  day,
  compact = false,
  onSelectRecipe,
  onEdit,
  onRemove,
}: MealPlanDayCardProps) {
  return (
    <article className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{day.dayName}</h2>
        <p className="text-sm text-thw-steel">{formatMealPlanDate(day.date)}</p>
      </div>

      <div className="mt-4 space-y-3">
        {mealTypes.map((mealType) => (
          <MealSlotCard
            key={`${day.date}-${mealType}`}
            date={day.date}
            slot={day.meals[mealType]}
            compact={compact}
            onSelectRecipe={onSelectRecipe}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </div>
    </article>
  );
}