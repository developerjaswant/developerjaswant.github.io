/* =========================
   TYPING ANIMATION
========================= */

const typingEl = document.getElementById("typing");

const words = [
    "Full Stack Web Developer",
    "Laravel Developer",
    "PHP Developer",
    "Web Application Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {

    const word = words[wordIndex];

    typingEl.textContent =
        word.slice(0, charIndex);


    if (!deleting && charIndex < word.length) {

        charIndex++;

        setTimeout(typeLoop, 75);

    }

    else if (!deleting) {

        deleting = true;

        setTimeout(typeLoop, 1500);

    }

    else if (charIndex > 0) {

        charIndex--;

        setTimeout(typeLoop, 38);

    }

    else {

        deleting = false;

        wordIndex =
            (wordIndex + 1) % words.length;

        setTimeout(typeLoop, 350);
    }
}

typeLoop();



/* =========================
   SCROLL REVEAL
========================= */

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(el => {

        revealObserver.observe(el);

    });



/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


const navObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                    });


                    const active =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
                        );


                    if (active) {

                        active.classList.add("active");

                    }

                }

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


sections.forEach(section => {

    navObserver.observe(section);

});



/* =========================
   SCROLL PROGRESS
========================= */

window.addEventListener(
    "scroll",
    () => {

        const max =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            (window.scrollY / max) * 100;


        document.querySelector(
            ".scroll-progress"
        ).style.width =
            `${progress}%`;

    }
);



/* =========================
   MOBILE MENU
========================= */

const menuBtn =
    document.querySelector(".menu-btn");

const nav =
    document.querySelector(".nav-links");


menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle("open");

    }
);


document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

            }
        );

    });



/* =========================
   FOOTER YEAR
========================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();
