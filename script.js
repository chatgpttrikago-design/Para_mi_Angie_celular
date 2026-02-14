const bgMusic = document.getElementById("bgMusic");

document.addEventListener("click", () => {
  bgMusic.volume = 0.35;
  bgMusic.play().catch(()=>{});
},{ once:true });

function startExperience(choice){
  document.getElementById("overlay").style.display="none";
  document.querySelector(".card").classList.add("show");
  initAnimations();
}

function initAnimations(){
  document.querySelectorAll(".reveal").forEach((el,i)=>{
    setTimeout(()=>el.classList.add("visible"),1000*(i+1));
  });
  createPetalHeart();
  setInterval(updateCounter,1000);
  updateCounter();
}

function createPetalHeart(){
  const heart = document.getElementById("flower-heart");
  heart.innerHTML="";
  const scale = 4;
  const center = 75;

  for(let i=0;i<80;i++){
    const p=document.createElement("div");
    p.className="petal";
    const t=i/80*2*Math.PI;
    const x=16*Math.sin(t)**3;
    const y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
    p.style.left = center + x*scale + "px";
    p.style.top = center + y*scale + "px";
    p.style.setProperty("--tx", x*6+"px");
    p.style.setProperty("--ty", y*6+"px");
    p.style.background=["#ff8bb0","#c77dff","#ff4d6d"][i%3];
    heart.appendChild(p);
  }
}

const startDate = new Date("2024-05-12T00:00:00");
function updateCounter(){
  const d=Math.floor((Date.now()-startDate)/86400000);
  document.getElementById("counter").innerText=`${d} días`;
}
