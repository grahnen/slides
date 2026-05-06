# Paper I
<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro1.svg"></div>

---

<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro2.svg"></div>

---

<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro3.svg"></div>

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
- Verifying implementations is known to be EXPSPACE complete.

- Checking linearizability of a single execution is NP-hard for arbitrary structures.
- Specialised monitoring algorithms have been developed in earlier work
  + Stacks: Polynomial.
  + Queues: $\mathcal{O}(n)$

  
---

## Efficient Linearizability Monitoring
### Parosh Aziz Abdulla, Samuel Grahn, Bengt Jonsson, S. Krishna, Om Swostik Mishra
We develop monitoring algorithms:
- Stacks: $\mathcal{O}(n^2)$
- Queues: $\mathcal{O}(n~\log n)$
- (multi)sets: $\mathcal{O}(n)$

---

## Stack Algorithm
We note that the stack specification $\mathcal{S}$ can be defined inductively:
- $\epsilon \in \mathcal{S}$
- $u \in \mathcal{S} \Rightarrow push(x) \cdot u \cdot pop(x) \in \mathcal{S}$
- $u, v \in \mathcal{S} \Rightarrow u \cdot v \in \mathcal{S}$

We assume _differentiated_ histories: each value occurrs in one push and (up to) one pop.

---


## Stack Algorithm
- Compute _populated_ and _deserted_ segments
- Apply simplification steps:
  + Extreme value removal
  + Partitioning

If we ever cannot progress, conclude unlinearizability.

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/lifo-sdhk2.hist.000.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.000.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.001.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.002.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.003.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.004.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.005.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.006.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.007.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.008.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.009.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.010.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.011.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.012.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.013.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.014.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.015.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.016.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.017.svg"></div>

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


---

<!-- .slide: data-auto-animate -->
$$
enq(a).ret < enq(b).call \wedge
deq(b).ret < deq(a).call
$$ <!-- .element: class="nofrag" data-id="queueviol" -->

<div data-id="history5" data-preload data-animate data-load="histories/queue_viol.hist.001.svg"></div>

---

<!-- .slide: data-auto-animate -->
$$\textit{outer}\textrm{ seg. of }b \subseteq \textit{inner}\textrm{ seg. of }a$$<!-- .element: class="nofrag center" data-id="queueviol" -->

<div data-id="history5" data-preload data-animate data-load="histories/queue_viol.hist.001.svg"></div>

---

## Algorithm (basic)

Check every pair of values $a, b$. If $b.outer \subseteq a.inner$, conclude unlinearizability.

Optimized: Use a specialized data structure to reduce the number of comparisons.

---

## Queue Tree

Extension of a red-black tree, where each node corresponds to some value, and contains
- A left and right subtree
- Left and right enpoints of the _inner_ interval
- A _high_ key: the highest _right_ enpoint occurring in its subtrees 



---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="histories/queue_ex.hist.000.svg"></div>

_Inner_ segments: (3, 6), (4, 11), (9, 14), (12, 26), (16, 25), (18, 20), (21, 28), (24, 30)

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), (15, 23), (19, 31), (22, 32)
<!-- .element: data-id="outersegs" -->

---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="histories/queue_ex.hist.000.svg"></div>


_Inner_ segments: (3, 6), (4, 11), (9, 14), (12, 26), (16, 25), (18, 20), (21, 28), (24, 30) 
<!-- .element: class="nofrag" -->

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->


---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="queue_tree_1.svg"></div>

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->


---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="queue_tree_2.svg"></div>

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->


---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="queue_tree_3.svg"></div>

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->

---

## (Multi)Sets

The operations are _add(x)_ and _remove(x)_.

A set or multiset history is linearizable iff each _single-valued projection_ is linearizable.

A _single-valued_ *multiset* history is linearizable iff the number of returned _remove_ never exceed the number of called _add_.

A __single-valued_ *set* history is linearizable iff:
- the number of returned _remove_ never exceed the number of called _add_.
- the number of returned _add_ never exceed the number of called _rmv_ by more than one.

We also present a greedy linear-time algorithm for sets with _membership queries_.


---

## Formalization

The proof of the stack algorithm has been formalized in the Lean theorem prover.

```lean
theorem algorithm_correct {H : History} :
  H.linearizable ↔ ∃ s, algorithm H = some s := by
  apply Iff.intro
  · exact linearizable_alg_some
  · intro ⟨s, sH⟩
    use s
    exact algorithm_linearization sH
```
<!-- .element: class="make-fragment" -->

https://github.com/grahnen/LinearizabilityTheory


---

## Implementation

The algorithms have been implemented as a tool: LiMo

https://github.com/grahnen/LiMo
