#!/bin/env python3
import glob
import sys
import re
from functools import reduce
from dataclasses import dataclass
from collections import defaultdict as dd

mmhl = "#0000ff"
hlL = mmhl
hlR = "#FF008F"

def overlaps(a,b,c,d):
    return not ((b < c) or (d < a))


def evt_box(op, vl, th, ctr, lb_ctr, extra_classes = ""):
        return f'''<svg x="{xpos(ctr)}"
        y="{ypos(th)}"
        width="{width}"
        height="{height}"
        class="event_box text_box val_{vl} thr_{th} {extra_classes}"
        id="call_{op}_{vl}"
        data-id="call_{op}_{vl}">\n
        <text x="50%" y="50%" font-size="{fontsize}">{lb_ctr}</text>\n
        </svg>\n
        '''

def mklabel(xmin, xmax, ypos, op, vl, fill = "#ffffff", extra_classes = "", custom_id = None):
        id = f"label_{op}_{vl}"
        if custom_id is not None:
            id = f"label_{custom_id}"

        return f'''
        <svg x="{xmin + (xmax - xmin) / 2 - (label_width/2)}"
        y="{ypos}"
        width="{label_width}"
        height="{height}"
        class="text_box label_box val_{vl} {extra_classes}"
        id="{id}"
        data-id="{id}">
        <text class="tl-label val_{vl} {extra_classes}" x="50%" y="50%" fill="{fill}">{op}({vl})</text>
        </svg>
        '''

def emptyop(th, i, call, ret, fill):
    o = Operation(th, call, call, ret, ret, None)
    op = "pop"
    v = f"bot{i}"
    return o.evt_boxes(op, v) + o.path(op,v) + o.label(op, "⊥", fill, custom_id = v)

@dataclass
class Operation:
    th : int
    call: int
    call_lb : int
    ret : int
    ret_lb : int
    linpt : float


    def lin_circle(self, op, vl, extra_classes = ""):
        if self.linpt is None:
            return ""
        return f'''
        <circle
        cx="{xpos(self.linpt)}"
        cy="{ypos(self.th) - height/2}"
        r="{width/2}"
        class="linpt {extra_classes}"
        opacity="0"
        id="lin_{op}_{vl}"
        data-id="lin_{op}_{vl}" />\n'''

    def evt_boxes(self, op, vl, extra_classes = ""):
        return evt_box(op, vl, self.th, self.call, self.call_lb, extra_classes) + evt_box(op, vl, self.th, self.ret, self.ret_lb, extra_classes)

    def path(self, op, vl, extra_classes = ""):
        # return f'''
        # <rect
        # x="{xpos(self.call) + width/2}"
        # y="{ypos(self.th)}"
        # width="{xpos(self.ret) - xpos(self.call)}"
        # height="{height/2}"
        # data-id="path_{op}_{vl}"
        # class="tl_path val_{vl} thr_{self.th} {extra_classes}"
        # id="path_{op}_{vl}"
        # fill="none"
        # />
        # '''
        return f'''
        <path d="M {xpos(self.call) + width/2},{ypos(self.th)} L {xpos(self.call) + width/2},{ypos(self.th) - (height/2)} L {xpos(self.ret) + width/2},{ypos(self.th) - (height/2)} L {xpos(self.ret) + width/2},{ypos(self.th)}"
        class="tl_path val_{vl} thr_{self.th} {extra_classes}"
        id="path_{op}_{vl}"
        data-id="path_{op}_{vl}"
        stroke="#FFFFFF"
        />\n'''

    def label(self, op, vl, fill = "#ffffff", extra_classes = "", custom_id = None):
        y = ypos(self.th) - (2 * height)
        return mklabel(xpos(self.call), xpos(self.ret), y, op, vl, fill, extra_classes, custom_id)

@dataclass
class Value(dict):
    vl : str = "X"
    vl_id : int = 0

    def evt_boxes(self, extra_classes = ""):
        return "".join(o.evt_boxes(op, self.vl, self.vl_id, extra_classes) for o,op in self.ops.items())

    def cover(self):
        if 'push' in self.keys():
            return (self['push'].ret, self['pop'].call if 'pop' in self.keys() else 1000)

        else:
            return (self['enq'].ret, self['deq'].call  if 'deq' in self.keys() else 1000)

    def outer(self):
        if 'push' in self.keys():
            return (self['push'].call, self['pop'].ret if 'pop' in self.keys() else 1000)
        else:
            return (self['enq'].call, self['deq'].ret  if 'pop' in self.keys() else 1000)

    def cover_line(self, th, extra):
        (s, t) = self.cover()
        h = ypos(th)
        return f'''
        <path class='cover {self.vl}_cover {extra}' d='M {xpos(s) + width/2},{h} L {xpos(t) + width/2},{h}' stroke='firebrick' stroke-width='8' data-id="cover_{self.vl}_path" />
        '''

    def outside_of(self, lb, ub):
        (s, t) = self.outer()
        return s <= lb and t >= ub

@dataclass
class State:
    done: list[(str, chr)]
    remaining: dict[str, Value]
    ignored: dict[str, Value]
    empties: list[(int, int, int)]
    max_x: int
    max_y = 0

    def first_none(self):
        ctr = 0
        while ctr < len(self.done):
            if self.done[ctr] is None:
                return ctr
            ctr += 1
        return -1

    def parsed(self):
        self.done = [None for n in range(2 * len(self.remaining))] + [None for n in self.empties]
        #self.max_x = max(op.ret for vl,ops in self.remaining.items() for nm,op in ops.items()) max is just ctr
        self.max_y = max(op.th for vl,ops in self.remaining.items() for nm, op in ops.items())

    def rem_iter(self):
        for vl, ops in self.remaining.items():
            for op, s in ops.items():
                yield (vl, op, s)

        for vl, ops in self.ignored.items():
            for op, s in ops.items():
                yield (vl, op, s)

    def segments(self):
        def mkarea(acc, x):
            lb,ub,tp = acc[-1]
            s,t = x
            if s < ub:
                acc[-1] = (lb, max(t, ub), tp)
            else:
                acc.append((ub, s, "D"))
                acc.append((s,t,"P"))
            return acc

        coverls = [ v.cover() for vl, v in self.remaining.items() ]
        if len(coverls) == 0:
            return []
        fst = coverls[0]
        init = [ (0, fst[0], "D"), (fst[0], fst[1], "P") ]
        total_cover = reduce(mkarea, coverls[1:], init)
        total_cover.append((total_cover[-1][1], self.max_x, "D"))
        return total_cover

    def draw_segments(self, extra_classes):
        segs = self.segments()
        content = ""
        for (s,t,tp) in segs:
            c = "yellow" if tp == "P" else "green"
            content +=f'''
            <rect class="area_{tp} area {extra_classes}"
            data-id="area_{s}_{t}_{tp}"
            x="{xpos(s) + width/2}"
            y="0" width="{xpos(t) - xpos(s)}"
            height="{ypos(max_thr + 1)}"
            fill="{c}"
            opacity="0.3"></rect>
            '''
        return content

    def minmax(self):
        sg = self.segments()
        s = sg[1][0]
        t = sg[-2][1]

        return (vl for vl, x in self.remaining.items() if x.outside_of(s,t))

    def print_done(self, ymax = max_y):
        l = len(self.done)
        res = ""
        for i,q in enumerate(self.done):
            if q is not None:
                (op, vl) = q
                res += mklabel((i + 1) * (label_width + width), (i + 2) * (label_width + width), ypos(ymax), op, vl)

        return res

    def print(self, max_thr, hide = [], hl = {}):
        ym = self.max_y if max_thr is None else max_thr
        def extra(key, hide, vl = None):
            return "hidden " if key in hide else "" + "ignored" if vl in self.ignored else ""
        def getfill(vl):
            return hl[vl] if vl in hl else "#ffffff"

        parts = {
            "preamble": f'<svg width="100%" height="80%" viewBox="0 0 {xpos(hist.max_x + 1)} {ypos(ym+2)}">', # Add one extra to ymax, so we can fit done
            "segs": self.draw_segments(extra("segs", hide)),
            "ev_boxes": "".join(s.evt_boxes(op, vl,extra("ev_boxes", hide, vl)) for (vl, op, s) in self.rem_iter()),
            "paths": "".join(s.path(op, vl, extra("paths", hide, vl)) for vl,op,s in self.rem_iter()),
            "linpts": "".join(s.lin_circle(op, vl) for vl, op, s in self.rem_iter()),
            "empties": "".join(emptyop(th, i, call, ret, getfill(None)) for (th, i, call, ret) in self.empties),
            "covers": "".join(v.cover_line(v['push' if 'push' in v else 'enq'].th, extra("covers", hide, vl)) for vl, v in self.remaining.items()),
            "labels": "".join(s.label(op, vl, getfill(vl), extra("labels", hide, vl)) for vl,op,s in self.rem_iter()),
            "done": self.print_done(ym+1),
            "postamble": "</svg>",
        }

        return "".join(v for k,v in parts.items())

    def is_done(self):
        return len(self.remaining) == 0

    def split(self, segment):
        (l,r,tp) = segment
        L = {}
        R = {}
        for v,vl in self.remaining.items():
            vlret = vl['push' if 'push' in vl else 'enq'].ret
            if vlret <= l:
                L[v] = vl
            else:
                R[v] = vl

        Lh = State(self.done, L, R, [], self.max_x)
        Rh = State(self.done, R, {}, [], self.max_x)
        Lh.max_x = self.max_x
        Rh.max_x = self.max_x
        return (Lh, Rh)

    def steps(self, max_thr):
        #What to skip when
        base = ["linpts", "covers", "segs"]
        covs = ["linpts", "segs"]
        segs = ["linpts", "covers"]

        if len(self.empties) > 0:
            emphl = { None: mmhl }
            yield self.print(max_thr, base, emphl)
            yield self.print(max_thr, covs, emphl)
            yield self.print(max_thr, segs, emphl)
            msegs = self.segments()
            def in_open(seg):

                (th, i, c, r) = seg
                for (s, t, tp) in msegs:

                    if tp == "D" and overlaps(c,r,s,t):
                        print(s,t,tp,th,c,r)
                        return True
                return False


            self.empties = [o for o in self.empties if not in_open(o)]
            print("unhandled: ", self.empties)

        if len(self.empties) > 0:
            print("remaining: ", self.empties)
            yield self.print(max_thr, base, emphl)
            return None



        yield self.print(max_thr, base)
        yield self.print(max_thr, covs)
        yield self.print(max_thr, segs)

        mm = list(self.minmax())
        if len(mm) > 0:
            hlmm = { v: mmhl for v in mm }
            yield self.print(max_thr, segs, hlmm)
            i = self.first_none()
            last_idx = i + len(self.remaining) * 2 - 1

            for j,v in enumerate(mm):
                self.done[i + j] = ('push', v)
                self.done[last_idx - j] = ('pop', v)

            for q in mm:
                self.remaining.pop(q)

            yield self.print(max_thr, base)
            if len(self.remaining) > 0:
                yield self.print(max_thr, covs)
                yield self.print(max_thr, segs)

        msegs = self.segments()
        if len(msegs) > 3:
            L,R = self.split(msegs[1])
            hlLR = { v: (hlL if v in L.remaining else hlR) for v in self.remaining }
            yield self.print(max_thr, segs, hlLR)

            for l in L.steps(max_thr):
                yield l

            R.done = L.done
            for r in R.steps(max_thr):
                yield r

call_regex = re.compile(r' *\[(\d+)\] call ([a-zA-Z]+) ?\(?([a-z0-9A-Z\?<,>]*)\)?')
ret_regex = re.compile(r' *\[(\d+)\] return ?([a-z0-9A-Z]*)')
skip_regex = re.compile(r'skip')
linpt_regex=re.compile(r'linpt (\d+)')

def xpos(ctr):
    return 2 * ctr * width

def ypos(thr):
    return 4 * thr * height

width=40
label_width = width * 4
height=40

fontsize=32

def parse(history):
    max_thr = 0
    ctr = 0
    lbctr = 0
    vls = dd(lambda: Value())
    active = {}
    empties = []
    empctr = 0
    for line in history:
        skiprm = skip_regex.match(line)
        linrm = linpt_regex.match(line)
        crm = call_regex.match(line)
        rrm = ret_regex.match(line)

        if crm is not None:
            ctr += 1
            lbctr += 1
            th = int(crm.group(1))
            max_thr = max(max_thr, th)
            if crm.group(3) == "":
                active[th] = (None, (ctr, empctr))
                empctr += 1
                continue
            vls[crm.group(3)][crm.group(2)] = Operation(th, ctr, lbctr, None, None, None)
            vls[crm.group(3)].vl = crm.group(3)
            active[th] = (crm.group(3), crm.group(2))
        if rrm is not None:
            ctr += 1
            lbctr += 1
            th = int(rrm.group(1))
            max_thr = max(th, max_thr)
            (vl, op) = active[th]
            if vl is None:
                call, empid = op
                empties.append((th, empid, call, ctr))
                continue
            vls[vl][op].ret = ctr
            vls[vl][op].ret_lb = lbctr

        if skiprm is not None:
            ctr += 1
            #lbctr += 1
        if linrm is not None:
            ctr += 1
            th = int(linrm.group(1))
            (vl, op) = active[th]
            vls[vl][op].linpt = ctr

    res = State(
        [],
        dict(vls),
        {},
        empties,
        ctr
    )
    return res

def h2t(filename):
    with open(filename) as f:
        d = f.readlines()
    h = parse(d)
    h.parsed()
    return h

if __name__=="__main__":
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} [filename] <num_threads>")
        exit(-1)

    max_thr = int(sys.argv[2])
    hist = h2t(sys.argv[1])
    ctr = 0
    #Write first
    for q in hist.steps(max_thr):
        with open(f'{sys.argv[1]}.{ctr:003}.svg', 'w') as f:
            f.write(q)
        ctr += 1
