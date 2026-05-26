Reveal.on('ready', (ev) => {
    var section = document.getElementById("msi_anim");

    const width = 600;
    const height = 800;

    const radius = 20;
    
    let root = svg({ "viewBox": `0 0 ${width} ${height}` });
    let bg = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let nodes = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let arrows = document.createElementNS("http://www.w3.org/2000/svg", "g");
    [bg, nodes, arrows].forEach(l => {
        root.appendChild(l);
    });   

    frame = [];

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

    function node(x, y, text) {
        const circ = circle(x, y, radius);
        circ.setAttribute("class", "nodecirc");
        const tobj = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tobj.setAttribute("data-id", `${dataIdCnt++}`)
        tobj.setAttribute("class", "nodetext");
        tobj.setAttribute("x", x);
        tobj.setAttribute("y", y);
        tobj.innerHTML = text;

        bg.appendChild(circ);
        nodes.appendChild(tobj);
        return {
            circle: circ,
            text: tobj,
            x: x,
            y: y,

          }
    }

    function calc_bend(from, to, angle) {
        let delta_x = to.x - from.x
        let delta_y = to.y - from.y
        let length = Math.sqrt(delta_x ** 2 + delta_y ** 2);
        
        let dx = delta_x / length;
        let dy = delta_y / length;

        let rx = Math.cos(angle) * dx - Math.sin(angle) * dy
        let ry = Math.sin(angle) * dx + Math.cos(angle) * dy

        // Other dir is inverted
        let ex = - Math.cos(angle) * dx - Math.sin(angle) * dy
        let ey = - Math.cos(angle) * dy + Math.sin(angle) * dx

        let startx = from.x + rx * radius;
        let starty = from.y + ry * radius;

        let stopx = to.x + ex * radius;
        let stopy = to.y + ey * radius;
        // Control point
        let cx = from.x + delta_x / 2 - dy * radius * Math.sign(angle)
        let cy = from.y + delta_y / 2 + dx * radius * Math.sign(angle)

        let center_x = 0.25 * startx + 0.5 * cx + 0.25 * stopx
        let center_y = 0.25 * starty + 0.5 * cy + 0.25 * stopy
        
        return {   
            d: `M ${startx},${starty} Q ${cx},${cy},${stopx},${stopy}`,
            startx: startx,
            starty: starty,
            stopx: stopx,
            stopy: stopy,
            angle: Math.atan(dy / dx) * 180 / Math.PI,
            control_x: cx,
            control_y: cy,
            center_x: center_x,
            center_y: center_y,
        }
    }

    function mkedge(from, to, e, angle) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const curve = calc_bend(from, to, angle)
        path.setAttribute("d", curve.d);
        path.setAttribute("class", "arrow_e");
        path.setAttribute("marker-end", "url(#arrow-tip)");
        path.setAttribute("data-id", `${dataIdCnt++}`);

        const lb = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lb.innerHTML = e;
        lb.setAttribute("class", "arrow_l");
        lb.setAttribute("text-anchor", "middle");
        lb.setAttribute("dominant-baseline", "middle");
        lb.setAttribute("alignment-baseline", "middle");
        lb.setAttribute("x", curve.center_x);
        lb.setAttribute("y", curve.center_y);
        lb.setAttribute("data-id", `${dataIdCnt++}`);

        arrows.appendChild(path);
        arrows.appendChild(lb);
        return {
            path: path,
            lb: lb
        }
    }

    function mkloop(node, e, angle, angle_width = 1) {
        let dx = Math.cos(angle);
        let dy = Math.sin(angle);

        let startx = node.x + Math.cos(angle - angle_width / 2) * radius;
        let starty = node.y + Math.sin(angle - angle_width / 2) * radius;

        let stopx = node.x + Math.cos(angle + angle_width / 2) * radius;
        let stopy = node.y + Math.sin(angle + angle_width / 2) * radius;

        let cx1 = node.x + Math.cos(angle - angle_width / 2) * radius * 3;
        let cy1 = node.y + Math.sin(angle - angle_width / 2) * radius * 3;

        let cx2 = node.x + Math.cos(angle + angle_width / 2) * radius * 3;
        let cy2 = node.y + Math.sin(angle + angle_width / 2) * radius * 3;

        let center_x = (startx + 3 * cx1 + 3 * cx2 + stopx) / 8;
        let center_y = (starty + 3 * cy1 + 3 * cy2 + stopy) / 8;
        
        // let center_x = 0.25 * startx + 0.5 * cx + 0.25 * stopx
        // let center_y = 0.25 * starty + 0.5 * cy + 0.25 * stopy


        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${startx},${starty} C ${cx1},${cy1},${cx2},${cy2},${stopx},${stopy}`);
        path.setAttribute("class", "arrow_e");
        path.setAttribute("marker-end", "url(#arrow-tip)");
        path.setAttribute("data-id", `${dataIdCnt++}`);

        const lb = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lb.innerHTML = e;
        lb.setAttribute("class", "arrow_l");
        lb.setAttribute("text-anchor", "middle");
        lb.setAttribute("dominant-baseline", "middle");
        lb.setAttribute("alignment-baseline", "middle");
        lb.setAttribute("x", center_x);
        lb.setAttribute("y", center_y);
        lb.setAttribute("data-id", `${dataIdCnt++}`);

        arrows.appendChild(path);
        arrows.appendChild(lb);
        return {
            path: path,
            lb: lb
        }
        
        
    }

    var active = null;

    function mkactive(n) {
        if(active) {
            active.circle.setAttribute("class", "nodecirc");
        }
        n.circle.setAttribute("class", "nodecirc active");
        active = n;
    }

    const ii = node(150, 30, "II");

    createSlide();

    const mi = node(80, 100, "MI");
    const im = node(220, 100, "IM");

    // transition(ii, mi, e1);
    const e1 = mkedge(ii, mi, "w(t1, x, a)", 0.5);
    // TODO: Fix this angle. It is bad.
    const e2 = mkedge(ii, im, "w(t2, x, b)", -0.5);

    createSlide();

    const e3 = mkedge(mi, im, "w(t2, x, b)", 0.5);
    const e4 = mkedge(im, mi, "w(t1, x, a)", 0.5);

    const emi = mkloop(mi, "w(t1, x, a)", - 3 * Math.PI / 4);
    const eim = mkloop(im, "w(t2, x, b)", - Math.PI / 4);

    createSlide();


    const ss = node(150, 180, "SS");

    const e5 = mkedge(im, ss, "a := b", -0.2);
    const e6 = mkedge(mi, ss, "b := a", 0.2);

    const e7 = mkedge(ss, im, "w(t2, x, b)", -0.2);
    const e8 = mkedge(ss, mi, "w(t1, x, a)", 0.2);

    createSlide();

    const e9 = mkloop(ss, "r(t2,x,b), r(t1,x,a)", Math.PI / 2)
    const e10 = mkloop(im, "r(t2,x,b)", Math.PI / 4)
    const e11 = mkloop(mi, "r(t1,x,a)", 3 * Math.PI / 4);
    

    createSlide();

    mkactive(ii);

    createSlide();

    const instrX = [300, 400];
    const instrY = 50;
    const instrOffsetY = 20;
    var instrs = [[],[]];
    function addinstr(instr, thread) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("class", "event");
        text.setAttribute("x", instrX[thread]);
        text.setAttribute("y", instrY + instrs[thread].length * instrOffsetY);
        text.innerHTML = instr;
        text.setAttribute("data-id", `${dataIdCnt++}`)

        instrs[thread].push(text);

        arrows.appendChild(text);
    }

    addinstr("w(t1, a)", 0);
    mkactive(mi);

    createSlide();

    addinstr("w(t2, b)", 1);
    mkactive(im);

    createSlide();

    mkactive(ss);

    createSlide();

    addinstr("r(t1, a)", 0);

    createSlide();

    function labeled_line(x1, y1, x2, y2, lb) {
        const ln = document.createElementNS("http://www.w3.org/2000/svg", "path");
        ln.setAttribute("d", `M ${x1},${y1} L ${x2},${y2}`);
        ln.setAttribute("class", lb + "_e");
        ln.setAttribute("marker-end", "url(#arrow-tip)");
        ln.setAttribute("data-id", `${dataIdCnt++}`);

        const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lbl.innerHTML = lb;
        lbl.setAttribute("x", x1 + (x2 - x1) / 2);
        lbl.setAttribute("y", y1 + (y2 - y1) / 2);
        lbl.setAttribute("class", "arrow_l");
        lbl.setAttribute("data-id", `${dataIdCnt++}`)
        
        arrows.appendChild(ln);
        arrows.appendChild(lbl);
        
        
    }
    
    const ln = labeled_line(instrX[1], instrY, instrX[0] + 30, instrY + instrOffsetY - 3, "rf");

    createSlide();
});
