/* =========================================================
   Página de detalle de proyecto (proyecto.html?p=slug)
   Lee los datos de assets/js/proyectos-data.js
   ========================================================= */

const PROYECTOS = window.PROYECTOS || [];
const CAT_LABEL = { viz: "Visualización & BI", auto: "Automatización", analisis: "Análisis", ml: "Forecasting / ML" };

const params = new URLSearchParams(location.search);
const slug = params.get("p");
const idx = PROYECTOS.findIndex((p) => p.slug === slug);

const detalle = document.getElementById("detalle");
const noEncontrado = document.getElementById("noEncontrado");

document.getElementById("year").textContent = new Date().getFullYear();

if (idx === -1) {
  // Estado: proyecto inexistente
  noEncontrado.classList.remove("hidden");
} else {
  const p = PROYECTOS[idx];
  detalle.classList.remove("hidden");

  // Título de pestaña
  document.title = `${p.titulo} — Fabio Andrés Marulanda`;

  const set = (id, value) => { document.getElementById(id).textContent = value; };

  set("bcTitulo", p.titulo);
  set("pCategoria", CAT_LABEL[p.categoria] || p.categoria);
  set("pTitulo", p.titulo);
  set("pResumen", p.resumen);
  set("pProblema", p.problema);
  set("pSolucion", p.solucion);

  // Imagen principal
  const img = document.getElementById("pImagen");
  img.src = p.imagen;
  img.alt = `Imagen principal del proyecto ${p.titulo}`;
  img.classList.add("zoomable");
  img.setAttribute("role", "button");
  img.setAttribute("tabindex", "0");
  img.setAttribute("aria-label", `Ampliar imagen principal del proyecto ${p.titulo}`);

  // Métrica destacada
  document.getElementById("pMetrica").innerHTML = `
    <p class="font-mono text-xs text-muted">Enfoque</p>
    <p class="mt-2 font-mono text-2xl font-600 text-accent sm:text-3xl">${p.metrica}</p>`;

  // Enlaces externos: Proyecto en vivo (Streamlit) + GitHub
  const GH_ICON = `<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C18 4.6 19 4.9 19 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>`;
  const LIVE_ICON = `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 9.5l4 2.5-4 2.5z"/></svg>`;
  const btn = (href, label, icon, primary) =>
    !href ? "" :
    `<a href="${href}" target="_blank" rel="noopener"
       class="btn-press inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${primary ? "bg-accent text-night" : "border border-line text-ink hover:border-white/25"}"
       aria-label="${label} (se abre en otra pestaña)">${icon}${label}</a>`;
  const hasLive = !!p.demo;
  document.getElementById("pEnlaces").innerHTML =
    (btn(p.demo, "Proyecto en vivo", LIVE_ICON, true) + btn(p.repo, "Ver en GitHub", GH_ICON, !hasLive)) ||
    `<span class="font-mono text-xs text-muted">Proyecto interno · sin enlace público</span>`;

  // Resultados
  document.getElementById("pResultados").innerHTML = (p.resultados || [])
    .map(
      (r) => `<div class="px-2 py-6 sm:px-7">
        <p class="font-mono text-2xl font-600 sm:text-3xl">${r.valor}</p>
        <p class="mt-2 text-[13px] text-muted">${r.etiqueta}</p>
      </div>`
    )
    .join("");

  // Proceso
  document.getElementById("pProceso").innerHTML = (p.proceso || [])
    .map(
      (paso, i) => `<li class="flex gap-4">
        <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line font-mono text-xs text-accent">${String(i + 1).padStart(2, "0")}</span>
        <span class="pt-0.5 leading-relaxed text-muted">${paso}</span>
      </li>`
    )
    .join("");

  // Stack
  document.getElementById("pStack").innerHTML = p.stack
    .map((s) => `<span class="rounded border border-line px-2 py-0.5">${s}</span>`)
    .join("");

  // Galería (oculta la sección si no hay imágenes)
  const galeria = p.galeria || [];
  if (galeria.length === 0) {
    document.getElementById("pGaleriaWrap").classList.add("hidden");
  } else {
    document.getElementById("pGaleria").innerHTML = galeria
      .map(
        (src, i) => `<div class="overflow-hidden rounded-xl border border-line">
          <img src="${src}" alt="Vista ${i + 1} del proyecto ${p.titulo}" loading="lazy"
               class="zoomable aspect-[16/10] w-full object-cover grayscale"
               role="button" tabindex="0"
               aria-label="Ampliar vista ${i + 1} del proyecto ${p.titulo}" />
        </div>`
      )
      .join("");
  }

  // --- Lightbox: clic para ampliar (imagen principal + galería) ---
  const lbItems = [
    { src: p.imagen, alt: `Imagen principal del proyecto ${p.titulo}` },
    ...galeria.map((src, i) => ({ src, alt: `Vista ${i + 1} del proyecto ${p.titulo}` })),
  ];

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCount = document.getElementById("lbCount");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  let lbIndex = 0;
  let lbLastFocus = null;

  lb.classList.toggle("is-single", lbItems.length <= 1);

  function lbShow(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbIndex];
    lbImg.src = it.src;
    lbImg.alt = it.alt;
    lbCount.textContent = `${lbIndex + 1} / ${lbItems.length}`;
  }
  function lbOpen(i) {
    lbLastFocus = document.activeElement;
    lbShow(i);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function lbHide() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
  }
  const lbIsOpen = () => lb.classList.contains("is-open");

  lbClose.addEventListener("click", lbHide);
  lbNext.addEventListener("click", () => lbShow(lbIndex + 1));
  lbPrev.addEventListener("click", () => lbShow(lbIndex - 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lbHide(); });

  document.addEventListener("keydown", (e) => {
    if (!lbIsOpen()) return;
    if (e.key === "Escape") lbHide();
    else if (e.key === "ArrowRight" && lbItems.length > 1) lbShow(lbIndex + 1);
    else if (e.key === "ArrowLeft" && lbItems.length > 1) lbShow(lbIndex - 1);
    else if (e.key === "Tab") {
      const foco = [lbClose, lbItems.length > 1 ? lbPrev : null, lbItems.length > 1 ? lbNext : null].filter(Boolean);
      e.preventDefault();
      const actual = foco.indexOf(document.activeElement);
      const paso = e.shiftKey ? -1 : 1;
      foco[(actual + paso + foco.length) % foco.length].focus();
    }
  });

  function bindZoom(el, i) {
    el.addEventListener("click", () => lbOpen(i));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lbOpen(i); }
    });
  }
  bindZoom(img, 0);
  document.querySelectorAll("#pGaleria img").forEach((g, i) => bindZoom(g, i + 1));

  // Navegación anterior / siguiente (circular)
  const prev = PROYECTOS[(idx - 1 + PROYECTOS.length) % PROYECTOS.length];
  const next = PROYECTOS[(idx + 1) % PROYECTOS.length];
  const navPrev = document.getElementById("navPrev");
  const navNext = document.getElementById("navNext");
  navPrev.href = `proyecto.html?p=${encodeURIComponent(prev.slug)}`;
  navNext.href = `proyecto.html?p=${encodeURIComponent(next.slug)}`;
  navPrev.querySelector("[data-title]").textContent = prev.titulo;
  navNext.querySelector("[data-title]").textContent = next.titulo;

  // Reveal al hacer scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty("--index", (i % 6).toString());
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
}
