let dataIdCnt = 0;

function svg(args) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("data-id", `id-${dataIdCnt++}`);
    
    for (let attr in args) {
        svg.setAttribute(attr, args[attr]);
    }
    return svg;
}

function group(clazz = "") {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("data-id", `id-${dataIdCnt++}`);
    g.setAttribute("class", clazz);
    return g;
}

function line(x1, y1, x2, y2, clazz = "") {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute("data-id", `id-${dataIdCnt++}`);
    line.setAttribute("class", clazz);
    line.setAttribute("d", xyxyToD(x1, y1, x2, y2));
    return line;
}

function xyxyToD(x1, y1, x2, y2) {
    return `M${x1},${y1} L${x2},${y2}`;
}

function circle(cx, cy, r, clazz = "") {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("data-id", `id-${dataIdCnt++}`);
    // circle.setAttribute("id",  `id-${dataIdCnt++}`);
    circle.setAttribute("class", clazz);
    circle.setAttribute("cx", `${cx}`);
    circle.setAttribute("cy", `${cy}`);
    circle.setAttribute("r", `${r}`);
    return circle;
}

function ellipse(cx, cy, rx, ry, clazz = "") {
    const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("data-id", `id-${dataIdCnt++}`);
    ellipse.setAttribute("class", clazz);
    ellipse.setAttribute("cx", `${cx}`);
    ellipse.setAttribute("cy", `${cy}`);
    ellipse.setAttribute("rx", `${rx}`);
    ellipse.setAttribute("ry", `${ry}`);
    return ellipse;
}

function cRect(cx, cy, width, height, clazz = "", rx = 0) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("data-id", `id-${dataIdCnt++}`);
    rect.setAttribute("class", clazz);
    rect.setAttribute("x", `${cx - width / 2}`);
    rect.setAttribute("y", `${cy - height / 2}`);
    rect.setAttribute("width", `${width}`);
    rect.setAttribute("height", `${height}`);
    rect.setAttribute("rx", `${rx}`);
    return rect;
}

function rect(x, y, width, height, clazz = "") {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("data-id", `id-${dataIdCnt++}`);
    rect.setAttribute("class", clazz);
    rect.setAttribute("x", `${x}`);
    rect.setAttribute("y", `${y}`);
    rect.setAttribute("width", `${width}`);
    rect.setAttribute("height", `${height}`);
    // rect.setAttribute("rx", `${rx}`);
    return rect;
}



function image(cx, cy, size, src) {
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("data-id", `id-${dataIdCnt++}`);
    image.setAttributeNS(null, "x", `${cx - size / 2}`);
    image.setAttributeNS(null, "y", `${cy - size / 2}`);
    image.setAttributeNS(null, "width", `${size}`);
    image.setAttributeNS(null, "height", `${size}`);
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", `images/${src}.png`);
    return image;
}

function text(cx, cy, content, clazz = "") {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("data-id", `id-${dataIdCnt++}`);
    text.setAttribute("class", clazz);
    text.setAttribute("x", `${cx}`);
    text.setAttribute("y", `${cy}`);
    text.setAttribute("dominant-baseline", "middle");
    text.textContent = content;
    return text;
}

function path(id, d, clazz = "") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("data-id", `id-${dataIdCnt++}`);
    path.setAttribute("class", clazz);
    path.setAttribute("id", id);
    path.setAttribute("d", d);
    return path;
}

let cnt = 0;
function centeredText(cx, cy, content, length, clazz = "") {
    const id = `P${cnt++}`;
    const p = path(id, `M ${cx - length / 2} ${cy} h ${length}`, clazz);

    const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    textPath.setAttribute("data-id", `id-${dataIdCnt++}`);
    textPath.setAttribute("class", clazz);
    textPath.setAttribute("href", `#${id}`);
    textPath.setAttribute("startOffset", "50%");
    textPath.setAttribute("text-anchor", "middle");
    textPath.setAttribute("dominant-baseline", "middle");
    textPath.textContent = content;

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("data-id", `id-${dataIdCnt++}`);
    text.setAttribute("class", clazz);
    text.appendChild(textPath);

    const g = group();
    g.appendChild(p);
    g.appendChild(text);
    return g;
}

function textbox(x, y, width, height, text, boxclass) {
    const box = svg({"class": boxclass});
    box.setAttribute("x", x);
    box.setAttribute("y", y);
    box.setAttribute("width", width);
    box.setAttribute("height", height);
    box.setAttribute("data-id", `id-${dataIdCnt++}`);
    
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", "50%");
    t.setAttribute("y", "50%");
    t.setAttribute("dominant-baseline", "middle");
    t.setAttribute("text-anchor", "middle");
    t.textContent = text;
    t.setAttribute("data-id", `id-${dataIdCnt++}`);
    box.appendChild(t);
    return box;
}
