// Shared between popup.js and manage.js so both views read and write
// the exact same data, the popup is just a smaller window onto it.

function getLinks(callback) {
  chrome.storage.local.get({ links: [] }, (data) => callback(data.links));
}

function setLinks(links, callback) {
  chrome.storage.local.set({ links }, () => callback && callback());
}

function saveNewLink(entry, callback) {
  getLinks((links) => {
    setLinks([entry, ...links], callback);
  });
}

function updateEntry(id, changes, callback) {
  getLinks((links) => {
    const updated = links.map((l) => (l.id === id ? { ...l, ...changes } : l));
    setLinks(updated, callback);
  });
}

function deleteEntry(id, callback) {
  getLinks((links) => {
    setLinks(links.filter((l) => l.id !== id), callback);
  });
}

function exportLinks() {
  getLinks((links) => {
    const blob = new Blob([JSON.stringify(links, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `link-vault-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Builds one link row/card. `onChange` is called after any edit or delete
// so the calling page can decide how to re-render (popup vs. full list).
function buildLinkItem(entry, onChange) {
  const li = document.createElement("li");
  li.className = `link-item ${entry.timeSensitivity}`;

  const main = document.createElement("div");
  main.className = "link-item-main";

  const titleLink = document.createElement("a");
  titleLink.className = "link-title";
  titleLink.href = entry.url;
  titleLink.target = "_blank";
  titleLink.textContent = entry.title;
  main.appendChild(titleLink);

  const urlLine = document.createElement("span");
  urlLine.className = "link-url";
  urlLine.textContent = entry.url;
  main.appendChild(urlLine);

  if (entry.note) {
    const note = document.createElement("div");
    note.className = "link-note";
    note.textContent = entry.note;
    main.appendChild(note);
  }

  const metaRow = document.createElement("div");
  metaRow.className = "link-meta-row";

  const topicInputEl = document.createElement("input");
  topicInputEl.className = "topic-input";
  topicInputEl.value = entry.topic;
  topicInputEl.addEventListener("change", () => {
    updateEntry(entry.id, { topic: topicInputEl.value.trim() || "Uncategorized" }, onChange);
  });
  metaRow.appendChild(topicInputEl);

  const timePill = document.createElement("button");
  timePill.className = `time-pill ${entry.timeSensitivity}`;
  timePill.textContent = entry.timeSensitivity === "timely" ? "Timely" : "Timeless";
  timePill.title = "Click to flip";
  timePill.addEventListener("click", () => {
    const next = entry.timeSensitivity === "timely" ? "timeless" : "timely";
    updateEntry(entry.id, { timeSensitivity: next }, onChange);
  });
  metaRow.appendChild(timePill);

  const dateLabel = document.createElement("span");
  dateLabel.className = "link-date";
  dateLabel.textContent = new Date(entry.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });
  metaRow.appendChild(dateLabel);

  main.appendChild(metaRow);
  li.appendChild(main);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✕";
  deleteBtn.title = "Delete";
  deleteBtn.addEventListener("click", () => deleteEntry(entry.id, onChange));
  li.appendChild(deleteBtn);

  return li;
}
