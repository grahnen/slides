#!/bin/env python3
import glob
import sys
import re
from functools import reduce

def overlaps(a,b,c,d):
    return not ((b < c) or (d < a))

history_root = "../oolin/histories/simple/"

call_regex = re.compile(r' *\[(\d+)\] call ([a-zA-Z]+) ?\(?([a-z0-9A-Z\?<,>]*)\)?')
ret_regex = re.compile(r' *\[(\d+)\] return ?([a-z0-9A-Z]*)')
skip_regex = re.compile(r'skip')
linpt_regex=re.compile(r'linpt (\d+)')

def get_thr(thrs):
    i = 1
    while i in thrs.values():
        i += 1
    return i

def xpos(ctr):
    return 2 * ctr * width

def ypos(thr):
    return 4 * thr * height

width=40
height=40

fontsize=32

def hist2tex(history, condense = True):
    covers = {}
    ctr = 0
    lbctr = 0
    res = ""
    linpts = ""
    threads = {}
    labels = {}
    max_thr = 1
    for line in history:
        skiprm = skip_regex.match(line)
        linrm = linpt_regex.match(line)
        crm = call_regex.match(line)
        rrm = ret_regex.match(line)
        if crm != None:
            ctr += 1
            lbctr +=1
            th = get_thr(threads) if condense else int(crm.group(1))
            max_thr = max(max_thr, th)
            threads[int(crm.group(1))] = th
            if crm.group(2) == 'pop':
                g = covers[crm.group(3)]
                covers[crm.group(3)] = (g[0], g[1], ctr)
            res += f'''<svg x="{xpos(ctr)}"
                            y="{ypos(th)}"
                            width="{width}"
                            height="{height}"
                            class="event_box text_box val_{crm.group(3)} thr_{th}"
                            id="call_{crm.group(2)}_{crm.group(3)}"
                            data-id="call_{crm.group(2)}_{crm.group(3)}">\n'''
            res += f'<text x="50%" y="50%" font-size="{fontsize}">{lbctr}</text>\n'
            res += f'</svg>'
            labels[th] = (ctr, crm.group(2), crm.group(3))
        elif rrm != None:
            ctr += 1
            lbctr +=1
            th = threads[int(rrm.group(1))] if condense else int(rrm.group(1))
            thp = threads.pop(int(rrm.group(1)))
            max_thr = max(th, max_thr)
            (cc, op, vl) = labels.pop(th)
            if op == 'push':
                covers[vl] = (ctr, th, None)
            res += f'''<svg x="{xpos(ctr)}"
                            y="{ypos(th)}"
                            width="{width}"
                            height="{height}"
                            class="event_box text_box val_{vl} thr_{th}"
                            id="ret_{op}_{vl}"
                            data-id="ret_{op}_{vl}">\n'''
            res += f'<text x="50%" y="50%" font-size="{fontsize}">{lbctr}</text>\n'
            res += f'</svg>'

            res += f'''
            <path d="M {xpos(cc) + width/2},{ypos(th)} L {xpos(cc) + width/2},{ypos(th) - (height/2)} L {xpos(ctr) + width/2},{ypos(th) - (height/2)} L {xpos(ctr) + width/2},{ypos(th)}"
                  class="tl_path val_{vl} thr_{th}"
                  id="path_{op}_{vl}"
                  data-id="path_{op}_{vl}"
                  stroke="#FFFFFF"
            />'''

            res += f'''
            <svg x="{xpos(cc)}"
                 y="{ypos(th) - (2 * height)}"
                 width="{(xpos(ctr) - xpos(cc)) + width}"
                 height="{height}"
                 class="text_box label_box val_{vl} thr_{th}"
                 id="label_{op}_{vl}"
                 data-id="label_{op}_{vl}">
            <text class="tl-label val_{vl}" x="50%" y="50%" fill="#FFFFFF" >{op}({vl})</text>
            </svg>
            '''


        elif skiprm is not None:
            ctr += 1
            lbctr += 1
        elif linrm is not None:
            ctr += 1
            th = int(linrm.group(1))
            (cc, op, vl) = labels[th]
            linpts += f'''
            <circle
                cx="{xpos(ctr)}"
                cy="{ypos(th) - height/2}"
                r="{width/2}"
                class="linpt"
                opacity="0"
                id="lin_{op}_{vl}"
                data-id="lin_{op}_{vl}" />\n'''

    coverls = []

    for (v, (s, th, t)) in covers.items():
        coverls.append((s,t))

        h = ypos(th)
        res +=f'''
            <path class='cover {v}_cover' d='M {xpos(s) + width/2},{h} L {xpos(t) + width/2},{h}' stroke='firebrick' stroke-width='8' data-id="cover_{v}_path" opacity="0" />
            '''

    coverls = sorted(coverls, key=lambda x: x[0])

    def mkarea(acc, x):
        lb,ub,tp = acc[-1]
        s,t = x
        if s < ub:
            acc[-1] = (lb, max(t, ub), tp)
            return acc
        else:
            acc.append((ub, s, "D"))
            acc.append((s,t,"P"))
            return acc
    fst = coverls[0]
    init = [ (0, fst[0], "D"), (fst[0], fst[1], "P") ]
    total_cover = reduce(mkarea, coverls[1:], init)
    total_cover.append((total_cover[-1][1], ctr + 1, "D"))

    content = ""
    for (s,t,tp) in total_cover:
        c = "yellow" if tp == "P" else "green"
        content +=f'''
        <rect class="area_{tp} area"
              x="{xpos(s) + width/2}"
              y="0" width="{xpos(t) - xpos(s)}"
              height="{ypos(max_thr + 1)}"
              fill="{c}"
              opacity="0"></rect>
        '''

    return (content + res + linpts, max_thr,ctr)


def h2t(filename):
    with open(filename) as f:
        d = f.readlines()
    return hist2tex(d, False)

if __name__=="__main__":
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} [filename] <num_threads>")
        exit(-1)
    svg, max_thr, ctr = h2t(sys.argv[1])
    if len(sys.argv) == 3:
        max_thr = int(sys.argv[2])

    sys.stdout.write(f'<svg width="100%" height="100%" viewBox="0 0 {xpos(ctr+1)} {ypos(max_thr+1)}">')
    sys.stdout.write(svg)
    sys.stdout.write("</svg>")
