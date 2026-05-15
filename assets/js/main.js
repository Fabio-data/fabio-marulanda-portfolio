/* =========================================================
   Home — render de proyectos, filtros e interacciones
   Los datos viven en assets/js/proyectos-data.js
   ========================================================= */

const PROYECTOS = window.PROYECTOS || [];
const grid = document.getElementById("gridProyectos");
const emptyState = document.getElementById("emptyState");

// Íconos
const GH_ICON = `<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C18 4.6 19 4.9 19 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>`;
const LIVE_ICON = `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 9.5l4 2.5-4 2.5z"/></svg>`;

// Botón GitHub (al repositorio). Devuelve "" si no hay enlace.
function repoBtn(href) {
  if (!href) return "";
  return `<a href="${href}" target="_blank" rel="noopener"
     class="btn-press inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink hover:border-white/25"
     aria-label="Ver repositorio en GitHub (se abre en otra pestaña)">${GH_ICON}GitHub</a>`;
}

// Botón Proyecto en vivo (app de Streamlit, etc.). Devuelve "" si no hay enlace.
function liveBtn(href) {
  if (!href) return "";
  return `<a href="${href}" target="_blank" rel="noopener"
     class="btn-press inline-flex items-center gap-1.5 rounded-lg border border-accent/60 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
     aria-label="Abrir el proyecto en vivo (se abre en otra pestaña)">${LIVE_ICON}Proyecto en vivo</a>`;
}

function cardHTML(p) {
  const url = `proyecto.html?p=${encodeURIComponent(p.slug)}`;
  return `
  <article class="proyecto-card reveal flex flex-col overflow-hidden rounded-2xl border border-line bg-card" data-cat="${p.categoria}">
    <a href="${url}" class="thumb relative block aspect-[16/10] overflow-hidden border-b border-line" aria-label="Ver proyecto: ${p.titulo}">
      <img src="${p.imagen}" alt="Vista previa del proyecto ${p.titulo}" loading="lazy" class="h-full w-full object-cover grayscale" />
      <span class="absolute left-3 top-3 rounded-md border border-line bg-night/80 px-2.5 py-1 font-mono text-[11px] text-accent backdrop-blur">${p.metrica}</span>
    </a>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-display text-lg font-600">
        <a href="${url}" class="transition-colors hover:text-accent">${p.titulo}</a>
      </h3>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-muted">${p.resumen}</p>
      <div class="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px] text-muted">
        ${p.stack.map((s) => `<span class="rounded border border-line px-2 py-0.5">${s}</span>`).join("")}
      </div>
      <div class="mt-5 flex flex-wrap items-center gap-2">
        <a href="${url}" class="btn-press inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-night">
          Ver proyecto
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        ${repoBtn(p.repo)}
        ${liveBtn(p.demo)}
      </div>
    </div>
  </article>`;
}

function render(filtro = "todos") {
  const lista = filtro === "todos" ? PROYECTOS : PROYECTOS.filter((p) => p.categoria === filtro);
  grid.innerHTML = lista.map(cardHTML).join("");
  const vacio = lista.length === 0;
  emptyState.classList.toggle("hidden", !vacio);
  grid.classList.toggle("hidden", vacio);
  observeReveal(grid.querySelectorAll(".reveal"));
}

/* ---------- Filtros ---------- */
const filtros = document.getElementById("filtros");
filtros.addEventListener("click", (e) => {
  const btn = e.target.closest(".filtro-btn");
  if (!btn) return;
  filtros.querySelectorAll(".filtro-btn").forEach((b) => {
    b.classList.toggle("is-active", b === btn);
    b.classList.toggle("text-muted", b !== btn);
  });
  render(btn.dataset.filter);
});

/* ---------- Reveal escalonado (IntersectionObserver) ---------- */
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
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
function observeReveal(nodes) {
  nodes.forEach((n) => io.observe(n));
}
observeReveal(document.querySelectorAll(".reveal"));

/* ---------- Nav activo ---------- */
const links = [...document.querySelectorAll(".nav-link")];
const navIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll("main section[id]").forEach((s) => navIO.observe(s));

/* ---------- Botón "volver arriba" (visible al salir del hero) ---------- */
const toTop = document.getElementById("toTop");
const hero = document.getElementById("inicio");
if (toTop && hero) {
  const topIO = new IntersectionObserver(
    ([entry]) => toTop.classList.toggle("is-shown", !entry.isIntersecting),
    { threshold: 0.15 }
  );
  topIO.observe(hero);
}

/* ---------- Menú móvil ---------- */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  const abierto = mobileMenu.classList.toggle("hidden");
  menuBtn.setAttribute("aria-expanded", String(!abierto));
});
mobileMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    mobileMenu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* ---------- Formulario: validación + estado de envío ---------- */
const form = document.getElementById("formContacto");
const submitBtn = document.getElementById("submitBtn");
const formMsg = document.getElementById("formMsg");

function setError(campo, texto) {
  const el = form.querySelector(`[data-error-for="${campo}"]`);
  const input = form.elements[campo];
  el.textContent = texto;
  el.classList.toggle("hidden", !texto);
  input.classList.toggle("border-rose-400", !!texto);
  input.classList.toggle("border-line", !texto);
}

function validar() {
  let ok = true;
  const n = form.elements.nombre.value.trim();
  const m = form.elements.email.value.trim();
  const msg = form.elements.mensaje.value.trim();
  setError("nombre", n ? "" : "Escribe tu nombre.");
  if (!n) ok = false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) { setError("email", "Correo no válido."); ok = false; }
  else setError("email", "");
  setError("mensaje", msg.length >= 10 ? "" : "Cuéntame un poco más (mín. 10 caracteres).");
  if (msg.length < 10) ok = false;
  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formMsg.classList.add("hidden");
  if (!validar()) return;

  const label = submitBtn.querySelector("[data-label]");
  const spinner = submitBtn.querySelector("[data-spinner]");
  submitBtn.disabled = true;
  submitBtn.classList.add("opacity-70");
  label.textContent = "Enviando";
  spinner.classList.remove("hidden");

  try {
    // EDITA: conecta tu servicio real (Formspree, Web3Forms, etc.)
    // const r = await fetch("https://formspree.io/f/TU_ID", { method:"POST", body:new FormData(form), headers:{Accept:"application/json"} });
    // if (!r.ok) throw new Error();
    await new Promise((res) => setTimeout(res, 900)); // simulación local

    form.reset();
    formMsg.textContent = "Mensaje enviado. Te respondo en menos de 48 horas.";
    formMsg.className = "text-sm text-emerald-400";
  } catch {
    formMsg.textContent = "No se pudo enviar. Escríbeme directamente por correo.";
    formMsg.className = "text-sm text-rose-400";
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-70");
    label.textContent = "Enviar mensaje";
    spinner.classList.add("hidden");
    formMsg.classList.remove("hidden");
  }
});

/* ---------- Año del footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Init ---------- */
render("todos");
