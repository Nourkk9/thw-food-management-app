export type IconName =
  | "dashboard"
  | "recipes"
  | "inventory"
  | "shopping"
  | "mealplan"
  | "receipt"
  | "team"
  | "profile"
  | "menu"
  | "close"
  | "arrow-right";

export type ModuleKey =
  | "dashboard"
  | "rezepte"
  | "material-lager"
  | "einkaufsliste"
  | "essensplan"
  | "material-einkaufsliste"
  | "personal";

export type NavItem = {
  title: string;
  href: string;
  description: string;
  icon: IconName;
};

export type ModuleSummary = NavItem & {
  cta: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  helper: string;
  tone: "neutral" | "info" | "accent";
};

export type ContentEntry = {
  title: string;
  subtitle: string;
  meta: string;
  status: string;
};

export type ContentSection = {
  title: string;
  description: string;
  entries: ContentEntry[];
};

export type Highlight = {
  label: string;
  value: string;
  helper: string;
};

export type ModulePageContent = {
  title: string;
  icon: IconName;
  intro: string;
  ctaTitle: string;
  ctaDescription: string;
  highlights: Highlight[];
  sections: ContentSection[];
};

export type RecipeCategory = "Frühstück" | "Mittagessen" | "Abendessen";

export type RecipeFilter =
  | "Alle"
  | "Fleisch"
  | "Vegetarisch"
  | RecipeCategory;

export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: ShoppingUnit;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  basePersons: number;
  cookingTimeMinutes: number;
  ingredients: Ingredient[];
  isVegetarian: boolean;
};

export type RecipeDraft = Omit<Recipe, "id">;

export type MaterialCategory = RecipeCategory;

export type MaterialCategoryFilter = "Alle" | MaterialCategory;

export type MaterialStatus = "Gültig" | "Läuft bald ab" | "Abgelaufen";

export type MaterialStatusFilter = "Alle" | MaterialStatus;

export type MaterialItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
  storageLocation: string;
  categories: MaterialCategory[];
};

export type MaterialDraft = Omit<MaterialItem, "id">;

export type ShoppingUnit = "kg" | "g" | "Stück" | "Liter";

export type ShoppingStatus = "Offen" | "Wird besorgt" | "Erledigt";

export type ShoppingSource = "Manuell" | "Essensplan";

export type ShoppingItemFilter = "Alle" | ShoppingStatus;

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  unit: ShoppingUnit;
  status: ShoppingStatus;
  source: ShoppingSource;
  manualQuantity: number;
  generatedQuantity: number;
};

export type ShoppingItemDraft = {
  name: string;
  quantity: number;
  unit: ShoppingUnit;
  status: ShoppingStatus;
  source?: ShoppingSource;
};

export type MealType = RecipeCategory;

export type MealStatus = "Geplant" | "Offen";

export type MealPlanView = "Tagesansicht" | "Wochenansicht";

export type MealPlanSlot = {
  mealType: MealType;
  recipeId?: string | null;
  recipeName: string;
  persons: number;
  status: MealStatus;
};

export type MealPlanDay = {
  date: string;
  dayName: string;
  meals: Record<MealType, MealPlanSlot>;
};

export type MealPlanDraft = {
  date: string;
  mealType: MealType;
  recipeId?: string | null;
  recipeName: string;
  persons: number;
  status: MealStatus;
};

export type ActivityLogEntry = {
  id: string;
  message: string;
  createdAt: string;
};

export type MaterialShoppingCategory =
  | "Reinigungsmittel"
  | "Küchenartikel"
  | "Schutzausrüstung"
  | "Gas"
  | "Textilien"
  | "Sonstiges";

export type MaterialShoppingCategoryFilter = "Alle" | MaterialShoppingCategory;

export type MaterialShoppingStatus = "Offen" | "Wird besorgt" | "Erledigt";

export type MaterialShoppingStatusFilter = "Alle" | MaterialShoppingStatus;

export type MaterialShoppingUnit =
  | "Stück"
  | "Packung"
  | "Liter"
  | "kg"
  | "Rolle"
  | "Paar";

export type MaterialShoppingItem = {
  id: string;
  name: string;
  category: MaterialShoppingCategory;
  quantity: number;
  unit: MaterialShoppingUnit;
  status: MaterialShoppingStatus;
  responsiblePerson: string;
  note?: string;
};

export type MaterialShoppingItemDraft = Omit<MaterialShoppingItem, "id">;

export type UserRole = "Helfer" | "Verwaltung" | "Admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
};