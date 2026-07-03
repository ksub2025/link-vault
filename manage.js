const searchBox = document.getElementById("search-box");
const filterTopic = document.getElementById("filter-topic");
const filterTime = document.getElementById("filter-time");
const sortBy = document.getElementById("sort-by");
const list = document.getElementById("link-list");
const emptyState = document.getElementById("empty-state");
const exportBtn = document.getElementById("export-btn");
const countLabel = document.getElementById("count-label");

exportBtn.addEventListener("click", exportLinks);
[searchBox, filterTopic, filterTime, sortBy].forEach((el) => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});

function render() {
  getLinks((allLinks) => {
    populateTopicFilter(allLinks);
    countLabel.textContent = `${allLinks.length} link${allLinks.length === 1 ? "" : "s"}, stored only on this machine.`;

    let links = allLinks;

    const query = searchBox.value.trim().toLowerCase();
    if (query) {
      links = links.filter((l) =>
        [l.title, l.url, l.note, l.topic].join(" ").toLowerCase().includes(query)
      );
    }
    if (filterTopic.value !== "all") links = links.filter((l) => l.topic === filterTopic.value);
    if (filterTime.value !== "all") links = links.filter((l) => l.timeSensitivity === filterTime.value);

    links = sortLinks(links, sortBy.value);

    list.innerHTML = "";
    emptyState.hidden = links.length > 0;
    links.forEach((entry) => list.appendChild(buildLinkItem(entry, render)));
  });
}

function sortLinks(links, mode) {
  const copy = [...links];
  if (mode === "oldest") return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (mode === "topic") return copy.sort((a, b) => a.topic.localeCompare(b.topic));
  return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function populateTopicFilter(links) {
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
}

render();
