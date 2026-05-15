/* =========================================================
   FUENTE ÚNICA DE DATOS  —  edita SOLO este archivo
   ---------------------------------------------------------
   Proyectos basados en la experiencia real de Fabio Marulanda.
   Para AGREGAR uno: copia un bloque { ... }, cámbialo y guarda.

   - slug:      identificador para la URL (sin espacios ni tildes)
   - categoria: "viz" | "auto" | "analisis" | "ml"
   - resumen:   1 frase para la tarjeta de la home
   - metrica:   etiqueta corta sobre la imagen (herramienta/enfoque)
   - stack:     tecnologías (chips)
   - imagen:    portada (URL o "assets/img/archivo.jpg")
   - repo:      URL del repositorio → botón "GitHub" ("" = se oculta)
   - demo:      URL de la app en vivo (Streamlit, etc.) → botón
                "Proyecto en vivo". Úsalo sobre todo en modelos de ML.
                "" = se oculta el botón.
   --- detalle ---
   - rol, periodo, cliente, problema, solucion
   - proceso:    pasos (lista)
   - resultados: [{ valor, etiqueta }]
   - galeria:    imágenes adicionales (URLs)
   ========================================================= */

window.PROYECTOS = [
  {
    slug: "prediccion-desistimiento-credito",
    titulo: "Predicción de desistimiento de clientes (crédito)",
    categoria: "ml",
    resumen: "Modelo LightGBM end-to-end que estima la probabilidad de que un cliente desista de su solicitud de crédito, desplegado en Streamlit.",
    metrica: "ROC-AUC 0.72",
    stack: ["Python", "LightGBM", "scikit-learn", "SHAP", "Streamlit"],
    imagen: "https://picsum.photos/seed/fm-desistimiento/1200/750",
    repo: "https://github.com/Fabio-data/Modelo-Desistimiento-de-clientes",
    demo: "https://modelo-desistimiento-de-clientes-gvdkeqyvdkx8gyfinsabmx.streamlit.app/",
    rol: "Científico de Datos (proyecto propio)",
    periodo: "Proyecto personal · 2025",
    cliente: "Contexto crediticio (banca)",
    problema:
      "En el proceso de solicitud de crédito, una parte de los clientes desiste antes de concretar. Sin una forma de anticipar quién está en riesgo, las acciones de retención llegan tarde y se aplican a ciegas.",
    solucion:
      "Construí un pipeline reproducible (ColumnTransformer + imputación + one-hot) con LightGBM, búsqueda de hiperparámetros optimizada por PR-AUC, manejo del desbalanceo con scale_pos_weight y calibración isotónica de probabilidades. Lo comparé contra baselines (Dummy y regresión logística) y lo desplegué en una app de Streamlit que devuelve probabilidad, nivel de riesgo y acción sugerida.",
    proceso: [
      "EDA y limpieza: valores faltantes, estados finales y definición de la variable objetivo (desiste / no desiste).",
      "Ingeniería de variables de negocio: capacidad de pago, ratio de endeudamiento, ratio solicitud/ingreso y estrés financiero.",
      "Pipeline con ColumnTransformer + RandomizedSearchCV optimizando PR-AUC, frente a baselines de referencia.",
      "Calibración isotónica de probabilidades y umbral elegido por F1 en validación; evaluación final en test.",
      "Interpretabilidad con importancia de variables y SHAP; despliegue en Streamlit.",
    ],
    resultados: [
      { valor: "0.72", etiqueta: "ROC-AUC en test" },
      { valor: "0.70", etiqueta: "Recall en clientes que desisten" },
      { valor: "0.61", etiqueta: "PR-AUC (baseline azar: 0.36)" },
    ],
    galeria: [],
  },
  {
    slug: "dashboards-ventas-powerbi",
    titulo: "Dashboards de ventas en Power BI y Looker Studio",
    categoria: "viz",
    resumen: "Tableros interactivos para seguir la evolución de las ventas y los KPIs comerciales de la empresa.",
    metrica: "Power BI · Looker",
    stack: ["Power BI", "Looker Studio", "SQL"],
    imagen: "https://picsum.photos/seed/fm-ventas-bi/1200/750",
    repo: "",
    demo: "",
    rol: "Data Analyst",
    periodo: "Saferite Solutions · 2023 – 2026",
    cliente: "Áreas comercial y de dirección",
    problema:
      "La empresa revisaba las ventas con reportes manuales y dispersos. No había una vista única y actualizada para entender la evolución comercial ni reaccionar a tiempo.",
    solucion:
      "Diseñé dashboards interactivos en Power BI y Looker Studio que consolidan datos de varias fuentes y muestran la evolución de ventas y KPIs comerciales con filtros por periodo, producto y canal.",
    proceso: [
      "Levantamiento de los indicadores que realmente usa el negocio.",
      "Modelado y consolidación de datos desde múltiples fuentes.",
      "Construcción de los tableros en Power BI y Looker Studio.",
      "Iteración con las áreas usuarias hasta dejarlo accionable.",
    ],
    resultados: [
      { valor: "Tiempo real", etiqueta: "Seguimiento de ventas" },
      { valor: "Multi-fuente", etiqueta: "Datos consolidados" },
      { valor: "Self-service", etiqueta: "Filtros para el negocio" },
    ],
    galeria: [
      "https://picsum.photos/seed/fm-ventas-1/1000/620",
      "https://picsum.photos/seed/fm-ventas-2/1000/620",
    ],
  },
  {
    slug: "forecasting-demanda",
    titulo: "Forecasting de demanda y tendencias",
    categoria: "ml",
    resumen: "Modelos de pronóstico para estimar tendencias y demanda, con su dashboard de seguimiento.",
    metrica: "Forecasting",
    stack: ["Python", "Scikit-learn", "Pandas", "Power BI"],
    imagen: "https://picsum.photos/seed/fm-forecast/1200/750",
    repo: "",
    demo: "",
    rol: "Data Analyst",
    periodo: "Saferite Solutions · 2023 – 2026",
    cliente: "Planeación comercial",
    problema:
      "Las decisiones de compra y planeación se tomaban sin una estimación formal de la demanda futura, lo que generaba desajustes de inventario.",
    solucion:
      "Apliqué modelos de forecasting en Python para estimar tendencias y demanda, y los conecté a un dashboard que permite a planeación ver el pronóstico y su evolución.",
    proceso: [
      "Preparación y limpieza de la serie histórica de ventas.",
      "Entrenamiento y comparación de modelos de pronóstico.",
      "Validación de los resultados contra la demanda real.",
      "Publicación del pronóstico en un dashboard de seguimiento.",
    ],
    resultados: [
      { valor: "Predictivo", etiqueta: "Estimación de demanda" },
      { valor: "Dashboard", etiqueta: "Pronóstico monitoreado" },
      { valor: "Tendencias", etiqueta: "Apoyo a planeación" },
    ],
    galeria: [
      "https://picsum.photos/seed/fm-forecast-1/1000/620",
      "https://picsum.photos/seed/fm-forecast-2/1000/620",
    ],
  },
  {
    slug: "web-scraping-precios-mercado",
    titulo: "Web scraping masivo de precios de mercado",
    categoria: "analisis",
    resumen: "Procesos de scraping para obtener precios y datos de mercado y alimentar el análisis competitivo.",
    metrica: "Web Scraping",
    stack: ["Python", "Pandas", "ETL"],
    imagen: "https://picsum.photos/seed/fm-scraping/1200/750",
    repo: "",
    demo: "",
    rol: "Data Analyst",
    periodo: "Saferite Solutions · 2023 – 2026",
    cliente: "Análisis de mercado",
    problema:
      "No existía una forma sistemática de conocer los precios y movimientos de la competencia; la información se buscaba a mano y quedaba desactualizada.",
    solucion:
      "Construí procesos de web scraping masivo que extraen precios y datos de mercado de forma recurrente y los dejan listos para el análisis competitivo.",
    proceso: [
      "Identificación de las fuentes de precios relevantes.",
      "Desarrollo de los scrapers y manejo de errores.",
      "Limpieza y estructuración de los datos extraídos.",
      "Entrega de los datos consolidados para análisis.",
    ],
    resultados: [
      { valor: "Masivo", etiqueta: "Extracción recurrente" },
      { valor: "Mercado", etiqueta: "Precios de la competencia" },
      { valor: "Listo", etiqueta: "Datos para analizar" },
    ],
    galeria: [
      "https://picsum.photos/seed/fm-scraping-1/1000/620",
      "https://picsum.photos/seed/fm-scraping-2/1000/620",
    ],
  },
  {
    slug: "automatizacion-flujos-crm",
    titulo: "Automatización de flujos de datos del CRM",
    categoria: "auto",
    resumen: "Integraciones y bots que conectan el CRM con las plataformas de la empresa y eliminan trabajo manual.",
    metrica: "ETL · Bots",
    stack: ["Python", "n8n", "ETL", "APIs"],
    imagen: "https://picsum.photos/seed/fm-crm-auto/1200/750",
    repo: "",
    demo: "",
    rol: "Data Analyst",
    periodo: "Saferite Solutions · 2023 – 2026",
    cliente: "Operación interna",
    problema:
      "El paso de información entre el CRM y otras plataformas se hacía de forma manual, lo que consumía tiempo y generaba errores.",
    solucion:
      "Implementé integraciones y bots que automatizan los flujos de datos entre el CRM y las distintas plataformas, dejando la información sincronizada sin intervención manual.",
    proceso: [
      "Mapeo de los flujos de datos entre sistemas.",
      "Diseño de las integraciones y automatizaciones.",
      "Desarrollo de bots y conexiones vía API / n8n.",
      "Pruebas y monitoreo de los flujos automatizados.",
    ],
    resultados: [
      { valor: "Sin manual", etiqueta: "Flujos automatizados" },
      { valor: "CRM ↔ apps", etiqueta: "Datos sincronizados" },
      { valor: "Menos errores", etiqueta: "Proceso confiable" },
    ],
    galeria: [
      "https://picsum.photos/seed/fm-crm-1/1000/620",
      "https://picsum.photos/seed/fm-crm-2/1000/620",
    ],
  },
  {
    slug: "dashboards-corporativos-sharepoint",
    titulo: "Dashboards corporativos en Power BI + SharePoint",
    categoria: "viz",
    resumen: "Informes y tableros conectados a SharePoint para el seguimiento de indicadores corporativos.",
    metrica: "SharePoint",
    stack: ["Power BI", "SharePoint", "Microsoft Fabric"],
    imagen: "https://picsum.photos/seed/fm-corp-bi/1200/750",
    repo: "",
    demo: "",
    rol: "Analista de Datos y Big Data",
    periodo: "Sodexo · 2026",
    cliente: "Áreas de negocio corporativas",
    problema:
      "Las áreas necesitaban seguir indicadores corporativos, pero los datos estaban en SharePoint sin una capa de visualización clara ni documentación.",
    solucion:
      "Creé dashboards e informes en Power BI conectados a SharePoint y elaboré la documentación técnica (diccionarios de datos y flujos analíticos) para que el seguimiento fuera sostenible.",
    proceso: [
      "Conexión de Power BI a las fuentes en SharePoint.",
      "Construcción de los informes de indicadores corporativos.",
      "Documentación técnica: diccionarios de datos y flujos.",
      "Entrega de reportes para la toma de decisiones.",
    ],
    resultados: [
      { valor: "Corporativo", etiqueta: "Indicadores monitoreados" },
      { valor: "Documentado", etiqueta: "Diccionarios y flujos" },
      { valor: "Decisiones", etiqueta: "Reportes para negocio" },
    ],
    galeria: [
      "https://picsum.photos/seed/fm-corp-1/1000/620",
      "https://picsum.photos/seed/fm-corp-2/1000/620",
    ],
  },
  {
    slug: "calidad-radiologica-reportes",
    titulo: "Reportes y dashboards de calidad radiológica",
    categoria: "analisis",
    resumen: "Bases de datos y reportes automatizados de indicadores operativos para control de calidad radiológica.",
    metrica: "Automatización",
    stack: ["SQL", "Excel avanzado", "Power BI"],
    imagen: "https://picsum.photos/seed/fm-radiologia/1200/750",
    repo: "",
    demo: "",
    rol: "Analista de Datos",
    periodo: "Sievert S.A.S · 2021 – 2023",
    cliente: "Control de calidad radiológica",
    problema:
      "El control de calidad radiológica dependía de datos poco estructurados y de consolidaciones manuales propensas a error.",
    solucion:
      "Gestioné y estructuré las bases de datos de control de calidad, creé reportes automatizados y dashboards de indicadores operativos, y automaticé la consolidación y validación de datos.",
    proceso: [
      "Estructuración de las bases de datos de calidad.",
      "Automatización de la consolidación y validación de datos.",
      "Creación de reportes y dashboards de indicadores.",
      "Capacitación a clínicas y hospitales en buenas prácticas.",
    ],
    resultados: [
      { valor: "Estructurado", etiqueta: "Bases de datos ordenadas" },
      { valor: "Automatizado", etiqueta: "Reportes sin trabajo manual" },
      { valor: "Operativo", etiqueta: "Indicadores monitoreados" },
    ],
    galeria: [
      "https://picsum.photos/seed/fm-radio-1/1000/620",
      "https://picsum.photos/seed/fm-radio-2/1000/620",
    ],
  },
];
