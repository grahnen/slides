# Example: sprintf
- ```lean
  inductive format : Type where
  | d
  | s
  | c : Char -> format
  deriving Repr

  def to_format : List Char -> List format
  | [] => []
  | '%' :: 'd' :: xs  => format.d :: to_format xs
  | '%' :: 's' :: xs  => format.s :: to_format xs
  | x :: xs           => format.c x :: to_format xs
  ```
- ```lean
  def sprintfType' : List format -> Type
  | [] => String
  | format.d :: xs => Nat -> sprintfType' xs
  | format.s :: xs => String -> sprintfType' xs
  | format.c _ :: xs => sprintfType' xs

  def sprintfType (fmt : String) : Type := 
      sprintfType' (to_format fmt.toList)
  ```

- ```lean
  def sprintf' (fmt : List format) (a : List Char) : sprintfType' fmt :=
    match fmt with
    | [] => String.ofList a
    | format.d :: xs => fun d : Nat => sprintf' xs (a ++ d.repr.toList)
    | format.s :: xs => fun d : String => sprintf' xs (a ++ d.toList)
    | format.c x :: xs => sprintf' xs (a ++ [x])

  def sprintf (fmt : String) : sprintfType fmt :=
    sprintf' (to_format fmt.toList) []

  #eval sprintf "%s = %d" "x" 4 -- "x = 4"
  #eval sprintf "%s = %d + %d" "x" 5 4 "x = 4 + 5"
  ```
