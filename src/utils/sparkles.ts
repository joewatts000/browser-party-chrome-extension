const CONFIG = {
  // Sparkle Configuration
  sparkles: {
    // Burst settings
    burstsCount: 5, // Number of sparkle bursts
    burstDelay: 200, // Delay between bursts (ms)
    sparklesPerBurst: {
      min: 20, // Minimum sparkles per burst
      max: 40, // Maximum sparkles per burst
    },

    // Individual sparkle settings
    size: {
      min: 10, // Minimum sparkle size (px)
      max: 30, // Maximum sparkle size (px)
    },
    duration: {
      min: 1, // Minimum animation duration (s)
      max: 2, // Maximum animation duration (s)
    },

    // Colors (can add more colors to array)
    colors: ['gold', 'yellow', 'white'],

    // Distribution settings
    distribution: {
      width: 1.0, // Portion of screen width to use (0-1)
      height: 1.0, // Portion of screen height to use (0-1)
      xOffset: 0, // Horizontal offset from left (px)
      yOffset: 0, // Vertical offset from top (px)
    },
  },
};

export const sparkleStyles = `
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
    background: linear-gradient(45deg, ${CONFIG.sparkles.colors.join(', ')});
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

const createSparklesBurst = () => {
  const numSparkles =
    Math.floor(
      Math.random() *
        (CONFIG.sparkles.sparklesPerBurst.max -
          CONFIG.sparkles.sparklesPerBurst.min +
          1)
    ) + CONFIG.sparkles.sparklesPerBurst.min;

  for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    // Random size between min and max
    const size =
      Math.random() * (CONFIG.sparkles.size.max - CONFIG.sparkles.size.min) +
      CONFIG.sparkles.size.min;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Position within configured distribution area
    const x =
      Math.random() * window.innerWidth * CONFIG.sparkles.distribution.width +
      CONFIG.sparkles.distribution.xOffset;
    const y =
      Math.random() * window.innerHeight * CONFIG.sparkles.distribution.height +
      CONFIG.sparkles.distribution.yOffset;

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    // Random duration between min and max
    const duration = (
      Math.random() *
        (CONFIG.sparkles.duration.max - CONFIG.sparkles.duration.min) +
      CONFIG.sparkles.duration.min
    ).toFixed(2);
    sparkle.style.setProperty('--duration', `${duration}s`);

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), parseFloat(duration) * 1000);
  }
};

export function releaseSparkles() {
  for (let i = 0; i < CONFIG.sparkles.burstsCount; i++) {
    setTimeout(() => createSparklesBurst(), i * CONFIG.sparkles.burstDelay);
  }
}
