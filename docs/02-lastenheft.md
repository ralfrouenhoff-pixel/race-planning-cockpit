# Lastenheft

Dieses Dokument beschreibt die fachlichen Anforderungen an das Race Planning Cockpit aus Sicht der Anwender. Es ist ein Arbeitsstand und wird mit realen Excel-Beispielen, Eventregeln und Nutzerfeedback konkretisiert.

## Ausgangssituation

Poolbasierte Multisport-Events werden haeufig mit Excel geplant. Dabei entstehen Regeln fuer Startwellen, Bahnen, Altersklassen, Kapazitaeten, Abstaende und Sonderfaelle, die schwer zu pruefen und noch schwerer zu simulieren sind.

## Ziele

- Planung von Startwellen und Bahnbelegung zentralisieren.
- Bestehende Excel-Regeln analysieren und in eine Rule Engine ueberfuehren.
- Simulationen fuer Kapazitaet, Timing und Konflikte bereitstellen.
- Manuelle Entscheidungen nachvollziehbar machen.
- Exportfaehige Ergebnisse fuer operative Nutzung erzeugen.

## Fachliche Anforderungen

- Athleten, Teams oder Startgruppen koennen importiert und kategorisiert werden.
- Wellen werden aus Regeln, Kapazitaeten und Planerentscheidungen gebildet.
- Bahnen werden nach Kapazitaet, Sicherheit und Fairness belegt.
- Simulationen pruefen Engpaesse, Konflikte und zeitliche Ueberlagerungen.
- Edge Cases wie Nachmeldungen, DNS, besondere Startrechte oder Bahnwechsel werden explizit behandelt.
- Ergebnisse muessen fuer Review und Freigabe nachvollziehbar sein.

## Nichtfunktionale Anforderungen

- Regelwerke sind versionierbar und testbar.
- Simulationen liefern deterministische Ergebnisse bei gleichem Input.
- Die UI muss Planungsentscheidungen schnell vergleichbar machen.
- Datenimporte und Exporte muessen robust gegen fehlerhafte Eingaben sein.
- Architektur und Datenmodell sollen spaetere Eventtypen ermoeglichen.

## Abgrenzung

Dieses Projekt ersetzt nicht automatisch Zeitnahme-Systeme, Meldesysteme oder offizielle Ergebnisdienste. Es liefert die Planungs-, Regel- und Simulationsschicht, die solche Systeme vorbereiten oder beliefern kann.
