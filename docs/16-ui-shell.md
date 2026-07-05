# UI Shell

Dieses Dokument beschreibt die erste UI-Shell des Race Planning Cockpits.

## Umfang

Die Shell stellt Navigation und Platzhalterseiten fuer die Kernbereiche bereit:

- Overview
- Events
- Scenarios
- Participants
- Waves
- Lanes
- Simulation

## Abgrenzung

Nicht enthalten:

- Datenbankzugriff
- Server Actions
- Mutationen
- Authentifizierung
- Rule Engine
- Simulation Engine
- echte Importdaten

## Technische Struktur

- Shell-Komponente: `apps/web/src/components/app-shell.tsx`
- Tabellen-Komponente: `apps/web/src/components/status-table.tsx`
- Navigations- und statische Workspace-Daten: `apps/web/src/lib/workspace.ts`
- Fixture-basierte View-Daten: `apps/web/src/lib/reference-scenario-view.ts`
- Seiten unter `apps/web/src/app/*/page.tsx`

## Aktueller Datenstand

Die Seiten nutzen Fixture-Daten aus `tests/fixtures/reference-scenario/index.ts`.
Es gibt weiterhin keine Datenbankabfragen und keine Mutationen.

## Naechste Schritte

- Detailseiten fuer Events und Szenarien definieren.
- Edge-Case-Fixtures vorbereiten.
- Prisma-Reads erst einfuehren, wenn lokale Migration gegen PostgreSQL verifiziert ist.
