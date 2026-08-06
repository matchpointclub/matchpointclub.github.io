/*
  DATOS DEL CATÁLOGO
  -------------------
  Acá cargás tus productos reales. Cada objeto es un producto
  (paleta o bolso). Para agregar uno nuevo, copiá un bloque
  { ... } completo, pegalo antes del corchete final "]" y
  modificá los valores.

  Campos comunes a TODOS los productos:
    marca      -> Nombre de marca. Se usa para generar los filtros.
                  Para bolsos, usá siempre "Bolsos" como marca:
                  así aparecen agrupados como si fueran otra marca.
    modelo     -> Nombre del modelo
    precio     -> Número, sin puntos ni comas (ej: 185000)
    tipo       -> "paleta" | "bolso"  (define qué ícono se dibuja)
    color      -> Color de acento de la ficha (código hex)
    destacado  -> true / false (opcional, muestra "Top ventas")
    etiqueta   -> Texto corto que va en la pastilla de abajo de la
                  ficha (para paletas: nivel de juego. Para bolsos:
                  algo como "Accesorio" o la capacidad)
    specs      -> Lista de características a mostrar. Cada una es
                  { label, value } y opcionalmente full:true si
                  querés que ocupe las dos columnas.
    imagenes   -> (opcional) Lista de rutas a fotos reales del
                  producto, ej: ["images/paletas/foto1.png",
                  "images/paletas/foto2.png"]. Podés poner una
                  sola o varias: si hay más de una, en la ficha
                  aparecen puntitos abajo de la foto y el usuario
                  puede tocar la imagen o deslizar (swipe) para
                  pasar de una a otra. Si el array queda vacío
                  ([]), se muestra el ícono dibujado como
                  placeholder. Ver instrucciones abajo.

  Solo para paletas:
    forma      -> "Diamante" | "Redonda" | "Lagrima"
                  (define el dibujo de la cabeza de la paleta,
                  solo se usa si el producto NO tiene fotos)

  -----------------------------------------------------------
  CÓMO AGREGAR FOTOS REALES
  -----------------------------------------------------------
  1. Guardá la foto del producto (fondo blanco o transparente
     da mejor resultado) dentro de la carpeta:
       - paletas -> images/paletas/
       - bolsos  -> images/bolsos/
  2. Nombrala fácil de identificar, ej: nox-ml10-pro-cup-1.png,
     nox-ml10-pro-cup-2.png (si vas a subir más de una).
  3. En el producto correspondiente, completá el array:
       imagenes: [
         "images/paletas/nox-ml10-pro-cup-1.png",
         "images/paletas/nox-ml10-pro-cup-2.png",
       ]
  4. Listo, la ficha va a mostrar las fotos (con slider si hay
     más de una) en vez del dibujo.
*/

const PRODUCTS = [
  // ---------------- ADIDAS ----------------
  {
    marca: "Adidas", modelo: "Arrow Hit CTRL 3.5", precio: 700000,
    tipo: "paleta", forma: "Redonda", color: "#8A8FF0",
    imagenes: ["images/paletas/arrowhit ctrl 26 1.webp",
      "images/paletas/arrowhit ctrl 26 2.webp",
      "images/paletas/arrowhit ctrl 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "360-375 g" },
      { label: "Núcleo", value: "EVA Soft Performance" },
      { label: "Cara", value: "ASC Carbon Fiber", full: true },
    ],
  },
  {
    marca: "Adidas", modelo: "Metalbone CTRL 3.5", precio: 730000,
    tipo: "paleta", forma: "Redonda", color: "#8A8FF0",
    imagenes: ["images/paletas/metalbone ctrl 3.5 26 1.webp",
      "images/paletas/metalbone ctrl 3.5 26 2.webp",
      "images/paletas/metalbone ctrl 3.5 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Bajo" },
      { label: "Peso", value: "345-360 g" },
      { label: "Núcleo", value: "EVA Soft Performance" },
      { label: "Cara", value: "Carbon Aluminized 16K", full: true },
    ],
  },
  {
    marca: "Adidas", modelo: "Metalbone 3.5", precio: 730000,
    tipo: "paleta", forma: "Diamante", color: "#8A8FF0",
    imagenes: ["images/paletas/metalbone 3.5 26 1.webp",
      "images/paletas/metalbone 3.5 26 2.webp",
      "images/paletas/metalbone 3.5 26 3.webp"
    ],
    destacado: true, etiqueta: "Profesional",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "360-375 g" },
      { label: "Núcleo", value: "EVA Soft Performance" },
      { label: "Cara", value: "Carbon Aluminized 16K", full: true },
    ],
  },
  {
  marca: "Adidas", modelo: "Cross It Team CTRL 3.5",
  precioAnterior: 390000,
  precio: 350000,
  oferta: true,
  tipo: "paleta",
  forma: "Redonda",
  color: "#9FCC2E",
  imagenes: [
    "images/paletas/cross it team 26 1.webp",
    "images/paletas/cross it team 26 2.webp",
    "images/paletas/cross it team 26 3.webp"
  ],
  etiqueta: "Intermedio",
  specs: [
    { label: "Forma", value: "Redonda" },
    { label: "Balance", value: "Medio" },
    { label: "Peso", value: "360-375 g" },
    { label: "Núcleo", value: "Soft Performance EVA" },
    { label: "Cara", value: "Fibra de vidrio", full: true },
  ],
},
 
  // ---------------- NOX ----------------
 {
    marca: "Nox", modelo: "AT10 Genius 12K Xtrem 26", precio: 680000,
    tipo: "paleta", forma: "Lagrima", color: "#F4A300",
    imagenes: ["images/paletas/at10 12k 26 1.webp",
      "images/paletas/at10 12k 26 2.webp",
      "images/paletas/at10 12k 26 3.webp"
    ],
    destacado: true, etiqueta: "Profesional",
    specs: [
      { label: "Forma", value: "Lágrima" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "360-375 g" },
      { label: "Núcleo", value: "HR3 Black EVA" },
      { label: "Cara", value: "Carbon Fiber 12K Alum Xtrem", full: true },
    ],
  },
  {
    marca: "Nox", modelo: "EA10 Ventus Hybrid 12K 26", precio: 600000,
    tipo: "paleta", forma: "Lagrima", color: "#F4A300",
    imagenes: ["images/paletas/ea10 hybrid 12k 26 1.webp",
      "images/paletas/ea10 hybrid 12k 26 2.webp",
      "images/paletas/ea10 hybrid 12k 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Lágrima" },
      { label: "Balance", value: "Medio-Alto" },
      { label: "Peso", value: "360-375 g" },
      { label: "Núcleo", value: "MLD Black EVA" },
      { label: "Cara", value: "Carbon Fiber 12K Xtrem", full: true },
    ],
  },
  {
    marca: "Nox", modelo: "VK10 Ventus 12K 26", precio: 525000,
    tipo: "paleta", forma: "Redonda", color: "#F4A300",
    imagenes: ["images/paletas/vk10 12k 26 1.webp",
      "images/paletas/vk10 12k 26 2.webp",
      "images/paletas/vk10 12k 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Bajo" },
      { label: "Peso", value: "360-375 g" },
      { label: "Núcleo", value: "MLD Black EVA" },
      { label: "Cara", value: "Carbon Fiber 12K Xtrem", full: true },
    ],
  },
  {
    marca: "Nox", modelo: "X-Hero 26", precio: 220000,
    tipo: "paleta", forma: "Redonda", color: "#F4A300",
    imagenes: ["images/paletas/xhero 1.webp",
      "images/paletas/xhero 2.webp",
      "images/paletas/xhero 3.webp"
    ],
    etiqueta: "Iniciación",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "350-360 g" },
      { label: "Núcleo", value: "HR3 White EVA" },
      { label: "Cara", value: "Fibra de vidrio 3K", full: true },
    ],
  },
 

  // ---------------- BULLPADEL ----------------
  {
    marca: "Bullpadel", modelo: "Hack 04 26", precio: 500000,
    tipo: "paleta", forma: "Diamante", color: "#9FCC2E",
    imagenes: ["images/paletas/hack04 1.webp",
      "images/paletas/hack 04 2.webp",
      "images/paletas/hack 04 3.webp"
    ],
    etiqueta: "Profesional",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "365-375 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "TriCarbon 18K", full: true },
    ],
  },
  {
    marca: "Bullpadel", modelo: "Vertex 05 26", precio: 480000,
    tipo: "paleta", forma: "Diamante", color: "#9FCC2E",
    imagenes:  ["images/paletas/vertex 05 26 2.webp",
      "images/paletas/vertex 05 26 1.webp",
      "images/paletas/vertex 05 26 3.webp"
    ]
    ,
    etiqueta: "Profesional",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "365-375 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "Xtend Carbon 12K", full: true },
    ],
  },
  {
    marca: "Bullpadel", modelo: "Flow 26", precio: 350000,
    tipo: "paleta", forma: "Diamante", color: "#9FCC2E",
    imagenes:  ["images/paletas/flow26 1.webp",
      "images/paletas/flow26 2.webp",
      "images/paletas/flow26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "350-360 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "Fibrix", full: true },
    ],
  },
  {
    marca: "Bullpadel", modelo: "Vertex 05 comfort 26", precio: 350000,
    tipo: "paleta", forma: "Diamante", color: "#9FCC2E",
    imagenes:  ["images/paletas/vertex05 comfort 26 1.webp",
      "images/paletas/vertex05 comfort 26 2.webp",
      "images/paletas/vertex05 comfort 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "360-370 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "Fibrix", full: true },
    ],
  },
  {
    marca: "Bullpadel", modelo: "XPLO Comfort 26", precio: 345000,
    tipo: "paleta", forma: "Diamante", color: "#9FCC2E",
    imagenes:  ["images/paletas/xplo comfort 26 1.webp",
      "images/paletas/xplo comfort 26 2.webp",
      "images/paletas/xplo comfort 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "360-370 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "Fibrix", full: true },
    ],
  },
  {
    marca: "Bullpadel", modelo: "Hack 04 Comfort 26", precio: 330000,precioAnterior: 365000,oferta: true,
    tipo: "paleta", forma: "Diamante", color: "#9FCC2E",
    imagenes:  ["images/paletas/hack 04 comfort 26 1.webp",
      "images/paletas/hack 04 comfort 26 2.webp",
      "images/paletas/hack 04 comfort 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "360-370 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "Fibrix", full: true },
    ],
  },
  {
    marca: "Bullpadel", modelo: "Neuron 02 Edge 26", precio: 520000,
    tipo: "paleta", forma: "Redonda", color: "#9FCC2E",
    imagenes:  ["images/paletas/neuron edge 02 26 1.webp",
      "images/paletas/neuron edge 02 26 2.webp",
      "images/paletas/neuron edge 02 26 3.webp"
     
    ],
    etiqueta: "Profesional",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "360-370 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "Carbono 3K", full: true },
    ],
  },
  {
    marca: "Bullpadel", modelo: "Ionic Light 26", precio: 340000,
    tipo: "paleta", forma: "Lagrima", color: "#9FCC2E",
    imagenes:  ["images/paletas/ionic light 26 1.webp",
      "images/paletas/ionic light 26 2.webp",
      "images/paletas/ionic light 26 3.webp"
     
    ],
    etiqueta: "Intermedio",
    specs: [
      { label: "Forma", value: "Lágrima" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "345-355 g" },
      { label: "Núcleo", value: "MultiEVA" },
      { label: "Cara", value: "Glaphite", full: true },
    ],
  },
  {
  marca: "Bullpadel", modelo: "Neuron TF 24", precio: 425000, precioAnterior: 515000,oferta: true,
  tipo: "paleta", forma: "Lágrima", color: "#9FCC2E",
  imagenes: [
    "images/paletas/neuron tf 24 1.webp",
    "images/paletas/neuron tf 24 2.webp",
    "images/paletas/neuron tf 24 3.webp"
  ],
  etiqueta: "Avanzado",
  specs: [
    { label: "Forma", value: "Lágrima" },
    { label: "Balance", value: "Medio" },
    { label: "Peso", value: "355-365 g" },
    { label: "Núcleo", value: "MultiEVA" },
    { label: "Cara", value: "Xtend Carbon 3K", full: true },
  ],
},
{
  marca: "Bullpadel", modelo: "Icon 25", precio: 365000, precioAnterior: 425000,
  tipo: "paleta", forma: "Diamante", color: "#142534",
  oferta: true, etiqueta: "Avanzado",
  imagenes: [
    "images/paletas/icon 25 1.webp",
    "images/paletas/icon 25 2.webp",
    "images/paletas/icon 25 3.webp"
  ],
  specs: [
    { label: "Forma", value: "Diamante" },
    { label: "Balance", value: "Alto" },
    { label: "Peso", value: "365-375 g" },
    { label: "Núcleo", value: "EVA Foam" },
    { label: "Cara", value: "Fibra de carbono", full: true },
  ],
},
{
  marca: "Bullpadel", modelo: "Pearl Cloud 25", precio: 285000, precioAnterior: 325000,
  tipo: "paleta", forma: "Redonda", color: "#BE9A52",
  oferta: true, etiqueta: "Intermedio",
  imagenes: [
    "images/paletas/pearl cloud 25 1.webp",
    "images/paletas/pearl cloud 25 2.webp",
    "images/paletas/pearl cloud 25 3.webp"
  ],
  specs: [
    { label: "Forma", value: "Redonda" },
    { label: "Balance", value: "Medio" },
    { label: "Peso", value: "355-365 g" },
    { label: "Núcleo", value: "EVA Soft" },
    { label: "Cara", value: "Fibra de vidrio", full: true },
  ],
},

  // ---------------- SANÉ ----------------
  {
    marca: "Sané", modelo: "Agressor Evolution Hybrid Alpha", precio: 400000,
    tipo: "paleta", forma: "Lagrima", color: "#6C63FF",
    imagenes: ["images/paletas/evolution alpha 1.webp",
      "images/paletas/evolution alpha 2.webp",
      "images/paletas/evolution alpha 3.webp"
    ],
    destacado: true, etiqueta: "Profesional",
    specs: [
      { label: "Forma", value: "Híbrida (lagrima)" },
      { label: "Balance", value: "Medio-Alto" },
      { label: "Peso", value: "355-375 g" },
      { label: "Núcleo", value: "PRO HD-R" },
      { label: "Cara", value: "Carbono 21K Aluminizado", full: true },
    ],
  },
  {
    marca: "Sané", modelo: "Agressor VII Black", precio: 230000,
    tipo: "paleta", forma: "Lagrima", color: "#6C63FF",
    imagenes: ["images/paletas/agressor black 1.webp",
      "images/paletas/agressor black 2.webp"    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Gota o Lágrima" },
      { label: "Balance", value: "Medio-Alto" },
      { label: "Peso", value: "355-375 g" },
      { label: "Núcleo", value: "Híbrido Compacto" },
      { label: "Cara", value: "Carbono 6K (4mm)", full: true },
    ],
  },
 
  // ---------------- HEAD ----------------
   {
    marca: "Head", modelo: "Gravity Pro 23", precio: 245000,
    tipo: "paleta", forma: "Redonda", color: "#4CC9F0",
    imagenes: ["images/paletas/gravity 1.webp",
      "images/paletas/gravity 2.webp"
    ],
    destacado: true, etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "360-375 g" },
      { label: "Núcleo", value: "Control Foam" },
      { label: "Cara", value: "Carbono + Fibra de vidrio (híbrido)", full: true },
    ],
  },
  {
    marca: "Head", modelo: "Evo Speed 23", precio: 168000, precioAnterior: 190000, oferta: true,
    tipo: "paleta", forma: "Lagrima", color: "#4CC9F0",
    imagenes: ["images/paletas/evo speed 23 1.webp",
      "images/paletas/evo speed 23 2.webp"
    ],
    etiqueta: "Iniciación",
    specs: [
      { label: "Forma", value: "Lágrima (oversize)" },
      { label: "Balance", value: "Medio (centrado)" },
      { label: "Peso", value: "355-375 g" },
      { label: "Núcleo", value: "Soft Foam" },
      { label: "Cara", value: "Fibra de vidrio", full: true },
    ],
  },
 {
  marca: "Head", modelo: "Bolt 26", precio: 190000,
  tipo: "paleta", forma: "Lágrima", color: "#5E8C61",
  imagenes: [
    "images/paletas/bolt 26 1.webp",
    "images/paletas/bolt 26 2.webp"  ],
  etiqueta: "Iniciación",
  specs: [
    { label: "Forma", value: "Lágrima" },
    { label: "Balance", value: "Medio" },
    { label: "Peso", value: "360 g" },
    { label: "Núcleo", value: "Power Foam" },
    { label: "Cara", value: "Fibra de vidrio", full: true },
  ],
},
{
  marca: "Head", modelo: "Flash Pro 23", precio: 195000,
  precioAnterior: 215000,
  oferta: true,
  tipo: "paleta", forma: "Lágrima", color: "#2E86AB",
  imagenes: [
    "images/paletas/flash 23 1.webp",
    "images/paletas/flash 23 2.webp",
    "images/paletas/flash 23 3.webp"
  ],
  etiqueta: "Intermedio",
  specs: [
    { label: "Forma", value: "Lágrima" },
    { label: "Balance", value: "Medio" },
    { label: "Peso", value: "365 g" },
    { label: "Núcleo", value: "Power Foam" },
    { label: "Cara", value: "Fibra de vidrio", full: true },
  ],
},


  // --------------- PROGO ----------------
   {
    marca: "Pro Go", modelo: "Gelidis Drive 26", precio: 190000,
    tipo: "paleta", forma: "Lagrima", color: "#FF5A5F",
    imagenes: ["images/paletas/gelidis 26 1.webp",
      "images/paletas/gelidis 26 2.webp",
    ],
    etiqueta: "Intermedio",
    specs: [
      { label: "Forma", value: "Lágrima" },
      { label: "Balance", value: "Medio-Bajo" },
      { label: "Peso", value: "355-365 g" },
      { label: "Núcleo", value: "Blitz Core (EVA 30)" },
      { label: "Cara", value: "Fibra Glasstech", full: true },
    ],
  },
  {
    marca: "Pro Go", modelo: "Ignis Drive 26", precio: 240000,
    tipo: "paleta", forma: "Diamante", color: "#FF5A5F",
    imagenes: ["images/paletas/ignis 26 1.webp",
      "images/paletas/ignis 26 2.webp",
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Medio-Alto" },
      { label: "Peso", value: "355-365 g" },
      { label: "Núcleo", value: "Aura Core (EVA 28)" },
      { label: "Cara", value: "Carbono 3K", full: true },
    ],
  },

  // ---------------- URICH ----------------
  {
    marca: "Urich", modelo: "Iron Hard 26", precio: 245000,
    tipo: "paleta", forma: "Redonda", color: "#2EC4B6",
    imagenes: ["images/paletas/iron hard 26 1.webp",
      "images/paletas/iron hard 26 2.webp",
      "images/paletas/iron hard 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Bajo" },
      { label: "Peso", value: "345-370 g" },
      { label: "Núcleo", value: "EVA 30 (dureza media)" },
      { label: "Cara", value: "Fibra de Carbono 3K", full: true },
    ],
  },
  {
    marca: "Urich", modelo: "Fusion Hard 26", precio: 260000,
    tipo: "paleta", forma: "Lagrima", color: "#2EC4B6",
    imagenes: ["images/paletas/fusion hard 26 1.webp",
      "images/paletas/fusion hard 26 2.webp",
      "images/paletas/fusion hard 26 3.webp"
    ],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Híbrida (Diamante + Lágrima)" },
      { label: "Balance", value: "Medio-Alto" },
      { label: "Peso", value: "360-380 g" },
      { label: "Núcleo", value: "Goma V50 (alta dureza)" },
      { label: "Cara", value: "Fibra de Carbono 3K", full: true },
    ],
  },
  {
    marca: "Urich", modelo: "Fusion Flex Gris 26", precio: 290000,
    tipo: "paleta", forma: "Lagrima", color: "#2EC4B6",
    imagenes: ["images/paletas/fusion flex 26 1.webp",
      "images/paletas/fusion flex 26 2.webp",
      "images/paletas/fusion flex 26 3.webp"
    ],
    destacado: true, etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Híbrida (Diamante + Lágrima)" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "350-375 g" },
      { label: "Núcleo", value: "EVA 15 (Foam)" },
      { label: "Cara", value: "Fibra de Carbono 3K", full: true },
    ],
  },
 // ---------------- VARLION ----------------
  {
    marca: "Varlion", modelo: "LW Hexagon 8.8 23", precio: 135000, precioAnterior: 165000, oferta: true,
    tipo: "paleta", forma: "Redonda", color: "#1D3557",
    imagenes: [
      "images/paletas/lw hexagon 1.webp",
      "images/paletas/lw hexagon 2.webp",
      "images/paletas/lw hexagon 3.webp"
    ],
    etiqueta: "Iniciación",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Bajo" },
      { label: "Peso", value: "345-370 g" },
      { label: "Núcleo", value: "EVA Hypersoft" },
      { label: "Cara", value: "Fibra de vidrio", full: true },
    ],
  },
  {
    marca: "Varlion", modelo: "LW Carbon Goldblack 25", precio: 355000,
    tipo: "paleta", forma: "Redonda", color: "#1D3557",
    imagenes: [
      "images/paletas/lw gold 25 1.webp",
      "images/paletas/lw gold 25 2.webp",
      "images/paletas/lw gold 25 3.webp"
    ],
    etiqueta: "Intermedio",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Medio-Bajo" },
      { label: "Peso", value: "345-360 g" },
      { label: "Núcleo", value: "EVA Soft" },
      { label: "Cara", value: "Carbono 7 Rhombus (12K)", full: true },
    ],
  },
  {
    marca: "Varlion", modelo: "LW Carbon TI 25", precio: 290000,
    tipo: "paleta", forma: "Redonda", color: "#1D3557",
    imagenes: [
      "images/paletas/lw carbon 25 1.webp",
      "images/paletas/lw carbon 25 2.webp",
      "images/paletas/lw carbon 25 3.webp"
    ],
    etiqueta: "Intermedio",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Medio-Bajo" },
      { label: "Peso", value: "345-360 g" },
      { label: "Núcleo", value: "EVA Softcolor" },
      { label: "Cara", value: "Fibra de carbono + vidrio", full: true },
    ],
  },
  // ---------------- BOLSOS ----------------
  // marca siempre "Bolsos" para que aparezcan agrupados en su propio filtro
  {
  marca: "Bolsos", modelo: "Mochila Advance 26", precio: 110000,
  tipo: "bolso", color: "#B08968",
  destacado: true, etiqueta: "Pequeño",
  imagenes: ["images/bolsos/mochi advance 26 1.webp",
    "images/bolsos/mochi advance 26 2.webp",
    "images/bolsos/mochi advance 26 3.webp",
    "images/bolsos/mochi advance 26 4.webp"
    
  ],
  specs: [
    { label: "Tamaño", value: "Pequeño" },
    { label: "Térmico", value: "No" },
    { label: "Tipo", value: "Mochila" },
    { label: "Material", value: "Poliéster resistente", full: true },
  ],
},

{
  marca: "Bolsos", modelo: "Paletero Advance 26", precio: 145000,
  tipo: "bolso", color: "#B08968",
  destacado: true, etiqueta: "Mediano",
  imagenes: ["images/bolsos/advance naranja 26 1.webp",
    "images/bolsos/advance naranja 26 2.webp",
    "images/bolsos/advance multi 26 1.webp",
    "images/bolsos/advance multi 26 2.webp",
    "images/bolsos/advance rosa 26 1.webp",
    "images/bolsos/advance rosa 26 2.webp",
    "images/bolsos/advance verde 26 1.webp",
    "images/bolsos/advance verde 26 2.webp"
  ],
  specs: [
    { label: "Tamaño", value: "Mediano" },
    { label: "Térmico", value: "Sí" },
    { label: "Tipo", value: "Paletero" },
    { label: "Material", value: "Poliéster reforzado", full: true },
  ],
},

{
  marca: "Bolsos", modelo: "Paletero Casual 26", precio: 170000,
  tipo: "bolso", color: "#B08968",
  destacado: true, etiqueta: "Grande",
  imagenes: ["images/bolsos/casual 26 1.webp",
    "images/bolsos/casual 26 2.webp",
  ],
  specs: [
    { label: "Tamaño", value: "Grande" },
    { label: "Térmico", value: "Sí" },
    { label: "Tipo", value: "Paletero" },
    { label: "Material", value: "Poliéster de alta resistencia", full: true },
  ],
},
{
  marca: "Bolsos", modelo: "Vertex Negro", precio: 230000,
  tipo: "bolso", color: "#B08968",
  destacado: true, etiqueta: "Grande",
  imagenes: ["images/bolsos/vertex negro 1.webp",
    "images/bolsos/vertex negro 2.webp",
    "images/bolsos/vertex negro 3.webp"  ],
  specs: [
    { label: "Tamaño", value: "Grande" },
    { label: "Térmico", value: "Sí (doble compartimento)" },
    { label: "Tipo", value: "Paletero" },
    { label: "Material", value: "Poliéster 1680D", full: true },
  ],
},

{
  marca: "Bolsos", modelo: "ML10 Team", precio: 170000,
  tipo: "bolso", color: "#B08968",
  destacado: true, etiqueta: "Grande",
  imagenes: ["images/bolsos/ml10 team 1.webp",
    "images/bolsos/ml10 team 2.webp",
    "images/bolsos/ml10 team 3.webp",
    "images/bolsos/ml10 team 4.webp"
  ],
  specs: [
    { label: "Tamaño", value: "Grande" },
    { label: "Térmico", value: "Sí (ThermoTech)" },
    { label: "Tipo", value: "Paletero" },
    { label: "Material", value: "Poliéster", full: true },
  ],
},

{
  marca: "Bolsos", modelo: "Drive", precio: 105000,
  tipo: "bolso", color: "#B08968",
  destacado: true, etiqueta: "Mediano",
  imagenes: ["images/bolsos/drive 1.webp",
    "images/bolsos/drive 2.webp",
    "images/bolsos/drive 3.webp",
    "images/bolsos/drive 4.webp",
    "images/bolsos/drive 5.webp",
    "images/bolsos/drive 6.webp",
    "images/bolsos/drive 7.webp"
  ],
  specs: [
    { label: "Tamaño", value: "Mediano" },
    { label: "Térmico", value: "Si" },
    { label: "Tipo", value: "Paletero" },
    { label: "Material", value: "Poliéster resistente", full: true },
  ],
},
{
  marca: "Bolsos", modelo: "Bullpadel W", precio: 125000, precioAnterior: 160000,
  tipo: "bolso", color: "#142534",
  oferta: true, etiqueta: "Mediano",
  imagenes: [
    "images/bolsos/bullpadel w 1.webp",
    "images/bolsos/bullpadel w 2.webp",
    "images/bolsos/bullpadel w 3.webp",
  ],
  specs: [
    { label: "Tamaño", value: "Mediano" },
    { label: "Térmico", value: "No" },
    { label: "Tipo", value: "Bolso" },
    { label: "Material", value: "Poliéster resistente", full: true },
  ],
},
{
  marca: "Bolsos", modelo: "NIU Tour", precio: 145000,
  tipo: "bolso", color: "#1D3557",
  etiqueta: "Grande",
  imagenes: [
    "images/bolsos/niu tour 1.webp",
    "images/bolsos/niu tour 2.webp",
    "images/bolsos/niu tour 3.webp",
    "images/bolsos/niu tour 4.webp"
  ],
  specs: [
    { label: "Tamaño", value: "Grande" },
    { label: "Térmico", value: "No" },
    { label: "Tipo", value: "Bolso" },
    { label: "Material", value: "Poliéster resistente", full: true },
  ],
},
{
  marca: "Bolsos", modelo: "Dropshot Ambition Rojo", precio: 135000, precioAnterior: 160000,
  tipo: "bolso", color: "#C1272D",
  oferta: true, etiqueta: "Mediano",
  imagenes: [
    "images/bolsos/drop ambition rojo 1.webp",
    "images/bolsos/drop ambition rojo 2.webp"
  ],
  specs: [
    { label: "Tamaño", value: "Mediano" },
    { label: "Térmico", value: "No" },
    { label: "Tipo", value: "Bolso" },
    { label: "Material", value: "Poliéster resistente", full: true },
  ],
},
];