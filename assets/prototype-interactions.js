/**
 * Prototype Interactions for JSD Theme
 * Handles 3D Tilt, Flip, and Hero Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroParallax();
    initHoloCards();
});

/**
 * Hero Parallax: Fades the hero content on scroll
 */
function initHeroParallax() {
    const heroContent = document.querySelector('.hero-parallax-content');
    const scrollContainer = window; // Or a specific container if needed

    if (!heroContent) return;

    scrollContainer.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.35));
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
    });
}

/**
 * HoloCards: Handles mouse tilt and click flip
 */
function initHoloCards() {
  const cards = document.querySelectorAll('[data-jsd-card]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('is-flipped')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 8; // Slight tilt
      const rotateY = (centerX - x) / 8;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('is-flipped')) {
        card.style.transform = 'rotateX(0) rotateY(0)';
      }
    });

    card.addEventListener('click', (e) => {
      // Don't flip if clicking the close button or the buy button
      if (e.target.closest('[data-jsd-close]') || e.target.closest('.jsd-card-btn')) return;
      
      card.classList.add('is-flipped');
      card.style.transform = 'rotateY(180deg)';
    });

    const closeBtn = card.querySelector('[data-jsd-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('is-flipped');
        card.style.transform = 'rotateX(0) rotateY(0)';
      });
    }
  });
}
