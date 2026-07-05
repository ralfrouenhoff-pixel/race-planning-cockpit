# Reference Fixtures

Dieses Dokument beschreibt die erste typisierte Fixture fuer das Referenzszenario.

## Umfang

Die Fixture liegt unter `tests/fixtures/reference-scenario/index.ts` und ist gegen `@race-planning-cockpit/domain` typisiert.

Enthalten:

- 1 Event
- 1 Planungsszenario
- 4 Startgruppen
- 6 Bahnen
- 5 Wellen
- 54 Teilnehmer
- 27 initiale Bahnzuordnungen auf Startgruppenebene
- leerer Override-Satz

## Zweck

Die Fixture dient als gemeinsame Datenbasis fuer:

- UI-Platzhalterseiten
- spaetere UI-Tests
- spaetere Prisma-Seeds
- spaetere Engine-Regressionstests

## UI-Nutzung

Die Web-App nutzt die Fixture aktuell ueber `apps/web/src/lib/reference-scenario-view.ts`.

Die View-Datei leitet Tabellenzeilen und Kennzahlen aus der Fixture ab. Dadurch bleiben die Pages frei von eigenen Datenarrays.

## Abgrenzung

Nicht enthalten:

- echte personenbezogene Daten
- Prisma-Seed-Code
- Datenbankzugriff
- Rule- oder Simulation-Erwartungswerte
- fachliche Validierungslogik

## Naechste Schritte

- Edge-Case-Fixtures separat anlegen.
- Fixture-Struktur bei Bedarf in ein eigenes Workspace-Package verschieben.
- Prisma-Seed erst nach erfolgreicher lokaler Migration ergaenzen.
