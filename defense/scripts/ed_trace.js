Reveal.on('ready', (ev) => {
    var section = document.getElementById("ed-intro");

    const instr_x_offset = 3;
    const xoffset = [10, 140, 270];
    const mboffset = [50, 180, 310]
    var instroffset = 10;
    var yoffset = 10;
    var ystart = 50;
    const pcoffset = 7;

    let cnt = 0;
    var thcnt = [0, 0, 0];

    const width = 410;
    const height = 170;

    var mailboxes = [[], [], []];

    let root = svg({ "viewBox": `0 0 ${width} ${height}` });
    let bg = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let msgs = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let ctrs = document.createElementNS("http://www.w3.org/2000/svg", "g");
    [bg, msgs, ctrs].forEach(l => {
        root.appendChild(l);
    });

    frame = [];

    for (var i = 0; i < 3; i++) {
        let hl = text(xoffset[i], 15, `h${i + 1}`, "hdl_label");
        bg.appendChild(hl);
        frame.push(hl);

        const mb = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        mb.setAttribute("x", mboffset[i] - 5);
        mb.setAttribute("y", 0);
        mb.setAttribute("width", 70);
        mb.setAttribute("height", 45);
        mb.setAttribute("rx", 5);
        mb.setAttribute("class", "mailbox")
        mb.setAttribute("data-id", `${dataIdCnt++}`);
        bg.appendChild(mb);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const props = {
            "x1": xoffset[i],
            "y1": 25,
            "x2": mboffset[i] - 5,
            "y2": 25,
            "class": "mailbox",
        }
        for (let k in props) {
            line.setAttribute(k, props[k]);
        }
        line.setAttribute("data-id", `${dataIdCnt++}`);
        bg.appendChild(line);

        const sep = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const sepprops = {
            "x1": xoffset[i] - 15,
            "y1": 0,
            "x2": xoffset[i] - 15,
            "y2": height,
            "class": "mailbox",
        }
        for (let k in sepprops) {
            sep.setAttribute(k, sepprops[k]);
        }
        sep.setAttribute("data-id", `${dataIdCnt++}`);
        bg.appendChild(sep);
    }




    function createSlide() {
        const subsection = document.createElement("section");
        subsection.setAttribute("data-auto-animate", true);
        // const header = document.createElement("h1");
        // header.textContent = "Paper II";
        // const header2 = document.createElement("h2");
        // header2.textContent = "Event-Driven Concurrency";

        //subsection.appendChild(header);
        //subsection.appendChild(header2);
        subsection.appendChild(root.cloneNode(true));
        section.appendChild(subsection);
    }

    function instr(hdl, text, classes = "") {
        const tobj = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const id = `P${cnt++}`
        tobj.setAttribute("data-id", id)
        tobj.setAttribute("class", classes)
        tobj.setAttribute("x", xpos[hdl]);
        tobj.setAttribute("y", thcnt[hdl] * instroffset + ystart);
        tobj.innerHTML = text;
        return tobj;
    }

    function addmsg(root, hdl, slot, name, instructions) {
        const container = document.createElementNS("http://www.w3.org/2000/svg", "g");
        container.setAttribute("transform", `translate(${mboffset[hdl]}, ${slot * yoffset * 2 + 5})`);
        // container.setAttribute("x", mboffset[hdl]);
        // container.setAttribute("y",  0);
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "msg");
        rect.setAttribute("x", 0);
        rect.setAttribute("y", 0);
        rect.setAttribute("width", 60);
        rect.setAttribute("height", 15);
        rect.setAttribute("rx", 2);
        rect.setAttribute("data-id", `id-${dataIdCnt++}`);
        container.appendChild(rect);
        root.appendChild(container);
        numinstr = 0;
        var instrs = []

        for (let l in instructions) {
            const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
            txt.textContent = instructions[l];
            txt.setAttribute("class", "instr hidden");
            txt.setAttribute("x", instr_x_offset);
            txt.setAttribute("y", yoffset * (numinstr + 1));
            txt.setAttribute("data-id", `id-${dataIdCnt++}`);
            container.appendChild(txt);

            numinstr += 1;
            instrs.push(txt);
        }

        const nm = document.createElementNS("http://www.w3.org/2000/svg", "text");
        nm.textContent = name;
        nm.setAttribute("class", "instr");
        nm.setAttribute("x", instr_x_offset);
        nm.setAttribute("y", yoffset);
        nm.setAttribute("data-id", `id-${dataIdCnt++}`);
        container.appendChild(nm);

        return {
            hdl: hdl,
            container: container,
            rect: rect,
            instrs: instrs,
            name: nm,
            revealed_instructions: 0,
        }
    }

    function width_of_instr(msg, idx) {
        // Approximate as if using a monospaced font
        // It's not that important.
        const i = msg.instrs[idx];
        // Hard coded here and in css :D
        const fontSize = 8;
        const width = i.textContent.length * fontSize * 0.6;
        console.log(width);
        return width;
    }

    function getpos(msg) {
        const x = xoffset[msg.hdl];
        const y = msg.thcnt * yoffset + ystart;
        return [x, y];
    }

    function updatepos(msg) {
        const [x, y] = getpos(msg);
        msg.container.setAttribute("transform", `translate(${x}, ${y})`);
    }

    function fetchmessage(msg) {
        thcnt[msg.hdl] += 1;
        msg.thcnt = thcnt[msg.hdl];
        updatepos(msg);
        // msg.container.setAttribute("x", xoffset[hdl]);
        // msg.container.setAttribute("y",  mbthcnt[hdl] * yoffset + ystart);
        msg.rect.setAttribute("width", "110");
        //msg.rect.setAttribute("height", `${5 + msg.revealed_instructions * 10}`);

        msg.name.setAttribute("class", "instr hidden");

        reveal_instr(msg);
    }

    function reveal_instr(msg) {
        thcnt[msg.hdl] += 1;
        msg.instrs[msg.revealed_instructions++].setAttribute("class", "instr");
        msg.rect.setAttribute("height", `${5 + msg.revealed_instructions * 10}`);
    }

    let PC = [];
    let PCPOS = [];

    [0, 1, 2].forEach(i => {
        const pcpos = yoffset + ystart + pcoffset;

        let pc = circle(xoffset[i], pcpos, 3, "pctr hidden");
        // pc.setAttribute("cy", pcoffs);
        ctrs.appendChild(pc);

        PC.push(pc);
        PCPOS.push(pcpos);
    });

    function stepPC(hdl) {
        PCPOS[hdl] += yoffset;
        PC[hdl].setAttribute("cy", PCPOS[hdl]);
    }

    let init = addmsg(msgs, 1, 0, "init", ["get(init)","write(x,1)","post(h1,m2)","post(h3, m3)"]);

    createSlide();

    fetchmessage(init);

    createSlide();

    PC[1].setAttribute("class", "pctr");

    createSlide();
    stepPC(1);

    createSlide();

    reveal_instr(init);

    createSlide();
    
    stepPC(1);

    createSlide();

    reveal_instr(init);

    createSlide();

    stepPC(1);
    const m2 = addmsg(msgs, 0, 0, "m2", ["get(m2)", "write(x,2)", "read(x, 3)"]);

    createSlide();

    reveal_instr(init);

    createSlide();

    stepPC(1);
    const m3 = addmsg(msgs, 2, 0, "m3", ["get(m3)", "read(x,1)", "post(h1,m1)"]);
    stepPC(1);
    createSlide();

    fetchmessage(m3);
    PC[2].setAttribute("class", "pctr");
    stepPC(2);
    createSlide();

    reveal_instr(m3);

    createSlide();

    stepPC(2);

    createSlide();

    reveal_instr(m3);


    createSlide();

    stepPC(2);
    stepPC(2);

    let m1 = addmsg(msgs, 0, 1, "m1", ["get(m1)", "read(x,1)", "post(h3, m4)"]);

    createSlide();

    fetchmessage(m1);
    PC[0].setAttribute("class", "pctr");
    stepPC(0);
    
    createSlide();

    reveal_instr(m1);

    createSlide();
    
    stepPC(0);

    createSlide();

    reveal_instr(m1);

    createSlide();

    stepPC(0);
    stepPC(0);

    const m4 = addmsg(msgs, 2, 0, "m4", ["get(m4)", "read(x,2)", "write(x,3)"]);

    createSlide();

    fetchmessage(m2);

    stepPC(0);

    createSlide();

    reveal_instr(m2);

    stepPC(0);

    createSlide();

    fetchmessage(m4);

    stepPC(2);

    createSlide();
    reveal_instr(m4);
    stepPC(2);

    createSlide();

    reveal_instr(m4);
    stepPC(2);
    stepPC(2);

    createSlide();

    reveal_instr(m2);
    stepPC(0);
    stepPC(0);
    
    createSlide();

    [0,1,2].forEach(i => PC[i].setAttribute("class", "pctr hidden"));

    createSlide();


    function swapBox(a, b) {
        // NOTE: only works for messages of equal length for now..
        ab = a.container;

        const thcnt = a.thcnt;

        a.thcnt = b.thcnt;
        b.thcnt = thcnt;
        
        const atr = a.container.getAttribute("transform");

        a.container.setAttribute("transform", b.container.getAttribute("transform"));
        b.container.setAttribute("transform", atr);
    }

    swapBox(m1, m2);

    createSlide(),

    swapBox(m3, m4);
    
    createSlide();

    section = document.getElementById("egraph-intro");

    swapBox(m1, m2);
    swapBox(m3, m4);

    createSlide();

    root.removeChild(bg);

    var mdata = [init, m1, m2, m3, m4];
    yoffset = 20;
    ystart = 0;
    mdata.forEach(msg => updatepos(msg));

    createSlide();

    function labeled_line(root, m1x, m1y, m2x, m2y, edgetp) {
        const lx = (m1x + m2x) / 2;
        const ly = (m1y + m2y) / 2;
        
        const lb = textbox(lx - 7, ly - 7, 14, 14, edgetp.label, edgetp.label + "_l");
        //const box = rect(lx - 5, ly - 5, 10, 10, edgetp.label + "_b");
        // TODO: Compute cx - "spacing" using trig
        // And make arrow: <line> --- </line> <text>lb</text> <line> ---> </line>
        // 1. Midpoint of the full line
        const mx = (m1x + m2x) / 2;
        const my = (m1y + m2y) / 2;

        // 2. Full line length
        const dx = m2x - m1x;
        const dy = m2y - m1y;
        const len = Math.hypot(dx, dy);

        // 3. Unit direction vector
        const ux = dx / len;
        const uy = dy / len;

        // 4. Half-gap distance
        const gap = 12;
        const h = gap / 2;

        // 5. Compute the two cut points
        const cx = mx - ux * h;
        const cy = my - uy * h;

        const cm2x = mx + ux * h;
        const cm2y = my + uy * h;

        // 6. Draw the two visible segments
        const fst = line(m1x, m1y, cx, cy, edgetp.label + "_e");
        const arr = line(cm2x, cm2y, m2x, m2y, edgetp.label + "_e");

        root.appendChild(fst);
        root.appendChild(arr);
        //g.appendChild(box);
        root.appendChild(lb);

        return {
            fst: fst,
            lb: lb,
            lst: arr,
        };
    }
    
    function edge(a, ia, b, ib, edgetp, path = []) {
        const [mb1x, mb1y] = getpos(a);
        const m1yoff = mb1y + ia * instroffset + 7;

        const [mb2x, mb2y] = getpos(b);
        const m2yoff = mb2y + ib * instroffset + 7;

        var m1xo = 0;
        var m2xo = 0;

        var m1yo = 0;
        var m2yo = 0;

        const xspacing = 15;
        const yspacing = 5;

        if (mb1x == mb2x) {
            // Same thread
            m1xo = xspacing;
            m2xo = xspacing;
            if(m1yoff < m2yoff) {
                m1yo = yspacing;
                m2yo = -yspacing;
            }
        } else {
            if (mb1x < mb2x) {
                m1xo = width_of_instr(a, ia);
            } else {
                m2xo = width_of_instr(b, ib);
            }
        }

        const m1x = mb1x + m1xo;
        const m1y = m1yoff + m1yo;
        const m2x = mb2x + m2xo;
        const m2y = m2yoff + m2yo;

        const g = group("edgegroup ");

        var lbl;
        if(path.length > 0) {
            var [lx, ly] = path[0];
            var label_next = false;
            var last = false;
            for(var i = 1; i < path.length; i++) {
                if(path[i] === null) {
                    label_next = true;
                    continue;
                }
                if (i === path.length - 1) {
                    last = true;
                }
                
                let [x,y] = path[i];
                console.log(x, y);
                if(label_next) {
                    label_next = false;
                    lbl = labeled_line(g, lx, ly, x, y, edgetp);
                    // Already added to g as part of labeled_line
                    if(last) {
                        lbl.lst.setAttribute("marker-end", "url(#arrow-tip)");
                    }
                } else {
                    const l = line(lx, ly, x, y, edgetp.label + "_e");
                    if(last) {
                        l.setAttribute("marker-end", "url(#arrow-tip)");
                    }
                    g.appendChild(l);
                }

                lx = x;
                ly = y;
            }           
        } else {

            lbl = labeled_line(g, m1x, m1y, m2x, m2y, edgetp);
            lbl.lst.setAttribute("marker-end", "url(#arrow-tip)");
            
        }
        
        return {
            container: g,
            line: lbl,
        };
    }


    function addedge(m1, i1, m2, i2, tp, path = []) {
        const e1 = edge(m1, i1, m2, i2, tp, path);
        ctrs.appendChild(e1.container);
        return e1;
    }


    const eo = {clazz: "eogroup", label: "eo"};
    const rf = {clazz: "eogroup", label: "rf"};
    const pb = {clazz: "eogroup", label: "pb"};
    const co = {clazz: "eogroup", label: "co"};
    const mo = {clazz: "eogroup", label: "mo"};

    const rx1m1 = addedge(init, 1, m1, 1, rf);
    const rx1m3 = addedge(init, 1, m3, 1, rf);

    const rx2m4 = addedge(m2, 1, m4, 1, rf);
    const rx3m2 = addedge(m4, 2, m2, 2, rf);

    createSlide();

    const pm1 = addedge(m3, 2, m1, 0, pb, [
        [320,48], [400,48], [400, 10], null, [30, 10], [30, 23]
    ]);

    const pm4 = addedge(m1, 2, m4, 0, pb, [
        [10, 48], [0, 48], [0, 160], [400, 160], null, [400, 107], [310, 107]
    ]);

    const pm2 = addedge(init, 2, m2, 0, pb, [
        [140, 48], [130, 48], null, [130, 108], [50, 108]
    ]);
    const pm3 = addedge(init, 3, m3, 0, pb, [
        [200, 58], null, [260, 58], [260, 27], [270, 27]
    ]);

    createSlide();

    const cox12 = addedge(init, 1, m2, 1, co);

    const cox23 = addedge(m2, 1, m4, 2, co);

    createSlide();

    const eo12 = addedge(m1, 2, m2, 0, eo);
    const eo34 = addedge(m3, 2, m4, 0, eo);

    createSlide();

    const mo12 = addedge(init, 2, m3, 2, mo);
    const mo34 = addedge(init, 3, m1, 2, mo);

    createSlide();
    
});
