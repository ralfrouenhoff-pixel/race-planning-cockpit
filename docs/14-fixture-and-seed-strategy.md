# Fixture and Seed Strategy

Dieses Dokument legt fest, wie Referenzdaten, Testdaten und spaetere Seed-Daten fuer Race Planning Cockpit entstehen sollen.

## Ziel

- Testdaten sollen nachvollziehbar aus dem Referenzszenario abgeleitet werden.
- Fixtures sollen Engine-, UI- und Prisma-Tests wiederverwendbar machen.
- Seed-Daten sollen lokale Entwicklung ermoeglichen, aber nicht fachliche Wahrheit ersetzen.
- Edge Cases sollen explizit und getrennt von Standarddaten dokumentiert werden.

## Begriffe

### Reference Scenario

Das fachliche Ausgangsszenario liegt in `docs/12-reference-scenario.md`. Es beschreibt, welche Daten inhaltlich gebraucht werden.

### Fixture

Eine Fixture ist eine kleine, stabile Testdatenmenge. Fixtures duerfen bewusst synthetisch sein, muessen aber fachlich erklaerbar bleiben.

### Seed

Ein Seed schreibt Daten in eine lokale Entwicklungsdatenbank. Seeds werden erst umgesetzt, wenn die Migration lokal gegen PostgreSQL verifiziert wurde.

## Geplante Verzeichnisse

- `tests/fixtures/reference-scenario/`: spaetere JSON- oder TypeScript-Fixtures fuer das Referenzszenario.
- `tests/fixtures/edge-cases/`: isolierte Grenzfall-Fixtures.
- `prisma/seed/`: spaeterer Prisma-Seed-Code.
- `analysis/excel-analysis/samples/`: spaetere anonymisierte Excel- oder CSV-Beispiele.

## Fixture-Schichten

### Minimal Fixture

Zweck: Schema, UI-Shell und einfache Listen pruefen.

Enthaelt:

- 1 Event
- 6 Bahnen
- 3 Startgruppen
- 1 Planungsszenario
- 5 Wellen

Keine Edge Cases.

### Reference Fixture

Zweck: vollstaendiges Referenzszenario abbilden.

Enthaelt:

- 48 Einzelstarter
- 6 Staffeln als `Participant.kind = RELAY`
- Kategorien Jugend, Erwachsene, Masters
- Distanzen Sprint und Staffel-Sprint
- Initiale Wellen und Bahnzuordnungen

### Edge Case Fixtures

Zweck: einzelne fachliche Risiken isoliert pruefen.

Geplante Faelle:

- fehlende Kategorie
- Nachmeldung nach initialer Planung
- DNS nach Bahnzuweisung
- ueberfuellte Welle
- blockierte Bahn
- manueller Override mit Begruendung

## Regeln fuer Testdaten

- Keine echten personenbezogenen Daten.
- Externe IDs muessen synthetisch und stabil sein.
- Fixtures muessen klein genug bleiben, um Review und Debugging zu ermoeglichen.
- Edge Cases werden einzeln abgelegt und nicht in eine unklare Gesamtdatenmenge gemischt.
- Sobald Businesslogik existiert, muss jede Fixture ein erwartetes Ergebnis dokumentieren.

## Nicht jetzt

- Kein `prisma db seed`.
- Keine produktiven Seed-Daten.
- Keine Excel-Parser-Implementierung.
- Keine Rule- oder Simulation-Erwartungswerte.

## Naechster Umsetzungsschritt

Nach erfolgreicher lokaler PostgreSQL-Migration kann ein erster Prisma-Seed fuer das Minimal Fixture erstellt werden.
