const AUTOPLAY_KEY = "flower_autoplay_music";

const gift = document.getElementById("openGift");
const giftScreen = document.getElementById("giftScreen");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const flowerLink = document.getElementById("openFlower");
const galaxyBg = document.querySelector(".galaxy-bg");
const flowersScene = document.querySelector(".flowers");

let musicStarted = false;

function playMusicWithFade(audio) {
  if (!audio || musicStarted) return;
  musicStarted = true;

  audio.volume = 0;
  audio
    .play()
    .then(() => {
      let volume = 0;
      const fade = setInterval(() => {
        if (volume < 0.5) {
          volume += 0.02;
          audio.volume = volume;
        } else {
          clearInterval(fade);
        }
      }, 100);
    })
    .catch(() => {
      musicStarted = false;
    });
}

if (galaxyBg) {
  for (let i = 0; i < 220; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.opacity = Math.random();
    document.body.appendChild(s);
  }

  function spawnMeteor() {
    const m = document.createElement("div");
    m.className = "meteor";
    m.style.left = Math.random() * 40 + "vw";
    m.style.top = Math.random() * 30 + "vh";
    m.style.animationDuration = 2.2 + Math.random() * 1.3 + "s";
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 4500);
  }

  setInterval(() => {
    if (Math.random() > 0.35) spawnMeteor();
  }, 550);
}

if (flowersScene && !galaxyBg) {
  const isMobile = window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
  const count = isMobile ? 70 : 110;
  const colors = ["#ffffff", "#9be7ff", "#39c6d6", "#ff4fd8", "#ffd6ec"];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "bg-dot";

    const size = 2 + Math.random() * (isMobile ? 6 : 10);
    const blur = Math.random() < 0.55 ? Math.random() * 5 : 0;
    const opacity = 0.18 + Math.random() * 0.55;
    const dur = 14 + Math.random() * 20;
    const delay = -Math.random() * dur;
    const dx = (Math.random() * 2 - 1) * (isMobile ? 18 : 28);
    const dy = (Math.random() * 2 - 1) * (isMobile ? 24 : 36);
    const color = colors[Math.floor(Math.random() * colors.length)];

    dot.style.setProperty("--size", `${size}px`);
    dot.style.setProperty("--blur", `${blur}px`);
    dot.style.setProperty("--o", `${opacity}`);
    dot.style.setProperty("--dur", `${dur}s`);
    dot.style.setProperty("--delay", `${delay}s`);
    dot.style.setProperty("--dx", `${dx}px`);
    dot.style.setProperty("--dy", `${dy}px`);
    dot.style.setProperty("--x", `${Math.random() * 100}vw`);
    dot.style.setProperty("--y", `${Math.random() * 100}vh`);
    dot.style.background = `radial-gradient(circle at 30% 30%, ${color}, rgba(255,255,255,0))`;

    document.body.appendChild(dot);
  }
}

if (gift && mainContent) {
  gift.addEventListener("click", () => {
    playMusicWithFade(music);

    gift.style.pointerEvents = "none";
    gift.classList.add("open");

    setTimeout(() => {
      gift.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.classList.add("show");
    }, 1200);
  });
}


if (flowerLink) {
  flowerLink.addEventListener("click", (e) => {
    e.preventDefault();

    sessionStorage.setItem(AUTOPLAY_KEY, "1");
    playMusicWithFade(music);

    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = flowerLink.href;
    }, 800);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("container")) {
    document.body.classList.remove("container");
  }

  if (sessionStorage.getItem(AUTOPLAY_KEY) === "1") {
    sessionStorage.removeItem(AUTOPLAY_KEY);

    if (music) {
      playMusicWithFade(music);
      const unlock = () => {
        playMusicWithFade(music);
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
      };
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
    }
  }
});
