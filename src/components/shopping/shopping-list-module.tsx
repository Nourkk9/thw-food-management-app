"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ActivityLogSection } from "@/components/activity/activity-log-section";
import { ShoppingFormDialog } from "@/components/shopping/shopping-form-dialog";
import { ShoppingItemCard } from "@/components/shopping/shopping-item-card";
import { ShoppingTable } from "@/components/shopping/shopping-table";
import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { shoppingItemMatchesFilter, shoppingItemMatchesSearch } from "@/lib/shopping";
import { useAppStore } from "@/store/useAppStore";
import type {
  ShoppingItem,
  ShoppingItemDraft,
  ShoppingItemFilter,
  ShoppingStatus,
  ShoppingUnit,
} from "@/models/app";

type ShoppingListModuleProps = {
  filterOptions: ShoppingItemFilter[];
  unitOptions: ShoppingUnit[];
};

export function ShoppingListModule({
  filterOptions,
  unitOptions,
}: ShoppingListModuleProps) {
  const items = useAppStore((state) => state.shoppingItems);
  const activityLog = useAppStore((state) => state.activityLog);
  const addShoppingItem = useAppStore((state) => state.addShoppingItem);
  const updateShoppingItem = useAppStore((state) => state.updateShoppingItem);
  const updateShoppingItemStatus = useAppStore((state) => state.updateShoppingItemStatus);
  const removeShoppingItem = useAppStore((state) => state.removeShoppingItem);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<ShoppingItemFilter>("Alle");
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const latestActivityLog = useMemo(() => activityLog.slice(0, 4), [activityLog]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      normalizedSearch.length === 0 || shoppingItemMatchesSearch(item, normalizedSearch);

    return matchesSearch && shoppingItemMatchesFilter(item, activeFilter);
  });

  function handleCreateItem() {
    setEditingItem(null);
    setFormMode("create");
  }

  function handleEditItem(item: ShoppingItem) {
    setEditingItem(item);
    setFormMode("edit");
  }

  function handleSaveItem(values: ShoppingItemDraft) {
    if (formMode === "edit" && editingItem) {
      updateShoppingItem(editingItem.id, values);
      toast.success(`Artikel „${values.name}“ wurde aktualisiert.`);
    } else {
      addShoppingItem({ ...values, source: "Manuell" });
      toast.success(`Artikel „${values.name}“ wurde hinzugefügt.`);
    }

    setEditingItem(null);
    setFormMode(null);
  }

  function handleStatusChange(item: ShoppingItem, status: ShoppingStatus) {
    updateShoppingItemStatus(item.id, status);
    toast.success(`Artikel „${item.name}“ wurde auf „${status}“ gesetzt.`);
  }

  function handleDelete(item: ShoppingItem) {
    removeShoppingItem(item.id);
    toast.success(`Artikel „${item.name}“ wurde gelöscht.`);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Einkaufsliste"
        subtitle="Manuelle und aus dem Essensplan erzeugte Artikel gemeinsam verwalten."
      />

      <section className="space-y-4 rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
        <ActionButtons>
          <ActionButton variant="primary" onClick={handleCreateItem}>
            Artikel hinzufügen
          </ActionButton>
        </ActionButtons>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Artikel suchen..."
            srLabel="Artikel suchen"
          />

          <FilterBar
            options={filterOptions}
            activeValue={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </section>

      {filteredItems.length === 0 ? (
        <EmptyState message="Keine Artikel für die aktuelle Suche oder den gewählten Filter gefunden." />
      ) : (
        <>
          <ShoppingTable
            items={filteredItems}
            onStatusChange={handleStatusChange}
            onEdit={handleEditItem}
            onDelete={handleDelete}
          />

          <section className="grid gap-4 lg:hidden">
            {filteredItems.map((item) => (
              <ShoppingItemCard
                key={item.id}
                item={item}
                onStatusChange={handleStatusChange}
                onEdit={handleEditItem}
                onDelete={handleDelete}
              />
            ))}
          </section>
        </>
      )}

      <ActivityLogSection entries={latestActivityLog} />

      {formMode ? (
        <ShoppingFormDialog
          mode={formMode}
          initialItem={editingItem}
          unitOptions={unitOptions}
          onClose={() => {
            setEditingItem(null);
            setFormMode(null);
          }}
          onSubmit={handleSaveItem}
        />
      ) : null}
    </div>
  );
}