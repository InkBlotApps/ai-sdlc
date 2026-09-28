# Product Family

The current and candidate product family, responsibilities, naming, and family architecture.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

---

# 2. Current and Candidate Product Family

| Product | Working role | Primary verb | Core primitive | Status |
|---|---|---:|---|---|
| **Binder** | Shared family substrate / contracts | Connect | Manifest / schema / identity | Candidate |
| **BaseCoat** | Shared operating layer for governed GitHub Copilot work | Govern | Agent / skill / instruction / prompt | Existing |
| **Adhesion** | Testing, validation, evals | Verify | Test / assertion / evaluation | Existing |
| **Sheen** | Design governance overlay for GitHub Copilot | Experience | Token / design rule / skill / agent | Existing |
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
    BaseCoat             Sheen             Adhesion
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
- **BaseCoat**, **Sheen**, and **Adhesion** apply specialized governance.
- **Crosslink** resolves humans, escalation paths, and incident coordination.
- **Proof** stores evidence and provenance.

---

# 5. Shared Family Substrate — Binder

## Purpose

Binder should own mechanics that every sibling needs, so BaseCoat does not become the de facto parent implementation.

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

# 6. BaseCoat — Engineering Governance

## Role

BaseCoat governs **how engineering work is performed**.

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

BaseCoat should **not** become the canonical database for:

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
BaseCoat asks:
"What controls apply to app:claims-portal?"

Swatch provides:
classification + ownership + profiles

BaseCoat returns:
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

Sheen is a good model for sibling products because it has a domain-specific primitive rather than merely being a set of BaseCoat instructions.

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

- BaseCoat
- Adhesion
- Sheen
- Snitch
- Teardown

---

# 21. Potential Product Boundaries

## Build as first-class products

Likely strong candidates:

1. BaseCoat
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
- BaseCoat control domains,
- Teardown outputs,
- Binder primitives,
- or integrations with existing products.

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
├── BaseCoat
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
        +-- BaseCoat:
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
    BaseCoat             Sheen             Adhesion
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
- **BaseCoat — Govern**
- **Sheen — Experience**
- **Adhesion — Verify**
- **Batchbook — Catalog**
- **Batch — Represent**
- **Swatch — Identify**
- **Snitch — Discover**
- **Teardown — Understand**
- **Crosslink — Coordinate**

---

# 110. Updated Family Vocabulary

The current working vocabulary is:

```text
Binder      Connect the family
BaseCoat    Govern engineering
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
BaseCoat
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

# BaseCoat Alignment

## Canonical product description

Within this family, **BaseCoat** should be described consistently with the public BaseCoat repository:

> **BaseCoat is the shared operating layer for governed GitHub Copilot work.**

BaseCoat provides composable **agents, skills, instructions, and prompts** that route AI-assisted software work through intent, evidence, validation, approval boundaries, and repository-native workflows.

This is narrower and more useful than describing BaseCoat as the entire enterprise governance control plane.

The family-level architecture is broader:

```text
AI SDLC Governance Family
│
├── BaseCoat
│   └── governed AI-assisted engineering
├── Sheen
│   └── experience governance
├── Adhesion
│   └── validation and evaluation
├── Batchbook
│   └── canonical application catalog
├── Snitch / Teardown
│   └── discovery, topology, Genealogy
├── Crosslink
│   └── operational coordination
└── Proof
    └── evidence and provenance
```

BaseCoat may contain workflows or agents that operate across these domains, but the durable domain model and system of record should remain with the sibling that owns that domain.

Example:

```text
BaseCoat incident-response agent
        ↓
uses / invokes
Crosslink capabilities

BaseCoat application-inventory agent
        ↓
produces observations for
Snitch / Teardown / Batchbook

BaseCoat UX workflow
        ↓
uses
Sheen contracts

BaseCoat testing workflow
        ↓
invokes
Adhesion evaluations
```

## Four BaseCoat primitives

The current BaseCoat model is intentionally built around four native primitives:

| Primitive | Role |
|---|---|
| **Agent** | Who / how the work is performed |
| **Skill** | Reusable knowledge and procedures |
| **Instruction** | Ambient rules and standards |
| **Prompt** | Structured invocation |

The `/basecoat` router sits above these primitives as the common entry point.

These primitives are part of BaseCoat's product contract and should not be replaced by family-level terminology.

## Guardrails and Visibility

BaseCoat uses two complementary planes:

```text
Guardrails Plane
agents · skills · instructions · prompts
              +
Visibility Plane
issues · pull requests · workflows · milestones / projects
```

The intent is:

> Guardrails without visibility create blind execution.  
> Visibility without guardrails creates inconsistent execution.

This model is specific to BaseCoat and complements the broader family distinction between **control plane** and **execution plane**.

```text
Family architecture:
Control plane ↔ Execution plane

BaseCoat operating model:
Guardrails plane ↔ Visibility plane
```

## Binder: current state vs. target state

**Binder is a target family architecture, not yet the canonical shared implementation.**

Today, BaseCoat already contains shared cross-product mechanics such as versioned ownership/lock semantics used by BaseCoat, Sheen, and Adhesion.

The Binder idea should therefore be described as:

> **A proposed extraction and generalization of cross-product contracts that currently have roots in BaseCoat.**

This gives Binder a practical migration path rather than treating it as a greenfield invention.

```text
Today
BaseCoat-hosted shared contracts
        ↓
Generalize
        ↓
Binder
shared family contracts independent of any sibling product
```

## Product-language boundary

The broader family can continue to use coatings and manufacturing names such as **Batch**, **Swatch**, **Proof**, **Stamp**, and **CoA**.

BaseCoat itself should continue to speak primarily in the native language of GitHub and software delivery:

```text
repository
pull request
issue
workflow run
job log
agent
skill
instruction
prompt
release
version drift
```

The family metaphor is product architecture.

The product should still speak the language its users use.

> **Speak locally. Govern consistently.**


---

# Sheen Alignment

## Canonical product description

Within the family, **Sheen** should be described as:

> **A design governance overlay for GitHub Copilot that grounds design work in context, taste, standards, tokens, accessibility, brand, and structured design decisions.**

Sheen is the **finish-coat sibling to BaseCoat**:

```text
BaseCoat
  governs the engineering surface

Sheen
  governs the design / experience surface
```

The products are designed to coexist. Their namespaces remain distinct so consumer repositories can adopt both without collisions.

## What Sheen actually owns

Sheen owns the design-governance domain rather than generic "UI generation."

Its current design surface includes six pillars:

```text
1. Tokens & System
2. Brand
3. Usability
4. Accessibility
5. Information Architecture
6. Governance
```

Its reusable assets include:

```text
design tokens
skills
agents
instructions
prompts
templates
validation rules
design vocabulary
sync / rollback tooling
```

Sheen treats design decisions as engineering artifacts:

- structured,
- reviewable,
- traceable,
- testable,
- and distributable through repository-native workflows.

## Sheen is not

Sheen should not be described as:

- a component library,
- a Figma replacement,
- an image-generation tool,
- a documentation host,
- a prescriptive design system,
- or the engineering-governance layer.

It produces **design specifications, token schemas, governance artifacts, evaluations, and decision records** that downstream tools and teams can consume.

## Token model

Sheen has a durable token-system role in the family.

The token pipeline supports:

```text
core primitives
      ↓
semantic aliases
      ↓
themes
      ↓
consumer output
```

The current repository uses DTCG/W3C-style design tokens and explicitly separates:

```text
core/
semantic/
themes/
```

This gives Sheen a stronger domain primitive than the earlier generic phrase "UX contract."

A better family primitive is:

> **Design token / experience rule / design decision**

## Consumer lifecycle

Sheen has an explicit consumer lifecycle:

```text
Integrate
   ↓
Onboard
   ↓
Inventory
   ↓
Audit
   ↓
Use
   ↓
Upgrade
```

This is important because Sheen is not merely a source repository. It defines how consumers adopt, validate, synchronize, and evolve the design-governance assets.

## Relationship to BaseCoat

BaseCoat and Sheen should remain siblings with explicit ownership:

```text
BaseCoat
  engineering-SDLC governance

Sheen
  design / UX / brand / accessibility governance
```

BaseCoat may route or invoke design-related work.

Sheen owns the durable design-governance contracts.

## Relationship to Adhesion

Sheen defines design rules and expectations.

Adhesion can independently evaluate them.

Example:

```text
Sheen
  defines:
  semantic token roles
  WCAG requirements
  interaction expectations
  design decisions

        ↓

Adhesion
  evaluates:
  contrast
  accessibility behavior
  UI conformance
  regression
  implementation evidence
```

This preserves the family separation between:

> **define** and **verify**

## Relationship to Proof

Sheen produces useful evidence:

```text
token validation
accessibility checks
design decisions
audit findings
inventory results
theme conformance
```

Proof can preserve and normalize those results across the wider family.

Sheen remains the authoritative owner of the design-domain meaning.

## Product-native vocabulary

Like BaseCoat, Sheen should retain its own native language rather than exposing every family metaphor directly.

Sheen-facing terminology should favor:

```text
token
theme
brand
accessibility
usability
information architecture
design decision
audit
inventory
design context
```

The family can still connect those concepts to Batch, Proof, Stamp, and other canonical entities behind the scenes.

> **Speak locally. Govern consistently.**
