#!/usr/bin/env sh


for f in histories/*.hist; do
    # echo "\documentclass[tikz,convert=pdf2svg]{standalone}
    #      \input figure_macros
    #      \usepackage{timeline}
    #      \usepackage{xcolor}
    #      \directlua{texh = require('texhist')}
    #      \begin{document}
    #      \begin{timeline}
    #      \directlua{tex.print(texh.h2t('$(basename $f)', false))}
    #      \end{timeline}
    #      \end{document}" > $f.tex
    # lualatex -shell-escape $f.tex
    echo $f
    ./util/run_alg.py $f $1
done
