const form = document.getElementById("capture-form");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const topicInput = document.getElementById("topic");
const noteInput = document.getElementById("note");
const timeToggle = document.getElementById("time-toggle");
const topicOptions = document.getElementById("topic-options");
const filterTopic = document.getElementById("filter-topic");
const filterTime = document.getElementById("filter-time");
const list = document.getElementById("link-list");
const emptyState = document.getElementById("empty-state");
const exportBtn = document.getElementById("export-btn");
const viewAllBtn = document.getElementById("view-all-btn");
const moreNote = document.getElementById("more-note");

const POPUP_DISPLAY_LIMIT = 8;
let selectedTime = "timely";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (tab) {
    titleInput.value = tab.title || "";
    urlInput.value = tab.url || "";
  }
});

viewAllBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("manage.html") });
});

timeToggle.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-btn");
  if (!btn) return;
  selectedTime = btn.dataset.value;
  timeToggle.querySelectorAll(".toggle-btn").forEach((b) => {
    b.classList.toggle("active", b === btn);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const entry = {
    id: `${Date.now()}`,
    title: titleInput.value.trim(),
    url: urlInput.value.trim(),
    topic: topicInput.value.trim() || "Uncategorized",
    timeSensitivity: selectedTime,
    note: noteInput.value.trim(),
    createdAt: new Date().toISOString()
  };
  saveNewLink(entry, () => {
    noteInput.value = "";
    renderAll();
  });
});

exportBtn.addEventListener("click", exportLinks);
filterTopic.addEventListener("change", renderList);
filterTime.addEventListener("change", renderList);

function renderAll() {
  getLinks((links) => {
    populateTopicFilters(links);
    renderList();
  });
}

function populateTopicFilters(links) {
  const topics = [...new Set(links.map((l) => l.topic))].sort();
  const current = filterTopic.value;

  filterTopic.innerHTML = '<option value="all">All topics</option>';
  topics.forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    filterTopic.appendChild(opt);
  });
  if (topics.includes(current)) filterTopic.value = current;

  topicOptions.innerHTML = "";
  topics.forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t;
    topicOptions.appendChild(opt);
  });
}

function renderList() {
  getLinks((allLinks) => {
    let links = allLinks;
    if (filterTopic.value !== "all") links = links.filter((l) => l.topic === filterTopic.value);
    if (filterTime.value !== "all") links = links.filter((l) => l.timeSensitivity === filterTime.value);

    const totalMatching = links.length;
    const shown = links.slice(0, POPUP_DISPLAY_LIMIT);

    list.innerHTML = "";
    emptyState.hidden = allLinks.length > 0;

    shown.forEach((entry) => list.appendChild(buildLinkItem(entry, renderAll)));

    if (totalMatching > POPUP_DISPLAY_LIMIT) {
      moreNote.hidden = false;
      moreNote.textContent = `Showing ${POPUP_DISPLAY_LIMIT} of ${totalMatching}. View all for the rest.`;
    } else {
      moreNote.hidden = true;
    }
  });
}

renderAll();
