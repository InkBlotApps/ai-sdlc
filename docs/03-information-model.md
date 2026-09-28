# Information Model

The canonical information architecture for Batchbook, Batch, Swatch, identity, topology, Genealogy, and enterprise application relationships.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

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
