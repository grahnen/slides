# Dependent Type Theory
What is the type of `sprintf` from C?
- `sprintf "%d is a number" 42 ==> "42 is a number"`
- `sprintf "foo"`
  - `: String`
- `sprintf "%d"`
  - `: Nat -> String`
- `sprintf "%s = %d"`
  - `: String -> Nat -> String`
  
- ```lean
  def sprintf (fmt : String) : sprintfType fmt
  ```
