import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { simulationRows } from "@/lib/reference-scenario-view";

export default function SimulationPage() {
  return (
    <AppShell activePath="/simulation">
      <StatusTable columns={["Item", "State", "Dependency"]} rows={simulationRows} title="Simulation" />
    </AppShell>
  );
}
