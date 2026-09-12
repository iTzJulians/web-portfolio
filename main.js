
const indicator = document.getElementById("indicator");
const nav = document.getElementById("mainNav");
const home = document.querySelector("#home");
const aboutMe = document.querySelector("#about-me");
let currentPage = home;
let active = document.querySelector(".activeNav")
indicator.style.left = active.offsetLeft + 'px';
indicator.classList.remove("invisible");



function updateIndicator(){
        indicator.style.left = active.offsetLeft + 'px'

}

function transitionMain(currentScreen, nextScreen) {

    if (currentScreen === nextScreen) { return; }

    currentScreen.classList.add("opacity-0");

    currentScreen.addEventListener("transitionend", () => {

        currentScreen.classList.remove("opacity-0");

        nextScreen.classList.remove("hidden");
        currentScreen.classList.add("hidden");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                nextScreen.classList.remove("opacity-0");

                currentPage = nextScreen;

                console.log(currentPage);

            });
        });

    }, { once: true });
}

window.addEventListener("resize", ()=>{
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
                transitionMain(currentPage, aboutMe);
                break;
            }
            case "home": {
                transitionMain(currentPage, home);
                break;
            }
        }
    }
})
