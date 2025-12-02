// make all paragraphs and list items fragments
Reveal.addEventListener("ready", () => {
    document.querySelectorAll("section p, section li, *[fragment], .make-fragment").forEach(
        li => li.classList.add("fragment")
    );
});

// Add note stuff
// document.querySelectorAll("section[data-markdown]").forEach(
//     sec => {
//         sec.setAttribute("data-separator", '^\n\n\n');
//         sec.setAttribute("data-separator-vertical", '^\n\n');
//         sec.setAttribute("data-separator-notes", '^NOTE');
//     }
// );

Reveal.configure({ pdfSeparateFragments: false });

Reveal.initialize({
    // see https://revealjs.com/config/
    controls: false,
    hash: true,
    center: false,
    transition: "convex",
    highlight: {
        beforeHighlight: hljs => {
            lean_stuff(hljs);   
            console.log("Enabled Lean");
            console.log(hljs.getLanguage("lean"))
            
        }
    },

    // see https://revealjs.com/presentation-size/
    width: 1920,
    height: 1080,
    margin: 0.2,

    // see https://revealjs.com/plugins/
    plugins: [RevealMarkdown, RevealMath, RevealNotes, RevealSearch, RevealZoom,RevealHighlight],
});
