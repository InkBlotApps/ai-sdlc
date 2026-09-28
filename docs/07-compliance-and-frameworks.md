# Compliance and Framework Mapping

A framework for separating laws, regulations, assurance programs, standards, and practice models while mapping them to internal controls and profiles.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

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
