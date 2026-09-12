
const indicator = document.getElementById("indicator");
const nav = document.getElementById("mainNav");
const homePage = document.querySelector("#home");
const aboutMePage = document.querySelector("#about-me");
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
nav.addEventListener("click", (e) => {
    const target = e.target.closest(".navSection");
    if (target) {
        indicator.style.left = target.offsetLeft + 'px'
        active.classList.remove("activeNav");
        active.classList.remove("text-black")
        active = target;
        active.classList.add("activeNav");
        active.classList.add("text-black")

        switch (target.getAttribute("data-target")) {
            case "about-me": {
                transitionMain(currentPage, aboutMePage);
                break;
            }
            case "home": {
                transitionMain(currentPage, homePage);
                break;
            }
        }
    }
});
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
