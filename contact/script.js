document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form fields
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Check if we have stored values in localStorage
    const storedName = localStorage.getItem('contactName');
    const storedEmail = localStorage.getItem('contactEmail');
    
    if (storedName) fullNameInput.value = storedName;
    if (storedEmail) emailInput.value = storedEmail;
    
    // Form submission handler
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error messages
        resetErrors();
        
        // Get form values
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validate form
        let isValid = true;
        
        if (!fullName) {
            showError(nameError, 'Please enter your full name');
            isValid = false;
        }
        
        if (!email) {
            showError(emailError, 'Please enter your email address');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!subject) {
            showError(subjectError, 'Please enter a subject');
            isValid = false;
        }
        
        if (!message) {
            showError(messageError, 'Please enter your message');
            isValid = false;
        }
        
        // If form is valid, process submission
        if (isValid) {
            // Save to localStorage for future use
            localStorage.setItem('contactName', fullName);
            localStorage.setItem('contactEmail', email);
            
            // Simulate form submission
            // In a real application, you would send data to a server here
            
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
            
            // Restore saved values 
            fullNameInput.value = fullName;
            emailInput.value = email;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(element, message) {
        element.textContent = message;
    }
    
    function resetErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        successMessage.classList.add('hidden');
    }
});
