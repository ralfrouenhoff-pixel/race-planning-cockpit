# Edge Case Fixtures

Dieses Dokument beschreibt die ersten isolierten Edge-Case-Fixtures.

## Umfang

Die Fixtures liegen unter `tests/fixtures/edge-cases/index.ts` und sind gegen `@race-planning-cockpit/domain` typisiert.

Enthaltene Faelle:

- `missing-category`: Teilnehmer ohne Kategorie.
- `dns-after-assignment`: DNS nach initialer Planung.
- `late-registration`: Nachmeldung nach initialer Planung.
- `blocked-lane`: Bahn wird nach Planung blockiert.
- `manual-override`: manueller Override mit Begruendung.

## Zweck

Die Edge-Case-Fixtures sind bewusst klein und isoliert. Jede Fixture beschreibt genau einen Modellzustand, der spaeter von Rule Engine, UI und Tests bewertet werden kann.

Jede Fixture enthaelt zusaetzlich `expectedRuleResults`. Diese Ergebnisse sind Contract-Beispiele und werden noch nicht berechnet.

## Abgrenzung

Nicht enthalten:

- Simulationsergebnisse
- UI-spezifische Assertions
- Datenbank-Seeding
- echte personenbezogene Daten

## Typpruefung

Die Fixtures werden ueber `tests/tsconfig.json` in den Root-Typecheck eingebunden.

```bash
npm run typecheck
```

## Naechste Schritte

- Erwartete Rule-Ergebnisse definieren, sobald `RuleCheckResult` als Contract existiert.
- Edge-Case-Fixtures spaeter in UI- oder Engine-Tests wiederverwenden.
- Prisma-Seeds erst nach lokaler Migration gegen PostgreSQL ableiten.
