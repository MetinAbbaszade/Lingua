document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    
    const storedName = localStorage.getItem('contactName');
    const storedEmail = localStorage.getItem('contactEmail');
    
    if (storedName) fullNameInput.value = storedName;
    if (storedEmail) emailInput.value = storedEmail;
    
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        resetErrors();
        
        
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();
        
        
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
        
        
        if (isValid) {
            
            localStorage.setItem('contactName', fullName);
            localStorage.setItem('contactEmail', email);
            
            
            
            
            
            successMessage.classList.remove('hidden');
            
            
            contactForm.reset();
            
            
            fullNameInput.value = fullName;
            emailInput.value = email;
            
            
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    
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
