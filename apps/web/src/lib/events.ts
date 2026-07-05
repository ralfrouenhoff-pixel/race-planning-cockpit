import { prisma } from "@/lib/prisma";

export async function getEventRows() {
  const events = await prisma.event.findMany();

  return events.map((event) => [event.name, event.status, "Prisma"]);
}
