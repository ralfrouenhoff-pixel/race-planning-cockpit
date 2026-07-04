import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";

const rows = [
  ["Individuals", "48", "Sprint"],
  ["Relays", "6", "Relay sprint"],
  ["Missing category", "1", "Edge case"],
  ["DNS", "1", "Post-assignment edge case"],
];

export default function ParticipantsPage() {
  return (
    <AppShell activePath="/participants">
      <StatusTable
        columns={["Segment", "Count", "Scope"]}
        rows={rows}
        title="Participants"
      />
    </AppShell>
  );
}
