# Race Planning Cockpit — Project Context

Planning and simulation platform for pool-based multisport events (Schwimmen/Multisport, poolbasiert). Replaces Excel-based planning of start waves, lanes and schedules with a rule-based, testable system. See `docs/01-vision.md` for the full vision.

Core idea: Excel is the analysis source, not the runtime logic (`analysis/excel-analysis/`). Rules must be explainable, simulations must be deterministic/reproducible, manual planner overrides stay possible but are always logged with a reason.

## Status: pre-MVP scaffolding only

This is **Sprint 1** of the roadmap (`docs/07-roadmap.md`, Phase 1 "Fundament"). Nothing business-relevant runs yet:

- No Rule Engine implemented (only contracts/types exist).
- No Simulation Engine implemented.
- No Excel import.
- No Prisma reads/writes from the UI — pages render static/typed fixture data only.
- No auth, no roles.
- Postgres runs locally via Docker Compose and is migrated: `docker compose up -d` + `npx prisma migrate deploy` have been run successfully, container is healthy, `npm run dev` serves the dashboard on `localhost:3000`. The schema exists in the DB — but the UI still doesn't read/write it (fixture-backed only), and there's no seed data yet.

Docs are far ahead of code — treat `docs/` as the spec/roadmap, not as a description of working software.

## Repo structure

- `apps/web/` — Next.js 15 + TypeScript + Tailwind app (`@race-planning-cockpit/web`). Pages: `/`, `/events`, `/scenarios`, `/participants`, `/waves`, `/lanes`, `/simulation` — all placeholders backed by typed reference fixtures (`apps/web/src/lib/reference-scenario-view.ts`, `apps/web/src/lib/workspace.ts`), no DB calls yet.
- `packages/domain/` — `@race-planning-cockpit/domain`: pure TypeScript contracts only (no logic, no validation, no DB access). Defines enums matching the Prisma schema plus `PlanningSnapshotContract` and `RuleCheckResultContract`/`RuleEvaluationContract` (see `packages/domain/src/types.ts`).
- `prisma/schema.prisma` — first real data model (see Data model below). Migration `prisma/migrations/20260704120000_init_data_model/` has been applied to the local Postgres instance (via `docker compose up -d` + `npx prisma migrate deploy`).
- `tests/` — only typed fixtures so far: `tests/fixtures/reference-scenario/` and `tests/fixtures/edge-cases/`. No unit/integration/E2E tests exist yet (planned per `tests/README.md`).
- `analysis/excel-analysis/` — reverse-engineered documentation of the legacy Excel planning rules (`current-engine.md`, `wave-rules.md`, `lane-rules.md`, `simulation-rules.md`, `edge-cases.md`, plus `samples/`). This is the source of truth for what the Rule/Simulation Engine must eventually reproduce.
- `docs/` — numbered spec/roadmap documents, see index below.

## Data model (`prisma/schema.prisma`)

Entities: `Event` → `Participant`, `StartGroup`, `Lane`, `PlanningScenario`, `ImportBatch`, `ManualOverride`. `PlanningScenario` → `Wave`. `Wave` + `Lane` + `Participant`/`StartGroup` → `LaneAssignment` (the join model that actually places someone/some group on a lane within a wave).

- **Event**: date, location, status (`DRAFT/PLANNING/APPROVED/ARCHIVED`), start window, free-form `configuration` JSON.
- **Participant**: individual or relay (`kind`), status (`REGISTERED/DNS/WITHDRAWN`), optional link to `StartGroup` and `ImportBatch`, category/distance as free strings (not yet normalized).
- **StartGroup**: pre-wave grouping (category/age class/distance/org group), sortable.
- **PlanningScenario**: versioned planning state per event (`DRAFT/REVIEW/APPROVED/ARCHIVED`), unique per `(eventId, name, version)`, has a JSON `snapshot` field for later rule/simulation snapshots.
- **Wave**: belongs to a scenario, has planned start time, expected/max starts.
- **Lane**: belongs to an event (not scenario), status (`AVAILABLE/RESERVED/BLOCKED`), max starts.
- **LaneAssignment**: the actual wave↔lane↔(participant|startGroup) mapping, `source` (`AUTOMATIC/MANUAL/IMPORT`).
- **ImportBatch**: tracks provenance of imported participant data (source, status, summary/errors as JSON).
- **ManualOverride**: audit trail for planner overrides — scope (`EVENT/SCENARIO/PARTICIPANT/START_GROUP/WAVE/LANE/LANE_ASSIGNMENT`), target id, reason, author, context JSON.

Open modeling questions not yet decided (see `docs/11-data-model-plan.md`): whether teams need to be a first-class entity beyond `Participant`, whether category/age-class/distance get normalized, how granular the lane/pool config should be, which RuleSet parts are declarative data vs. code.

`RuleSet`, `RuleCheckResult` and `SimulationRun` are deliberately **not yet** in the Prisma schema — they're planned to be added once rule-result formats stabilize (contracts already exist in the domain package and `docs/20-rule-result-contracts.md`).

## docs/ index

| File | Content |
|---|---|
| `01-vision.md` | Product vision, target users, success criteria |
| `02-lastenheft.md` | Functional/non-functional requirements (business-facing) |
| `03-pflichtenheft.md` | Detailed technical requirements spec |
| `04-rule-engine.md` | Rule Engine concept: PASS/WARNING/FAIL results, rule areas (waves, lanes, simulation, data quality, overrides) |
| `05-simulation-engine.md` | Simulation Engine concept: inputs/outputs, determinism principles |
| `06-ui-konzept.md` | UI concept: main views, operating principles, Sprint-1 shell scope |
| `07-roadmap.md` | Phase 1–5 roadmap + milestones M1–M4 |
| `08-technical-architecture.md` | Stack decisions, monorepo layout, Sprint-1 boundaries |
| `09-sprint-1-plan.md` | Sprint 1 task breakdown |
| `10-development-setup.md` | Local dev setup instructions |
| `11-data-model-plan.md` | Pre-Prisma entity planning, open modeling questions |
| `12-reference-scenario.md` | The canonical reference scenario used to validate the data model |
| `13-prisma-schema-v1.md` | Documents the first Prisma schema version |
| `14-fixture-and-seed-strategy.md` | Strategy for reference/edge-case fixtures and future DB seeds |
| `15-domain-contracts.md` | Domain package contract rationale |
| `16-ui-shell.md` | UI shell/navigation structure |
| `17-current-state-handoff.md` | **Living handoff doc** — current status snapshot, recommended next steps |
| `18-reference-fixtures.md` | Docs for `tests/fixtures/reference-scenario/` |
| `19-edge-case-fixtures.md` | Docs for `tests/fixtures/edge-cases/` |
| `20-rule-result-contracts.md` | Rule result contract shapes (`RuleCheckResultContract`, etc.) |

`docs/17-current-state-handoff.md` is kept up to date across sessions — check it first for "what's the current state / what's next" instead of asking the user to repeat it.

## Known gaps / obvious next work (as of 2026-07-05)

PostgreSQL is now running locally and migrated (see Status above). Remaining next steps, roughly in order:
1. Carve out a `packages/rules` package: interfaces + test harness only, no actual rule logic yet.
2. Wire up actual Prisma reads in the UI (currently 100% fixture-backed) and add real seed data.
3. Implement actual wave rules, lane rules, and edge cases as tests, based on `analysis/excel-analysis/`.
4. Simulation engine, Excel import, auth/roles — all still unstarted.

## Commands

- `npm run dev` — start the web app (Next.js)
- `npm run build` / `npm run lint` / `npm run typecheck` — workspace-wide checks (typecheck also runs `tsc --noEmit -p tests/tsconfig.json` for fixtures)
- `npm run test` — runs `test` script per workspace if present (none defined yet)
- `npm run db:generate` / `npm run db:migrate` / `npm run db:studio` — Prisma
- `npm run docker:up` / `npm run docker:down` — local Postgres via Docker Compose
- CI (`.github/workflows/ci.yml`) runs on push/PR to `main`: install → `db:generate` → `typecheck` → `lint` → `build`. No test step yet since no tests exist.

## Conventions observed in this repo

- Docs and internal planning docs are written in German; code, identifiers, and commit messages are in English.
- Commit style: short imperative present tense, e.g. `Add rule result contracts`, `Document current project handoff`.
- Status values everywhere are modeled as literal string-union types in `packages/domain/src/types.ts`, mirrored 1:1 by Prisma enums — keep these two in sync when either changes.
