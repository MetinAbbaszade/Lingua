/**
 * Product Detail Page JavaScript
 * This script handles all interactive functionality for the product detail page
 */

// Product data - would typically come from an API or backend
const productData = {
    id: "tp-x15-ultra",
    name: "TechPro X15 Ultra",
    basePrice: 999.99,
    oldPrice: 1299.99,
    discount: 23,
    inStock: true,
    stockQuantity: 12,
    rating: 4.5,
    reviewCount: 128,
    colors: ["Black", "Silver", "Blue"],
    storage: [
        { size: "128GB", price: 999.99 },
        { size: "256GB", price: 1099.99 },
        { size: "512GB", price: 1299.99 }
    ],
    images: [
        {
            thumbnail: "https://placehold.co/600x400?text=TechPro+X15+Ultra",
            full: "https://placehold.co/600x400?text=TechPro+X15+Ultra",
            alt: "TechPro X15 Ultra - Front"
        },
        {
            thumbnail: "https://placehold.co/600x400?text=Back+View",
            full: "https://placehold.co/600x400?text=Back+View",
            alt: "TechPro X15 Ultra - Back"
        },
        {
            thumbnail: "https://placehold.co/600x400?text=Side+View",
            full: "https://placehold.co/600x400?text=Side+View",
            alt: "TechPro X15 Ultra - Side"
        },
        {
            thumbnail: "https://placehold.co/600x400?text=Camera+Detail",
            full: "https://placehold.co/600x400?text=Camera+Detail",
            alt: "TechPro X15 Ultra - Camera"
        }
    ]
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initImageGallery();
    initReadMore();
    initColorSelector();
    initStorageSelector();
    initCartWishlist();
    initReviewForm();
    
    // Load cart count from localStorage
    updateCartCount();
});

/**
 * Image Gallery Functionality
 * Handles switching between thumbnails and main product image
 */
function initImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image source
            mainImage.src = this.getAttribute('data-src');
            mainImage.alt = this.alt;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Optional: Add image zoom effect on hover
    if (window.innerWidth > 768) { // Only on desktop
        const galleryContainer = document.querySelector('.main-image');
        
        galleryContainer.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        });
        
        galleryContainer.addEventListener('mouseenter', function() {
            mainImage.style.transform = 'scale(1.5)';
        });
        
        galleryContainer.addEventListener('mouseleave', function() {
            mainImage.style.transform = 'scale(1)';
        });
    }
}

/**
 * Read More Button Functionality
 * Expands and collapses the full product description
 */
function initReadMore() {
    const readMoreBtn = document.getElementById('read-more');
    const fullDesc = document.querySelector('.full-desc');
    
    readMoreBtn.addEventListener('click', function() {
        fullDesc.classList.toggle('hidden');
        this.textContent = fullDesc.classList.contains('hidden') ? 'Read more' : 'Read less';
    });
}

/**
 * Color Selector Functionality
 * Handles color selection and updates display
 */
function initColorSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.getElementById('selected-color');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active color
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update selected color text
            const colorName = this.getAttribute('data-color');
            selectedColorText.textContent = colorName;
            
            // You could also update product images based on color here
            // For a real implementation
        });
    });
}

/**
 * Storage Option Functionality
 * Handles storage size selection and updates price
 */
function initStorageSelector() {
    const storageOptions = document.querySelectorAll('.storage-option');
    const currentPriceElem = document.querySelector('.current-price');
    
    storageOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active storage option
            storageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Get storage size and update price accordingly
            const storageSize = this.getAttribute('data-storage');
            const selectedStorage = productData.storage.find(item => item.size === storageSize);
            
            if (selectedStorage) {
                currentPriceElem.textContent = `$${selectedStorage.price.toFixed(2)}`;
            }
        });
    });
}

/**
 * Cart and Wishlist Functionality
 * Handles adding products to cart and wishlist using localStorage
 */
function initCartWishlist() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const addToWishlistBtn = document.getElementById('add-to-wishlist');
    
    addToCartBtn.addEventListener('click', function() {
        const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');
        const selectedStorage = document.querySelector('.storage-option.active').getAttribute('data-storage');
        
        // Create product object
        const product = {
            id: `${productData.id}-${selectedColor.toLowerCase()}-${selectedStorage.toLowerCase()}`,
            name: productData.name,
            color: selectedColor,
            storage: selectedStorage,
            price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
            image: document.getElementById('main-product-image').src,
            quantity: 1
        };
        
        // Add to cart in localStorage
        addToCart(product);
        
        // Show confirmation
        showNotification('Product added to cart!', 'success');
        
        // Update cart count
        updateCartCount();
    });
    
    addToWishlistBtn.addEventListener('click', function() {
        const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');
        const selectedStorage = document.querySelector('.storage-option.active').getAttribute('data-storage');
        
        // Create product object
        const product = {
            id: `${productData.id}-${selectedColor.toLowerCase()}-${selectedStorage.toLowerCase()}`,
            name: productData.name,
            color: selectedColor,
            storage: selectedStorage,
            price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
            image: document.getElementById('main-product-image').src
        };
        
        // Add to wishlist in localStorage
        addToWishlist(product);
        
        // Toggle heart icon
        this.querySelector('i').classList.toggle('far');
        this.querySelector('i').classList.toggle('fas');
        
        // Show confirmation
        showNotification('Product added to wishlist!', 'success');
    });
}

/**
 * Add product to cart in localStorage
 * @param {Object} product - Product to add to cart
 */
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        // Increase quantity if product already in cart
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push(product);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Add product to wishlist in localStorage
 * @param {Object} product - Product to add to wishlist
 */
function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product already exists in wishlist
    const existingProductIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingProductIndex === -1) {
        // Add product to wishlist only if it doesn't exist
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
        // Remove from wishlist if already exists (toggle behavior)
        wishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

/**
 * Update cart count in header
 */
function updateCartCount() {
    const cartCountElem = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total quantity of items in cart
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count display
    cartCountElem.textContent = itemCount;
}

/**
 * Review Form Functionality
 * Handles star rating selection and form submission
 */
function initReviewForm() {
    // Star rating functionality
    const stars = document.querySelectorAll('.rating-selector i');
    let selectedRating = 0;
    
    stars.forEach(star => {
        // Handle hover effect
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        // Handle click to select rating
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            highlightStars(selectedRating);
        });
    });
    
    // Reset stars when leaving the rating selector
    document.querySelector('.rating-selector').addEventListener('mouseleave', function() {
        highlightStars(selectedRating);
    });
    
    // Handle form submission
    const reviewForm = document.getElementById('review-form');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate rating is selected
        if (selectedRating === 0) {
            showNotification('Please select a rating', 'error');
            return;
        }
        
        // Get form data
        const reviewerName = document.getElementById('reviewer-name').value;
        const reviewTitle = document.getElementById('review-title').value;
        const reviewContent = document.getElementById('review-content').value;
        
        // Create review object
        const newReview = {
            name: reviewerName,
            title: reviewTitle,
            rating: selectedRating,
            content: reviewContent,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };
        
        // In a real application, you would send this to a server
        // For demo purposes, we'll just show a confirmation
        console.log('New review:', newReview);
        
        // Show confirmation message
        showNotification('Thank you for your review!', 'success');
        
        // Reset form
        reviewForm.reset();
        selectedRating = 0;
        highlightStars(0);
    });
    
    // Helper function to highlight stars
    function highlightStars(count) {
        stars.forEach((star, index) => {
            if (index < count) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
}

/**
 * Shows a notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, etc.)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add visible class after a small delay (for animation)
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        
        // Remove from DOM after fade out
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Add styles if they don't exist
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            
            .notification.visible {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification.success {
                background-color: var(--success-color, #27ae60);
            }
            
            .notification.error {
                background-color: var(--error-color, #e74c3c);
            }
            
            .notification.info {
                background-color: var(--primary-color, #3498db);
            }
        `;
        document.head.appendChild(style);
    }
}
