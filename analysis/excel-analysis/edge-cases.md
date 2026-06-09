# Edge Cases

Dieses Dokument sammelt Grenz- und Sonderfaelle, die aus Excel, Planungspraxis und spaeteren Tests in die Engines uebernommen werden.

## Ziel

Edge Cases dienen als fachliche Sicherheitsleine fuer Rule Engine, Simulation Engine und UI. Jeder Fall soll spaeter mit Beispielinput, erwarteter Bewertung und Teststatus dokumentiert werden.

## Kandidaten

- Teilnehmer ohne vollstaendige Kategorie.
- Doppelte Meldung oder widerspruechliche Zuordnung.
- Nachmeldung nach abgeschlossener Wellenplanung.
- DNS oder Streichung nach Bahnzuweisung.
- Welle ueberschreitet Kapazitaet knapp.
- Bahn ist kurzfristig nicht verfuegbar.
- Manuelle Override-Entscheidung erzeugt Folgekonflikt.
- Zwei Regeln liefern unterschiedliche Handlungsempfehlungen.
- Export wird angefordert, obwohl blockierende Fehler bestehen.

## Dokumentationsschema

Jeder Edge Case soll mindestens enthalten:

- Beschreibung
- Eingabedaten
- betroffene Regeln
- erwartetes Engine-Ergebnis
- erwartetes UI-Verhalten
- Teststatus

## Priorisierung

Edge Cases mit Sicherheits-, Kapazitaets- oder Veroeffentlichungsrisiko werden zuerst umgesetzt. Komfort- und Optimierungsfaelle folgen nach stabiler Kernplanung.
