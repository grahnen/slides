# Paper II
## Event-Driven Progams

_handlers_ communicate via
- Sending messages to _mailboxes_ of other handlers
- Shared memory

When a handler is not busy it can fetch a message from its mailbox and start executing it.

We study _executions_ of programs running on this model.

---
<!-- .slide: id="ed-intro" -->

---

## Event-Driven Concurrency
What does it mean for an execution to be correct?

We can place constraints on the memory accesses and on the mailboxes.
- We consider _Sequential Consistency (SC)_
  + The behavior of a concurrent program is as if the threads take turns executing their instructions.
- And we consider _Queue_ mailboxes
  + Messages are executed in the order they are received.
  
---
## Why?

- Event-Driven software is _Popular_:
  + High-performance servers
  + Android applications
  + ...

- Model checking software approaches such as DPOR "guess" new traces.
  + Checking the consistency of a trace lets the model checker discard executions that are not feasible.
  
---

## Execution Graphs

A way to represent concurrent executions.

Commonly used to define consistency criteria.

---
<!-- .slide: id="egraph-intro" -->

---

## Related Work
- The problem is NP hard for _SC_ and _multiset_ mailboxes.
- ...

---

## Our Work
- We show NP-hardness for _SC_ with _Queue_ mailboxes.
- We provide an algorithm, and an implementation that utilizes an efficient encoding into the Z3 SMT solver.

---

## Sequential Consistency
_SC_ is defined as acyclicity of the execution graph with edges _rf_, _co_, _pb_, _eo_, _mo_, and _fr_

_fr_ = _rf_$^{-1}$ _co_

---

## Queue consistency
We formalise the requirement that the execution satisfies queue semantics by adding a new edge type:

$do = pb^{-1} \cdot mo \cdot pb$

Acyclicity of _rf_, _co_, _pb_, _eo_, _mo_, _fr_, _do_ implies both SC and queue semantics!

---

## Implementation
We have implemented the algorithm using Z3: we encode the execution graph as a partial order, and add edges as constraints.
- Link to the repository: https://github.com/grahnen/edchecker
