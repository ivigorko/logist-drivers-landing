// animations.js — интерактивность лендинга

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. Плавный скролл к секциям ───
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── 2. Анимации при появлении в viewport ───
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    // Расставляем задержку для stagger-эффекта внутри секций
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const reveals = section.querySelectorAll('.reveal');
      reveals.forEach((el, index) => {
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

  // ─── 3. Фон навбара при скролле ───
  const nav = document.querySelector('header.nav');
  const nav = document.querySelector('nav');

  if (nav) {
    const toggleNavBackground = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    toggleNavBackground();
    window.addEventListener('scroll', toggleNavBackground, { passive: true });
  }

  // ─── 4. Мобильное меню ───
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      nav?.classList.toggle('open');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav?.classList.remove('open');
      });
    });
  }

});
