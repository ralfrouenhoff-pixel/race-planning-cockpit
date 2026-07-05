import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { scenarioRows } from "@/lib/reference-scenario-view";

export default function ScenariosPage() {
  return (
    <AppShell activePath="/scenarios">
      <StatusTable columns={["Scenario", "Status", "Version"]} rows={scenarioRows} title="Scenarios" />
    </AppShell>
  );
}
