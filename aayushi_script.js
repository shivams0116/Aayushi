/* ============================================================
   AAYUSHI SHRIVASTAVA PORTFOLIO — JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------
       1. NAVBAR — scroll effect + active link highlight
    ------------------------------------------------------- */
    const navbar  = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        // Scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop    = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    /* -------------------------------------------------------
       2. HAMBURGER MENU (mobile)
    ------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    /* -------------------------------------------------------
       3. SCROLL REVEAL ANIMATION (IntersectionObserver)
    ------------------------------------------------------- */
    const revealElements = document.querySelectorAll(
        '.timeline-item, .highlight-card, .skill-card, .project-card, .education-card, .recognition-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // animate only once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* -------------------------------------------------------
       4. SMOOTH SCROLL for anchor links
    ------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 72;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    /* -------------------------------------------------------
       5. HERO STAT COUNTER ANIMATION
    ------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');

    const parseStatValue = (text) => {
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    };

    const animateStat = (el, target, suffix) => {
        const duration = 1800;
        const start    = performance.now();

        const update = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased  = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + suffix;
            }
        };

        requestAnimationFrame(update);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el   = entry.target;
                const raw  = el.textContent;
                const num  = parseStatValue(raw);
                const suffix = raw.replace(/[0-9]/g, '');
                animateStat(el, num, suffix);
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));

    /* -------------------------------------------------------
       6. COMPETENCY TICKER — pause on hover
    ------------------------------------------------------- */
    const track = document.querySelector('.competency-track');
    if (track) {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }

    /* -------------------------------------------------------
       7. CURSOR GLOW EFFECT (subtle teal glow that follows cursor)
    ------------------------------------------------------- */
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.15s ease, top 0.15s ease;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
    });

    /* -------------------------------------------------------
       8. HIGHLIGHT CARD tilt effect on mouse move
    ------------------------------------------------------- */
    document.querySelectorAll('.highlight-card, .project-card, .skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
