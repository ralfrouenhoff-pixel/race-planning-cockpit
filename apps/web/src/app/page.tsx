import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { overviewMetrics } from "@/lib/reference-scenario-view";
import { workspaceSections } from "@/lib/workspace";

export default function Home() {
  return (
    <AppShell activePath="/">
      <section className="space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase text-cockpit-accent">
            Sprint 1
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-4xl">
            Race Planning Cockpit
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {overviewMetrics.map((metric) => (
            <div className="border border-cockpit-line bg-white p-4" key={metric.label}>
              <div className="text-sm text-slate-600">{metric.label}</div>
              <div className="mt-2 text-3xl font-semibold">{metric.value}</div>
              <div className="mt-1 text-sm text-slate-500">{metric.detail}</div>
            </div>
          ))}
        </div>

        <StatusTable
          columns={["Area", "State", "Next"]}
          rows={workspaceSections.map((section) => [
            section.label,
            section.state,
            section.next,
          ])}
          title="Workspace"
        />
      </section>
    </AppShell>
  );
}
