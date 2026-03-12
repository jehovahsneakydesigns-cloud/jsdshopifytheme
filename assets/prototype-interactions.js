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
    const cards = document.querySelectorAll('.jsd-card');

    cards.forEach(card => {
        const container = card.parentElement;

        // Tilt effect
        container.addEventListener('mousemove', (e) => {
            if (card.classList.contains('is-flipped')) return;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        container.addEventListener('mouseleave', () => {
            if (card.classList.contains('is-flipped')) return;
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });

        // Flip effect
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
            if (card.classList.contains('is-flipped')) {
                card.style.transform = 'rotateY(180deg)';
            } else {
                card.style.transform = 'rotateY(0)';
            }
        });
    });
}
