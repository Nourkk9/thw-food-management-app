import type { ShoppingItem, ShoppingItemFilter, ShoppingStatus, ShoppingUnit } from "@/models/app";

export function getShoppingItemStatus(item: ShoppingItem): ShoppingStatus {
  return item.status;
}

export function shoppingItemMatchesFilter(
  item: ShoppingItem,
  filter: ShoppingItemFilter,
) {
  if (filter === "Alle") {
    return true;
  }

  return getShoppingItemStatus(item) === filter;
}

export function shoppingItemMatchesSearch(item: ShoppingItem, searchTerm: string) {
  const haystack = [item.name, item.unit].join(" ").toLowerCase();
  return haystack.includes(searchTerm.toLowerCase());
}

export function normalizeShoppingQuantity(value: number) {
  return value < 0 ? 0 : value;
}

export function roundShoppingQuantity(value: number) {
  return Number(normalizeShoppingQuantity(value).toFixed(2));
}

export function isShoppingUnit(value: string): value is ShoppingUnit {
  return ["kg", "g", "Stück", "Liter"].includes(value);
}