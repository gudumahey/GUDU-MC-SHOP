/* =========================================================
   GUDU MC STORE — INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1900);


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        }

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        if (cursorRing) {
            cursorRing.style.left = ringX + "px";
            cursorRing.style.top = ringY + "px";
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* =====================================================
       CURSOR HOVER EFFECT
    ===================================================== */

    const interactiveElements = document.querySelectorAll(
        "a, button, .rank-card, .magnetic-button"
    );

    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            if (!cursorRing) return;

            cursorRing.style.width = "65px";
            cursorRing.style.height = "65px";
            cursorRing.style.borderColor =
                "rgba(255,80,20,.8)";

        });


        element.addEventListener("mouseleave", () => {

            if (!cursorRing) return;

            cursorRing.style.width = "38px";
            cursorRing.style.height = "38px";
            cursorRing.style.borderColor =
                "rgba(255,255,255,.5)";

        });

    });


    /* =====================================================
       PARTICLE SYSTEM
    ===================================================== */

    const particleContainer =
        document.getElementById("particles");

    if (particleContainer) {

        const amount =
            window.innerWidth < 700 ? 35 : 75;

        for (let i = 0; i < amount; i++) {

            const particle =
                document.createElement("span");

            particle.style.position = "absolute";

            particle.style.width =
                Math.random() * 3 + 1 + "px";

            particle.style.height =
                particle.style.width;

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.borderRadius = "50%";

            particle.style.background =
                Math.random() > .5
                    ? "#ff4d00"
                    : "#ffffff";

            particle.style.opacity =
                Math.random() * .45 + .1;

            particle.style.boxShadow =
                "0 0 12px rgba(255,70,0,.7)";

            particle.style.animation =
                `particleFloat ${
                    Math.random() * 8 + 5
                }s ease-in-out infinite`;

            particle.style.animationDelay =
                `-${Math.random() * 8}s`;

            particleContainer.appendChild(particle);
        }

    }


    /* =====================================================
       ADD PARTICLE ANIMATION
    ===================================================== */

    const particleStyle =
        document.createElement("style");

    particleStyle.innerHTML = `

        @keyframes particleFloat {

            0%,100% {
                transform:
                    translate3d(0,0,0)
                    scale(1);

                opacity:.1;
            }

            25% {
                transform:
                    translate3d(
                        20px,
                        -35px,
                        0
                    )
                    scale(1.4);

                opacity:.7;
            }

            50% {
                transform:
                    translate3d(
                        -15px,
                        -70px,
                        0
                    )
                    scale(.8);

                opacity:.25;
            }

            75% {
                transform:
                    translate3d(
                        25px,
                        -100px,
                        0
                    )
                    scale(1.2);

                opacity:.5;
            }

        }

    `;

    document.head.appendChild(particleStyle);


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroLogo =
        document.getElementById("heroLogo");

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        hero &&
        heroLogo &&
        heroVisual &&
        window.innerWidth > 700
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left)
                    / rect.width
                    - .5;

                const y =
                    (e.clientY - rect.top)
                    / rect.height
                    - .5;


                heroLogo.style.transform =
                    `
                    translate3d(
                        ${x * 30}px,
                        ${y * 30}px,
                        80px
                    )
                    rotateX(${y * -8}deg)
                    rotateY(${x * 8}deg)
                    `;


                const circles =
                    heroVisual.querySelectorAll(
                        ".circle"
                    );

                circles.forEach((circle, index) => {

                    const strength =
                        (index + 1) * 8;

                    circle.style.transform =
                        `
                        translate(
                            ${x * strength}px,
                            ${y * strength}px
                        )
                        `;

                });

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroLogo.style.transform =
                    "translate3d(0,0,80px)";

            }
        );

    }


    /* =====================================================
       RANK CARD 3D TILT
    ===================================================== */

    const rankCards =
        document.querySelectorAll(".rank-card");


    rankCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (e) => {

                if (window.innerWidth <= 700)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    (e.clientX - rect.left)
                    / rect.width;

                const y =
                    (e.clientY - rect.top)
                    / rect.height;


                const rotateX =
                    (y - .5) * -12;

                const rotateY =
                    (x - .5) * 12;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    scale(1.015)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                if (card.classList.contains("featured")) {

                    card.style.transform =
                        "translateY(-18px)";

                } else {

                    card.style.transform =
                        "translateY(0)";

                }

            }
        );

    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".magnetic-button, .discord-big"
        );


    magneticButtons.forEach((button) => {

        button.addEventListener(
            "mousemove",
            (e) => {

                if (window.innerWidth <= 700)
                    return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(
                        ${x * .12}px,
                        ${y * .12}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".rank-card, .feature, .support-inner, .coin-copy, .coin-machine"
        );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(50px)";


        element.style.transition =
            "opacity .8s ease, transform .8s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting)
                        return;


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach((section) => {

                const top =
                    section.offsetTop - 200;

                if (
                    window.scrollY >= top
                ) {
                    current =
                        section.getAttribute("id");
                }

            });


            navLinks.forEach((link) => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (
                    href === "#" + current
                ) {

                    link.classList.add("active");

                }

            });

        }
    );


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (e) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    )
                        return;


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target)
                        return;


                    e.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       COIN MACHINE MOUSE EFFECT
    ===================================================== */

    const coinMachine =
        document.querySelector(
            ".coin-machine"
        );

    const giantCoin =
        document.querySelector(
            ".giant-coin"
        );


    if (
        coinMachine &&
        giantCoin &&
        window.innerWidth > 700
    ) {

        coinMachine.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    coinMachine.getBoundingClientRect();


                const x =
                    (e.clientX - rect.left)
                    / rect.width
                    - .5;


                const y =
                    (e.clientY - rect.top)
                    / rect.height
                    - .5;


                giantCoin.style.transform =
                    `
                    rotateY(${x * 35}deg)
                    rotateX(${y * -25}deg)
                    translateY(-10px)
                    `;

            }
        );


        coinMachine.addEventListener(
            "mouseleave",
            () => {

                giantCoin.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       TEXT SCRAMBLE EFFECT
    ===================================================== */

    const scrambleElements =
        document.querySelectorAll(
            ".rank-name, .section-head h2"
        );


    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    scrambleElements.forEach((element) => {

        const original =
            element.textContent.trim();


        element.addEventListener(
            "mouseenter",
            () => {

                let iteration = 0;

                clearInterval(
                    element.scrambleTimer
                );


                element.scrambleTimer =
                    setInterval(() => {

                        element.textContent =
                            original
                                .split("")
                                .map(
                                    (char, index) => {

                                        if (
                                            index <
                                            iteration
                                        ) {

                                            return original[
                                                index
                                            ];

                                        }

                                        return characters[
                                            Math.floor(
                                                Math.random() *
                                                characters.length
                                            )
                                        ];

                                    }
                                )
                                .join("");


                        iteration += .35;


                        if (
                            iteration >=
                            original.length
                        ) {

                            clearInterval(
                                element.scrambleTimer
                            );

                            element.textContent =
                                original;

                        }

                    }, 35);

            }

        );

    });


    /* =====================================================
       HORIZONTAL TICKER SPEED
    ===================================================== */

    const ticker =
        document.querySelector(
            ".ticker-track"
        );


    if (ticker) {

        window.addEventListener(
            "scroll",
            () => {

                const movement =
                    window.scrollY * .08;

                ticker.style.transform =
                    `translateX(-${movement % 400}px)`;

            }
        );

    }


    /* =====================================================
       DISCORD LINK TRACKING
    ===================================================== */

    const discordLinks =
        document.querySelectorAll(
            'a[href*="discord.gg"]'
        );


    discordLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "GUDU MC Discord opened."
                );

            }
        );

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "gudu-ready"
    );

});
