import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";

const rows = [
  ["SimulationRun", "Not modeled", "Pending result contract"],
  ["RuleCheckResult", "Not modeled", "Pending result contract"],
  ["Snapshot", "Contract prepared", "Domain package"],
];

export default function SimulationPage() {
  return (
    <AppShell activePath="/simulation">
      <StatusTable columns={["Item", "State", "Dependency"]} rows={rows} title="Simulation" />
    </AppShell>
  );
}
