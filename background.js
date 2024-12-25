// Set up multiple keyword handlers
const keywordHandlers = {
  s: (query) => `https://github.com/search?q=${encodeURIComponent(query)}`,
  j: (query) => `https://your-jira-instance.atlassian.net/browse/${encodeURIComponent(query)}`
};

// Omnibox listener for "s" keyword
chrome.omnibox.onInputEntered.addListener((text) => {
  const [key, ...rest] = text.split(" ");
  const query = rest.join(" ");

  // Determine URL based on key
  const handler = keywordHandlers[key];
  if (handler) {
    const url = handler(query);
    chrome.tabs.create({ url });
  } else {
    // Default action for unknown keys
    console.warn(`Unknown key: ${key}`);
  }
});