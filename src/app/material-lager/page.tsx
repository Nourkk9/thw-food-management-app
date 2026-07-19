import { MaterialsModule } from "@/components/materials/materials-module";
import {
  getMaterialCategoryFilterOptions,
  getMaterialStatusFilterOptions,
} from "@/services/mock-data-service";

export default async function MaterialLagerPage() {
  const [categoryFilterOptions, statusFilterOptions] = await Promise.all([
    getMaterialCategoryFilterOptions(),
    getMaterialStatusFilterOptions(),
  ]);

  return (
    <MaterialsModule
      categoryFilterOptions={categoryFilterOptions}
      statusFilterOptions={statusFilterOptions}
    />
  );
}