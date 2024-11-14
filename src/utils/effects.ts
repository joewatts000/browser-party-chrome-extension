import { explosionStyles, releaseExplosions } from './explosions';
import { fireworkStyles, releaseFireworks } from './fireworks';
import { releaseSparkles, sparkleStyles } from './sparkles';

const insertStyles = (styles: string, id: string) => {
  if (document.getElementById(id)) {
    return;
  }
  const style = document.createElement('style');
  style.id = id;
  style.textContent = styles;
  document.head.appendChild(style);
};

export const createSparkles = () => {
  insertStyles(sparkleStyles, 'sparkle-styles');
  releaseSparkles();
};

export const createFireworks = () => {
  insertStyles(fireworkStyles, 'firework-styles');
  releaseFireworks();
};

export const createExplosion = () => {
  insertStyles(explosionStyles, 'explosion-styles');
  releaseExplosions();
};

export const goNuclear = () => {
  createSparkles();
  createFireworks();
  createExplosion();
  setTimeout(() => {
    createExplosion();
  }, 1000);

  setTimeout(() => {
    createFireworks();
  }, 2000);
};
