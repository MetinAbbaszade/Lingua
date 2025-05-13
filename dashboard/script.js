// Sample data
const ordersData = [
    {
        id: "ORD-2023-001",
        date: "2023-10-15",
        status: "delivered",
        products: [
            { name: "Wireless Earbuds", quantity: 1, price: 89.99 },
            { name: "USB-C Charging Cable", quantity: 2, price: 12.99 }
        ],
        total: 115.97
    },
    {
        id: "ORD-2023-002",
        date: "2023-10-28",
        status: "processing",
        products: [
            { name: "Smart Watch", quantity: 1, price: 249.99 }
        ],
        total: 249.99
    },
    {
        id: "ORD-2023-003",
        date: "2023-11-05",
        status: "shipped",
        products: [
            { name: "Bluetooth Speaker", quantity: 1, price: 79.99 },
            { name: "HDMI Cable", quantity: 1, price: 15.99 },
            { name: "Wireless Mouse", quantity: 1, price: 29.99 }
        ],
        total: 125.97
    }
];

const wishlistData = [
    {
        id: "PRD001",
        name: "4K Smart TV - 55\"",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=250"
    },
    {
        id: "PRD002",
        name: "Noise-Canceling Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=250"
    },
    {
        id: "PRD003",
        name: "Gaming Laptop",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=250"
    },
    {
        id: "PRD004",
        name: "Wireless Charging Pad",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?q=80&w=250"
    }
];

const userProfileData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Tech Street, Digital City, DC 10101"
};

// DOM Elements
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-links li[data-section]');
const logoutButton = document.getElementById('logout-button');
const ordersList = document.querySelector('.orders-list');
const wishlistContainer = document.querySelector('.wishlist-container');
const personalInfoForm = document.getElementById('personal-info-form');
const passwordForm = document.getElementById('password-form');
const personalInfoMessage = document.getElementById('personal-info-message');
const passwordMessage = document.getElementById('password-message');

// Initialize the dashboard
function initDashboard() {
    loadOrders();
    loadWishlist();
    loadUserProfile();
    setupEventListeners();
}

// Load orders data
function loadOrders() {
    ordersList.innerHTML = '';

    ordersData.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';

        const statusClass = order.status.toLowerCase();
        const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        orderElement.innerHTML = `
            <div class="order-header">
                <div>
                    <span class="order-id">${order.id}</span>
                    <span class="order-date">${formattedDate}</span>
                </div>
                <div>
                    <span class="status ${statusClass}">${order.status}</span>
                    <span class="expand-icon material-symbols-outlined">expand_more</span>
                </div>
            </div>
            <div class="order-details">
                ${order.products.map(product => `
                    <div class="order-product">
                        <div>${product.name} x${product.quantity}</div>
                        <div>$${product.price.toFixed(2)}</div>
                    </div>
                `).join('')}
                <div class="order-total">Total: $${order.total.toFixed(2)}</div>
            </div>
        `;

        ordersList.appendChild(orderElement);

        // Add click event to toggle order details
        const orderHeader = orderElement.querySelector('.order-header');
        const orderDetails = orderElement.querySelector('.order-details');
        const expandIcon = orderElement.querySelector('.expand-icon');

        orderHeader.addEventListener('click', () => {
            orderDetails.classList.toggle('expanded');
            expandIcon.textContent = orderDetails.classList.contains('expanded') ? 'expand_less' : 'expand_more';
        });
    });
}

// Load wishlist items
function loadWishlist() {
    // First check localStorage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || wishlistData;

    wishlistContainer.innerHTML = '';

    storedWishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.dataset.id = item.id;

        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-details">
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
                <button class="remove-wishlist" data-id="${item.id}">Remove</button>
            </div>
        `;

        wishlistContainer.appendChild(wishlistItem);
    });

    // Save initial wishlist to localStorage if not already there
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
    }
}

// Load user profile data
function loadUserProfile() {
    // Check localStorage for saved user data
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || userProfileData;

    document.getElementById('fullName').value = storedUserData.fullName;
    document.getElementById('email').value = storedUserData.email;
    document.getElementById('phone').value = storedUserData.phone;
    document.getElementById('address').value = storedUserData.address;

    // Save initial user data to localStorage if not already there
    if (!localStorage.getItem('userData')) {
        localStorage.setItem('userData', JSON.stringify(storedUserData));
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show corresponding section
            const sectionId = link.dataset.section;
            const sections = document.querySelectorAll('.dashboard-section');
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');

            // Close mobile menu after selection
            sidebar.classList.remove('open');
        });
    });

    // Logout button
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        alert('Logged out successfully. Redirecting to login page...');
        // In a real app, redirect to login page
        // window.location.href = 'login.html';
    });

    // Remove wishlist items
    wishlistContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-wishlist')) {
            const itemId = e.target.dataset.id;
            removeFromWishlist(itemId);
        }
    });

    // Personal info form submission
    personalInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };

        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Show success message
        personalInfoMessage.className = 'message success';
        personalInfoMessage.textContent = 'Personal information updated successfully!';

        // Hide message after 3 seconds
        setTimeout(() => {
            personalInfoMessage.className = 'message';
        }, 3000);
    });

    // Password form submission
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (newPassword.length < 8) {
            passwordMessage.className = 'message error';
            passwordMessage.textContent = 'Password must be at least 8 characters long';
            return;
        }

        if (newPassword !== confirmPassword) {
            passwordMessage.className = 'message error';
            passwordMessage.textContent = 'New passwords do not match';
            return;
        }

        // Mock password check - in real app this would check against stored password
        if (currentPassword.length < 1) {
            passwordMessage.className = 'message error';
            passwordMessage.textContent = 'Current password is required';
            return;
        }

        // Show success and reset form
        passwordMessage.className = 'message success';
        passwordMessage.textContent = 'Password updated successfully!';
        passwordForm.reset();

        // Hide message after 3 seconds
        setTimeout(() => {
            passwordMessage.className = 'message';
        }, 3000);
    });
}

// Remove item from wishlist
function removeFromWishlist(itemId) {
    const currentWishlist = JSON.parse(localStorage.getItem('wishlist'));
    const updatedWishlist = currentWishlist.filter(item => item.id !== itemId);

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    // Remove from DOM
    const itemToRemove = document.querySelector(`.wishlist-item[data-id="${itemId}"]`);
    if (itemToRemove) {
        itemToRemove.remove();
    }
}

// Initialize the dashboard on page load
document.addEventListener('DOMContentLoaded', initDashboard);
