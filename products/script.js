const filterState = {
    categories: [],
    brands: [],
    priceMin: null,
    priceMax: null,
    inStockOnly: false,
    minRating: 0,
    sortBy: 'featured'
};


const productsGrid = document.getElementById('products-grid');
const productsCount = document.getElementById('products-count');
const noProductsMessage = document.getElementById('no-products-message');
const sidebar = document.getElementById('sidebar');
const filterToggleBtn = document.getElementById('filter-toggle-btn');
const closeSidebarBtn = document.getElementById('close-sidebar');
const menuToggle = document.getElementById('menu-toggle');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const applyPriceBtn = document.getElementById('apply-price');
const inStockCheckbox = document.getElementById('in-stock');
const clearFiltersBtn = document.getElementById('clear-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const sortSelect = document.getElementById('sort-select');


const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');

const fetchProducts = async () => {
    const res = await fetch('../main/db/data.json')
    const data = await res.json()
    return data
}

async function init() {
    renderProducts(await fetchProducts());
    setupEventListeners();
}

function setupEventListeners() {

    menuToggle.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('active');
    });


    filterToggleBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });


    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });


    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCategoryFilters();
            applyFilters();
        });
    });


    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateBrandFilters();
            applyFilters();
        });
    });


    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateRatingFilter();
            applyFilters();
        });
    });


    applyPriceBtn.addEventListener('click', () => {
        updatePriceFilter();
        applyFilters();
    });


    inStockCheckbox.addEventListener('change', () => {
        filterState.inStockOnly = inStockCheckbox.checked;
        applyFilters();
    });


    sortSelect.addEventListener('change', () => {
        filterState.sortBy = sortSelect.value;
        applyFilters();
    });


    clearFiltersBtn.addEventListener('click', clearAllFilters);
    resetFiltersBtn.addEventListener('click', clearAllFilters);


    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            e.target !== filterToggleBtn) {
            sidebar.classList.remove('active');
        }
    });


    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') ||
            e.target.parentElement.classList.contains('add-to-cart')) {
            updateCart(e);
        }
    });
}

function updateCart(e) {

    const cartCount = document.querySelector('.cart-count');

    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1;


    cartCount.classList.add('bump');
    setTimeout(() => {
        cartCount.classList.remove('bump');
    }, 300);


    const button = e.target.closest('.add-to-cart');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

function updateCategoryFilters() {
    filterState.categories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}

function updateBrandFilters() {
    filterState.brands = Array.from(brandCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}


function updateRatingFilter() {
    const checkedRatings = Array.from(ratingCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.value));

    filterState.minRating = checkedRatings.length > 0 ? Math.min(...checkedRatings) : 0;
}

function updatePriceFilter() {
    const minPrice = minPriceInput.value ? parseInt(minPriceInput.value) : null;
    const maxPrice = maxPriceInput.value ? parseInt(maxPriceInput.value) : null;

    filterState.priceMin = minPrice;
    filterState.priceMax = maxPrice;
}

async function applyFilters() {
    const products = await fetchProducts()
    let filteredProducts = [...products];

    if (filterState.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            filterState.categories.includes(product.category));
    }


    if (filterState.brands.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
            return filterState.brands.includes(product.brand.toLowerCase())
        })
    }



    if (filterState.priceMin !== null) {
        filteredProducts = filteredProducts.filter(product =>
            product.basePrice >= filterState.priceMin);
    }

    if (filterState.priceMax !== null) {
        filteredProducts = filteredProducts.filter(product =>
            product.basePrice <= filterState.priceMax);
    }


    if (filterState.inStockOnly) {
        filteredProducts = filteredProducts.filter(product => product.inStock);
    }


    if (filterState.minRating > 0) {
        filteredProducts = filteredProducts.filter(product =>
            product.rating >= filterState.minRating);
    }


    filteredProducts = sortProducts(filteredProducts, filterState.sortBy);


    renderProducts(filteredProducts);
}

function sortProducts(products, sortBy) {
    const sortedProducts = [...products];

    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:

            break;
    }

    return sortedProducts;
}

async function clearAllFilters() {

    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    brandCheckboxes.forEach(checkbox => checkbox.checked = false);
    ratingCheckboxes.forEach(checkbox => checkbox.checked = false);
    inStockCheckbox.checked = false;


    minPriceInput.value = '';
    maxPriceInput.value = '';


    sortSelect.value = 'featured';


    filterState.categories = [];
    filterState.brands = [];
    filterState.priceMin = null;
    filterState.priceMax = null;
    filterState.inStockOnly = false;
    filterState.minRating = 0;
    filterState.sortBy = 'featured';


    renderProducts(await fetchProducts());


    sidebar.classList.remove('active');
}
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    productsCount.textContent = `(${productsToRender.length})`;

    if (productsToRender.length === 0) {
        noProductsMessage.classList.remove('hidden');
        return;
    }

    noProductsMessage.classList.add('hidden');

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productCard.onclick = () => {
            window.location.href = "../productDetail/index.html";
        };
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');


    const ratingStars = generateRatingStars(product.rating);

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0].full}" alt="${product.name}">
        </div>
        <div class="product-details">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.basePrice}</div>
            <div class="product-rating">
                ${ratingStars}
                <span>(${product.rating})</span>
            </div>
            <div class="product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                ${product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <button class="add-to-cart" ${!product.inStock ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart"></i>
                Explore
            </button>
        </div>
    `;

    return card;
}

function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starsHTML = '';


    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }


    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }


    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}


document.addEventListener('DOMContentLoaded', init);
