# AI SDLC Governance — Full Working Research Archive

This file preserves the complete Markdown research content from the working notebook in chronological order.

It intentionally includes ideas that were later renamed, refined, superseded, or reorganized. Use the topic-specific documents in `docs/` for the current information architecture; use this archive for the full research trail.

---

# AI SDLC Governance Family — Working Notebook

**Status:** Working draft  
**Purpose:** Capture the product-family architecture, naming system, responsibilities, adjacent products, compliance/framework mappings, and open design questions for an enterprise-scale AI SDLC governance platform.

This notebook is intentionally structured as a **living design document**. Sections marked **Decision**, **Candidate**, and **Open Question** are meant to evolve as the family becomes clearer.

---

## Working thesis

The family is not just a collection of AI development tools. It is evolving toward an **enterprise application governance platform** with AI-assisted software development as the design center.

A concise operating model:

> **Snitch discovers reality. Teardown explains it. Swatch remembers it. Basecoat governs it. Sheen shapes the experience. Adhesion verifies it. Crosslink coordinates people when it fails. Proof proves what happened. Binder makes the family work together.**

---

# 1. Design Principles

1. **Each product should own a distinct domain primitive.**
2. **Shared family mechanics should not live inside one sibling product.**
3. **Compliance should be expressed as profiles and mappings, not as one-off products.**
4. **Discovery is not truth.** Observations should be reconciled into canonical records.
5. **Evidence is not compliance.** Store evidence and mappings; avoid claiming compliance automatically.
6. **Stable identity matters.** Repositories, apps, services, models, agents, deployments, teams, and controls need durable IDs.
7. **Integrate before rebuilding.** Use existing observability, cost, identity, SBOM, and ITSM platforms where practical.
8. **The graph is the center.** Relationships between assets matter more than flat inventory.
9. **Make the secure/governed path the default path.**
10. **Keep domain products independently useful, but interoperable through shared contracts.**

---

# 2. Current and Candidate Product Family

| Product | Working role | Primary verb | Core primitive | Status |
|---|---|---:|---|---|
| **Binder** | Shared family substrate / contracts | Connect | Manifest / schema / identity | Candidate |
| **Basecoat** | AI-SDLC engineering governance | Govern | Control / instruction | Existing |
| **Adhesion** | Testing, validation, evals | Verify | Test / assertion / evaluation | Existing |
| **Sheen** | UI/UX governance | Experience | Design token / UX contract | Existing |
| **Batchbook** | Enterprise catalog of governed applications | Know | Entity / record | Preferred name |
| **Snitch** | Discovery and intelligence | Discover | Observation | Existing idea |
| **Teardown** | Repo/app reverse engineering | Understand | Component / relationship | Existing idea |
| **Crosslink** | Incident coordination / call tree | Coordinate | Escalation / responder | Candidate rename |
| **Proof** | Evidence, provenance, attestations | Prove | Evidence / attestation / stamp | Candidate |
| **Stencil** | Policy targeting / scoping | Apply | Scope / selector | Candidate |
| **Formula** | Approved composition / supply-chain recipe | Compose | Composition | Candidate |
| **Blueprint** | Intended architecture | Architect | Architecture contract | Candidate |
| **Seal** | Security posture / hardening | Protect | Security control set | Candidate |
| **Reclaim** | Retirement / deprecation | Retire | Lifecycle action | Candidate |

### Naming direction

The current family works well when names remain short, concrete, industrial, and related to coatings/materials rather than generic enterprise software terms.

---

# 3. Naming System: Swatch, Deck, Palette

## Decision candidate

Use **Swatch** as the application/service catalog product.

Inside Swatch:

- **Swatch** — an individual application, service, repo, or governed entity record.
- **Deck** — a collection of swatches grouped by ownership, platform, business unit, compliance boundary, or another durable classification.
- **Palette** — a curated or dynamic subset selected for a purpose.

### Examples

```text
Swatch
  ├── Claims Portal
  ├── Claims API
  └── Claims AI Service

Deck: Manufacturing Apps
Deck: Customer-Facing Apps
Deck: CUI Workloads

Palette: PCI Applications
Palette: AI-enabled Applications
Palette: Apps using Model X
```

Natural language:

- “Add this application to Swatch.”
- “Put it in the CUI Deck.”
- “Show me the Production Deck.”
- “Create a Palette of applications using this model.”

---

# 4. Family Architecture

```text
                         BINDER
                 Shared Family Contract
                           |
       +-------------------+-------------------+
       |                   |                   |
    Basecoat             Sheen             Adhesion
    Engineering          Experience        Verification
    Governance           Governance        Governance
       |                   |                   |
       +-------------------+-------------------+
                           |
                         Swatch
                 Enterprise App Graph
                           |
            +--------------+--------------+
            |              |              |
         Snitch         Teardown         Crosslink
        Discover        Understand      Coordinate
            |              |              |
            +--------------+--------------+
                           |
                         Proof
                          Prove
```

## Interpretation

- **Binder** defines family-wide contracts.
- **Swatch** becomes the shared application/service graph and canonical record.
- **Snitch** feeds observations into Swatch.
- **Teardown** explains the internal structure of repositories/apps and enriches Swatch.
- **Basecoat**, **Sheen**, and **Adhesion** apply specialized governance.
- **Crosslink** resolves humans, escalation paths, and incident coordination.
- **Proof** stores evidence and provenance.

---

# 5. Shared Family Substrate — Binder

## Purpose

Binder should own mechanics that every sibling needs, so Basecoat does not become the de facto parent implementation.

### Candidate Binder responsibilities

```text
Binder
 ├── family-manifest.schema.json
 ├── product-manifest.schema.json
 ├── guidance-lock.schema.json
 ├── evidence.schema.json
 ├── control.schema.json
 ├── exception.schema.json
 ├── entity-id.schema.json
 ├── sync
 ├── rollback
 ├── ownership
 ├── validation
 └── schema versioning
```

### Binder should answer

- What products belong to this family?
- Which namespaces do they own?
- How are artifacts identified?
- How are schemas versioned?
- How are products synchronized?
- How are ownership conflicts prevented?
- How are upgrades and rollbacks handled?
- How is evidence referenced?
- How are cross-product links represented?

### Open question

Should Binder be:
1. a standalone repository,
2. a package/SDK,
3. a set of schemas and CLI tools,
4. or all three?

---

# 6. Basecoat — Engineering Governance

## Role

Basecoat governs **how engineering work is performed**.

It should remain responsible for:

- shared development guidance
- enterprise engineering controls
- AI coding guidance
- secure defaults
- agent/instruction governance
- policy intent
- distribution of engineering guidance
- versioned governance artifacts
- mappings from internal controls to external frameworks

## Boundary

Basecoat should **not** become the canonical database for:

- application inventory
- incident response
- runtime telemetry
- UX design tokens
- test results
- SBOMs
- evidence records
- ownership records

It may orchestrate or query those domains through sibling products.

### Example

```text
Basecoat asks:
"What controls apply to app:claims-portal?"

Swatch provides:
classification + ownership + profiles

Basecoat returns:
effective engineering controls
```

---

# 7. Sheen — Experience Governance

## Role

Sheen owns UI/UX governance and should remain independently useful.

### Likely primitives

- design tokens
- semantic tokens
- themes
- accessibility requirements
- interaction patterns
- UX conventions
- component guidance
- conformance tests

### Framework adjacency

- WCAG
- Section 508
- EN 301 549
- ISO 9241
- design token specifications
- enterprise design systems

### Architectural lesson

Sheen is a good model for sibling products because it has a domain-specific primitive rather than merely being a set of Basecoat instructions.

---

# 8. Adhesion — Validation and Evaluation

## Role

Adhesion should be broader than unit/integration testing.

### Candidate validation domains

- unit tests
- integration tests
- contract tests
- security tests
- accessibility tests
- performance tests
- policy validation
- architecture conformance
- AI evaluations
- prompt-injection tests
- hallucination tests
- model regression
- agent/tool behavior
- response safety
- deterministic rules

### Core primitive

```text
Evaluation
 ├── subject
 ├── assertion
 ├── method
 ├── expected result
 ├── actual result
 ├── evidence
 └── timestamp
```

### Framework adjacency

- OWASP ASVS
- OWASP GenAI
- NIST AI RMF
- NIST SSDF
- PCI DSS secure development requirements

---

# 9. Swatch — Enterprise Application Graph

## Role

Swatch should be more than a traditional CMDB.

It should answer:

> What do we have, who owns it, what is it connected to, what classifications apply, and what other entities depend on it?

## Candidate graph

```text
Organization
   |
Portfolio
   |
Product
   |
Application
   |
System
   |
Component
   |
Repository
   |
Build
   |
Artifact
   |
Deployment
```

Relationships can extend to:

```text
Team
Owner
On-call team
Cloud subscription
Environment
Database
API
Package
Container
Data source
Model
Model version
Embedding model
Vector store
Prompt
Agent
Skill
MCP server
Tool
Workflow
Secret reference
Certificate
DNS name
Cost center
Business capability
Data classification
Compliance profile
```

## Adjacent products

- ServiceNow CMDB / CSDM
- Backstage Software Catalog
- Atlassian Compass
- LeanIX
- Ardoq

## Differentiator

Traditional CMDB + software catalog + AI component graph + governance context.

---

# 10. Snitch — Discovery and Intelligence

## Role

Snitch should answer:

> What exists that Swatch does not know about, or what changed from the expected state?

## Important boundary

Snitch produces **observations**, not canonical truth.

### Example observation

```yaml
source: github
observed_at: 2026-09-26T13:00:00-04:00
type: repository

repository:
  org: contoso
  name: claims-ai

signals:
  language: python
  dockerfile: true
  external_ai_endpoint: true
  mcp_server: true

confidence: 0.98
```

Swatch then reconciles observations from multiple sources.

### Candidate sources

- GitHub
- Azure
- AWS
- GCP
- Kubernetes
- container registries
- DNS
- Entra ID / IAM systems
- ServiceNow
- observability platforms
- SaaS APIs
- model endpoints
- MCP registries

---

# 11. Teardown — Reverse Engineering and Graph Generation

## Role

Teardown should answer:

> What is this thing actually made of?

It should accept more than repositories over time.

### Candidate inputs

- repository
- application
- container image
- deployment
- SBOM
- architecture document
- IaC package

### Candidate output graph

```text
Repository
 |
 +-- application
 +-- service
 +-- API
 +-- Dockerfile
 +-- Terraform
 +-- package manifests
 +-- CI/CD workflows
 +-- databases
 +-- model endpoints
 +-- agents
 +-- prompts
 +-- MCP servers
 +-- external APIs
 +-- secrets references
 +-- data flows
```

### Standards to reuse

- SPDX
- CycloneDX
- SLSA provenance

### AI-specific extension

Teardown should recognize:

- models
- model providers
- model versions
- prompts
- agents
- skills
- MCP servers
- tools
- vector stores
- embedding models
- RAG sources
- guardrails
- AI evaluations

---

# 12. Crosslink — Incident Coordination

## Role

Crosslink is the product name for the incident coordination capability that began as the **Call Tree** concept.

It should answer:

> Who needs to respond, how do we reach them, what role do they have, and how do we coordinate the incident?

### Capabilities

- on-call resolution
- escalation policies
- call trees
- bridge creation
- responder acknowledgment
- incident roles
- business owner notification
- executive escalation
- vendor escalation
- recurring status updates
- post-incident handoff

### Incident roles

```text
Incident Commander
Technical Lead
Communications Lead
Business Owner
Security
Vendor
Executive Liaison
```

### Workflow

```text
Incident created
      ↓
Impacted services resolved in Swatch
      ↓
Owners and on-call teams resolved
      ↓
Crosslink creates coordination channel / bridge
      ↓
Responders notified
      ↓
Non-acknowledgements escalated
      ↓
Roles tracked
      ↓
Resolution
      ↓
Post-incident review
```

### Adjacent products

- PagerDuty
- ServiceNow Major Incident Management
- incident.io
- Rootly
- Jira Service Management
- Microsoft Teams
- Slack

---

# 13. Proof — Evidence and Provenance

## Role

Proof stores evidence, provenance, attestations, and conformance artifacts. It should not independently declare compliance.

### Core model

```text
Control
   ↓
Policy
   ↓
Implementation
   ↓
Test
   ↓
Result
   ↓
Evidence
   ↓
Approval
```

### Example

```yaml
subject: app:claims-portal
control: BC-SCM-004
assertion: pass

evidence:
  source: github
  workflow: build.yml
  run: 987324
  commit: 5d7841f

produced_by: adhesion
observed_at: 2026-09-26
expires_at: 2026-10-26
```

### Adjacent products

- ServiceNow GRC / IRM
- Archer
- Vanta
- Drata
- AuditBoard

### Useful standards

- OSCAL
- in-toto / provenance concepts
- SLSA attestations

---

# 14. Stable Identity Model

Stable identifiers should exist across the entire family.

### Examples

```text
app:claims-portal
repo:github:contoso/claims-portal
service:claims-api
model:azure-openai:model-x
agent:claims-assistant
mcp:claims-records
deployment:prod-eastus
team:claims-platform
control:BC-IAM-001
```

### Cross-product flow

```text
Snitch discovers:
repo:github:contoso/claims-portal

Teardown analyzes:
repo:github:contoso/claims-portal

Swatch relates:
repo -> app:claims-portal

Basecoat assigns:
controls -> app:claims-portal

Adhesion validates:
app:claims-portal

Proof stores:
evidence -> app:claims-portal

Crosslink resolves:
app -> team -> on-call
```

---

# 15. Common Control Model

External frameworks should map to internal engineering controls.

### Example

```yaml
id: BC-IAM-001
title: Workloads must use non-secret authentication

intent:
  prevent long-lived credentials in automated workloads

requirements:
  - workload identity preferred
  - OIDC federation allowed
  - static secrets prohibited without approved exception

evidence:
  - workflow configuration
  - cloud identity configuration

validation:
  automated: true
```

### Framework mappings

```text
BC-IAM-001
  ├── NIST SSDF
  ├── NIST CSF
  ├── ISO 27001
  ├── CMMC
  ├── SOC 2
  ├── PCI DSS
  └── Internal Policy
```

This keeps the engineering standard stable while external frameworks evolve.

---

# 16. Compliance and Operating Framework Taxonomy

## Regulations / legal regimes

- ITAR
- EAR
- HIPAA
- GDPR
- SOX
- state privacy laws

## Contract / assurance / certification-oriented requirements

- CMMC
- FedRAMP
- SOC 2
- PCI DSS

## Standards / management systems

- ISO 27001
- ISO 42001
- ISO 20000
- ISO 22301

## Frameworks / practice models

- NIST CSF
- NIST SSDF
- NIST AI RMF
- ITIL / ITSM
- FinOps
- SRE
- OWASP ASVS
- OWASP GenAI
- SLSA

## Design rule

Do not treat all of these as equivalent. A law/regulation, an assurance framework, a management standard, and an operating practice should be represented differently.

---

# 17. Compliance Profiles

Compliance should be applied through profiles.

### Example

```yaml
application: claims-portal

profiles:
  - enterprise-default
  - hipaa
  - soc2
  - ai-high-risk
```

Basecoat resolves the effective control set from the selected profiles.

### ITAR example

```yaml
classification:
  export_control:
    regime: ITAR

restrictions:
  storage_regions:
    - approved-us

  personnel:
    export_authorization_required: true

  services:
    external_ai: restricted

  logging:
    approved_boundaries_only: true

  support:
    approved_personnel_only: true
```

### CMMC example

```text
Application
   |
handles:
   CUI
   |
requires profile:
   CMMC-L2
   |
maps to:
   internal controls
   |
requires:
   evidence + assessment support
```

Core model:

> **classification → profile → controls → evidence**

---

# 18. Exception Model

Exceptions need to be first-class.

```text
Control
   |
Violation
   |
Exception
   |
Owner
   |
Approver
   |
Reason
   |
Compensating Control
   |
Expiration
```

### Example

```yaml
control: BC-NET-013
subject: app:legacy-payments

exception:
  reason: legacy vendor integration

approved_by:
  - security-architecture

expires: 2026-12-31

compensating_controls:
  - IP allowlist
  - WAF inspection
  - increased logging
```

### Cross-product behavior

- Snitch discovers expired exceptions.
- Adhesion validates compensating controls.
- Crosslink escalates production exceptions when needed.
- Swatch displays exception state.
- Basecoat changes enforcement after expiry.
- Proof records the history.

---

# 19. Product / Framework Adjacency Matrix

| Capability | Family product | Adjacent products | Frameworks / standards |
|---|---|---|---|
| Engineering governance | Basecoat | GitHub Enterprise, Azure Policy, OPA, Sentinel | NIST SSDF, NIST CSF, NIST AI RMF, ISO 27001, ISO 42001 |
| UX governance | Sheen | Figma, Storybook, Chromatic, axe | WCAG, Section 508, EN 301 549 |
| Testing / evals | Adhesion | Playwright, Cypress, SonarQube, Snyk, promptfoo | OWASP ASVS, NIST AI RMF, OWASP GenAI |
| Inventory / graph | Swatch | ServiceNow CMDB/CSDM, Backstage, Compass, LeanIX | ITIL, ISO 20000, NIST CSF |
| Discovery | Snitch | ServiceNow Discovery, Wiz, Defender for Cloud, Lansweeper | CIS Controls, NIST CSF Identify |
| Reverse engineering | Teardown | Sourcegraph, GitHub dependency graph, Syft, Trivy | SPDX, CycloneDX, SLSA |
| Incident coordination | Crosslink | PagerDuty, ServiceNow, incident.io, Rootly | ITIL Incident Mgmt, ISO 22301 |
| Evidence | Proof | ServiceNow GRC, Vanta, Drata, AuditBoard | OSCAL, SOC 2, ISO 27001, CMMC |
| Policy targeting | Stencil | OPA selectors, Azure Policy scopes | Internal policy models |
| Supply chain | Teardown + Proof / Formula | GitHub Attestations, JFrog, Snyk, Anchore | SLSA, SPDX, CycloneDX |
| Observability | Integrations | Datadog, Azure Monitor, Dynatrace, Splunk | SRE, ITIL Event Mgmt |
| Cost | Integrations | Apptio, Azure Cost Mgmt, Kubecost | FinOps |

---

# 20. Candidate Product Names to Reserve

## Strong candidates

- **Binder** — shared family contracts
- **Swatch** — application catalog / graph
- **Deck** — durable grouping within Swatch
- **Palette** — curated/dynamic subset within Swatch
- **Stencil** — policy targeting / scope
- **Formula** — approved composition
- **Crosslink** — incident coordination
- **Proof** — evidence / provenance
- **Blueprint** — intended architecture
- **Seal** — security / hardening
- **Reclaim** — retirement / lifecycle
- **Substrate** — platform/environment
- **Batch** — release/provenance unit
- **Cure** — readiness/maturity
- **Mask** — exclusions/scoping
- **Finish** — release readiness

## Names already established

- Basecoat
- Adhesion
- Sheen
- Snitch
- Teardown

---

# 21. Potential Product Boundaries

## Build as first-class products

Likely strong candidates:

1. Basecoat
2. Adhesion
3. Sheen
4. Swatch
5. Snitch
6. Teardown
7. Crosslink
8. Proof
9. Binder

## Consider as shared services / concepts before making products

- Stencil
- Formula
- Blueprint
- Seal
- Reclaim
- Gauge
- Cost / FinOps
- runtime observability

### Reasoning

Avoid product sprawl. Some concepts may be better expressed as:
- Swatch entity types,
- Basecoat control domains,
- Teardown outputs,
- Binder primitives,
- or integrations with existing products.

---

# 22. Example Enterprise Record

```yaml
application:
  id: app:claims-processing
  name: Claims Processing

owner:
  team: claims-platform

repositories:
  - repo:github:contoso/claims-web
  - repo:github:contoso/claims-api
  - repo:github:contoso/claims-ai

data:
  classifications:
    - PII
    - PHI

ai:
  models:
    - model:azure-openai:model-x
  agents:
    - agent:claims-agent
  mcp:
    - mcp:claims-records

deployments:
  - deployment:prod-east
  - deployment:prod-west

profiles:
  - enterprise-standard
  - hipaa
  - soc2
  - ai-high-risk

operations:
  on_call: claims-platform

governance:
  controls_applicable: 142
  evidence_current: 137
  exceptions_active: 3
  evidence_missing: 2
```

### Questions this enables

- Which apps use model X?
- Which apps use a vulnerable package?
- Which repos expose MCP servers?
- Which apps process CUI?
- Which ITAR apps call external AI endpoints?
- Which apps have expired exceptions?
- Which apps lack owners?
- Which production apps lack on-call coverage?
- Which apps are on older Basecoat versions?
- Which apps failed the latest Adhesion eval?
- What is the blast radius if service X fails?

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

# 28. Deployment Philosophy

The family should deliberately support **multiple execution models** rather than forcing every capability into an always-on agent or application.

The deployment question should be:

> What is the **least complex execution model** that provides the required autonomy, isolation, state, latency, and scale?

The preferred progression is:

```text
Static artifact
    ↓
Instruction / policy
    ↓
Skill
    ↓
Prompt/custom agent definition
    ↓
Deterministic workflow
    ↓
Event-driven agent
    ↓
Ephemeral autonomous container
    ↓
Persistent hosted agent
    ↓
Dedicated/local model infrastructure
```

A capability should move down this stack only when there is a concrete reason.

## Primary optimization dimensions

Every deployment decision should explicitly consider:

- **Cost**
  - fixed infrastructure cost
  - marginal inference cost
  - idle cost
  - engineering/operations cost

- **Rate of change**
  - governance changes
  - prompt/skill changes
  - code changes
  - model changes
  - infrastructure changes

- **Complexity**
  - deployment complexity
  - state management
  - security boundaries
  - troubleshooting
  - scaling
  - patching

- **Risk**
  - privileges
  - data classification
  - destructive actions
  - external connectivity
  - autonomy level

- **Runtime need**
  - interactive
  - scheduled
  - event driven
  - long running
  - human-in-the-loop
  - batch

- **Isolation**
  - shared model/session
  - process isolation
  - container isolation
  - VM/sandbox isolation
  - dedicated infrastructure

---

# 29. Deployment Classes

A useful family-wide abstraction is to define a small number of **deployment classes**.

| Class | Pattern | Fixed Cost | Marginal Cost | Change Velocity | Ops Complexity | Best For |
|---|---|---:|---:|---|---|---|
| **D0** | Markdown / schema / policy artifact | Very low | None | Very high | Very low | Rules, standards, schemas |
| **D1** | Skill / prompt / custom agent definition | Very low | Inference only | Very high | Low | Assisted developer tasks |
| **D2** | CI/CD or deterministic workflow | Low | Execution + optional inference | High | Low–Medium | Policy checks, repeatable automation |
| **D3** | Serverless/event-driven agent workflow | Low | Invocation based | High | Medium | Events, durable workflows, HITL |
| **D4** | Ephemeral containerized autonomous agent | Low idle | Compute + inference | Medium | Medium | Repo analysis, discovery, isolated autonomous work |
| **D5** | Persistent managed/hosted agent | Medium | Compute + inference | Medium | Medium | Stateful interactive agents, long-running sessions |
| **D6** | Dedicated agent/application service | Medium–High | Compute + inference | Medium | High | High throughput, private integration, predictable latency |
| **D7** | Local/private LLM infrastructure | High fixed | Low/variable marginal | Low–Medium | High–Very High | Sovereignty, offline, sensitive data, high steady volume |

### Design principle

**D0–D2 should be the default.**

D3–D7 require an explicit justification such as:

- durable state
- autonomous execution
- private network access
- isolation
- long-running work
- deterministic orchestration
- high throughput
- data-sovereignty/offline requirements
- inference economics at sustained scale

---

# 30. The Graduation Model

Avoid **agentifying** every feature.

A capability should graduate only as its requirements increase.

```text
Can this be expressed as a rule or schema?
          |
         Yes
          ↓
          D0

Does the model need reusable task-specific knowledge/tools?
          |
         Yes
          ↓
          D1 Skill

Does execution need repeatability and deterministic steps?
          |
         Yes
          ↓
          D2 Workflow

Does it need events, timers, retries, state, or human approval?
          |
         Yes
          ↓
          D3 Durable workflow

Does it need autonomous code execution or strong workload isolation?
          |
         Yes
          ↓
          D4 Ephemeral agent container

Does it need persistent conversational/session state or interactive service behavior?
          |
         Yes
          ↓
          D5 Hosted agent

Does it need dedicated performance, networking, or scaling?
          |
         Yes
          ↓
          D6 Dedicated service

Does policy/data sovereignty require the model itself to run locally?
          |
         Yes
          ↓
          D7 Local/private model
```

This creates a defensible architecture and prevents infrastructure from growing faster than the product value.

---

# 31. Deployment Recommendation by Family Product

| Product | Preferred initial deployment | Why |
|---|---|---|
| **Binder** | D0 package + schemas + CLI | Should have almost no runtime dependency |
| **Basecoat** | D0/D1 + D2 validation | Governance changes frequently and should remain Git-versioned |
| **Sheen** | D0/D1 + D2 conformance | Tokens/guidance are artifacts; tests run on demand |
| **Adhesion** | D1/D2, with D3 for orchestration | Most evaluations can run in CI; complex suites may need durable execution |
| **Swatch** | D3/D6 application/API | Canonical graph needs persistent storage and query APIs |
| **Snitch** | D2/D3/D4 collectors | Mostly scheduled/event-driven discovery; isolate risky collectors |
| **Teardown** | D4 ephemeral containers | Clone/analyze untrusted repos in disposable environments |
| **Crosslink** | D3 durable workflow + thin app | Events, timers, escalation, acknowledgements, human-in-loop |
| **Proof** | D3/D6 API + durable store | Evidence ingestion is event-driven; records must persist |
| **Stencil** | D0/D2 library/policy evaluator | Prefer shared evaluation library rather than another service |
| **Formula** | D0 record + D2 comparison | Composition is data; evaluation can run in pipelines |
| **Blueprint** | D0 record + D1 design skill | Architecture intent changes more like documentation than runtime code |
| **Seal** | Prefer integrations + D2 checks | Avoid rebuilding CNAPP/AppSec products |
| **Reclaim** | D3 workflow | Retirement is long-running, approval-heavy workflow |

---

# 32. Recommended Execution Patterns

## Pattern A — Git-native artifact

Use for:

- Basecoat controls
- Sheen tokens
- Adhesion test definitions
- Binder schemas
- Blueprint architecture contracts
- Formula definitions
- compliance mappings

```text
Git
 ↓
PR
 ↓
Review
 ↓
Version
 ↓
Distribute
```

### Advantages

- almost no idle cost
- excellent auditability
- easy rollback
- high rate of change
- familiar enterprise controls
- code-owner approval
- branches/tags/releases

### Rule

If the capability can be represented as **versioned data**, prefer Git before introducing a runtime service.

---

# 33. Pattern B — Skills and On-Demand Agents

Use a **skill** when the work requires specialized knowledge, instructions, scripts, or references but does not need a continuously running service.

Examples:

```text
Basecoat skill:
  Evaluate repository governance

Sheen skill:
  Review a page for design-system conformance

Adhesion skill:
  Generate an evaluation plan

Teardown skill:
  Explain an already-generated graph
```

Benefits:

- changes travel with source control
- near-zero idle infrastructure
- skills load only when relevant
- behavior can evolve faster than application code
- common logic can be shared across interactive agents and coding environments

This is especially useful when a task requires **reasoning but not persistent autonomous execution**.

### Boundary

A skill should describe **how to perform work**.

It should not become:
- the durable system of record,
- a long-running scheduler,
- an unbounded autonomous worker,
- or an excuse to hide deterministic logic inside prompts.

---

# 34. Pattern C — CI/CD Workflows as the First Automation Runtime

For repository-scoped governance, GitHub Actions or equivalent CI/CD should be the **first runtime considered**.

Examples:

```text
Pull request
   ↓
Basecoat validation
   ↓
Sheen conformance
   ↓
Adhesion tests
   ↓
Teardown delta
   ↓
Proof evidence
```

Best for:

- policy validation
- schema checking
- SBOM creation
- test/eval execution
- security checks
- conformance checks
- drift checks
- publishing evidence
- synchronizing governed artifacts

### Why

The pipeline already knows:

- repository
- commit
- actor
- branch
- build
- artifact
- status

That produces excellent provenance without creating another orchestration platform.

### Hosted vs self-hosted runners

Prefer hosted runners for simplicity unless private network access, specialized hardware, data restrictions, or custom software require self-hosting.

If self-hosting is required, favor **ephemeral runners** over persistent shared machines.

---

# 35. Pattern D — Serverless and Durable Workflows

Use a durable/event-driven workflow when a task requires:

- retries
- timers
- callbacks
- approvals
- fan-out / fan-in
- multiple agents
- long-running state
- human-in-the-loop
- waiting on an external condition

Strong candidates:

### Crosslink

```text
Incident
 ↓
Resolve affected apps in Swatch
 ↓
Resolve responders
 ↓
Notify
 ↓
Wait for acknowledgement
 ↓
Escalate
 ↓
Create bridge
 ↓
Periodic updates
 ↓
Close
```

### Reclaim

```text
Retirement requested
 ↓
Find dependents
 ↓
Notify owners
 ↓
Wait for approval
 ↓
Remove traffic
 ↓
Archive evidence
 ↓
Delete resources
 ↓
Close
```

### Compliance remediation

```text
Violation
 ↓
Open remediation
 ↓
Assign owner
 ↓
Wait
 ↓
Retest
 ↓
Escalate if expired
```

This is preferable to keeping a container running while it waits.

---

# 36. Pattern E — Ephemeral Autonomous Agent Containers

Use autonomous containerized agents selectively.

Good candidates:

- **Teardown** repository analysis
- deep dependency analysis
- code transformation
- security investigation
- isolated build/reproduction
- discovery against privileged systems
- remediation proposal generation
- large multi-step repository operations

### Architecture

```text
Event / Queue
     ↓
Scheduler
     ↓
Disposable container
     ↓
Agent runtime
     ↓
Restricted tools
     ↓
Output artifact / observation / evidence
     ↓
Container destroyed
```

### Benefits

- strong isolation
- clean execution environment
- explicit resource limits
- easy versioning
- disposable credentials
- reproducibility
- scale-to-zero potential

### Guardrails

Each autonomous container should receive:

- a scoped identity
- explicit allowed tools
- explicit network policy
- CPU/memory/time limits
- a task-specific workspace
- no standing credentials
- immutable base image
- signed/versioned image
- complete logs
- external evidence persistence
- output validation before downstream action

### Key principle

**Autonomy belongs inside a bounded sandbox.**

Do not give a general-purpose agent broad enterprise permissions and rely on the prompt as the security boundary.

---

# 37. Pattern F — Managed Hosted Agents

Use managed hosted agents when the value comes from **stateful interactive behavior** rather than a one-shot job.

Candidate situations:

- multi-turn governance advisor
- architecture assistant
- interactive incident assistant
- long-running investigation
- agent that must maintain user/session files
- agents exposed as APIs to applications
- agents requiring managed identity and managed lifecycle

A managed agent platform can remove the need to operate:

- container scaling
- endpoint hosting
- session persistence
- identity plumbing
- basic observability
- agent lifecycle

### Trade-off

Managed hosting reduces infrastructure complexity but increases:

- platform dependency
- service cost
- deployment/runtime coupling
- possible constraints on networking/runtime behavior

Use it when those trade-offs are justified by stateful agent behavior.

---

# 38. Pattern G — Application + Workflow + Agent

Some products should be normal applications with agents as **components**, not “agent applications.”

Swatch is the clearest example.

```text
             Swatch Web/API
                  |
         +--------+---------+
         |                  |
     Graph Store          Queue
                            |
                   +--------+--------+
                   |                 |
                Snitch           Teardown
               collectors        workers
                   |                 |
                   +--------+--------+
                            |
                          Proof
```

The user-facing app should own:

- authentication
- authorization
- navigation
- querying
- canonical state
- transaction boundaries

Agents should own:

- interpretation
- enrichment
- investigation
- summarization
- recommendations
- bounded autonomous tasks

### Rule

**Do not make the LLM the database, workflow engine, authorization layer, or source of truth.**

---

# 39. Local and Private LLMs

Local/private models should be a **deployment option**, not the default architecture.

Good reasons to use them:

- disconnected/offline environments
- export-control or sovereignty constraints
- highly sensitive data boundaries
- predictable very-high sustained inference volume
- low-latency local inference
- specialized models
- experimentation where external model calls are undesirable

Weak reasons:

- “local is cheaper”
- avoiding API integration
- assuming local automatically means secure
- running a GPU continuously for an occasional task

## Two useful local patterns

### Developer / workstation local model

Example runtimes:
- Ollama-class local runtimes
- developer workstation GPU
- Dev Box / workstation sandbox

Best for:
- experimentation
- low-volume private analysis
- offline development
- local evaluation

### Enterprise private inference service

Example:
- vLLM-style OpenAI-compatible serving
- GPU VM/cluster
- internal endpoint behind enterprise identity/network controls

Best for:
- steady inference load
- shared private models
- controlled model versions
- internal network-only inference

## Important cost model

```text
Hosted API:
  low fixed cost
  variable token cost
  minimal model operations

Local/private:
  GPU fixed cost
  utilization risk
  model lifecycle ownership
  patching
  capacity planning
  observability
  security hardening
```

The break-even point should be measured, not assumed.

---

# 40. Model Routing and Cost Control

The architecture should separate **task orchestration** from **model selection**.

```text
Task
 ↓
Risk / complexity classifier
 ↓
+-------------------------------+
| deterministic code possible? |
+-------------------------------+
       | yes
       ↓
      code

       | no
       ↓

small / cheap model
       |
       | insufficient confidence
       ↓
larger reasoning model
       |
       | highly sensitive / constrained
       ↓
approved private/local model
```

## Cost controls

- deterministic logic before inference
- cache repeatable outputs
- batch low-priority work
- asynchronous queues
- model tiering
- token/input limits
- retrieval before sending large context
- content hashing to avoid re-analysis
- incremental/delta analysis
- reuse Teardown graphs instead of recloning repositories
- reuse Proof evidence instead of regenerating it
- rate limits by product/team
- per-application inference budgets
- per-agent concurrency limits
- explicit “expensive reasoning” escalation

### Example

Teardown should not analyze the entire repository on every commit.

```text
Initial scan
   ↓
Full graph

Next commit
   ↓
Git diff
   ↓
Affected nodes only
   ↓
Graph delta
```

That reduces both model and compute cost while increasing throughput.

---

# 41. Shearing Layers — How the System Learns

Basecoat applies a **Shearing Layers** design idea to software and governance: different parts of a healthy system should be allowed to change at different rates without forcing every other layer to move with them.

The idea is inspired by the architectural concept developed by Frank Duffy and expanded by Stewart Brand in *How Buildings Learn*. A building is not one thing changing at one speed. Its site, structure, services, interior layout, and contents evolve on different timescales. Systems become difficult to adapt when fast-changing layers are tightly coupled to slow-changing ones.

Basecoat applies the same reasoning to software:

> **Fast layers learn. Slow layers remember.**

The fast layers are where teams experiment, respond to feedback, and discover better ways to work.

The slow layers preserve the contracts, identities, controls, and infrastructure that give those experiments a stable place to operate.

The goal is therefore **not simply to put fast-changing behavior in configuration**. The larger goal is to let each layer evolve at the pace appropriate to its purpose while minimizing unnecessary coupling between layers.

## A working model for the family

| Pace | Role in the system | Examples | Typical deployment |
|---|---|---|---|
| **Fast — Experiment** | Try ideas, respond to local needs, discover better patterns | Prompts, local guidance, temporary agent instructions, experiments | Git artifacts / local configuration |
| **Fast–Adaptive — Learn** | Turn useful patterns into reusable behavior | Skills, eval definitions, agent definitions, policy mappings | Versioned packages / configuration |
| **Adaptive — Operationalize** | Make learned behavior repeatable | CI/CD workflows, durable workflows, agent orchestration | Workflow definitions / serverless |
| **Moderate — Productize** | Provide stable capabilities used by many teams | APIs, collectors, workers, application services | Containers / managed application platforms |
| **Slow — Standardize** | Preserve contracts that many components depend on | Binder schemas, canonical IDs, control model, evidence model, taxonomy contracts | Versioned compatibility contracts |
| **Slowest — Anchor** | Establish durable enterprise boundaries | Identity, network boundaries, data stores, platform foundations, regulatory constraints | Managed infrastructure / enterprise platforms |

## Learning moves inward carefully

A useful pattern is:

```text
Experiment
    ↓
Observe
    ↓
Validate
    ↓
Repeat
    ↓
Promote
    ↓
Standardize
```

An idea should normally begin in a fast layer.

Only after it proves useful should it move into a slower, more widely shared layer.

Example:

```text
Developer prompt
      ↓
Reusable skill
      ↓
Shared Basecoat guidance
      ↓
Automated workflow
      ↓
Enterprise control
      ↓
Platform-enforced default
```

This provides a natural path from **learning to governance**.

## Slow layers constrain; fast layers inform

The relationship works in both directions.

```text
Slow layers
    ↓
provide boundaries, contracts, identity, safety

Fast layers
    ↑
provide experiments, evidence, feedback, innovation
```

The slow layers should not dictate every implementation detail.

The fast layers should not be able to silently invalidate the assumptions of the slow layers.

A healthy system allows the layers to **shear**—to change independently while remaining connected through explicit contracts.

## Why coupling matters

A common failure mode is allowing a fast-changing concern to become embedded inside a slow-moving layer.

For example:

```text
Bad coupling:

Prompt wording
    embedded in
application service
    requiring
container rebuild
    requiring
infrastructure deployment
```

A small guidance change now causes a large operational change.

Prefer:

```text
Prompt / Skill
     ↓
versioned artifact
     ↓
stable runtime contract
     ↓
application service
```

The faster layer can evolve without redeploying the slower one.

The reverse problem is also dangerous:

```text
Fast-moving agent
     ↓
silently changes
canonical control semantics
```

Canonical controls belong in a slower layer and require deliberate promotion, review, and versioning.

## How the family learns

The family should deliberately support learning at multiple speeds:

```text
Local experiment
      ↓
Adhesion measures outcome
      ↓
Proof preserves evidence
      ↓
Feedback identifies a useful pattern
      ↓
Basecoat promotes reusable guidance
      ↓
Binder stabilizes shared contracts when necessary
```

This means governance itself can learn.

A policy does not become permanent simply because it was once approved. Evidence, exceptions, developer friction, incidents, and successful local patterns can all provide signals that the governance layer should change.

## Architectural rule

> **Let fast layers experiment and learn; let slow layers stabilize and remember. Couple them through explicit contracts rather than shared implementation.**

This is more precise than treating change rate only as a deployment concern.

It affects:

- repository structure,
- product boundaries,
- APIs,
- schemas,
- policy design,
- agent behavior,
- deployment architecture,
- versioning,
- evidence,
- and how successful experiments become enterprise standards.

### Examples in this family

```text
Fast:
  prompt
  repo-specific instruction
  experimental skill
  evaluation rubric

        ↓ learning / promotion

Medium:
  shared skill
  Basecoat guidance
  Adhesion evaluation
  workflow
  autonomous worker

        ↓ proven stability / broader dependency

Slow:
  Binder contract
  canonical Batch identity
  Proof schema
  control semantics
  enterprise taxonomy

        ↓

Anchor:
  identity boundary
  network boundary
  regulated data boundary
  durable system of record
```

The important question is not:

> "How often can we deploy this?"

It is:

> **"How quickly should this concept be allowed to change, who depends on it, and what evidence should be required before we move it into a slower layer?"**

### References

- Basecoat: `basecoat-10-core-shearing-layers` — design guidance for change velocity and coupling between Basecoat layers.
- Stewart Brand, *How Buildings Learn: What Happens After They're Built* (1994).
- Stewart Brand, “Pace Layering: How Complex Systems Learn and Keep Learning,” *Journal of Design and Science* (2018).

---

# 42. Control Plane vs Execution Plane

Separate governance from the workers that execute it.

```text
                 CONTROL PLANE

Binder
Basecoat
Swatch
Policies
Profiles
Identity
Task definitions
Approvals
Budgets

                     |
                     v

                EXECUTION PLANE

GitHub Actions
Serverless workflows
Container jobs
Hosted agents
Self-hosted workers
Private/local models
```

## Benefits

- policies can change independently of compute
- multiple execution platforms can coexist
- sensitive workloads can be routed differently
- model providers can change without rewriting governance
- local/on-prem execution becomes possible
- execution failures do not corrupt canonical governance state

### Example routing

```text
Teardown request

classification = public
    → hosted ephemeral job

classification = internal
    → enterprise container job

classification = export-controlled
    → approved isolated worker + approved model
```

---

# 43. Suggested Deployment Architecture for the Family

```text
                            Git
            Policies / Skills / Schemas / Workflows
                             |
                             v
                          Binder
                             |
              +--------------+--------------+
              |                             |
          Basecoat                      Sheen/Adhesion
              |                             |
              +--------------+--------------+
                             |
                           Swatch
                      API + Graph Store
                             |
                Events / Queue / Scheduler
             +---------------+----------------+
             |               |                |
          Snitch          Teardown          Crosslink
        collectors     agent containers    workflows
             |               |                |
             +---------------+----------------+
                             |
                           Proof
                    Proof / Provenance
                             |
             +---------------+----------------+
             |                                |
       Managed models                  Private/local models
       as default                      when policy requires
```

### Deployment stance

1. **Git is the distribution layer for governance artifacts.**
2. **Swatch is the persistent application graph.**
3. **Queues/events decouple discovery and analysis.**
4. **Snitch and Teardown scale independently.**
5. **Autonomous execution is ephemeral by default.**
6. **Crosslink uses durable workflow semantics rather than long-running processes.**
7. **Proof persists evidence outside disposable runtimes.**
8. **Model providers sit behind an abstraction/routing layer.**
9. **Local LLMs are an approved route, not a separate product architecture.**

---

# 44. Product-Specific Deployment Ideas

## Basecoat

**Default:** Git-native instructions, controls, skills, agents, schemas.

Optional:
- CI enforcement
- policy evaluation CLI
- thin API for control resolution if enterprise-scale dynamic policy calculation becomes necessary

Avoid:
- requiring a Basecoat server for basic governance

---

## Sheen

**Default:** Git-native design tokens + skills + validation package.

Runtime:
- CI visual/accessibility validation
- optional Storybook/design-system integrations

Avoid:
- central service unless cross-enterprise token/catalog search requires it

---

## Adhesion

**Default:** test/eval definitions + runner adapters.

Runtime progression:
1. CI
2. serverless orchestration
3. container jobs for expensive suites
4. dedicated workers only at sustained scale

---

## Swatch

**Default:** real application.

Likely components:
- API
- graph-capable datastore
- search
- identity/RBAC
- event bus
- ingestion APIs
- reconciliation engine

Agents enrich Swatch; they do not replace it.

---

## Snitch

**Default:** plugin/collector framework.

Collectors should usually be:
- scheduled
- event triggered
- short lived

Examples:
- GitHub collector
- Azure collector
- AWS collector
- Kubernetes collector
- ServiceNow collector
- model/MCP discovery collector

High-privilege collectors should run in isolated ephemeral environments.

---

## Teardown

**Default:** queue-triggered ephemeral container.

Why:
- repository content may be untrusted
- analysis can be CPU/memory intensive
- jobs may require specialized tooling
- clean environment improves repeatability

Teardown should write graph deltas and evidence, then terminate.

---

## Crosslink

**Default:** durable workflow + thin UI/API.

Use agents for:
- incident summary
- likely ownership interpretation
- status drafting
- timeline generation

Do not use an agent for:
- escalation timers
- acknowledgements
- paging rules
- authorization

Those should remain deterministic.

---

## Proof

**Default:** event ingestion API + durable append-oriented store.

Producers:
- CI/CD
- Adhesion
- Teardown
- Basecoat
- Crosslink
- external security/ITSM tools

The write path should not depend on an LLM.

---

# 45. Deployment Anti-Patterns

## 1. Agent for everything

Bad:

```text
Agent decides whether a branch is protected.
```

Better:

```text
API query + deterministic policy check.
```

Use the agent to explain the result, not determine an objective fact.

---

## 2. Long-running container waiting for humans

Bad:

```text
Container waits 3 days for approval.
```

Better:

```text
Durable workflow persists state and resumes on approval.
```

---

## 3. Persistent privileged autonomous agents

Avoid continuously running agents with broad credentials.

Prefer:
- just-in-time identity
- task-level scope
- ephemeral runtime
- explicit tools
- short TTL

---

## 4. LLM as system of record

Never use conversational memory as the authoritative source for:
- ownership
- controls
- evidence
- classifications
- exceptions
- incidents

---

## 5. Re-running expensive analysis unnecessarily

Use:
- hashes
- graph deltas
- cached evidence
- incremental analysis

---

## 6. Building commodity infrastructure

Prefer integrations for:
- logs/metrics/traces
- cloud cost
- paging
- source control
- package scanning
- identity

Build where the family creates differentiated governance value.

---

# 46. Deployment Decision Scorecard

For every new capability, fill this out before selecting an execution model.

| Question | Answer |
|---|---|
| Can this be data/configuration instead of code? | |
| Can it run only when invoked? | |
| Can CI/CD host it? | |
| Is execution deterministic? | |
| Does it require an LLM? | |
| Does it require autonomous multi-step reasoning? | |
| Does it execute untrusted code/content? | |
| Does it need durable state? | |
| Does it need human-in-the-loop waiting? | |
| Does it require private network access? | |
| Does it require specialized GPU/CPU? | |
| Expected executions/day | |
| Expected inference tokens/day | |
| Maximum acceptable latency | |
| Required isolation level | |
| Data classification | |
| Required geographic boundary | |
| Cost ceiling | |
| Expected rate of behavior change | |
| Expected rate of infrastructure change | |

### Decision output

```text
Deployment class:
D0 / D1 / D2 / D3 / D4 / D5 / D6 / D7

Reason:

Escalation trigger:
"When X becomes true, reconsider the deployment class."
```

This prevents architecture from being driven by enthusiasm for a particular runtime.

---

# 47. Example Graduation Scenarios

## Teardown

### v1
GitHub Action invokes CLI.

### v2
Queue-triggered container for larger repositories.

### v3
Ephemeral autonomous agent container with restricted tools.

### v4
Dedicated worker pool only if enterprise volume requires it.

---

## Snitch

### v1
Scheduled GitHub/Azure collectors.

### v2
Event-driven collectors writing observations.

### v3
Containerized privileged collectors for isolated environments.

### v4
Dedicated collectors only for high-volume domains.

---

## Adhesion

### v1
CI test/eval runner.

### v2
Parallel evaluation jobs.

### v3
Durable multi-agent evaluation workflow.

### v4
Dedicated evaluation service only if shared enterprise throughput justifies it.

---

## Crosslink

### v1
Workflow that resolves ownership and sends notifications.

### v2
Durable escalation and acknowledgements.

### v3
Agent-generated summaries/status messages.

### v4
Interactive incident agent after deterministic coordination primitives are mature.

---

# 48. Deployment Research References

Current platform capabilities worth considering during implementation:

- GitHub Copilot agent skills  
  https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills

- GitHub Actions runners and self-hosted runner guidance  
  https://docs.github.com/en/actions/concepts/runners  
  https://docs.github.com/en/actions/concepts/runners/self-hosted-runners

- Azure Container Apps Jobs  
  https://learn.microsoft.com/en-us/azure/container-apps/jobs-get-started-portal

- Microsoft Agent Framework hosting options  
  https://learn.microsoft.com/en-us/agent-framework/hosting/

- Durable Agent Framework workflows  
  https://learn.microsoft.com/en-us/agent-framework/hosting/azure-functions

- Microsoft Foundry Hosted Agents  
  https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents

- vLLM OpenAI-compatible serving  
  https://docs.vllm.ai/en/latest/serving/openai_compatible_server/

These are implementation options, not required dependencies of the family architecture.

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

# 50. Side Quest — Where Governance Came From

> **Optional reading:** This section is a historical and conceptual side quest for anyone who wants to understand why the governance model in this notebook looks the way it does.

The ideas in this notebook have been evolving for a long time.

Long before AI-assisted development, cloud landing zones, policy-as-code, autonomous agents, software bills of materials, or AI risk frameworks, the same core questions kept appearing:

- Who has authority?
- What is governed?
- Who is governed?
- How much should be enforced?
- Where should enforcement happen?
- How should violations be detected?
- What happens when a rule is broken?
- How are exceptions handled?
- How do policies change when reality proves them wrong?
- How do we preserve enough freedom for people to get work done?

The technology has changed dramatically. The governance problem has not.

This section traces the historical ideas that now inform the Basecoat family.

---

# 51. The Oldest Metaphor: Governance Means Steering

The word **governance** traces back through Old French and Latin to the Greek root **kybernan**, meaning roughly **to steer or pilot**.

That gives us a useful starting metaphor:

> **Governance is steering, not handcuffing.**

The objective is not to control every individual movement. It is to establish:

- direction,
- boundaries,
- responsibility,
- feedback,
- and corrective action

so that many independent actors can move without causing the organization to lose control of where it is going.

This metaphor remains useful for modern distributed engineering organizations.

```text
Desired direction
       ↓
Guidance / constraints
       ↓
Independent action
       ↓
Observation
       ↓
Correction
       ↓
Continue
```

That is a governance loop.

---

# 52. Governance Is Not the Same as Law

Governance is broader than law.

Law and regulation can create obligations, but governance is the system an organization uses to decide how those obligations—and its own internal expectations—are interpreted, implemented, monitored, and changed.

Sources of governance requirements can include:

```text
Law / Regulation
       |
Contracts
       |
Board / Executive Direction
       |
Corporate Policy
       |
Industry Standards
       |
Certification Requirements
       |
Customer Requirements
       |
Risk Appetite
       |
Architecture Standards
       |
Professional Norms
       |
Internal Operating Rules
```

All of these can create governance obligations.

Examples:

```text
"Do not export controlled technical data"
    → may originate in law/regulation

"Production repositories require two reviewers"
    → may originate in internal corporate policy

"Applications must use the approved design system"
    → may originate in an engineering standard
```

The enforcement mechanism may look similar even when the source of authority is different.

## Design implication

Every control should eventually be traceable to an **authority/source**, but that authority does not have to be law.

---

# 53. Government, Governance, Management, and Compliance

These terms overlap but are not interchangeable.

## Government

Formal institutions with legal authority.

## Governance

The system by which direction is established, decisions are overseen, responsibility is assigned, and accountability is maintained.

## Management

The planning and execution of work within the direction established by governance.

## Compliance

Conformance with a specific requirement, obligation, policy, contract, regulation, or standard.

A useful relationship is:

```text
Governance
    ↓
sets direction and accountability

Management
    ↓
plans and executes

Controls
    ↓
translate expectations into mechanisms

Compliance
    ↓
describes whether requirements are being met

Assurance
    ↓
provides confidence that the system is working
```

This matters because a company can be **compliant with one requirement and still have weak governance**, or have strong governance while knowingly accepting a documented residual risk.

---

# 54. A Short History of Modern Governance Thinking

The following is a simplified lineage, not a claim that each framework directly evolved from the one before it.

```text
Ancient steering metaphor
        ↓
Institutional / public governance
        ↓
Corporate governance
        ↓
IT governance
        ↓
Cybersecurity governance
        ↓
AI governance
```

## Late 20th century — public and institutional governance

Modern governance language became increasingly common in public-sector and development contexts as organizations focused on:

- authority,
- accountability,
- transparency,
- institutions,
- policy execution,
- and stakeholder interests.

## Corporate governance

Corporate-governance models formalized ideas such as:

- strategic direction,
- oversight,
- board responsibility,
- accountability,
- risk,
- stakeholder interests,
- and monitoring management.

A highly influential formulation described corporate governance as the **system by which companies are directed and controlled**.

## IT governance

IT governance frameworks carried those same ideas into technology.

A particularly useful pattern became:

```text
Evaluate
   ↓
Direct
   ↓
Monitor
```

Management then plans, builds, runs, and monitors systems within that direction.

## Cybersecurity governance

Modern cybersecurity frameworks elevated governance into an explicit function that includes:

- organizational context,
- roles and responsibilities,
- policy,
- risk strategy,
- oversight,
- legal and contractual requirements,
- and supply-chain risk.

## AI governance

AI governance extends the same ideas across the AI lifecycle:

- policies,
- risk tolerances,
- inventories,
- testing,
- transparency,
- human accountability,
- third-party risk,
- monitoring,
- incidents,
- and decommissioning.

The vocabulary changed.

The governance loop did not.

---

# 55. A Long Journey to the Current Model

The current architecture did not begin with AI.

The recurring pattern has been:

```text
Define what matters
        ↓
Determine who/what it applies to
        ↓
Choose how strongly to enforce it
        ↓
Choose where enforcement belongs
        ↓
Implement the least-complex effective mechanism
        ↓
Observe what actually happens
        ↓
Validate the outcome
        ↓
Respond to failures
        ↓
Learn from exceptions and friction
        ↓
Change the policy
        ↓
Repeat
```

The implementation technologies have moved through several generations:

```text
manual policy
    ↓
templates
    ↓
provisioning automation
    ↓
workflow
    ↓
policy-as-code
    ↓
CI/CD guardrails
    ↓
cloud policy
    ↓
skills and agents
    ↓
autonomous workflows
```

The core problem remains the same:

> **How do we create enough control to achieve organizational intent without making the system so difficult that people route around it?**

---

# 56. The Governance Gradient

Governance should not be treated as binary.

A control can be applied at different strengths depending on risk, context, evidence quality, and organizational tolerance.

```text
Observe
   ↓
Inform
   ↓
Recommend
   ↓
Warn
   ↓
Require evidence
   ↓
Require approval
   ↓
Block
   ↓
Prevent architecturally
```

This can be described as a **Governance Gradient**.

The enforcement level can depend on:

```text
Risk
Impact
Likelihood
Classification
Regulatory obligation
Confidence of detection
Cost of control
Cost of failure
Developer/user friction
Reversibility
```

## Example

```text
UI consistency
    → recommend / validate

Missing production owner
    → warn, then escalate

Secret committed to source
    → block

Export-controlled data sent to an unapproved service
    → prevent architecturally
```

The organization is therefore not simply "strict" or "permissive."

Different controls occupy different positions on the gradient.

---

# 57. The Governance Loop

The platform family can be mapped to a generic governance lifecycle.

```text
                    DEFINE
                      |
                  Basecoat
                      |
                      v
                    APPLY
                      |
                  Stencil
                      |
                      v
                   PREVENT
                      |
          Platform / CI / Guardrails
                      |
                      v
                  OBSERVE
                 /       \
            Snitch       Teardown
                 \       /
                  v     v
                  VALIDATE
                      |
                   Adhesion
                      |
                      v
                    RECORD
                      |
                    Proof
                      |
                      v
                   RESPOND
                      |
                    Crosslink
                      |
                      v
                   IMPROVE
                      |
                  Basecoat
```

**Swatch** provides the context for the thing being governed.

**Binder** provides the contracts that allow the family to work together.

The important part is the loop:

```text
Policy
  ↓
Implementation
  ↓
Behavior
  ↓
Evidence
  ↓
Outcome
  ↓
Feedback
  ↓
Policy change
```

Governance is therefore a living control system rather than a static rulebook.

---

# 58. Governance Actors

A useful governance system separates responsibilities rather than putting every role in one team.

A modernized role model:

| Role | Responsibility |
|---|---|
| **Authority / Governing Body** | Establish intent and accountability |
| **Policy Owner** | Translate intent into policy |
| **Communicator / Enabler** | Make expectations understandable and usable |
| **Control Owner / Enforcer** | Implement controls |
| **Validator** | Test whether controls and outcomes work |
| **Assurance / Auditor** | Independently assess confidence in the system |
| **Governed Actor** | Human, team, service, or agent expected to operate within constraints |

This separation matters because the same system should not automatically:

```text
write the rule
implement the rule
test the rule
declare the rule effective
audit itself
```

Independence should increase as the consequence and assurance requirement increase.

---

# 59. Governance Authority and Autonomous Agents

AI agents introduce a new actor, but they do not eliminate governance authority.

A useful principle is:

> **Automation may execute governance authority; it does not create governance authority.**

```text
Human / Organizational Authority
             |
             v
           Policy
             |
             v
           Control
             |
             v
   Delegated Automation
       /           \
 Workflow         Agent
       \           /
             |
             v
        Decision / Action
             |
             v
           Evidence
```

An agent can:

- observe,
- recommend,
- test,
- enforce,
- remediate,
- escalate,
- or coordinate.

But its authority should be traceable to an approved control and an accountable human or organizational authority.

This becomes particularly important for autonomous remediation.

---

# 60. Governance as Proportional Control

One of the most persistent ideas across the journey is that **maximum enforcement is not automatically better governance**.

A useful modern vocabulary includes:

- risk appetite
- risk tolerance
- proportionality
- reasonable assurance
- residual risk
- compensating controls
- exceptions
- cost/benefit
- control effectiveness

That produces a more realistic formula:

```text
Governance Value
    ≈
Risk Reduced
    -
Control Cost
    -
Operational Friction
    -
Exception / Maintenance Cost
```

This is intentionally not a precise mathematical formula.

It is a design heuristic.

A control that technically reduces risk but creates massive workarounds, shadow systems, or operational cost may produce less governance value than a lighter control with strong visibility and evidence.

---

# 61. "Good Enough" Is an Engineering Concept, Not a Failure

Governance does not require eliminating all risk.

The relevant questions are:

```text
What risk exists?

What outcome matters?

How much risk are we willing to accept?

What control gives reasonable assurance?

What residual risk remains?

Who has authority to accept it?

When should that decision expire or be reviewed?
```

This creates a disciplined place for:

- exceptions,
- waivers,
- compensating controls,
- temporary acceptance,
- staged remediation,
- and risk-based prioritization.

A binary model:

```text
compliant / non-compliant
```

is often too weak to describe real enterprise governance.

A stronger model is:

```text
requirement
    ↓
control
    ↓
evidence
    ↓
effectiveness
    ↓
residual risk
    ↓
accept / remediate / strengthen / retire
```

---

# 62. Classification Should Drive Governance

Another recurring principle is that classification should influence architecture and controls.

```text
Classification
      ↓
Profile
      ↓
Controls
      ↓
Enforcement Strength
      ↓
Placement / Architecture
      ↓
Evidence Requirements
```

Examples:

```text
Public prototype
    → lightweight governance

Production customer application
    → stronger SDLC and operational controls

CUI workload
    → controlled environment + stronger evidence

ITAR-controlled workload
    → personnel, geography, service, and export restrictions

High-risk AI system
    → stronger evaluation, monitoring, and approval requirements
```

This is why classification belongs in **Swatch**, while Basecoat resolves the control implications.

---

# 63. Enforcement Belongs at the Right Scope

A policy may be correct but ineffective if enforced at the wrong point.

Candidate scopes in the modern family include:

```text
Enterprise
  ↓
Business Unit
  ↓
Portfolio
  ↓
Application
  ↓
Repository
  ↓
Branch / Pull Request
  ↓
Build
  ↓
Artifact
  ↓
Deployment
  ↓
Runtime
  ↓
Model / Agent / Tool
  ↓
Data
```

The ideal enforcement point is usually the earliest place where the organization has:

1. enough information to make the decision,
2. enough authority to enforce it,
3. and low enough cost to prevent or correct the problem.

This supports a simple principle:

> **Prevent early when the rule is deterministic; observe and validate later when reality cannot be known earlier.**

---

# 64. Reversibility Is a Governance Feature

Governance actions should not automatically be permanent.

Possible responses include:

```text
Inform
Warn
Request evidence
Require approval
Quarantine
Read-only
Disable capability
Rollback
Archive
Hold
Remediate
Restore
Delete
```

The system should understand whether an enforcement action is:

- reversible,
- partially reversible,
- destructive,
- or legally required to preserve evidence.

This is particularly important for:

- automated remediation,
- autonomous agents,
- lifecycle management,
- incident response,
- records retention,
- and decommissioning.

A useful principle:

> **Prefer reversible controls until the confidence and authority justify irreversible action.**

---

# 65. Governance Capacity

Organizations differ in how much governance complexity they can successfully operate.

Factors include:

- technical maturity
- staffing
- central vs federated structure
- internal vs outsourced development
- developer skill
- user skill
- regulatory burden
- platform standardization
- acquisition history
- number of environments
- organizational change rate

This suggests a concept of **governance capacity**.

```text
Strong requirement
      +
Weak governance capacity
      =
Do not add paperwork.

Instead:
simplify the path,
automate the control,
reduce choices,
and provide secure defaults.
```

This reinforces a major Basecoat principle:

> **The stronger the requirement, the less it should depend on perfect human behavior.**

---

# 66. Federated Governance

Enterprise-scale governance should not require every technical decision to be centralized.

The desired model is:

```text
Centralized:
  intent
  controls
  minimum standards
  identity
  evidence requirements
  accountability

Federated:
  architecture choices
  implementation
  delivery
  experimentation
  local optimization
```

In other words:

> **Centralize the guardrails. Decentralize the work.**

This is particularly important for large engineering organizations and autonomous development agents.

The purpose of Basecoat is not to make every repository identical.

It is to make organizational intent portable across repositories without destroying team autonomy.

---

# 67. Governance Fragmentation Is a Governance Problem

Organizations often respond to each new requirement by creating another:

- tool,
- workflow,
- dashboard,
- policy,
- portal,
- scanner,
- database,
- committee,
- or review gate.

Over time, the controls themselves become difficult to govern.

This family should actively avoid that outcome.

The shared architecture exists so that:

```text
one identity model
one control model
one evidence model
one exception model
one family contract
```

can support many specialized capabilities.

That is one of the reasons **Binder** matters.

The family should be composable without becoming a collection of unrelated governance systems.

---

# 68. Governance Is Experienced Through the Path

Governance is not only a backend policy system.

People encounter governance through:

- templates,
- defaults,
- labels,
- warnings,
- documentation,
- user interfaces,
- approval workflows,
- error messages,
- provisioning flows,
- remediation steps,
- and self-service experiences.

This makes experience design part of governance.

A badly designed control can be technically correct and operationally ineffective.

That creates an important relationship:

```text
Basecoat
    defines intent

Sheen
    helps make the governed path understandable and usable

Adhesion
    verifies that both the technical and experience expectations are met
```

The usability of governance directly affects whether people comply with it or route around it.

---

# 69. A Modern Governance Control Model

The historical ideas in this side quest can be condensed into a modern control object.

```text
CONTROL
│
├── Authority
│   └── Who has the right to establish this requirement?
│
├── Intent
│   └── What outcome are we trying to achieve?
│
├── Subject
│   └── Who/what is governed?
│
├── Classification / Applicability
│   └── Why does this control apply?
│
├── Strength
│   └── Inform / Warn / Approve / Block / Prevent
│
├── Scope
│   └── Enterprise / App / Repo / Build / Runtime / Model / Data
│
├── Enforcement Point
│   └── Where can the control actually be applied?
│
├── Implementation
│   └── Artifact / Skill / Workflow / Policy / Platform / Agent
│
├── Evidence
│   └── How do we know the control is operating?
│
├── Confidence
│   └── Deterministic / observed / inferred / unknown
│
├── Exception
│   └── What controlled deviation is allowed?
│
├── Response
│   └── Remediate / Quarantine / Escalate / Reclaim
│
├── Reversibility
│   └── Can the action be safely undone?
│
└── Feedback
    └── Keep / Relax / Strengthen / Amend / Retire
```

This can become a candidate schema for Basecoat/Binder.

---

# 70. The Core Philosophy

After a long journey through enterprise platforms, provisioning, cloud, security, DevOps, AI-assisted development, and autonomous agents, the core governance problem remains surprisingly stable.

A useful summary is:

> **Governance is the system that makes organizational intent operable.**

It does this by creating:

```text
Direction
Boundaries
Authority
Accountability
Feedback
```

And the family implements those ideas as:

```text
Swatch     → know what exists
Basecoat   → define intent and controls
Stencil    → determine applicability and scope
Binder     → connect the system
Snitch     → observe reality
Teardown   → understand composition
Adhesion   → validate outcomes
Proof      → preserve evidence
Crosslink     → coordinate response
Reclaim    → govern the end of life
Sheen      → make the governed path usable
```

The destination has changed.

The steering problem has not.

---

# 71. Side Quest References and Frameworks to Explore

These are useful anchors for deeper research into formal governance terminology.

## Organizational / corporate governance

- **ISO 37000 — Governance of organizations**
- **G20/OECD Principles of Corporate Governance**
- **UK Corporate Governance Code / Cadbury lineage**
- **IIA Three Lines Model**

## Technology governance

- **ISO/IEC 38500 — Governance of IT**
- **COBIT**
- **ITIL / ITSM**
- **ISO/IEC 20000**

## Cybersecurity governance

- **NIST Cybersecurity Framework 2.0**
- **ISO/IEC 27001**
- **CIS Controls**

## AI governance

- **NIST AI Risk Management Framework**
- **ISO/IEC 42001**
- **OWASP GenAI Security Project**

## Controls and assurance

- **NIST OSCAL**
- **SOC 2 / Trust Services Criteria**
- **CMMC**
- **FedRAMP**
- **PCI DSS**

## Useful research questions

- Which governance concepts belong in Binder schemas?
- Which belong in Basecoat controls?
- Which require independent assurance rather than self-validation?
- How should risk appetite change enforcement strength?
- How should governance authority be represented for autonomous agents?
- Can governance capacity be measured?
- When should a control graduate from guidance to architectural prevention?

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

---

# 73. Naming Update — Crosslink

**Decision:** Use **Crosslink** as the product name for incident and operational coordination.

## Why Crosslink fits

In coatings and polymer chemistry, crosslinking connects polymer chains into a stronger network.

That maps naturally to incident and operational coordination:

```text
Incident / Event
      |
   Crosslink
      |
  +---+-------------+-------------+
  |                 |             |
Owner           On-call       Security
  |                 |             |
Business        Technical       Vendor
Owner           Responder       Support
```

Crosslink is responsible for connecting the **right people, roles, teams, and escalation paths** around a governed application.

### Product role

> **Crosslink — Coordinate**

Candidate capabilities:

- call trees
- on-call resolution
- escalation paths
- responder acknowledgement
- bridge/channel coordination
- incident roles
- business-owner notification
- vendor escalation
- status communications
- post-incident handoff

### Boundary

Crosslink coordinates response.

It should not become the primary:
- observability platform,
- incident-detection engine,
- application inventory,
- or diagnostic system.

Those capabilities should be supplied by integrations, Snitch, Teardown, and Swatch/Batch context.

---

# 74. Rethinking Batch — A Governed Application Package

A stronger interpretation of **Batch** is emerging.

Instead of treating Batch only as an evidence store, a **Batch can represent one complete governed application unit**.

A Batch brings together the material needed to understand, govern, validate, operate, and prove one application.

```text
Batch: Claims Processing
│
├── Identity / Manifest
│
├── Swatch
│   ├── ownership
│   ├── classification
│   ├── business context
│   ├── lifecycle
│   └── profiles
│
├── Teardown Graph
│   ├── repositories
│   ├── services
│   ├── APIs
│   ├── packages
│   ├── models
│   ├── agents
│   ├── MCP servers
│   └── dependencies
│
├── Blueprint / Formula
│   ├── intended architecture
│   └── approved composition
│
├── Basecoat
│   ├── applicable controls
│   ├── policy versions
│   └── exceptions
│
├── Adhesion
│   ├── tests
│   ├── evaluations
│   └── results
│
├── Sheen
│   └── experience/design conformance
│
├── Crosslink
│   ├── owners
│   ├── responders
│   └── escalation paths
│
└── Proof / Provenance
    ├── builds
    ├── SBOM
    ├── attestations
    ├── approvals
    ├── deployments
    └── history
```

This makes **Batch** analogous to a manufactured coating batch:

- it has an identity,
- a composition,
- a specification,
- inputs,
- test results,
- provenance,
- disposition,
- and history.

The application is not just a record in a CMDB. It is a **governed product instance with traceable composition and evidence**.

---

# 75. What Is a Catalog of Batches?

In manufacturing, collections of batch records are commonly described using terms such as:

- **batch register**
- **batch log**
- **batch history**
- **batch record repository**
- **lot history / lot genealogy**

For this product family, the strongest naming candidates are:

| Candidate | Meaning | Fit |
|---|---|---|
| **Batchbook** | A book/catalog containing batches | Strongest family/product name |
| **Batch Register** | Formal register of batches | Precise, enterprise, less playful |
| **Batch Log** | Chronological record | Better for history than catalog/navigation |
| **Batch Library** | Collection of reusable/known batches | Familiar, but generic |
| **Batch Deck** | A grouped collection | Fits Swatch/Deck vocabulary but less manufacturing-authentic |
| **Lotbook** | Collection of lots | Strong traceability metaphor, less intuitive in software |
| **Formula Book** | Traditional collection of formulations | Better for approved recipes than actual application instances |

## Current preferred model

### **Batchbook**
The enterprise catalog / system of record.

### **Batch**
One governed application.

### **Swatch**
The compact identity/profile/manifest view of that Batch.

### **Deck**
A durable grouping of Batches.

### **Palette**
A curated or dynamic selection of Batches.

```text
                    Batchbook
                        |
        +---------------+---------------+
        |               |               |
      Batch           Batch           Batch
   Claims App       ERP Service      AI Portal
        |
        +-- Swatch
        +-- Graph
        +-- Formula
        +-- Controls
        +-- Tests
        +-- Evidence
        +-- Crosslink
```

This resolves an important naming issue:

> **Swatch does not have to be the entire catalog.**

A Swatch can be the concise, recognizable representation of one Batch, while **Batchbook** is the larger enterprise catalog and graph.

---

# 76. Batchbook Vocabulary

A potential domain vocabulary:

```text
Batchbook
    Enterprise catalog of governed applications

Batch
    One governed application/product instance

Swatch
    Human- and machine-readable application profile

Deck
    Durable organizational grouping

Palette
    Dynamic/curated selection

Formula
    Approved component/composition definition

Blueprint
    Intended architecture

Teardown
    Discovered architecture/composition graph

Stamp
    A signed/approved attestation or validation result

Batch Record
    Historical evidence package for a particular version/release

Lot
    Optional immutable artifact/build/deployment grouping
```

### Example

```text
Batchbook
  |
  +-- Batch: claims-processing
        |
        +-- Swatch: claims-processing.yaml
        |
        +-- Blueprint: claims-v4
        |
        +-- Formula: python-api-ai-v3
        |
        +-- Teardown:
        |      actual application graph
        |
        +-- Basecoat:
        |      142 applicable controls
        |
        +-- Adhesion:
        |      latest evaluation results
        |
        +-- Crosslink:
        |      claims-platform responders
        |
        +-- Batch Records:
               release 2026.09.1
               release 2026.09.2
               release 2026.09.3
```

This distinction also prevents the word **Batch** from being overloaded as both the current application and every individual build.

The **Batch** is the governed application.

A **Batch Record** captures a point-in-time release/build/evidence state.

---

# 77. Revised Family Map

With the naming changes and the stronger Batch model:

```text
                         BINDER
                 Shared Family Contract
                           |
       +-------------------+-------------------+
       |                   |                   |
    Basecoat             Sheen             Adhesion
     Govern             Experience           Verify
       |                   |                   |
       +-------------------+-------------------+
                           |
                       BATCHBOOK
                  Enterprise Catalog
                           |
                         Batch
              One Governed Application
                           |
          +----------------+----------------+
          |                |                |
        Swatch          Teardown        Crosslink
        Profile         Understand      Coordinate
          |                |                |
          +----------------+----------------+
                           |
                         Snitch
                        Discover
                           |
                       Observations
```

Each Batch can also contain or reference:

```text
Blueprint
Formula
Controls
Exceptions
Evaluations
Evidence
Attestations
Deployment history
Lifecycle state
```

## Working verbs

- **Binder — Connect**
- **Basecoat — Govern**
- **Sheen — Experience**
- **Adhesion — Verify**
- **Batchbook — Catalog**
- **Batch — Represent**
- **Swatch — Identify**
- **Snitch — Discover**
- **Teardown — Understand**
- **Crosslink — Coordinate**

---

# Crosslink naming convention

**Crosslink** is the canonical name for the incident and operational coordination product.

It owns concepts such as:

- call trees
- on-call resolution
- responder roles
- escalation paths
- bridge/channel coordination
- acknowledgements
- business and vendor escalation
- incident communication

The earlier **Call Tree** wording can remain as a feature name inside Crosslink, but it is no longer the product name.

---

# 79. Organization Vocabulary and Taxonomy

The product family should not require every organization to adopt the Basecoat-family vocabulary exactly as written.

Different organizations already have their own language for:

- applications,
- products,
- systems,
- services,
- platforms,
- workloads,
- repositories,
- teams,
- environments,
- risks,
- controls,
- exceptions,
- incidents,
- releases,
- AI assets,
- and lifecycle states.

The platform should allow organizations to map those local terms onto a **stable canonical model**.

The principle is:

> **Standardize the meaning, not necessarily the words.**

A company should be able to keep the terminology its developers, architects, operators, auditors, and business teams already understand while still participating in the same governance model.

---

# 80. Canonical Model vs. Local Vocabulary

The family should maintain a small canonical ontology underneath the user-facing terminology.

Example:

```text
Canonical concept       Organization A       Organization B       Organization C

Application              App                  Product              Workload
Repository               Repo                 Codebase             Project
Team                     Squad                Product Team         Service Team
Deployment               Release              Instance             Runtime
Control                  Guardrail            Standard             Requirement
Exception                Waiver               Deviation            Risk Acceptance
Incident                 Incident             Event                Sev
Batch                    Application          System               Product
Deck                     Portfolio            Domain               Business Unit
Palette                  Filter               Cohort               View
```

The organization-facing UI, APIs, agents, and documentation can use local terms.

The underlying identifiers remain canonical.

Example:

```yaml
canonical:
  type: application

local:
  term: product

id: app:claims-processing
```

This provides consistency without forcing terminology changes on the organization.

---

# 81. Taxonomy Is Part of Governance

Vocabulary is not just a UI concern.

The terms an organization chooses influence:

- ownership,
- reporting,
- access control,
- policy applicability,
- architecture decisions,
- incident routing,
- compliance evidence,
- lifecycle management,
- and automation.

If one group says **application**, another says **service**, and another says **product**, the important question is not which word is correct.

The important question is:

> **Do they mean the same governed thing?**

A taxonomy provides that shared meaning.

```text
Term
  ↓
Definition
  ↓
Canonical concept
  ↓
Relationships
  ↓
Allowed states
  ↓
Applicable controls
```

This is closer to an **ontology** than a simple glossary because the relationships matter.

---

# 82. Organizational Vocabulary Profile

Each organization could maintain a versioned **Vocabulary Profile**.

Example:

```yaml
organization: contoso

vocabulary:
  application:
    display_name: Product
    plural: Products
    aliases:
      - App
      - Workload

  batch:
    display_name: Application
    plural: Applications

  deck:
    display_name: Portfolio
    plural: Portfolios

  team:
    display_name: Squad
    plural: Squads

  control:
    display_name: Guardrail
    plural: Guardrails

  exception:
    display_name: Risk Acceptance
    plural: Risk Acceptances

  incident:
    display_name: Sev
    plural: Sevs
```

The profile should be:

- version controlled,
- centrally governed,
- machine readable,
- overridable only where explicitly allowed,
- and usable by UI, APIs, agents, generated documentation, and reports.

---

# 83. Canonical IDs Must Not Change with Vocabulary

Display terminology can change.

Canonical identity should not.

Example:

```text
Today:
  "Product"

Tomorrow:
  "Application"

Canonical ID:
  app:claims-processing
```

The object should remain the same even if the organization changes terminology.

This protects:

- historical evidence,
- API stability,
- automation,
- integrations,
- policy mappings,
- and audit history.

### Rule

> **Names are presentation. IDs are identity.**

---

# 84. Taxonomy Layers

A useful organization-specific taxonomy can be layered.

## Layer 1 — Enterprise concepts

```text
Portfolio
Product
Application
Service
Platform
Team
Owner
Environment
```

## Layer 2 — Software delivery concepts

```text
Repository
Branch
Build
Artifact
Release
Deployment
Dependency
Workflow
```

## Layer 3 — AI concepts

```text
Model
Agent
Prompt
Skill
MCP Server
Tool
Embedding Model
Vector Store
Knowledge Source
Evaluation
Guardrail
```

## Layer 4 — Governance concepts

```text
Policy
Control
Standard
Profile
Exception
Finding
Evidence
Attestation
Approval
Risk Acceptance
```

## Layer 5 — Operational concepts

```text
Incident
Severity
Responder
Escalation
Bridge
Recovery
Retirement
```

Organizations can adopt all layers or only the ones relevant to their operating model.

---

# 85. Allow Multiple Taxonomies at Once

Large enterprises rarely have one universal vocabulary.

Different domains may need different views of the same object.

Example:

```text
Engineering:
  Application

Finance:
  Cost Center Asset

Architecture:
  Business Application

Operations:
  Service

Security:
  Workload

Compliance:
  In-Scope System
```

These should not become duplicate records.

They should be **facets of the same governed entity**.

```text
                app:claims-processing
                         |
       +-----------------+-----------------+
       |                 |                 |
 Engineering          Security         Finance
 "Application"        "Workload"       "Cost Object"
```

This allows each stakeholder group to work in familiar language while preserving a shared enterprise graph.

---

# 86. Controlled Synonyms and Aliases

The platform should support explicit aliases rather than guessing terminology.

Example:

```yaml
concept: application

preferred_term: Application

aliases:
  - App
  - Product
  - Workload
  - System

disallowed_ambiguities:
  - Service
```

Aliases should be scoped where necessary.

For example:

```yaml
scope: manufacturing

application:
  preferred_term: Solution
```

while:

```yaml
scope: retail

application:
  preferred_term: Product
```

This makes language adaptable without making the underlying model ambiguous.

---

# 87. Organization-Owned Classification Taxonomies

The same approach should apply to classifications.

Basecoat should not force every organization to use:

```text
Low
Medium
High
```

An organization may already use:

```text
Public
Internal
Confidential
Highly Confidential
```

or:

```text
LBI
MBI
HBI
```

or:

```text
Tier 0
Tier 1
Tier 2
Tier 3
```

or domain-specific categories such as:

```text
Prototype
Business Critical
Mission Critical
Safety Critical
Export Controlled
```

The platform should map these to canonical properties rather than replace them.

Example:

```yaml
local_classification:
  name: Mission Critical

canonical_properties:
  availability_criticality: very_high
  recovery_priority: tier_0
  stronger_change_control: true
  continuous_validation: required
```

The label is local.

The behavior is standardized.

---

# 88. Taxonomy-Driven Governance

Local taxonomy can drive controls.

Example:

```text
Organization says:
  "Tier 0"

Taxonomy maps Tier 0 to:
  mission critical
  production
  customer facing
  RTO < 1 hour
  enhanced audit
  named on-call team

Basecoat resolves:
  stronger control profile

Crosslink resolves:
  24x7 escalation

Adhesion resolves:
  additional resilience tests

Swatch/Batch records:
  Tier 0 classification
```

This turns organizational vocabulary into an operational interface to governance.

The organization does not need to learn the platform's internal language to receive consistent controls.

---

# 89. Taxonomy Governance

The vocabulary itself needs governance.

For each term, capture:

```text
Term
Definition
Canonical concept
Owner
Status
Effective date
Aliases
Deprecated terms
Replacement term
Relationships
Allowed values
Applicable scopes
```

Example:

```yaml
term: Product
canonical: application
owner: enterprise-architecture
status: active
effective_date: 2026-01-01

aliases:
  - App

deprecated_terms:
  - Solution

relationships:
  owned_by: team
  contains: service
  deployed_as: deployment
```

This avoids uncontrolled terminology drift.

---

# 90. Vocabulary Change Without Breaking the Platform

Organizations change language over time.

The platform should support migration without rewriting history.

Example:

```text
2019–2025:
  "Application"

2026:
  "Digital Product"
```

Historical records can retain:

```text
display_name_at_time: Application
```

while current views show:

```text
preferred_term: Digital Product
```

The canonical object remains:

```text
type: application
```

This is another reason that local terminology should sit above the stable identity and schema layer.

---

# 91. Vocabulary Should Shape the User Experience

Once defined, the organization's vocabulary should flow through the entire family.

Example:

```text
Vocabulary Profile
        |
        +--> Batchbook UI
        |
        +--> Basecoat documentation
        |
        +--> Agent responses
        |
        +--> Generated reports
        |
        +--> Crosslink incident messages
        |
        +--> Adhesion findings
        |
        +--> Swatch manifests
        |
        +--> Search
```

If the organization calls applications **Products**, then an agent should say:

> "The Payments Product has three open findings."

not:

> "The Payments Batch has three open findings."

The family vocabulary remains useful internally and for product identity, but the organization should experience governance in its own language.

---

# 92. Vocabulary-Aware Agents

Agents should receive the organization's vocabulary profile as context.

Example system context:

```yaml
organization_vocabulary:
  batch: Application
  deck: Portfolio
  control: Guardrail
  exception: Risk Acceptance
  incident: Severity Event
```

Then the agent can translate naturally.

Canonical request:

```text
Find all batches in deck:payments
with expired exceptions.
```

Organization-facing response:

```text
Three Applications in the Payments Portfolio
have expired Risk Acceptances.
```

This also reduces prompt duplication because terminology becomes data rather than hard-coded instructions.

---

# 93. Taxonomy Mapping During Adoption

A useful onboarding exercise for a new organization is:

```text
Step 1
List the terms the organization already uses.

Step 2
Define each term in plain language.

Step 3
Map each term to a canonical concept.

Step 4
Identify collisions and ambiguities.

Step 5
Define relationships.

Step 6
Define classifications and states.

Step 7
Assign taxonomy owners.

Step 8
Publish the vocabulary profile.

Step 9
Use it in UI, agents, workflows, and documentation.

Step 10
Review periodically.
```

A simple adoption table:

| Local term | Local definition | Canonical concept | Notes |
|---|---|---|---|
| Product | Customer-facing software capability | Application | Preferred enterprise term |
| Squad | Team accountable for a product | Team | Maps to identity group |
| Guardrail | Mandatory engineering rule | Control | Can be preventive or detective |
| Risk Acceptance | Approved temporary deviation | Exception | Must expire |
| Sev | Operational disruption | Incident | Uses severity taxonomy |

---

# 94. Taxonomy Design Principles

Recommended principles:

1. **Use the organization's language wherever possible.**
2. **Keep canonical IDs and schemas stable underneath.**
3. **Define terms, not just labels.**
4. **Allow aliases, but avoid uncontrolled synonyms.**
5. **Model relationships, not only categories.**
6. **Version the taxonomy.**
7. **Assign owners to important terms.**
8. **Support deprecation and migration.**
9. **Let classification drive governance behavior.**
10. **Do not force one enterprise vocabulary where multiple stakeholder views are legitimate.**
11. **Agents should translate between canonical and local vocabulary.**
12. **Taxonomy changes should not invalidate historical evidence.**

A concise principle:

> **Speak locally. Govern consistently.**

---

# 95. Taxonomy as an Adoption Layer

This creates an important architectural layer between the family and the enterprise.

```text
              Organization Language

 Product | Squad | Guardrail | Risk Acceptance
                       |
                       v
               Vocabulary Profile
                       |
                       v
                Canonical Model

 Application | Team | Control | Exception
                       |
                       v
                  Binder
                       |
        +--------------+--------------+
        |              |              |
     Basecoat        Batchbook      Adhesion
        |              |              |
      Snitch        Crosslink       Sheen
```

The family therefore provides a **governance grammar**, while organizations provide their own **governance vocabulary**.

That allows the same architecture to support very different companies without requiring them to reorganize how they talk about building software.

---

# 96. Evidence Vocabulary Update

The evidence and provenance vocabulary is now:

```text
Batchbook
    Enterprise catalog of governed applications

Batch
    One governed application

Swatch
    Compact identity/profile/manifest for the Batch

Batch Record
    Historical record of what happened to the Batch over time

Proof
    Evidence and provenance capability

Stamp
    A specific assertion, attestation, approval, or validation attached to evidence

CoA
    Certificate of Analysis — a point-in-time conformance summary

Genealogy
    Lineage of source, dependencies, models, artifacts, and deployments
```

## Relationship

```text
Batch
  |
  +-- Swatch
  |
  +-- Genealogy
  |
  +-- Batch Record
  |      |
  |      +-- builds
  |      +-- deployments
  |      +-- changes
  |      +-- incidents
  |      +-- exceptions
  |
  +-- Proof
         |
         +-- evidence
         +-- provenance
         +-- Stamps
         +-- attestations
         +-- CoA
```

The product name **Proof** replaces the earlier working evidence-system name.

---

# 97. Proof — Evidence and Provenance

## Role

Proof answers:

> **What evidence exists for this claim, where did it come from, how trustworthy is it, and who or what stands behind it?**

Proof should preserve:

- source
- subject
- claim
- observation method
- confidence
- validator
- signer/attestor
- timestamp
- validity period
- artifact hash
- related control
- related Batch
- related release/deployment
- revocation/expiration state

Proof does **not** independently decide:

> "This application is compliant."

Instead, it records defensible statements such as:

```text
Control BC-IAM-001
was evaluated against
deployment prod-east
using Azure configuration evidence
at 2026-09-26T14:00
and passed validator version 3.4.
```

---

# 98. Batch Record

A **Batch Record** is the accumulated lifecycle history for one Batch.

This is analogous to manufacturing batch-production records.

```text
Batch Record
│
├── identity changes
├── ownership changes
├── Formula versions
├── Blueprint versions
├── source commits
├── builds
├── SBOM / AI-BOM
├── dependency changes
├── evaluations
├── Stamps
├── exceptions
├── approvals
├── deployments
├── incidents
├── remediation
├── retirement actions
└── Proof references
```

The Batch Record answers:

> **What happened to this governed application over its lifetime?**

It is not merely a log.

It is the traceable history required to reconstruct important governance decisions and states.

---

# 99. Genealogy

**Genealogy** captures where the components of a Batch came from and what they became.

## Software genealogy

```text
Commit
  ↓
Build
  ↓
Artifact
  ↓
Container
  ↓
Deployment
```

## Dependency genealogy

```text
Application
  ↓
Package
  ↓
Transitive Package
  ↓
Source / Publisher
```

## AI genealogy

```text
Application
  ↓
Agent
  ↓
Model
  ↓
Prompt / Skill
  ↓
MCP Server
  ↓
Tool
  ↓
Knowledge Source
```

Genealogy complements topology:

- **Topology** answers: *What is connected to what?*
- **Genealogy** answers: *Where did this come from, and what descended from it?*

Teardown is a natural producer of Genealogy data.

---

# 100. CoA — Certificate of Analysis

A **CoA** is a point-in-time summary of conformance evidence for a Batch, release, artifact, or deployment.

It is analogous to the Certificate of Analysis used in chemical and regulated manufacturing.

Example:

```yaml
coa:
  subject: deployment:claims-prod-2026-09-26
  batch: app:claims-processing

  profile:
    - enterprise-default
    - hipaa
    - ai-high-risk

  results:
    basecoat: pass
    adhesion: pass
    sheen: pass
    security: pass

  evidence:
    sbom: present
    provenance: verified
    exceptions:
      active: 1
      expired: 0

  stamps:
    - build-verified
    - security-attested
    - release-approved
```

A CoA should be **generated from Proof**, not manually authored as an unsupported declaration.

It is a summary artifact, not the source of truth.

---

# 101. Stamps

A **Stamp** is a compact, machine-readable assertion attached to evidence.

Examples:

```text
Observed
Identified
Inferred
Verified
Attested
Approved
Independently Assured
```

However, these terms should **not** be treated as one simple ladder.

They describe different properties.

For example:

> An inference can be highly confident but still not be independently attested.

> A human can attest to a claim that was originally self-declared.

The model therefore needs at least two dimensions:

1. **Evidence Basis** — how the claim was established.
2. **Assurance** — who or what stands behind it.

---

# 102. Evidence Basis

The **Evidence Basis** describes how Proof knows something.

| Basis | Meaning | Example |
|---|---|---|
| **Declared** | A person/system stated it | Owner says the app handles PII |
| **Observed** | A source was directly inspected | GitHub API reports branch protection |
| **Identified** | Observation was resolved to a canonical entity | Repo matched to Batch `claims-processing` |
| **Inferred** | Derived probabilistically or heuristically | Teardown infers an external model dependency from code |
| **Calculated** | Derived deterministically from trusted inputs | Dependency risk calculated from SBOM + advisory |
| **Verified** | Checked against an authoritative or deterministic source | Azure policy confirms public access is disabled |

These states describe **epistemology**:

> *How did we arrive at this claim?*

They should be preserved with the evidence so downstream controls can decide how much trust is appropriate.

---

# 103. Assurance Level

The **Assurance Level** describes who or what stands behind the claim.

A candidate model:

```text
A0 — Unattested
     Evidence exists, but no trusted actor vouches for it.

A1 — System Stamped
     An approved automated validator produced/signed the assertion.

A2 — Owner Attested
     An accountable owner explicitly attested to the claim.

A3 — Independent Validation
     A separate validator confirmed the assertion.

A4 — Independent Assurance
     A designated assurance/audit function reviewed the evidence.

A5 — External Certification
     An authorized external organization issued a recognized certification
     or assessment result.
```

This should be configurable by organizations.

The important idea is separation:

```text
Evidence Basis:
  Verified

Assurance:
  A1 System Stamped
```

is different from:

```text
Evidence Basis:
  Declared

Assurance:
  A2 Owner Attested
```

Both may be valid evidence, but they carry different weight.

---

# 104. Confidence Is a Third Dimension

For inferred or probabilistic evidence, Proof should also preserve **confidence**.

Example:

```yaml
claim:
  external_model_endpoint: true

basis: inferred
confidence: 0.91

producer:
  product: teardown
  version: 2.4

assurance:
  level: A1
  type: system-stamped
```

This produces three separate questions:

```text
1. BASIS
   How was the claim established?

2. CONFIDENCE
   How certain is the producer?

3. ASSURANCE
   Who/what stands behind the claim?
```

Do not collapse these into one "trust score."

That would hide useful distinctions and make policy decisions harder to explain.

---

# 105. Stamp Policy

Controls can specify the minimum evidence basis and assurance they require.

Example:

```yaml
control: BC-DATA-021

requirement:
  production CUI workloads must use approved model endpoints

evidence_requirement:
  acceptable_basis:
    - verified

  minimum_assurance:
    level: A1

  inferred_evidence:
    allowed_for_finding: true
    allowed_for_blocking: false
```

This allows proportional enforcement.

```text
Snitch infers a violation
        ↓
Create finding

Teardown confirms it
        ↓
Increase confidence

Authoritative API verifies it
        ↓
Eligible for blocking enforcement

Independent assurance reviews it
        ↓
Eligible for audit evidence
```

This is a stronger model than treating every scanner or LLM statement as equally authoritative.

---

# 106. Do We Need a Notary?

Possibly — but as a **technical role**, not as a claim of legal notarization.

A useful internal concept would be a **Notary Service** that:

- validates the identity of the evidence producer,
- verifies signatures,
- validates hashes,
- confirms timestamps,
- checks certificate trust,
- confirms artifact provenance,
- records revocation,
- and issues a trusted Stamp.

```text
Evidence Producer
      |
      v
    Proof
      |
      v
   Notary
      |
  verify identity
  verify signature
  verify artifact hash
  verify provenance
  verify timestamp
      |
      v
    Stamp
```

The Notary would answer:

> **Can I prove who produced this assertion and that it has not been altered?**

It would **not** answer:

> **Is the underlying business claim true?**

That remains the validator's responsibility.

---

# 107. Notary vs. Validator vs. Auditor

These roles should remain distinct.

```text
Validator
  "I tested the claim."

Notary
  "I verified who produced this record,
   its signature, timestamp, and integrity."

Auditor / Assurance
  "I independently assessed whether the
   evidence and controls are sufficient."
```

Example:

```text
Adhesion
   validates:
   "The application passed this security test."

Proof
   stores:
   test output + evidence

Notary
   verifies:
   Adhesion identity + signature + artifact hash

Stamp
   records:
   Verified / A1 System Stamped

Independent assurance
   may later issue:
   A4 Independent Assurance
```

This separation reduces the risk of one component testing, signing, and auditing its own assertion.

---

# 108. Alternative Name: Witness

If **Notary** creates too much legal-semantic baggage, an alternative is:

> **Witness**

A Witness verifies that an event, artifact, or assertion existed in a particular state at a particular time.

Conceptually:

```text
Validator proves behavior.
Witness proves provenance.
Auditor proves assurance.
```

Other candidate names:

- Witness
- Attestor
- Registrar
- Seal
- Certifier

For now, **Notary** can remain a conceptual role inside Proof rather than a standalone product.

---

# 109. Recommended Proof Model

A Proof record should ultimately look something like:

```yaml
proof:
  id: proof:8f821...

  subject:
    id: deployment:claims-prod
    batch: app:claims-processing

  claim:
    control: BC-IAM-001
    assertion: pass

  basis:
    type: verified
    source: azure-api

  confidence:
    value: 1.0

  producer:
    id: adhesion:prod
    version: 3.4

  assurance:
    level: A1
    type: system-stamped

  stamp:
    signer: notary:enterprise
    signature: sha256:...
    issued_at: 2026-09-26T14:00:00-04:00
    expires_at: 2026-10-26T14:00:00-04:00

  provenance:
    artifact_hash: sha256:...
    source_commit: abc123
    workflow_run: 94827

  status:
    revoked: false
```

The important parts are independently inspectable:

```text
Claim
Basis
Confidence
Producer
Assurance
Stamp
Provenance
Validity
```

---

# 110. Updated Family Vocabulary

The current working vocabulary is:

```text
Binder      Connect the family
Basecoat    Govern engineering
Sheen       Govern experience
Adhesion    Verify behavior and quality

Batchbook   Catalog governed applications
Batch       One governed application
Swatch      Identify/profile the Batch

Snitch      Discover observations
Teardown    Understand composition and Genealogy
Crosslink   Coordinate people and incidents

Proof       Preserve evidence and provenance
Stamp       Assertion / attestation marker
CoA         Point-in-time conformance summary
Notary      Verify identity, signatures, integrity, and provenance
Genealogy   Trace component lineage

Blueprint   Intended architecture
Formula     Approved composition
Reclaim     Lifecycle / retirement
```

A compact lifecycle:

```text
Batchbook
   ↓
Batch
   ↓
Swatch
   ↓
Basecoat
   ↓
Build
   ↓
Teardown / Genealogy
   ↓
Adhesion
   ↓
Proof
   ↓
Stamp
   ↓
CoA
   ↓
Deploy
   ↓
Crosslink / Operate
   ↓
Reclaim
```


---

# Research Update — BaseCoat Consistency Review

This update preserves the earlier research as historical context while clarifying the current relationship to the public BaseCoat implementation.

## Current alignment

- **BaseCoat** is the shared operating layer for governed GitHub Copilot work.
- Its native primitives remain **Agent, Skill, Instruction, Prompt**.
- Its product operating model remains **Guardrails Plane + Visibility Plane**.
- The broader family additionally uses **Control Plane + Execution Plane** as an architectural distinction.
- **Binder** is a proposed extraction/generalization of genuinely shared cross-product contracts with roots in BaseCoat; it is not assumed to already exist independently.
- **Batchbook** owns the enterprise application catalog and canonical governed-application graph.
- **Proof** owns the cross-product evidence/provenance model while BaseCoat continues to produce and consume GitHub-native evidence.
- BaseCoat may orchestrate workflows across testing, UX, inventory, incident, and compliance domains without becoming the durable system of record for those sibling domains.
- BaseCoat's Shearing Layers vocabulary should preserve **Site, Structure, Skin, Services, Space Plan, Stuff**. The broader family pace-layer model is an interpretation of the same principle.
- The coatings/manufacturing metaphor is a family/product-architecture vocabulary. BaseCoat should continue to use GitHub/SDLC-native language where that is clearer to users.

> **Speak locally. Govern consistently.**

This update does not delete older research sections because the archive is intended to preserve the evolution of the design.


---

# Research Update — Sheen Consistency Review

This update aligns the broader family research with the current public Sheen implementation.

## Current alignment

- **Sheen** is a design governance overlay for GitHub Copilot.
- It is the **finish-coat sibling to BaseCoat**.
- BaseCoat governs the engineering surface; Sheen governs the design surface.
- Sheen's six design pillars are **Tokens & System, Brand, Usability, Accessibility, Information Architecture, and Governance**.
- Sheen's durable assets include **design tokens, skills, agents, instructions, prompts, templates, validation rules, and design vocabulary**.
- Sheen is not a component library, visual design tool, Figma replacement, documentation host, or engineering framework.
- The token system is first class and follows a core → semantic → theme structure.
- Sheen has an explicit consumer lifecycle: **Integrate → Onboard → Inventory → Audit → Use → Upgrade**.
- Sheen defines experience expectations; Adhesion can independently evaluate implementation.
- Proof can preserve Sheen evidence without taking ownership of design semantics.
- Batchbook can reference Sheen profiles and token sets without absorbing Sheen's internal design-governance model.

This update is appended rather than rewriting earlier research so the archive continues to preserve the evolution of the design.
