# Let's prove things!
```lean
example :  ∀ a, ∃ b, a + 3 = b := fun a => ⟨a + 3, rfl⟩

example (α : Type) (p q : α → Prop) :
    (∀ x : α, p x ∧ q x) → ∀ y : α, p y :=
  fun h : ∀ x : α, p x ∧ q x =>
  fun y : α =>
  (h y).left
```
- The programming notation used above quickly becomes cumbersome!
- We will prove things using tactics instead!
  ```lean
  example ∀ a, ∃ b, a + 3 = b := by
    intro y
    exists a + 3
  ```
