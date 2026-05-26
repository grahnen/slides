# Paper II
## Event-Driven Progams

_handlers_ communicate via
- Sending messages to _mailboxes_ of other handlers
- Shared memory

When a handler is not busy it can fetch a message from its mailbox and start executing it.

We study _executions_ of programs running on this model.

Note:

We proceed with Paper 2.

We start by describing the Event-Driven concurrency model.

---

## Why?

- Event-Driven software is _Popular_:
  + High-performance servers
  + Android applications
  + Web applications
  + ...
  
- Model checking software approaches such as DPOR "guess" new traces.
  + Checking the consistency of a trace lets the model checker discard executions that are not feasible.

---

<!-- .slide: id="ed-intro" -->

---

## Event-Driven Concurrency
What are the semantics?

We can place constraints on the memory accesses and on the mailboxes.
- We consider _Sequential Consistency (SC)_
  + The behavior of a concurrent program is as if the threads take turns executing their instructions.
- And we consider _Queue_ mailboxes
  + Messages are executed in the order they are received.

---

## Execution Graphs

A way to represent concurrent executions.

- The nodes are memory events
- The edges are ordering relations

---
<!-- .slide: id="egraph-intro" -->

---

## Checking Consistency of Event-Driven Traces
### Parosh Aziz Abdulla, Mohamed Faouzi Atig, R. Govind, Samuel Grahn, Ramanathan S. Thinniyam
- We show NP-hardness for _SC_ with _Queue_ mailboxes.
- We provide an algorithm, and an implementation that utilizes an efficient encoding into the Z3 SMT solver.

---

## Queue consistency
We formalise the requirement that the execution satisfies queue semantics by adding a new edge type:

$do = pb^{-1} \cdot mo \cdot pb$

Acyclicity of _rf_, _co_, _pb_, _eo_, _mo_, _fr_, _do_ implies both SC and queue semantics! $fr = rf^{-1}~co$

---

## Implementation
We have implemented the algorithm using Z3: we encode the execution graph as a partial order, and add edges as constraints.
- Link to the repository: https://github.com/grahnen/edchecker

---

## Related Work
- The problem is NP hard for _SC_ and _multiset_ mailboxes.<sup><a href="#/refs">4</a></sup>
- Other trace consistency results include:
  + SC: NP-hard<sup><a href="#/refs">2</a></sup>
  + WRA: NP-hard, polynomial for differentiated executions.<sup><a href="#/refs">5</a></sup>
