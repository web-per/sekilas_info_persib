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
});
