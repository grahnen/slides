# Inductive Types
```lean
inductive Nat : Type where
| zero : Nat
| succ : Nat -> Nat
```
- We get a hierarchy
  - `zero : Nat_0`
  - `q : Nat_i -> succ q : Nat_(i + 1)`
  - `q : Nat_i -> q : Nat_(i + 1)`
  - `Nat_i` is a finite type of natural numbers up to `i`
- This allows us to perform induction!
    ```lean
    theorem P_holds {P : Nat -> Prop} (f : Nat) : P f := by
    induction f with
    | zero => ...
    | succ m ih => ...
    ```
- `by` keyword leaves programming mode and enters `tactic`-mode!
- Example: last case below
  Show that `P (succ m)` holds, given
  ```lean
  m : Nat
  ih : P m
  ```
