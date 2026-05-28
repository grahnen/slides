# Paper I
## Concurrent Systems Communicate
<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro1.svg"></div>

Note:
In a concurrent system, you have independent computation units
here computers, in hardware cores

---

## Concurrent Systems Communicate
<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro2.svg"></div>

Note:
These units communicate, often via some shared object

---

## Concurrent Systems Communicate

<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro3.svg"></div>

Note:
Often using some well-defined structure

What does it mean for an execution on this system to be correct?

---
### Stacks

<div class="multicol">
- Start with an empty stack of plates
  + Push(x) adds a new plate, labelled x, on top
  + Pop(x) takes the topmost plate, that has label x.
- Last-in-first-out (LIFO) order.
- Consider stack __executions_ consisting of sequences of pushes and pops.
- We define the set of stack executions $\mathcal{S}$ inductively:
  + $\epsilon \in \mathcal{S}$
  + $u \in \mathcal{S} \Rightarrow push(x) \cdot u \cdot pop(x) \in \mathcal{S}$
  + $u, v \in \mathcal{S} \Rightarrow u \cdot v \in \mathcal{S}$

- We consider _differentiated_ executions: each plate has a unique label and is used only once.


<img src="stack.jpg" />


</div>



---
<!-- .slide: data-auto-animate  -->
### Linearizability
Extension of sequential specifications to a concurrent setting.

---
<!-- .slide: data-auto-animate  -->

### Linearizability
Extension of sequential specifications to a concurrent setting.
<!-- .element: class="nofrag" data-id="outersegs" -->


<div data-id="history2" data-preload data-animate data-load="histories/lifo-sdhk2.hist.000.svg">
<!--
{
"setup": [
{
"element": ".linpt",
"modifier": "attr",
"parameters": [ {"class": "linpt fragment", "data-fragment-index": "0" }]
}
]
}
-->
</div>

Note:

THIS IS AN EXECUTION.
- Each row is a thread
- each box is an event: call or return.

---

### Linearizability
Extension of sequential specifications to a concurrent setting.
<!-- .element: class="nofrag" data-id="outersegs" -->

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/lifo-sdhk2-seq.hist.000.svg">
<!--
{
"setup": [
{
"element": ".linpt",
"modifier": "attr",
"parameters": [ { "opacity": "1" }]
}
]
}
-->
</div>

---

### Linearizability
Extension of sequential specifications to a concurrent setting.
<!-- .element: class="nofrag" data-id="outersegs" -->

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-animate data-load="histories/lifo-sdhk-singleth.hist.000.svg">
</div>

---

## Related Work
- Verifying implementations is difficult.
- Instead, we focus only on _executions_.
  + Checking linearizability of a single execution is NP-hard for arbitrary structures.<sup><a href="#/refs">2</a></sup>
  + Specialised monitoring algorithms have been developed in earlier work<sup><a href="#/refs">3</a></sup>
    + Stacks: Polynomial.
    + Queues: $\mathcal{O}(n)$

---

## Efficient Linearizability Monitoring
### Parosh Aziz Abdulla, Samuel Grahn, Bengt Jonsson, S. Krishna, Om Swostik Mishra
The monitoring problem: Given a _history_ (sequence of calls and returns to operations), is it linearizable?

We develop monitoring algorithms:
- Stacks: $\mathcal{O}(n^2)$
- Queues: $\mathcal{O}(n~\log n)$
- (multi)sets: $\mathcal{O}(n)$

---

## Stack Algorithm Outline

- Compute _populated_ and _deserted_ segments
- Apply simplification steps:
  + Extreme value removal
  + Partitioning

If the history is empty, we conclude linearizability.

If we ever cannot progress, conclude unlinearizability.

---
## Example History

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/lifo-sdhk2.hist.000.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---
## We ignore threads and focus on values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.000.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---
## Compute covers

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.001.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---

## Compute populated and deserted segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.002.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---

## Remove extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.003.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Remove extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.004.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---

## Compute populated and deserted segments
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.005.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
## Compute populated and deserted segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.006.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Partition the history

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.007.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Run algorithm on the left part

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.008.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---
## Compute populated and deserted segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.009.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
## Compute populated and deserted segments
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.010.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Remove extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.011.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Remove extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.012.svg"></div>

---
## Run algorithm on the right part
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.013.svg"></div>

---
## Compute populated and deserted segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.014.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
## Compute populated and deserted segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.015.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Remove extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.016.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Done

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.017.svg"></div>

---
## Stack algorithm complexity

Each step is $\mathcal{O}(n)$.

In the worst case, each iteration removes one value; we need at most $\mathcal{O}(n)$ iterations.

$\mathcal{O}(n^2)$

---

## Extending the algorithm
- Pushes with no matching pop
- Pops that fail.

---
<!-- .slide: data-auto-animate  -->
## Unpopped Value
<div data-id="history3" data-preload data-animate data-load="histories/incomplete_dif.hist.000.svg"></div>

---
<!-- .slide: data-auto-animate  -->
## Unpopped Value
<div data-id="history3" data-preload data-animate data-load="histories/completed_dif.hist.000.svg"></div>

---
<!-- .slide: data-auto-animate  -->
## Pop Empty
<div data-id="history4" data-preload data-animate data-load="histories/popempty.hist.000.svg"></div>

---
<!-- .slide: data-auto-animate  -->
## Pop Empty
<div data-id="history4" data-preload data-animate data-load="histories/popempty.hist.001.svg"></div>

---
<!-- .slide: data-auto-animate  -->
## Pop Empty
<div data-id="history4" data-preload data-animate data-load="histories/popempty.hist.002.svg"></div>

---
<!-- .slide: data-auto-animate  -->
## Pop Empty
<div data-id="history4" data-preload data-animate data-load="histories/popempty.hist.003.svg"></div>

---
<!-- .slide: data-auto-animate -->
## Queue Algorithm

We show a small model property for queues: A differentiated, completed queue history is linearizable if and only if for _no_ pair of values $a, b$ we have

$$
enq(a).ret < enq(b).call \wedge
deq(b).ret < deq(a).call
$$ <!-- .element: data-id="queueviol" -->

---

<!-- .slide: data-auto-animate -->
$$
enq(a).ret < enq(b).call \wedge
deq(b).ret < deq(a).call
$$ <!-- .element: class="nofrag" data-id="queueviol" -->

<div data-id="history5" data-preload data-animate data-load="histories/queue_viol.hist.000.svg"></div>
<!-- .element: class="fragment" data-fragment-index="1" -->


Note:

We draw this constraint as a part of a history.

---

<!-- .slide: data-auto-animate -->
$$
enq(a).ret < enq(b).call \wedge
deq(b).ret < deq(a).call
$$ <!-- .element: class="nofrag" data-id="queueviol" -->

<div data-id="history5" data-preload data-animate data-load="histories/queue_viol.hist.001.svg"></div>

Note:

We can draw the inner segments of these values.

---

<!-- .slide: data-auto-animate -->
$$\textit{outer}\textrm{ seg. of }b \subseteq \textit{inner}\textrm{ seg. of }a$$<!-- .element: class="nofrag center" data-id="queueviol" -->

<div data-id="history5" data-preload data-animate data-load="histories/queue_viol.hist.001.svg"></div>

Note:

An outer seg. contained in some inner seg.

---

## Queue Algorithm

Check every pair of values $a, b$. If $b.outer \subseteq a.inner$, conclude unlinearizability.

Optimized: Use a specialized data structure (Queue Tree) to reduce the number of comparisons to $\mathcal{O}(n~\log n)$.

---

## (Multi)Sets

The operations are _add(x)_ and _remove(x)_.

A set or multiset history is linearizable iff each _single-valued projection_ is linearizable.

A _single valued_ *multiset* history is linearizable iff the number of returned _remove_ never exceeds the number of called _add_.

A _single-valued_ *set* history is linearizable iff:
- the number of returned _remove_ never exceeds the number of called _add_.
- the number of returned _add_ never exceeds the number of called _remove_ by more than one.

Complexity is linear because counting these events can be done in linear time.

We also present a greedy linear-time algorithm for sets with _membership queries_.

Note:
single-valued projections: counters!




---

## Mechanized Correctness Proof
The proof of the stack algorithm has been mechanized in the Lean theorem prover.

<!-- .element: class="make-fragment" -->
https://github.com/grahnen/LinearizabilityTheory

- Earlier papers suffer from incorrect algorithms or unsound correctness proofs
- A mechanization increases trust that the algorithm is correct.
- Roughly 6500 lines of code (algorithms, definitions, theorems and proofs).

Note:

The stack algorithm, which is the most complicated of the algorithms we present, has been formalized.

---

## Implementation

The algorithms have been implemented as a tool: LiMo

https://github.com/grahnen/LiMo

Note:

The tool outperforms existing monitoring tools, and is easy to extend.
