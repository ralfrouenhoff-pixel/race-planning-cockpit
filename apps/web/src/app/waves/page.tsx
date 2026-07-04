import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";

const rows = [
  ["W1", "08:00", "Jugend Sprint"],
  ["W2", "08:20", "Erwachsene Sprint"],
  ["W3", "08:40", "Erwachsene Sprint"],
  ["W4", "09:00", "Masters Sprint"],
  ["W5", "09:20", "Staffel-Sprint"],
];

export default function WavesPage() {
  return (
    <AppShell activePath="/waves">
      <StatusTable columns={["Wave", "Start", "Target group"]} rows={rows} title="Waves" />
    </AppShell>
  );
}
