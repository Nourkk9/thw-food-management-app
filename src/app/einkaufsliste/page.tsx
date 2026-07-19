import { ShoppingListModule } from "@/components/shopping/shopping-list-module";
import {
  getShoppingItemFilterOptions,
  getShoppingUnitOptions,
} from "@/services/mock-data-service";

export default async function EinkaufslistePage() {
  const [filterOptions, unitOptions] = await Promise.all([
    getShoppingItemFilterOptions(),
    getShoppingUnitOptions(),
  ]);

  return (
    <ShoppingListModule
      filterOptions={filterOptions}
      unitOptions={unitOptions}
    />
  );
}