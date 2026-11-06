
// =====================================
// DIWALI CELEBRATION - COMPLETE SCRIPT
// =====================================

const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");
const wishesScreen = document.getElementById("wishesScreen");

const startButton = document.getElementById("startButton");
const replayButton = document.getElementById("replayButton");

const crackerStage = document.getElementById("crackerStage");
const scoreText = document.getElementById("scoreText");
const progressFill = document.getElementById("progressFill");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let score = 0;
const totalCrackers = 5;

let particles = [];
let fireworks = [];
let gameFinished = false;


// =====================================
// CANVAS SIZE
// =====================================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// =====================================
// SCREEN CHANGE
// =====================================

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}


// =====================================
// SOUND - ONLY SURPRISE OPENING
// =====================================

function playBlastSound() {

    const audio = new Audio("firework.mp3");

    audio.volume = 0.3;

    audio.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
}


// =====================================
// START GAME
// =====================================

startButton.addEventListener("click", () => {

    score = 0;
    gameFinished = false;

    showScreen(gameScreen);

    updateProgress();

    createCrackers();

});


// =====================================
// CREATE CRACKERS
// =====================================

function createCrackers() {

    crackerStage.querySelectorAll(".cracker").forEach(item => {
        item.remove();
    });

    const positions = [
        { x: 17, y: 35 },
        { x: 67, y: 35 },
        { x: 42, y: 60 },
        { x: 17, y: 75 },
        { x: 67, y: 75 }
    ];

    positions.forEach((position, index) => {

        const cracker = document.createElement("button");

        cracker.className = "cracker";
        cracker.innerHTML = "✦";

        cracker.setAttribute(
            "aria-label",
            "Burst golden cracker " + (index + 1)
        );

        cracker.style.left = position.x + "%";
        cracker.style.top = position.y + "%";
        cracker.style.animationDelay = index * 0.2 + "s";

        cracker.addEventListener("click", function () {

            if (cracker.classList.contains("burst") || gameFinished) {
                return;
            }

            const rect = cracker.getBoundingClientRect();

            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Fireworks on cracker click - NO SOUND
            createBurst(x, y);

            cracker.classList.add("burst");

            score++;

            updateProgress();

            if (score === totalCrackers) {

                gameFinished = true;

                setTimeout(() => {
                    showWishes();
                }, 1200);

            }

        });

        crackerStage.appendChild(cracker);

    });

}


// =====================================
// UPDATE PROGRESS
// =====================================

function updateProgress() {

    scoreText.textContent = score + " / " + totalCrackers;

    progressFill.style.width =
        (score / totalCrackers) * 100 + "%";

}


// =====================================
// CRACKER BURST PARTICLES
// =====================================

function createBurst(x, y) {

    const colors = [
        "#ffd76a",
        "#ff70b5",
        "#b58cff",
        "#6ee7ff",
        "#ff9c58",
        "#ffffff",
        "#8affc1"
    ];

    for (let i = 0; i < 65; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;

        particles.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            alpha: 1,
            size: Math.random() * 3 + 1,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ]

        });

    }

    createFirework(x, y);

}


// =====================================
// CREATE FIREWORKS
// =====================================

function createFirework(x, y) {

    for (let i = 0; i < 2; i++) {

        const randomX = x + (Math.random() - 0.5) * 100;
        const randomY = y + (Math.random() - 0.5) * 80;

        createBurstParticles(randomX, randomY);

    }

}


// =====================================
// FIREWORK PARTICLES
// =====================================

function createBurstParticles(x, y) {

    const colors = [
        "#ffd76a",
        "#ff70b5",
        "#b58cff",
        "#6ee7ff",
        "#ff9c58",
        "#ffffff",
        "#8affc1"
    ];

    for (let i = 0; i < 90; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;

        fireworks.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            alpha: 1,
            size: Math.random() * 3 + 1,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ]

        });

    }

}


// =====================================
// POOTHIRI EFFECT
// =====================================

function createPoothiri(x) {

    const bottom = window.innerHeight - 30;

    for (let i = 0; i < 45; i++) {

        const angle = Math.random() * Math.PI - Math.PI / 2;
        const speed = Math.random() * 5 + 1;

        particles.push({

            x: x,
            y: bottom,

            vx: Math.sin(angle) * speed,
            vy: -Math.cos(angle) * speed,

            alpha: 1,
            size: Math.random() * 3 + 1,

            color: [
                "#ffd76a",
                "#ffffff",
                "#ff9c58",
                "#ff70b5"
            ][Math.floor(Math.random() * 4)]

        });

    }

}


// =====================================
// BACKGROUND FIREWORKS
// =====================================

function ambientFirework() {

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.55;

    createBurstParticles(x, y);

}


// =====================================
// ANIMATION LOOP
// =====================================

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // GOLDEN PARTICLES

    for (let i = particles.length - 1; i >= 0; i--) {

        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.035;

        particle.alpha -= 0.018;

        ctx.globalAlpha = Math.max(0, particle.alpha);
        ctx.fillStyle = particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (particle.alpha <= 0) {
            particles.splice(i, 1);
        }

    }


    // FIREWORK PARTICLES

    for (let i = fireworks.length - 1; i >= 0; i--) {

        const particle = fireworks[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.vy += 0.025;

        particle.alpha -= 0.012;

        ctx.globalAlpha = Math.max(0, particle.alpha);
        ctx.fillStyle = particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (particle.alpha <= 0) {
            fireworks.splice(i, 1);
        }

    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);

}

animate();


// =====================================
// WEBSITE OPENING FIREWORKS
// =====================================

setTimeout(ambientFirework, 400);
setTimeout(ambientFirework, 1000);
setTimeout(ambientFirework, 1700);

setInterval(() => {

    if (!wishesScreen.classList.contains("active")) {
        ambientFirework();
    }

}, 2200);


// =====================================
// POOTHIRI ON WELCOME AND WISHES
// =====================================

setInterval(() => {

    if (
        welcomeScreen.classList.contains("active") ||
        wishesScreen.classList.contains("active")
    ) {

        createPoothiri(35);
        createPoothiri(window.innerWidth - 35);

    }

}, 700);


// =====================================
// FINAL WISHES + GRAND CELEBRATION
// =====================================

function showWishes() {

    showScreen(wishesScreen);

    // ONLY ONE SOUND WHEN SURPRISE OPENS
    playBlastSound();

    // Grand fireworks
    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.65;

            createBurstParticles(x, y);

        }, i * 300);

    }

    // Extra poothiri
    for (let i = 0; i < 10; i++) {

        setTimeout(() => {

            createPoothiri(35);
            createPoothiri(window.innerWidth - 35);

        }, i * 350);

    }

}


// =====================================
// REPLAY
// =====================================

replayButton.addEventListener("click", () => {

    score = 0;
    gameFinished = false;

    particles = [];
    fireworks = [];

    updateProgress();

    showScreen(welcomeScreen);

    ambientFirework();

});
