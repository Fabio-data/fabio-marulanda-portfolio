# Portafolio — Ciencia de Datos

**🌐 En vivo: https://fabio-marulanda-portfolio.vercel.app/**

Portafolio web de una sola página, oscuro y moderno, para analista / científico de datos.
Sin build, sin dependencias: HTML + Tailwind (CDN) + JavaScript puro.

## Estructura

```
Portafolio WEB/
├── index.html                  # Home (hero, perfil, stack, proyectos, contacto)
├── proyecto.html               # Página de detalle (una sola, dinámica)
├── assets/
│   ├── css/styles.css          # Animaciones y estilos propios
│   ├── js/proyectos-data.js    # ★ TUS PROYECTOS (fuente única de datos)
│   ├── js/main.js              # Lógica de la home
│   ├── js/proyecto.js          # Lógica de la página de detalle
│   ├── img/                    # Pon aquí tu foto: perfil.jpg
│   └── cv.pdf                  # Tu CV (opcional, lo enlaza el botón del hero)
└── README.md
```

### Cómo funcionan las páginas de proyecto

Cada proyecto tiene su propia URL: `proyecto.html?p=su-slug`
(ej. `proyecto.html?p=prediccion-fuga-clientes`). No necesitas crear un
archivo HTML por proyecto: `proyecto.html` se rellena solo con los datos del
proyecto correspondiente. Tú editas **un solo archivo** y todo se actualiza:
la tarjeta en la home y su página de detalle.

## Cómo verlo

Abre `index.html` con doble clic, o sírvelo en local:

```powershell
python -m http.server 5500
```

Luego entra a `http://localhost:5500`.

## Personalizar (lo esencial)

El contenido ya está adaptado al CV de **Fabio Andrés Marulanda**
(nombre, perfil, experiencia, stack, proyectos y contacto reales).

1. **Textos** → edita `index.html` para ajustar cualquier frase.
2. **Tu foto** → guarda `assets/img/perfil.jpg` y en `index.html` cambia el `src`
   de la imagen del perfil (actualmente usa un placeholder de `picsum.photos`).
3. **Tu CV** → el botón "Descargar CV" enlaza `CV_Fabio_Marulanda_analista.pdf`
   (en la raíz del proyecto). Reemplaza ese archivo si actualizas el CV.
4. **Enlaces** → en la sección de contacto están el correo, GitHub y teléfono reales.

## Agregar o editar proyectos (lo más frecuente)

Abre **`assets/js/proyectos-data.js`** y edita el array `window.PROYECTOS`.
Copia un bloque `{ ... }`, cámbialo, guarda y recarga. Cada objeto alimenta
tanto la tarjeta de la home como su página de detalle:

```js
{
  slug: "dashboards-ventas-powerbi",  // identificador para la URL (sin espacios ni tildes)
  titulo: "Dashboards de ventas en Power BI y Looker Studio",
  categoria: "viz",                   // "viz" | "auto" | "analisis" | "ml"
  resumen: "Una frase para la tarjeta de la home.",
  metrica: "Power BI · Looker",       // etiqueta corta sobre la imagen
  stack: ["Power BI", "Looker Studio", "SQL"],
  imagen: "https://picsum.photos/seed/lo-que-sea/1200/750", // o "assets/img/proyecto1.jpg"
  repo: "",                           // "" oculta el botón (proyectos internos)
  demo: "",                           // "" oculta el botón

  // --- contenido de la página de detalle ---
  rol: "Científico de Datos",
  periodo: "2024 · 3 meses",
  cliente: "Empresa de suscripciones B2C",
  problema: "Párrafo: qué dolía y por qué importaba.",
  solucion: "Párrafo: qué construiste y cómo se usa.",
  proceso: ["Paso 1", "Paso 2", "Paso 3"],
  resultados: [
    { valor: "0.912", etiqueta: "AUC en test" },
    { valor: "-23%",  etiqueta: "Fuga de clientes" },
  ],
  galeria: ["https://picsum.photos/seed/img1/1000/620"], // [] = sin galería
}
```

Los filtros, la página de detalle y la navegación anterior/siguiente se
actualizan solos. Importante: `slug` debe ser único y sin espacios ni tildes.

## Activar el formulario de contacto

Por defecto el envío está **simulado**. Para recibir mensajes reales, usa un
servicio gratuito como [Formspree](https://formspree.io) o
[Web3Forms](https://web3forms.com):

En `assets/js/main.js`, dentro del `try`, descomenta y completa:

```js
const r = await fetch("https://formspree.io/f/TU_ID", {
  method: "POST",
  body: new FormData(form),
  headers: { Accept: "application/json" },
});
if (!r.ok) throw new Error();
```

…y borra la línea de simulación (`await new Promise(...)`).

## Publicar gratis

- **GitHub Pages**: sube la carpeta a un repo y activa Pages (rama `main`, carpeta raíz).
- **Netlify / Vercel**: arrastra la carpeta o conecta el repo. No necesita configuración.

## Notas

- Tailwind se carga por CDN para facilitar el mantenimiento. Si más adelante quieres
  optimizar para producción, puedes migrar al CLI de Tailwind (build estático).
- La paleta y tipografías se configuran en el bloque `tailwind.config` dentro de `index.html`.
