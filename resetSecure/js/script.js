document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navList.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation for request page
    const requestForm = document.getElementById('supportRequestForm');
    
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('fullName');
            const nameError = document.getElementById('nameError');
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Please enter your full name';
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate address
            const addressInput = document.getElementById('address');
            const addressError = document.getElementById('addressError');
            if (!addressInput.value.trim()) {
                addressError.textContent = 'Please enter your address';
                addressError.style.display = 'block';
                isValid = false;
            } else {
                addressError.style.display = 'none';
            }
            
            // Validate phone
            const phoneInput = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            const phoneRegex = /^[\d\s\-().+]+$/;
            if (!phoneInput.value.trim()) {
                phoneError.textContent = 'Please enter your phone number';
                phoneError.style.display = 'block';
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value)) {
                phoneError.textContent = 'Please enter a valid phone number';
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneError.style.display = 'none';
            }
            
            // Validate problem description
            const problemInput = document.getElementById('problem');
            const problemError = document.getElementById('problemError');
            if (!problemInput.value.trim()) {
                problemError.textContent = 'Please describe your problem';
                problemError.style.display = 'block';
                isValid = false;
            } else {
                problemError.style.display = 'none';
            }
            
            if (isValid) {
                // Show success message (in a real app, you would submit to server here)
                requestForm.style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
            }
        });
    }

    // Form validation for contact page
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('contactName');
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('error');
            } else {
                nameInput.classList.remove('error');
            }
            
            // Validate email
            const emailInput = document.getElementById('contactEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
            }
            
            // Validate message
            const messageInput = document.getElementById('contactMessage');
            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.classList.add('error');
            } else {
                messageInput.classList.remove('error');
            }
            
            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // Scroll animations using IntersectionObserver
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-animate]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            elements.forEach(element => {
                observer.observe(element);
                
                // Apply delay if specified
                const delay = element.getAttribute('data-delay');
                if (delay) {
                    element.style.transitionDelay = `${delay}s`;
                }
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            elements.forEach(element => {
                element.classList.add('animated');
            });
        }
    };
    
    animateOnScroll();
});