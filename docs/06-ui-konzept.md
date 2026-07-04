# UI-Konzept

Die UI des Race Planning Cockpits soll komplexe Planungslogik sichtbar und korrigierbar machen, ohne Anwender mit technischer Engine-Logik zu belasten.

## Zielgruppen

- Planer, die Wellen und Bahnen vorbereiten.
- Rennleitung, die Szenarien freigibt.
- Operative Nutzer, die Plaene exportieren oder kontrollieren.
- Technische Nutzer, die Importfehler und Regelwerke pruefen.

## Hauptansichten

- Event-Uebersicht mit Planungsstatus und offenen Risiken.
- Import- und Datenqualitaetsansicht.
- Wellenplanung mit Regelhinweisen.
- Bahnplanung mit Kapazitaets- und Konfliktanzeige.
- Simulation mit Szenariovergleich.
- Review-Ansicht fuer Freigabe, Export und Audit.

## Sprint-1-Shell

Die erste UI-Struktur enthaelt Platzhalterseiten fuer:

- Overview
- Events
- Scenarios
- Participants
- Waves
- Lanes
- Simulation

Diese Seiten verwenden statische Referenzdaten aus der Dokumentation. Sie enthalten noch keine Datenbankabfragen, keine Rule Engine und keine Simulation.

## Bedienprinzipien

- Regelverletzungen werden direkt am betroffenen Objekt angezeigt.
- Warnungen enthalten eine fachliche Begruendung und moegliche Aktionen.
- Manuelle Overrides sind moeglich, aber begruendungspflichtig.
- Szenarien koennen dupliziert, verglichen und verworfen werden.
- Exportfunktionen sind erst nach definierter Mindestpruefung prominent.

## Informationsarchitektur

Die UI priorisiert operative Klarheit: zuerst Status und Risiken, danach Detailtabellen und Konfiguration. Komplexe Engine-Ergebnisse werden in handlungsorientierte Hinweise uebersetzt.

## Offene Entscheidungen

- Ob die erste Anwendung als Admin-Web-App oder internes Cockpit startet.
- Welche Tabellen- und Grid-Komponenten fuer grosse Teilnehmerlisten genutzt werden.
- Wie viel Regelkonfiguration in der UI erlaubt ist.
- Welche Exportformate fuer den ersten Release notwendig sind.
