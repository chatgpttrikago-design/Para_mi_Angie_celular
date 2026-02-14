function startExperience(choice) {
  const overlay = document.getElementById('overlay');
  const card = document.querySelector('.card');

  overlay.style.opacity = '0';

  setTimeout(() => {
    overlay.style.display = 'none';
    card.classList.add('show');
    initAnimations();
  }, 1000);
}

function initAnimations() {

  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 1200 * (i + 1));
  });

  createHeart();
  setInterval(createButterfly, 3500);
}

/* ---------- CORAZÓN PÉTALOS ---------- */

function createHeart() {
  const heartContainer = document.getElementById('flower-heart');
  const colors = ['#ff8bb0', '#e0aaff', '#ff4d6d', '#c77dff', '#ff0054'];

  for (let i = 0; i < 120; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const t = (i / 120) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

    petal.style.left = x * 8 + 150 + 'px';
    petal.style.top = y * 8 + 130 + 'px';
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];

    petal.style.setProperty('--tx', (x * 6) + 'px');
    petal.style.setProperty('--ty', (y * 6) + 'px');

    petal.style.animationDelay = Math.random() * 3 + 's';

    heartContainer.appendChild(petal);
  }
}

/* ---------- MARIPOSAS ---------- */

function createButterfly() {
  const b = document.createElement('div');
  b.className = 'butterfly';
  b.style.position = 'absolute';
  b.style.top = (Math.random() * 70 + 10) + '%';
  b.style.left = '-80px';
  b.innerHTML = '🦋';
  b.style.fontSize = '30px';
  document.body.appendChild(b);

  const anim = b.animate([
    { left: '-80px' },
    { left: '110%' }
  ], {
    duration: 12000,
    easing: 'linear'
  });

  anim.onfinish = () => b.remove();
}

/* ---------- CONTADOR ---------- */

const startDate = new Date("2024-05-12T00:00:00");

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  document.getElementById("counter").innerHTML =
    `${d} días, ${h}h ${m}m ${s}s`;
}

setInterval(updateCounter, 1000);
updateCounter();
