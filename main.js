/* ===========================================
   ARROZAKI — main.js
   ✏️ Puedes editar los textos y comportamientos aquí
   =========================================== */

// ============================================
// 1. NAVBAR — Cambia de transparente a sólido al hacer scroll
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================
// 2. MENÚ HAMBURGUESA — Mobile
// ============================================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// ============================================
// 3. ANIMACIÓN DE REVEAL AL HACER SCROLL
// ============================================
// Agrega la clase "reveal" a los elementos que quieres animar al aparecer
const revealElements = document.querySelectorAll(
  '.menu-card, .promo-card, .stat, .contact-item, .historia-text p, .section-title, .section-label'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Agrega un pequeño delay escalonado
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (i % 6));
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12  // ✏️ Cambia este valor (0 a 1) para controlar cuándo aparece el elemento
});

revealElements.forEach(el => observer.observe(el));


// ============================================
// 4. FORMULARIO DE CONTACTO
// ✏️ Conecta este formulario a tu servicio real
//    (Formspree, EmailJS, WhatsApp, etc.)
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const tel     = document.getElementById('tel').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // ---- OPCIÓN A: Enviar por WhatsApp ----
  // ✏️ Cambia el número de WhatsApp (formato internacional sin + ni espacios)
  const whatsappNumber = '527710000000';  // ← EDITA AQUÍ
  const textoWA = `Hola ARROZAKI!%0ANombre: ${encodeURIComponent(nombre)}%0AEmail: ${encodeURIComponent(email)}%0ATel: ${encodeURIComponent(tel || 'N/A')}%0AMensaje: ${encodeURIComponent(mensaje)}`;
  const waURL = `https://wa.me/${whatsappNumber}?text=${textoWA}`;

  // ---- OPCIÓN B: Usar Formspree ----
  // 1. Regístrate en https://formspree.io
  // 2. Crea un formulario y obtén tu endpoint
  // 3. Descomenta el bloque de abajo y comenta la parte de WhatsApp
  /*
  const formspreeEndpoint = 'https://formspree.io/f/TU_ID_AQUI';  // ← EDITA
  fetch(formspreeEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, tel, mensaje })
  }).then(res => {
    if (res.ok) {
      formStatus.textContent = '✓ Mensaje enviado. ¡Te contactaremos pronto!';
      formStatus.style.color = '#4caf50';
      contactForm.reset();
    } else {
      formStatus.textContent = '✗ Hubo un error. Intenta de nuevo.';
    }
  });
  return;
  */

  // Acción actual: abrir WhatsApp en nueva pestaña
  window.open(waURL, '_blank');
  formStatus.textContent = '✓ Abriendo WhatsApp con tu mensaje...';
  formStatus.style.color = '#4caf50';
  contactForm.reset();
});


// ============================================
// 5. NAVEGACIÓN ACTIVA — Resalta el enlace del nav según la sección visible
// ============================================
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--rojo)';
        }
      });
    }
  });
}, {
  threshold: 0.4  // ✏️ Cambia cuánto de la sección debe estar visible para activar el enlace
});

sections.forEach(s => navObserver.observe(s));


// ============================================
// 6. YEAR DINÁMICO EN FOOTER
// ============================================
document.querySelectorAll('.footer-copy').forEach(el => {
  el.innerHTML = el.innerHTML.replace('2025', new Date().getFullYear());
});
