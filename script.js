// Top-tier website functionality
class LuxuryCarWebsite {
    constructor() {
        this.initializeComponents();
        this.bindEvents();
    }

    initializeComponents() {
        // Initialize loading screen
        this.initializeLoadingScreen();
        
        // Initialize navigation
        this.initializeNavigation();
        
        // Initialize smooth scrolling
        this.initializeSmoothScrolling();
        
        // Initialize newsletter functionality
        this.initializeNewsletter();
        
        // Initialize intersection observer for animations
        this.initializeIntersectionObserver();
        
        // Initialize performance monitoring
        this.initializePerformanceMonitoring();
    }

    initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            // Simulate loading time for better UX
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 2000);
        }
    }

    initializeNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.smoothScrollTo(target);
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Update active nav link on scroll
        this.updateActiveNavLink();
    }

    initializeSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        this.smoothScrollTo = (target) => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80; // Account for fixed nav
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                requestAnimationFrame(animation);
            }
        };

        // Easing function for smooth animations
        this.easeInOutCubic = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        };
    }

    initializeNewsletter() {
        const newsletterBtn = document.querySelector('.newsletter-btn');
        const newsletterInput = document.querySelector('.newsletter-input');

        if (newsletterBtn && newsletterInput) {
            newsletterBtn.addEventListener('click', () => {
                const email = newsletterInput.value.trim();
                if (this.validateEmail(email)) {
                    this.showNotification('Thank you for subscribing!', 'success');
                    newsletterInput.value = '';
                } else {
                    this.showNotification('Please enter a valid email address.', 'error');
                }
            });
        }
    }

    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.about-section, .contact-info, .footer-section');
        animatedElements.forEach(el => observer.observe(el));
    }

    initializePerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`${entry.name}: ${entry.value}`);
                }
            });
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section, [id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    bindEvents() {
        // Menu overlay functionality
        const menuButton = document.getElementById('menuButton');
        const menuOverlay = document.getElementById('menuOverlay');
        const backToHome = document.getElementById('backToHome');
        const sparkContainer = document.getElementById('sparkContainer');

        if (menuButton && menuOverlay) {
            menuButton.addEventListener('click', () => {
                menuOverlay.style.display = 'flex';
                setTimeout(() => {
                    menuOverlay.style.opacity = '1';
                }, 10);
            });
        }

        if (backToHome && menuOverlay) {
            backToHome.addEventListener('click', () => {
                menuOverlay.style.opacity = '0';
                setTimeout(() => {
                    menuOverlay.style.display = 'none';
                }, 300);
            });
        }

        // Close menu overlay when clicking outside
        if (menuOverlay) {
            menuOverlay.addEventListener('click', (e) => {
                if (e.target === menuOverlay) {
                    menuOverlay.style.opacity = '0';
                    setTimeout(() => {
                        menuOverlay.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Spark effect for menu button
        if (menuButton && sparkContainer) {
            menuButton.addEventListener('mouseenter', this.createSparkEffect.bind(this));
        }
    }

    createSparkEffect(event) {
        const button = event.currentTarget;
        const sparkContainer = button.querySelector('.spark-container');
        if (!sparkContainer) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        sparkContainer.innerHTML = '';
        
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < 25; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            
            const angle = (Math.PI * 2 * i) / 25;
            const baseDistance = 50 + Math.random() * 80;
            const sparkX = Math.cos(angle) * baseDistance;
            const sparkY = Math.sin(angle) * baseDistance;
            
            const randomOffsetX = (Math.random() - 0.5) * 25;
            const randomOffsetY = (Math.random() - 0.5) * 25;
            
            spark.style.left = centerX + 'px';
            spark.style.top = centerY + 'px';
            spark.style.setProperty('--spark-x', (sparkX + randomOffsetX) + 'px');
            spark.style.setProperty('--spark-y', (sparkY + randomOffsetY) + 'px');
            spark.style.animationDelay = Math.random() * 0.15 + 's';
            
            fragment.appendChild(spark);
        }
        
        sparkContainer.appendChild(fragment);
        
        setTimeout(() => {
            if (sparkContainer.parentNode) {
                sparkContainer.innerHTML = '';
            }
        }, 1300);
    }
}

// Initialize the website
const website = new LuxuryCarWebsite();

// Enhanced scrollbar functionality
const scrollbar = document.querySelector('.scrollbar');

function updateScrollbar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
    
    if (scrollbar) {
        scrollbar.style.setProperty('--scroll-percent', scrollPercent + '%');
        const thumbHeight = Math.max(20, scrollPercent * 0.8);
        scrollbar.style.setProperty('--thumb-height', thumbHeight + '%');
    }
}

// Add scroll event listener
window.addEventListener('scroll', updateScrollbar);

// Enhanced scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const targetScroll = Math.min(window.innerHeight, document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    });
}

// Enhanced keyboard navigation
let keyScrollTicking = false;
function handleKeyScroll(direction) {
    if (!keyScrollTicking) {
        const scrollAmount = direction * window.innerHeight;
        const targetScroll = Math.max(0, Math.min(
            window.pageYOffset + scrollAmount,
            document.documentElement.scrollHeight - window.innerHeight
        ));
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
        
        keyScrollTicking = true;
        setTimeout(() => { keyScrollTicking = false; }, 500);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        handleKeyScroll(1);
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        handleKeyScroll(-1);
    }
});

// Enhanced touch support
let touchStartY = 0;
let touchEndY = 0;
let touchScrollTicking = false;

document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    if (!touchScrollTicking) {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            const direction = diff > 0 ? 1 : -1;
            const scrollAmount = direction * window.innerHeight;
            const targetScroll = Math.max(0, Math.min(
                window.pageYOffset + scrollAmount,
                document.documentElement.scrollHeight - window.innerHeight
            ));
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
            
            touchScrollTicking = true;
            setTimeout(() => { touchScrollTicking = false; }, 500);
        }
    }
}

// Enhanced parallax effect
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.intro-page');
    if (parallax) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Service Worker for offline functionality (if supported)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Menu overlay spark animations
document.addEventListener('DOMContentLoaded', function() {
    const menuWindows = document.querySelectorAll('.menu-window');

    // Spark animation on hover for menu windows
    menuWindows.forEach(window => {
        window.addEventListener('mouseenter', function(e) {
            createSparks(window);
        });
    });

    function createSparks(windowEl) {
        const sparkContainer = windowEl.querySelector('.spark-container');
        if (!sparkContainer) return;
        
        sparkContainer.innerHTML = '';
        const rect = windowEl.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < 35; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            
            const border = Math.floor(Math.random() * 4);
            let startX, startY, dirX, dirY;
            
            if (border === 0) {
                startX = Math.random() * width;
                startY = 0;
                dirX = 0;
                dirY = -1;
            } else if (border === 1) {
                startX = width;
                startY = Math.random() * height;
                dirX = 1;
                dirY = 0;
            } else if (border === 2) {
                startX = Math.random() * width;
                startY = height;
                dirX = 0;
                dirY = 1;
            } else {
                startX = 0;
                startY = Math.random() * height;
                dirX = -1;
                dirY = 0;
            }
            
            const baseSpread = 35 + Math.random() * 45;
            const randomOffset = (Math.random() - 0.5) * 25;
            const endX = startX + dirX * baseSpread + randomOffset;
            const endY = startY + dirY * baseSpread + randomOffset;
            
            spark.style.left = startX + 'px';
            spark.style.top = startY + 'px';
            
            const duration = 1400 + Math.random() * 300;
            const delay = Math.random() * 0.12;
            const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            spark.animate([
                { 
                    transform: `translate(0, 0) scale(0.8)`, 
                    opacity: 0 
                },
                { 
                    transform: `translate(0, 0) scale(1)`, 
                    opacity: 0.9 
                },
                { 
                    transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.6)`, 
                    opacity: 0 
                }
            ], {
                duration: duration,
                easing: easing,
                fill: 'forwards',
                delay: delay * 1000
            });
            
            fragment.appendChild(spark);
        }
        
        sparkContainer.appendChild(fragment);
        
        setTimeout(() => {
            if (sparkContainer.parentNode) {
                sparkContainer.innerHTML = '';
            }
        }, 1700);
    }
}); 