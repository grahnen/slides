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
  + Checking the consistency of a trace lets the system discard executions that are not feasible.
  
---

## Related Work
- The problem is NP hard for _SC_ and _multiset_ mailboxes.
- ...

---

## Our Work
- We show NP-hardness for _Queue_ mailboxes.
- We provide an algorithm, and an implementation that utilizes an efficient encoding into the Z3 SMT solver.

---

## TODO
- Talk about Mazurkiewicz traces (or execution graphs)
- Talk about how SC is encoded in these.
- Show on a small example.

---

## Implementation
- Link to the repository: https://github.com/grahnen/edchecker
