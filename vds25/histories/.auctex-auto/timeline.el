;; -*- lexical-binding: t; -*-

(TeX-add-style-hook
 "timeline"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-package-options
                     '(("tikz" "") ("calc" "") ("etoolbox" "") ("xparse" "") ("xargs" "")))
   (add-to-list 'LaTeX-verbatim-environments-local "lstlisting")
   (add-to-list 'LaTeX-verbatim-environments-local "semiverbatim")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "lstinline")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "href")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperimage")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperbaseurl")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "nolinkurl")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "url")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "path")
   (add-to-list 'LaTeX-verbatim-macros-with-delims-local "lstinline")
   (add-to-list 'LaTeX-verbatim-macros-with-delims-local "path")
   (TeX-run-style-hooks
    "tikz"
    "calc"
    "etoolbox"
    "xparse"
    "xargs")
   (TeX-add-symbols
    '("tlcall" ["argument"] 2)
    '("tlret" ["Text"] "Text")
    '("rmv" 1)
    '("add" 1)
    '("drawlabel" 1)
    '("breakcall" 1)
    "hlstyle"
    "defaultstyle"
    "steptimeline")
   (LaTeX-add-environments)
   (LaTeX-add-counters
    "ctr"))
 :latex)

