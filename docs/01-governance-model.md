# Governance Model

The core governance philosophy, operating loop, enforcement gradient, control model, exceptions, authority, and proportionality.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

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
