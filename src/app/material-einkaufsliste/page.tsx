import { MaterialShoppingModule } from "@/components/material-shopping/material-shopping-module";
import {
  getMaterialShoppingCategoryFilterOptions,
  getMaterialShoppingStatusFilterOptions,
  getMaterialShoppingUnitOptions,
} from "@/services/mock-data-service";
import type { MaterialShoppingCategory } from "@/models/app";

const categoryOptions: MaterialShoppingCategory[] = [
  "Reinigungsmittel",
  "Küchenartikel",
  "Schutzausrüstung",
  "Gas",
  "Textilien",
  "Sonstiges",
];

export default async function MaterialEinkaufslistePage() {
  const [categoryFilterOptions, statusFilterOptions, unitOptions] = await Promise.all([
    getMaterialShoppingCategoryFilterOptions(),
    getMaterialShoppingStatusFilterOptions(),
    getMaterialShoppingUnitOptions(),
  ]);

  return (
    <MaterialShoppingModule
      categoryOptions={categoryOptions}
      categoryFilterOptions={categoryFilterOptions}
      statusFilterOptions={statusFilterOptions}
      unitOptions={unitOptions}
    />
  );
}
