"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ActivityLogSection } from "@/components/activity/activity-log-section";
import { MealPlanDayCard } from "@/components/meal-plan/meal-plan-day-card";
import { MealPlanFormDialog } from "@/components/meal-plan/meal-plan-form-dialog";
import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { PageHeader } from "@/components/ui/page-header";
import { createEmptyMealSlot } from "@/lib/meal-plan";
import { useAppStore } from "@/store/useAppStore";
import type { MealPlanSlot, MealPlanView, MealType } from "@/models/app";

type FormState = {
  mode: "create" | "edit";
  originalDate: string;
  originalMealType: MealType;
  initialDate: string;
  initialSlot: MealPlanSlot;
};

type MealPlanModuleProps = {
  viewOptions: MealPlanView[];
};

export function MealPlanModule({ viewOptions }: MealPlanModuleProps) {
  const mealPlan = useAppStore((state) => state.mealPlan);
  const recipes = useAppStore((state) => state.recipes);
  const activityLog = useAppStore((state) => state.activityLog);
  const updateMeal = useAppStore((state) => state.updateMeal);
  const removeMeal = useAppStore((state) => state.removeMeal);
  const generateShoppingListFromMealPlan = useAppStore(
    (state) => state.generateShoppingListFromMealPlan,
  );
  const [activeView, setActiveView] = useState<MealPlanView>("Wochenansicht");
  const [selectedDate, setSelectedDate] = useState(mealPlan[0]?.date ?? "");
  const [formState, setFormState] = useState<FormState | null>(null);
  const latestActivityLog = useMemo(() => activityLog.slice(0, 4), [activityLog]);

  const selectedDay =
    mealPlan.find((day) => day.date === selectedDate) ?? mealPlan[0] ?? null;

  function handleOpenForm(
    mode: "create" | "edit",
    date: string,
    mealType: MealType,
  ) {
    const day = mealPlan.find((entry) => entry.date === date);
    const initialSlot = day?.meals[mealType] ?? createEmptyMealSlot(mealType);

    setFormState({
      mode,
      originalDate: date,
      originalMealType: mealType,
      initialDate: date,
      initialSlot,
    });
  }

  function handleSave(values: {
    date: string;
    mealType: MealType;
    recipeId?: string | null;
    recipeName: string;
    persons: number;
    status: MealPlanSlot["status"];
  }) {
    if (!formState) {
      return;
    }

    updateMeal(values, {
      date: formState.originalDate,
      mealType: formState.originalMealType,
    });
    setSelectedDate(values.date);
    toast.success(`Mahlzeit „${values.mealType}“ am ${values.date} wurde gespeichert.`);
    setFormState(null);
  }

  function handleRemove(date: string, mealType: MealType) {
    removeMeal(date, mealType);
    toast.success(`Mahlzeit „${mealType}“ wurde entfernt.`);
  }

  function handleGenerateShoppingList() {
    generateShoppingListFromMealPlan();
    toast.success("Gesamt-Einkaufsliste wurde aus dem Essensplan generiert.");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Essensplan"
        subtitle="Wochenplanung für Montag bis Sonntag mit Rezept, Personenzahl und Status pro Mahlzeit."
      />

      <section className="space-y-4 rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
        <ActionButtons>
          <ActionButton
            variant="primary"
            onClick={() => handleOpenForm("create", selectedDay?.date ?? mealPlan[0].date, "Frühstück")}
          >
            Mahlzeit hinzufügen
          </ActionButton>
          <ActionButton onClick={handleGenerateShoppingList}>
            Gesamt-Einkaufsliste generieren
          </ActionButton>
        </ActionButtons>

        <div className="flex flex-wrap items-center gap-2">
          {viewOptions.map((viewOption) => {
            const active = activeView === viewOption;

            return (
              <button
                key={viewOption}
                type="button"
                onClick={() => setActiveView(viewOption)}
                className={
                  active
                    ? "rounded-lg bg-[#eef5fb] px-3 py-2 text-sm font-medium text-thw-navy"
                    : "rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-thw-steel transition-colors hover:bg-[#f9fafb]"
                }
              >
                {viewOption}
              </button>
            );
          })}
        </div>

        {activeView === "Tagesansicht" ? (
          <label className="block max-w-sm">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Tag auswählen
            </span>
            <select
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
            >
              {mealPlan.map((day) => (
                <option key={day.date} value={day.date}>
                  {day.dayName} - {day.date}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </section>

      {activeView === "Wochenansicht" ? (
        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {mealPlan.map((day) => (
            <MealPlanDayCard
              key={day.date}
              day={day}
              compact
              onSelectRecipe={(date, mealType) => handleOpenForm("create", date, mealType)}
              onEdit={(date, mealType) => handleOpenForm("edit", date, mealType)}
              onRemove={handleRemove}
            />
          ))}
        </section>
      ) : selectedDay ? (
        <section className="space-y-4">
          <MealPlanDayCard
            day={selectedDay}
            onSelectRecipe={(date, mealType) => handleOpenForm("create", date, mealType)}
            onEdit={(date, mealType) => handleOpenForm("edit", date, mealType)}
            onRemove={handleRemove}
          />
        </section>
      ) : null}

      <ActivityLogSection entries={latestActivityLog} />

      {formState ? (
        <MealPlanFormDialog
          mode={formState.mode}
          dayOptions={mealPlan}
          recipeOptions={recipes}
          initialDate={formState.initialDate}
          initialSlot={formState.initialSlot}
          onClose={() => setFormState(null)}
          onSubmit={handleSave}
        />
      ) : null}
    </div>
  );
}