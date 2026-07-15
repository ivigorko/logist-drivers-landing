// animations.js — интерактивность лендинга

document.addEventListener('DOMContentLoaded', () => {

  // 1. Плавный скролл к секциям
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Анимации при появлении в viewport
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    document.querySelectorAll('section').forEach(section => {
      section.querySelectorAll('.reveal').forEach((el, index) => {
        el.style.setProperty('--index', String(index));
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  }

  // 3. Фон навбара при скролле
  const headerNav = document.querySelector('header.nav');
  if (headerNav) {
    const toggleNav = () => {
      headerNav.classList.toggle('scrolled', window.scrollY > 50);
    };
    toggleNav();
    window.addEventListener('scroll', toggleNav, { passive: true });
  }

  // 4. Мобильное меню
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      headerNav?.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        headerNav?.classList.remove('open');
      });
    });
  }

});
