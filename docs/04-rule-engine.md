# Rule Engine

Die Rule Engine ist die fachliche Entscheidungsschicht des Race Planning Cockpits. Sie bewertet, ob eine Planung die definierten Regeln fuer Startwellen, Bahnen, Kapazitaeten und Sonderfaelle einhaelt.

## Zweck

- Excel-Regeln in nachvollziehbare Softwarelogik ueberfuehren.
- Regelverletzungen frueh sichtbar machen.
- Automatische Vorschlaege und manuelle Eingriffe einheitlich pruefen.
- Begruendungen fuer Entscheidungen speichern und anzeigen.

## Grundkonzept

Jede Regel wird als isolierte, testbare Einheit modelliert. Eine Regel erhaelt einen Planungs-Snapshot und liefert ein strukturiertes Ergebnis:

- Status: `PASS`, `WARNING` oder `FAIL`
- Betroffene Objekte: Welle, Bahn, Teilnehmergruppe oder Event
- Begruendung: fachlicher Text fuer UI und Audit
- Schweregrad: Hinweis, blockierender Fehler oder Planungsrisiko

Die ersten Rule-Result-Contracts sind in `docs/20-rule-result-contracts.md` dokumentiert.

## Regelbereiche

- Wellenbildung: Gruppengroessen, Startabstaende, Kategorien und Prioritaeten.
- Bahnbelegung: Kapazitaet, Balance, Sicherheitsabstaende und Konflikte.
- Simulation: zeitliche Ueberlagerungen, Engpaesse und Durchsatz.
- Datenqualitaet: fehlende Felder, doppelte Zuordnungen, ungueltige Werte.
- Manuelle Overrides: Erlaubnis, Begruendung und Folgewirkung.

## Offene Entscheidungen

- Ob Regeln deklarativ konfiguriert oder in Code versioniert werden.
- Wie Event-spezifische Regelvarianten verwaltet werden.
- Welche Regelverletzungen blockieren und welche nur warnen.
- Wie stark die UI beim Korrigieren von Regelverstoessen assistiert.

## Naechste Schritte

- Excel-Regeln aus `analysis/excel-analysis/` katalogisieren.
- Minimalen Rule-Engine-Package-Schnitt definieren.
- Erste Unit Tests fuer Wellen- und Bahnregeln erstellen.
- Beispiel-Szenario mit Regelverletzungen dokumentieren.
