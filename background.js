// Runs once when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "link-vault-save-page",
    title: "Save this page to Link Vault",
    contexts: ["page"]
  });
  chrome.contextMenus.create({
    id: "link-vault-save-link",
    title: "Save this link to Link Vault",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const isLinkClick = Boolean(info.linkUrl);
  const url = isLinkClick ? info.linkUrl : tab.url;
  const title = isLinkClick ? (info.selectionText || info.linkUrl) : tab.title;
  saveLink({ url, title });
});

// Quick capture always lands as Uncategorized / timely, so nothing is lost,
// and gets sorted properly later from the popup list. Mirrors an inbox,
// not a filing cabinet.
function saveLink({ url, title }) {
  chrome.storage.local.get({ links: [] }, (data) => {
    const links = data.links;
    links.unshift({
      id: `${Date.now()}`,
      url,
      title: title || url,
      topic: "Uncategorized",
      timeSensitivity: "timely",
      note: "",
      createdAt: new Date().toISOString()
    });
    chrome.storage.local.set({ links }, () => {
      chrome.action.setBadgeBackgroundColor({ color: "#5B7C99" });
      chrome.action.setBadgeText({ text: "OK" });
      setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1500);
    });
  });
}
