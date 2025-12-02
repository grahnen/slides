# Assignment: Nim
- Two players take turns taking (one or two) stones from a pile
- Whoever takes the last stone wins.
- Formalised as a transition system
  ```lean
  inductive Step : NimState -> NimState -> Prop where ...
  ```
- You won't need anything outside of slides \& comments in `Nim.lean`!
- If you want to learn more: https://github.com/lean-forward/logical_verification_2025
