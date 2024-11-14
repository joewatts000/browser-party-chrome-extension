import { releaseExplosions } from './explosions';
import { releaseFireworks } from './fireworks';
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
  insertStyles(sparkleStyles, 'firework-styles');
  releaseFireworks();
};

export const createExplosion = () => {
  insertStyles(sparkleStyles, 'explosion-styles');
  releaseExplosions();
};

export const goNuclear = () => {
  createSparkles();
  createFireworks();
  createExplosion();
};
