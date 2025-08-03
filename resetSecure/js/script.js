document.addEventListener('DOMContentLoaded', function() {
    // Hero video functionality
    const heroVideo = document.querySelector('.hero-video-background video');
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Hero video loaded successfully');
        });
        
        heroVideo.addEventListener('error', function() {
            console.log('Hero video failed to load, using fallback');
            const videoContainer = document.querySelector('.hero-video-background');
            if (videoContainer) {
                videoContainer.style.display = 'none';
            }
        });
    }
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (testimonials.length > 0) {
        let currentIndex = 0;
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        function updateTestimonial() {
            testimonials.forEach((testimonial, index) => {
                testimonial.classList.toggle('active', index === currentIndex);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToTestimonial(index) {
            currentIndex = index;
            updateTestimonial();
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial();
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
        
        // Auto-rotate testimonials
        let testimonialInterval = setInterval(nextTestimonial, 5000);
        
        // Pause on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }
    }
    
    // Form suggestions
    const issueInput = document.getElementById('issue');
    const suggestionsContainer = document.getElementById('suggestions');
    
    if (issueInput && suggestionsContainer) {
        const commonIssues = [
            "Forgot password",
            "Computer running slow",
            "Can't connect to WiFi",
            "Pop-up messages won't go away",
            "Email not working",
            "Phone won't charge",
            "Tablet screen frozen",
            "Received suspicious call/email",
            "Need help installing software",
            "Printer not working"
        ];
        
        issueInput.addEventListener('focus', showSuggestions);
        issueInput.addEventListener('input', showSuggestions);
        
        function showSuggestions() {
            const inputValue = issueInput.value.toLowerCase();
            
            if (!inputValue) {
                suggestionsContainer.innerHTML = '';
                return;
            }
            
            const filteredIssues = commonIssues.filter(issue => 
                issue.toLowerCase().includes(inputValue)
            );
            
            suggestionsContainer.innerHTML = '';
            
            filteredIssues.forEach(issue => {
                const suggestion = document.createElement('div');
                suggestion.classList.add('suggestion');
                suggestion.textContent = issue;
                suggestion.addEventListener('click', () => {
                    issueInput.value = issue;
                    suggestionsContainer.innerHTML = '';
                });
                suggestionsContainer.appendChild(suggestion);
            });
        }
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e63946';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                alert('Thank you for your submission! We will contact you shortly.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }
});