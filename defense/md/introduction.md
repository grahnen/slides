# Introduction

- Concurrent programs are error prone
- Finding these errors is difficult

Note:
Two statements that act as

motivation for my thesis

---

- To make reasoning about concurrent code easier, we use _models_
- These models act as _contracts_
  + How hardware interprets instructions
  + How software communicates with other software

Note:

Models allow us to reason formally
- without needing technical details of hardware implementations.

---

This thesis covers three areas related to concurrency
- Linearizability: correctness criterion for concurrent objects
- Event-Driven Concurrency: model of concurrency
- Weak-Memory Models: models of memory systems (e.g. hardware)

Note:
- In paper 1 we study Linearizability.
- In paper 2 we study Event-Driven concurrency.
- In paper 3 we study a class of weak memory models.
