# Propositions
- What does this type encode?
  ```lean
  inductive Ex1 : Nat -> Type where
  | base : Ex1 0
  | next : (n : Nat) -> Ex1 n -> Ex1 (n + 2)
  ```
  - Answer: Even numbers!

- What does a term `q : Ex1 4` encode?
  - `q` constructed using the construction rules
  - since we *can* produce an element of `Ex1 4` we know 4 is even!

- Propositions as types! Programs as proofs! (Curry-Howard correspondence)
