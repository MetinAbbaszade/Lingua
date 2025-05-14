
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

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData(productId)
    createImgSection(data)
    createDataSection(data)
    initReadMore();
    initColorSelector();
    initStorageSelector();
    initCartWishlist();
    initReviewForm();
    initImageGallery();
    updateCartCount();
});

async function fetchData(id) {
    const res = await fetch(`../main/db/data.json`)
    const data = await res.json()
    return data.filter(product => product.id === id);
}

function createImgSection(data) {
    const imgContainer = document.querySelector('.product-gallery')
    imgContainer.innerHTML = `
    <div class="main-image">
                    <img id="main-product-image" src="${data[0].images[0].full}"
                        alt=${data[0].name}>
                </div>
                <div class="thumbnail-container">
                    <img class="thumbnail active" src="${data[0].images[0].full}"
                        alt="TechPro X15 Ultra - Front" data-src="${data[0].images[0].full}">
                    <img class="thumbnail" src="${data[0].images[0].full}"
                        alt="TechPro X15 Ultra - Back" data-src="${data[0].images[0].full}">
                    <img class="thumbnail" src="${data[0].images[0].full}"
                        alt="TechPro X15 Ultra - Side" data-src="${data[0].images[0].full}">
                    <img class="thumbnail" src="${data[0].images[0].full}"
                        alt="TechPro X15 Ultra - Camera" data-src="${data[0].images[0].full}">
                </div>
    `
}

function createDataSection(data) {
    const dataContainer = document.querySelector('.product-info')
    dataContainer.innerHTML = `
    <h1 class="product-title">${data[0].name}</h1>
                <p class="product-tagline">The next generation of mobile technology at your fingertips</p>

                <div class="rating-container">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <span class="rating-value">4.5/5</span>
                    <span class="review-count">(${data[0].reviewCount})</span>
                </div>

                <div class="price-container">
                    <span class="current-price">$${data[0].basePrice}</span>
                    <span class="old-price">$${data[0].oldPrice}</span>
                    <span class="discount-badge">-23%</span>
                </div>

                <div class="stock-status in-stock">
                    <i class="fas fa-check-circle"></i> In Stock (12 units)
                </div>

                <div class="description">
                    <p class="short-desc">The TechPro X15 Ultra features a stunning 6.7" AMOLED display, 108MP camera
                        system, and the latest processor for unmatched performance.</p>
                    <div class="full-desc hidden">
                        <p>Experience the pinnacle of smartphone innovation with the TechPro X15 Ultra. This flagship
                            device combines cutting-edge technology with elegant design to deliver an exceptional user
                            experience.</p>
                        <p>The revolutionary camera system captures professional-quality images in any lighting
                            conditions, while the all-day battery ensures you stay connected without interruption. With
                            enhanced security features and lightning-fast 5G connectivity, the X15 Ultra represents the
                            future of mobile technology.</p>
                    </div>
                    <button id="read-more" class="text-button">Read more</button>
                </div>

                <div class="color-options">
                    <h3>Color:</h3>
                    <div class="color-selector">
                        <div class="color-option black active" data-color="Black"></div>
                        <div class="color-option silver" data-color="Silver"></div>
                        <div class="color-option blue" data-color="Blue"></div>
                    </div>
                    <span id="selected-color">Black</span>
                </div>

                <div class="storage-options">
                    <h3>Storage:</h3>
                    <div class="storage-selector">
                        <button class="storage-option active" data-storage="128GB">128GB</button>
                        <button class="storage-option" data-storage="256GB">256GB</button>
                        <button class="storage-option" data-storage="512GB">512GB</button>
                    </div>
                </div>

                <div class="action-buttons">
                    <button id="add-to-cart" class="primary-button">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button id="add-to-wishlist" class="secondary-button">
                        <i class="far fa-heart"></i> Add to Wishlist
                    </button>
                </div>`
        const breadCrumb = document.querySelector('.breadcrumb')
        const span = document.createElement('span')
        span.innerText = `${data[0].name}`
        breadCrumb.append(span)
}


function initImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {

            mainImage.src = this.getAttribute('data-src');
            mainImage.alt = this.alt;


            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });


    if (window.innerWidth > 768) {
        const galleryContainer = document.querySelector('.main-image');

        galleryContainer.addEventListener('mousemove', function (e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        });

        galleryContainer.addEventListener('mouseenter', function () {
            mainImage.style.transform = 'scale(1.5)';
        });

        galleryContainer.addEventListener('mouseleave', function () {
            mainImage.style.transform = 'scale(1)';
        });
    }
}


function initReadMore() {
    const readMoreBtn = document.getElementById('read-more');
    const fullDesc = document.querySelector('.full-desc');

    readMoreBtn.addEventListener('click', function () {
        fullDesc.classList.toggle('hidden');
        this.textContent = fullDesc.classList.contains('hidden') ? 'Read more' : 'Read less';
    });
}


function initColorSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.getElementById('selected-color');

    colorOptions.forEach(option => {
        option.addEventListener('click', function () {

            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');


            const colorName = this.getAttribute('data-color');
            selectedColorText.textContent = colorName;



        });
    });
}

function initStorageSelector() {
    const storageOptions = document.querySelectorAll('.storage-option');
    const currentPriceElem = document.querySelector('.current-price');

    storageOptions.forEach(option => {
        option.addEventListener('click', function () {

            storageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');


            const storageSize = this.getAttribute('data-storage');
            const selectedStorage = productData.storage.find(item => item.size === storageSize);

            if (selectedStorage) {
                currentPriceElem.textContent = `$${selectedStorage.price.toFixed(2)}`;
            }
        });
    });
}


function initCartWishlist(productData) {
    const addToCartBtn = document.getElementById('add-to-cart');
    const addToWishlistBtn = document.getElementById('add-to-wishlist');

    addToCartBtn.addEventListener('click', function () {
        const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');
        const selectedStorage = document.querySelector('.storage-option.active').getAttribute('data-storage');


        const product = {
            id: `${productData.id}-${selectedColor.toLowerCase()}-${selectedStorage.toLowerCase()}`,
            name: productData.name,
            color: selectedColor,
            storage: selectedStorage,
            price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
            image: document.getElementById('main-product-image').src,
            quantity: 1
        };


        addToCart(product);


        showNotification('Product added to cart!', 'success');


        updateCartCount();
    });

    addToWishlistBtn.addEventListener('click', function (productData) {
        const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');
        const selectedStorage = document.querySelector('.storage-option.active').getAttribute('data-storage');


        const product = {
            id: `${productData.id}-${selectedColor.toLowerCase()}-${selectedStorage.toLowerCase()}`,
            name: productData.name,
            color: selectedColor,
            storage: selectedStorage,
            price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
            image: document.getElementById('main-product-image').src
        };


        addToWishlist(product);


        this.querySelector('i').classList.toggle('far');
        this.querySelector('i').classList.toggle('fas');


        showNotification('Product added to wishlist!', 'success');
    });
}

/**
 * Add product to cart in localStorage
 * @param {Object} product - Product to add to cart
 */
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {

        cart[existingProductIndex].quantity += 1;
    } else {

        cart.push(product);
    }


    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Add product to wishlist in localStorage
 * @param {Object} product - Product to add to wishlist
 */
function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


    const existingProductIndex = wishlist.findIndex(item => item.id === product.id);

    if (existingProductIndex === -1) {

        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {

        wishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

function updateCartCount() {
    const cartCountElem = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];


    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);


    cartCountElem.textContent = itemCount;
}


function initReviewForm() {

    const stars = document.querySelectorAll('.rating-selector i');
    let selectedRating = 0;

    stars.forEach(star => {

        star.addEventListener('mouseenter', function () {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });


        star.addEventListener('click', function () {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            highlightStars(selectedRating);
        });
    });


    document.querySelector('.rating-selector').addEventListener('mouseleave', function () {
        highlightStars(selectedRating);
    });


    const reviewForm = document.getElementById('review-form');

    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();


        if (selectedRating === 0) {
            showNotification('Please select a rating', 'error');
            return;
        }


        const reviewerName = document.getElementById('reviewer-name').value;
        const reviewTitle = document.getElementById('review-title').value;
        const reviewContent = document.getElementById('review-content').value;


        const newReview = {
            name: reviewerName,
            title: reviewTitle,
            rating: selectedRating,
            content: reviewContent,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };



        console.log('New review:', newReview);


        showNotification('Thank you for your review!', 'success');


        reviewForm.reset();
        selectedRating = 0;
        highlightStars(0);
    });


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

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;


    document.body.appendChild(notification);


    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);


    setTimeout(() => {
        notification.classList.remove('visible');


        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);


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
