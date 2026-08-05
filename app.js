/*
  LÓGICA DEL CATÁLOGO
  --------------------
  No hace falta tocar este archivo para agregar productos nuevos:
  eso se hace en data.js. Este archivo solo dibuja lo que
  encuentra ahí, y maneja filtro por marca + orden por precio.
*/

const grid = document.getElementById("grid");
const filtersInner = document.querySelector(".filters-inner");
const sortSelect = document.getElementById("sortSelect");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const filterToggleLabel = document.getElementById("filterToggleLabel");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let lightboxImages = [];
let lightboxIndex = 0;

let currentBrand = "Todas";
let currentSort = "relevancia";
let justSwiped = false;

const money = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // saca acentos para usarlo como clase css

function renderFilters() {
  // "Bolsos" queda al final del listado de marcas aunque no empiece con A-Z primero
  const brands = [
  "Ofertas",
  ...[...new Set(PRODUCTS.map((p) => p.marca))].sort((a, b) => {
    if (a === "Bolsos") return 1;
    if (b === "Bolsos") return -1;
    return a.localeCompare(b);
  })
];

  brands.forEach((brand) => {
    const btn = document.createElement("button");
    btn.className = "pill";
    btn.dataset.brand = brand;
  btn.textContent = brand === "Ofertas" ? "🔥 Ofertas" : brand;
    filtersInner.appendChild(btn);
  });

  filtersInner.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    filtersInner
      .querySelectorAll(".pill")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    currentBrand = btn.dataset.brand;
    filterToggleLabel.textContent = currentBrand === "Todas" ? "Marcas" : currentBrand;
    closeFilterPanel();
    render();
  });
}

function openFilterPanel() {
  filterPanel.classList.add("open");
  filterToggle.classList.add("open");
  filterToggle.setAttribute("aria-expanded", "true");
}

function closeFilterPanel() {
  filterPanel.classList.remove("open");
  filterToggle.classList.remove("open");
  filterToggle.setAttribute("aria-expanded", "false");
}

function renderFilterToggle() {
  filterToggle.addEventListener("click", () => {
    const isOpen = filterPanel.classList.contains("open");
    isOpen ? closeFilterPanel() : openFilterPanel();
  });

  // Si tocan afuera del panel en mobile, se cierra
  document.addEventListener("click", (e) => {
    const clickedInsideFilters = e.target.closest("#filters");
    if (!clickedInsideFilters) closeFilterPanel();
  });
}

function renderSort() {
  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    render();
  });
}

function specsTemplate(specs) {
  return specs
    .map(
      (s) => `
        <div class="spec${s.full ? " full" : ""}">
          <dt>${s.label}</dt>
          <dd>${s.value}</dd>
        </div>`
    )
    .join("");
}

function getImages(p) {
  // Soporta el campo nuevo "imagenes" (array) y el viejo "imagen" (string suelto)
  if (Array.isArray(p.imagenes) && p.imagenes.length) return p.imagenes;
  if (p.imagen) return [p.imagen];
  return [];
}

function iconTemplate(p) {
  const images = getImages(p);

  if (images.length) {
    const slides = images
      .map(
        (src) =>
          `<img class="slide" src="${src}" alt="${p.marca} ${p.modelo}" loading="lazy">`
      )
      .join("");

    const dots =
      images.length > 1
        ? `<div class="slider-dots">${images
            .map(
              (_, i) =>
                `<button class="slider-dot${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Foto ${i + 1}"></button>`
            )
            .join("")}</div>`
        : "";

    return `
      <div class="photo-slider" data-index="0" data-count="${images.length}">
        <div class="slider-track">${slides}</div>
        ${dots}
      </div>`;
  }

  if (p.tipo === "bolso") {
    return `
      <div class="bag">
        <div class="bag-strap"></div>
        <div class="bag-body">
          <div class="bag-zip"></div>
        </div>
      </div>`;
  }
  const shapeClass = "shape-" + slug(p.forma || "");
  return `
      <div class="paddle">
        <div class="paddle-head ${shapeClass}"></div>
        <div class="paddle-handle"></div>
      </div>`;
}

function updateLightbox() {
  lightboxImg.src = lightboxImages[lightboxIndex];
  const multi = lightboxImages.length > 1;
  lightboxCounter.hidden = !multi;
  lightboxPrev.hidden = !multi;
  lightboxNext.hidden = !multi;
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function openLightbox(images, startIndex) {
  lightboxImages = images;
  lightboxIndex = ((startIndex % images.length) + images.length) % images.length;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function stepLightbox(delta) {
  lightboxIndex =
    ((lightboxIndex + delta) % lightboxImages.length + lightboxImages.length) %
    lightboxImages.length;
  updateLightbox();
}

function initLightbox() {
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => stepLightbox(-1));
  lightboxNext.addEventListener("click", () => stepLightbox(1));

  // Tocar el fondo oscuro (fuera de la foto) también cierra
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  // Deslizar adentro del lightbox también cambia de foto
  let startX = 0;
  lightbox.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > 30) stepLightbox(deltaX < 0 ? 1 : -1);
  }, { passive: true });
}

function goToSlide(slider, newIndex) {
  const track = slider.querySelector(".slider-track");
  const count = Number(slider.dataset.count);
  const index = ((newIndex % count) + count) % count;

  track.style.transform = `translateX(-${index * 100}%)`;
  slider.dataset.index = index;
  slider
    .querySelectorAll(".slider-dot")
    .forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function initSliderInteractions() {
  // Tocar un punto -> va directo a esa foto
  grid.addEventListener("click", (e) => {
    const dot = e.target.closest(".slider-dot");
    if (dot) {
      e.stopPropagation();
      goToSlide(dot.closest(".photo-slider"), Number(dot.dataset.index));
      return;
    }

    // Tocar la foto -> la abre en pantalla completa
    const slider = e.target.closest(".photo-slider");
    if (slider && !justSwiped) {
      const images = Array.from(slider.querySelectorAll(".slide")).map((img) => img.src);
      openLightbox(images, Number(slider.dataset.index));
    }
    justSwiped = false;
  });

  // Deslizar con el dedo -> avanza o retrocede según la dirección
  let touchStartX = 0;
  let touchSlider = null;

  grid.addEventListener(
    "touchstart",
    (e) => {
      const slider = e.target.closest(".photo-slider");
      if (!slider || Number(slider.dataset.count) <= 1) return;
      touchSlider = slider;
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  grid.addEventListener(
    "touchend",
    (e) => {
      if (!touchSlider) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 30) {
        justSwiped = true;
        goToSlide(touchSlider, Number(touchSlider.dataset.index) + (deltaX < 0 ? 1 : -1));
      }
      touchSlider = null;
    },
    { passive: true }
  );
}

function cardTemplate(p) {
  return `
    <article class="card" style="--accent:${p.color}">
      <div class="card-top">
${
  p.oferta
    ? '<span class="badge offer">🔥 Oferta</span>'
    : p.destacado
      ? '<span class="badge">Top ventas</span>'
      : ""
}        <span class="brand-tag">${p.marca}</span>
        ${iconTemplate(p)}
      </div>

      <div class="card-body">
        <h3 class="model">${p.modelo}</h3>

        <div class="price">
          ${p.precioAnterior ? `<span class="old-price">${money(p.precioAnterior)}</span>` : ""}
          ${money(p.precio)}<small>ARS</small>
        </div>

        <dl class="specs">
          ${specsTemplate(p.specs)}
        </dl>

        ${p.etiqueta ? `<span class="level">${p.etiqueta}</span>` : ""}

        <a
          class="contact-btn"
          href="https://wa.me/5493513930460?text=${encodeURIComponent(`Hola! Tengo una consulta sobre ${p.marca} ${p.modelo}.`)}"
          target="_blank">
          Consultar por WhatsApp
        </a>

      </div>
    </article>
  `;
}
function getItems() {
  let items;

if (currentBrand === "Todas") {
  items = [...PRODUCTS];
} else if (currentBrand === "Ofertas") {
  items = PRODUCTS.filter((p) => p.oferta);
} else {
  items = PRODUCTS.filter((p) => p.marca === currentBrand);
}

  if (currentSort === "precio-asc") {
  items.sort((a, b) => a.precio - b.precio);

} else if (currentSort === "precio-desc") {
  items.sort((a, b) => b.precio - a.precio);

} else if (currentSort === "nivel") {

  const ordenNivel = {
    "Iniciación": 1,
    "Intermedio": 2,
    "Avanzado": 3,
    "Profesional": 4
  };

  items.sort((a, b) => {
    return (ordenNivel[a.etiqueta] || 99) - (ordenNivel[b.etiqueta] || 99);
  });
}

  return items;
}

function render() {
  const items = getItems();
  grid.innerHTML = items.map(cardTemplate).join("");
  emptyState.hidden = items.length !== 0;
  resultCount.textContent = `${items.length} producto${items.length === 1 ? "" : "s"}`;
}

renderFilters();
renderFilterToggle();
renderSort();
initSliderInteractions();
initLightbox();
render();