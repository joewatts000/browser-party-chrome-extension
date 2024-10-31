// Global Configuration
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

  // Firework Configuration
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

export const createSparkles = () => {
  if (!document.getElementById('sparkle-styles')) {
    const style = document.createElement('style');
    style.id = 'sparkle-styles';
    style.textContent = `
      .sparkle {
        position: fixed;
        pointer-events: none;
        transform-origin: center;
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
    document.head.appendChild(style);
  }

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
        Math.random() *
          window.innerHeight *
          CONFIG.sparkles.distribution.height +
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

      setTimeout(() => sparkle.remove(), duration * 1000);
    }
  };

  // Create multiple bursts over time
  for (let i = 0; i < CONFIG.sparkles.burstsCount; i++) {
    setTimeout(() => createSparklesBurst(), i * CONFIG.sparkles.burstDelay);
  }
};

export const createFireworks = () => {
  if (!document.getElementById('firework-styles')) {
    const style = document.createElement('style');
    style.id = 'firework-styles';
    style.textContent = `
      .firework {
        position: fixed;
        pointer-events: none;
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
    document.head.appendChild(style);
  }

  const createSingleFirework = (startDelay = 0) => {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.className = 'firework';

      // Position within configured distribution area
      const x =
        Math.random() *
          window.innerWidth *
          CONFIG.fireworks.distribution.width +
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
              Math.floor(
                Math.random() * CONFIG.fireworks.explosion.colors.length
              )
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

  // Create multiple fireworks with delays
  for (let i = 0; i < CONFIG.fireworks.count; i++) {
    createSingleFirework(i * CONFIG.fireworks.launchDelay);
  }
};

export const createExplosion = () => {
  if (!document.getElementById('explosion-styles')) {
    const style = document.createElement('style');
    style.id = 'explosion-styles';
    style.textContent = `
      .explosion-container {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
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
    document.head.appendChild(style);
  }

  const createSingleExplosion = () => {
    const container = document.createElement('div');
    container.className = 'explosion-container';

    // Position within configured distribution area
    const x =
      Math.random() * window.innerWidth * CONFIG.explosions.distribution.width +
      CONFIG.explosions.distribution.xOffset;
    const y =
      Math.random() *
        window.innerHeight *
        CONFIG.explosions.distribution.height +
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
        CONFIG.explosions.particles.opacity.initial
      );
      particle.style.setProperty(
        '--final-opacity',
        CONFIG.explosions.particles.opacity.final
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

  for (let i = 0; i < CONFIG.explosions.count; i++) {
    createSingleExplosion(i * CONFIG.explosions.launchDelay);
  }
};

export const goNuclear = () => {
  createSparkles();
  createFireworks();
  createExplosion();
};
