import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";

const rows = [["Initial Draft", "Draft", "Version 1"]];

export default function ScenariosPage() {
  return (
    <AppShell activePath="/scenarios">
      <StatusTable columns={["Scenario", "Status", "Version"]} rows={rows} title="Scenarios" />
    </AppShell>
  );
}
