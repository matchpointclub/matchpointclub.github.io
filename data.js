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
    marca: "Bullpadel", modelo: "Vertex 05 26", precio: 500000,
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
    marca: "Bullpadel", modelo: "Flow 26", precio: 380000,
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
    marca: "Bullpadel", modelo: "Vertex 05 comfort 26", precio: 370000,
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
    marca: "Bullpadel", modelo: "XPLO Comfort 26", precio: 365000,
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
    marca: "Bullpadel", modelo: "Hack 04 Comfort 26", precio: 350000,
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
      { label: "Forma", value: "Híbrida (gota-redonda)" },
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
    marca: "Head", modelo: "Evo Speed 23", precio: 170000,
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
 

  // ---------------- PROGO ----------------
  {
    marca: "Progo", modelo: "Fusion X", precio: 178000,
    tipo: "paleta", forma: "Diamante", color: "#FF5A5F",
    imagenes: [],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "360-370 g" },
      { label: "Núcleo", value: "Goma EVA Hard" },
      { label: "Cara", value: "Fibra de carbono", full: true },
    ],
  },
  {
    marca: "Progo", modelo: "Strike", precio: 142000,
    tipo: "paleta", forma: "Lagrima", color: "#FF5A5F",
    imagenes: [],
    etiqueta: "Intermedio",
    specs: [
      { label: "Forma", value: "Lágrima" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "355-365 g" },
      { label: "Núcleo", value: "Goma EVA Multieva" },
      { label: "Cara", value: "Fibra de vidrio", full: true },
    ],
  },
  {
    marca: "Progo", modelo: "Rookie", precio: 79000,
    tipo: "paleta", forma: "Redonda", color: "#FF5A5F",
    imagenes: [],
    etiqueta: "Iniciación",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Bajo" },
      { label: "Peso", value: "340-350 g" },
      { label: "Núcleo", value: "Goma EVA Soft" },
      { label: "Cara", value: "Fibra de vidrio", full: true },
    ],
  },

  // ---------------- URICH ----------------
  {
    marca: "Urich", modelo: "Apex", precio: 188000,
    tipo: "paleta", forma: "Diamante", color: "#2EC4B6",
    imagenes: [],
    etiqueta: "Avanzado",
    specs: [
      { label: "Forma", value: "Diamante" },
      { label: "Balance", value: "Alto" },
      { label: "Peso", value: "360-370 g" },
      { label: "Núcleo", value: "Goma EVA Hard" },
      { label: "Cara", value: "Fibra de carbono", full: true },
    ],
  },
  {
    marca: "Urich", modelo: "Motion", precio: 132000,
    tipo: "paleta", forma: "Lagrima", color: "#2EC4B6",
    imagenes: [],
    etiqueta: "Intermedio",
    specs: [
      { label: "Forma", value: "Lágrima" },
      { label: "Balance", value: "Medio" },
      { label: "Peso", value: "355-365 g" },
      { label: "Núcleo", value: "Goma EVA Multieva" },
      { label: "Cara", value: "Fibra de vidrio", full: true },
    ],
  },
  {
    marca: "Urich", modelo: "Start", precio: 74000,
    tipo: "paleta", forma: "Redonda", color: "#2EC4B6",
    imagenes: [],
    etiqueta: "Iniciación",
    specs: [
      { label: "Forma", value: "Redonda" },
      { label: "Balance", value: "Bajo" },
      { label: "Peso", value: "340-350 g" },
      { label: "Núcleo", value: "Goma EVA Soft" },
      { label: "Cara", value: "Fibra de vidrio", full: true },
    ],
  },

  // ---------------- BOLSOS ----------------
  // marca siempre "Bolsos" para que aparezcan agrupados en su propio filtro
  {
    marca: "Bolsos", modelo: "Paletero Pro X3", precio: 85000,
    tipo: "bolso", color: "#B08968",
    destacado: true, etiqueta: "3 paletas",
    specs: [
      { label: "Capacidad", value: "3 paletas" },
      { label: "Material", value: "Poliéster 900D" },
      { label: "Bolsillos", value: "2 externos" },
      { label: "Correas", value: "Ajustables + mochila", full: true },
    ],
  },
  {
    marca: "Bolsos", modelo: "Mochila Match", precio: 62000,
    tipo: "bolso", color: "#B08968",
    etiqueta: "2 paletas",
    specs: [
      { label: "Capacidad", value: "2 paletas" },
      { label: "Material", value: "Nylon reforzado" },
      { label: "Bolsillos", value: "1 térmico" },
      { label: "Correas", value: "Tipo mochila", full: true },
    ],
  },
  {
    marca: "Bolsos", modelo: "Bolso Térmico Duo", precio: 48000,
    tipo: "bolso", color: "#B08968",
    etiqueta: "1 paleta",
    specs: [
      { label: "Capacidad", value: "1 paleta" },
      { label: "Material", value: "Interior térmico" },
      { label: "Bolsillos", value: "1 externo" },
      { label: "Correas", value: "Al hombro", full: true },
    ],
  },
];
