import type {
  MaterialCategory,
  MaterialItem,
  MaterialStatus,
} from "@/models/app";

const categoryToneMap: Record<MaterialCategory, string> = {
  Frühstück: "bg-[#ecfdf3] text-[#027a48]",
  Mittagessen: "bg-[#fffaeb] text-[#b54708]",
  Abendessen: "bg-[#fef3f2] text-[#b42318]",
};

const statusToneMap: Record<MaterialStatus, string> = {
  Gültig: "bg-[#ecfdf3] text-[#027a48]",
  "Läuft bald ab": "bg-[#fffaeb] text-[#b54708]",
  Abgelaufen: "bg-[#fef3f2] text-[#b42318]",
};

function toStartOfDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function getMaterialStatus(expirationDate: string): MaterialStatus {
  const today = toStartOfDay(new Date());
  const target = toStartOfDay(new Date(expirationDate));
  const diffInDays = Math.floor(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays < 0) {
    return "Abgelaufen";
  }

  if (diffInDays <= 7) {
    return "Läuft bald ab";
  }

  return "Gültig";
}

export function formatMaterialDate(expirationDate: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(expirationDate));
}

export function getMaterialCategoryTone(category: MaterialCategory) {
  return categoryToneMap[category];
}

export function getMaterialStatusTone(status: MaterialStatus) {
  return statusToneMap[status];
}

export function materialMatchesSearch(material: MaterialItem, searchTerm: string) {
  const haystack = [
    material.name,
    material.unit,
    material.storageLocation,
    ...material.categories,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(searchTerm.toLowerCase());
}