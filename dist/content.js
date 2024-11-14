// src/utils/explosions.ts
var CONFIG = {
  explosions: {
    count: 10,
    launchDelay: 500,
    particleCount: {
      min: 30,
      max: 50
    },
    duration: {
      min: 0.8,
      max: 1.5
    },
    particles: {
      size: {
        min: 4,
        max: 12
      },
      velocity: {
        min: 50,
        max: 150
      },
      opacity: {
        initial: 1,
        final: 0
      },
      colors: [
        "#ff4444",
        "#ff7744",
        "#ffaa44",
        "#ffdd44",
        "#ffff44"
      ]
    },
    distribution: {
      width: 1,
      height: 1,
      xOffset: 0,
      yOffset: 0
    },
    shockwave: {
      duration: 0.5,
      size: {
        initial: 0,
        final: 150
      },
      opacity: {
        initial: 0.9,
        final: 0
      }
    }
  }
};
var explosionStyles = `
  .explosion-container {
    position: fixed;
    pointer-events: none;
    z-index: 999999;
  }

  .explosion-particle {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: explodeParticle var(--duration) ease-out forwards;
  }

  .explosion-shockwave {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
    animation: shockwave ${CONFIG.explosions.shockwave.duration}s ease-out forwards;
  }

  @keyframes explodeParticle {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: var(--initial-opacity);
    }
    100% {
      transform: translate(var(--dx), var(--dy)) scale(0.5);
      opacity: var(--final-opacity);
    }
  }

  @keyframes shockwave {
    0% {
      width: ${CONFIG.explosions.shockwave.size.initial}px;
      height: ${CONFIG.explosions.shockwave.size.initial}px;
      opacity: ${CONFIG.explosions.shockwave.opacity.initial};
    }
    100% {
      width: ${CONFIG.explosions.shockwave.size.final}px;
      height: ${CONFIG.explosions.shockwave.size.final}px;
      opacity: ${CONFIG.explosions.shockwave.opacity.final};
    }
  }
`;
var createSingleExplosion = () => {
  const container = document.createElement("div");
  container.className = "explosion-container";
  const x = Math.random() * window.innerWidth * CONFIG.explosions.distribution.width + CONFIG.explosions.distribution.xOffset;
  const y = Math.random() * window.innerHeight * CONFIG.explosions.distribution.height + CONFIG.explosions.distribution.yOffset;
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  const shockwave = document.createElement("div");
  shockwave.className = "explosion-shockwave";
  container.appendChild(shockwave);
  const numParticles = Math.floor(Math.random() * (CONFIG.explosions.particleCount.max - CONFIG.explosions.particleCount.min + 1)) + CONFIG.explosions.particleCount.min;
  for (let i = 0;i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.className = "explosion-particle";
    const size = Math.random() * (CONFIG.explosions.particles.size.max - CONFIG.explosions.particles.size.min) + CONFIG.explosions.particles.size.min;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    const angle = Math.random() * Math.PI * 2;
    const velocity = CONFIG.explosions.particles.velocity.min + Math.random() * (CONFIG.explosions.particles.velocity.max - CONFIG.explosions.particles.velocity.min);
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;
    const duration = (Math.random() * (CONFIG.explosions.duration.max - CONFIG.explosions.duration.min) + CONFIG.explosions.duration.min).toFixed(2);
    particle.style.setProperty("--dx", `${dx}px`);
    particle.style.setProperty("--dy", `${dy}px`);
    particle.style.setProperty("--duration", `${duration}s`);
    particle.style.setProperty("--initial-opacity", `${CONFIG.explosions.particles.opacity.initial}`);
    particle.style.setProperty("--final-opacity", `${CONFIG.explosions.particles.opacity.final}`);
    particle.style.backgroundColor = CONFIG.explosions.particles.colors[Math.floor(Math.random() * CONFIG.explosions.particles.colors.length)];
    container.appendChild(particle);
  }
  document.body.appendChild(container);
  setTimeout(() => container.remove(), Math.max(CONFIG.explosions.duration.max * 1000, CONFIG.explosions.shockwave.duration * 1000));
};
function releaseExplosions() {
  for (let i = 0;i < CONFIG.explosions.count; i++) {
    createSingleExplosion();
  }
}

// src/utils/fireworks.ts
var CONFIG2 = {
  fireworks: {
    count: 15,
    launchDelay: 300,
    launch: {
      duration: 1,
      height: {
        min: 0.6,
        max: 0.8
      },
      trailSize: {
        width: 10,
        height: 30
      }
    },
    explosion: {
      particleCount: {
        min: 40,
        max: 70
      },
      particleSize: {
        min: 3,
        max: 8
      },
      velocity: {
        min: 100,
        max: 250
      },
      duration: {
        min: 1,
        max: 1.8
      },
      colors: [
        "#ff0000",
        "#ffa500",
        "#ffff00",
        "#00ff00",
        "#00ffff",
        "#ff00ff",
        "#ff4444",
        "#44ff44",
        "#4444ff",
        "#ffffff"
      ]
    },
    distribution: {
      width: 1,
      xOffset: 0
    }
  }
};
var fireworkStyles = `
  .firework {
    position: fixed;
    pointer-events: none;
    z-index: 999999;
  }

  .firework-particle {
    position: absolute;
    border-radius: 50%;
    animation: explode var(--duration) ease-out forwards;
    filter: brightness(1.5);
  }

  .firework-trail {
    position: absolute;
    width: ${CONFIG2.fireworks.launch.trailSize.width}px;
    height: ${CONFIG2.fireworks.launch.trailSize.height}px;
    background: linear-gradient(to top, transparent, white);
    animation: launch ${CONFIG2.fireworks.launch.duration}s ease-out forwards;
  }

  @keyframes launch {
    0% {
      transform: translateY(100vh) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(var(--launch-height)) scale(0.5);
      opacity: 0;
    }
  }

  @keyframes explode {
    0% {
      transform: translate(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--dx), var(--dy)) scale(0);
      opacity: 0;
    }
  }
`;
var createSingleFirework = (startDelay = 0) => {
  setTimeout(() => {
    const firework = document.createElement("div");
    firework.className = "firework";
    const x = Math.random() * window.innerWidth * CONFIG2.fireworks.distribution.width + CONFIG2.fireworks.distribution.xOffset;
    firework.style.left = `${x}px`;
    firework.style.bottom = "0";
    const trail = document.createElement("div");
    trail.className = "firework-trail";
    const launchHeight = window.innerHeight * (CONFIG2.fireworks.launch.height.min + Math.random() * (CONFIG2.fireworks.launch.height.max - CONFIG2.fireworks.launch.height.min));
    trail.style.setProperty("--launch-height", `-${launchHeight}px`);
    firework.appendChild(trail);
    document.body.appendChild(firework);
    setTimeout(() => {
      const numParticles = Math.floor(Math.random() * (CONFIG2.fireworks.explosion.particleCount.max - CONFIG2.fireworks.explosion.particleCount.min + 1)) + CONFIG2.fireworks.explosion.particleCount.min;
      for (let i = 0;i < numParticles; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";
        const size = Math.random() * (CONFIG2.fireworks.explosion.particleSize.max - CONFIG2.fireworks.explosion.particleSize.min) + CONFIG2.fireworks.explosion.particleSize.min;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const angle = i * (360 / numParticles) * Math.PI / 180;
        const velocity = CONFIG2.fireworks.explosion.velocity.min + Math.random() * (CONFIG2.fireworks.explosion.velocity.max - CONFIG2.fireworks.explosion.velocity.min);
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        particle.style.setProperty("--dx", `${dx}px`);
        particle.style.setProperty("--dy", `${dy}px`);
        particle.style.backgroundColor = CONFIG2.fireworks.explosion.colors[Math.floor(Math.random() * CONFIG2.fireworks.explosion.colors.length)];
        const duration = (Math.random() * (CONFIG2.fireworks.explosion.duration.max - CONFIG2.fireworks.explosion.duration.min) + CONFIG2.fireworks.explosion.duration.min).toFixed(2);
        particle.style.setProperty("--duration", `${duration}s`);
        particle.style.left = "50%";
        particle.style.top = `${-launchHeight}px`;
        firework.appendChild(particle);
      }
      setTimeout(() => firework.remove(), CONFIG2.fireworks.explosion.duration.max * 1000);
    }, CONFIG2.fireworks.launch.duration * 1000);
  }, startDelay);
};
function releaseFireworks() {
  for (let i = 0;i < CONFIG2.fireworks.count; i++) {
    createSingleFirework(i * CONFIG2.fireworks.launchDelay);
  }
}

// src/utils/sparkles.ts
var CONFIG3 = {
  sparkles: {
    burstsCount: 5,
    burstDelay: 200,
    sparklesPerBurst: {
      min: 20,
      max: 40
    },
    size: {
      min: 10,
      max: 30
    },
    duration: {
      min: 1,
      max: 2
    },
    colors: ["gold", "yellow", "white"],
    distribution: {
      width: 1,
      height: 1,
      xOffset: 0,
      yOffset: 0
    }
  }
};
var sparkleStyles = `
  .sparkle {
    position: fixed;
    pointer-events: none;
    transform-origin: center;
    z-index: 999999;
  }
  
  .sparkle::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${CONFIG3.sparkles.colors.join(", ")});
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation: sparkleAnimation var(--duration) ease-in-out forwards;
    filter: drop-shadow(0 0 3px rgba(255, 223, 0, 0.8));
  }

  @keyframes sparkleAnimation {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(180deg);
      opacity: 0;
    }
  }
`;
var createSparklesBurst = () => {
  const numSparkles = Math.floor(Math.random() * (CONFIG3.sparkles.sparklesPerBurst.max - CONFIG3.sparkles.sparklesPerBurst.min + 1)) + CONFIG3.sparkles.sparklesPerBurst.min;
  for (let i = 0;i < numSparkles; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    const size = Math.random() * (CONFIG3.sparkles.size.max - CONFIG3.sparkles.size.min) + CONFIG3.sparkles.size.min;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    const x = Math.random() * window.innerWidth * CONFIG3.sparkles.distribution.width + CONFIG3.sparkles.distribution.xOffset;
    const y = Math.random() * window.innerHeight * CONFIG3.sparkles.distribution.height + CONFIG3.sparkles.distribution.yOffset;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    const duration = (Math.random() * (CONFIG3.sparkles.duration.max - CONFIG3.sparkles.duration.min) + CONFIG3.sparkles.duration.min).toFixed(2);
    sparkle.style.setProperty("--duration", `${duration}s`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), parseFloat(duration) * 1000);
  }
};
function releaseSparkles() {
  for (let i = 0;i < CONFIG3.sparkles.burstsCount; i++) {
    setTimeout(() => createSparklesBurst(), i * CONFIG3.sparkles.burstDelay);
  }
}

// src/utils/effects.ts
var insertStyles = (styles, id) => {
  if (document.getElementById(id)) {
    return;
  }
  const style = document.createElement("style");
  style.id = id;
  style.textContent = styles;
  document.head.appendChild(style);
};
var createSparkles = () => {
  insertStyles(sparkleStyles, "sparkle-styles");
  releaseSparkles();
};
var createFireworks = () => {
  insertStyles(fireworkStyles, "firework-styles");
  releaseFireworks();
};
var createExplosion = () => {
  insertStyles(explosionStyles, "explosion-styles");
  releaseExplosions();
};
var goNuclear = () => {
  createSparkles();
  createFireworks();
  createExplosion();
  setTimeout(() => {
    createExplosion();
    createFireworks();
  }, 1000);
  setTimeout(() => {
    createFireworks();
  }, 2000);
};

// src/content/index.js
if (!window.hasContentScriptListener) {
  window.hasContentScriptListener = true;
  document.body.insertAdjacentHTML("beforeend", '<div id="browser-party-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 999999; display: none;"></div>');
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    document.getElementById("browser-party-overlay").style.display = "block";
    if (message.effect === "sparkle") {
      createSparkles();
    } else if (message.effect === "firework") {
      createFireworks();
    } else if (message.effect === "explosion") {
      createExplosion();
    } else if (message.effect === "nuclear") {
      goNuclear();
    }
    setInterval(() => {
      if (!document.querySelector(".sparkle") && !document.querySelector(".firework") && !document.querySelector(".explosion-container")) {
        document.getElementById("browser-party-overlay").style.display = "none";
      }
    }, 1000);
    sendResponse({ success: true });
    return true;
  });
}
