# Lane Rules

Dieses Dokument sammelt Regeln fuer die Belegung von Poolbahnen.

## Ziel

Bahnbelegungen sollen Kapazitaeten einhalten, Konflikte vermeiden und eine faire Verteilung innerhalb der Startwellen ermoeglichen.

## Regelkategorien

- Maximale Belegung pro Bahn.
- Verteilung von Teilnehmern oder Gruppen auf verfuegbare Bahnen.
- Kompatibilitaet von Kategorien innerhalb einer Bahn.
- Sicherheitsabstaende und operative Restriktionen.
- Umgang mit gesperrten oder reservierten Bahnen.
- Abhaengigkeit zwischen Bahnbelegung und Startzeit.

## Erwartete Eingaben

- Wellenstruktur
- Pool- und Bahnkonfiguration
- Teilnehmergruppen
- Kapazitaets- und Sicherheitsparameter
- manuelle Bahnzuweisungen

## Erwartete Ausgaben

- Bahnzuweisung pro Welle
- Warnungen bei unguenstiger Balance
- Fehler bei Kapazitaetsueberschreitung
- Hinweise auf moegliche Alternativen

## Testideen

- Gleichmaessige Verteilung ueber alle Bahnen.
- Eine Bahn ist gesperrt.
- Eine Kategorie benoetigt getrennte Bahnbelegung.
- Kapazitaet reicht nicht fuer geplante Welle.
- Manuelle Zuweisung verletzt eine Bahnregel.
