document.addEventListener('DOMContentLoaded', () => {
    const hideLogoCheckbox = document.getElementById('hideLogo');
    const hideTitleCheckbox = document.getElementById('hideTitle');
    const convertHeadersCheckbox = document.getElementById('convertHeaders');
    const hideFixedContentCheckbox = document.getElementById('hideFixedContent');
  
    // Load settings
    chrome.storage.sync.get(['hideLogo', 'hideTitle', 'convertHeaders', 'hideFixedContent'], (items) => {
      hideLogoCheckbox.checked = items.hideLogo || false;
      hideTitleCheckbox.checked = items.hideTitle || false;
      convertHeadersCheckbox.checked = items.convertHeaders || false;
      hideFixedContentCheckbox.checked = items.hideFixedContent || false;
    });
  
    // Save settings
    const saveSettings = () => {
      chrome.storage.sync.set({
        hideLogo: hideLogoCheckbox.checked,
        hideTitle: hideTitleCheckbox.checked,
        convertHeaders: convertHeadersCheckbox.checked,
        hideFixedContent: hideFixedContentCheckbox.checked
      });
    };
  
    hideLogoCheckbox.addEventListener('change', saveSettings);
    hideTitleCheckbox.addEventListener('change', saveSettings);
    convertHeadersCheckbox.addEventListener('change', saveSettings);
    hideFixedContentCheckbox.addEventListener('change', saveSettings);
  });
  