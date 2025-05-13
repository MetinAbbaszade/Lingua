document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificationClose = document.getElementById('notification-close');
    const passwordToggles = document.querySelectorAll('.toggle-password');

    // Tab switching functionality
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        clearErrors();
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        clearErrors();
    });

    // Toggle password visibility
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Close notification
    notificationClose.addEventListener('click', () => {
        notification.classList.remove('show');
    });

    // Form validation and submission
    loginButton.addEventListener('click', handleLogin);
    signupButton.addEventListener('click', handleSignup);

    // Login validation and processing
    function handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        clearErrors();
        let isValid = true;

        // Validate email
        if (!email) {
            showError('login-email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('login-email-error', 'Please enter a valid email');
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError('login-password-error', 'Password is required');
            isValid = false;
        }

        if (isValid) {
            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Set login status
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));

                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    // Redirect to dashboard (you'd replace this with an actual page)
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                showNotification('Invalid email or password', 'error');
            }
        }
    }

    // Signup validation and processing
    function handleSignup() {
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        clearErrors();
        let isValid = true;

        // Validate name
        if (!name) {
            showError('signup-name-error', 'Name is required');
            isValid = false;
        }

        // Validate email
        if (!email) {
            showError('signup-email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('signup-email-error', 'Please enter a valid email');
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError('signup-password-error', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('signup-password-error', 'Password must be at least 6 characters');
            isValid = false;
        }

        // Validate password confirmation
        if (!confirmPassword) {
            showError('signup-confirm-password-error', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('signup-confirm-password-error', 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                showNotification('Email already in use. Please log in instead.', 'error');
                return;
            }

            // Add new user
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Auto-login the user
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            showNotification('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                // Redirect to dashboard (you'd replace this with an actual page)
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    }

    // Helper functions
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    function showNotification(message, type) {
        notificationMessage.textContent = message;
        notification.className = 'notification';
        notification.classList.add(type);
        notification.classList.add('show');

        // Auto-hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Check if user is already logged in
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            // Redirect to dashboard (you'd replace this with an actual page)
            window.location.href = 'dashboard.html';
        }
    }

    // Run initial check
    checkLoginStatus();
});
