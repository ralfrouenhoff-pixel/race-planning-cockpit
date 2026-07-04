import Link from "next/link";
import { navigationItems } from "@/lib/workspace";

type AppShellProps = {
  activePath: string;
  children: React.ReactNode;
};

export function AppShell({ activePath, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-cockpit-surface text-cockpit-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-cockpit-line bg-white px-4 py-5 lg:block">
          <Link className="block text-lg font-semibold" href="/">
            Race Planning Cockpit
          </Link>
          <nav className="mt-8 space-y-1">
            {navigationItems.map((item) => {
              const isActive = item.href === activePath;

              return (
                <Link
                  className={`block border px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "border-cockpit-accent bg-cockpit-accent text-white"
                      : "border-transparent text-slate-700 hover:border-cockpit-line hover:bg-cockpit-surface"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-cockpit-line bg-white px-4 py-3 lg:hidden">
            <Link className="text-base font-semibold" href="/">
              Race Planning Cockpit
            </Link>
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {navigationItems.map((item) => (
                <Link
                  className={`whitespace-nowrap border px-3 py-2 text-sm ${
                    item.href === activePath
                      ? "border-cockpit-accent bg-cockpit-accent text-white"
                      : "border-cockpit-line text-slate-700"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="w-full px-4 py-6 md:px-8 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
