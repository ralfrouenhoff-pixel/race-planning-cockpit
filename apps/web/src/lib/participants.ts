import { prisma } from "@/lib/prisma";

const REFERENCE_EVENT_ID = "event-stadtwerke-sprint-2027";

export async function getParticipantRows() {
  const participants = await prisma.participant.findMany({
    where: { eventId: REFERENCE_EVENT_ID },
  });

  return [
    [
      "Individuals",
      String(participants.filter((participant) => participant.kind === "INDIVIDUAL").length),
      "Sprint",
    ],
    [
      "Relays",
      String(participants.filter((participant) => participant.kind === "RELAY").length),
      "Relay sprint",
    ],
    [
      "Missing category",
      String(participants.filter((participant) => participant.category === null).length),
      "Edge case",
    ],
    [
      "DNS",
      String(participants.filter((participant) => participant.status === "DNS").length),
      "Post-assignment edge case",
    ],
  ];
}
