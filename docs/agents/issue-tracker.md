# Issue Tracker

Issues for this repo live in **Linear**, not GitHub/GitLab.

- **Workspace team:** `ArtosDiakonia`
- **Project:** `Consign`
- **Access:** via the `mcp__linear__*` MCP tools (no CLI)

## Conventions

- Create issues with `mcp__linear__save_issue`, scoped to team `ArtosDiakonia` and project `Consign`.
- Specs produced by `/to-spec` are published as a Linear **document** attached to the `Consign` project (`mcp__linear__save_document`), tagged with the `ready-for-agent` label once ready.
- Tickets produced by `/to-tickets` are individual Linear issues under the `Consign` project, each declaring blocking edges via Linear's native issue-relation feature (`blocks` / `blocked by`) rather than free-text.
- Use `mcp__linear__list_issues` / `mcp__linear__get_issue` to read current state before starting work.
- PRs are not a request surface for this repo (no GitHub remote) — leave that flag off.

## Labels

No triage label vocabulary is configured (the `triage` skill isn't installed in this session). The `ready-for-agent` label exists on the `ArtosDiakonia` team and is applied to specs/tickets once implementation-ready.
