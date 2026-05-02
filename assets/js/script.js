// Menu mobile (hambúrguer)
(function () {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.nav-toggle');
    const backdrop = document.querySelector('.nav-backdrop');
    const panel = document.getElementById('primary-navigation');

    if (!nav || !toggle || !panel) return;

    const mq = window.matchMedia('(max-width: 1024px)');
    const barRow = document.querySelector('.nav-bar-row');

    function syncNavDropdownTop() {
        if (!barRow || !mq.matches) {
            nav.style.removeProperty('--nav-dropdown-top');
            return;
        }
        nav.style.setProperty('--nav-dropdown-top', barRow.offsetHeight + 'px');
    }

    syncNavDropdownTop();
    window.addEventListener('resize', syncNavDropdownTop);

    function setOpen(open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    function close() {
        setOpen(false);
    }

    toggle.addEventListener('click', function () {
        setOpen(!nav.classList.contains('is-open'));
    });

    if (backdrop) {
        backdrop.addEventListener('click', close);
    }

    panel.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (mq.matches) close();
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
            close();
            toggle.focus();
        }
    });

    mq.addEventListener('change', function (e) {
        if (!e.matches) close();
        syncNavDropdownTop();
    });
})();

// Reveal Elements on Scroll
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// Tópicos laterais (side-tracker): fade + movimento esquerda → direita no desktop
(function () {
    const mq = window.matchMedia('(min-width: 1024px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const trackerTexts = document.querySelectorAll('.side-tracker .tracker-text');
    if (!trackerTexts.length) return;

    let observer;

    function revealAllInstant() {
        trackerTexts.forEach(function (el) {
            el.classList.add('is-revealed');
        });
    }

    function setupObserver() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }

        if (!mq.matches || reduceMotion.matches) {
            revealAllInstant();
            return;
        }

        trackerTexts.forEach(function (el) {
            el.classList.remove('is-revealed');
        });

        observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.15,
            }
        );

        trackerTexts.forEach(function (el) {
            observer.observe(el);
        });
    }

    setupObserver();

    mq.addEventListener('change', setupObserver);
    reduceMotion.addEventListener('change', setupObserver);
})();

// “A Mente Por Trás”: foto entra da direita → esquerda ao chegar à dobra
(function () {
    const wrap = document.querySelector('.about-image-wrap');
    if (!wrap) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function reveal() {
        wrap.classList.add('is-revealed');
    }

    if (reduceMotion.matches) {
        reveal();
        return;
    }

    const io = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                reveal();
                io.unobserve(entry.target);
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.08,
        }
    );

    io.observe(wrap);
})();

// Form Submission Feedback
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
        const btn = leadForm.querySelector('.form-submit-btn');
        btn.textContent = 'ENVIANDO...';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
    });
}
