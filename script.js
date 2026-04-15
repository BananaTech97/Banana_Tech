document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar shadow on scroll ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ── Scroll-reveal ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Close modal first if open
        closeModal();
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    });
  });

  /* ────────────────────────────────────────────
     SERVICE MODAL
  ──────────────────────────────────────────── */
  const SERVICE_DATA = {
    web: {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
      title: 'Webs que Convierten',
      intro: 'Tu sitio web es la cara digital de tu negocio y tu vendedor más incansable. Diseñamos páginas que no solo se ven bien, sino que están construidas para convertir visitantes en clientes reales.',
      features: [
        'Diseño 100% personalizado a la identidad de tu marca',
        'Optimizado para móvil, tablet y escritorio (responsivo)',
        'Carga rápida — menos de 3 segundos en promedio',
        'Integración con redes sociales y Google Maps',
        'Formularios y botones de contacto directo por WhatsApp',
        'Dominio propio incluido el primer año',
        'Entrega en 7 a 15 días hábiles',
      ],
      note: 'Incluye capacitación básica para que puedas actualizar textos e imágenes por tu cuenta.',
    },
    bot: {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      title: 'Bots de WhatsApp 24/7',
      intro: 'Cada mensaje sin respuesta es un cliente que se va. Nuestro asistente virtual responde al instante, califica prospectos y agenda citas mientras tú duermes.',
      features: [
        'Mensaje de bienvenida automático al primer contacto',
        'Menú interactivo con tus servicios y horarios',
        'Respuestas automáticas a las preguntas más frecuentes',
        'Captura de nombre, teléfono y necesidad del prospecto',
        'Escalamiento a agente humano cuando se requiere',
        'Configuración completa en tu número de WhatsApp Business',
        'Sin aplicaciones extra — funciona directo en WhatsApp',
      ],
      note: 'Ideal para negocios que reciben más de 10 consultas diarias por WhatsApp.',
    },
    google: {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      title: 'Posicionamiento en Google',
      intro: 'El 80% de los consumidores busca negocios locales en Google antes de visitar. Si no apareces, simplemente no existes para ellos. Nosotros te ponemos en el mapa.',
      features: [
        'Creación o reclamación de tu Perfil de Negocio en Google',
        'Optimización completa: categorías, descripción y palabras clave',
        'Subida de fotos profesionales del negocio',
        'Configuración de horarios, servicios y atributos',
        'Estrategia para generar más reseñas positivas',
        'Reporte inicial de rendimiento y visibilidad en búsquedas',
        'Aparece en Google Maps y en resultados locales',
      ],
      note: 'Los resultados de visibilidad empiezan a notarse entre 2 y 6 semanas después de la optimización.',
    },
    datos: {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      title: 'Inteligencia de Datos',
      intro: 'Los datos que tu negocio ya genera valen oro — si sabes leerlos. Te ayudamos a entender qué funciona, qué no, y a dónde dirigir tu energía para crecer más rápido.',
      features: [
        'Configuración de Google Analytics en tu sitio web',
        'Dashboard mensual con los indicadores más importantes',
        'Análisis del tráfico: de dónde vienen tus visitantes',
        'Reportes de rendimiento de tu Perfil de Google',
        'Interpretación de interacciones y conversaciones del bot',
        'Recomendaciones concretas basadas en los datos',
        'Informe mensual presentado en lenguaje simple (sin tecnicismos)',
      ],
      note: 'Todos los reportes se entregan en formato PDF y/o Google Sheets para que los tengas siempre a la mano.',
    },
  };

  const modal   = document.getElementById('serviceModal');
  const modalClose = document.getElementById('modalClose');

  function openModal(serviceKey) {
    const data = SERVICE_DATA[serviceKey];
    if (!data || !modal) return;

    // Populate
    document.getElementById('modalIcon').innerHTML   = data.icon;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalIntro').textContent = data.intro;

    const list = document.getElementById('modalFeatures');
    list.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

    const noteEl = document.getElementById('modalNote');
    if (data.note) {
      noteEl.textContent = '💡 ' + data.note;
      noteEl.classList.add('visible');
    } else {
      noteEl.classList.remove('visible');
    }

    // Show
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Card click
  document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset.service);
    });
  });

  // Close button
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Click outside modal box
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});
