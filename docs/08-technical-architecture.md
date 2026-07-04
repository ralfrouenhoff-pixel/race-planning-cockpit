# Technical Architecture

Dieses Dokument beschreibt die technische Basis fuer Sprint 1. Es konkretisiert das Pflichtenheft, ohne bereits Businesslogik fuer Wellen, Bahnen oder Simulation zu implementieren.

## Stack

- Next.js 15 als Web-Framework fuer die erste Cockpit-App.
- TypeScript fuer statische Typisierung.
- PostgreSQL als relationale Datenbank.
- Prisma als Datenzugriffsschicht und Migrationswerkzeug.
- Tailwind fuer UI-Styling.
- Docker Compose fuer lokale Infrastruktur.

## Monorepo-Struktur

- `apps/web/`: Next.js-Anwendung fuer das Cockpit.
- `packages/`: Platz fuer geteilte Module wie Domain, Config, UI oder Test Fixtures.
- `prisma/`: Prisma-Schema, Migrationen und Datenbankdokumentation.
- `tests/`: Spaetere Integrations-, E2E- und Regressionstests.
- `analysis/`: Fachliche Analyse bestehender Excel-Logik.
- `docs/`: Produkt-, Architektur- und Sprint-Dokumentation.

## Sprint-1-Grenze

Sprint 1 stellt nur die technische Basis bereit. Rule Engine, Simulation Engine, Importlogik und fachliche Datenmodelle werden bewusst noch nicht implementiert.

## Architekturentscheidungen im Arbeitsstand

- Die Web-App startet als `apps/web`.
- Prisma wird zentral ueber `prisma/schema.prisma` vorbereitet.
- Die Datenbank laeuft lokal ueber Docker Compose.
- Businesslogik wird spaeter in Packages ausgelagert, damit UI und Engines getrennt testbar bleiben.
