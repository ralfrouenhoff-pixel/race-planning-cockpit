# Simulation Rules

Dieses Dokument sammelt Regeln und Annahmen fuer die Simulation von Planungsszenarien.

## Ziel

Simulationen sollen zeigen, ob eine geplante Wellen- und Bahnstruktur operativ tragfaehig ist. Sie verbinden Regelbewertung mit zeitlicher und kapazitativer Wirkung.

## Regelkategorien

- Startdichte und Mindestpuffer.
- Durchsatz pro Bahn oder Abschnitt.
- Wartezeiten und Ueberlappungen.
- Engpaesse durch Wechselzonen oder Sammelpunkte.
- Auswirkungen von Nachmeldungen, DNS und Verschiebungen.
- Bewertung von Szenario-Alternativen.

## Erwartete Eingaben

- vollstaendiger Planungs-Snapshot
- Ergebnis der Rule Engine
- Event-Parameter und Zeitfenster
- Kapazitaetsannahmen
- optionale Stoerfallannahmen

## Erwartete Ausgaben

- Kennzahlen pro Szenario
- Konflikt- und Engpassliste
- Risikoindikatoren
- Vergleichswerte fuer alternative Planungen

## Testideen

- Basisszenario ohne Regelverletzungen.
- Ueberlastete Startphase.
- Verzogerung einer Welle mit Ketteneffekt.
- Reduzierte Bahnkapazitaet.
- Szenariovergleich vor und nach manueller Korrektur.
