# Current State Handoff

Stand: 2026-07-05

Dieses Dokument speichert den aktuellen Projektstand, damit die Arbeit spaeter ohne erneute Orientierung fortgesetzt werden kann.

## Repository

- Repository: `ralfrouenhoff-pixel/race-planning-cockpit`
- Branch: `main`
- Aktueller Stand vor diesem Handoff: `8a4c5a1 Add UI shell and placeholder pages`
- Arbeitsbaum vor diesem Handoff: sauber
- GitHub Actions: gruen

## Umgesetzter Stand

### Dokumentation

Vorhanden sind Dokumente fuer:

- Vision
- Lastenheft
- Pflichtenheft
- Rule Engine
- Simulation Engine
- UI-Konzept
- Roadmap
- Technical Architecture
- Sprint-1-Plan
- Development Setup
- Data Model Plan
- Reference Scenario
- Prisma Schema V1
- Fixture and Seed Strategy
- Domain Contracts
- UI Shell

### Technische Basis

Eingerichtet:

- Next.js 15
- TypeScript
- Tailwind
- PostgreSQL-Konfiguration
- Prisma
- Docker Compose Konfiguration
- npm Workspaces
- GitHub Actions CI

### Prisma

Vorhanden:

- `prisma/schema.prisma`
- initiale SQL-Migration unter `prisma/migrations/20260704120000_init_data_model/migration.sql`

Modelle:

- `Event`
- `Participant`
- `StartGroup`
- `PlanningScenario`
- `Wave`
- `Lane`
- `LaneAssignment`
- `ImportBatch`
- `ManualOverride`

Hinweis: Die Migration wurde generiert und validiert, aber noch nicht gegen eine laufende PostgreSQL-Datenbank angewendet, weil `docker` in der aktuellen Umgebung nicht verfuegbar war.

### Domain Package

Vorhanden:

- `packages/domain`
- reine TypeScript-Contracts
- Statuswerte passend zum Prisma-Schema
- `PlanningSnapshotContract`

Nicht enthalten:

- Businesslogik
- Validierung
- Datenbankzugriff
- Mapper

### UI

Vorhanden:

- App-Shell
- Desktop- und Mobile-Navigation
- Platzhalterseiten:
  - `/`
  - `/events`
  - `/scenarios`
  - `/participants`
  - `/waves`
  - `/lanes`
  - `/simulation`

Die UI nutzt typisierte Referenzfixture-Daten. Es gibt noch keine Datenbankanbindung.

## Validierung

Lokal erfolgreich ausgefuehrt:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run db:generate`
- Browser-Smoke-Test der UI-Routen
- Mobile-Overflow-Check bei 390px Breite

GitHub Actions:

- letzter bekannter CI-Stand: gruen

## Bewusste Nicht-Umsetzung

Noch nicht implementiert:

- Rule Engine
- Simulation Engine
- Excel Import
- Prisma Reads/Writes in der UI
- Authentifizierung
- Rollenmodell
- echte Seed-Daten
- Edge-Case-Fixtures

## Empfohlener naechster Schritt

Als naechstes sollten Rule-Result-Contracts vorbereitet werden:

Dieser Schritt ist erledigt. Die Contracts liegen im Domain-Package und sind in `docs/20-rule-result-contracts.md` dokumentiert.

Als naechstes sollte ein Rule-Engine-Package-Schnitt vorbereitet werden:

1. `packages/rules` anlegen.
2. Nur Schnittstellen und Test-Harness vorbereiten.
3. Noch keine fachlichen Regeln berechnen.

Grund: Referenz- und Edge-Case-Fixtures sowie Rule-Result-Contracts sind nun typisiert vorhanden. Die naechste Qualitaetsstufe ist ein sauberer Package-Zuschnitt fuer spaetere pure Rule-Funktionen.

## Alternative naechste Arbeit

PostgreSQL lokal verfuegbar machen:

1. Docker installieren oder PostgreSQL anderweitig bereitstellen.
2. `.env` aus `.env.example` erstellen.
3. `npm run docker:up`
4. `npm run db:migrate`

Dieser Schritt ist sinnvoll, sobald lokale Infrastruktur geklaert ist.
