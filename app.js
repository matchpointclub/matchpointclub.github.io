/*
  LÓGICA DEL CATÁLOGO
  --------------------
  No hace falta tocar este archivo para agregar productos nuevos:
  eso se hace en data.js. Este archivo solo dibuja lo que
  encuentra ahí, y maneja filtro por tipo + marca + orden por precio
  + búsqueda por texto (nombre, formato y material).
*/

const grid = document.getElementById("grid");
const filtersInner = document.querySelector(".filters-inner");
const sortSelect = document.getElementById("sortSelect");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const filterToggleLabel = document.getElementById("filterToggleLabel");
const typeFilters = document.getElementById("typeFilters");
const nivelOption = document.getElementById("nivelOption");
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let lightboxImages = [];
let lightboxIndex = 0;

let currentBrand = "Todas";
let currentType = "todo"; // "todo" | "paleta" | "bolso"
let currentSort = "relevancia";
let currentSearch = ""; // texto de búsqueda ya normalizado (sin acentos, minúscula)
let justSwiped = false;

// Etiquetas de specs que consideramos "material" a fines de la búsqueda
const MATERIAL_LABELS = ["nucleo", "cara", "material"];

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
    .replace(/[\u0300-\u036f]/g, ""); // saca acentos para usarlo como clase css / comparar texto

function buildBrandPills() {
  filtersInner.innerHTML = "";

  // Universo de productos según el tipo elegido (Todo / Paletas / Bolsos)
  const source =
    currentType === "todo" ? PRODUCTS : PRODUCTS.filter((p) => p.tipo === currentType);

  // "Bolsos" no es una marca real, así que nunca la mostramos como pill de marca
  const brandNames = [...new Set(source.filter((p) => p.marca !== "Bolsos").map((p) => p.marca))].sort(
    (a, b) => a.localeCompare(b)
  );

  const brands = ["Todas", "Ofertas", ...brandNames];

  brands.forEach((brand) => {
    const btn = document.createElement("button");
    btn.className = "pill" + (brand === currentBrand ? " active" : "");
    btn.dataset.brand = brand;
    btn.textContent = brand === "Ofertas" ? "🔥 Ofertas" : brand;
    filtersInner.appendChild(btn);
  });
}

function renderFilters() {
  buildBrandPills();

  filtersInner.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    filtersInner
      .querySelectorAll(".pill")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    currentBrand = btn.dataset.brand;
    gtag('event', 'filtrar_marca', {
  marca: currentBrand
});
    filterToggleLabel.textContent = currentBrand === "Todas" ? "Marcas" : currentBrand;
    closeFilterPanel();
    render();
  });
}

function updateSortOptions() {
  if (currentType === "bolso" || currentType === "zapatilla") {
    nivelOption.hidden = true;
    if (currentSort === "nivel") {
      currentSort = "relevancia";
      sortSelect.value = "relevancia";
    }
  } else {
    nivelOption.hidden = false;
  }
}

function renderTypeFilters() {
  typeFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".type-pill");
    if (!btn) return;
    typeFilters
      .querySelectorAll(".type-pill")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    currentBrand = "Todas"; // al cambiar de tipo, reseteamos el filtro de marca
    filterToggleLabel.textContent = "Marcas";

    gtag('event', 'filtrar_tipo', { tipo: currentType });

    buildBrandPills();
    updateSortOptions();
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

/*
  Texto "buscable" de un producto: nombre (marca + modelo),
  formato (forma) y material (specs con label Núcleo / Cara / Material).
  No incluye marca sola como criterio aparte porque ya existe el filtro
  de marcas; se suma acá solo para que "nox at10" también matchee.
*/
function getSearchableText(p) {
  const materialText = (p.specs || [])
    .filter((s) => MATERIAL_LABELS.includes(slug(s.label)))
    .map((s) => s.value)
    .join(" ");

  return slug(`${p.marca} ${p.modelo} ${p.forma || ""} ${materialText}`);
}

function renderSearch() {
  searchInput.addEventListener("input", () => {
    const raw = searchInput.value;
    currentSearch = slug(raw.trim());
    searchClear.hidden = raw.length === 0;

    if (currentSearch) {
      gtag('event', 'buscar_texto', { query: raw.trim() });
    }

    render();
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    currentSearch = "";
    searchClear.hidden = true;
    searchInput.focus();
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
      <div class="photo-slider" data-index="0" data-count="${images.length}" data-marca="${p.marca}" data-modelo="${p.modelo}">
        <div class="slider-viewport">
          <div class="slider-track">${slides}</div>
        </div>
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
if (p.tipo === "zapatilla") {
    return `
      <div class="shoe">
        <div class="shoe-sole"></div>
        <div class="shoe-body">
          <div class="shoe-laces"></div>
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

function openLightbox(images, startIndex, producto) {
  lightboxImages = images;
  lightboxIndex = ((startIndex % images.length) + images.length) % images.length;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  if (producto) {
    gtag('event', 'ver_producto', {
      producto: producto.modelo,
      marca: producto.marca
    });
  }
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
      const producto = { marca: slider.dataset.marca, modelo: slider.dataset.modelo };
      openLightbox(images, Number(slider.dataset.index), producto);
    }
    justSwiped = false;
  });

  // Deslizar con el dedo -> avanza o retrocede según la direcció
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
      ? '<span class="badge">Destacado</span>'
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
  let items = [...PRODUCTS];

  if (currentType !== "todo") {
    items = items.filter((p) => p.tipo === currentType);
  }

  if (currentBrand === "Ofertas") {
    items = items.filter((p) => p.oferta);
  } else if (currentBrand !== "Todas") {
    items = items.filter((p) => p.marca === currentBrand);
  }

  if (currentSearch) {
    items = items.filter((p) => getSearchableText(p).includes(currentSearch));
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
    items.sort((a, b) => (ordenNivel[a.etiqueta] || 99) - (ordenNivel[b.etiqueta] || 99));
  }

  return items;
}

function render() {
  const items = getItems();
  grid.innerHTML = items.map(cardTemplate).join("");
  emptyState.hidden = items.length !== 0;

  if (items.length === 0 && currentSearch) {
    emptyState.textContent = "No encontramos paletas para esa búsqueda. Probá con otro nombre, formato o material.";
  } else {
    emptyState.textContent = "No hay productos con estos filtros todavía. Probá con otro filtro.";
  }

  resultCount.textContent = `${items.length} producto${items.length === 1 ? "" : "s"}`;
}

renderFilters();
renderTypeFilters();
renderFilterToggle();
renderSort();
renderSearch();
initSliderInteractions();
initLightbox();
updateSortOptions();
render();
// ===== VOLVER ARRIBA =====

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 550) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================================================
   RECOMENDADOR — quiz de preguntas
   ========================================================= */
(function () {
  const recoOpen = document.getElementById("recoOpen");
  const recoModal = document.getElementById("recoModal");
  const recoOverlay = document.getElementById("recoOverlay");
  const recoClose = document.getElementById("recoClose");
  const recoProgress = document.getElementById("recoProgress");
  const recoBody = document.getElementById("recoBody");

  if (!recoOpen || !recoModal) return;

  const TIPO_LABELS = { paleta: "Paleta", bolso: "Bolso", zapatilla: "Zapatilla" };
  const NIVELES = ["Iniciación", "Intermedio", "Avanzado", "Profesional"];

  const PRESUPUESTOS_POR_TIPO = {
    paleta: [
      { id: "hasta200", label: "Hasta $200.000", min: 0, max: 200000 },
      { id: "200-350", label: "$200.000 – $350.000", min: 200000, max: 350000 },
      { id: "350-600", label: "$350.000 – $600.000", min: 350000, max: 600000 },
      { id: "mas600", label: "Más de $600.000", min: 600000, max: Infinity },
      { id: "nodecir", label: "Prefiero no decir", min: null, max: null },
    ],
    bolso: [
      { id: "hasta100", label: "Hasta $100.000", min: 0, max: 100000 },
      { id: "100-200", label: "$100.000 – $200.000", min: 100000, max: 200000 },
      { id: "mas200", label: "Más de $200.000", min: 200000, max: Infinity },
      { id: "nodecir", label: "Cualquiera", min: null, max: null },
    ],
    zapatilla: [
      { id: "hasta150", label: "Hasta $150.000", min: 0, max: 150000 },
      { id: "150-250", label: "$150.000 – $250.000", min: 150000, max: 250000 },
      { id: "mas250", label: "Más de $250.000", min: 250000, max: Infinity },
      { id: "nodecir", label: "Prefiero no decir", min: null, max: null },
    ],
  };

  function presupuestosFor(tipo) {
    return PRESUPUESTOS_POR_TIPO[tipo] || PRESUPUESTOS_POR_TIPO.paleta;
  }

  let steps = [];       // pasos calculados según el tipo elegido
  let stepIndex = 0;
  let answers = {};

  function brandsFor(tipo) {
    return [...new Set(PRODUCTS.filter((p) => p.tipo === tipo).map((p) => p.marca))].sort((a, b) =>
      a.localeCompare(b)
    );
  }

  function formasFor(tipo) {
    const map = new Map(); // key: forma normalizada (sin tildes) -> label a mostrar
    PRODUCTS.filter((p) => p.tipo === tipo && p.forma).forEach((p) => {
      const key = slug(p.forma);
      const hasAccent = /[áéíóúÁÉÍÓÚ]/.test(p.forma);
      if (!map.has(key) || hasAccent) map.set(key, p.forma);
    });
    return [...map.values()];
  }

  // Busca en los specs de cada producto uno cuyo label sea "Tamaño"
  // (data.js: { label: "Tamaño", value: "Grande" }) y arma la lista de opciones.
  function tamanosFor(tipo) {
    const map = new Map();
    PRODUCTS.filter((p) => p.tipo === tipo).forEach((p) => {
      (p.specs || []).forEach((s) => {
        if (slug(s.label) === "tamano") {
          const key = slug(s.value);
          const hasAccent = /[áéíóúÁÉÍÓÚ]/.test(s.value);
          if (!map.has(key) || hasAccent) map.set(key, s.value);
        }
      });
    });
    return [...map.values()];
  }

  function getTamano(p) {
    const spec = (p.specs || []).find((s) => slug(s.label) === "tamano");
    return spec ? spec.value : null;
  }

  // Lee el spec { label: "Tipo", value: "Paletero"/"Mochila"/"Bolso" } de cada bolso.
  // Nota: esto es distinto de "p.tipo" (paleta/bolso/zapatilla), por eso usamos
  // internamente la clave "tipoBolso" para la respuesta del usuario.
  function tiposBolsoFor(tipo) {
    const map = new Map();
    PRODUCTS.filter((p) => p.tipo === tipo).forEach((p) => {
      (p.specs || []).forEach((s) => {
        if (slug(s.label) === "tipo") {
          const key = slug(s.value);
          const hasAccent = /[áéíóúÁÉÍÓÚ]/.test(s.value);
          if (!map.has(key) || hasAccent) map.set(key, s.value);
        }
      });
    });
    return [...map.values()];
  }

  function getTipoBolso(p) {
    const spec = (p.specs || []).find((s) => slug(s.label) === "tipo");
    return spec ? spec.value : null;
  }

  // --- Definición de pasos ---
  function buildSteps() {
    const base = [
      {
        key: "tipo",
        title: "¿Qué estás buscando?",
        sub: "Buscaremos recomendarte lo mejor en base a nuestros productos disponibles y a las características que nos brindes. Elegí el tipo de producto para empezar.",
        type: "options",
        options: [
          { value: "paleta", label: "Paleta" },
          { value: "bolso", label: "Bolso" },
          { value: "zapatilla", label: "Zapatilla" },
        ],
      },
    ];

    if (!answers.tipo) return base;

    if (answers.tipo === "paleta") {
      base.push({
        key: "nivel",
        title: "¿Cuál es tu nivel de juego?",
        sub: "Así te recomendamos algo acorde a tu nivel.",
        type: "options",
        options: [
          ...NIVELES.map((n) => ({ value: n, label: n })),
          { value: "cualquiera", label: "Prefiero no decir" },
        ],
      });
      base.push({
        key: "forma",
        title: "¿Qué formato preferís?",
        sub: "Diamante: potencia. Redonda: control. Lágrima: equilibrio.",
        type: "options",
        options: [
          ...formasFor("paleta").map((f) => ({ value: f, label: f })),
          { value: "cualquiera", label: "Cualquiera" },
        ],
      });
    }

    base.push({
      key: "presupuesto",
      title: "¿Cuál es tu presupuesto?",
      sub: "Los precios son de referencia y pueden variar.",
      type: "options",
      options: presupuestosFor(answers.tipo).map((p) => ({ value: p.id, label: p.label })),
    });

    if (answers.tipo === "bolso") {
      base.push({
        key: "tamano",
        title: "¿Qué tamaño buscás?",
        sub: "Elegí la opción que más se ajuste a lo que necesitás.",
        type: "options",
        options: [
          ...tamanosFor("bolso").map((t) => ({ value: t, label: t })),
          { value: "cualquiera", label: "Cualquiera" },
        ],
      });
      base.push({
        key: "tipoBolso",
        title: "¿Qué tipo de bolso buscás?",
        sub: "Paletero, mochila o bolso.",
        type: "options",
        options: [
          ...tiposBolsoFor("bolso").map((t) => ({ value: t, label: t })),
          { value: "cualquiera", label: "Cualquiera" },
        ],
      });
    } else {
      base.push({
        key: "marca",
        title: "¿Tenés alguna marca preferida?",
        sub: "Si no te importa, elegí \"Cualquiera\".",
        type: "select",
        options: [
          { value: "cualquiera", label: "Cualquiera" },
          ...brandsFor(answers.tipo).map((m) => ({ value: m, label: m })),
        ],
      });
    }

    base.push({ key: "resultado", type: "resultado" });

    return base;
  }


  // --- Scoring ---
  function scoreProduct(p) {
    let score = 0;

    // Nivel y marca pesan menos: son preferencias, no restricciones duras.
    // Si no hay stock que cumpla marca/nivel exactos, el presupuesto y el
    // formato son los que terminan definiendo la recomendación.
    if (answers.nivel && answers.nivel !== "cualquiera") {
      if (p.etiqueta === answers.nivel) score += 1.5;
      else if (p.etiqueta) {
        const diff = Math.abs(NIVELES.indexOf(p.etiqueta) - NIVELES.indexOf(answers.nivel));
        if (diff === 1) score += 0.5;
      }
    }

    if (answers.forma && answers.forma !== "cualquiera") {
      if (slug(p.forma || "") === slug(answers.forma)) score += 4;
    }

    if (answers.marca && answers.marca !== "cualquiera") {
      if (p.marca === answers.marca) score += 1.5;
    }

    if (answers.tamano && answers.tamano !== "cualquiera") {
      const tam = getTamano(p);
      const TAMANOS = ["Pequeño", "Mediano", "Grande"];
      if (tam && slug(tam) === slug(answers.tamano)) {
        score += 4;
      } else if (tam) {
        const iPedido = TAMANOS.findIndex((t) => slug(t) === slug(answers.tamano));
        const iProducto = TAMANOS.findIndex((t) => slug(t) === slug(tam));
        if (iPedido !== -1 && iProducto !== -1 && Math.abs(iPedido - iProducto) === 1) {
          score += 1.5; // tamaño "vecino" (ej: pediste Pequeño, esto es Mediano)
        }
      }
    }

    if (answers.presupuesto && answers.presupuesto !== "nodecir") {
      const rango = presupuestosFor(p.tipo).find((r) => r.id === answers.presupuesto);
      if (rango) {
        if (p.precio >= rango.min && p.precio <= rango.max) {
          score += 4;
        } else {
          const mid = rango.max === Infinity ? rango.min * 1.3 : (rango.min + rango.max) / 2;
          const distRatio = Math.abs(p.precio - mid) / mid;
          score += Math.max(0, 2.5 - distRatio);
        }
      }
    }

    if (p.destacado) score += 0.3;
    if (p.oferta) score += 0.3;

    return score;
  }

  // Precio y formato/tamaño son criterios que SIEMPRE deben cumplirse
  // si el usuario los eligió (no son solo "preferencias"). Nivel y marca
  // sí son blandos: influyen en el orden pero no descartan productos.
  function cumpleCriteriosDuros(p) {
    if (answers.presupuesto && answers.presupuesto !== "nodecir") {
      const rango = presupuestosFor(p.tipo).find((r) => r.id === answers.presupuesto);
      if (rango && !(p.precio >= rango.min && p.precio <= rango.max)) return false;
    }
    if (answers.forma && answers.forma !== "cualquiera") {
      if (slug(p.forma || "") !== slug(answers.forma)) return false;
    }
    if (answers.tipoBolso && answers.tipoBolso !== "cualquiera") {
      const tb = getTipoBolso(p);
      if (!tb || slug(tb) !== slug(answers.tipoBolso)) return false;
    }
    return true;
  }

  function getRecommendations() {
    const pool = PRODUCTS.filter((p) => p.tipo === answers.tipo);

    let candidatos = pool.filter(cumpleCriteriosDuros);
    let exacto = true;

    // Si nadie cumple precio + formato/tamaño exactos, recién ahí
    // relajamos y mostramos lo más parecido posible (con aviso en la UI).
    if (candidatos.length === 0) {
      candidatos = pool;
      exacto = false;
    }

    const recs = candidatos
      .map((p) => ({ p, score: scoreProduct(p) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.p);

    return { recs, exacto };
  }

  // --- Render de pasos ---
  function renderProgress() {
    const totalVisible = steps.length - 1; // sin contar "resultado"
    if (totalVisible <= 0) {
      recoProgress.hidden = true;
      return;
    }
    recoProgress.hidden = false;
    recoProgress.innerHTML = Array.from({ length: totalVisible })
      .map((_, i) => `<span class="reco-progress-dot${i < stepIndex ? " done" : ""}"></span>`)
      .join("");
  }

  function renderStep() {
    const step = steps[stepIndex];
    renderProgress();

    if (step.type === "resultado") {
      renderResultado();
      return;
    }

    const isSelect = step.type === "select";

    recoBody.innerHTML = `
      <h3 class="reco-step-title">${step.title}</h3>
      ${step.sub ? `<p class="reco-step-sub">${step.sub}</p>` : ""}
      ${
        isSelect
          ? `<select class="reco-select" id="recoSelectInput">
              ${step.options
                .map((o) => `<option value="${o.value}">${o.label}</option>`)
                .join("")}
            </select>`
          : `<div class="reco-options">
              ${step.options
                .map(
                  (o) =>
                    `<button type="button" class="reco-option${answers[step.key] === o.value ? " selected" : ""}" data-value="${o.value}">${o.label}</button>`
                )
                .join("")}
            </div>`
      }
      <div class="reco-nav">
        <button type="button" class="reco-btn" id="recoBack" ${stepIndex === 0 ? "disabled" : ""}>Atrás</button>
        ${
          isSelect
            ? `<button type="button" class="reco-btn primary" id="recoNext">Siguiente</button>`
            : ""
        }
      </div>
    `;

    if (isSelect) {
      const select = document.getElementById("recoSelectInput");
      if (answers[step.key]) select.value = answers[step.key];
      document.getElementById("recoNext").addEventListener("click", () => {
        answers[step.key] = select.value;
        goNext();
      });
    } else {
      recoBody.querySelectorAll(".reco-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          answers[step.key] = btn.dataset.value;
          gtag('event', 'recomendador_respuesta', { pregunta: step.key, valor: btn.dataset.value });

          if (step.key === "tipo") {
            steps = buildSteps();
          }
          goNext();
        });
      });
    }

    document.getElementById("recoBack").addEventListener("click", goBack);
  }

  function renderResultado() {
    const { recs, exacto } = getRecommendations();

    gtag('event', 'recomendador_resultado', {
      tipo: answers.tipo,
      nivel: answers.nivel || "",
      forma: answers.forma || "",
      presupuesto: answers.presupuesto || "",
      marca: answers.marca || "",
      tamano: answers.tamano || "",
      tipoBolso: answers.tipoBolso || "",
    });

    recoBody.innerHTML = `
      <h3 class="reco-results-title">Esto te recomendamos 👇</h3>
      ${
        recs.length && !exacto
          ? `<p class="reco-step-sub">No encontramos productos que cumplan exactamente con el precio y formato/tamaño elegidos, pero estas son las opciones más cercanas.</p>`
          : ""
      }
      ${
        recs.length
          ? recs
              .map((p) => {
                const img = getImages(p)[0];
                return `
              <div class="reco-result-card">
                <div class="reco-result-photo">
                  ${img ? `<img src="${img}" alt="${p.marca} ${p.modelo}">` : ""}
                </div>
                <div class="reco-result-info">
                  <div class="reco-result-brand">${p.marca}</div>
                  <div class="reco-result-name">${p.modelo}</div>
                  <div class="reco-result-price">${money(p.precio)}</div>
                </div>
                <a class="reco-result-cta" target="_blank" aria-label="Consultar por WhatsApp"
                  href="https://wa.me/5493513930460?text=${encodeURIComponent(`Hola! Vi la recomendación de ${p.marca} ${p.modelo} y quería consultar.`)}">
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              </div>`;
              })
              .join("")
          : `<p class="reco-results-empty">No encontramos productos de este tipo todavía. Probá con otro filtro o consultanos por WhatsApp.</p>`
      }
      <div class="reco-nav">
        <button type="button" class="reco-btn" id="recoBack">Atrás</button>
        <button type="button" class="reco-btn primary" id="recoDone">Listo</button>
      </div>
      <button type="button" class="reco-restart" id="recoRestart">Volver a empezar</button>
    `;

    document.getElementById("recoBack").addEventListener("click", goBack);
    document.getElementById("recoDone").addEventListener("click", closeReco);
    document.getElementById("recoRestart").addEventListener("click", () => {
      answers = {};
      stepIndex = 0;
      steps = buildSteps();
      renderStep();
    });
  }

  function goNext() {
    if (stepIndex < steps.length - 1) {
      stepIndex++;
      renderStep();
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      stepIndex--;
      renderStep();
    }
  }

  function openReco() {
    answers = {};
    stepIndex = 0;
    steps = buildSteps();
    recoModal.hidden = false;
    document.body.style.overflow = "hidden";
    renderStep();
    gtag('event', 'recomendador_abrir');
  }

  function closeReco() {
    recoModal.hidden = true;
    document.body.style.overflow = "";
  }

  recoOpen.addEventListener("click", openReco);
  recoClose.addEventListener("click", closeReco);
  recoOverlay.addEventListener("click", closeReco);
  document.addEventListener("keydown", (e) => {
    if (!recoModal.hidden && e.key === "Escape") closeReco();
  });
})();