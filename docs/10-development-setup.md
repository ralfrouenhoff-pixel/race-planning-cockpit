# Development Setup

Dieses Dokument beschreibt die lokale Entwicklungsumgebung fuer Sprint 1.

## Voraussetzungen

- Node.js 20 oder neuer.
- npm 10 oder neuer.
- Docker und Docker Compose.

## Installation

```bash
npm install
cp .env.example .env
```

## Datenbank starten

```bash
npm run docker:up
```

## Prisma vorbereiten

```bash
npm run db:generate
```

Migrationen werden angelegt, sobald das erste fachliche Datenmodell beschlossen ist.

## Web-App starten

```bash
npm run dev
```

Die App laeuft standardmaessig unter `http://localhost:3000`.

## Qualitaetschecks

```bash
npm run typecheck
npm run lint
npm run build
```
