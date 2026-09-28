# Sheen Consistency and Integration

This document records how the broader AI SDLC Governance family aligns with the current public Sheen implementation.

## Canonical role

> **Sheen is a design governance overlay for GitHub Copilot.**

It wraps design requests in context, standards, tokens, accessibility, brand guidance, and design decision structure so teams can produce more consistent and reviewable experiences.

Sheen is the **finish-coat sibling to BaseCoat**.

```text
BaseCoat
  governs the engineering surface

Sheen
  governs the design surface
```

## Design pillars

Sheen currently organizes design governance around six pillars:

```text
Tokens & System
Brand
Usability
Accessibility
Information Architecture
Governance
```

These pillars should be preserved when the broader family describes Sheen.

## Product primitives

Sheen's primary assets are:

```text
design tokens
skills
agents
instructions
prompts
templates
validation rules
design vocabulary
```

A useful family-level primitive is:

> **Design token / experience rule / design decision**

## Token system

Sheen's token architecture is a significant part of the product contract.

```text
core primitives
      ↓
semantic roles
      ↓
themes
```

The implementation supports:

```text
core/
semantic/
themes/
```

This lets consumer teams preserve their own brand and design language while retaining a normalized token model.

## Accessibility

Accessibility is not an optional add-on in Sheen.

The product treats accessibility constraints as governed design requirements and incorporates them into validation and evaluation.

This is important to the wider family because it demonstrates a pattern that should be reused elsewhere:

> **Make critical quality properties part of the normal path rather than a separate review at the end.**

## Consumer lifecycle

The implemented lifecycle is:

```text
Integrate
Onboard
Inventory
Audit
Use
Upgrade
```

This should influence how other family products think about adoption.

A product is not fully designed if it only defines the source assets.

It should also define:

- how a consumer adopts them,
- how current state is inventoried,
- how conformance is audited,
- how assets are synchronized,
- how versions change,
- and how rollback works.

## Relationship to BaseCoat

BaseCoat and Sheen are designed to coexist.

Their namespaces remain distinct, and Sheen can consume a pinned read-only copy of BaseCoat assets/tooling where required.

The architectural lesson for the wider family is:

> **Sibling products can depend on shared contracts without merging their domain ownership.**

## Relationship to Adhesion

```text
Sheen
  defines design expectations

Adhesion
  independently evaluates implementation
```

Examples:

```text
Sheen:
  WCAG expectation
  token-role contract
  interaction rule
  information-architecture expectation

Adhesion:
  contrast test
  automated accessibility test
  rendered-UI conformance
  regression evaluation
```

## Relationship to Proof

Sheen-generated evidence can flow into Proof:

```text
token validation
design audit
accessibility check
decision record
theme validation
inventory result
```

Proof can preserve provenance and assurance.

Sheen remains the authoritative owner of design-domain semantics.

## Relationship to Batchbook

A Batch can reference a Sheen profile:

```yaml
batch:
  id: app:claims-portal

experience:
  sheen:
    profile: enterprise-web
    token_set: claims-brand-v4
    theme_set:
      - light
      - dark
      - high-contrast
```

This allows Batchbook to know **which design-governance contract applies** without absorbing Sheen's detailed token model.

## Vocabulary boundary

Sheen should use its own domain-native language:

```text
tokens
themes
brand
usability
accessibility
information architecture
design governance
inventory
audit
design decision
```

The broader family may translate these into canonical controls, evidence, and Batch relationships.

> **Standardize meaning without forcing terminology.**

## Family consistency checklist

When updating the wider AI-SDLC architecture:

- Describe Sheen as a design-governance overlay, not a UI generator.
- Preserve the six design pillars.
- Preserve design tokens as a first-class Sheen capability.
- Keep BaseCoat and Sheen as siblings with separate namespaces and ownership.
- Keep Sheen definition separate from Adhesion verification.
- Let Proof consume Sheen evidence without becoming the design source of truth.
- Let Batchbook reference Sheen profiles without absorbing the token system.
- Treat the consumer lifecycle as part of product architecture.
- Keep Sheen mostly artifact-first unless durable runtime state becomes necessary.
