import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { waveRows } from "@/lib/reference-scenario-view";

export default function WavesPage() {
  return (
    <AppShell activePath="/waves">
      <StatusTable columns={["Wave", "Start", "Target group"]} rows={waveRows} title="Waves" />
    </AppShell>
  );
}
