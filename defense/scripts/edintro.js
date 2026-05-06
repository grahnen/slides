{
    let section = document.getElementById("ed-intro");

    const instr_x_offset = 3;
    const xoffset = [10, 90, 160];
    const yoffset = 10;
    const ystart = 20;
    const pcoffset = 27;
    
    let cnt = 0;
    var thcnt = [0, 0, 0];
    


    let root = svg({"viewBox": "0 0 220 200"});
    let msgs = svg();
    let ctrs = svg();
    [msgs, ctrs].forEach(l => {
        root.appendChild(l);
    });

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
        tobj.setAttribute("y", thcnt[hdl] * yoffset + ystart);
        tobj.innerHTML = text;
        return tobj;
    }

    function addmsg(root, hdl, instructions) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "msg");
        rect.setAttribute("x", xoffset[hdl]);
        rect.setAttribute("y",  thcnt[hdl] * yoffset + ystart);
        rect.setAttribute("width", "60");
        rect.setAttribute("height", `${5 + instructions.length * 10}`);
        rect.setAttribute("rx", "5");
        rect.setAttribute("data-id", `id-${dataIdCnt++}`);
        root.appendChild(rect);

        thcnt[hdl] += 1;
        var instrs = []
        for (let l in instructions) {
            const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
            txt.textContent = instructions[l];
            txt.setAttribute("class", "instr hidden");
            txt.setAttribute("x", xoffset[hdl] + instr_x_offset);
            txt.setAttribute("y", thcnt[hdl] * yoffset + ystart);
            txt.setAttribute("data-id", `id-${dataIdCnt++}`);
            root.appendChild(txt);

            thcnt[hdl] += 1;

            instrs.push(txt);
        }
        return [rect, instrs];
    }

    let PC = [];
    let PCPOS = [];

    [0,1,2].forEach(i => {
        let pc = circle(xoffset[i], pcoffset, 3, "pctr hidden");
        pc.setAttribute("cy", pcoffset);
        ctrs.appendChild(pc);
        PC.push(pc);
        PCPOS.push(pcoffset);
    });

    function stepPC(hdl) {
        PCPOS[hdl] += yoffset;
        PC[hdl].setAttribute("cy", PCPOS[hdl]);
    }
    
    createSlide();
    [0,1,2].forEach(i => {
        let hl = textbox(xoffset[i], 0, 60, 25, `h${i + 1}`, "hdl_box");
        msgs.appendChild(hl);
    });
    
    createSlide();

    const [m1box, m1] = addmsg(msgs, 0, ["Write(X, 0)", "h2: compute X", "h2: compute Y"]);

    createSlide();

    PC[0].setAttribute("class", "pctr");

    createSlide();

    m1[0].setAttribute("class", "instr");

    createSlide();

    stepPC(0);

    createSlide();

    m1[1].setAttribute("class", "instr");

    createSlide();

    stepPC(0);
    const [m2box, m2] = addmsg(msgs, 1, ["Write(X, 0)", "h3: Check X"]);
    PC[1].setAttribute("class", "pctr");
    
    createSlide();

    m1[2].setAttribute("class", "instr");

    createSlide();

    stepPC(0);
    stepPC(0);
    const [m3box, m3] = addmsg(msgs, 1, ["Write(Y,1)", "h3: Check Y"]);

    createSlide();

    m2[0].setAttribute("class", "instr");
    
    createSlide();
    
    stepPC(1);

    createSlide();

    m2[1].setAttribute("class", "instr");

    createSlide();

    stepPC(1);
    stepPC(1);
    const [m4box, m4] = addmsg(msgs, 2, ["Read(X, 0)", "h2: redo X"])
    PC[2].setAttribute("class", "pctr");

    createSlide();

    m4[0].setAttribute("class", "instr");

    createSlide();

    stepPC(2);

    createSlide();

    m3[0].setAttribute("class", "instr");

    createSlide();

    stepPC(1);

    createSlide();

    m3[1].setAttribute("class", "instr");

    createSlide();

    m4[1].setAttribute("class", "instr");

    createSlide();

    stepPC(2);
    stepPC(2);
    
    const [m5box, m5] = addmsg(msgs, 1, ["Write(X, 1)", "h3: Check X"])

    createSlide();

    const [m6box, m6] = addmsg(msgs, 2, ["Read(Y, 1)", "h1: Y is good"]);
    const [m7box, m7] = addmsg(msgs, 2, ["Read(X, 1)", "h1: X is good"]);

    const [m8box, m8] = addmsg(msgs, 0, ["Read(Y, 1)"]);
    const [m9box, m9] = addmsg(msgs, 0, ["Read(X, 1)"]);

    [m5, m6, m7, m8, m9].forEach( ls => ls.forEach(txt => txt.setAttribute("class", "instr")));

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
        const [ab, am] = a;
        const [bb, bm] = b;

        const aby = ab.getAttribute("y");
        ab.setAttribute("y", bb.getAttribute("y"));
        bb.setAttribute("y", aby);
        
        Iterator.zip([am, bm]).forEach(ab => {
            const [a, b] = ab;
            const ay = a.getAttribute("y");
            a.setAttribute("y", b.getAttribute("y"));
            b.setAttribute("y", ay);
        });
    }

    swapBox([m8box, m8], [m9box, m9]);
    
    createSlide();

    swapBox([m3box, m3], [m5box, m5])

    createSlide();

    const edintro_finished = root;
}
