# Evidence and Assurance

The Proof model: evidence basis, confidence, assurance levels, Stamps, CoA, Batch Records, Genealogy, Notary/Witness, and evidence policy.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

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
