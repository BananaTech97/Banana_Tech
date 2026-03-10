document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar shadow on scroll ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ── Scroll-reveal with IntersectionObserver ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── WhatsApp button — update with real number ── */
  const waBtn = document.getElementById('whatsappBtn');
  if (waBtn) {
    // Cambia este número por el de Banana Tech (formato: 521 + 10 dígitos)
    const phoneNumber = '527779440777';
    const message = encodeURIComponent('Hola, me interesa una asesoría con Banana Tech 🍌');
    waBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
  }

});
