# Introduction
- Concurrent programs are error prone
- Finding these errors is difficult, and sometimes undecidable
- To make reasoning about concurrent code easier, we use _models_
- These models act as a contract between hardware and software
- This thesis contains three works that analyze problems relating to three different models
  + Linearizability
  + Event-Driven Concurrency
  + Weak-Memory Models
---
# Paper I
## Efficient Linearizability Monitoring
## Parosh Aziz Abdulla, Samuel Grahn, Bengt Jonsson, S. Krishna, Om Swostik Mishra
- Present linearizability as a way of developing concurrent programs: when composing linearizable strucures we can reason as if writing sequentially consistent code.
- Outline related work: notably concurrent collections and the original linearizability papers.
- I will port my slides from the halftime seminar, that define linearizability and show our algorithm on a simple example.
- Outline the mechanized proof? E.g. show a link to the github repository containing it.
---
# Paper II
- Present Event-Driven concurrency. 
- Briefly explain model checking consistency checks
- Related work: NP-hardness for multiset, Droidracer
- Show an example trace.
- Define our algorithm
---
# Paper III
- Present Weak Memory models by example.
- Define problem: analyzing a system
- Related work: Notably "On verifying causal consistency"
- Define execution graphs
- Define Register Machines, and a simple example
- Define WRA/RA/SRA
- Progress through our algorithm on a tiny example for WRA.
  + Show an example that violates WRA
  + Step through the algorithm on this example
  + Find the violating tuple, and trace back to produce a trace,
  + show the corresponding egraph and point out the WRA-cycle.
---
# Conclusion
## Conclusion
- Conclude:
  + we have developed techniques in different areas related to verification of concurrent systems.
---
## Future Work
Outline the future work directions mentioned in the thesis.

---
## Thanks!
