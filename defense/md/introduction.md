# Introduction
- Concurrent programs are error prone
- Finding errors is difficult
- Verifying their absence is sometimes undecidable
---
- To make reasoning about concurrent code easier, we use _models_
- These models act as a contract between hardware and software
  + How the hardware is allowed to interpret the software's commands
---
This thesis covers three types of models of concurrency
- Linearizability: model of correctness
- Event-Driven Concurrency: model of computation
- Weak-Memory Models: model of hardware behavior
