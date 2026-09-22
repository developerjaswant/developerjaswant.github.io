/* ===============================
   HEADER
================================ */

const header = document.getElementById("header");


window.addEventListener("scroll", function () {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* ===============================
   MOBILE MENU
================================ */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("open");

});


document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

        });

    });



/* ===============================
   TYPING ANIMATION
================================ */

const typingText =
    document.getElementById("typingText");


const typingWords = [

    "Full Stack Web Developer",

    "PHP & Laravel Developer",

    "ERP / SaaS Developer",

    "WordPress & Shopify Developer"

];


let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeAnimation() {

    const currentWord =
        typingWords[wordIndex];


    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentWord.length) {

            deleting = true;

            setTimeout(
                typeAnimation,
                1300
            );

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % typingWords.length;

        }

    }


    setTimeout(
        typeAnimation,
        deleting ? 35 : 70
    );

}


typeAnimation();



/* ===============================
   SCROLL PROGRESS
================================ */

const progress =
    document.querySelector(".scroll-progress");


window.addEventListener("scroll", function () {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


    const percentage =
        (scrollTop / scrollHeight) * 100;


    progress.style.width =
        percentage + "%";

});



/* ===============================
   ACTIVE NAVIGATION
================================ */

const sections =
    document.querySelectorAll("section[id]");


const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", function () {

    let currentSection = "home";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;


        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* ===============================
   CURSOR GLOW
================================ */

const cursorGlow =
    document.querySelector(".cursor-glow");


document.addEventListener(
    "mousemove",
    function (event) {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }
);



/* ===============================
   SCROLL REVEAL
================================ */

const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(function (element) {

        revealObserver.observe(element);

    });



/* ===============================
   COUNTER ANIMATION
================================ */

const counters =
    document.querySelectorAll("[data-count]");


const counterObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                const element =
                    entry.target;

                const target =
                    Number(
                        element.dataset.count
                    );


                let current = 0;


                const increment =
                    Math.max(
                        1,
                        Math.ceil(target / 35)
                    );


                const counter =
                    setInterval(function () {

                        current += increment;


                        if (current >= target) {

                            current =
                                target;

                            clearInterval(
                                counter
                            );

                        }


                        if (target === 100) {

                            element.textContent =
                                current + "%";

                        } else {

                            element.textContent =
                                current + "+";

                        }

                    }, 35);


                counterObserver.unobserve(
                    element
                );

            });

        },

        {
            threshold: 0.8
        }

    );


counters.forEach(function (counter) {

    counterObserver.observe(counter);

});



/* ===============================
   FOOTER YEAR
================================ */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();
