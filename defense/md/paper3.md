# Paper III
## Weak Memory Models

<div class="multicol">

```
x := 1
a := read(y)
```

```
y := 1
b := read(x)
```

</div>

What are the possible values of $a$ and $b$ after execution, assuming $x = y = 0$ initially?
- Can both $a$ and $b$ be $0$?
  + Not in the strictest model, _SC_.
  + But it can in modern hardware!

Modern hardware operates under _weak memory_.

---

## Weak Memory Models
Defined using acyclicity of execution graphs.

- _SC_ is defined as acyclicity of $po \cup rf \cup fr \cup co$
- We consider the release-acquire (RA) family of models.
  + _SRA_, defined as acyclicity of $po \cup rf \cup co$
  + _RA_, defined as acyclicity of $po \cup rf \cup co_x$
  + _WRA_, if there is no cycle of the form $w \cdot hb \cdot w' \cdot hb \cdot rf^{-1}$, for writes $w, w'$ to the same variable. $hb = po \cup rf$


---

## Memory Systems

Modern hardware does not operate directly on main memory: each core on the CPU has a local cache.

When a thread writes, it tells the CPU the value and memory location, and the CPU stores it in some local register.

Later, the system may synchronize with main memory.

---

## Memory Systems

We model memory systems as _register machines_:
- Finite automata whose labels take one of the following form
  + $w(\theta, x, a)$: thread $\theta$ asks to write to $x$, the system stores it in register $a$.
  + $r(\theta, x, a)$: thread $\theta$ asks to read from variable $x$, the system returns the value in register $a$.
  + $a := b$: the system copies the value stored in register $b$ to register $a$.
  
We ask the question: Do all executions of all programs run on this memory system satisfy the (weak/strong) release-acquire semantics?

---
## Related Work
- Single-execution is undecidable in general, but for differentiated executions it is polynomial for _causal consistency_ (which is equivalent to WRA).
- Memory system consistency is decidable for _causal consistency_ under the assumption of data independent implementations.

---

## Our results

The register machine model only admits data-independent implementations.

We present a polynomial-time algorithm based on saturation for WRA.

$w \cdot hb \cdot w' \cdot hb \cdot rf^{-1}$

We search backwards, starting with suffix $hb \cdot rf^{-1}$

When we find a write $w'$, we start tracking paths
$hb \cdot w' \cdot hb \cdot rf^{-1}$

Until we find a suitable $w$ and have found a violation.

---

## Our results 

We show PSPACE completeness for RA and SRA.

Our hardness reduction is from DFA-intersection-nonemptiness.

We present a PSPACE algorithm to show membership.

---


## Implementation
We implement our WRA algorithm as a publicly available tool
- Link to the repository: https://github.com/grahnen/ccchecker
