# Current Engine

Dieses Dokument beschreibt den Arbeitsstand der bestehenden Excel-Logik, die in die spaetere Rule Engine und Simulation Engine ueberfuehrt werden soll.

## Analyseziel

- Bestehende Formeln, Tabellenblaetter und manuelle Schritte identifizieren.
- Fachliche Regeln von Excel-spezifischer Umsetzung trennen.
- Implizite Annahmen sichtbar machen.
- Testfaelle fuer die neue Engine ableiten.

## Erwartete Excel-Bereiche

- Stammdaten fuer Teilnehmer, Gruppen und Kategorien.
- Parameter fuer Wellen, Bahnen und Startabstaende.
- Berechnungen fuer Startzeiten und Belegung.
- Kontrollspalten fuer Konflikte oder Plausibilitaet.
- Manuelle Korrekturen, die aktuell nicht automatisch erklaerbar sind.

## Zu klaerende Fragen

- Welche Tabellenblaetter sind fuehrend?
- Welche Felder duerfen Nutzer manuell veraendern?
- Welche Formeln bilden echte Fachregeln ab?
- Welche Regeln sind historisch gewachsen und koennen vereinfacht werden?
- Welche Ergebnisse werden exportiert oder operativ genutzt?

## Ueberfuehrung in Software

Jede identifizierte Excel-Regel wird einem Zielmodul zugeordnet:

- Wellenlogik nach `wave-rules.md`
- Bahnlogik nach `lane-rules.md`
- Simulationslogik nach `simulation-rules.md`
- Grenzfaelle nach `edge-cases.md`

## Naechste Schritte

- Reale Excel-Arbeitsmappe inventarisieren.
- Formeln und manuelle Prozessschritte dokumentieren.
- Beispielinputs und erwartete Outputs sichern.
- Regressionstests fuer die wichtigsten Planungsfaelle definieren.
