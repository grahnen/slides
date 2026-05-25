# Introduction

- Concurrent programs are error prone
- Finding errors is difficult

Note:
Motivation for my thesis

---

- To make reasoning about concurrent code easier, we use _models_
- These models act as _contracts_
  + How hardware interprets instructions
  + How software communicates with other software
  + ...

Note:
Models allow us to reason formally
- without needing technical details of hardware implementations.

---

This thesis covers three types of models of concurrency
- Linearizability: model of concurrency
- Event-Driven Concurrency: model of computation
- Weak-Memory Models: model of hardware behavior

