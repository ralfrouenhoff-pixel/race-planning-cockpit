# Domain Contracts

Dieses Dokument beschreibt das Package `@race-planning-cockpit/domain`.

## Zweck

Das Domain-Package stellt gemeinsame Typen und Contracts bereit, die spaeter von UI, Prisma-Mapping, Rule Engine, Simulation Engine und Tests genutzt werden koennen.

## Umfang

Enthalten:

- Status- und Enum-Contracts passend zum Prisma-Schema.
- einfache Entity-Contracts fuer Event-nahe Planungsobjekte.
- ein `PlanningSnapshotContract` als spaetere Eingabeform fuer Rule- und Simulation-Engines.

Nicht enthalten:

- Validierung
- Datenbankzugriff
- Mapper zwischen Prisma und Domain
- Rule Engine
- Simulation Engine
- Berechnungen oder Seiteneffekte

## Prinzip

Das Package beschreibt Sprache und Datenform, nicht Verhalten. Fachliche Entscheidungen werden weiterhin in Dokumenten, Tests und spaeteren Engine-Packages ausgearbeitet.

## Naechste Schritte

- Prisma-zu-Domain-Mapping erst einfuehren, wenn echte Datenabfragen entstehen.
- Rule-Result-Contracts in einem separaten Schritt definieren.
- Snapshot-Fixtures gegen `PlanningSnapshotContract` typisieren, sobald Fixtures angelegt werden.
