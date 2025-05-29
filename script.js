const tabs = document.getElementById("tabs");
const grid = document.getElementById("grid");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
document.getElementById("closeModal").onclick = () =>
  modal.classList.add("hidden");

let categories = [];
let currentCategory = null;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    categories = data.categories;
    renderTabs();
    if (categories.length) selectCategory(categories[0].id);
  });

function renderTabs() {
  tabs.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.onclick = () => selectCategory(cat.id);
    tabs.appendChild(btn);
  });
}

function selectCategory(id) {
  currentCategory = categories.find((cat) => cat.id === id);
  [...tabs.children].forEach((btn) =>
    btn.classList.toggle("active", btn.textContent === currentCategory.name)
  );
  renderGrid(currentCategory.subcategories);
}

function renderGrid(items) {
  grid.innerHTML = "";
  items.forEach((sub) => {
    const card = document.createElement("div");
    card.className = "icon-card";
    card.innerHTML = `<div>${sub.id}</div><i class="material-icons">${sub.platformIcon}</i><div>${sub.title}</div>`;
    card.onclick = () => showModal(sub);
    grid.appendChild(card);
  });
}

function showModal(sub) {
  modalIcon.textContent = sub.platformIcon;
  modalTitle.textContent = sub.title;
  modal.classList.remove("hidden");
}

search.addEventListener("input", () => {
  if (!currentCategory) return;
  const query = search.value.toLowerCase();
  const filtered = currentCategory.subcategories.filter(
    (sub) =>
      sub.title.toLowerCase().includes(query) ||
      sub.id.toString().includes(query)
  );
  renderGrid(filtered);
});
