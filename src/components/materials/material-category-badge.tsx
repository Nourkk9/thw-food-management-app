import { CategoryBadge } from "@/components/ui/category-badge";
import { getMaterialCategoryTone } from "@/lib/materials";
import type { MaterialCategory } from "@/models/app";

export function MaterialCategoryBadge({ category }: { category: MaterialCategory }) {
  return <CategoryBadge label={category} toneClassName={getMaterialCategoryTone(category)} />;
}