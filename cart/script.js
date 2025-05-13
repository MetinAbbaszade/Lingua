
const sampleProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 2,
        name: "4K Smart TV - 55 inch",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHR2fGVufDB8fDB8fHww"
    },
    {
        id: 3,
        name: "Smartphone Pro Max",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D"
    }
];


const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartMessage = document.getElementById('empty-cart');
const totalItemsElement = document.getElementById('total-items');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout');
const continueShoppingBtn = document.getElementById('continue-shopping');
const startShoppingBtn = document.getElementById('start-shopping');
const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.querySelector('.close-modal');
const modalBtn = document.querySelector('.modal-btn');


let cart = [];


function init() {
    loadCartFromStorage();
    renderCart();
    setupEventListeners();
}


function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        
        
        cart = [
            { ...sampleProducts[0], quantity: 1 },
            { ...sampleProducts[1], quantity: 2 }
        ];
        saveCartToStorage();
    }
}


function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function renderCart() {
    
    cartItemsContainer.innerHTML = '';
    
    
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        updateSummary();
        return;
    }
    
    
    emptyCartMessage.classList.add('hidden');
    
    
    cart.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    
    updateSummary();
}


function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="item-details">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-price">$${item.price.toFixed(2)}</p>
            <div class="item-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.id}">
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
        <div class="item-subtotal">
            $${(item.price * item.quantity).toFixed(2)}
        </div>
    `;
    
    return cartItem;
}


function updateSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    
    const shipping = subtotal > 100 ? 0 : 10;
    
    
    const tax = subtotal * 0.0825;
    
    
    const total = subtotal + shipping + tax;
    
    
    totalItemsElement.textContent = totalItems;
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}


function updateQuantity(productId, newQuantity) {
    
    newQuantity = Math.max(1, newQuantity);
    
    
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        
        
        saveCartToStorage();
        
        
        renderCart();
    }
}


function removeItem(productId) {
    
    cart = cart.filter(item => item.id !== productId);
    
    
    saveCartToStorage();
    
    
    renderCart();
}


function setupEventListeners() {
    
    cartItemsContainer.addEventListener('click', function(e) {
        const target = e.target;
        
        
        if (target.classList.contains('decrease')) {
            const quantityInput = target.nextElementSibling;
            const productId = parseInt(quantityInput.dataset.id);
            const newQuantity = parseInt(quantityInput.value) - 1;
            updateQuantity(productId, newQuantity);
        }
        
        
        if (target.classList.contains('increase')) {
            const quantityInput = target.previousElementSibling;
            const productId = parseInt(quantityInput.dataset.id);
            const newQuantity = parseInt(quantityInput.value) + 1;
            updateQuantity(productId, newQuantity);
        }
        
        
        if (target.classList.contains('remove-item') || 
            (target.parentElement && target.parentElement.classList.contains('remove-item'))) {
            const button = target.classList.contains('remove-item') ? target : target.parentElement;
            const productId = parseInt(button.dataset.id);
            removeItem(productId);
        }
    });
    
    
    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const productId = parseInt(e.target.dataset.id);
            let newQuantity = parseInt(e.target.value);
            
            
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
                e.target.value = 1;
            }
            
            updateQuantity(productId, newQuantity);
        }
    });
    
    
    continueShoppingBtn.addEventListener('click', function() {
        
        alert('This would navigate to the products page in a real application.');
    });
    
    
    startShoppingBtn.addEventListener('click', function() {
        
        alert('This would navigate to the products page in a real application.');
    });
    
    
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some products before checking out.');
            return;
        }
        
        
        checkoutModal.style.display = 'flex';
    });
    
    
    closeModal.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
    });
    
    
    modalBtn.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
    });
    
    
    window.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', init);
