# Todos Workspace

This folder keeps lightweight kanban-style TODO entries as Markdown files so every agent can see the same backlog, move work between states, and archive outcomes for auditing.

## Directory Map

- `templates/` – canonical Markdown template(s) to copy when starting a new task.
- `not-started/` – backlog items that no one has picked up yet.
- `in-progress/` – active work items.
- `completed/` – finished tasks awaiting verification or archival notes.
- `archive/` – historical records once the work ships (append a short summary before moving files here).

## Workflow

1. **Create**: copy `templates/todo-template.md` into the appropriate status folder and rename it using `YYYY-MM-DD-short-title.md`.
2. **Update**: edit the Status/Owner/Priority front-matter-style bullets plus any sections (Why/What/Where/etc.) as the task evolves.
3. **Move**: change status both in the file and by moving the Markdown file into `in-progress/` or `completed/` as work advances.
4. **Archive**: once verified in production, move the file to `archive/` and add a final History entry with the deployment reference.

## Conventions

- Keep one task per file so we can link to it from commits/PRs.
- Use checklists for concrete acceptance criteria; they double as status documentation.
- Reference file paths or commands (e.g. ``packages/config/tsconfig.json``) so implementers know exactly where to work.
- Prefer descriptive titles like `2025-01-09-hardening-typecheck.md` to make searching easier.

## Auditing

When triaging or reviewing, scan the folder tree:

- `not-started/` shows upcoming work.
- `in-progress/` highlights current focus areas.
- `completed/` lists work waiting for verification/merge/deploy.
- `archive/` is the canonical log of delivered improvements.

Each file’s History table acts as a mini audit log, so always append entries when ownership or context changes.
