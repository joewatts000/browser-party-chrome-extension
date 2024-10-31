const injectContentScript = async (tabId) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js'],
    });
  } catch (error) {
    console.error('Error injecting content script:', error);
    throw error;
  }
};

const triggerEffect = async (effectType) => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab?.id) {
      console.error('No active tab found');
      return;
    }

    // Make sure content script is injected
    await injectContentScript(tab.id);

    // Send message to content script
    await chrome.tabs.sendMessage(tab.id, {
      effect: effectType,
    });
  } catch (error) {
    console.error('Error triggering effect:', error);
  }
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sparkle').addEventListener('click', () => {
    triggerEffect('sparkle');
  });

  document.getElementById('firework').addEventListener('click', () => {
    triggerEffect('firework');
  });

  document.getElementById('explosion').addEventListener('click', () => {
    triggerEffect('explosion');
  });

  document.getElementById('nuclear').addEventListener('click', () => {
    triggerEffect('nuclear');
  });
});
