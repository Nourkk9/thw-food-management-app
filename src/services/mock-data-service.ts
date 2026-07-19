import {
  dashboardMetrics,
  dashboardModules,
  dashboardSections,
  materialCategoryFilterOptions,
  materials,
  materialStatusFilterOptions,
  mealPlanDays,
  mealPlanViewOptions,
  modulePages,
  recipeFilterOptions,
  recipes,
  shoppingItemFilterOptions,
  shoppingItems,
  shoppingUnitOptions,
} from "@/data/mock-data";
import type {
  ContentSection,
  DashboardMetric,
  MaterialCategoryFilter,
  MaterialItem,
  MaterialStatusFilter,
  MealPlanDay,
  MealPlanView,
  ModuleKey,
  ModulePageContent,
  ModuleSummary,
  Recipe,
  RecipeFilter,
  ShoppingItem,
  ShoppingItemFilter,
  ShoppingUnit,
} from "@/models/app";

export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  return dashboardMetrics;
}

export async function getDashboardModules(): Promise<ModuleSummary[]> {
  return dashboardModules;
}

export async function getDashboardSections(): Promise<ContentSection[]> {
  return dashboardSections;
}

export async function getModulePageContent(
  key: Exclude<ModuleKey, "dashboard">,
): Promise<ModulePageContent> {
  return modulePages[key];
}

export async function getRecipes(): Promise<Recipe[]> {
  return recipes;
}

export async function getRecipeFilterOptions(): Promise<RecipeFilter[]> {
  return recipeFilterOptions;
}

export async function getMaterials(): Promise<MaterialItem[]> {
  return materials;
}

export async function getMaterialCategoryFilterOptions(): Promise<MaterialCategoryFilter[]> {
  return materialCategoryFilterOptions;
}

export async function getMaterialStatusFilterOptions(): Promise<MaterialStatusFilter[]> {
  return materialStatusFilterOptions;
}

export async function getShoppingItems(): Promise<ShoppingItem[]> {
  return shoppingItems;
}

export async function getShoppingItemFilterOptions(): Promise<ShoppingItemFilter[]> {
  return shoppingItemFilterOptions;
}

export async function getShoppingUnitOptions(): Promise<ShoppingUnit[]> {
  return shoppingUnitOptions;
}

export async function getMealPlanDays(): Promise<MealPlanDay[]> {
  return mealPlanDays;
}

export async function getMealPlanViewOptions(): Promise<MealPlanView[]> {
  return mealPlanViewOptions;
}
