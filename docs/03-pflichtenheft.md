# Pflichtenheft

Dieses Dokument beschreibt die geplante technische Umsetzung der Anforderungen aus dem Lastenheft. Details werden mit den Excel-Analysen und ersten Implementierungen validiert.

## Architekturueberblick

Das System wird als modularer Monorepo-Ansatz vorbereitet:

- `apps/` enthaelt spaetere Anwendungen, zum Beispiel Web-UI oder Admin-Tools.
- `packages/` enthaelt wiederverwendbare Domain-, Rule- und Simulation-Module.
- `prisma/` enthaelt Datenmodell, Migrationen und Seed-Daten.
- `analysis/excel-analysis/` dokumentiert die Uebertragung bestehender Excel-Logik.
- `tests/` enthaelt Integrations- und Regressionsszenarien.

## Kernmodule

- Rule Engine: bewertet fachliche Regeln fuer Wellen, Bahnen und Plausibilitaet.
- Simulation Engine: rechnet Szenarien durch und erkennt Engpaesse.
- Import Layer: uebernimmt strukturierte Daten aus Excel oder CSV.
- Persistence Layer: speichert Events, Regeln, Szenarien und Ergebnisse.
- UI Layer: macht Planung, Konflikte und Simulationen bedienbar.

## Technische Anforderungen

- Regeln werden als explizite, testbare Funktionen modelliert.
- Jede Regel liefert Ergebnis, Begruendung und betroffene Entitaeten.
- Simulationen arbeiten auf Snapshots, damit Ergebnisse reproduzierbar bleiben.
- Prisma wird als Datenzugriffsschicht vorgesehen.
- Tests vergleichen Engine-Ergebnisse mit dokumentierten Excel-Faellen.

## Datenobjekte im Arbeitsstand

- Event
- Teilnehmer oder Team
- Startgruppe
- Startwelle
- Bahn
- Regelset
- Planungsszenario
- Simulationslauf
- Regelverletzung oder Warnung

## Qualitaetssicherung

- Unit Tests fuer einzelne Regeln.
- Integrationstests fuer komplette Planungsszenarien.
- Regressionstests gegen bekannte Excel-Faelle.
- Edge-Case-Katalog als fachliche Testquelle.
