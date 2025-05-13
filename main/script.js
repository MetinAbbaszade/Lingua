
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const formMessage = document.getElementById('formMessage');
const cartCount = document.getElementById('cartCount');


const productsGrid = document.querySelector('.products-grid');
const carouselViewport = document.querySelector('.carousel-viewport');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const carouselIndicators = document.querySelector('.carousel-indicators');
const carouselPlayToggle = document.querySelector('.carousel-play-toggle');


const products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&q=80&w=500",
        rating: 4.8
    },
    {
        id: 2,
        name: "Samsung Galaxy S23",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.7
    },
    {
        id: 3,
        name: "MacBook Pro M2",
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?auto=format&fit=crop&q=80&w=500",
        rating: 4.9
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500",
        rating: 4.8
    },
    {
        id: 5,
        name: "iPad Air",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500",
        rating: 4.6
    },
    {
        id: 6,
        name: "Google Pixel 7",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=3465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.5
    }
];


let cart = [];


const carouselState = {
    currentSlide: 0,
    totalSlides: 0,
    slideWidth: 0,
    slidesPerView: 4,
    autoPlay: true,
    autoPlayInterval: 5000,
    autoPlayTimer: null,
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationID: 0
};


function init() {
    loadTheme();
    loadCart();
    renderProducts();
    loadSavedEmail();
    setupEventListeners();
    setupScrollAnimation();

    startAutoPlay();
}


function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}


function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}


function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}


function updateCartCount() {
    cartCount.textContent = cart.length;
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        saveCart();


        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = `${product.name} added to cart!`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
}


function renderProducts() {
    if (!productsGrid) return;


    productsGrid.setAttribute('role', 'list');
    productsGrid.setAttribute('aria-label', 'Featured Products');

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card scroll-reveal" role="listitem">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating" aria-label="Product rating: ${product.rating} out of 5 stars">
                    ${getRatingStars(product.rating)}
                </div>
                <p class="product-price" aria-label="Price: $${product.price.toFixed(2)}">
                    $${product.price.toFixed(2)}
                </p>
                <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');


    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });


    setupCarousel();
}


function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }


    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}


function loadSavedEmail() {
    if (emailInput) {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
    }
}


function setupCarousel() {
    if (!productsGrid || !carouselViewport) return;


    updateSlidesPerView();


    carouselState.totalSlides = Math.max(1, Math.ceil(products.length / carouselState.slidesPerView));


    if (carouselIndicators) {
        carouselIndicators.innerHTML = '';

        for (let i = 0; i < carouselState.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');


            dot.addEventListener('click', () => goToSlide(i));


            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(i);
                }
            });

            carouselIndicators.appendChild(dot);
        }
    }


    updateCarouselPosition();
}


function updateSlidesPerView() {
    const width = window.innerWidth;

    if (width <= 576) {
        carouselState.slidesPerView = 1;
    } else if (width <= 768) {
        carouselState.slidesPerView = 2;
    } else if (width <= 992) {
        carouselState.slidesPerView = 3;
    } else {
        carouselState.slidesPerView = 4;
    }
}


function updateCarouselPosition() {
    if (!productsGrid || !carouselViewport) return;


    carouselState.slideWidth = carouselViewport.offsetWidth;


    const translateX = -carouselState.currentSlide * carouselState.slideWidth;
    carouselState.prevTranslate = translateX;


    productsGrid.style.transform = `translateX(${translateX}px)`;


    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === carouselState.currentSlide);


        dot.setAttribute('aria-current', index === carouselState.currentSlide ? 'true' : 'false');
    });


    if (carouselState.autoPlay) {
        restartAutoPlay();
    }
}

/* @param {number} index  */
function goToSlide(index) {

    carouselState.currentSlide = Math.max(0, Math.min(index, carouselState.totalSlides - 1));
    updateCarouselPosition();
}

function nextSlide() {
    carouselState.currentSlide = (carouselState.currentSlide + 1) % carouselState.totalSlides;
    updateCarouselPosition();
}


function prevSlide() {
    carouselState.currentSlide = (carouselState.currentSlide - 1 + carouselState.totalSlides) % carouselState.totalSlides;
    updateCarouselPosition();
}


function startAutoPlay() {
    if (!carouselState.autoPlay) return;

    clearInterval(carouselState.autoPlayTimer);
    carouselState.autoPlayTimer = setInterval(() => {
        nextSlide();
    }, carouselState.autoPlayInterval);


    if (carouselPlayToggle) {
        carouselPlayToggle.classList.remove('paused');
    }
}

function pauseAutoPlay() {
    clearInterval(carouselState.autoPlayTimer);


    if (carouselPlayToggle) {
        carouselPlayToggle.classList.add('paused');
    }
}


function restartAutoPlay() {
    if (carouselState.autoPlay) {
        clearInterval(carouselState.autoPlayTimer);
        startAutoPlay();
    }
}


function toggleAutoPlay() {
    carouselState.autoPlay = !carouselState.autoPlay;

    if (carouselState.autoPlay) {
        startAutoPlay();
    } else {
        pauseAutoPlay();
    }
}

function setupCarouselDragEvents() {
    if (!productsGrid || !carouselViewport) return;


    productsGrid.addEventListener('touchstart', touchStart, { passive: true });
    productsGrid.addEventListener('touchmove', touchMove, { passive: false });
    productsGrid.addEventListener('touchend', touchEnd, { passive: true });


    productsGrid.addEventListener('mousedown', dragStart);
    productsGrid.addEventListener('mousemove', dragMove);
    productsGrid.addEventListener('mouseup', dragEnd);
    productsGrid.addEventListener('mouseleave', dragEnd);


    productsGrid.addEventListener('contextmenu', e => {
        if (carouselState.isDragging) {
            e.preventDefault();
        }
    });
}

function touchStart(e) {
    carouselState.startPos = e.touches[0].clientX;
    carouselState.isDragging = true;
    carouselState.animationID = requestAnimationFrame(animation);


    if (carouselState.autoPlay) {
        pauseAutoPlay();
    }
}

function touchMove(e) {
    if (!carouselState.isDragging) return;


    e.preventDefault();

    const currentPosition = e.touches[0].clientX;
    const diff = currentPosition - carouselState.startPos;
    carouselState.currentTranslate = carouselState.prevTranslate + diff;
}

function touchEnd() {
    carouselState.isDragging = false;
    cancelAnimationFrame(carouselState.animationID);


    const movedBy = carouselState.currentTranslate - carouselState.prevTranslate;


    if (Math.abs(movedBy) > carouselState.slideWidth * 0.2) {
        if (movedBy < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    } else {

        updateCarouselPosition();
    }


    if (carouselState.autoPlay) {
        startAutoPlay();
    }
}

function dragStart(e) {
    carouselState.startPos = e.clientX;
    carouselState.isDragging = true;
    carouselState.animationID = requestAnimationFrame(animation);


    productsGrid.style.cursor = 'grabbing';


    if (carouselState.autoPlay) {
        pauseAutoPlay();
    }
}

function dragMove(e) {
    if (!carouselState.isDragging) return;

    const currentPosition = e.clientX;
    const diff = currentPosition - carouselState.startPos;
    carouselState.currentTranslate = carouselState.prevTranslate + diff;
}

function dragEnd() {
    if (!carouselState.isDragging) return;

    carouselState.isDragging = false;
    cancelAnimationFrame(carouselState.animationID);


    productsGrid.style.cursor = '';


    const movedBy = carouselState.currentTranslate - carouselState.prevTranslate;


    if (Math.abs(movedBy) > carouselState.slideWidth * 0.2) {
        if (movedBy < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    } else {

        updateCarouselPosition();
    }


    if (carouselState.autoPlay) {
        startAutoPlay();
    }
}


function animation() {
    if (!carouselState.isDragging) return;


    productsGrid.style.transform = `translateX(${carouselState.currentTranslate}px)`;
    carouselState.animationID = requestAnimationFrame(animation);
}


function setupEventListeners() {

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }


    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }


    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (email) {
                localStorage.setItem('savedEmail', email);
                formMessage.textContent = 'Thank you for subscribing!';
                formMessage.style.color = '#4CAF50';
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 3000);
            }
        });
    }


    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }


    if (carouselPlayToggle) {
        carouselPlayToggle.addEventListener('click', toggleAutoPlay);
    }


    if (carouselViewport) {
        carouselViewport.addEventListener('mouseenter', () => {
            if (carouselState.autoPlay) {
                pauseAutoPlay();
            }
        });

        carouselViewport.addEventListener('mouseleave', () => {
            if (carouselState.autoPlay) {
                startAutoPlay();
            }
        });
    }


    window.addEventListener('resize', () => {
        updateSlidesPerView();
        setupCarousel();
    });


    setupCarouselDragEvents();
}


function setupScrollAnimation() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };


    setTimeout(handleScrollAnimation, 100);


    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}


document.addEventListener('DOMContentLoaded', init);


const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(style);
