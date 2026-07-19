"use client";

import { useState } from "react";
import { toast } from "sonner";

import { materialMatchesSearch, getMaterialStatus } from "@/lib/materials";
import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { useAppStore } from "@/store/useAppStore";
import type {
  MaterialCategoryFilter,
  MaterialDraft,
  MaterialItem,
  MaterialStatusFilter,
} from "@/models/app";

import { MaterialCard } from "@/components/materials/material-card";
import { MaterialFormDialog } from "@/components/materials/material-form-dialog";
import { MaterialsTable } from "@/components/materials/materials-table";

type MaterialsModuleProps = {
  categoryFilterOptions: MaterialCategoryFilter[];
  statusFilterOptions: MaterialStatusFilter[];
};

export function MaterialsModule({
  categoryFilterOptions,
  statusFilterOptions,
}: MaterialsModuleProps) {
  const materials = useAppStore((state) => state.materials);
  const addMaterial = useAppStore((state) => state.addMaterial);
  const updateMaterial = useAppStore((state) => state.updateMaterial);
  const removeMaterial = useAppStore((state) => state.removeMaterial);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<MaterialCategoryFilter>("Alle");
  const [activeStatus, setActiveStatus] =
    useState<MaterialStatusFilter>("Alle");
  const [editingMaterial, setEditingMaterial] = useState<MaterialItem | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      materialMatchesSearch(material, normalizedSearch);

    const matchesCategory =
      activeCategory === "Alle" || material.categories.includes(activeCategory);

    const materialStatus = getMaterialStatus(material.expirationDate);
    const matchesStatus =
      activeStatus === "Alle" || materialStatus === activeStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  function handleCreateMaterial() {
    setEditingMaterial(null);
    setFormMode("create");
  }

  function handleEditMaterial(material: MaterialItem) {
    setEditingMaterial(material);
    setFormMode("edit");
  }

  function handleSaveMaterial(values: MaterialDraft) {
    if (formMode === "edit" && editingMaterial) {
      updateMaterial(editingMaterial.id, values);
      toast.success(`Material „${values.name}“ wurde aktualisiert.`);
    } else {
      addMaterial(values);
      toast.success(`Material „${values.name}“ wurde hinzugefügt.`);
    }

    setEditingMaterial(null);
    setFormMode(null);
  }

  function handleDeleteMaterial(material: MaterialItem) {
    removeMaterial(material.id);
    toast.success(`Material „${material.name}“ wurde gelöscht.`);
  }

  function handleExcelImport() {
    toast("Excel-Import wird später implementiert.");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Material / Lager"
        subtitle="Materialien, Lebensmittel, Mengen und MHD verwalten."
      />

      <section className="space-y-4 rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
        <ActionButtons>
          <ActionButton variant="primary" onClick={handleCreateMaterial}>
            Material hinzufügen
          </ActionButton>
          <ActionButton onClick={handleExcelImport}>
            Excel importieren
          </ActionButton>
        </ActionButtons>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto_auto] xl:items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Material suchen..."
            srLabel="Material suchen"
          />

          <FilterBar
            options={categoryFilterOptions}
            activeValue={activeCategory}
            onChange={setActiveCategory}
          />

          <FilterBar
            options={statusFilterOptions}
            activeValue={activeStatus}
            onChange={setActiveStatus}
          />
        </div>
      </section>

      {filteredMaterials.length === 0 ? (
        <EmptyState message="Keine Materialien für die aktuelle Suche oder die gewählten Filter gefunden." />
      ) : (
        <>
          <MaterialsTable
            materials={filteredMaterials}
            onEdit={handleEditMaterial}
            onDelete={handleDeleteMaterial}
          />

          <section className="grid gap-4 lg:hidden">
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onEdit={handleEditMaterial}
                onDelete={handleDeleteMaterial}
              />
            ))}
          </section>
        </>
      )}

      {formMode ? (
        <MaterialFormDialog
          mode={formMode}
          initialMaterial={editingMaterial}
          onClose={() => {
            setEditingMaterial(null);
            setFormMode(null);
          }}
          onSubmit={handleSaveMaterial}
        />
      ) : null}
    </div>
  );
}