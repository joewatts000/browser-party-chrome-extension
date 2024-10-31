import {
  createSparkles,
  createFireworks,
  createExplosion,
  goNuclear,
} from '../utils/effects.js';

// Flag to prevent multiple listener registrations
if (!window.hasContentScriptListener) {
  window.hasContentScriptListener = true;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.effect === 'sparkle') {
      createSparkles();
    } else if (message.effect === 'firework') {
      createFireworks();
    } else if (message.effect === 'explosion') {
      createExplosion();
    } else if (message.effect === 'nuclear') {
      goNuclear();
    }

    // Always send a response
    sendResponse({ success: true });
    return true; // Indicates we'll send a response asynchronously
  });
}
