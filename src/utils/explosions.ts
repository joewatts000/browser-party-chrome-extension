const CONFIG = {
  explosions: {
    // Overall settings
    count: 6, // Number of explosiont to launch
    launchDelay: 300, // Delay between launches (ms)
    particleCount: {
      min: 30,
      max: 50,
    },
    duration: {
      min: 0.8,
      max: 1.5,
    },

    // Particle settings
    particles: {
      size: {
        min: 4,
        max: 12,
      },
      velocity: {
        min: 50,
        max: 150,
      },
      opacity: {
        initial: 1,
        final: 0,
      },
      colors: [
        '#ff4444', // light red
        '#ff7744', // orange
        '#ffaa44', // light orange
        '#ffdd44', // yellow orange
        '#ffff44', // yellow
      ],
    },

    // Distribution settings
    distribution: {
      width: 1.0, // Portion of screen width to use (0-1)
      height: 1.0, // Portion of screen height to use (0-1)
      xOffset: 0, // Horizontal offset from left (px)
      yOffset: 0, // Vertical offset from top (px)
    },

    // Shockwave settings
    shockwave: {
      duration: 0.5,
      size: {
        initial: 0,
        final: 150,
      },
      opacity: {
        initial: 0.9,
        final: 0,
      },
    },
  },
};

export const explosionStyles = `
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

const createSingleExplosion = () => {
  const container = document.createElement('div');
  container.className = 'explosion-container';

  // Position within configured distribution area
  const x =
    Math.random() * window.innerWidth * CONFIG.explosions.distribution.width +
    CONFIG.explosions.distribution.xOffset;
  const y =
    Math.random() * window.innerHeight * CONFIG.explosions.distribution.height +
    CONFIG.explosions.distribution.yOffset;

  container.style.left = `${x}px`;
  container.style.top = `${y}px`;

  // Create shockwave
  const shockwave = document.createElement('div');
  shockwave.className = 'explosion-shockwave';
  container.appendChild(shockwave);

  // Create particles
  const numParticles =
    Math.floor(
      Math.random() *
        (CONFIG.explosions.particleCount.max -
          CONFIG.explosions.particleCount.min +
          1)
    ) + CONFIG.explosions.particleCount.min;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';

    // Random size
    const size =
      Math.random() *
        (CONFIG.explosions.particles.size.max -
          CONFIG.explosions.particles.size.min) +
      CONFIG.explosions.particles.size.min;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random trajectory
    const angle = Math.random() * Math.PI * 2;
    const velocity =
      CONFIG.explosions.particles.velocity.min +
      Math.random() *
        (CONFIG.explosions.particles.velocity.max -
          CONFIG.explosions.particles.velocity.min);
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    // Random duration
    const duration = (
      Math.random() *
        (CONFIG.explosions.duration.max - CONFIG.explosions.duration.min) +
      CONFIG.explosions.duration.min
    ).toFixed(2);

    // Apply styles
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty(
      '--initial-opacity',
      `${CONFIG.explosions.particles.opacity.initial}`
    );
    particle.style.setProperty(
      '--final-opacity',
      `${CONFIG.explosions.particles.opacity.final}`
    );
    particle.style.backgroundColor =
      CONFIG.explosions.particles.colors[
        Math.floor(Math.random() * CONFIG.explosions.particles.colors.length)
      ];

    container.appendChild(particle);
  }

  document.body.appendChild(container);

  // Remove container after longest possible animation
  setTimeout(
    () => container.remove(),
    Math.max(
      CONFIG.explosions.duration.max * 1000,
      CONFIG.explosions.shockwave.duration * 1000
    )
  );
};

export function releaseExplosions() {
  for (let i = 0; i < CONFIG.explosions.count; i++) {
    createSingleExplosion();
  }
}
