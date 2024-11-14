const CONFIG = {
  fireworks: {
    // Overall settings
    count: 15, // Number of fireworks to launch
    launchDelay: 300, // Delay between launches (ms)

    // Launch settings
    launch: {
      duration: 1, // Launch animation duration (s)
      height: {
        min: 0.6, // Minimum launch height (portion of screen)
        max: 0.8, // Maximum launch height (portion of screen)
      },
      trailSize: {
        width: 10, // Width of launch trail (px)
        height: 30, // Height of launch trail (px)
      },
    },

    // Explosion settings
    explosion: {
      particleCount: {
        min: 40, // Minimum particles per explosion
        max: 70, // Maximum particles per explosion
      },
      particleSize: {
        min: 3, // Minimum particle size (px)
        max: 8, // Maximum particle size (px)
      },
      velocity: {
        min: 100, // Minimum particle velocity
        max: 250, // Maximum particle velocity
      },
      duration: {
        min: 1, // Minimum explosion duration (s)
        max: 1.8, // Maximum explosion duration (s)
      },
      // Colors for explosion particles (can add more colors)
      colors: [
        '#ff0000', // red
        '#ffa500', // orange
        '#ffff00', // yellow
        '#00ff00', // green
        '#00ffff', // cyan
        '#ff00ff', // magenta
        '#ff4444', // light red
        '#44ff44', // light green
        '#4444ff', // light blue
        '#ffffff', // white
      ],
    },

    // Distribution settings
    distribution: {
      width: 1.0, // Portion of screen width to use (0-1)
      xOffset: 0, // Horizontal offset from left (px)
    },
  },
};

export const fireworkStyles = `
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
    width: ${CONFIG.fireworks.launch.trailSize.width}px;
    height: ${CONFIG.fireworks.launch.trailSize.height}px;
    background: linear-gradient(to top, transparent, white);
    animation: launch ${CONFIG.fireworks.launch.duration}s ease-out forwards;
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

const createSingleFirework = (startDelay = 0) => {
  setTimeout(() => {
    const firework = document.createElement('div');
    firework.className = 'firework';

    // Position within configured distribution area
    const x =
      Math.random() * window.innerWidth * CONFIG.fireworks.distribution.width +
      CONFIG.fireworks.distribution.xOffset;
    firework.style.left = `${x}px`;
    firework.style.bottom = '0';

    // Create launch trail
    const trail = document.createElement('div');
    trail.className = 'firework-trail';
    const launchHeight =
      window.innerHeight *
      (CONFIG.fireworks.launch.height.min +
        Math.random() *
          (CONFIG.fireworks.launch.height.max -
            CONFIG.fireworks.launch.height.min));
    trail.style.setProperty('--launch-height', `-${launchHeight}px`);
    firework.appendChild(trail);

    document.body.appendChild(firework);

    // Create explosion after launch
    setTimeout(() => {
      const numParticles =
        Math.floor(
          Math.random() *
            (CONFIG.fireworks.explosion.particleCount.max -
              CONFIG.fireworks.explosion.particleCount.min +
              1)
        ) + CONFIG.fireworks.explosion.particleCount.min;

      // Create circular explosion
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        // Random size between min and max
        const size =
          Math.random() *
            (CONFIG.fireworks.explosion.particleSize.max -
              CONFIG.fireworks.explosion.particleSize.min) +
          CONFIG.fireworks.explosion.particleSize.min;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Calculate particle trajectory
        const angle = (i * (360 / numParticles) * Math.PI) / 180;
        const velocity =
          CONFIG.fireworks.explosion.velocity.min +
          Math.random() *
            (CONFIG.fireworks.explosion.velocity.max -
              CONFIG.fireworks.explosion.velocity.min);
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        particle.style.backgroundColor =
          CONFIG.fireworks.explosion.colors[
            Math.floor(Math.random() * CONFIG.fireworks.explosion.colors.length)
          ];

        // Random duration between min and max
        const duration = (
          Math.random() *
            (CONFIG.fireworks.explosion.duration.max -
              CONFIG.fireworks.explosion.duration.min) +
          CONFIG.fireworks.explosion.duration.min
        ).toFixed(2);
        particle.style.setProperty('--duration', `${duration}s`);

        // Position at launch end point
        particle.style.left = '50%';
        particle.style.top = `${-launchHeight}px`;

        firework.appendChild(particle);
      }

      // Remove firework after longest possible particle animation
      setTimeout(
        () => firework.remove(),
        CONFIG.fireworks.explosion.duration.max * 1000
      );
    }, CONFIG.fireworks.launch.duration * 1000); // Time to launch
  }, startDelay);
};

export function releaseFireworks() {
  for (let i = 0; i < CONFIG.fireworks.count; i++) {
    createSingleFirework(i * CONFIG.fireworks.launchDelay);
  }
}
