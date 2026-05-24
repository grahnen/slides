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

    const width = 400;
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

    createSlide();


    createSlide();

    const m1 = addmsg(msgs, 0, 0, "init", ["Write(X,0)", "h2: compute X", "h2: compute Y"]);

    createSlide();

    fetchmessage(m1);

    PC[0].setAttribute("class", "pctr");

    createSlide();

    reveal_instr(m1);

    createSlide();

    stepPC(0);

    createSlide();

    reveal_instr(m1);

    createSlide();

    stepPC(0);
    const m2 = addmsg(msgs, 1, 0, "compute X", ["Write(X,0)", "h3: Check X"]);
    PC[1].setAttribute("class", "pctr");

    createSlide();

    reveal_instr(m1);

    createSlide();

    stepPC(0);
    stepPC(0);
    const m3 = addmsg(msgs, 1, 1, "compute Y", ["Write(Y,1)", "h3: Check Y"]);

    createSlide();

    fetchmessage(m2);

    createSlide();

    reveal_instr(m2);

    createSlide();

    stepPC(1);

    createSlide();

    reveal_instr(m2);

    createSlide();

    stepPC(1);
    stepPC(1);
    const m4 = addmsg(msgs, 2, 0, "check X", ["Read(X,0)", "h2: redo X"])
    PC[2].setAttribute("class", "pctr");

    createSlide();

    fetchmessage(m4);

    createSlide();

    reveal_instr(m4);

    createSlide();

    stepPC(2);

    createSlide();

    fetchmessage(m3);

    createSlide();

    reveal_instr(m3);

    createSlide();

    stepPC(1);

    createSlide();

    reveal_instr(m3);

    createSlide();


    reveal_instr(m4);

    createSlide();

    stepPC(2);
    stepPC(2);

    const m5 = addmsg(msgs, 1, 0, "compute X", ["Write(X,1)", "h3: Check X"])

    createSlide();

    const m6 = addmsg(msgs, 2, 1, "check Y", ["Read(Y,1)", "h1: Y is good"]);
    const m7 = addmsg(msgs, 2, 0, "check X", ["Read(X,1)", "h1: X is good"]);

    const m8 = addmsg(msgs, 0, 0, "use Y", ["Read(Y,1)"]);
    const m9 = addmsg(msgs, 0, 1, "use X", ["Read(X,1)"]);

    [m5, m6, m7, m8, m9].forEach(ls => {
        fetchmessage(ls);
        ls.instrs.forEach(_ => reveal_instr(ls));
    });

    stepPC(0);
    stepPC(0);
    stepPC(0);
    stepPC(0);

    stepPC(1);
    stepPC(1);
    stepPC(1);
    stepPC(1);
    stepPC(1);

    stepPC(2);
    stepPC(2);
    stepPC(2);
    stepPC(2);
    stepPC(2);
    stepPC(2);

    createSlide();

    PC.forEach(pc => pc.setAttribute("class", "pctr hidden"));

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

    swapBox(m8, m9);

    createSlide();

    swapBox(m3, m5)

    createSlide();

    section = document.getElementById("egraph-intro");

    createSlide();

    root.removeChild(bg);

    var mdata = [m1, m2, m3, m4, m5, m6, m7, m8, m9];
    yoffset = 15;
    ystart = 0;
    mdata.forEach(msg => updatepos(msg));

    createSlide();

    
    
    const eo = {clazz: "eogroup", label: "eo"};
    const rf = {clazz: "eogroup", label: "rf"};
    const pb = {clazz: "eogroup", label: "pb"};

    // H1
    const e19 = addedge(m1, 2, m9, 0, eo);
    const e98 = addedge(m9, 0, m8, 0, eo);

    //H2
    const e25 = addedge(m2, m2.instrs.length - 1, m5, 0, eo);
    const e53 = addedge(m5, m5.instrs.length - 1, m3, 0, eo);

    //H3
    const e46 = addedge(m4, m4.instrs.length - 1, m6, 0, eo);
    const e67 = addedge(m6, m6.instrs.length - 1, m7, 0, eo);

    createSlide();

    // RF
    const x0c = addedge(m2, 0, m4, 0, rf);
    const m1xc = addedge(m5, 0, m7, 0, rf);
    const m1xa = addedge(m5, 0, m9, 0, rf);

    const m1yc = addedge(m3, 0, m6, 0, rf);
    const m1ya = addedge(m3, 0, m8, 0, rf);

    createSlide();


    // Pb
    const p2 = addedge(m1, 1, m2, 0, pb);
    const p3 = addedge(m1, 2, m3, 0, pb);
    const p4 = addedge(m2, 1, m4, 0, pb);
    const p5 = addedge(m4, 1, m5, 0, pb);
    const p6 = addedge(m3, 1, m6, 0, pb);
    const p7 = addedge(m5, 1, m7, 0, pb);
    const p8 = addedge(m6, 1, m8, 0, pb);
    const p9 = addedge(m7, 1, m9, 0, pb);

    createSlide();

    
});
