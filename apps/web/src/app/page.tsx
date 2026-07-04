const foundationItems = [
  "Next.js 15",
  "TypeScript",
  "Tailwind",
  "Prisma",
  "PostgreSQL",
  "Docker",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cockpit-surface text-cockpit-ink">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-cockpit-accent">
          Sprint 1 Foundation
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Race Planning Cockpit
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
          Technical basis for a planning and simulation platform for
          pool-based multisport events.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {foundationItems.map((item) => (
            <div
              className="border border-cockpit-line bg-white px-4 py-3 text-sm font-medium"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
