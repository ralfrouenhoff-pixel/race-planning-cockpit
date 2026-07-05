import { prisma } from "@/lib/prisma";

export async function getScenarioRows() {
  const scenarios = await prisma.planningScenario.findMany();

  return scenarios.map((scenario) => [
    scenario.name,
    scenario.status,
    `Version ${scenario.version}`,
  ]);
}
