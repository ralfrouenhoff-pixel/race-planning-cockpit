# Reale Bahnenverteilungs-Regeln (extrahiert aus Triathlon_Zeitplan_v28.xlsx)

Quelle: reale Arbeitsmappe des 38. Erich-Fill-Triathlon (Ralf Rouenhoff), Stand 15.05.2026.
Ersetzt die bisherigen Platzhalter-Annahmen aus `docs/12-reference-scenario.md` und
`analysis/excel-analysis/lane-rules.md` (diese enthielten keine realen Werte).

## Grundprinzip: Konfigurierbarkeit vor Festlegung

Wichtigste Erkenntnis aus Rücksprache mit dem Fachexperten: **Es gibt keine einzelne
feste Zuteilungsregel.** Sortier-/Gruppierungskriterien (Alter, Geschlecht, Schwimmtempo,
Sub-Liga-Trennung) müssen als **optionale, pro Event/Szenario aktivierbare Bausteine**
modelliert werden – nicht als hartcodierte Fachregel.

→ **Konsequenz für `packages/rules`:** `RuleSet` muss deklarativ sein (Konfiguration,
nicht Code). Jede einzelne Regel ist ein Baustein, der pro Event ein-/ausgeschaltet und
parametriert werden kann.

## 1. Fixe Rahmenbedingungen (nicht konfigurierbar, Beckeninfrastruktur)

- **Anzahl Bahnen: immer 5** (feste Beckeninfrastruktur, gilt für alle Formate)
- **Pause zwischen Wellen: 5 Minuten** (Zeit vom Ende einer Welle bis Start der nächsten)

## 2. Kapazität pro Bahn (konfigurierbar, Wertebereich statt fixer Zahl)

- Es gibt **keinen einzelnen festen Maximalwert**. Beobachtet in der Praxis:
  - AK-Rennen: Standardwert 10, Ausnahme bis 12 möglich
  - Liga-Rennen: fix 12 hinterlegt (aber auch das ist ein konfigurierter Wert, kein Naturgesetz)
- Ralfs Klarstellung: **12 ist die Obergrenze der Option, 11 ist genauso ein gültiger Wert.**
  → Kapazität pro Bahn muss als **einstellbarer Bereich (z.B. min/max oder freier Zahlenwert
  pro Event/Szenario)** modelliert werden, nicht als binäre Ausnahme-Regel.
- Beobachtetes Optimierungsmuster (nicht zwingend zu automatisieren, aber als Option denkbar):
  Die Erhöhung der Kapazität pro Bahn wurde in der Praxis genutzt, um eine ganze Welle
  einzusparen. Das kann als **optionale Optimierungsfunktion** angeboten werden
  ("Prüfe, ob höhere Bahnkapazität eine Welle spart"), muss aber keine Pflichtlogik sein.

## 3. Verteilungsalgorithmus auf die Bahnen (stabil, sobald eine Gruppe/Welle feststeht)

Sobald feststeht, wie viele Teilnehmer in eine Welle gehen, ist die reine
Zahlen-Verteilung auf die 5 Bahnen ein stabiler, unabhängig vom Sortierkriterium
geltender Algorithmus:

```
pro_bahn_basis = floor(teilnehmer_in_welle / anzahl_bahnen)
rest = teilnehmer_in_welle mod anzahl_bahnen
# Die ersten `rest` Bahnen bekommen +1 Teilnehmer
```

Beispiel (bestätigt in den Daten): 49 Teilnehmer → Bahn 1–4 je 10, Bahn 5 nur 9.

## 4. Sortier-/Gruppierungskriterien (alle optional, kombinierbar)

Beobachtete Kriterien in der Praxis (als Bausteine, nicht als Zwangsregel):

- **Altersklasse (aufsteigend sortiert):** erzeugt Cluster benachbarter Altersklassen
  auf angrenzenden Bahnen (z.B. Bahn 1: AK20+Junioren, Bahn 4: AK40+AK50) – aber keine
  strikte "eine AK = eine Bahn"-Regel, Grenzen zwischen Bahnen sind fließend.
- **Geschlecht:** wurde in der Praxis genutzt, um eigene Wellen zu bilden (nicht nur
  eigene Bahnen) – muss aber laut Ralf **optional** bleiben, nicht verpflichtend.
- **Schwimmtempo/Meldezeit:** als Kriterium gewünscht, aber aktuell nicht in der
  Startliste erfasst (Spalte "Schwimmzeit" ist in der Praxis meist leer) →
  bestätigt den bereits bekannten Punkt: **Schwimmzeit-Schätzung sollte in RaceResult
  ein Pflichtfeld werden**, damit dieses Kriterium später nutzbar ist.
- **Sub-Liga-Trennung** (z.B. Damen ≠ Masters auf komplett getrennten Bahnen):
  **situativ**, abhängig von der jeweiligen Verbandsvorgabe pro Liga/Event – nicht
  generell für alle Ligen mit Untergruppen. Muss pro Event/Szenario ein-/ausschaltbar sein.

→ **Konsequenz:** Die Rule Engine braucht kein festes "Zuteilungs-Regelwerk", sondern
einen **konfigurierbaren Sortier-/Gruppierungs-Baukasten**: eine geordnete Liste aktiver
Kriterien pro Event, die nacheinander angewendet werden (z.B. erst Sub-Liga-Trennung
als harte Gruppengrenze, dann innerhalb jeder Gruppe Sortierung nach Altersklasse),
gefolgt vom stabilen Verteilungsalgorithmus aus Punkt 3.

## 5. Wellenreihenfolge

Konfigurierbar über eine Prioritätsangabe pro Gruppe (in der Praxis: Werte 1–8,
jeder genau einmal vergeben) – bestimmt, in welcher Reihenfolge Gruppen im
Tagesablauf schwimmen. Nicht hartcodiert.

## 6. Was in der Excel-Datei NICHT automatisiert war

Die eigentliche Bahnzuteilung (wer sitzt in welcher Bahn) war **komplett manuell**
gepflegt – nur Namens-/Vereins-/AK-Lookups liefen über Formeln. Es gab keine
"Engine", die aus den Kriterien automatisch eine Zuteilung berechnet hat. Das ist
genau die Lücke, die `packages/rules` / die neue App schließen soll.

## Offene Punkte für die Architektur-Entscheidung

1. Reihenfolge/Priorität der Kriterien, wenn mehrere gleichzeitig aktiv sind
   (z.B. Sub-Liga-Trennung UND Altersklassen-Sortierung UND Geschlechtertrennung
   gleichzeitig) – braucht eine definierte Anwendungsreihenfolge (harte Gruppengrenzen
   zuerst, dann Sortierung innerhalb der Gruppe).
2. Soll die "Welle sparen durch höhere Kapazität"-Optimierung ein manueller Vorschlag
   der App sein (Nutzer entscheidet) oder vollautomatisch angewendet werden?
   → Empfehlung: manueller Vorschlag, da Ralf explizit von "Option" sprach.
