# Sprint 1 Plan

Sprint 1 bereitet das Repository fuer die erste produktive Entwicklung vor. Der Fokus liegt auf Struktur, Werkzeugen und Dokumentation.

## Ziele

- Next.js-15-App mit TypeScript anlegen.
- Tailwind-Basis konfigurieren.
- PostgreSQL lokal per Docker Compose bereitstellen.
- Prisma fuer spaetere Migrationen vorbereiten.
- Dokumentationsstruktur vervollstaendigen.
- Noch keine Race-Planning-Businesslogik implementieren.

## Lieferumfang

- Monorepo-Root mit npm Workspaces.
- `apps/web` als technische Web-App-Huelle.
- `prisma/schema.prisma` mit Generator und PostgreSQL-Datasource.
- `.env.example` fuer lokale Konfiguration.
- GitHub Actions Workflow fuer Build-, Lint- und Typecheck-Vorbereitung.
- Dokumente fuer Architektur und Sprint-Planung.

## Nicht im Umfang

- Rule Engine Implementierung.
- Simulation Engine Implementierung.
- Import von Excel-Dateien.
- Produktive Datenmodelle fuer Events, Wellen, Bahnen oder Teilnehmer.
- Authentifizierung und Rollenmodell.

## Abnahmekriterien

- Repository-Struktur ist nachvollziehbar.
- App kann nach Installation der Dependencies gestartet werden.
- Datenbank kann lokal per Docker gestartet werden.
- Prisma kann gegen die konfigurierte Datenbank initialisiert werden.
- Dokumente beschreiben Scope und naechste Schritte.
