# Introduction

- Concurrent programs are error prone
- Finding errors in concurrent systems is difficult

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
