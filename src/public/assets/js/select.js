// ====== CONFIG ======
const grid = document.querySelector("#file-grid");
const ITEM_SELECTOR = ".file-holder";

// ====== STATE ======
const selection = {
  items: new Set(),
  lastSelectedIndex: null
};

let elements = [];
let selecting = false;
let startX = 0;
let startY = 0;

// ====== SELECTION BOX ======
const box = document.createElement("div");
box.className = "selection-box";
box.style.display = "none";
document.body.appendChild(box);

// ====== INIT ======
function initSelection() {
  elements = Array.from(grid.querySelectorAll(ITEM_SELECTOR));

  console.log("Found elements:", elements.length); // 👈 debug

  elements.forEach((el, index) => {
    el.dataset.index = index;

    el.addEventListener("click", (e) => handleClick(e, el, index));
  });
}

// ====== CLICK ======
function handleClick(e, el, index) {
  e.stopPropagation();

  const id = el.dataset.id;
  const isMulti = e.ctrlKey || e.metaKey;

  if (!id) return;

  if (e.shiftKey && selection.lastSelectedIndex !== null) {
    selectRange(selection.lastSelectedIndex, index);
  } else {
    if (!isMulti) selection.items.clear();

    if (selection.items.has(id)) {
      selection.items.delete(id);
    } else {
      selection.items.add(id);
    }

    selection.lastSelectedIndex = index;
  }

  renderSelection();
}

// ====== RANGE ======
function selectRange(start, end) {
  const [min, max] = [Math.min(start, end), Math.max(start, end)];

  selection.items.clear();

  for (let i = min; i <= max; i++) {
    const el = elements[i];
    if (el) selection.items.add(el.dataset.id);
  }
}

// ====== RENDER ======
function renderSelection() {
  elements.forEach((el) => {
    const id = el.dataset.id;

    el.classList.toggle("selected", selection.items.has(id));
  });
}

// ====== CLEAR ======
grid.addEventListener("click", (e) => {
  if (!e.target.closest(ITEM_SELECTOR)) {
    selection.items.clear();
    renderSelection();
  }
});

// ====== DRAG START ======
document.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;
  if (!e.target.closest("#file-grid")) return;
  if (e.target.closest(ITEM_SELECTOR)) return;

  selecting = true;

  startX = e.pageX;
  startY = e.pageY;

  selection.items.clear();

  box.style.display = "block";
});

// ====== DRAG MOVE ======
document.addEventListener("mousemove", (e) => {
  if (!selecting) return;

  const x = Math.min(e.pageX, startX);
  const y = Math.min(e.pageY, startY);
  const w = Math.abs(e.pageX - startX);
  const h = Math.abs(e.pageY - startY);

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.width = w + "px";
  box.style.height = h + "px";

  const rect = box.getBoundingClientRect();

  elements.forEach((el) => {
    const r = el.getBoundingClientRect();

    const hit =
      r.left < rect.right &&
      r.right > rect.left &&
      r.top < rect.bottom &&
      r.bottom > rect.top;

    const id = el.dataset.id;

    if (hit) selection.items.add(id);
    else selection.items.delete(id);
  });

  renderSelection();
});

// ====== DRAG END ======
document.addEventListener("mouseup", () => {
  if (!selecting) return;

  selecting = false;
  box.style.display = "none";

  console.log("Selected IDs:", Array.from(selection.items));
});

// ====== INIT ======
window.addEventListener("load", initSelection);