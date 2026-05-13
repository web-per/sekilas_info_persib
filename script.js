document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const noResults = document.querySelector('.no-results');

    function filterProducts(query) {
        const normalizedQuery = query.trim().toLowerCase();
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const matches = title.includes(normalizedQuery) || description.includes(normalizedQuery);

            if (normalizedQuery === '' || matches) {
                card.style.display = '';
                visibleCount += 1;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0 && normalizedQuery !== '') {
            noResults.hidden = false;
        } else {
            noResults.hidden = true;
        }
    }

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            filterProducts(searchInput.value);
        });

        searchInput.addEventListener('input', function () {
            filterProducts(searchInput.value);
        });
    }

    const revealSelectors = [
        '.about-brand',
        '.benefit-card',
        '.section-top',
        '.product-card',
        '.cta-section',
        '.whatsapp-card',
        '.sponsor-section',
        '.sponsor-card'
    ];

    const revealElements = revealSelectors
        .map(selector => Array.from(document.querySelectorAll(selector)))
        .flat();

    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-reveal', 'visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealElements.forEach(element => {
            element.classList.add('scroll-reveal');
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => element.classList.add('visible'));
    }

    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.add('fade-out');
    });

    overlay.addEventListener('transitionend', () => {
        if (overlay.classList.contains('fade-out')) {
            overlay.style.display = 'none';
        }
    });

    const isInternalLink = anchor => {
        if (!anchor.href || anchor.target === '_blank' || anchor.hasAttribute('download')) {
            return false;
        }
        if (anchor.href.startsWith('mailto:') || anchor.href.startsWith('tel:')) {
            return false;
        }
        try {
            const url = new URL(anchor.href, window.location.href);
            return url.origin === window.location.origin;
        } catch {
            return false;
        }
    };

    document.querySelectorAll('a').forEach(anchor => {
        if (!isInternalLink(anchor) || anchor.getAttribute('href')?.startsWith('#')) {
            return;
        }

        anchor.addEventListener('click', event => {
            event.preventDefault();
            const href = anchor.href;
            overlay.style.display = 'block';
            requestAnimationFrame(() => {
                overlay.classList.remove('fade-out');
            });
            setTimeout(() => {
                window.location.href = href;
            }, 120);
        });
    });
});
