# Paper III
## TODO

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
