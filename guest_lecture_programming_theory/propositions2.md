# Propositions, continued
What do two terms `q1 q2 : Ex1 4` mean?
- They are two different proofs that 4 is even.
- We usually don't care which proof we use, only that there is one!
- We define a new type, `Prop`, of *proof-irrelevant* propositions.
- How is not important in this course, you just need to know the type `Prop`!
- ```lean
  inductive Eq (A : Type) : A -> A -> Prop where
  | rfl : (a : A) -> Eq a a
  ```
- Universal quantification: $ \forall q : A, \~P\~ q $
  ```lean
  def forall {A : Type} (P : A -> Prop) : Prop := ((a : A) -> P a) 
  ```
- Existential quantification:
  ```lean
  inductive ex {A : Type} (P : A -> Prop) : Prop where
  | intro (q : A) (h : P q) : ex P
  ```
- You can just write the symbols $ \forall, \exists $ in Lean! (type `\forall` or `\exists`)


