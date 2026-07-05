import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { laneRows } from "@/lib/reference-scenario-view";

export default function LanesPage() {
  return (
    <AppShell activePath="/lanes">
      <StatusTable columns={["Lane", "Status", "Capacity"]} rows={laneRows} title="Lanes" />
    </AppShell>
  );
}
