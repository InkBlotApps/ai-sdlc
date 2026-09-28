# BaseCoat Consistency and Integration

This document records how the broader AI SDLC Governance family aligns with the current public BaseCoat implementation.

## Canonical BaseCoat role

> **BaseCoat is the shared operating layer for governed GitHub Copilot work.**

It provides composable agents, skills, instructions, and prompts that help route AI-assisted engineering work through intent, evidence, validation, approval boundaries, and GitHub-native visibility.

BaseCoat is one product in the broader governance family. It is not the entire family control plane.

## Native BaseCoat primitives

```text
Agent
Skill
Instruction
Prompt
```

The `/basecoat` router provides the common entry point above those primitives.

## Native BaseCoat operating model

```text
Guardrails Plane
agents · skills · instructions · prompts

            +

Visibility Plane
issues · pull requests · workflows · milestones / projects
```

The wider family also uses a separate architectural distinction:

```text
Control Plane ↔ Execution Plane
```

The two models are complementary.

## Scope boundary

BaseCoat can provide workflows that touch testing, UX, inventory, incidents, compliance, or other SDLC domains.

The sibling products should still own the durable domain model:

| Domain | Durable owner |
|---|---|
| AI-assisted engineering governance | BaseCoat |
| Experience / UI governance | Sheen |
| Tests / evaluations | Adhesion |
| Application catalog | Batchbook |
| Discovery observations | Snitch |
| Topology / Genealogy | Teardown |
| Incident coordination | Crosslink |
| Evidence / provenance | Proof |

Example:

```text
BaseCoat workflow
      ↓
invokes specialized capability
      ↓
sibling product owns durable domain state
```

## Binder migration model

Binder is a proposed target architecture.

It should emerge by extracting genuinely shared contracts that currently have roots in BaseCoat rather than by moving BaseCoat-specific behavior into a generic platform.

```text
BaseCoat shared contract
        ↓
multiple durable consumers
        ↓
stabilize interface
        ↓
Binder candidate
```

Do not extract a contract simply because it *could* be shared.

Extract it when multiple sibling products actually require independent ownership and compatibility.

## Shearing Layers

Preserve the BaseCoat vocabulary:

```text
Site
Structure
Skin
Services
Space Plan
Stuff
```

Use the family interpretation as an explanatory overlay:

```text
Anchor
Standardize
Productize
Operationalize
Learn
Experiment
```

The central design rule is:

> **Put decisions at the fastest layer that can own them.**

Fast layers should be allowed to learn without forcing slow layers to redeploy. Slow layers should provide stable contracts rather than depending on temporary implementation details.

## Evidence

BaseCoat already produces and depends on GitHub-native evidence.

Examples include:

- issues,
- pull requests,
- workflow runs,
- job logs,
- approvals,
- validation results,
- version information,
- and integrity checks.

Proof should reference and normalize this evidence rather than replacing it.

```text
BaseCoat native evidence
        ↓
Proof
        ↓
Stamp / assurance
        ↓
Batch Record
        ↓
CoA when needed
```

## Vocabulary

The product-family metaphor and product UX vocabulary do not have to be identical.

BaseCoat should normally speak:

```text
repo
PR
issue
workflow
agent
skill
instruction
prompt
release
version drift
```

The wider architecture may speak:

```text
Batch
Swatch
Proof
Stamp
CoA
Genealogy
```

Organizations may then translate those canonical concepts again through their own Vocabulary Profile.

> **Speak locally. Govern consistently.**

## Consistency checklist

When updating this research, check that:

- BaseCoat is not described as the entire enterprise governance system.
- Agent / Skill / Instruction / Prompt remain BaseCoat's native primitives.
- Guardrails + Visibility remains the BaseCoat operating model.
- Binder is described as a target extraction/generalization, not an already-independent implementation.
- Batchbook owns the enterprise application catalog.
- Proof owns cross-product evidence/provenance.
- BaseCoat can orchestrate siblings without owning their durable domain state.
- Product-native vocabulary is allowed to differ from family-level metaphor.
- Shearing Layers preserves the BaseCoat conceptual origin and vocabulary.
