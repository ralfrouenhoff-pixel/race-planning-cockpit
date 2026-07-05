# Roadmap

Diese Roadmap beschreibt einen pragmatischen Aufbau vom dokumentierten Excel-Verstaendnis zur testbaren Planungsplattform.

## Phase 1: Fundament

- Projektstruktur initialisieren.
- Vision, Lastenheft und Pflichtenheft pflegen.
- Excel-Analyse in fachliche Regelbereiche aufteilen.
- Erste Domain-Objekte und Teststrategie definieren.

## Phase 2: Rule Engine MVP

- Referenzszenario fuer das erste Prisma-Datenmodell festlegen.
- Referenzszenario fachlich gegen Excel-Beispiele validieren.
- Erste fachliche Prisma-Modelle und Migrationen anlegen.
- Fixture- und Seed-Strategie fuer Referenzszenario und Edge Cases festlegen.
- Domain-Contracts als gemeinsame Sprache zwischen UI, Prisma, Tests und spaeteren Engines vorbereiten.
- RuleSet, RuleCheckResult und SimulationRun nach Stabilisierung der Result-Formate ergaenzen.
- Rule-Result-Format definieren.
- Wellenregeln implementieren.
- Bahnregeln implementieren.
- Edge Cases aus der Excel-Analyse als Tests abbilden.

## Phase 3: Simulation MVP

- Szenario-Snapshot definieren.
- Simulation fuer Standardplanung implementieren.
- Engpass- und Konfliktkennzahlen berechnen.
- Vergleich mehrerer Szenarien vorbereiten.
- Wellen-Optimierung: Pruefen, ob hoehere Bahnkapazitaet eine Welle einspart (manueller Vorschlag, kein Automatismus, siehe `docs/18-real-world-lane-rules.md` Abschnitt 6).

## Phase 4: UI-Prototyp

- Event-Uebersicht erstellen.
- Import- und Validierungsansicht vorbereiten.
- Wellen- und Bahnplanung visualisieren.
- Simulationsergebnisse handlungsorientiert darstellen.

## Phase 5: Persistenz und Betrieb

- Prisma-Datenmodell ausarbeiten.
- Migrationen und Seeds anlegen.
- Export- und Auditfunktionen ergaenzen.
- CI, Tests und Review-Prozess etablieren.

## Erste Meilensteine

- M1: Dokumentierte Excel-Regeln und Edge Cases.
- M2: Testbare Rule Engine fuer Kernfaelle.
- M3: Reproduzierbare Simulation eines kompletten Events.
- M4: Bedienbarer UI-Prototyp fuer Szenariovergleich.
