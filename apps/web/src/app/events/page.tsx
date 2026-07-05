import { AppShell } from "@/components/app-shell";
import { StatusTable } from "@/components/status-table";
import { getEventRows } from "@/lib/events";

export default async function EventsPage() {
  const eventRows = await getEventRows();

  return (
    <AppShell activePath="/events">
      <StatusTable columns={["Event", "Status", "Source"]} rows={eventRows} title="Events" />
    </AppShell>
  );
}
