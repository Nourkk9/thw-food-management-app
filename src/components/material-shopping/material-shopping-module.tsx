"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ActivityLogSection } from "@/components/activity/activity-log-section";
import { MaterialShoppingFormDialog } from "@/components/material-shopping/material-shopping-form-dialog";
import { MaterialShoppingItemCard } from "@/components/material-shopping/material-shopping-item-card";
import { MaterialShoppingTable } from "@/components/material-shopping/material-shopping-table";
import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { useAppStore } from "@/store/useAppStore";
import type {
  MaterialShoppingCategory,
  MaterialShoppingCategoryFilter,
  MaterialShoppingItem,
  MaterialShoppingItemDraft,
  MaterialShoppingStatus,
  MaterialShoppingStatusFilter,
  MaterialShoppingUnit,
} from "@/models/app";

type MaterialShoppingModuleProps = {
  categoryOptions: MaterialShoppingCategory[];
  categoryFilterOptions: MaterialShoppingCategoryFilter[];
  statusFilterOptions: MaterialShoppingStatusFilter[];
  unitOptions: MaterialShoppingUnit[];
};

export function MaterialShoppingModule({
  categoryOptions,
  categoryFilterOptions,
  statusFilterOptions,
  unitOptions,
}: MaterialShoppingModuleProps) {
  const items = useAppStore((state) => state.materialShoppingItems);
  const activityLog = useAppStore((state) => state.activityLog);
  const addMaterialShoppingItem = useAppStore((state) => state.addMaterialShoppingItem);
  const updateMaterialShoppingItem = useAppStore((state) => state.updateMaterialShoppingItem);
  const updateMaterialShoppingItemStatus = useAppStore(
    (state) => state.updateMaterialShoppingItemStatus,
  );
  const removeMaterialShoppingItem = useAppStore((state) => state.removeMaterialShoppingItem);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<MaterialShoppingCategoryFilter>("Alle");
  const [activeStatusFilter, setActiveStatusFilter] =
    useState<MaterialShoppingStatusFilter>("Alle");
  const [editingItem, setEditingItem] = useState<MaterialShoppingItem | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);

  const latestActivityLog = useMemo(() => activityLog.slice(0, 4), [activityLog]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [item.name, item.category, item.responsiblePerson, item.note ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesCategory =
      activeCategoryFilter === "Alle" || item.category === activeCategoryFilter;

    const matchesStatus =
      activeStatusFilter === "Alle" || item.status === activeStatusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  function handleCreateItem() {
    setEditingItem(null);
    setFormMode("create");
  }

  function handleEditItem(item: MaterialShoppingItem) {
    setEditingItem(item);
    setFormMode("edit");
  }

  function handleSaveItem(values: MaterialShoppingItemDraft) {
    if (formMode === "edit" && editingItem) {
      updateMaterialShoppingItem(editingItem.id, values);
      toast.success(`Material „${values.name}" wurde aktualisiert.`);
    } else {
      addMaterialShoppingItem(values);
      toast.success(`Material „${values.name}" wurde hinzugefügt.`);
    }

    setEditingItem(null);
    setFormMode(null);
  }

  function handleStatusChange(item: MaterialShoppingItem, status: MaterialShoppingStatus) {
    updateMaterialShoppingItemStatus(item.id, status);
    toast.success(`„${item.name}" wurde auf „${status}" gesetzt.`);
  }

  function handleToggleCompleted(item: MaterialShoppingItem) {
    const nextStatus: MaterialShoppingStatus =
      item.status === "Erledigt" ? "Offen" : "Erledigt";
    updateMaterialShoppingItemStatus(item.id, nextStatus);
    toast.success(
      nextStatus === "Erledigt"
        ? `„${item.name}" als erledigt markiert.`
        : `„${item.name}" wieder auf „Offen" gesetzt.`,
    );
  }

  function handleDelete(item: MaterialShoppingItem) {
    removeMaterialShoppingItem(item.id);
    toast.success(`Material „${item.name}" wurde gelöscht.`);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Material-Einkaufsliste"
        subtitle="Verbrauchsmaterial und Ausrüstungsgegenstände für den Einsatz beschaffen und verwalten."
      />

      <section className="space-y-4 rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
        <ActionButtons>
          <ActionButton variant="primary" onClick={handleCreateItem}>
            Material hinzufügen
          </ActionButton>
        </ActionButtons>

        <div className="grid gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Material suchen..."
            srLabel="Material suchen"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="shrink-0 text-sm font-medium text-thw-steel">Kategorie:</span>
            <FilterBar
              options={categoryFilterOptions}
              activeValue={activeCategoryFilter}
              onChange={setActiveCategoryFilter}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="shrink-0 text-sm font-medium text-thw-steel">Status:</span>
            <FilterBar
              options={statusFilterOptions}
              activeValue={activeStatusFilter}
              onChange={setActiveStatusFilter}
            />
          </div>
        </div>
      </section>

      {filteredItems.length === 0 ? (
        <EmptyState message="Kein Material für die aktuelle Suche oder den gewählten Filter gefunden." />
      ) : (
        <>
          <MaterialShoppingTable
            items={filteredItems}
            onStatusChange={handleStatusChange}
            onToggleCompleted={handleToggleCompleted}
            onEdit={handleEditItem}
            onDelete={handleDelete}
          />

          <section className="grid gap-4 lg:hidden">
            {filteredItems.map((item) => (
              <MaterialShoppingItemCard
                key={item.id}
                item={item}
                onStatusChange={handleStatusChange}
                onToggleCompleted={handleToggleCompleted}
                onEdit={handleEditItem}
                onDelete={handleDelete}
              />
            ))}
          </section>
        </>
      )}

      <ActivityLogSection entries={latestActivityLog} />

      {formMode ? (
        <MaterialShoppingFormDialog
          mode={formMode}
          initialItem={editingItem}
          categoryOptions={categoryOptions}
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
