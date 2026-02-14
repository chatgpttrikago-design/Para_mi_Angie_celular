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
    }, 800);
  } else {
    const modal = document.getElementById("paso-modal");
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.display = "none";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        card.classList.add("show");
        initAnimations();
      }, 800);
    }, 2500);
  }
}

function initAnimations() {
  document.querySelectorAll(".reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 1000 * (i + 1));
  });
  createPetalHeart();
  setInterval(createButterfly, 4000);
  updateCounter();
  setInterval(updateCounter, 1000);
}

function createPetalHeart() {
  const heartContainer = document.getElementById("flower-heart");
  const total = 60; // Menos pétalos para mejor rendimiento en móvil
  const colors = ["#ff8bb0", "#e0aaff", "#ff4d6d", "#c77dff"];

  for (let i = 0; i < total; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    const t = (i / total) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    
    // Centrado relativo al contenedor
    petal.style.left = "50%";
    petal.style.top = "50%";
    petal.style.background = colors[i % colors.length];
    petal.style.setProperty("--tx", (x * 5) + "px");
    petal.style.setProperty("--ty", (y * 5) + "px");
    petal.style.animationDelay = Math.random() * 2 + "s";
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
  document.getElementById("counter").innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}

// Función de mariposa simplificada para rendimiento móvil
function createButterfly() {
  const b = document.createElement("div");
  b.innerHTML = "🦋"; // Usamos un emoji para ahorrar recursos en móvil o puedes mantener el div anterior
  b.style.position = "fixed";
  b.style.left = "-50px";
  b.style.top = Math.random() * 80 + "%";
  b.style.fontSize = "25px";
  b.style.zIndex = "100";
  document.body.appendChild(b);

  b.animate([
    { left: "-50px" },
    { left: "110vw" }
  ], { duration: 8000 + Math.random() * 4000 });

  setTimeout(() => b.remove(), 12000);
}
