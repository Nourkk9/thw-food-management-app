import type {
  ActivityLogEntry,
  ContentSection,
  DashboardMetric,
  MaterialCategoryFilter,
  MaterialItem,
  MaterialShoppingCategoryFilter,
  MaterialShoppingItem,
  MaterialShoppingStatusFilter,
  MaterialShoppingUnit,
  MaterialStatusFilter,
  MealPlanDay,
  MealPlanSlot,
  MealPlanView,
  ModuleKey,
  ModulePageContent,
  ModuleSummary,
  NavItem,
  Recipe,
  RecipeFilter,
  ShoppingItem,
  ShoppingItemFilter,
  ShoppingStatus,
  ShoppingUnit,
} from "@/models/app";

function createMealSlot(
  mealType: MealPlanSlot["mealType"],
  recipeId?: string,
  recipeName = "",
  persons = 0,
  status: MealPlanSlot["status"] = "Offen",
): MealPlanSlot {
  return {
    mealType,
    recipeId: recipeId ?? null,
    recipeName,
    persons,
    status,
  };
}

export const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    description: "Gesamtüberblick über alle Module",
    icon: "dashboard",
  },
  {
    title: "Rezepte",
    href: "/rezepte",
    description: "Rezepte mit Basis-Personenzahl und Zutatenlisten",
    icon: "recipes",
  },
  {
    title: "Material / Lager",
    href: "/material-lager",
    description: "Bestände, Mindestmengen und Lagerorte",
    icon: "inventory",
  },
  {
    title: "Einkaufsliste",
    href: "/einkaufsliste",
    description: "Manuelle und aus dem Essensplan generierte Artikel",
    icon: "shopping",
  },
  {
    title: "Essensplan",
    href: "/essensplan",
    description: "Wochenplanung mit Personenanzahl pro Mahlzeit",
    icon: "mealplan",
  },
  {
    title: "Material-Einkaufsliste",
    href: "/material-einkaufsliste",
    description: "Verbrauchsmaterial und Ausrüstung für den Einsatz",
    icon: "receipt",
  },
  {
    title: "Personal",
    href: "/personal",
    description: "Rollen, Schichten und Verfügbarkeiten",
    icon: "team",
  },
];

export const dashboardModules: ModuleSummary[] = navigationItems.map((item) => ({
  ...item,
  cta: item.href === "/" ? "Zum Überblick" : "Modul öffnen",
}));

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Geplante Mahlzeiten",
    value: "11",
    helper: "Mahlzeiten mit Rezept und Personenzahl in dieser Woche.",
    tone: "accent",
  },
  {
    label: "Offene Einkäufe",
    value: "06",
    helper: "Artikel müssen noch beschafft oder zugewiesen werden.",
    tone: "neutral",
  },
  {
    label: "Vegetarische Rezepte",
    value: "02",
    helper: "Verfügbare Optionen für die Einsatzverpflegung.",
    tone: "info",
  },
];

export const recipeFilterOptions: RecipeFilter[] = [
  "Alle",
  "Fleisch",
  "Vegetarisch",
  "Frühstück",
  "Mittagessen",
  "Abendessen",
];

export const recipes: Recipe[] = [
  {
    id: "reisgericht",
    name: "Reisgericht",
    description: "Einfaches Reisgericht für eine große Mittagsausgabe.",
    category: "Mittagessen",
    basePersons: 10,
    cookingTimeMinutes: 35,
    isVegetarian: true,
    ingredients: [
      { id: "reisgericht-reis", name: "Reis", quantity: 1, unit: "kg" },
      { id: "reisgericht-wasser", name: "Wasser", quantity: 2, unit: "Liter" },
      { id: "reisgericht-salz", name: "Salz", quantity: 0.05, unit: "kg" },
      {
        id: "reisgericht-gemuesebruehe",
        name: "Gemüsebrühe",
        quantity: 0.2,
        unit: "kg",
      },
    ],
  },
  {
    id: "fleischgericht",
    name: "Fleischgericht",
    description: "Herzhaftes Abendgericht mit Fleisch und Kartoffeln.",
    category: "Abendessen",
    basePersons: 10,
    cookingTimeMinutes: 60,
    isVegetarian: false,
    ingredients: [
      { id: "fleischgericht-fleisch", name: "Fleisch", quantity: 1.5, unit: "kg" },
      {
        id: "fleischgericht-kartoffeln",
        name: "Kartoffeln",
        quantity: 2,
        unit: "kg",
      },
      {
        id: "fleischgericht-zwiebeln",
        name: "Zwiebeln",
        quantity: 0.5,
        unit: "kg",
      },
      { id: "fleischgericht-oel", name: "Öl", quantity: 0.2, unit: "Liter" },
    ],
  },
  {
    id: "vegetarisches-gericht",
    name: "Vegetarisches Gericht",
    description: "Vegetarisches Hauptgericht für Mittags- oder Abendversorgung.",
    category: "Mittagessen",
    basePersons: 10,
    cookingTimeMinutes: 45,
    isVegetarian: true,
    ingredients: [
      { id: "vegetarisch-gemuese", name: "Gemüse", quantity: 2, unit: "kg" },
      { id: "vegetarisch-reis", name: "Reis", quantity: 1, unit: "kg" },
      { id: "vegetarisch-tomaten", name: "Tomaten", quantity: 1, unit: "kg" },
      { id: "vegetarisch-gewuerze", name: "Gewürze", quantity: 0.1, unit: "kg" },
    ],
  },
  {
    id: "brot-mit-ei",
    name: "Brot mit Ei",
    description: "Einfaches Frühstück für Einsatzkräfte am Morgen.",
    category: "Frühstück",
    basePersons: 10,
    cookingTimeMinutes: 15,
    isVegetarian: true,
    ingredients: [
      { id: "brot-ei-brot", name: "Brot", quantity: 2, unit: "Stück" },
      { id: "brot-ei-eier", name: "Eier", quantity: 10, unit: "Stück" },
      { id: "brot-ei-butter", name: "Butter", quantity: 0.25, unit: "kg" },
    ],
  },
];

export const materialCategoryFilterOptions: MaterialCategoryFilter[] = [
  "Alle",
  "Frühstück",
  "Mittagessen",
  "Abendessen",
];

export const materialStatusFilterOptions: MaterialStatusFilter[] = [
  "Alle",
  "Gültig",
  "Läuft bald ab",
  "Abgelaufen",
];

export const materials: MaterialItem[] = [
  {
    id: "reis",
    name: "Reis",
    quantity: 18,
    unit: "kg",
    expirationDate: "2027-02-15",
    storageLocation: "Trockenlager",
    categories: ["Mittagessen", "Abendessen"],
  },
  {
    id: "eier",
    name: "Eier",
    quantity: 180,
    unit: "Stück",
    expirationDate: "2026-05-30",
    storageLocation: "Kühllager",
    categories: ["Frühstück"],
  },
  {
    id: "butter",
    name: "Butter",
    quantity: 6,
    unit: "kg",
    expirationDate: "2026-06-04",
    storageLocation: "Kühllager",
    categories: ["Frühstück"],
  },
  {
    id: "kartoffeln",
    name: "Kartoffeln",
    quantity: 25,
    unit: "kg",
    expirationDate: "2026-06-12",
    storageLocation: "Kühlhaus",
    categories: ["Mittagessen", "Abendessen"],
  },
  {
    id: "tomaten",
    name: "Tomaten",
    quantity: 12,
    unit: "kg",
    expirationDate: "2026-05-28",
    storageLocation: "Kühllager",
    categories: ["Mittagessen", "Abendessen"],
  },
];

export const shoppingItemFilterOptions: ShoppingItemFilter[] = [
  "Alle",
  "Offen",
  "Wird besorgt",
  "Erledigt",
];

export const shoppingStatusOptions: ShoppingStatus[] = [
  "Offen",
  "Wird besorgt",
  "Erledigt",
];

export const shoppingUnitOptions: ShoppingUnit[] = ["kg", "g", "Stück", "Liter"];

export const shoppingItems: ShoppingItem[] = [
  {
    id: "milch",
    name: "Milch",
    quantity: 12,
    unit: "Liter",
    status: "Wird besorgt",
    source: "Manuell",
    manualQuantity: 12,
    generatedQuantity: 0,
  },
  {
    id: "aepfel",
    name: "Äpfel",
    quantity: 25,
    unit: "Stück",
    status: "Offen",
    source: "Manuell",
    manualQuantity: 25,
    generatedQuantity: 0,
  },
  {
    id: "salz",
    name: "Salz",
    quantity: 2,
    unit: "kg",
    status: "Erledigt",
    source: "Manuell",
    manualQuantity: 2,
    generatedQuantity: 0,
  },
];

export const materialShoppingCategoryFilterOptions: MaterialShoppingCategoryFilter[] = [
  "Alle",
  "Reinigungsmittel",
  "Küchenartikel",
  "Schutzausrüstung",
  "Gas",
  "Textilien",
  "Sonstiges",
];

export const materialShoppingStatusFilterOptions: MaterialShoppingStatusFilter[] = [
  "Alle",
  "Offen",
  "Wird besorgt",
  "Erledigt",
];

export const materialShoppingUnitOptions: MaterialShoppingUnit[] = [
  "Stück",
  "Packung",
  "Liter",
  "kg",
  "Rolle",
  "Paar",
];

export const materialShoppingItems: MaterialShoppingItem[] = [
  {
    id: "reinigungsmittel-allzweck",
    name: "Allzweckreiniger",
    category: "Reinigungsmittel",
    quantity: 5,
    unit: "Packung",
    status: "Offen",
    responsiblePerson: "Max Mustermann",
    note: "Für Küche und Sanitäranlagen",
  },
  {
    id: "kuechenrollen",
    name: "Küchenrollen",
    category: "Küchenartikel",
    quantity: 20,
    unit: "Rolle",
    status: "Wird besorgt",
    responsiblePerson: "Anna Schmidt",
  },
  {
    id: "einweghandschuhe",
    name: "Einweghandschuhe",
    category: "Schutzausrüstung",
    quantity: 3,
    unit: "Packung",
    status: "Offen",
    responsiblePerson: "Klaus Weber",
    note: "Größe M und L benötigt",
  },
  {
    id: "muellbeutel",
    name: "Müllbeutel",
    category: "Sonstiges",
    quantity: 2,
    unit: "Packung",
    status: "Erledigt",
    responsiblePerson: "Anna Schmidt",
  },
  {
    id: "gas-kartuschen",
    name: "Gaskartuschen",
    category: "Gas",
    quantity: 10,
    unit: "Stück",
    status: "Offen",
    responsiblePerson: "Max Mustermann",
    note: "Kompatibel mit Feldkochherd Typ B",
  },
  {
    id: "schwaemme",
    name: "Spülschwämme",
    category: "Küchenartikel",
    quantity: 10,
    unit: "Stück",
    status: "Offen",
    responsiblePerson: "Klaus Weber",
  },
  {
    id: "handtuecher-kueche",
    name: "Küchenhandtücher",
    category: "Textilien",
    quantity: 15,
    unit: "Stück",
    status: "Wird besorgt",
    responsiblePerson: "Anna Schmidt",
  },
  {
    id: "kochkleidung-schutzschuerze",
    name: "Schutzschürzen",
    category: "Textilien",
    quantity: 8,
    unit: "Stück",
    status: "Erledigt",
    responsiblePerson: "Max Mustermann",
  },
];

export const mealPlanViewOptions: MealPlanView[] = ["Wochenansicht", "Tagesansicht"];

export const mealPlanDays: MealPlanDay[] = [
  {
    date: "2026-05-18",
    dayName: "Montag",
    meals: {
      Frühstück: createMealSlot("Frühstück", "brot-mit-ei", "Brot mit Ei", 100, "Geplant"),
      Mittagessen: createMealSlot("Mittagessen", "reisgericht", "Reisgericht", 100, "Geplant"),
      Abendessen: createMealSlot("Abendessen", "fleischgericht", "Fleischgericht", 90, "Geplant"),
    },
  },
  {
    date: "2026-05-19",
    dayName: "Dienstag",
    meals: {
      Frühstück: createMealSlot("Frühstück", "brot-mit-ei", "Brot mit Ei", 80, "Geplant"),
      Mittagessen: createMealSlot(
        "Mittagessen",
        "vegetarisches-gericht",
        "Vegetarisches Gericht",
        100,
        "Geplant",
      ),
      Abendessen: createMealSlot("Abendessen"),
    },
  },
  {
    date: "2026-05-20",
    dayName: "Mittwoch",
    meals: {
      Frühstück: createMealSlot("Frühstück"),
      Mittagessen: createMealSlot("Mittagessen", "reisgericht", "Reisgericht", 120, "Geplant"),
      Abendessen: createMealSlot("Abendessen", "fleischgericht", "Fleischgericht", 100, "Geplant"),
    },
  },
  {
    date: "2026-05-21",
    dayName: "Donnerstag",
    meals: {
      Frühstück: createMealSlot("Frühstück"),
      Mittagessen: createMealSlot("Mittagessen"),
      Abendessen: createMealSlot("Abendessen"),
    },
  },
  {
    date: "2026-05-22",
    dayName: "Freitag",
    meals: {
      Frühstück: createMealSlot("Frühstück", "brot-mit-ei", "Brot mit Ei", 100, "Geplant"),
      Mittagessen: createMealSlot("Mittagessen"),
      Abendessen: createMealSlot("Abendessen", "fleischgericht", "Fleischgericht", 100, "Geplant"),
    },
  },
  {
    date: "2026-05-23",
    dayName: "Samstag",
    meals: {
      Frühstück: createMealSlot("Frühstück"),
      Mittagessen: createMealSlot("Mittagessen", "vegetarisches-gericht", "Vegetarisches Gericht", 130, "Geplant"),
      Abendessen: createMealSlot("Abendessen"),
    },
  },
  {
    date: "2026-05-24",
    dayName: "Sonntag",
    meals: {
      Frühstück: createMealSlot("Frühstück"),
      Mittagessen: createMealSlot("Mittagessen"),
      Abendessen: createMealSlot("Abendessen"),
    },
  },
];

export const activityLogEntries: ActivityLogEntry[] = [
  {
    id: "activity-1",
    message: "Reisgericht für Montag Mittagessen geplant",
    createdAt: "2026-05-22T08:15:00.000Z",
  },
  {
    id: "activity-2",
    message: "Milch auf 'Wird besorgt' gesetzt",
    createdAt: "2026-05-22T07:40:00.000Z",
  },
  {
    id: "activity-3",
    message: "Äpfel zur Einkaufsliste hinzugefügt",
    createdAt: "2026-05-22T07:10:00.000Z",
  },
];

export const dashboardSections: ContentSection[] = [
  {
    title: "Wochenfokus",
    description: "Kurzer Überblick über die laufende Einsatzverpflegung.",
    entries: [
      {
        title: "Montag Mittagessen",
        subtitle: "Reisgericht für 100 Personen vorbereitet",
        meta: "Küchenteam 1",
        status: "Geplant",
      },
      {
        title: "Freitag Abendessen",
        subtitle: "Fleischgericht für 100 Personen vorgesehen",
        meta: "Feldküche",
        status: "Geplant",
      },
    ],
  },
  {
    title: "Hinweise Einkauf",
    description: "Statusstände für die laufende Beschaffung.",
    entries: [
      {
        title: "Milch",
        subtitle: "Beschaffung läuft bereits",
        meta: "Status: Wird besorgt",
        status: "Aktiv",
      },
      {
        title: "Äpfel",
        subtitle: "Noch offen für das Frühstück",
        meta: "Status: Offen",
        status: "Offen",
      },
    ],
  },
];

export const modulePages: Record<Exclude<ModuleKey, "dashboard">, ModulePageContent> = {
  rezepte: {
    title: "Rezepte",
    icon: "recipes",
    intro:
      "Verwalte Standardgerichte mit Basis-Personenzahl und Zutatenlisten für die Einsatzverpflegung.",
    ctaTitle: "Rezepte pflegen",
    ctaDescription:
      "Passe Rezepte an und nutze sie direkt für Essensplan und Einkaufsliste.",
    highlights: [
      {
        label: "Aktive Rezepte",
        value: String(recipes.length).padStart(2, "0"),
        helper: "Mockdaten für Frühstück, Mittag- und Abendessen.",
      },
      {
        label: "Basisportionen",
        value: "10",
        helper: "Alle Musterrezepte sind auf 10 Personen normiert.",
      },
      {
        label: "Vegetarische Optionen",
        value: "02",
        helper: "Für gemischte Einsatzlagen verfügbar.",
      },
    ],
    sections: dashboardSections,
  },
  "material-lager": {
    title: "Material / Lager",
    icon: "inventory",
    intro:
      "Behalte Bestände, Lagerorte und Verfallsdaten für die Verpflegung im Blick.",
    ctaTitle: "Lager prüfen",
    ctaDescription: "Kritische Materialien frühzeitig erkennen und nachbestellen.",
    highlights: [
      {
        label: "Lagerartikel",
        value: String(materials.length).padStart(2, "0"),
        helper: "Mockbestand mit typischen Verbrauchsgütern.",
      },
      {
        label: "Lagerorte",
        value: "04",
        helper: "Trockenlager, Kühllager, Kühlhaus und Küche.",
      },
      {
        label: "Frühwarnung",
        value: "02",
        helper: "Artikel laufen in den nächsten Wochen ab.",
      },
    ],
    sections: dashboardSections,
  },
  einkaufsliste: {
    title: "Einkaufsliste",
    icon: "shopping",
    intro:
      "Verwalte manuelle Einkäufe und aggregierte Bedarfe aus dem Essensplan in einer Liste.",
    ctaTitle: "Einkäufe abstimmen",
    ctaDescription: "Status und Herkunft der Artikel bleiben transparent nachvollziehbar.",
    highlights: [
      {
        label: "Artikel gesamt",
        value: String(shoppingItems.length).padStart(2, "0"),
        helper: "Manuelle Artikel sind bereits hinterlegt.",
      },
      {
        label: "Statusstufen",
        value: "03",
        helper: "Offen, Wird besorgt und Erledigt.",
      },
      {
        label: "Quellen",
        value: "02",
        helper: "Manuell oder aus dem Essensplan erzeugt.",
      },
    ],
    sections: dashboardSections,
  },
  essensplan: {
    title: "Essensplan",
    icon: "mealplan",
    intro:
      "Plane die Woche mit Rezepten, Personenanzahl und Status pro Mahlzeit.",
    ctaTitle: "Woche planen",
    ctaDescription:
      "Aus dem Wochenplan kann direkt eine Gesamt-Einkaufsliste erzeugt werden.",
    highlights: [
      {
        label: "Tage im Plan",
        value: "07",
        helper: "Montag bis Sonntag als Wochenraster.",
      },
      {
        label: "Mahlzeiten pro Tag",
        value: "03",
        helper: "Frühstück, Mittagessen und Abendessen.",
      },
      {
        label: "Standardwert",
        value: "100",
        helper: "Voreinstellung für Personen pro Mahlzeit.",
      },
    ],
    sections: dashboardSections,
  },
  "material-einkaufsliste": {
    title: "Material-Einkaufsliste",
    icon: "receipt",
    intro:
      "Verwalte Verbrauchsmaterial und Ausrüstungsgegenstände für den Einsatz: von Reinigungsmitteln bis hin zu Kochkleidung.",
    ctaTitle: "Materialien verwalten",
    ctaDescription:
      "Behalte Bedarfe, Zuständigkeiten und Beschaffungsstatus im Blick.",
    highlights: [
      {
        label: "Materialien",
        value: String(materialShoppingItems.length).padStart(2, "0"),
        helper: "Einträge für Verbrauchsmaterial und Ausrüstung.",
      },
      {
        label: "Kategorien",
        value: "06",
        helper: "Reinigungsmittel, Küchenartikel, Schutzausrüstung, Gas, Textilien, Sonstiges.",
      },
      {
        label: "Statusstufen",
        value: "03",
        helper: "Offen, Wird besorgt und Erledigt.",
      },
    ],
    sections: dashboardSections,
  },
  personal: {
    title: "Personal",
    icon: "team",
    intro: "Dieses Modul bleibt vorerst ein einfacher Platzhalter für Team- und Rollenpflege.",
    ctaTitle: "Platzhalter",
    ctaDescription: "Keine Änderungen an der bestehenden simplen Seite erforderlich.",
    highlights: [
      {
        label: "Status",
        value: "Mock",
        helper: "Noch keine Personallogik hinterlegt.",
      },
      {
        label: "Schichten",
        value: "Später",
        helper: "Ausbau kann in einem späteren Schritt folgen.",
      },
      {
        label: "Scope",
        value: "Klein",
        helper: "Bestehender Placeholder bleibt bestehen.",
      },
    ],
    sections: dashboardSections,
  },
};