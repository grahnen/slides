# Type Theory
- Lean is based on (a variant of) the *calculus of constructions*, which is a _dependent type theory_.
- A logical formalism based on *types*. 
- Every object has a type. If $a$ is of type $T$, we write $a : T$
- Every type is defined by how its elements can be *constructed*:
  ```lean
  inductive Nat : Type where
  | zero : Nat
  | succ : Nat -> Nat
  ```
- Types can depend on other types
  ```lean
  inductive List (A : Type) : Type  where
  | nil : List
  | cons : A -> List A -> List A

  inductive Option (A : Type) : Type where
  | none : Option A
  | some : A -> Option A
  ```
- Functions are defined by pattern matching
  ```lean
  def head? : List A -> Option A
  | [] => none
  | x :: xs => some x

  def add : Nat -> Nat -> Nat
  | m, zero => m
  | m, succ n => succ (add m n)
  ```

Note:
- 
- Contrary to set theory: an object is *always* of a type, 
  In set theory: objects can exist without being members of a set.
- As is common in most (functional) programming languages.
  What makes the type theory /dependent/ is that
- Types can depend on *values*
- 

