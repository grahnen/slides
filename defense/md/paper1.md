# Paper I
## Linearizability
<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro1.svg"></div>


Note:
In a concurrent system, you have independent computation units
here computers, in hardware cores

---

## Linearizability
<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro2.svg"></div>

Note:
These units communicate, often via some shared object

---

## Linearizability

<!-- .slide: data-auto-animate -->
<div data-id="intro" data-animate data-load="intro3.svg"></div>

Note:
Often using some well-defined structure

What does it mean for an execution on this system to be correct?

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
- Verifying implementations is known to be EXPSPACE complete.<sup><a href="#/refs">1</a></sup>
- Checking linearizability of a single execution is NP-hard for arbitrary structures.<sup><a href="#/refs">2</a></sup>
- Specialised monitoring algorithms have been developed in earlier work<sup><a href="#/refs">3</a></sup>
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

Note:

We use this inductive definition to construct a recursive algorithm.

---


## Stack Algorithm

- Compute _populated_ and _deserted_ segments
- Apply simplification steps:
  + Extreme value removal
  + Partitioning

If we ever cannot progress, conclude unlinearizability.

---
## Example History

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/lifo-sdhk2.hist.000.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---
## We ignore threads

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.000.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---
## Compute covers

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.001.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---

## Compute segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.002.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---

## Extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.003.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.004.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---

## Compute segments
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.005.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
## Compute segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.006.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Partition

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.007.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Left part

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.008.svg"></div>
<div data-id="legend" data-animate data-load="empty.svg"></div>

---
## Compute segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.009.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
## Compute segments
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.010.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.011.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.012.svg"></div>

---
## Right part
<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.013.svg"></div>

---
## Compute segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.014.svg"></div>
<div data-id="legend" data-animate data-load="covers.svg"></div>

---
## Compute segments

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.015.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Extreme values

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.016.svg"></div>
<div data-id="legend" data-animate data-load="full.svg"></div>

---
## Done

<!-- .slide: data-auto-animate  -->
<div data-id="history2" data-preload data-animate data-load="histories/sdhk2-rw.hist.017.svg"></div>

---

## Extensions
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

Note:

As an example, consider the following queue history.

It has these inner segments. e.g. (3,6) corresponds to value 0

And these outer segments. e.g. (15, 23) corresponds to value 5

---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="histories/queue_ex.hist.000.svg"></div>


_Inner_ segments: (3, 6), (4, 11), (9, 14), (12, 26), (16, 25), (18, 20), (21, 28), (24, 30) 
<!-- .element: class="nofrag" -->

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->

Note:

We transform this history into a queue tree.

---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="queue_tree_1.svg"></div>

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->

Note:

We want to see if (15, 23) is contained in some inner segment.

We check if 16 < 15, which it is not.

If (15,23) is contained, it must be in the left subtree.

---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="queue_tree_2.svg"></div>

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->

Note:

Now, we see that 9 < 15, so (15, 23) can be in any of the trees.

First we check the current node, and since 14 < 23, it is not contained.

Next we probe the left tree. It is sufficient to see if the high key is large enough,
but 11 < 23, so it cannot be in the left tree.

We proceed to check the right tree.

---
<!-- .slide: data-auto-animate -->
<div data-id="history6" data-preload data-load="queue_tree_3.svg"></div>

_Outer_ segments: (1, 8), (2, 13), (5, 17), (7, 29), (10, 27), _(15, 23)_, (19, 31), (22, 32) 
<!-- .element: class="nofrag" data-id="outersegs" -->


Note:

The node here contains the interval (15, 23).

We have found containment and conclude unlinearizability.

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

- Earlier papers suffer from incorrect algorithms or unsound correctness proofs
- A mechanization increases trust that the algorithm is correct.

Note:

The stack algorithm, which is the most complicated of the algorithms we present, has been formalized.

---

## Implementation

The algorithms have been implemented as a tool: LiMo

https://github.com/grahnen/LiMo

Note:

The tool outperforms existing monitoring tools, and is easy to extend.
