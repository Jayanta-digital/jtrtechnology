// ============================================
// PRAGYA VALLEY ACADEMY - MAIN JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all components
    initMobileMenu();
    initStickyNavbar();
    initSmoothScroll();
    initCounters();
    initAOS();
    initSwiperSliders();
    initFormValidation();
    initScrollToTop();
    initLazyLoading();
    initTooltips();
    initBackToTop();
    
    // Load config if available
    if (typeof loadConfig === 'function') {
        loadConfig();
    }
});

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = document.querySelector('.mobile-toggle i');
            if (icon) {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            const icon = document.querySelector('.mobile-toggle i');
            if (icon) {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        }
    });
}

// ============================================
// STICKY NAVBAR
// ============================================
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// AOS (Animate on Scroll)
// ============================================
function initAOS() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.aos;
                const delay = element.dataset.aosDelay || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                    element.style.animation = `${animation} 0.6s ease forwards`;
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

// ============================================
// SWIPER SLIDERS
// ============================================
function initSwiperSliders() {
    if (typeof Swiper === 'undefined') return;
    
    // Arts Slider
    if (document.querySelector('.arts-swiper')) {
        new Swiper('.arts-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Science Slider
    if (document.querySelector('.science-swiper')) {
        new Swiper('.science-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Commerce Slider
    if (document.querySelector('.commerce-swiper')) {
        new Swiper('.commerce-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Testimonial Slider
    if (document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show success message
                showNotification('Form submitted successfully! We will contact you soon.', 'success');
                this.reset();
                
                // Optional: Send form data via AJAX
                // submitFormViaAjax(this);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    removeError(field);
    
    // Check if empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        }
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    field.parentNode.appendChild(errorDiv);
}

function removeError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add CSS for back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 180px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 99;
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--secondary);
        transform: translateY(-3px);
        box-shadow: var(--shadow-xl);
    }
    
    .error {
        border-color: var(--danger) !important;
    }
    
    .error-message {
        color: var(--danger);
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-xl);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 9999;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: var(--accent);
        color: white;
    }
    
    .notification-info {
        background: var(--info);
        color: white;
    }
    
    .notification-warning {
        background: var(--warning);
        color: white;
    }
    
    .notification-error {
        background: var(--danger);
        color: white;
    }
    
    .aos-animate {
        opacity: 1 !important;
        transform: none !important;
    }
    
    [data-aos] {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;

document.head.appendChild(style);

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// TOOLTIPS
// ============================================
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.dataset.tooltip;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
}

// Add tooltip styles
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    .tooltip {
        position: fixed;
        background: var(--primary-dark);
        color: white;
        padding: 8px 16px;
        border-radius: 40px;
        font-size: 14px;
        z-index: 9999;
        pointer-events: none;
        animation: fadeIn 0.3s ease;
        box-shadow: var(--shadow-md);
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px 5px 0;
        border-style: solid;
        border-color: var(--primary-dark) transparent transparent;
    }
`;

document.head.appendChild(tooltipStyle);

// ============================================
// STREAM TABS (for achievement sliders)
// ============================================
function initStreamTabs() {
    const tabs = document.querySelectorAll('.stream-tab');
    const sliders = document.querySelectorAll('.achievement-slider');
    
    if (!tabs.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all sliders
            sliders.forEach(slider => slider.classList.remove('active'));
            
            // Show selected slider
            const stream = tab.dataset.stream;
            const activeSlider = document.getElementById(`${stream}-slider`);
            if (activeSlider) {
                activeSlider.classList.add('active');
            }
        });
    });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                window.location.href = `https://www.google.com/search?q=site:pragyavalley.edu.in+${encodeURIComponent(query)}`;
            }
        }
    });
}

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================
// Call all initialization functions
setTimeout(() => {
    initStreamTabs();
    initSearch();
    initBackToTop();
}, 100);

// ============================================
// SERVICE WORKER (for PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registered');
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

// ============================================
// ERROR HANDLING
// ============================================
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, 'at', url, 'line', lineNo);
    return false;
};

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================
window.showNotification = showNotification;
window.validateForm = validateForm;