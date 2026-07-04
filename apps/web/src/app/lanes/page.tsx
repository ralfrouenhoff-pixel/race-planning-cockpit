import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";

const rows = Array.from({ length: 6 }, (_, index) => [
  `Lane ${index + 1}`,
  "Available",
  "2 starts per wave",
]);

export default function LanesPage() {
  return (
    <AppShell activePath="/lanes">
      <StatusTable columns={["Lane", "Status", "Capacity"]} rows={rows} title="Lanes" />
    </AppShell>
  );
}
