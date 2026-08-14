/* =====================================================
   THE LITTLE THINGS
   Romantic Experience JavaScript
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const beginBtn = document.getElementById("beginBtn");

const video = document.getElementById("memoryVideo");

const videoPlay = document.getElementById("videoPlay");

const soundToggle = document.getElementById("soundToggle");

const openHeart = document.getElementById("openHeart");

const letterSection =
    document.getElementById("letterSection");

const petalsContainer =
    document.getElementById("petals");

const cursorGlow =
    document.querySelector(".cursor-glow");

const cinematicImage =
    document.querySelector(".cinematic-image img");

const videoSection =
    document.getElementById("videoSection");


/* =====================================================
   EXPERIENCE VARIABLES
===================================================== */

let experienceStarted = false;

let autoScrolling = false;

let autoScrollAnimation = null;

let videoIsInView = false;

let videoWasStartedByUser = false;

let videoObserver = null;


/* =====================================================
   CURSOR GLOW
===================================================== */

if (cursorGlow) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });

    function animateCursor() {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;

        cursorGlow.style.left =
            `${currentX}px`;

        cursorGlow.style.top =
            `${currentY}px`;

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();
}


/* =====================================================
   CREATE ROMANTIC PETAL
===================================================== */

function createPetal() {

    if (!petalsContainer) return;

    const petal =
        document.createElement("span");

    petal.className = "petal";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.setProperty(
        "--drift",
        `${(Math.random() - 0.5) * 250}px`
    );

    const size =
        4 + Math.random() * 6;

    petal.style.width =
        `${size}px`;

    petal.style.height =
        `${size * 1.35}px`;

    const duration =
        7 + Math.random() * 7;

    petal.style.animationDuration =
        `${duration}s`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, duration * 1000);
}


/* =====================================================
   PETAL LOOP
===================================================== */

let petalInterval = null;

function startPetals() {

    if (petalInterval) return;

    for (let i = 0; i < 12; i++) {

        setTimeout(
            createPetal,
            i * 250
        );

    }

    petalInterval =
        setInterval(
            createPetal,
            1800
        );
}


/* =====================================================
   BEGIN EXPERIENCE
===================================================== */

if (beginBtn) {

    beginBtn.addEventListener(
        "click",
        () => {

            if (experienceStarted) return;

            experienceStarted = true;


            /* Hide button */

            beginBtn.style.opacity = "0";

            setTimeout(() => {

                beginBtn.style.display = "none";

            }, 600);


            /* Start romantic effects */

            startPetals();


            /*
             * Start cinematic auto-scroll.
             */

            startAutoScroll();


            /*
             * Move beyond hero.
             */

            setTimeout(() => {

                window.scrollTo({

                    top: window.innerHeight,

                    behavior: "smooth"

                });

            }, 500);

        }
    );

}


/* =====================================================
   SLOW AUTO SCROLL
===================================================== */

function startAutoScroll() {

    if (autoScrolling) return;

    autoScrolling = true;

    let lastTime = null;

    const speed = 0.028;


    function scroll(timestamp) {

        if (!autoScrolling) {

            autoScrollAnimation = null;

            return;

        }


        if (lastTime === null) {

            lastTime = timestamp;

        }


        const delta =
            timestamp - lastTime;

        lastTime = timestamp;


        window.scrollBy(
            0,
            delta * speed
        );


        if (
            window.innerHeight +
            window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {

            autoScrolling = false;

            autoScrollAnimation = null;

            return;

        }


        autoScrollAnimation =
            requestAnimationFrame(scroll);

    }


    autoScrollAnimation =
        requestAnimationFrame(scroll);
}


/* =====================================================
   PAUSE AUTO SCROLL
===================================================== */

function pauseAutoScroll() {

    if (!autoScrolling) return;

    autoScrolling = false;

    if (autoScrollAnimation) {

        cancelAnimationFrame(
            autoScrollAnimation
        );

        autoScrollAnimation = null;

    }

}


/* =====================================================
   USER CONTROL
===================================================== */

window.addEventListener(
    "wheel",
    pauseAutoScroll,
    { passive: true }
);

window.addEventListener(
    "touchstart",
    pauseAutoScroll,
    { passive: true }
);

window.addEventListener(
    "pointerdown",
    (event) => {

        /*
         * Don't pause cinematic auto-scroll when
         * the user clicks the beginning button.
         */

        if (
            event.target === beginBtn
        ) return;

        pauseAutoScroll();

    },
    { passive: true }
);

window.addEventListener(
    "keydown",
    (event) => {

        const keys = [

            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            " ",
            "Home",
            "End"

        ];

        if (keys.includes(event.key)) {

            pauseAutoScroll();

        }

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-photo, .reveal-video"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(element);

    }
);


/* =====================================================
   PHOTO 3D TILT
===================================================== */

const tiltCards =
    document.querySelectorAll(
        ".tilt-card"
    );


tiltCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 700
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 4;


                const rotateX =
                    ((centerY - y) /
                        centerY) * 4;


                card.style.transform =
                    `rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.015)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    }
);


/* =====================================================
   VIDEO HELPERS
===================================================== */

function updateSoundButton() {

    if (!soundToggle || !video) return;

    if (video.muted) {

        soundToggle.textContent = "🔇";

        soundToggle.setAttribute(
            "aria-label",
            "Turn sound on"
        );

    } else {

        soundToggle.textContent = "🔊";

        soundToggle.setAttribute(
            "aria-label",
            "Turn sound off"
        );

    }

}


function showVideoPlayButton(
    text = "Play memory"
) {

    if (!videoPlay) return;

    videoPlay.classList.remove("hidden");

    const span =
        videoPlay.querySelector("span");

    const strong =
        videoPlay.querySelector("strong");

    if (span) {

        span.textContent = text;

    }

    if (strong) {

        strong.textContent = "↗";

    }

}


function hideVideoPlayButton() {

    if (!videoPlay) return;

    videoPlay.classList.add("hidden");

}


function setVideoVolume() {

    if (!video) return;

    video.volume = 1;

    updateSoundButton();

}


/* =====================================================
   VIDEO
===================================================== */

if (
    video &&
    videoPlay &&
    videoSection
) {

    /*
     * Start in a predictable state.
     *
     * The video is NOT muted.
     * We first attempt sound autoplay when
     * it enters the viewport.
     */

    video.pause();

    video.muted = false;

    video.volume = 1;

    updateSoundButton();


    /* =================================================
       PLAY BUTTON
    ================================================= */

    videoPlay.addEventListener(
        "click",
        async (event) => {

            event.stopPropagation();

            pauseAutoScroll();

            videoWasStartedByUser = true;


            if (video.paused) {

                video.muted = false;

                setVideoVolume();

                try {

                    await video.play();

                    hideVideoPlayButton();

                } catch (error) {

                    console.log(
                        "Manual video playback failed:",
                        error
                    );

                    /*
                     * If the browser still refuses sound,
                     * fall back to muted playback.
                     */

                    try {

                        video.muted = true;

                        updateSoundButton();

                        await video.play();

                        hideVideoPlayButton();

                    } catch (secondError) {

                        console.log(
                            "Video playback completely blocked:",
                            secondError
                        );

                        showVideoPlayButton(
                            "Tap to play"
                        );

                    }

                }

            } else {

                video.pause();

            }

        }
    );


    /* =================================================
       VIDEO PLAY EVENT
    ================================================= */

    video.addEventListener(
        "play",
        () => {

            const span =
                videoPlay.querySelector("span");

            const strong =
                videoPlay.querySelector("strong");


            if (span) {

                span.textContent =
                    "Pause memory";

            }


            if (strong) {

                strong.textContent =
                    "Ⅱ";

            }


            setTimeout(() => {

                if (!video.paused) {

                    hideVideoPlayButton();

                }

            }, 700);

        }
    );


    /* =================================================
       VIDEO PAUSE EVENT
    ================================================= */

    video.addEventListener(
        "pause",
        () => {

            showVideoPlayButton(
                "Play memory"
            );

        }
    );


    /* =================================================
       VIDEO ENDED
    ================================================= */

    video.addEventListener(
        "ended",
        () => {

            showVideoPlayButton(
                "Play again"
            );

        }
    );


    /* =================================================
       AUTO PLAY WHEN VIDEO ENTERS VIEW
    ================================================= */

    videoObserver =
        new IntersectionObserver(
            async (entries) => {

                const entry =
                    entries[0];


                if (entry.isIntersecting) {

                    videoIsInView = true;


                    /*
                     * Only start if video isn't already
                     * playing.
                     */

                    if (video.paused) {

                        /*
                         * FIRST ATTEMPT:
                         *
                         * Sound ON.
                         */

                        video.muted = false;

                        video.volume = 1;

                        updateSoundButton();


                        try {

                            await video.play();

                            /*
                             * Browser allowed
                             * autoplay with sound.
                             */

                            hideVideoPlayButton();

                            updateSoundButton();

                        } catch (error) {

                            console.log(
                                "Sound autoplay blocked by browser.",
                                error
                            );


                            /*
                             * SECOND ATTEMPT:
                             *
                             * Muted autoplay.
                             *
                             * This keeps the cinematic
                             * experience moving even when
                             * browser policy blocks audio.
                             */

                            video.muted = true;

                            updateSoundButton();


                            try {

                                await video.play();

                                hideVideoPlayButton();

                            } catch (mutedError) {

                                console.log(
                                    "Muted autoplay also blocked.",
                                    mutedError
                                );

                                showVideoPlayButton(
                                    "Play memory"
                                );

                            }

                        }

                    }

                } else {

                    videoIsInView = false;


                    /*
                     * Pause video when it leaves view.
                     *
                     * Do NOT reset currentTime.
                     */

                    if (!video.paused) {

                        video.pause();

                    }

                }

            },
            {
                threshold: 0.35
            }
        );


    /*
     * IMPORTANT:
     *
     * Observe the actual VIDEO.
     * Not the entire section.
     */

    videoObserver.observe(video);

}


/* =====================================================
   SOUND TOGGLE
===================================================== */

if (
    soundToggle &&
    video
) {

    soundToggle.addEventListener(
        "click",
        async (event) => {

            event.stopPropagation();

            pauseAutoScroll();

            videoWasStartedByUser = true;


            if (video.muted) {

                /*
                 * SOUND ON
                 */

                video.muted = false;

                video.volume = 1;

                updateSoundButton();


                /*
                 * If video isn't playing,
                 * start it.
                 */

                if (video.paused) {

                    try {

                        await video.play();

                        hideVideoPlayButton();

                    } catch (error) {

                        console.log(
                            "Could not start video with sound:",
                            error
                        );

                        showVideoPlayButton(
                            "Play memory"
                        );

                    }

                }

            } else {

                /*
                 * SOUND OFF
                 */

                video.muted = true;

                updateSoundButton();

            }

        }
    );

}


/* =====================================================
   CINEMATIC PARALLAX
===================================================== */

if (cinematicImage) {

    window.addEventListener(
        "scroll",
        () => {

            const rect =
                cinematicImage
                    .getBoundingClientRect();


            const height =
                window.innerHeight;


            if (
                rect.top < height &&
                rect.bottom > 0
            ) {

                const progress =
                    (height - rect.top) /
                    (height + rect.height);


                const movement =
                    (progress - 0.5) * 40;


                cinematicImage.style.transform =
                    `scale(1.1)
                     translateY(${movement}px)`;

            }

        },
        { passive: true }
    );

}


/* =====================================================
   SURPRISE REVEAL
===================================================== */

if (
    openHeart &&
    letterSection
) {

    openHeart.addEventListener(
        "click",
        () => {

            pauseAutoScroll();


            openHeart.innerHTML =
                `
                <span>for you</span>
                <b>♥</b>
                `;


            openHeart.style.transform =
                "scale(1.25)";


            setTimeout(
                () => {

                    letterSection.classList.add(
                        "opened"
                    );


                    letterSection.scrollIntoView({
                        behavior: "smooth"
                    });


                    /*
                     * Romantic petal burst.
                     */

                    for (
                        let i = 0;
                        i < 35;
                        i++
                    ) {

                        setTimeout(
                            createPetal,
                            i * 80
                        );

                    }

                },
                700
            );

        }
    );

}


/* =====================================================
   PETALS AFTER SCROLL
===================================================== */

let petalStarted = false;

window.addEventListener(
    "scroll",
    () => {

        if (
            !petalStarted &&
            window.scrollY >
            window.innerHeight * 1.5
        ) {

            petalStarted = true;


            for (
                let i = 0;
                i < 5;
                i++
            ) {

                setTimeout(
                    createPetal,
                    i * 500
                );

            }

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   PAGE READY
===================================================== */

console.log(
    "♡ The Little Things — made with love."
);

/* =====================================================
   BACKGROUND MUSIC + VIDEO SYNC
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const backgroundMusic = document.getElementById("backgroundMusic");

    // Find your main video
    const video = document.querySelector(".video-wrapper video");

    if (!backgroundMusic) {
        console.warn("Background music element not found.");
        return;
    }

    if (!video) {
        console.warn("Video element not found.");
        return;
    }

    /* -------------------------------------------------
       SETTINGS
    ------------------------------------------------- */

    const MUSIC_VOLUME = 0.18;
    const FADE_TIME = 800;

    backgroundMusic.volume = 0;
    backgroundMusic.loop = true;

    let musicStarted = false;
    let fadeTimer = null;


    /* -------------------------------------------------
       FADE MUSIC
    ------------------------------------------------- */

    function fadeMusicTo(targetVolume, duration = FADE_TIME) {

        clearInterval(fadeTimer);

        const startVolume = backgroundMusic.volume;
        const difference = targetVolume - startVolume;
        const steps = 20;
        const stepTime = duration / steps;

        let step = 0;

        fadeTimer = setInterval(() => {

            step++;

            const progress = step / steps;

            backgroundMusic.volume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        startVolume + difference * progress
                    )
                );

            if (step >= steps) {

                clearInterval(fadeTimer);

                backgroundMusic.volume = targetVolume;

                if (targetVolume === 0) {
                    backgroundMusic.pause();
                }
            }

        }, stepTime);
    }


    /* -------------------------------------------------
       START BACKGROUND MUSIC
    ------------------------------------------------- */

    function startBackgroundMusic() {

        // Don't start music while video is playing
        if (!video.paused && !video.ended) {
            return;
        }

        if (!musicStarted) {

            musicStarted = true;

            backgroundMusic.volume = 0;

            backgroundMusic.play()
                .then(() => {

                    fadeMusicTo(MUSIC_VOLUME);

                })
                .catch(() => {

                    // Browser blocked autoplay.
                    // It will start after user interaction.

                    musicStarted = false;

                });

        } else {

            backgroundMusic.play()
                .then(() => {

                    fadeMusicTo(MUSIC_VOLUME);

                })
                .catch(() => {});

        }
    }


    /* -------------------------------------------------
       STOP BACKGROUND MUSIC
    ------------------------------------------------- */

    function stopBackgroundMusic() {

        fadeMusicTo(0);
    }


    /* -------------------------------------------------
       VIDEO STARTED
    ------------------------------------------------- */

    video.addEventListener("play", () => {

        stopBackgroundMusic();

    });


    /* -------------------------------------------------
       VIDEO PAUSED
    ------------------------------------------------- */

    video.addEventListener("pause", () => {

        // Don't resume if video has finished
        if (!video.ended) {
            startBackgroundMusic();
        }

    });


    /* -------------------------------------------------
       VIDEO ENDED
    ------------------------------------------------- */

    video.addEventListener("ended", () => {

        startBackgroundMusic();

    });


    /* -------------------------------------------------
       FIRST USER INTERACTION
       Helps browsers that block autoplay.
    ------------------------------------------------- */

    const firstInteraction = () => {

        if (video.paused || video.ended) {
            startBackgroundMusic();
        }

        document.removeEventListener(
            "click",
            firstInteraction
        );

        document.removeEventListener(
            "touchstart",
            firstInteraction
        );

        document.removeEventListener(
            "scroll",
            firstInteraction
        );

    };


    document.addEventListener(
        "click",
        firstInteraction,
        { passive: true }
    );

    document.addEventListener(
        "touchstart",
        firstInteraction,
        { passive: true }
    );

    document.addEventListener(
        "scroll",
        firstInteraction,
        { passive: true }
    );


    /* -------------------------------------------------
       TRY AUTOPLAY ON PAGE LOAD
    ------------------------------------------------- */

    startBackgroundMusic();

});