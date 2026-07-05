import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { getScenarioRows } from "@/lib/scenarios";

export default async function ScenariosPage() {
  const scenarioRows = await getScenarioRows();

  return (
    <AppShell activePath="/scenarios">
      <StatusTable columns={["Scenario", "Status", "Version"]} rows={scenarioRows} title="Scenarios" />
    </AppShell>
  );
}
