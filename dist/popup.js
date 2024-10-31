// src/popup/index.js
var injectContentScript = async (tabId) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
  } catch (error) {
    console.error("Error injecting content script:", error);
    throw error;
  }
};
var triggerEffect = async (effectType) => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });
    if (!tab?.id) {
      console.error("No active tab found");
      return;
    }
    await injectContentScript(tab.id);
    await chrome.tabs.sendMessage(tab.id, {
      effect: effectType
    });
  } catch (error) {
    console.error("Error triggering effect:", error);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sparkle").addEventListener("click", () => {
    triggerEffect("sparkle");
  });
  document.getElementById("firework").addEventListener("click", () => {
    triggerEffect("firework");
  });
  document.getElementById("explosion").addEventListener("click", () => {
    triggerEffect("explosion");
  });
  document.getElementById("nuclear").addEventListener("click", () => {
    triggerEffect("nuclear");
  });
});
