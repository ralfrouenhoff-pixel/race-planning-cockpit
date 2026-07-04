# Data Model Plan

Dieses Dokument plant das Datenmodell fuer Race Planning Cockpit. Es ist bewusst noch kein Prisma-Implementierungsmodell. Ziel ist, die fachlichen Entitaeten und offenen Entscheidungen vor der ersten Migration sauber zu klaeren.

## Modellierungsprinzipien

- Persistierte Daten beschreiben Planungszustand, Entscheidungen und auditierbare Ergebnisse.
- Rule Engine und Simulation Engine arbeiten spaeter auf Snapshots, nicht direkt auf mutierbaren UI-Objekten.
- Event-spezifische Regeln muessen versionierbar bleiben.
- Manuelle Overrides werden als Entscheidung mit Begruendung gespeichert, nicht als unsichtbare Datenkorrektur.
- Imports behalten ihre Herkunft, damit Excel-Abweichungen nachvollziehbar bleiben.

## Kernentitaeten

### Event

Repräsentiert eine Veranstaltung mit Datum, Ort, Status und globalen Planungsparametern.

Geplante Beziehungen:

- hat viele Planungsszenarien
- hat viele Teilnehmer oder Teams
- hat eine Pool- und Bahnkonfiguration
- nutzt ein oder mehrere Regelsets

### Participant

Repräsentiert eine gemeldete Person oder, falls fachlich erforderlich, ein Teammitglied. Ob Teams als eigene Entitaet modelliert werden, bleibt offen.

Geplante Beziehungen:

- gehoert zu einem Event
- kann einer Startgruppe zugeordnet werden
- kann ueber Imports entstanden sein

### StartGroup

Fachliche Gruppierung vor der konkreten Wellenplanung, zum Beispiel Kategorie, Altersklasse, Distanz oder organisatorische Gruppe.

Geplante Beziehungen:

- gehoert zu einem Event
- enthaelt Teilnehmer oder Teams
- wird in Planungsszenarien auf Wellen verteilt

### PlanningScenario

Versionierter Planungsstand. Szenarien erlauben Vergleich, Review und spaetere Freigabe.

Geplante Beziehungen:

- gehoert zu einem Event
- enthaelt Wellen- und Bahnzuordnungen
- hat Rule Checks
- hat Simulation Runs
- kann als freigegebene Version markiert werden

### Wave

Konkrete Startwelle innerhalb eines Szenarios.

Geplante Beziehungen:

- gehoert zu einem Planungsszenario
- enthaelt Startgruppen oder Teilnehmerzuordnungen
- hat geplante Startzeit und Kapazitaetsdaten
- wird gegen Wellenregeln geprueft

### Lane

Physische oder logische Poolbahn.

Geplante Beziehungen:

- gehoert zur Poolkonfiguration eines Events
- kann pro Szenario und Welle belegt werden
- hat Kapazitaets- und Statusinformationen

### LaneAssignment

Zuordnung von Teilnehmern, Teams oder Gruppen auf eine Bahn innerhalb einer Welle.

Geplante Beziehungen:

- gehoert zu einer Welle
- referenziert eine Bahn
- referenziert Teilnehmer, Team oder Startgruppe
- kann automatisch oder manuell entstanden sein

### RuleSet

Versionierte Sammlung von Regeldefinitionen und Parametern.

Geplante Beziehungen:

- gehoert zu einem Event oder ist als Vorlage wiederverwendbar
- wird von Planungsszenarien genutzt
- erzeugt Rule Check Results

### RuleCheckResult

Persistiertes Ergebnis einer Regelpruefung.

Geplante Felder:

- Status: `pass`, `warning`, `fail`
- Schweregrad
- Regelkennung
- Begruendung
- betroffene Entitaeten
- Snapshot-Referenz

### SimulationRun

Reproduzierbarer Simulationslauf fuer ein Planungsszenario.

Geplante Beziehungen:

- gehoert zu einem Planungsszenario
- basiert auf einem Snapshot
- erzeugt Kennzahlen, Warnungen und Konflikte

### ImportBatch

Dokumentiert importierte Quelldaten, zum Beispiel Excel oder CSV.

Geplante Beziehungen:

- gehoert zu einem Event
- erzeugt oder aktualisiert Teilnehmerdaten
- speichert Quelle, Zeitpunkt und Importstatus

### ManualOverride

Auditierbare manuelle Entscheidung.

Geplante Beziehungen:

- gehoert zu Event oder Szenario
- referenziert betroffene Entitaet
- enthaelt Begruendung und Autor
- kann Rule Checks beeinflussen

## Geplante technische Typen

- Statusfelder als Prisma `enum`, sobald Werte stabil sind.
- `Json`-Felder fuer Snapshots, Import-Metadaten und Rule-Kontext, solange die Struktur noch in Bewegung ist.
- Explizite Join-Modelle fuer Zuordnungen, wenn Entscheidungen auditierbar sein muessen.
- Timestamps fuer alle auditrelevanten Modelle.

## Offene Entscheidungen

- Werden Teams als eigene Top-Level-Entitaet benoetigt oder reicht Participant mit Gruppenbezug?
- Werden Kategorien, Altersklassen und Distanzen normalisiert oder zunaechst als konfigurierbare Werte gespeichert?
- Wie granular muss die Poolkonfiguration sein?
- Welche RuleSet-Teile sind deklarative Daten und welche bleiben Code?
- Wie lange werden Simulationsergebnisse persistiert?
- Welche Nutzer- und Rolleninformationen werden vor Authentifizierung benoetigt?

## Nicht in Sprint 1

- Keine produktiven Prisma-Modelle.
- Keine Migrationen mit fachlichen Tabellen.
- Keine Seed-Daten.
- Keine Businesslogik fuer Wellen, Bahnen, Regeln oder Simulation.

## Naechster Schritt

Vor der ersten Migration sollte ein Beispiel-Event als fachliches Referenzszenario dokumentiert werden. Daraus werden Pflichtfelder, Kardinalitaeten und erste Prisma-Modelle abgeleitet.
