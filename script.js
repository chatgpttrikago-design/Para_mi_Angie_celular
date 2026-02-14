const bgMusic = document.getElementById("bgMusic");

function tryPlayMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {});
  document.removeEventListener("touchstart", tryPlayMusic);
}
document.addEventListener("touchstart", tryPlayMusic);

let experienceStarted = false;

function startExperience(choice) {
  if (experienceStarted) return;
  experienceStarted = true;
  tryPlayMusic();

  const overlay = document.getElementById("overlay");
  const card = document.querySelector(".card");

  if (choice === "si") {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
      card.classList.add("show");
      initAnimations();
    }, 1000);
  } else {
    const pasoModal = document.getElementById("paso-modal");
    pasoModal.style.display = "flex";
    setTimeout(() => {
      pasoModal.style.display = "none";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        card.classList.add("show");
        initAnimations();
      }, 1000);
    }, 3000);
  }
}

function initAnimations() {
  document.querySelectorAll(".reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 1200 * (i + 1));
  });

  createPetalHeart();
  setInterval(createButterfly, 3500);
  updateCounter();
  setInterval(updateCounter, 1000);
}

// TU FUNCIÓN DE PÉTALOS ORIGINAL RECUPERADA
function createPetalHeart() {
  const heartContainer = document.getElementById("flower-heart");
  if (!heartContainer) return;

  const colors = ["#ff8bb0", "#e0aaff", "#ff4d6d", "#c77dff", "#ff0054"];
  const total = 100; // Ajustado para que se vea lleno pero fluido en móvil

  for (let i = 0; i < total; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";

    const t = (i / total) * 2 * Math.PI;

    // FÓRMULA MATEMÁTICA DEL CORAZÓN (Idéntica a tu PC)
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    // Ajuste de escala para que quepa en el contenedor de móvil
    const posX = x * 4 + 50; 
    const posY = y * 4 + 50;

    petal.style.left = posX + "px";
    petal.style.top = posY + "px";
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];

    const travelDistance = 40 + Math.random() * 30;
    petal.style.setProperty("--tx", (x * travelDistance) / 10 + "px");
    petal.style.setProperty("--ty", (y * travelDistance) / 10 + "px");
    petal.style.animationDelay = Math.random() * 3 + "s";

    heartContainer.appendChild(petal);
  }
}

function updateCounter() {
  const startDate = new Date("2024-05-12T00:00:00");
  const now = new Date();
  const diff = now - startDate;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  const counterEl = document.getElementById("counter");
  if (counterEl) counterEl.innerHTML = `${d} días, ${h}h ${m}m ${s}s`;
}

function createButterfly() {
  const b = document.createElement("div");
  b.style.position = "fixed";
  b.innerHTML = "🦋";
  b.style.fontSize = "24px";
  b.style.left = "-50px";
  b.style.top = (Math.random() * 80 + 10) + "%";
  b.style.zIndex = "100";
  document.body.appendChild(b);

  b.animate([
    { left: "-50px", transform: "rotate(0deg)" },
    { left: "110vw", transform: "rotate(20deg)" }
  ], { duration: 10000 + Math.random() * 5000 });

  setTimeout(() => b.remove(), 15000);
}
