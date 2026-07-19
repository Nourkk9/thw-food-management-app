import { RecipesModule } from "@/components/recipes/recipes-module";
import {
  getRecipeFilterOptions,
} from "@/services/mock-data-service";

export default async function RezeptePage() {
  const filterOptions = await getRecipeFilterOptions();

  return <RecipesModule filterOptions={filterOptions} />;
}