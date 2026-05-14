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

    // Handle "Beli Sekarang" button on product detail pages
    const buyButton = document.querySelector('.buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Ambil data produk dari halaman
            const productCard = document.querySelector('.product-detail-card');
            if (productCard) {
                const productName = productCard.querySelector('h1')?.textContent.trim() || '';
                const priceElement = productCard.querySelector('.detail-price');
                const price = priceElement?.textContent.trim() || '';
                const colorButton = document.querySelector('.color-btn.active');
                const selectedColor = colorButton?.textContent.trim() || '';

                // Redirect ke order form dengan data produk
                const encodedProduct = encodeURIComponent(productName);
                const encodedPrice = encodeURIComponent(price);
                let redirectUrl = `order-form.html?product=${encodedProduct}&price=${encodedPrice}`;
                if (selectedColor) {
                    redirectUrl += `&color=${encodeURIComponent(selectedColor)}`;
                }
                window.location.href = redirectUrl;
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".color-btn");
    const productImage = document.getElementById("productImage");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            // hapus active dari semua tombol
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            // tambahkan active ke tombol dipilih
            button.classList.add("active");

            // ganti gambar
            const newImage = button.getAttribute("data-image");
            productImage.src = newImage;

        });

    });

});