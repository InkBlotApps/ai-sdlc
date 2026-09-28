# Organization Adoption, Vocabulary, and Taxonomy

How organizations can adopt the governance model using their own language, taxonomy, classifications, and operating model without changing canonical meaning.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

---

# 79. Organization Vocabulary and Taxonomy

The product family should not require every organization to adopt the BaseCoat-family vocabulary exactly as written.

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

BaseCoat should not force every organization to use:

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

BaseCoat resolves:
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
        +--> BaseCoat documentation
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
     BaseCoat        Batchbook      Adhesion
        |              |              |
      Snitch        Crosslink       Sheen
```

The family therefore provides a **governance grammar**, while organizations provide their own **governance vocabulary**.

That allows the same architecture to support very different companies without requiring them to reorganize how they talk about building software.

---

# Family Vocabulary vs. Product-Native Vocabulary

The organization-vocabulary principle also applies **inside the product family**.

The family can use a shared architectural metaphor without forcing every product to expose that metaphor in its daily user experience.

For example:

```text
Family concept / product identity   BaseCoat-facing language
---------------------------------   ------------------------
Proof                               workflow evidence / job output
Stamp                               attestation / approval / status
Batch                               application / repository context
Genealogy                           dependency / provenance chain
```

BaseCoat should continue to use GitHub and SDLC-native terminology where that is clearer to developers.

Other organizations can map those same canonical concepts into their own vocabulary.

This produces three layers:

```text
Canonical meaning
       ↓
Product-native vocabulary
       ↓
Organization-local vocabulary
```

Example:

```text
Canonical:
  control

BaseCoat:
  instruction / guardrail

Organization:
  engineering standard
```

The important rule remains:

> **Standardize the meaning, not necessarily the words.**


---

# Sheen as a Vocabulary Example

Sheen is a useful example of why product-native vocabulary and canonical family vocabulary should remain separate.

At the family level:

```text
canonical concept:
  experience control
```

Inside Sheen:

```text
token rule
brand constraint
accessibility requirement
design decision
information-architecture rule
```

Inside an adopting organization:

```text
design standard
brand guideline
UX guardrail
accessibility policy
```

All three can refer to the same governed intent without forcing everyone to use identical language.

Sheen also maintains a machine-readable design vocabulary, reinforcing the broader family principle that vocabulary itself can be versioned, governed, and consumed by agents and tooling.
