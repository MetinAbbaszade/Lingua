/**
 * TechElite Shop Page JavaScript
 * This script handles product rendering, filtering, sorting, and responsive behaviors
 */

// Product data array - simulating data that would typically come from a database
const products = [
    {
        id: 1,
        name: "iPhone 13 Pro",
        category: "phone",
        brand: "apple",
        price: 999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTMlMjBwcm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 2,
        name: "Samsung Galaxy S22 Ultra",
        category: "phone",
        brand: "samsung",
        price: 1199,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1644677396927-22f0bdd90446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNhbXN1bmclMjBnYWxheHklMjBzMjJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 3,
        name: "MacBook Pro 14-inch",
        category: "laptop",
        brand: "apple",
        price: 1999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1639249227523-80c8deb986a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hY2Jvb2slMjBwcm8lMjAxNHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 4,
        name: "iPad Air",
        category: "tablet",
        brand: "apple",
        price: 599,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aVBhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        inStock: false
    },
    {
        id: 5,
        name: "Dell XPS 15",
        category: "laptop",
        brand: "dell",
        price: 1899,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsbCUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 6,
        name: "Google Pixel 6 Pro",
        category: "phone",
        brand: "google",
        price: 899,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1635870723802-e88d76ae630f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 7,
        name: "Apple Watch Series 7",
        category: "smartwatch",
        brand: "apple",
        price: 399,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 8,
        name: "Samsung Galaxy Tab S8",
        category: "tablet",
        brand: "samsung",
        price: 699,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFibGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        inStock: false
    },
    {
        id: 9,
        name: "HP Spectre x360",
        category: "laptop",
        brand: "hp",
        price: 1399,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFwdG9wJTIwaHB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 10,
        name: "Bose QuietComfort Earbuds",
        category: "accessory",
        brand: "bose",
        price: 279,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 11,
        name: "Samsung Galaxy Watch 4",
        category: "smartwatch",
        brand: "samsung",
        price: 249,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    },
    {
        id: 12,
        name: "Logitech MX Master 3",
        category: "accessory",
        brand: "logitech",
        price: 99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naXRlY2glMjBtb3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        inStock: true
    }
];

// Store filter state
const filterState = {
    categories: [],
    brands: [],
    priceMin: null,
    priceMax: null,
    inStockOnly: false,
    minRating: 0,
    sortBy: 'featured'
};

// DOM Elements
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

// Category and brand checkboxes
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');

/**
 * Initialize the page
 */
function init() {
    renderProducts(products);
    setupEventListeners();
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('active');
    });

    // Mobile filter toggle
    filterToggleBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    // Close sidebar
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Category filter
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCategoryFilters();
            applyFilters();
        });
    });

    // Brand filter
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateBrandFilters();
            applyFilters();
        });
    });

    // Rating filter
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateRatingFilter();
            applyFilters();
        });
    });

    // Price range filter
    applyPriceBtn.addEventListener('click', () => {
        updatePriceFilter();
        applyFilters();
    });

    // In stock filter
    inStockCheckbox.addEventListener('change', () => {
        filterState.inStockOnly = inStockCheckbox.checked;
        applyFilters();
    });

    // Sort products
    sortSelect.addEventListener('change', () => {
        filterState.sortBy = sortSelect.value;
        applyFilters();
    });

    // Clear all filters
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    resetFiltersBtn.addEventListener('click', clearAllFilters);

    // Close filter sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            e.target !== filterToggleBtn) {
            sidebar.classList.remove('active');
        }
    });

    // Add to cart functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') ||
            e.target.parentElement.classList.contains('add-to-cart')) {
            updateCart(e);
        }
    });
}

/**
 * Update the cart count and show animation
 */
function updateCart(e) {
    // Get the cart count element
    const cartCount = document.querySelector('.cart-count');
    // Update cart count
    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1;

    // Animation
    cartCount.classList.add('bump');
    setTimeout(() => {
        cartCount.classList.remove('bump');
    }, 300);

    // Change button text temporarily
    const button = e.target.closest('.add-to-cart');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

/**
 * Update the category filter state
 */
function updateCategoryFilters() {
    filterState.categories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}

/**
 * Update the brand filter state
 */
function updateBrandFilters() {
    filterState.brands = Array.from(brandCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}

/**
 * Update the rating filter state
 */
function updateRatingFilter() {
    const checkedRatings = Array.from(ratingCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.value));

    filterState.minRating = checkedRatings.length > 0 ? Math.min(...checkedRatings) : 0;
}

/**
 * Update the price filter state
 */
function updatePriceFilter() {
    const minPrice = minPriceInput.value ? parseInt(minPriceInput.value) : null;
    const maxPrice = maxPriceInput.value ? parseInt(maxPriceInput.value) : null;

    filterState.priceMin = minPrice;
    filterState.priceMax = maxPrice;
}

/**
 * Apply all filters to the products
 */
function applyFilters() {
    let filteredProducts = [...products];

    // Filter by category
    if (filterState.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            filterState.categories.includes(product.category));
    }

    // Filter by brand
    if (filterState.brands.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            filterState.brands.includes(product.brand));
    }

    // Filter by price
    if (filterState.priceMin !== null) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= filterState.priceMin);
    }

    if (filterState.priceMax !== null) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= filterState.priceMax);
    }

    // Filter by stock
    if (filterState.inStockOnly) {
        filteredProducts = filteredProducts.filter(product => product.inStock);
    }

    // Filter by rating
    if (filterState.minRating > 0) {
        filteredProducts = filteredProducts.filter(product =>
            product.rating >= filterState.minRating);
    }

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, filterState.sortBy);

    // Render the filtered products
    renderProducts(filteredProducts);
}

/**
 * Sort products based on selected criteria
 */
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
            // featured - no specific sort, use default order
            break;
    }

    return sortedProducts;
}

/**
 * Clear all applied filters
 */
function clearAllFilters() {
    // Reset checkboxes
    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    brandCheckboxes.forEach(checkbox => checkbox.checked = false);
    ratingCheckboxes.forEach(checkbox => checkbox.checked = false);
    inStockCheckbox.checked = false;

    // Reset inputs
    minPriceInput.value = '';
    maxPriceInput.value = '';

    // Reset sort
    sortSelect.value = 'featured';

    // Reset filter state
    filterState.categories = [];
    filterState.brands = [];
    filterState.priceMin = null;
    filterState.priceMax = null;
    filterState.inStockOnly = false;
    filterState.minRating = 0;
    filterState.sortBy = 'featured';

    // Re-render products
    renderProducts(products);

    // Close mobile sidebar
    sidebar.classList.remove('active');
}

/**
 * Render products to the product grid
 */
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

/**
 * Create a product card element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Generate star rating HTML
    const ratingStars = generateRatingStars(product.rating);

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price}</div>
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

/**
 * Generate HTML for star ratings
 */
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starsHTML = '';

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    // Add half star if needed
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
