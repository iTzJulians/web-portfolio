
const indicator = document.getElementById("indicator");
const sectionTitle = document.getElementById("section-tittle");
const nav = document.getElementById("mainNav");
const homePage = document.querySelector("#home");
const aboutMePage = document.querySelector("#about-me");
const projectsPage = document.querySelector("#projects");
const about = document.querySelector("#about");
const experience = document.querySelector("#experience");
const skills = document.querySelector("#skills");
let currentAbout = about;

const navAbout = document.querySelector("#navAbout");
let currentPage = homePage;
let active = document.querySelector(".activeNav")
indicator.style.left = active.offsetLeft + 'px';
indicator.classList.remove("invisible");



function updateIndicator() {
    indicator.style.left = active.offsetLeft + 'px'

}

function transitionMain(currentScreen, nextScreen) {

    if (currentScreen === nextScreen) { return; }

    currentScreen.classList.add("opacity-0");

    currentScreen.addEventListener("transitionend", () => {

        nextScreen.classList.add("opacity-0");
        nextScreen.classList.remove("hidden");
        currentScreen.classList.remove("opacity-0");

        nextScreen.classList.remove("hidden");
        currentScreen.classList.add("hidden");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                nextScreen.classList.remove("opacity-0");

                currentPage = nextScreen;


            });
        });

    }, { once: true });
}

function transitionAbout(nextAbout) {
    
    currentAbout.classList.add("hidden");
    currentAbout = nextAbout;
    nextAbout.classList.remove("hidden");
    
}

window.addEventListener("resize", () => {
    updateIndicator();
});

function navigateTo(target) {
    const next = nav.querySelector('[data-target="' + target + '"]');
    if (!next || next === active) { return; }

    indicator.style.left = next.offsetLeft + 'px';
    active.classList.remove("activeNav");
    active.classList.remove("text-black");
    active = next;
    active.classList.add("activeNav");
    active.classList.add("text-black");

    switch (target) {
        case "about-me": {
            transitionMain(currentPage, aboutMePage);
            break;
        }
        case "home": {
            transitionMain(currentPage, homePage);
            break;
        }
        case "projects": {
            transitionMain(currentPage, projectsPage);
            break;
        }
    }

    sectionTitle.textContent = {
        "home": "Inicio",
        "projects": "Proyectos",
        "about-me": "Sobre mí",
        "contact": "Contacto",
    }[target] || "Inicio";
}

nav.addEventListener("click", (e) => {
    const target = e.target.closest(".navSection");
    if (target) {
        const next = target.getAttribute("data-target");
        if (location.hash.slice(1) === next) {
            navigateTo(next);
        }
    }
});

window.addEventListener("hashchange", () => {
    navigateTo(location.hash.slice(1) || "home");
});

const sections = ["home", "projects", "about-me", "contact"];

function cycleSection(step) {
    const current = location.hash.slice(1);
    let index = sections.indexOf(current);
    if (index === -1) { index = 0; }
    index = (index + step + sections.length) % sections.length;
    location.hash = sections[index];
}

document.getElementById("navNext").addEventListener("click", () => {
    cycleSection(1);
});

document.getElementById("navPrev").addEventListener("click", () => {
    cycleSection(-1);
});

navigateTo(location.hash.slice(1) || "home");
navAbout.addEventListener("click", (e) => {
    const target = e.target.closest(".option");
    console.log(target.getAttribute("data-option"));
    
    if (target) {
        switch (target.getAttribute("data-option")) {
            case "about": {
                
                transitionAbout( about);
                break;
            }
            case "experience": {
                transitionAbout(experience);
                console.log(experience);
                
                break;
            }
            case "skills": {
                transitionAbout( skills);
                break;
            }
        }
    }
});
