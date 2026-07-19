import { create } from "zustand";

import {
  activityLogEntries as mockActivityLogEntries,
  materialShoppingItems as mockMaterialShoppingItems,
  materials as mockMaterials,
  mealPlanDays as mockMealPlanDays,
  recipes as mockRecipes,
  shoppingItems as mockShoppingItems,
} from "@/data/mock-data";
import { createEmptyMealSlot, mealTypes } from "@/lib/meal-plan";
import { normalizeShoppingQuantity, roundShoppingQuantity } from "@/lib/shopping";
import type {
  ActivityLogEntry,
  MaterialDraft,
  MaterialItem,
  MaterialShoppingItem,
  MaterialShoppingItemDraft,
  MaterialShoppingStatus,
  MealPlanDay,
  MealPlanDraft,
  MealPlanSlot,
  MealType,
  Recipe,
  RecipeDraft,
  ShoppingItem,
  ShoppingItemDraft,
  ShoppingSource,
  ShoppingStatus,
  ShoppingUnit,
} from "@/types";

type MealPlanPlacement = {
  date: string;
  mealType: MealType;
  recipeName: string;
};

type PreviousMealPlanSlot = {
  date: string;
  mealType: MealType;
};

type AppStore = {
  recipes: Recipe[];
  materials: MaterialItem[];
  materialShoppingItems: MaterialShoppingItem[];
  shoppingItems: ShoppingItem[];
  mealPlan: MealPlanDay[];
  activityLog: ActivityLogEntry[];
  resetMockData: () => void;
  addRecipe: (values: RecipeDraft) => Recipe;
  updateRecipe: (recipeId: string, values: RecipeDraft) => void;
  removeRecipe: (recipeId: string) => void;
  addMaterial: (values: MaterialDraft) => MaterialItem;
  updateMaterial: (materialId: string, values: MaterialDraft) => void;
  removeMaterial: (materialId: string) => void;
  addMaterialShoppingItem: (values: MaterialShoppingItemDraft) => MaterialShoppingItem;
  updateMaterialShoppingItem: (itemId: string, values: MaterialShoppingItemDraft) => void;
  updateMaterialShoppingItemStatus: (itemId: string, status: MaterialShoppingStatus) => void;
  removeMaterialShoppingItem: (itemId: string) => void;
  addMealToPlan: (recipeId: string) => MealPlanPlacement | null;
  updateMeal: (values: MealPlanDraft, previousSlot?: PreviousMealPlanSlot) => void;
  removeMeal: (date: string, mealType: MealType) => void;
  generateShoppingListFromMealPlan: () => number;
  addShoppingItem: (values: ShoppingItemDraft) => void;
  updateShoppingItem: (itemId: string, values: ShoppingItemDraft) => void;
  updateShoppingItemStatus: (itemId: string, status: ShoppingStatus) => void;
  removeShoppingItem: (itemId: string) => void;
  addActivityLogEntry: (message: string) => void;
  addRecipeIngredientsToShoppingList: (recipeId: string) => number;
};

type ShoppingAccumulator = {
  name: string;
  unit: ShoppingUnit;
  quantity: number;
};

function cloneRecipes(): Recipe[] {
  return mockRecipes.map((recipe) => ({
    ...recipe,
    ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient })),
  }));
}

function cloneMaterials(): MaterialItem[] {
  return mockMaterials.map((material) => ({
    ...material,
    categories: [...material.categories],
  }));
}

function cloneMaterialShoppingItems(): MaterialShoppingItem[] {
  return mockMaterialShoppingItems.map((item) => ({ ...item }));
}

function cloneShoppingItems(): ShoppingItem[] {
  return mockShoppingItems.map((item) => ({ ...item }));
}

function cloneMealPlanDays(): MealPlanDay[] {
  return mockMealPlanDays.map((day) => ({
    ...day,
    meals: {
      Frühstück: { ...day.meals.Frühstück },
      Mittagessen: { ...day.meals.Mittagessen },
      Abendessen: { ...day.meals.Abendessen },
    },
  }));
}

function cloneActivityLogEntries(): ActivityLogEntry[] {
  return mockActivityLogEntries.map((entry) => ({ ...entry }));
}

function createEntityId(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

function updateMealPlanDays(
  days: MealPlanDay[],
  date: string,
  mealType: MealType,
  slot: MealPlanSlot,
) {
  return days.map((day) => {
    if (day.date !== date) {
      return day;
    }

    return {
      ...day,
      meals: {
        ...day.meals,
        [mealType]: slot,
      },
    };
  });
}

function clearMealPlanDays(days: MealPlanDay[], date: string, mealType: MealType) {
  return updateMealPlanDays(days, date, mealType, createEmptyMealSlot(mealType));
}

function findFirstPlacement(days: MealPlanDay[], mealType: MealType) {
  for (const day of days) {
    const slot = day.meals[mealType];

    if (slot.status === "Offen" || !slot.recipeId) {
      return { date: day.date, mealType };
    }
  }

  for (const day of days) {
    for (const currentMealType of mealTypes) {
      const slot = day.meals[currentMealType];

      if (slot.status === "Offen" || !slot.recipeId) {
        return { date: day.date, mealType: currentMealType };
      }
    }
  }

  return days[0]
    ? {
        date: days[0].date,
        mealType,
      }
    : null;
}

function getMealLabel(date: string, mealType: MealType, mealPlan: MealPlanDay[]) {
  const day = mealPlan.find((entry) => entry.date === date);
  return `${day?.dayName ?? date} ${mealType}`;
}

function createInitialState() {
  return {
    recipes: cloneRecipes(),
    materials: cloneMaterials(),
    materialShoppingItems: cloneMaterialShoppingItems(),
    shoppingItems: cloneShoppingItems(),
    mealPlan: cloneMealPlanDays(),
    activityLog: cloneActivityLogEntries(),
  };
}

function buildShoppingItem(
  values: ShoppingItemDraft,
  generatedQuantity = 0,
  source: ShoppingSource = values.source ?? "Manuell",
): ShoppingItem {
  const manualQuantity = source === "Manuell" ? normalizeShoppingQuantity(values.quantity) : 0;

  return {
    id: createEntityId(values.name),
    name: values.name.trim(),
    quantity: normalizeShoppingQuantity(values.quantity),
    unit: values.unit,
    status: values.status,
    source,
    manualQuantity,
    generatedQuantity,
  };
}

function mergeManualShoppingItem(
  items: ShoppingItem[],
  values: ShoppingItemDraft,
): ShoppingItem[] {
  const normalizedName = normalizeName(values.name);
  const existingIndex = items.findIndex(
    (item) => normalizeName(item.name) === normalizedName && item.unit === values.unit,
  );

  if (existingIndex === -1) {
    return [buildShoppingItem(values), ...items];
  }

  return items.map((item, index) => {
    if (index !== existingIndex) {
      return item;
    }

    const manualQuantity = normalizeShoppingQuantity(item.manualQuantity + values.quantity);
    const generatedQuantity = item.generatedQuantity;

    return {
      ...item,
      quantity: roundShoppingQuantity(manualQuantity + generatedQuantity),
      manualQuantity,
      status: values.status,
      source: generatedQuantity > 0 ? ("Essensplan" as const) : ("Manuell" as const),
    };
  });
}

function recalculateGeneratedItems(
  items: ShoppingItem[],
  aggregatedIngredients: ShoppingAccumulator[],
) {
  const resetItems: Array<ShoppingItem | null> = items.map((item) => {
      const manualQuantity = item.manualQuantity;

      if (manualQuantity === 0 && item.generatedQuantity > 0) {
        return null;
      }

      return {
        ...item,
        quantity: roundShoppingQuantity(manualQuantity),
        generatedQuantity: 0,
        source: "Manuell" as const,
      };
    });

  let nextItems = resetItems
    .filter((item): item is ShoppingItem => item !== null && item.quantity > 0);

  aggregatedIngredients.forEach((ingredient) => {
    const existingIndex = nextItems.findIndex(
      (item) =>
        normalizeName(item.name) === normalizeName(ingredient.name) && item.unit === ingredient.unit,
    );

    if (existingIndex === -1) {
      nextItems = [
        {
          id: createEntityId(ingredient.name),
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: roundShoppingQuantity(ingredient.quantity),
          status: "Offen",
          source: "Essensplan",
          manualQuantity: 0,
          generatedQuantity: roundShoppingQuantity(ingredient.quantity),
        },
        ...nextItems,
      ];
      return;
    }

    nextItems = nextItems.map((item, index) => {
      if (index !== existingIndex) {
        return item;
      }

      const generatedQuantity = roundShoppingQuantity(ingredient.quantity);

      return {
        ...item,
        quantity: roundShoppingQuantity(item.manualQuantity + generatedQuantity),
        generatedQuantity,
        source: "Essensplan",
      };
    });
  });

  return nextItems;
}

function collectMealPlanIngredients(mealPlan: MealPlanDay[], recipes: Recipe[]) {
  const aggregated = new Map<string, ShoppingAccumulator>();

  mealPlan.forEach((day) => {
    mealTypes.forEach((mealType) => {
      const slot = day.meals[mealType];

      if (slot.status !== "Geplant" || !slot.recipeId || slot.persons <= 0) {
        return;
      }

      const recipe = recipes.find((entry) => entry.id === slot.recipeId);

      if (!recipe) {
        return;
      }

      recipe.ingredients.forEach((ingredient) => {
        const scaledQuantity = roundShoppingQuantity(
          (ingredient.quantity * slot.persons) / recipe.basePersons,
        );
        const key = `${normalizeName(ingredient.name)}::${ingredient.unit}`;
        const current = aggregated.get(key);

        if (current) {
          current.quantity = roundShoppingQuantity(current.quantity + scaledQuantity);
          return;
        }

        aggregated.set(key, {
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: scaledQuantity,
        });
      });
    });
  });

  return Array.from(aggregated.values());
}

function syncMealPlanRecipeReferences(mealPlan: MealPlanDay[], recipeId: string, recipe: Recipe) {
  return mealPlan.map((day) => ({
    ...day,
    meals: {
      Frühstück:
        day.meals.Frühstück.recipeId === recipeId
          ? {
              ...day.meals.Frühstück,
              recipeName: recipe.name,
            }
          : day.meals.Frühstück,
      Mittagessen:
        day.meals.Mittagessen.recipeId === recipeId
          ? {
              ...day.meals.Mittagessen,
              recipeName: recipe.name,
            }
          : day.meals.Mittagessen,
      Abendessen:
        day.meals.Abendessen.recipeId === recipeId
          ? {
              ...day.meals.Abendessen,
              recipeName: recipe.name,
            }
          : day.meals.Abendessen,
    },
  }));
}

export const useAppStore = create<AppStore>((set, get) => ({
  ...createInitialState(),
  resetMockData: () => set(createInitialState()),
  addRecipe: (values) => {
    const nextRecipe = {
      id: createEntityId(values.name),
      ...values,
      ingredients: values.ingredients.map((ingredient) => ({
        ...ingredient,
        id: ingredient.id || createEntityId(`${values.name}-${ingredient.name}`),
      })),
    };

    set((state) => ({
      recipes: [nextRecipe, ...state.recipes],
    }));

    get().addActivityLogEntry(`${nextRecipe.name} als Rezept angelegt`);
    return nextRecipe;
  },
  updateRecipe: (recipeId, values) => {
    const updatedRecipe: Recipe = {
      id: recipeId,
      ...values,
      ingredients: values.ingredients.map((ingredient) => ({
        ...ingredient,
        id: ingredient.id || createEntityId(`${values.name}-${ingredient.name}`),
      })),
    };

    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === recipeId ? updatedRecipe : recipe,
      ),
      mealPlan: syncMealPlanRecipeReferences(state.mealPlan, recipeId, updatedRecipe),
    }));

    get().addActivityLogEntry(`${updatedRecipe.name} im Rezeptmodul aktualisiert`);
  },
  removeRecipe: (recipeId) => {
    const recipe = get().recipes.find((entry) => entry.id === recipeId);

    set((state) => ({
      recipes: state.recipes.filter((entry) => entry.id !== recipeId),
      mealPlan: state.mealPlan.map((day) => ({
        ...day,
        meals: {
          Frühstück:
            day.meals.Frühstück.recipeId === recipeId
              ? createEmptyMealSlot(day.meals.Frühstück.mealType)
              : day.meals.Frühstück,
          Mittagessen:
            day.meals.Mittagessen.recipeId === recipeId
              ? createEmptyMealSlot(day.meals.Mittagessen.mealType)
              : day.meals.Mittagessen,
          Abendessen:
            day.meals.Abendessen.recipeId === recipeId
              ? createEmptyMealSlot(day.meals.Abendessen.mealType)
              : day.meals.Abendessen,
        },
      })),
    }));

    if (recipe) {
      get().addActivityLogEntry(`${recipe.name} aus den Rezepten entfernt`);
    }
  },
  addMaterial: (values) => {
    const nextMaterial = {
      id: createEntityId(values.name),
      ...values,
    };

    set((state) => ({
      materials: [nextMaterial, ...state.materials],
    }));

    return nextMaterial;
  },
  updateMaterial: (materialId, values) => {
    set((state) => ({
      materials: state.materials.map((material) =>
        material.id === materialId ? { ...material, ...values } : material,
      ),
    }));
  },
  removeMaterial: (materialId) => {
    set((state) => ({
      materials: state.materials.filter((material) => material.id !== materialId),
    }));
  },
  addMaterialShoppingItem: (values) => {
    const nextItem: MaterialShoppingItem = {
      id: createEntityId(values.name),
      ...values,
    };

    set((state) => ({
      materialShoppingItems: [nextItem, ...state.materialShoppingItems],
    }));

    get().addActivityLogEntry(`${nextItem.name} zur Material-Einkaufsliste hinzugefügt`);
    return nextItem;
  },
  updateMaterialShoppingItem: (itemId, values) => {
    set((state) => ({
      materialShoppingItems: state.materialShoppingItems.map((item) =>
        item.id === itemId ? { ...item, ...values } : item,
      ),
    }));

    get().addActivityLogEntry(`${values.name.trim()} in der Material-Einkaufsliste aktualisiert`);
  },
  updateMaterialShoppingItemStatus: (itemId, status) => {
    let itemName = "Artikel";

    set((state) => ({
      materialShoppingItems: state.materialShoppingItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        itemName = item.name;
        return { ...item, status };
      }),
    }));

    get().addActivityLogEntry(`${itemName} auf '${status}' gesetzt`);
  },
  removeMaterialShoppingItem: (itemId) => {
    const item = get().materialShoppingItems.find((entry) => entry.id === itemId);

    set((state) => ({
      materialShoppingItems: state.materialShoppingItems.filter((entry) => entry.id !== itemId),
    }));

    if (item) {
      get().addActivityLogEntry(`${item.name} aus der Material-Einkaufsliste entfernt`);
    }
  },
  addMealToPlan: (recipeId) => {
    const recipe = get().recipes.find((entry) => entry.id === recipeId);

    if (!recipe) {
      return null;
    }

    const placement = findFirstPlacement(get().mealPlan, recipe.category);

    if (!placement) {
      return null;
    }

    set((state) => ({
      mealPlan: updateMealPlanDays(state.mealPlan, placement.date, placement.mealType, {
        mealType: placement.mealType,
        recipeId: recipe.id,
        recipeName: recipe.name,
        persons: 100,
        status: "Geplant",
      }),
    }));

    get().addActivityLogEntry(
      `${recipe.name} für ${getMealLabel(placement.date, placement.mealType, get().mealPlan)} geplant`,
    );

    return {
      ...placement,
      recipeName: recipe.name,
    };
  },
  updateMeal: (values, previousSlot) => {
    const recipe = values.recipeId
      ? get().recipes.find((entry) => entry.id === values.recipeId)
      : undefined;

    const nextSlot: MealPlanSlot = {
      mealType: values.mealType,
      recipeId: values.recipeId ?? null,
      recipeName: recipe?.name ?? values.recipeName.trim(),
      persons: normalizeShoppingQuantity(values.persons),
      status: values.status,
    };

    set((state) => {
      let nextMealPlan = state.mealPlan;

      if (
        previousSlot &&
        (previousSlot.date !== values.date || previousSlot.mealType !== values.mealType)
      ) {
        nextMealPlan = clearMealPlanDays(nextMealPlan, previousSlot.date, previousSlot.mealType);
      }

      nextMealPlan = updateMealPlanDays(nextMealPlan, values.date, values.mealType, nextSlot);

      return {
        mealPlan: nextMealPlan,
      };
    });

    if (nextSlot.recipeName) {
      get().addActivityLogEntry(
        `${nextSlot.recipeName} für ${getMealLabel(values.date, values.mealType, get().mealPlan)} geplant`,
      );
    }
  },
  removeMeal: (date, mealType) => {
    const slot = get().mealPlan.find((day) => day.date === date)?.meals[mealType];

    set((state) => ({
      mealPlan: clearMealPlanDays(state.mealPlan, date, mealType),
    }));

    if (slot?.recipeName) {
      get().addActivityLogEntry(
        `${slot.recipeName} aus ${getMealLabel(date, mealType, get().mealPlan)} entfernt`,
      );
    }
  },
  generateShoppingListFromMealPlan: () => {
    const aggregatedIngredients = collectMealPlanIngredients(get().mealPlan, get().recipes);

    set((state) => ({
      shoppingItems: recalculateGeneratedItems(state.shoppingItems, aggregatedIngredients),
    }));

    get().addActivityLogEntry("Gesamt-Einkaufsliste generiert");
    return aggregatedIngredients.length;
  },
  addShoppingItem: (values) => {
    set((state) => ({
      shoppingItems: mergeManualShoppingItem(state.shoppingItems, {
        ...values,
        source: values.source ?? "Manuell",
      }),
    }));

    get().addActivityLogEntry(`${values.name.trim()} zur Einkaufsliste hinzugefügt`);
  },
  updateShoppingItem: (itemId, values) => {
    set((state) => ({
      shoppingItems: state.shoppingItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const manualQuantity = normalizeShoppingQuantity(
          item.generatedQuantity > 0 ? values.quantity - item.generatedQuantity : values.quantity,
        );
        const generatedQuantity = item.generatedQuantity;

        return {
          ...item,
          name: values.name.trim(),
          quantity: roundShoppingQuantity(manualQuantity + generatedQuantity),
          unit: values.unit,
          status: values.status,
          manualQuantity,
          source:
            generatedQuantity > 0
              ? ("Essensplan" as const)
              : ((values.source ?? "Manuell") as ShoppingSource),
        };
      }),
    }));

    get().addActivityLogEntry(`${values.name.trim()} in der Einkaufsliste aktualisiert`);
  },
  updateShoppingItemStatus: (itemId, status) => {
    let itemName = "Artikel";

    set((state) => ({
      shoppingItems: state.shoppingItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        itemName = item.name;

        return {
          ...item,
          status,
        };
      }),
    }));

    get().addActivityLogEntry(`${itemName} auf '${status}' gesetzt`);
  },
  removeShoppingItem: (itemId) => {
    const item = get().shoppingItems.find((entry) => entry.id === itemId);

    set((state) => ({
      shoppingItems: state.shoppingItems.filter((entry) => entry.id !== itemId),
    }));

    if (item) {
      get().addActivityLogEntry(`${item.name} aus der Einkaufsliste entfernt`);
    }
  },
  addActivityLogEntry: (message) => {
    set((state) => ({
      activityLog: [
        {
          id: createEntityId(message),
          message,
          createdAt: new Date().toISOString(),
        },
        ...state.activityLog,
      ].slice(0, 20),
    }));
  },
  addRecipeIngredientsToShoppingList: (recipeId) => {
    const recipe = get().recipes.find((entry) => entry.id === recipeId);

    if (!recipe) {
      return 0;
    }

    set((state) => ({
      shoppingItems: recipe.ingredients.reduce((items, ingredient) => {
        const nextDraft: ShoppingItemDraft = {
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          status: "Offen",
          source: "Manuell",
        };

        return mergeManualShoppingItem(items, nextDraft);
      }, state.shoppingItems),
    }));

    get().addActivityLogEntry(`${recipe.name} als Einkaufsbasis zur Liste hinzugefügt`);
    return recipe.ingredients.length;
  },
}));