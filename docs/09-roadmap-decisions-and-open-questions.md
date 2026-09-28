# Roadmap, Decisions, and Open Questions

Current decisions, unresolved questions, near-term sequencing, iteration prompts, and areas intentionally left open.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

---

# 23. Decision Log

Use this table to capture decisions as the family evolves.

| Date | Decision | Rationale | Status |
|---|---|---|---|
| 2026-09-26 | Use **Swatch** as the preferred app-catalog name | Fits paint/coatings family; individual record metaphor works naturally | Candidate |
| 2026-09-26 | Use **Deck** for durable groupings and **Palette** for curated subsets | Preserves paint terminology while distinguishing grouping semantics | Candidate |
| 2026-09-26 | Explore **Binder** as the shared family substrate | Prevents Basecoat from owning cross-product mechanics | Candidate |
| 2026-09-26 | Treat compliance as profiles + mappings | Avoids framework-specific product sprawl | Candidate |
| 2026-09-26 | Treat Snitch output as observations, not truth | Allows reconciliation from multiple systems | Candidate |
| 2026-09-26 | Treat Swatch as a graph, not a flat CMDB | Relationships are essential for impact, governance, and AI inventory | Candidate |

---

# 24. Open Questions

## Product architecture

- Should Binder be a repo, SDK, schema package, CLI, or combination?
- Which artifacts remain in Basecoat after Binder is extracted?
- Should Stencil be a product or simply a Binder/Basecoat primitive?
- Should Formula be an independent supply-chain service or a Teardown output?
- Is Proof independently deployed or an append-only service behind the family?

## Swatch

- What is the minimum entity model for v1?
- What is a Swatch: only an application, or any governed entity?
- Are Decks static and Palettes dynamic?
- Should Swatch own business capabilities and portfolios?
- How are aliases and duplicate records reconciled?

## Snitch

- Which discovery sources are v1?
- Should collectors be plugins?
- How is confidence scored?
- How are conflicting observations reconciled?

## Teardown

- Repo-only v1 or repo + SBOM + deployment?
- Which AI assets are first-class?
- Which graph format should be canonical?
- How much architecture inference should be deterministic vs AI-assisted?

## Compliance

- How much of OSCAL should be adopted?
- Which profiles should ship first?
- What language should distinguish regulation, standard, framework, and internal policy?
- How should inheritance and conflicting profile requirements work?

## Operations

- Keep the product name **Call Tree**, or rename to **Crosslink**?
- Should Crosslink create bridges/channels or integrate only?
- Should incident records live in Crosslink or Swatch?

---

# 25. Proposed Near-Term Sequence

## Phase 1 — Define the family contract

- Define product manifest
- Define entity IDs
- Define namespaces
- Define evidence references
- Define ownership semantics
- Define version compatibility

**Output:** Binder v0.1 concept

## Phase 2 — Define Swatch

- Minimum entity graph
- Application
- Repository
- Service
- Team
- Deployment
- Model
- Agent
- MCP server
- Data classification
- Compliance profile

**Output:** Swatch schema v0.1

## Phase 3 — Define observation and graph ingestion

- Snitch observation schema
- Teardown graph schema
- reconciliation rules
- confidence / source precedence

## Phase 4 — Controls and evidence

- internal control schema
- profile schema
- exception schema
- Proof evidence schema
- Adhesion result mapping

## Phase 5 — Operations

- ownership
- on-call
- escalation
- Crosslink / Call Tree
- incident relationships

---

# 26. Iteration Scratchpad

Use this section for ideas that are not yet decisions.

### New names

- 
- 
- 

### New products / capabilities

- 
- 
- 

### Things to merge

- 
- 
- 

### Things to remove

- 
- 
- 

### Questions raised by implementation

- 
- 
-

---

# 27. Next Iteration Prompts

Useful prompts for continuing this notebook:

1. **“Define Swatch v1.”**
   - Produce the minimum entity model, IDs, Deck/Palette semantics, APIs, and example records.

2. **“Define Binder v1.”**
   - Extract the shared contract implied by Basecoat, Adhesion, and Sheen.

3. **“Define Snitch v1.”**
   - Pick discovery sources, observation schema, confidence model, and reconciliation workflow.

4. **“Define Teardown v1.”**
   - Create the repo graph schema, AI-BOM model, and expected analysis outputs.

5. **“Create the control model.”**
   - Define internal controls, framework mappings, profiles, exceptions, and evidence.

6. **“Map the family to ITAR/CMMC/HIPAA/PCI/SOC2.”**
   - Show how classification, controls, evidence, and operations differ by regime.

7. **“Draw the full system architecture.”**
   - APIs, event flows, graph storage, policy evaluation, evidence ingestion, and integrations.

8. **“Turn this into a product roadmap.”**
   - MVP boundaries, sequencing, dependencies, and what should deliberately not be built.

---

# 49. Deployment Decisions to Iterate

## Candidate decisions

| Decision | Current direction |
|---|---|
| Default governance distribution | Git-native artifacts |
| Default reasoning extension | Skills/on-demand agents |
| Default repo automation | CI/CD |
| Default long-running orchestration | Durable/serverless workflows |
| Default autonomous execution | Ephemeral containers |
| Default model strategy | Managed model APIs with routing abstraction |
| Local/private models | Policy- or economics-driven exception |
| Persistent autonomous agents | Use sparingly |
| Canonical state | Applications/datastores, never agent memory |
| High-risk execution | Disposable sandbox + scoped identity |
| Fast-changing behavior | Configuration/artifacts |
| Slow-changing behavior | Infrastructure |

## Open questions for the next iteration

- Which deployment classes should Binder formally recognize?
- Should every Swatch record declare an approved execution boundary?
- Should Basecoat controls be able to prohibit certain deployment classes?
- Should Proof record model/runtime/deployment-class provenance for every AI-assisted action?
- Should Snitch discover unmanaged local models and agent runtimes?
- Should Teardown identify autonomous-agent execution paths inside a repository?
- Should Adhesion include deployment-class-specific test suites?
- Should Crosslink be permitted to invoke autonomous remediation, or only coordinate/approve it?

---

# 72. Side Quest Follow-Up Ideas

Possible future iterations:

- Build a timeline graphic from ancient governance → corporate governance → IT → cyber → AI.
- Compare **ISO 37000 / ISO 38500 / COBIT / NIST CSF / NIST AI RMF** against the family model.
- Formalize the **Governance Gradient** as a Basecoat schema.
- Formalize **Authority → Policy → Control → Enforcement → Evidence → Assurance** in Binder.
- Add a governance-capacity model for choosing between documentation, automation, workflow, and architectural prevention.
- Define independence requirements for validators and auditors.
- Define a human-accountability model for autonomous agents.
