# AI SDLC Governance Platform — Build Plan

> Based on the [InkBlotApps ai-sdlc research](https://github.com/InkBlotApps/ai-sdlc) and published site at `inkblotapps.github.io/ai-sdlc/family.html`.

---

## 1. What This Platform Is

**AI SDLC Governance** is an enterprise-scale governance framework for AI-assisted software development. It is a **product family** — not a single monolith — with shared contracts, proportional (not binary) enforcement, and a graph-based system of record.

### Core Ideas

| Principle | Meaning |
|---|---|
| Governance is proportional | Enforcement scales with risk, not all-or-nothing |
| Speak locally, govern consistently | Orgs use their own vocabulary; canonical meaning is shared |
| Deterministic stays deterministic | CI/CD checks, schema validation, and policy don't become "prompts" |
| Agents have bounded authority | Automation executes governance; it doesn't create it |
| Evidence ≠ compliance | Store evidence and mappings; never auto-declare compliance |
| The graph is the center | Relationships between assets matter more than flat inventory |

### Product Family (Paint/Coatings Metaphor)

| Product | Role | Status |
|---|---|---|
| **Binder** | Shared family substrate / contracts (schemas, stable IDs, identity) | Candidate |
| **BaseCoat** | Shared operating layer for governed GitHub Copilot work | Existing |
| **Sheen** | Design governance overlay (tokens, design rules, accessibility) | Existing |
| **Adhesion** | Testing, validation, evaluations | Existing |
| **Batchbook** | Enterprise catalog of governed applications (graph-backed) | Preferred |
| **Snitch** | Discovery and intelligence (observations, not truth) | Existing idea |
| **Teardown** | Repo/app reverse engineering (SBOM, component lineage) | Existing idea |
| **Crosslink** | Incident coordination / call tree | Candidate |
| **Proof** | Evidence, provenance, attestations | Candidate |
| **Grain** | Data-schema governance (naming conventions, style guides) | Preferred |
| **Primer** | Fleet rollout / desired-state reconciliation | Preferred |
| **Stencil** | Policy targeting / scoping | Candidate |
| **Formula** | Approved composition / supply-chain recipes | Candidate |
| **Blueprint** | Intended architecture contracts | Candidate |
| **Seal** | Security posture / hardening | Candidate |
| **Reclaim** | Retirement / deprecation lifecycle | Candidate |

### Information Model

```
Batchbook (enterprise catalog)
    │
    ├── Batch (one governed application)
    │       ├── Swatch (compact profile/manifest)
    │       ├── Graph (relationships & topology)
    │       ├── Formula (approved composition)
    │       ├── Controls (governance controls)
    │       ├── Tests (validation results)
    │       ├── Evidence (proof artifacts)
    │       └── Crosslink (incident coordination)
    │
    ├── Deck (durable grouping: business unit, platform, compliance boundary)
    └── Palette (curated/dynamic subset for a purpose)
```

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Presentation Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │
│  │ Static   │  │ Admin    │  │ Agent    │  │ MCP Surface        │  │
│  │ Site     │  │ Dashboard│  │ UI       │  │ (tools & resources)│  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                        API Layer                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  REST/GraphQL API · Bounded Graph Queries · Resource-level   │  │
│  │  Authorization · Identity (humans, workloads, agents)       │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                     Product Layer (Family)                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │
│  │BaseCoat│ │ Sheen  │ │Adhesion│ │Batch-  │ │ Proof  │  ...      │
│  │        │ │        │ │        │ │book    │ │        │           │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘          │
├─────────────────────────────────────────────────────────────────────┤
│                     Shared Infrastructure                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Binder   │  │ Graph DB │  │ Identity │  │ CI/CD Runtime    │   │
│  │(contracts│  │(Neo4j/   │  │(OIDC/    │  │(GitHub Actions,  │   │
│  │ schemas) │  │ DBpedia) │  │ workload)│  │  serverless)     │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                     Data & Integration Layer                        │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│  │GitHub  │ │ GitLab │ │ Azure  │ │ AWS    │ │ Jira / │  ...     │
│  │ API    │ │ API    │ │ DevOps │ │ APIs   │ │ SNOW   │          │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Build Phases

### Phase 0 — Foundation & Documentation Site (Weeks 1–2)

**Goal:** Clone and adapt the existing static site as the documentation front-end.

| Task | Details |
|---|---|
| Clone repo | `git clone` the InkBlotApps/ai-sdlc repo as reference |
| Set up static site | HTML/CSS/JS site matching the existing design (sidebar nav, search, theme toggle, responsive) |
| Build system | Add a build pipeline (Vite or plain static generator) to produce HTML from Markdown sources |
| Deploy to staging | GitHub Pages or Vercel for the documentation layer |

**Tech:** Static HTML/CSS/JS (matching existing `styles.css` and `app.js` patterns), Markdown source files under `docs/`.

**Deliverables:**
- [ ] Working static site mirroring the published design
- [ ] All 14 pages (index, governance, family, information-model, deployment, adoption, proof, compliance, basecoat, sheen, history, roadmap, research)
- [ ] Search functionality with client-side index
- [ ] Dark/light theme toggle with localStorage persistence
- [ ] Responsive layout (desktop sidebar, mobile inline nav)

---

### Phase 1 — Core Platform: Binder + Batchbook (Weeks 3–8)

**Goal:** Implement the shared substrate and enterprise catalog.

#### 1A. Binder — Shared Family Contracts

| Task | Details |
|---|---|
| Schema registry | JSON Schema definitions for product manifests, entity IDs, relationship types |
| Stable ID system | Deterministic ID generation: `app:<name>`, `repo:<org>/<name>`, `model:<provider>/<name>`, `agent:<name>` |
| Identity model | OIDC integration for humans, workloads, and agents with tenant/subject/delegation context |
| API contracts | OpenAPI spec defining the platform API with bounded graph queries |

**Tech:** TypeScript/Node.js backend, JSON Schema, OpenAPI 3.1, PostgreSQL for schema registry.

#### 1B. Batchbook — Enterprise Application Catalog

| Task | Details |
|---|---|
| Graph database | Neo4j (preferred) or PostgreSQL with `ltree`/recursive CTEs for relationship traversal |
| Entity model | Organization → Portfolio → Product → Application → System → Component → Repository → Build → Artifact → Deployment |
| Swatch records | Compact profile/manifest for each Batch with source and freshness metadata |
| Deck & Palette | Durable groupings and dynamic curated subsets |
| Graph queries | Bounded read-only queries with node/edge/counts/traversal authorization |
| GitHub integration | Auto-discover repos, extract metadata, create initial Swatches |

**Tech:** Neo4j, TypeScript/Node.js, GraphQL for graph queries, GitHub API v4.

**Deliverables:**
- [ ] Binder schema registry with stable ID generation
- [ ] Batchbook graph with entity model and Swatch records
- [ ] Deck and Palette creation APIs
- [ ] GitHub integration for auto-discovery
- [ ] Bounded graph query API with authorization
- [ ] Admin dashboard for catalog management

---

### Phase 2 — Governance Engine: BaseCoat + Adhesion (Weeks 9–14)

**Goal:** Implement the core governance and validation capabilities.

#### 2A. BaseCoat — Engineering Governance

| Task | Details |
|---|---|
| Agent/Skill/Instruction/Prompt model | CRUD for governance primitives with versioning |
| Guardrails plane | Policy definitions, enforcement rules, proportional control (Governance Gradient) |
| Visibility plane | Observability of governed operations, audit trails |
| GitHub Actions integration | CI/CD workflows for BaseCoat validation, Sheen conformance, Adhesion tests |
| Repository-scoped governance | Apply policies per-repo, per-branch, per-environment |
| Governance Gradient | Implement proportional enforcement: inform → warn → block → escalate |

**Tech:** TypeScript/Node.js, GitHub Actions SDK, Redis for caching policy evaluations.

#### 2B. Adhesion — Testing & Validation

| Task | Details |
|---|---|
| Test registry | Store test definitions, assertions, and evaluation configs |
| Automated validation | Schema checks, SBOM creation, security scans, conformance checks |
| AI-specific evals | Model evaluations, prompt testing, guardrail verification |
| Result storage | Test results linked to Batches with evidence in Proof |
| Drift detection | Compare observed state (Snitch) vs. desired state (Primer) |

**Tech:** TypeScript/Node.js, integration with testing frameworks (Jest, Playwright), model evaluation tools.

**Deliverables:**
- [ ] BaseCoat governance engine with Agent/Skill/Instruction/Prompt model
- [ ] Guardrails and Visibility planes
- [ ] GitHub Actions integration for CI/CD governance
- [ ] Governance Gradient (inform → warn → block → escalate)
- [ ] Adhesion test registry and automated validation pipeline
- [ ] AI-specific evaluation framework

---

### Phase 3 — Evidence & Intelligence: Proof + Snitch + Teardown (Weeks 15–20)

**Goal:** Implement evidence management, discovery, and reverse engineering.

#### 3A. Proof — Evidence & Provenance

| Task | Details |
|---|---|
| Evidence store | Store evidence, provenance, attestations with source and freshness |
| Stamp system | Assertion/attestation mechanism with expiry |
| CoA (Certificate of Analysis) | Point-in-time conformance summaries |
| Batch Record | Full lifecycle history for each Batch |
| Control → Policy → Implementation → Test → Result → Evidence → Approval chain | Full traceability |
| Notary / Witness | Independent validation without auto-declaring compliance |

**Tech:** PostgreSQL, immutable audit log, cryptographic signing for attestations.

#### 3B. Snitch — Discovery & Intelligence

| Task | Details |
|---|---|
| Multi-source discovery | GitHub, GitLab, Azure DevOps, AWS, GCP, Azure APIs |
| Observation model | Observations are not truth — reconciled into canonical records |
| Cloud resource scanning | Auto-discover infrastructure, services, data stores |
| AI component inventory | Models, model versions, prompts, agents, skills, MCP servers, tools, vector stores, embedding models, RAG sources, guardrails |
| Reconciliation pipeline | Merge observations from multiple sources into Batchbook |

**Tech:** TypeScript/Node.js, cloud provider SDKs, cron/scheduled jobs, message queue (SQS/BullMQ).

#### 3C. Teardown — Reverse Engineering

| Task | Details |
|---|---|
| SBOM generation | SPDX + CycloneDX formats |
| Component analysis | Dependency trees, transitive dependencies, license compliance |
| SLSA provenance | Build provenance verification |
| AI-specific analysis | Model provenance, prompt lineage, agent dependency graphs |
| Genealogy tracking | Component lineage across builds and deployments |

**Tech:** Syft/Grype (anchore), CycloneDX, SLSA framework, custom AI-component analyzers.

**Deliverables:**
- [ ] Proof evidence store with Stamp and CoA systems
- [ ] Full traceability chain (Control → Evidence → Approval)
- [ ] Snitch multi-source discovery pipeline
- [ ] AI component inventory (models, prompts, agents, guardrails)
- [ ] Teardown SBOM and provenance analysis
- [ ] Batch Record lifecycle tracking

---

### Phase 4 — Design Governance & Incident Response: Sheen + Crosslink (Weeks 21–26)

**Goal:** Implement design governance and incident coordination.

#### 4A. Sheen — Design Governance

| Task | Details |
|---|---|
| Token system | Design token definitions, validation, conformance checking |
| Six design pillars | Accessibility, consistency, performance, security, usability, maintainability |
| Design rule engine | Automated design conformance in CI/CD |
| Consumer lifecycle | Design asset lifecycle management |
| Separation from BaseCoat | Sheen owns design; BaseCoat owns engineering — no overlap |

**Tech:** TypeScript/Node.js, design token libraries, CSS/DSL validation.

#### 4B. Crosslink — Incident Coordination

| Task | Details |
|---|---|
| On-call resolution | Integrate with PagerDuty/Opsgenie |
| Escalation policies | Configurable escalation paths |
| Bridge creation | Auto-create incident channels in Slack/Teams |
| Responder acknowledgment | Track acks, escalate non-acks |
| Incident roles | IC, Tech Lead, Comms Lead, Business Owner, Security, Vendor, Executive |
| Post-incident handoff | Link to post-mortem systems |

**Tech:** TypeScript/Node.js, Slack/Teams APIs, PagerDuty API, durable workflows (Temporal/AWS Step Functions).

**Deliverables:**
- [ ] Sheen design governance with token system and six pillars
- [ ] Design conformance checking in CI/CD
- [ ] Crosslink incident coordination with on-call integration
- [ ] Auto-bridge creation and responder tracking
- [ ] Post-incident workflow handoff

---

### Phase 5 — Fleet Management: Primer + Grain + Compliance (Weeks 27–32)

**Goal:** Implement fleet rollout, data governance, and compliance mapping.

#### 5A. Primer — Fleet Rollout

| Task | Details |
|---|---|
| Desired state management | Git-based desired state definitions |
| Rollout waves | Phased deployment with rollback capability |
| Drift detection | Compare desired (Primer) vs. observed (Batchbook) vs. discovered (Snitch) |
| Reconciliation engine | Auto-remediate drift or escalate |

**Tech:** GitOps patterns, Kubernetes operators (if applicable), drift detection engine.

#### 5B. Grain — Data Schema Governance

| Task | Details |
|---|---|
| Schema registry | Database schema definitions, naming conventions, style guides |
| Conformance checking | Validate schemas against governance rules |
| Separation from Binder | Grain owns customer data schemas; Binder owns platform contract schemas |

**Tech:** SQL parsing, schema diff tools, database migration tracking.

#### 5C. Compliance Frameworks

| Task | Details |
|---|---|
| Framework mappings | NIST SSDF, NIST CSF, ISO 27001, CMMC, SOC 2, PCI DSS |
| Compliance profiles | Express compliance as profiles, not one-off products |
| Evidence correlation | Map internal evidence to external framework requirements |
| Reporting | Generate compliance reports from evidence |

**Tech:** Framework definition language, evidence mapping engine, report generation.

**Deliverables:**
- [ ] Primer fleet rollout with desired state management
- [ ] Grain data schema governance
- [ ] Compliance framework mappings (NIST, ISO, SOC 2, PCI DSS)
- [ ] Evidence correlation and compliance reporting
- [ ] Drift detection and reconciliation

---

### Phase 6 — Platform Surfaces: MCP, Admin UI, Agent UI (Weeks 33–38)

**Goal:** Build the user-facing interfaces and agent integration layer.

#### 6A. MCP Surface

| Task | Details |
|---|---|
| MCP server | Model Context Protocol server exposing curated tools and resources |
| Side-effect classes | Tools declare whether they read, propose, or execute |
| Execution approval | Server-enforced approval for destructive actions |
| No token passthrough | MCP servers obtain audience-bound downstream credentials |

**Tech:** MCP SDK, TypeScript/Node.js, OAuth2/OIDC for credential management.

#### 6B. Admin Dashboard

| Task | Details |
|---|---|
| Catalog browser | Browse Batches, Decks, Palettes in the graph |
| Governance controls | Configure policies, guardrails, enforcement levels |
| Evidence viewer | View Proof records, Stamps, CoA, Batch Records |
| Compliance dashboard | Framework conformance status, evidence gaps |
| Fleet status | Primer rollout status, drift alerts |

**Tech:** React/Next.js, TanStack Query, Tailwind CSS, shadcn/ui components.

#### 6C. Agent Integration

| Task | Details |
|---|---|
| Agent registry | Register agents with bounded authority |
| Authority delegation | Trace agent actions to approved controls and accountable humans |
| Autonomous container support | Ephemeral containers for isolated agent execution |
| Model routing | Route agent requests to appropriate models |

**Tech:** Docker/Kubernetes for containers, agent orchestration framework, model routing service.

**Deliverables:**
- [ ] MCP server with curated tools and side-effect classes
- [ ] Admin dashboard with catalog, governance, evidence, and compliance views
- [ ] Agent registry with bounded authority delegation
- [ ] Autonomous container support for isolated execution
- [ ] Model routing service

---

### Phase 7 — Hardening, Security, & Production Readiness (Weeks 39–42)

**Goal:** Harden the platform for production deployment.

| Task | Details |
|---|---|
| Seal — Security hardening | Security control sets, posture management |
| Reclaim — Retirement lifecycle | Deprecation workflows, dependent analysis |
| Multi-tenancy | Tenant isolation, resource quotas, RBAC |
| Audit logging | Immutable audit trail for all governance decisions |
| Performance optimization | Caching, indexing, query optimization |
| Disaster recovery | Backup, restore, failover procedures |
| Documentation | API docs, admin guides, user manuals |
| Security audit | Penetration testing, vulnerability assessment |

---

## 4. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend (site)** | Static HTML/CSS/JS | Matches existing design, lightweight |
| **Frontend (dashboard)** | React + Next.js + Tailwind + shadcn/ui | Modern, accessible, component-rich |
| **Backend API** | TypeScript + Node.js + Fastify/Hono | Type-safe, fast, ecosystem-mature |
| **Graph DB** | Neo4j | Native graph queries for relationships |
| **Relational DB** | PostgreSQL | Structured data, JSON support, mature |
| **Cache** | Redis | Policy evaluation caching, session management |
| **Message Queue** | BullMQ (Redis) or AWS SQS | Async jobs, scheduled tasks |
| **Durable Workflows** | Temporal or AWS Step Functions | Crosslink, Reclaim, compliance remediation |
| **CI/CD** | GitHub Actions | Already integrated with BaseCoat model |
| **Container Runtime** | Docker / Kubernetes | Autonomous agent containers |
| **Auth** | OIDC (Auth0, Cognito, or Keycloak) | Humans, workloads, agents |
| **Search** | Typesense or Meilisearch | Full-text search across catalog |
| **SBOM** | Syft/Grype (Anchore) | Component analysis, vulnerability scanning |
| **Monitoring** | OpenTelemetry + Grafana | Observability, tracing, metrics |
| **Deployment** | Docker Compose (dev) / Kubernetes (prod) | Consistent env, scalable |

---

## 5. Data Model (Key Entities)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Organization│────▶│  Portfolio  │────▶│   Product   │
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
                    ┌─────────────┐              │
                    │  Compliance │◀─────────────┘
                    │   Profile   │
                    └─────────────┘
                           │
┌─────────────┐     ┌──────▼────────┐     ┌─────────────┐
│    Team     │────▶│   Batch       │────▶│   Swatch    │
│   (owner)   │     │ (governed app)│     │  (profile)  │
└─────────────┘     └───────────────┘     └─────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
  ┌───────▼──────┐ ┌──────▼──────┐ ┌───────▼──────┐
  │   Control    │ │    Test     │ │   Evidence   │
  │   (policy)   │ │  (adhesion) │ │   (proof)    │
  └──────────────┘ └─────────────┘ └──────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
                    ┌──────▼──────┐
                    │    Stamp    │
                    │ (attestation│
                    │  with CoA)  │
                    └─────────────┘
```

### Stable ID Formats

| Entity | Format | Example |
|---|---|---|
| Application | `app:<name>` | `app:claims-portal` |
| Repository | `repo:<org>/<name>` | `repo:acme/claims-api` |
| Model | `model:<provider>/<name>` | `model:openai/gpt-4` |
| Agent | `agent:<name>` | `agent:code-reviewer` |
| Control | `ctrl:<domain>-<seq>` | `ctrl:BC-IAM-001` |
| Batch | `batch:<id>` | `batch:claims-portal-v2` |
| Evidence | `ev:<timestamp>-<hash>` | `ev:20261011-5d7841f` |

---

## 6. Deployment Classes (D0–D7)

The platform supports a progression of execution models — use the **least complex** that meets requirements:

| Class | Model | Use When |
|---|---|---|
| **D0** | Static artifact | Documentation, schemas, configs |
| **D1** | Instruction / policy | Governance rules, guardrails |
| **D2** | Skill | Reusable capability definitions |
| **D3** | Prompt / custom agent | One-off AI tasks |
| **D4** | Deterministic workflow | CI/CD pipelines, validation |
| **D5** | Event-driven agent | Reactive governance, alerts |
| **D6** | Ephemeral autonomous container | Isolated agent execution |
| **D7** | Persistent hosted agent / local model | Continuous monitoring, custom models |

---

## 7. Governance Gradient

Enforcement is proportional, not binary:

```
Level 0 — Inform:  Show guidance, no enforcement
Level 1 — Warn:    Visible warnings, logged, no block
Level 2 — Block:   Prevent the action, require override
Level 3 — Escalate: Block + notify governance team
Level 4 — Freeze:  Suspend capability pending review
```

Each control in the system specifies its gradient level. High-risk operations default to higher levels.

---

## 8. API Design Principles

- **Internal does not mean unauthenticated** — One identity model covers humans, workloads, and agents
- **Products enforce resource-level authorization** — Gateways are not the only enforcement point
- **API-first does not require a web service per product** — Git-native products expose capabilities through adapters
- **MCP is a task interface, not an API mirror** — Tools declare read/propose/execute with side-effect classes
- **No token passthrough** — MCP servers obtain audience-bound downstream credentials
- **The graph is read-only and bounded** — Writes go to the owning product; authorization covers nodes, edges, counts, and traversal results

---

## 9. Estimated Effort & Team

| Phase | Duration | Team Size | Key Roles |
|---|---|---|---|
| Phase 0 — Foundation | 2 weeks | 2 | Frontend dev, DevOps |
| Phase 1 — Binder + Batchbook | 6 weeks | 4 | Backend x2, DB/Graph dev, DevOps |
| Phase 2 — BaseCoat + Adhesion | 6 weeks | 5 | Backend x2, CI/CD dev, QA, DevOps |
| Phase 3 — Proof + Snitch + Teardown | 6 weeks | 5 | Backend x2, Security dev, Data eng, DevOps |
| Phase 4 — Sheen + Crosslink | 6 weeks | 4 | Backend x2, Integration dev, DevOps |
| Phase 5 — Primer + Grain + Compliance | 6 weeks | 4 | Backend x2, Compliance specialist, DevOps |
| Phase 6 — Platform Surfaces | 6 weeks | 5 | Frontend x2, Backend x2, DevOps |
| Phase 7 — Hardening | 4 weeks | 4 | Security, QA, Backend, DevOps |
| **Total** | **~42 weeks** | **4–5 core** | |

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Scope creep (16+ products) | High | Phase delivery; MVP covers Binder, Batchbook, BaseCoat, Adhesion, Proof |
| Graph DB complexity | Medium | Start with PostgreSQL recursive CTEs; migrate to Neo4j when query patterns demand it |
| Multi-tenant isolation | High | Design tenant context from Day 1 in Binder |
| AI model dependency | Medium | Model routing abstraction; support multiple providers |
| Integration sprawl | Medium | Adapter pattern; prioritize GitHub → GitLab → Azure DevOps |
| Governance authority ambiguity | High | Clear role model (Authority → Policy → Control → Enforcement → Evidence → Assurance) |

---

## 11. MVP Scope (Minimum Viable Platform)

For a first releasable version, focus on:

1. **Static documentation site** (Phase 0)
2. **Binder** — Schema registry + stable IDs + identity
3. **Batchbook** — Graph-backed catalog with GitHub integration
4. **BaseCoat** — Basic governance engine with GitHub Actions integration
5. **Adhesion** — Test registry + automated validation
6. **Proof** — Evidence store with basic attestation
7. **Admin Dashboard** — Catalog browser + governance controls

This MVP delivers the core governance loop: **define policy → validate in CI/CD → store evidence → view in dashboard**.

---

## 12. Open Questions

- Should Binder be extracted from BaseCoat first, or built alongside?
- Neo4j vs. PostgreSQL for the graph — when is the tipping point?
- Self-hosted vs. cloud deployment for the platform itself?
- Multi-tenancy requirements: single org, multi-department, or SaaS?
- Which compliance frameworks are priority for the first release?
- Agent execution: sandboxed containers or full Kubernetes?
