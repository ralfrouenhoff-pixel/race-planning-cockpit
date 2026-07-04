import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";

const rows = [
  ["Stadtwerke Sprint Triathlon 2027", "Draft", "Reference scenario"],
];

export default function EventsPage() {
  return (
    <AppShell activePath="/events">
      <StatusTable columns={["Event", "Status", "Source"]} rows={rows} title="Events" />
    </AppShell>
  );
}
