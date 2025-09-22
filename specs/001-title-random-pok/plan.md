
# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Build a single-page, mobile-friendly web app that displays a randomly selected Pokémon card with name, image, types, and base stats. Users can click a button to generate a new random Pokémon. The app should be visually appealing, responsive, and handle API errors gracefully.

## Technical Context
**Language/Version**: JavaScript (ES6+) or TypeScript [NEEDS CLARIFICATION: Which language preferred?]
**Primary Dependencies**: Fetch API, Tailwind CSS or plain CSS [NEEDS CLARIFICATION: Tailwind or plain CSS?]
**Storage**: N/A (no persistent storage)
**Testing**: [NEEDS CLARIFICATION: Preferred testing framework?]
**Target Platform**: Modern web browsers, mobile and desktop
**Project Type**: Single-page web app (frontend only)
**Performance Goals**: Fast load, instant card generation, smooth transitions [NEEDS CLARIFICATION: Animation/transition specifics?]
**Constraints**: Must be responsive, API errors handled gracefully
**Scale/Scope**: Single user, unlimited Pokémon generations

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No explicit violations detected. Project is simple, single-page, and does not require backend, storage, or complex integrations. TDD and test-first principles should be followed for UI and API logic. CLI interface not required for this feature. Simplicity and clarity are prioritized.

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: [DEFAULT to Option 1 unless Technical Context indicates web/mobile app]
**Structure Decision**: Single-page web app (frontend only)

## Phase 0: Outline & Research
### Unknowns & Research Tasks
- Language: JavaScript or TypeScript?
- Styling: Tailwind CSS or plain CSS?
- Animation/transition: What kind of effect is desired?
- Testing: Which framework to use?

#### Research Tasks
- Research best practices for random Pokémon card generation using PokeAPI
- Research responsive card design for mobile and desktop
- Research error handling for Fetch API in frontend apps
- Research animation/transition options for card updates
- Research testing frameworks for frontend web apps (Jest, Testing Library, etc.)

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*
### Entities (data-model.md)
- Pokémon Card: name, official sprite image, types, base stats (HP, Attack, Defense, Speed)

### API Contracts (contracts/)
- Fetch random Pokémon: GET request to PokeAPI endpoint
- Response: Pokémon data (name, image, types, stats)

### Contract Tests
- Test: Fetch random Pokémon returns valid data
- Test: Card displays correct details
- Test: Error handling displays user-friendly message

### Quickstart (quickstart.md)
- Steps to set up and run the app
- Steps to run tests
- Steps to verify card generation and error handling

### Agent File
- Update `.github/copilot-instructions.md` with new tech choices and recent changes

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
