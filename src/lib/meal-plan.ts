import type {
  MealPlanDay,
  MealPlanSlot,
  MealStatus,
  MealType,
} from "@/models/app";

export const mealTypes: MealType[] = [
  "Frühstück",
  "Mittagessen",
  "Abendessen",
];

const dayNameMap = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

const statusToneMap: Record<MealStatus, string> = {
  Geplant: "bg-[#eef5fb] text-thw-navy",
  Offen: "bg-[#f9fafb] text-thw-steel",
};

export function createEmptyMealSlot(mealType: MealType): MealPlanSlot {
  return {
    mealType,
    recipeId: null,
    recipeName: "",
    persons: 100,
    status: "Offen",
  };
}

export function getMealStatusTone(status: MealStatus) {
  return statusToneMap[status];
}

export function formatMealPlanDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function getDayNameFromDate(date: string) {
  const weekday = new Date(date).getDay();
  return dayNameMap[weekday];
}

export function getDayLabel(day: MealPlanDay) {
  return `${day.dayName}, ${formatMealPlanDate(day.date)}`;
}