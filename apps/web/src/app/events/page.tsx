import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { eventRows } from "@/lib/reference-scenario-view";

export default function EventsPage() {
  return (
    <AppShell activePath="/events">
      <StatusTable columns={["Event", "Status", "Source"]} rows={eventRows} title="Events" />
    </AppShell>
  );
}
