import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { participantRows } from "@/lib/reference-scenario-view";

export default function ParticipantsPage() {
  return (
    <AppShell activePath="/participants">
      <StatusTable
        columns={["Segment", "Count", "Scope"]}
        rows={participantRows}
        title="Participants"
      />
    </AppShell>
  );
}
