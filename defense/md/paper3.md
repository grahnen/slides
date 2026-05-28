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
- SC: concurrent programs operate as if instructions are interleaved.

<div class="multicol">

```
x := 1
a := read(y) // 0
y := 1
b := read(x) // 1
```

```
x := 1
y := 1
a := read(y) // 1
b := read(x) // 1
```

```
y := 1
b := read(x) // 0
x := 1
a := read(y) // 1
```
</div>

- No SC execution has $a = b = 0$.
- But modern hardware can exhibit this behaviour!

---

## Memory Systems

Modern hardware does not operate directly on main memory: each core on the CPU has a local cache.

When a thread writes, it tells the cache a value and intended memory location, and the cache stores it in some local register.

Later, the system may synchronize the local register with main memory.

A memory _system_ is a protocol, or interface to interact with memory.
A memory _model_ is a contract: guarantees about what can happen.

We ask: Does a memory _system_ guarantee the requirements of a given memory _model_?

---

## Weak Memory Models

Defined using acyclicity of execution graphs.

- An execution satisfies _SC_ if there exists $co$ such that $po \cup rf \cup fr \cup co$ is acyclic.
- We consider the release-acquire (RA) family of models:
  + _SRA_, when there exists $co$ such that $po \cup rf \cup co$ is acyclic.
  + _RA_, when there exists $co_x$ such that $po \cup rf \cup co_x$ is acyclic.
  + _WRA_, when there are no cycles of the form $w \cdot hb \cdot w' \cdot hb \cdot rf^{-1}$, for writes $w, w'$ to the same variable. $hb = po \cup rf$.
  
Note:

WRA is a bit cryptic. It allows many of the behaviours that RA forbids, but disallows one specific behaviour.

It forbids threads reading from a write it has seen be overwritten via $po \cup rf$.

---

## Memory Systems

We model memory systems, e.g. cache protocols, as _register machines_:
- Finite automata whose labels take one of the following form
  + $w(\theta, x, a)$: thread $\theta$ asks to write to $x$, the system stores it in register $a$.
  + $r(\theta, x, a)$: thread $\theta$ asks to read from variable $x$, the system returns the value in register $a$.
  + $a := b$: the system copies the value stored in register $b$ to register $a$.

---

## Example: MSI cache protocol

<!-- .slide: id="msi_anim" -->

---

## Related Work
- Monitoring is NP-hard in general, but for differentiated executions it is polynomial for _causal consistency_ (which is equivalent to WRA).<sup><a href="#/refs">5</a></sup>
- Memory system consistency is decidable for _causal consistency_ under the assumption of data independent implementations.<sup><a href="#/refs">5</a></sup>

---

## Verification of the Release-Acquire Semantics
### Parosh Aziz Abdulla, Elli Anastasiadi, Mohamed Faouzi Atig, Samuel Grahn

Given a memory system implemented as a register machine, does it guarantee the WRA, RA or SRA semantics?

We present a polynomial-time algorithm for WRA, based on saturation.

$w \cdot hb \cdot w' \cdot hb \cdot rf^{-1}$

We search backwards from read-transitions, starting with suffix $hb \cdot rf^{-1}$

For each possible write $w'$ leading to such a suffix, we start tracking path suffixes:
$hb \cdot w' \cdot hb \cdot rf^{-1}$

Until we find a write $w$ that leads to a violation.

Note:

Recall the definition for WRA.

Backwards because this makes copy-transitions easier to handle.
From reads because any cycle in the execution graph must have been introduced by a read.

---

## Verification of the Release-Acquire Semantics
### Parosh Aziz Abdulla, Elli Anastasiadi, Mohamed Faouzi Atig, Samuel Grahn

We show PSPACE completeness for RA and SRA.

Our hardness reduction is from DFA-intersection-nonemptiness.

We present a PSPACE algorithm to show membership.

---

## Implementation
We implement our WRA algorithm in a publicly available tool
- Link to the repository: https://github.com/grahnen/ccchecker
