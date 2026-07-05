# Rule Result Contracts

Dieses Dokument beschreibt die ersten Rule-Result-Contracts im Domain-Package.

## Umfang

Die Contracts liegen in `packages/domain/src/types.ts`.

Enthalten:

- `RuleResultStatus`
- `RuleSeverityLevel`
- `RuleTargetType`
- `RuleTargetContract`
- `RuleCheckResultContract`
- `RuleEvaluationContract`

## Zweck

Die Contracts beschreiben, wie spaetere Rule-Ergebnisse strukturiert werden. Sie implementieren keine Regeln.

Ein Rule-Ergebnis besteht aus:

- stabiler Rule-ID
- lesbarem Rule-Namen
- Status
- Severity
- Meldung
- betroffenen Zielobjekten

## Statuswerte

- `PASS`: Regel wurde erfuellt.
- `WARNING`: Regel weist auf ein Risiko oder Review-Thema hin.
- `FAIL`: Regelverletzung liegt vor.

## Severity

- `INFO`: dokumentations- oder reviewrelevanter Hinweis.
- `WARNING`: planungsrelevantes Risiko.
- `BLOCKING`: Freigabe sollte blockiert werden.

## Aktuelle Nutzung

Die Edge-Case-Fixtures enthalten erste erwartete Rule-Ergebnisse:

- fehlende Kategorie
- DNS nach Zuweisung
- Nachmeldung
- blockierte Bahn
- manueller Override

Diese erwarteten Ergebnisse dienen als Contract-Beispiele. Sie werden noch nicht berechnet.

## Abgrenzung

Nicht enthalten:

- Rule Engine
- Rule-Ausfuehrung
- Rule-Konfiguration
- Persistenzmodell fuer Rule Checks
- UI-Darstellung von Rule-Ergebnissen

## Naechste Schritte

- Minimalen Rule-Engine-Package-Schnitt definieren.
- Erst danach pure Rule-Funktionen fuer Edge Cases implementieren.
- Prisma-Modell `RuleCheckResult` erst ergaenzen, wenn Persistenzbedarf und Result-Format stabil sind.
