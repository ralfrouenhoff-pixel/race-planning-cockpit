# Reference Scenario

Dieses Referenzszenario dient als fachliche Grundlage fuer das erste echte Prisma-Datenmodell. Es beschreibt einen kleinen, realistischen Planungsfall ohne Businesslogik zu implementieren.

## Zweck

- Pflichtfelder fuer die ersten Persistenzmodelle ableiten.
- Beziehungen zwischen Event, Teilnehmern, Gruppen, Wellen und Bahnen pruefen.
- Edge Cases konkretisieren.
- Test- und Seed-Daten fuer spaetere Sprints vorbereiten.

## Szenario: Poolbasierter Sprint-Triathlon

Ein lokaler Sprint-Triathlon nutzt ein Hallenbad mit sechs Bahnen. Die Schwimmstarts erfolgen in mehreren Wellen. Die Planung muss Teilnehmer gruppieren, Wellen bilden, Bahnen belegen und offensichtliche Konflikte sichtbar machen.

## Eventdaten

| Feld | Beispielwert | Modellrelevanz |
| --- | --- | --- |
| Name | Stadtwerke Sprint Triathlon 2027 | Pflichtfeld fuer `Event` |
| Datum | 2027-06-12 | Pflichtfeld fuer `Event` |
| Ort | Musterstadt Hallenbad | optionaler Standorttext |
| Status | draft | Eventstatus erforderlich |
| Poolbahnen | 6 | Poolkonfiguration erforderlich |
| Startfenster | 08:00 bis 12:00 | Zeitfenster fuer Simulation |

## Teilnehmerdaten

Sprint 2 sollte mit einer kleinen Datenmenge starten:

- 48 Einzelstarter
- 6 Staffeln
- 3 Kategorien: Jugend, Erwachsene, Masters
- 2 Distanzen: Sprint, Staffel-Sprint
- 1 Teilnehmer mit fehlender Kategorie
- 1 Nachmeldung nach initialer Wellenplanung
- 1 DNS nach Bahnzuweisung

## Planungsannahmen

- Eine Welle darf maximal 12 aktive Starts enthalten.
- Eine Bahn darf maximal 2 aktive Starts pro Welle enthalten.
- Staffeln sollen nicht mit Jugend-Einzelstartern auf derselben Bahn liegen.
- Nachmeldungen duerfen ein freigegebenes Szenario nicht still veraendern.
- Manuelle Overrides muessen eine Begruendung speichern.

Diese Annahmen sind noch keine implementierten Regeln. Sie dienen nur zur Modellpruefung.

## Erste Planungsobjekte

### Event

Das Event bildet den fachlichen Container fuer Teilnehmer, Poolkonfiguration, Regelparameter, Szenarien und Imports.

### Participant

Einzelstarter werden als Teilnehmer modelliert. Fuer Staffeln bleibt offen, ob ein `Team`-Modell benoetigt wird oder ob ein Teilnehmerdatensatz mit Typ `relay` reicht.

### StartGroup

Startgruppen entstehen aus Kategorie und Distanz. Sie sind stabiler als konkrete Wellen, weil mehrere Szenarien unterschiedliche Wellenbildung ausprobieren koennen.

### PlanningScenario

Das erste Szenario ist `Initial Draft`. Spaetere Varianten koennen Nachmeldungen, manuelle Korrekturen oder alternative Wellenverteilungen testen.

### Wave

Beispielwellen:

| Welle | Startzeit | Zielgruppe | Erwartete Starts |
| --- | --- | --- | --- |
| W1 | 08:00 | Jugend Sprint | 12 |
| W2 | 08:20 | Erwachsene Sprint | 12 |
| W3 | 08:40 | Erwachsene Sprint | 12 |
| W4 | 09:00 | Masters Sprint | 12 |
| W5 | 09:20 | Staffel-Sprint | 6 |

### Lane

Bahnen werden als Event-Konfiguration angelegt und in Szenarien ueber `LaneAssignment` belegt.

### LaneAssignment

Zuordnungen muessen auditierbar sein, weil automatische Planung und manuelle Overrides spaeter unterschieden werden.

## Edge Cases im Referenzszenario

| Fall | Erwartete Modellwirkung |
| --- | --- |
| Fehlende Kategorie | Participant bleibt importiert, Rule Check erzeugt Warnung oder Fehler |
| Nachmeldung | Neuer Import oder manuelle Anlage erzeugt neues Szenario oder Aenderungsstatus |
| DNS nach Bahnzuweisung | Assignment bleibt nachvollziehbar, aktiver Startstatus aendert sich |
| Ueberfuellte Welle | Wave bleibt speicherbar, Rule Check blockiert Freigabe |
| Bahn kurzfristig gesperrt | Lane-Status aendert sich, Szenario muss neu bewertet werden |

## Ableitungen fuer Prisma

Die erste Migration sollte nur Modelle enthalten, die fuer dieses Referenzszenario zwingend benoetigt werden:

- `Event`
- `Participant`
- `StartGroup`
- `PlanningScenario`
- `Wave`
- `Lane`
- `LaneAssignment`
- `ImportBatch`
- `ManualOverride`

`RuleSet`, `RuleCheckResult` und `SimulationRun` koennen danach folgen, sobald das Result-Format stabiler ist.

## Offene Entscheidungen vor der ersten Migration

- Team als eigenes Modell oder Participant-Typ?
- Kategorie und Distanz als freie Strings oder normalisierte Tabellen?
- Speicherung von Zeitfenstern als Eventfelder oder eigene Konfigurationsstruktur?
- Werden Lane Assignments auf Teilnehmer, Startgruppe oder beide bezogen?
- Wie wird ein freigegebenes Szenario gegen nachtraegliche Mutation geschuetzt?
