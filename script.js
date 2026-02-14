// ===============================
//  AUDIO: iniciar al primer toque/clic
// ===============================
const bgMusic = document.getElementById("bgMusic");

function tryPlayMusic() {
  if (!bgMusic) return;

  bgMusic.volume = 0.35;
  bgMusic.play().catch(() => {
    // Si por alguna razón falla, no rompemos nada
    console.log("Autoplay bloqueado hasta interacción del usuario.");
  });

  // Se ejecuta solo una vez
  document.removeEventListener("click", tryPlayMusic);
  document.removeEventListener("touchstart", tryPlayMusic);
}

document.addEventListener("click", tryPlayMusic);
document.addEventListener("touchstart", tryPlayMusic);

// ===============================
//  ESTADO para evitar duplicados
// ===============================
let experienceStarted = false;
let butterfliesIntervalId = null;
let counterIntervalId = null;

// ===============================
//  Función para iniciar la experiencia
// ===============================
function startExperience(choice) {
  const overlay = document.getElementById('overlay');
  const card = document.querySelector('.card');
  const music = document.getElementById('bgMusic');

  if (choice === 'si') {
    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay.style.display = 'none';
      card.classList.add('show');
      music.play().catch(() => {}); // autoplay seguro en móvil
      initAnimations();
    }, 800);

  } else {
    const pasoModal = document.getElementById('paso-modal');
    pasoModal.style.display = 'flex';

    setTimeout(() => {
      pasoModal.style.display = 'none';
      overlay.style.opacity = '0';

      setTimeout(() => {
        overlay.style.display = 'none';
        card.classList.add('show');
        music.play().catch(() => {});
        initAnimations();
      }, 800);

    }, 2500);
  }
}


// ===============================
//  Inicia animaciones (solo cuando empieza)
// ===============================
function initAnimations() {
  // 1) Revelar texto progresivo
  document.querySelectorAll(".reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 1200 * (i + 1));
  });

  // 2) Crear corazón de pétalos (una sola vez)
  createPetalHeart();

  // 3) Lanzar mariposas periódicamente
  if (!butterfliesIntervalId) {
    butterfliesIntervalId = setInterval(createButterfly, 3500);
  }

  // 4) Contador
  if (!counterIntervalId) {
    updateCounter(); // primera vez al toque
    counterIntervalId = setInterval(updateCounter, 1000);
  }
}

// ===============================
//  Corazón con pétalos
// ===============================
function createPetalHeart() {
  const heartContainer = document.getElementById("flower-heart");
  if (!heartContainer) return;

  // Por si acaso: limpiar si hubiera algo previo
  heartContainer.innerHTML = "";

  const colors = ["#ff8bb0", "#e0aaff", "#ff4d6d", "#c77dff", "#ff0054"];
  const total = 120;

  for (let i = 0; i < total; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";

    // t define la posición en el borde del corazón (0 a 2PI)
    const t = (i / total) * 2 * Math.PI;

    // Fórmula del corazón
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    // Posición inicial (centro del dibujo)
    const posX = x * 8 + 150;
    const posY = y * 8 + 130;

    petal.style.left = posX + "px";
    petal.style.top = posY + "px";
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];

    // Expulsión hacia afuera
    const travelDistance = 60 + Math.random() * 40;
    petal.style.setProperty("--tx", (x * travelDistance) / 10 + "px");
    petal.style.setProperty("--ty", (y * travelDistance) / 10 + "px");

    // Delay aleatorio para que parezca flujo continuo
    petal.style.animationDelay = Math.random() * 3 + "s";

    heartContainer.appendChild(petal);
  }
}

// ===============================
//  Mariposas (con cuerpo y antenas)
// ===============================
function createButterfly() {
  const b = document.createElement("div");
  b.className = "butterfly";

  b.innerHTML = `
    <div class="butterfly-body">
      <div class="antenna left"></div>
      <div class="antenna right"></div>
    </div>
    <div class="wing-pair left-side">
      <div class="wing top"></div>
      <div class="wing bottom"></div>
    </div>
    <div class="wing-pair right-side">
      <div class="wing top"></div>
      <div class="wing bottom"></div>
    </div>
  `;

  b.style.top = (Math.random() * 70 + 10) + "%";
  b.style.left = "-80px";
  document.body.appendChild(b);

  const randomY = Math.random() * 200 - 100;

  const anim = b.animate(
    [
      { left: "-80px", transform: "translateY(0) scale(0.9)" },
      { left: "110%", transform: `translateY(${randomY}px) scale(0.9)` }
    ],
    {
      duration: 12000 + Math.random() * 4000,
      easing: "linear"
    }
  );

  anim.onfinish = () => b.remove();
}

// ===============================
//  Contador (12 Mayo 2024)
// ===============================
const startDate = new Date("2024-05-12T00:00:00");

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  const counterEl = document.getElementById("counter");
  if (counterEl) {
    counterEl.innerHTML = `${d} días, ${h}h ${m}m ${s}s`;
  }
}

