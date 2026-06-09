# Simulation Engine

Die Simulation Engine berechnet Auswirkungen einer Planung, bevor sie operativ eingesetzt wird. Sie soll Engpaesse, Konflikte und zeitliche Risiken sichtbar machen.

## Zweck

- Planungsszenarien vergleichbar machen.
- Startwellen und Bahnbelegungen gegen Kapazitaeten pruefen.
- Auswirkungen von Nachmeldungen, Verschiebungen und Overrides simulieren.
- Entscheidungsgrundlagen fuer Rennleitung und Organisation liefern.

## Eingaben

- Event-Konfiguration
- Teilnehmer- oder Gruppenliste
- Startwellen und Bahnzuordnungen
- Regelset und Kapazitaetsannahmen
- optionale Parameter fuer Puffer, Durchsatz und Sonderfaelle

## Ausgaben

- Simulationsstatus pro Szenario
- erwartete Konflikte und Engpaesse
- Hinweise auf instabile Planungspunkte
- Kennzahlen zu Bahnbelegung, Wartezeiten und Startdichte
- reproduzierbarer Snapshot fuer Review und Tests

## Simulationsprinzipien

- Deterministisch bei gleichem Input.
- Nebenwirkungsfrei auf unveraenderten Snapshots.
- Trennung zwischen Berechnung und Bewertung.
- Ergebnisdaten muessen durch Rule Engine und UI weiterverwendbar sein.

## Offene Modellannahmen

- Granularitaet der Zeitschritte.
- Umgang mit statistischen Unsicherheiten.
- Bewertung von Sicherheits- und Fairnessrisiken.
- Umfang der Echtzeit-Anpassung waehrend eines Events.

## Naechste Schritte

- Minimalen Szenario-Snapshot definieren.
- Bekannte Excel-Simulationsregeln dokumentieren.
- Testfaelle fuer Standard-, Grenz- und Fehlerfaelle anlegen.
- Kennzahlen fuer den ersten UI-Vergleich festlegen.
