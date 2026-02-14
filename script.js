const music = document.getElementById("bgMusic");

// AUDIO móvil seguro
function tryPlayMusic() {
  music.volume = 0.35;
  music.play().catch(()=>{});
  document.removeEventListener("click", tryPlayMusic);
  document.removeEventListener("touchstart", tryPlayMusic);
}
document.addEventListener("click", tryPlayMusic);
document.addEventListener("touchstart", tryPlayMusic);

function startExperience(choice) {
  const overlay = document.getElementById("overlay");
  const card = document.querySelector(".card");

  if (choice === "paso") {
    document.getElementById("paso-modal").style.display = "flex";
    setTimeout(()=>document.getElementById("paso-modal").style.display="none",2500);
  }

  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
    card.classList.add("show");
    init();
    music.play().catch(()=>{});
  }, 900);
}

function init() {
  document.querySelectorAll(".reveal").forEach((el,i)=>{
    setTimeout(()=>el.classList.add("visible"),1200*(i+1));
  });

  createHeart();
  setInterval(updateCounter,1000);
  updateCounter();
}

function createHeart() {
  const c = document.getElementById("flower-heart");
  const colors = ["#ff8bb0","#e0aaff","#ff4d6d","#c77dff"];

  for(let i=0;i<80;i++){
    const p=document.createElement("div");
    p.className="petal";
    const t=i/80*2*Math.PI;
    const x=16*Math.sin(t)**3;
    const y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
    p.style.left=(x*5+75)+"px";
    p.style.top=(y*5+65)+"px";
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.setProperty("--tx",x*3+"px");
    p.style.setProperty("--ty",y*3+"px");
    p.style.animationDelay=Math.random()*3+"s";
    c.appendChild(p);
  }
}

const startDate=new Date("2024-05-12T00:00:00");
function updateCounter(){
  const d=new Date()-startDate;
  const days=Math.floor(d/86400000);
  const h=Math.floor(d/3600000)%24;
  const m=Math.floor(d/60000)%60;
  const s=Math.floor(d/1000)%60;
  document.getElementById("counter").textContent=
    `${days}d, ${h}h ${m}m ${s}s`;
}
