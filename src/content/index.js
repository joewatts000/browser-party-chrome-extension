import {
  createSparkles,
  createFireworks,
  createExplosion,
  goNuclear,
} from '../utils/effects';

// Flag to prevent multiple listener registrations
if (!window.hasContentScriptListener) {
  window.hasContentScriptListener = true;
  // add an overlay to the webpage
  document.body.insertAdjacentHTML(
    'beforeend',
    '<div id="browser-party-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 999999; display: none;"></div>'
  );

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // show the overlay
    document.getElementById('browser-party-overlay').style.display = 'block';
    if (message.effect === 'sparkle') {
      createSparkles();
    } else if (message.effect === 'firework') {
      createFireworks();
    } else if (message.effect === 'explosion') {
      createExplosion();
    } else if (message.effect === 'nuclear') {
      goNuclear();
    }

    setInterval(() => {
      // if there are no sparkles, fireworks, or explosions, hide the overlay
      if (
        !document.querySelector('.sparkle') &&
        !document.querySelector('.firework') &&
        !document.querySelector('.explosion-container')
      ) {
        document.getElementById('browser-party-overlay').style.display = 'none';
      }
    }, 1000);

    // Always send a response
    sendResponse({ success: true });
    return true; // Indicates we'll send a response asynchronously
  });
}
