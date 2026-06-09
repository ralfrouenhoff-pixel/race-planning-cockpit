# Wave Rules

Dieses Dokument sammelt Regeln fuer die Bildung und Bewertung von Startwellen.

## Ziel

Startwellen sollen Kapazitaeten, Fairness, Sicherheit und operative Umsetzbarkeit beruecksichtigen. Die Regeln muessen aus Excel nachvollziehbar in die Rule Engine ueberfuehrt werden.

## Regelkategorien

- Maximale Teilnehmerzahl pro Welle.
- Mindestabstand zwischen Wellen.
- Gruppierung nach Kategorie, Altersklasse, Team oder Leistungsniveau.
- Priorisierung bestimmter Startgruppen.
- Umgang mit Nachmeldungen und Ummeldungen.
- Vermeidung zeitlicher Konflikte mit anderen Eventabschnitten.

## Erwartete Eingaben

- Teilnehmer- oder Gruppenliste
- Kategorie- und Startgruppeninformationen
- Event-Zeitfenster
- Kapazitaetsparameter
- manuelle Override-Entscheidungen

## Erwartete Ausgaben

- vorgeschlagene Wellenstruktur
- Regelverletzungen pro Welle
- Begruendungen fuer Gruppierung oder Trennung
- Hinweise auf Unter- oder Ueberauslastung

## Testideen

- Standardfall mit gleichmaessig gefuellten Wellen.
- Ueberlauf bei maximaler Wellengroesse.
- Nachmeldung kurz vor Freigabe.
- Kategorie, die nicht getrennt werden darf.
- Manuelle Verschiebung mit Folgekonflikt.
