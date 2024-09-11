// Function to apply settings to the current DOM
function applySettings(settings) {
    if (settings.hideLogo) {
      const logos = document.querySelectorAll('img.logo'); // Adjust selector as needed
      logos.forEach(logo => logo.style.display = 'none');
    }
  
    if (settings.hideTitle) {
      const titles = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      titles.forEach(title => title.style.display = 'none');
    }
  
    if (settings.convertHeaders) {
      const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6, b');
      headers.forEach(el => {
        if (el.tagName.toLowerCase() !== 'b') {
          const p = document.createElement('p');
          p.innerHTML = el.innerHTML;
          el.parentNode.replaceChild(p, el);
        } else {
          const p = document.createElement('p');
          p.innerHTML = el.innerHTML;
          el.parentNode.replaceChild(p, el);
          p.style.fontWeight = 'normal';
        }
      });
    }
  
    if (settings.hideFixedContent) {
      // Hide elements with fixed positioning
      const fixedElements = document.querySelectorAll('*');
      fixedElements.forEach(el => {
        if (window.getComputedStyle(el).position === 'fixed') {
          el.style.display = 'none';
        }
      });
    }
  }
  
  // Function to handle settings changes
  function handleSettingsChange() {
    chrome.storage.sync.get(['hideLogo', 'hideTitle', 'convertHeaders', 'hideFixedContent'], (settings) => {
      applySettings(settings);
    });
  }
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message) => {
    chrome.storage.sync.get(['hideLogo', 'hideTitle', 'convertHeaders', 'hideFixedContent'], (settings) => {
      applySettings({...settings, ...message});
    });
  });
  
  // Initial settings application
  handleSettingsChange();
  
  // Mutation observer to handle dynamic content changes
  const observer = new MutationObserver(() => {
    handleSettingsChange();
  });
  
  // Start observing the document for changes in child nodes and subtree
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  