# Prisma Schema V1

Dieses Dokument beschreibt die erste fachliche Prisma-Schema-Version. Sie basiert auf `docs/12-reference-scenario.md` und implementiert nur Persistenzstrukturen.

## Umfang

Enthaltene Modelle:

- `Event`
- `Participant`
- `StartGroup`
- `PlanningScenario`
- `Wave`
- `Lane`
- `LaneAssignment`
- `ImportBatch`
- `ManualOverride`

## Bewusste Abgrenzung

Nicht enthalten:

- Rule Engine
- Simulation Engine
- RuleSet
- RuleCheckResult
- SimulationRun
- Authentifizierung
- produktive Seed-Daten

Diese Bereiche folgen erst, wenn Result-Formate, Nutzerrollen und Excel-Regeln stabiler beschrieben sind.

## Modellierungsentscheidungen

- Staffeln werden zunaechst ueber `Participant.kind = RELAY` abgebildet. Ein eigenes Team-Modell wird erst eingefuehrt, wenn Staffelmitglieder separat geplant werden muessen.
- Kategorie und Distanz bleiben zunaechst String-Felder. Eine Normalisierung wird erst eingefuehrt, wenn echte Konfigurationsanforderungen bekannt sind.
- `LaneAssignment` kann entweder auf einen Teilnehmer oder eine Startgruppe verweisen. Die Anwendung muss spaeter validieren, dass mindestens eine dieser Referenzen gesetzt ist.
- `ManualOverride` nutzt `scope` und `targetId`, statt frueh polymorphe Relationen zu erzwingen.
- `Json`-Felder werden fuer instabile Metadaten genutzt und spaeter bei Bedarf normalisiert.

## Technische Hinweise

- Das Schema ist fuer PostgreSQL vorbereitet.
- Die initiale SQL-Migration liegt unter `prisma/migrations/20260704120000_init_data_model/migration.sql`.
- Die Migration wurde per `prisma migrate diff` aus dem Schema erzeugt.
- Sie wurde noch nicht gegen eine laufende PostgreSQL-Datenbank angewendet, weil Docker in der aktuellen Umgebung nicht verfuegbar ist.
- `prisma format` und `prisma generate` muessen fuer jede Schema-Aenderung gruen bleiben.
