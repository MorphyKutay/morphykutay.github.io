/**
 * MorphyKutay Portfolio — Ultra Modern Interactions
 * Scroll animations, reveal effects, smooth navigation
 */

(function() {
    'use strict';

    // ═══ Config ═══
    const REVEAL_THRESHOLD = 0.1;
    const REVEAL_ROOT_MARGIN = '0px 0px -80px 0px';

    // ═══ Navbar scroll effect ═══
    const nav = document.querySelector('nav');
    if (nav) {
        const handleNavScroll = () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll(); // Initial check
    }

    // ═══ Intersection Observer for reveal animations ═══
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: REVEAL_THRESHOLD,
        rootMargin: REVEAL_ROOT_MARGIN
    });

    // Hero content stagger reveal (above fold - use IntersectionObserver + immediate trigger)
    const heroReveals = document.querySelectorAll('.hero-content .reveal');
    heroReveals.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Section reveal
    document.querySelectorAll('section.reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // Tech items stagger
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((el, i) => {
        el.classList.add('reveal-item');
        el.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s`;
        revealObserver.observe(el);
    });

    // Project cards stagger
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, i) => {
        card.classList.add('reveal-card');
        card.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, border-color 0.3s, box-shadow 0.3s`;
        revealObserver.observe(card);
    });

    // ═══ Smooth scroll for anchor links ═══
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ═══ Parallax on scroll (subtle) ═══
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            hero.style.transform = `translateY(${rate * 0.3}px)`;
        }, { passive: true });
    }

    // ═══ Magnetic hover effect for social links (optional enhancement) ═══
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
            this.style.transform = `translate(${x}px, ${y}px) translateY(-4px) scale(1.02)`;
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Hero reveal on load (IntersectionObserver fires for above-fold content)
    heroReveals.length && requestAnimationFrame(() => {
        heroReveals.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), 200 + i * 60);
        });
    });
})();
