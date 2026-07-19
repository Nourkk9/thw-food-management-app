import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { LatestChangesPanel } from "@/components/dashboard/latest-changes-panel";
import { getDashboardModules } from "@/services/mock-data-service";

export default async function DashboardPage() {
  const modules = await getDashboardModules();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="sr-only">THW Verpflegung & Material</h1>
        <p className="max-w-2xl text-sm leading-7 text-thw-steel sm:text-base">
          Zentrale Übersicht für Rezepte, Lager, Einkauf, Essensplanung, Belege und Personal.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules
          .filter((module) => module.href !== "/")
          .map((module) => (
            <DashboardCard key={module.href} module={module} />
          ))}
      </section>

      <LatestChangesPanel />
    </div>
  );
}