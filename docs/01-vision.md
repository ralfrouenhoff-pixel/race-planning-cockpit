# Vision

Race Planning Cockpit ist eine Planungs- und Simulationsplattform fuer poolbasierte Multisport-Events. Das System soll Veranstalter dabei unterstuetzen, Startwellen, Bahnen und Zeitplaene transparent, regelbasiert und nachvollziehbar zu planen.

## Zielbild

Die Anwendung verbindet fachliche Regeln aus bestehenden Excel-Planungen mit einer modernen, testbaren Softwarearchitektur. Planer sollen Szenarien schnell anpassen, Auswirkungen simulieren und robuste Entscheidungen treffen koennen, bevor Zeitplaene veroeffentlicht werden.

## Leitprinzipien

- Regelentscheidungen muessen erklaerbar sein.
- Simulationen muessen reproduzierbar sein.
- Eingriffe durch Planer bleiben moeglich, werden aber sichtbar dokumentiert.
- Excel dient als Analysequelle, nicht als dauerhafte Laufzeitlogik.
- UI, Engine und Datenmodell werden so getrennt, dass Regeln unabhaengig getestet werden koennen.

## Angenommene Kernnutzer

- Rennleitung und Organisations-Team
- Zeitnahme und Wettkampfkoordination
- Helferkoordination fuer Pool, Wechselzone und Startbereich
- Technische Administratoren fuer Import, Export und Audit

## Erfolgskriterien

- Ein Event kann mit Wellen, Bahnen, Kapazitaeten und Sonderfaellen modelliert werden.
- Regelverletzungen werden vor der Veroeffentlichung sichtbar.
- Mehrere Planungsszenarien koennen verglichen werden.
- Simulationsergebnisse liefern konkrete Hinweise zu Engpaessen.
- Die fachliche Logik ist durch Tests gegen Excel-Beispiele absicherbar.
