import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { getParticipantRows } from "@/lib/participants";

export default async function ParticipantsPage() {
  const participantRows = await getParticipantRows();

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
