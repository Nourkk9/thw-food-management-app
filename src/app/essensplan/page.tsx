import { MealPlanModule } from "@/components/meal-plan/meal-plan-module";
import {
  getMealPlanViewOptions,
} from "@/services/mock-data-service";

export default async function EssensplanPage() {
  const viewOptions = await getMealPlanViewOptions();

  return <MealPlanModule viewOptions={viewOptions} />;
}