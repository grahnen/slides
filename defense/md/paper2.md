# Paper II
## Event-Driven Programming Model
In multithreaded programming we have threads communicating over shared memory.

We extend these threads with mailboxes and call them _handlers_.

These _handlers_ also communicate by sending messages to mailboxes of other handlers

When a handler is not busy it can fetch a message from its mailbox and start executing it.

We consider _executions_ of programs running on this model.

Note:

We proceed with Paper 2.

We start by describing the Event-Driven concurrency model.

---

## Why?

- Event-Driven software is _popular_:
  + High-performance servers
  + Android applications
  + Web applications
  + ...

- Model checking software using `DPOR` create new executions.
  + They need to check the feasibility of these executions to decide which of them to explore.

---

<!-- .slide: id="ed-intro" -->

---

## Event-Driven Concurrency

We can place constraints on two parts: the memory accesses and on the mailboxes.

- We consider _Sequential Consistency (SC)_
  + The behavior of a concurrent program is as if the threads take turns executing their instructions.
- And we consider _Queue_ mailboxes
  + Messages are executed in the order they are received.

---

## Execution Graphs

A way to represent concurrent shared-memory executions.

- The nodes are memory events
- The edges are ordering relations

---
<!-- .slide: id="egraph-intro" -->

---

## Checking Consistency of Event-Driven Traces
### Parosh Aziz Abdulla, Mohamed Faouzi Atig, R. Govind, Samuel Grahn, Ramanathan S. Thinniyam
- We consider the following question:
  Given an execution with $po$, $rf$, $co$-edges, does there exist relations $eo$ and $mo$ such that the resulting execution graph:
  + satisfies SC
  + satisfies queue mailbox semantics

- We show NP-hardness.
- We provide an algorithm, and an implementation that utilizes an efficient encoding into the Z3 SMT solver.

---

## Encoding of queue semantics
We formalise the requirement that the execution satisfies queue semantics by adding a new edge type:

$do = pb^{-1} \cdot mo \cdot pb$

Acyclicity of _rf_, _co_, _pb_, _eo_, _mo_, _fr_, _do_ implies both SC and queue semantics!

---

## Implementation
We have implemented the algorithm using Z3: we encode the execution graph as a partial order, and add edges as constraints.
- Link to the repository: https://github.com/grahnen/edchecker

---

## Related Work
- The problem is NP hard for _SC_ and _multiset_ mailboxes.<sup><a href="#/refs">4</a></sup>
- Other trace consistency results include:
  + SC for plain multithreaded executions: NP-hard<sup><a href="#/refs">2</a></sup>
  + WRA: NP-hard, polynomial for differentiated executions.<sup><a href="#/refs">5</a></sup>
