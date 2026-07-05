export const navigationItems = [
  { href: "/", label: "Overview" },
  { href: "/events", label: "Events" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/participants", label: "Participants" },
  { href: "/waves", label: "Waves" },
  { href: "/lanes", label: "Lanes" },
  { href: "/simulation", label: "Simulation" },
];

export const workspaceSections = [
  { label: "Events", state: "Fixture-backed", next: "Connect Prisma reads" },
  { label: "Scenarios", state: "Prepared", next: "Add scenario detail view" },
  { label: "Participants", state: "Fixture-backed", next: "Add participant detail view" },
  { label: "Waves", state: "Fixture-backed", next: "Add lane assignments" },
  { label: "Lanes", state: "Fixture-backed", next: "Add occupancy view" },
  { label: "Simulation", state: "Deferred", next: "Define result contract" },
];
