# Deployment Architecture

Execution models for artifacts, skills, CI/CD, durable workflows, autonomous containers, hosted agents, local/private models, cost controls, and shearing layers.

> This document is part of the AI SDLC Governance working research set. It is intentionally a living design document and may evolve as the product family matures.

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
| **BaseCoat** | D0/D1 + D2 validation | Governance changes frequently and should remain Git-versioned |
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

- BaseCoat controls
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
BaseCoat skill:
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
BaseCoat validation
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

BaseCoat applies a **Shearing Layers** design idea to software and governance: different parts of a healthy system should be allowed to change at different rates without forcing every other layer to move with them.

The idea is inspired by the architectural concept developed by Frank Duffy and expanded by Stewart Brand in *How Buildings Learn*. A building is not one thing changing at one speed. Its site, structure, services, interior layout, and contents evolve on different timescales. Systems become difficult to adapt when fast-changing layers are tightly coupled to slow-changing ones.

BaseCoat applies the same reasoning to software:

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
Shared BaseCoat guidance
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
BaseCoat promotes reusable guidance
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
  BaseCoat guidance
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

- BaseCoat: `basecoat-10-core-shearing-layers` — design guidance for change velocity and coupling between BaseCoat layers.
- Stewart Brand, *How Buildings Learn: What Happens After They're Built* (1994).
- Stewart Brand, “Pace Layering: How Complex Systems Learn and Keep Learning,” *Journal of Design and Science* (2018).

---

# 42. Control Plane vs Execution Plane

Separate governance from the workers that execute it.

```text
                 CONTROL PLANE

Binder
BaseCoat
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
          BaseCoat                      Sheen/Adhesion
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

## BaseCoat

**Default:** Git-native instructions, controls, skills, agents, schemas.

Optional:
- CI enforcement
- policy evaluation CLI
- thin API for control resolution if enterprise-scale dynamic policy calculation becomes necessary

Avoid:
- requiring a BaseCoat server for basic governance

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
- BaseCoat
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
- Should BaseCoat controls be able to prohibit certain deployment classes?
- Should Proof record model/runtime/deployment-class provenance for every AI-assisted action?
- Should Snitch discover unmanaged local models and agent runtimes?
- Should Teardown identify autonomous-agent execution paths inside a repository?
- Should Adhesion include deployment-class-specific test suites?
- Should Crosslink be permitted to invoke autonomous remediation, or only coordinate/approve it?

---

# BaseCoat Deployment Alignment

## BaseCoat's native operating model

BaseCoat's repository-native operating model should remain explicit even when the wider family uses a broader control-plane / execution-plane architecture.

```text
BaseCoat
│
├── Guardrails Plane
│   ├── agents
│   ├── skills
│   ├── instructions
│   └── prompts
│
└── Visibility Plane
    ├── issues
    ├── pull requests
    ├── workflow runs
    └── milestones / projects
```

This is a **product-level model**.

The family-level model remains:

```text
Control Plane
    ↕
Execution Plane
```

Both are useful. They answer different questions.

- **Guardrails + Visibility** explains how BaseCoat governs work inside GitHub.
- **Control + Execution** explains how the wider family separates durable policy and state from workers, agents, workflows, and runtimes.

## Shearing Layers: preserve the canonical BaseCoat model

BaseCoat's Shearing Layers guidance uses the architectural vocabulary popularized by *How Buildings Learn*:

```text
Site
Structure
Skin
Services
Space Plan
Stuff
```

The important rule is:

> **Put decisions at the fastest layer that can own them.**

The broader family interpretation remains useful:

```text
Fast
Experiment
Learn
Operationalize
Productize
Standardize
Anchor
Slow
```

These should be presented as two views of the same idea, not as competing taxonomies.

```text
BaseCoat canonical vocabulary       Family interpretation
-----------------------------       ---------------------
Stuff                               Experiment
Space Plan                          Learn / configure
Services                            Operationalize
Skin                                Productize
Structure                           Standardize
Site                                Anchor
```

The mapping is conceptual rather than a claim of exact one-to-one equivalence.

## Coupling rule

Fast-changing concerns should depend on slower, more stable contracts—not the reverse.

```text
preferred:

prompt / skill
      ↓
versioned BaseCoat contract
      ↓
stable service / platform contract

avoid:

slow shared contract
      ↓
hard dependency on
temporary prompt wording
```

This keeps BaseCoat adaptable while preserving compatibility for the wider family.


---

# Sheen Deployment Alignment

Sheen reinforces the family's artifact-first deployment philosophy.

Most of Sheen is distributed as repository-native, versioned artifacts:

```text
tokens
skills
agents
instructions
prompts
templates
specifications
validation rules
```

Consumer repositories use configuration plus synchronization tooling to pull the approved assets into place.

That maps naturally to the family deployment model:

```text
D0
schemas / tokens / specifications / instructions

D1
skills / prompts / agent definitions

D2
validation / synchronization / CI checks
```

Sheen therefore should **not** become a persistent application service unless a future capability clearly requires durable runtime state.

Its current architecture is evidence that sophisticated governance can remain mostly artifact-driven.
