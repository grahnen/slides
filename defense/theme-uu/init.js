// make all paragraphs and list items fragments
Reveal.addEventListener("ready", () => {
    document.querySelectorAll("aside.notes *").forEach(
        li => li.classList.add("nofrag")
    );
    
    document.querySelectorAll("section p:not(.nofrag), section li:not(.nofrag), *[fragment], .make-fragment").forEach(
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

const readyevent = "reveal_ready";

Reveal.initialize({
    // see https://revealjs.com/config/
    controls: false,
    hash: true,
    center: false,
    slideNumber: 'c',
    transition: "convex",
    highlight: {
        beforeHighlight: hljs => {
            lean_stuff(hljs);
        }
    },
    animate: {
        autoplay: true
    },

    //autoAnimate: false,

    // see https://revealjs.com/presentation-size/
    width: 1920,
    height: 1080,
    margin: 0.2,
    dependencies: [
        { src: 'toc-progress.js', async: true, callback: function() { toc_progress.initialize(); } } 
    ],
    // see https://revealjs.com/plugins/
    plugins: [RevealMarkdown, RevealMath, RevealNotes, RevealSearch, RevealZoom, RevealLoadContent,  RevealAnimate ,  RevealHighlight],
});
