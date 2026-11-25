// Directorio rápido de sitios propios y recomendados
const featuredSites = [
  {
    title: "Búho — Asistente con IA bilingüe",
    url: "https://buho-45-pro.lovable.app",
    tag: "Inteligencia Artificial",
    keywords: "buho ia asistente inteligencia artificial bilingue espanol ingles chat conversaciones",
    snippet: "Tu asistente con IA en español e inglés. Organiza tus ideas en pestañas de conversación y retómalas cuando quieras."
  },
  {
    title: "Nimbo — Tu nube personal y privada",
    url: "https://nimbo-cloud-pro.lovable.app",
    tag: "Almacenamiento en la Nube",
    keywords: "nimbo nube cloud almacenamiento archivos fotos carpetas privado compartir enlace",
    snippet: "Nube privada para guardar fotos, documentos y todo lo importante. Organízalo en carpetas y compártelo con un enlace."
  },
  {
    title: "Nimbo Docs — Editor de documentos conectado a Nimbo",
    url: "https://nimbo-cloud-docs.lovable.app",
    tag: "Documentos y Trabajo",
    keywords: "nimbo docs editor documentos word pdf redactar ia trabajar nube cloud",
    snippet: "Crea, edita y redacta documentos con IA. Abre y guarda archivos PDF o Word directamente en tu cuenta de Nimbo Cloud Pro."
  },
  {
    title: "Sazón - ¿Qué hay en tu nevera?",
    url: "https://dylan-montoya.github.io/Sazon/",
    tag: "App Destacada",
    keywords: "sazon recetas nevera cocina ingredientes compras favoritos dylan montoya",
    snippet: "Aplicación web creada por Dylan Montoya para descubrir recetas con los ingredientes disponibles en tu nevera y organizar tus compras."
  },
  {
    title: "Sitio Creativo GirasolPvBing",
    url: "https://girasolpvbing.my.canva.site",
    tag: "Sitio Web",
    keywords: "girasolpvbing canva buscador bing sitio web",
    snippet: "Portal web interactivo con buscador integrado."
  },
  {
    title: "Portal Universitario - Oferta Académica y Admisiones",
    url: "https://www.google.com/search?q=universidades+carreras+admisiones",
    tag: "Educación",
    keywords: "universidad universidades carreras ingenieria medicina psicologia estudio admisiones",
    snippet: "Consulta información sobre carreras universitarias, facultades, becas académicas y procesos de ingreso."
  },
  {
    title: "Guía de Desarrollo Web con HTML, CSS y JavaScript",
    url: "https://www.google.com/search?q=tutorial+html+css+javascript+web",
    tag: "Programación",
    keywords: "html css javascript codigo programar web pagina sitio",
    snippet: "Recursos y documentación para crear sitios web responsivos desde cero."
  }
];

// Referencias DOM
const mainApp = document.getElementById('mainApp');
const topHeader = document.getElementById('topHeader');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsArea = document.getElementById('resultsArea');
const resultsList = document.getElementById('resultsList');
const statusText = document.getElementById('statusText');
const externalSearchBtn = document.getElementById('externalSearchBtn');
const themeBtn = document.getElementById('themeBtn');
const tabButtons = document.querySelectorAll('.tab-btn');

let currentMode = 'all';

// Modo Oscuro
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
});

// Botón limpiar
searchInput.addEventListener('input', () => {
  clearBtn.classList.toggle('visible', searchInput.value.trim().length > 0);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  resetHome();
  searchInput.focus();
});

function resetHome() {
  mainApp.classList.remove('active-search');
  topHeader.classList.remove('scrolled');
  resultsArea.classList.remove('visible');
  resultsList.innerHTML = '';
}

document.getElementById('brandLogo').addEventListener('click', resetHome);
document.getElementById('homeReset').addEventListener('click', (e) => {
  e.preventDefault();
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  resetHome();
});

// Cambiar pestaña de motor (Todo, Web, Imágenes, Videos, Libros)
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.getAttribute('data-mode');

    const query = searchInput.value.trim();
    if (query) {
      executePoweredSearch(query);
    }
  });
});

// Construir URL externa impulsada según pestaña
function getPoweredExternalUrl(query, mode) {
  const q = encodeURIComponent(query);
  if (mode === 'images') return `https://www.google.com/search?tbm=isch&q=${q}`;
  if (mode === 'videos') return `https://www.youtube.com/results?search_query=${q}`;
  if (mode === 'books') return `https://www.google.com/search?tbm=bks&q=${q}`;
  return `https://www.google.com/search?q=${q}`;
}

// Ejecutar búsqueda impulsada en tiempo real
async function executePoweredSearch(rawQuery) {
  const query = rawQuery.trim();
  if (!query) return;

  searchInput.value = query;
  clearBtn.classList.add('visible');
  mainApp.classList.add('active-search');
  topHeader.classList.add('scrolled');
  resultsArea.classList.add('visible');

  const externalUrl = getPoweredExternalUrl(query, currentMode);
  externalSearchBtn.href = externalUrl;

  // Si el usuario eligió explícitamente Web Google, Imágenes o Videos, abrir búsqueda directa y mostrar acceso
  if (currentMode === 'web' || currentMode === 'images' || currentMode === 'videos') {
    const modeLabels = {
      web: 'la Web de Google',
      images: 'Google Imágenes',
      videos: 'YouTube'
    };
    statusText.textContent = `Búsqueda impulsada en ${modeLabels[currentMode]} para "${query}"`;
    resultsList.innerHTML = `
      <div class="result-card">
        <div class="result-source">
          <span class="source-tag">Motor Impulsado</span>
          <span>${externalUrl}</span>
        </div>
        <a href="${externalUrl}" target="_blank" rel="noopener noreferrer" class="result-link">
          Abrir resultados de "${query}" en ${modeLabels[currentMode]} ↗
        </a>
        <p class="result-snippet">
          Haz clic en el enlace superior para explorar todos los resultados en vivo proporcionados por ${modeLabels[currentMode]}.
        </p>
      </div>
    `;
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // Modo "Todo" o "Libros y Guías": combinar índice local + consulta real a Google Books API
  statusText.textContent = `Buscando "${query}" en Gate Pagess y Google...`;
  resultsList.innerHTML = `<div class="loader">Cargando resultados impulsados por Google...</div>`;

  const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const terms = normalize(query).split(/\s+/);

  const localMatches = currentMode === 'all'
    ? featuredSites.filter(site => {
        const text = normalize(`${site.title} ${site.keywords} ${site.snippet}`);
        return terms.every(term => text.includes(term));
      })
    : [];

  let apiResults = [];
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=6&langRestrict=es`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.items)) {
        apiResults = data.items.map(item => {
          const info = item.volumeInfo || {};
          const authors = Array.isArray(info.authors) ? ` • ${info.authors.join(', ')}` : '';
          return {
            title: info.title || 'Resultado sin título',
            url: info.infoLink || externalUrl,
            tag: `Google Books${authors}`,
            snippet: info.description 
              ? info.description.slice(0, 180) + (info.description.length > 180 ? '...' : '')
              : 'Publicación indexada a través de Google.'
          };
        });
      }
    }
  } catch (err) {
    // Si falla la red, continuar con los resultados locales y el acceso directo a Google
  }

  const combined = [...localMatches, ...apiResults];
  statusText.textContent = `${combined.length} resultado(s) obtenidos para "${query}"`;

  let html = combined.map(item => `
    <article class="result-card">
      <div class="result-source">
        <span class="source-tag">${item.tag}</span>
        <span>${item.url}</span>
      </div>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="result-link">${item.title}</a>
      <p class="result-snippet">${item.snippet}</p>
    </article>
  `).join('');

  // Tarjeta final garantizada con búsqueda web completa en Google
  html += `
    <article class="result-card">
      <div class="result-source">
        <span class="source-tag">Google Search</span>
        <span>https://www.google.com/search?q=${encodeURIComponent(query)}</span>
      </div>
      <a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer" class="result-link">
        Ver más resultados web para "${query}" en Google ↗
      </a>
      <p class="result-snippet">
        Explora millones de páginas web, noticias y enlaces actualizados directamente desde el motor de búsqueda de Google.
      </p>
    </article>
  `;

  resultsList.innerHTML = html;
}

// Eventos de envío y sugerencias
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  executePoweredSearch(searchInput.value);
});

document.querySelectorAll('[data-preset]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    executePoweredSearch(el.getAttribute('data-preset'));
  });
});
