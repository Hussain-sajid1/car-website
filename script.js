// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(carType, carName, carImage, category) {
        const existingItem = this.items.find(item => item.carType === carType);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                carType,
                carName,
                carImage,
                category,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
            if (this.getTotalItems() > 0) {
                cartCount.classList.add('animate');
                setTimeout(() => cartCount.classList.remove('animate'), 600);
            }
        }
    }
}

// Initialize cart
const cart = new Cart();

// Mobile detection and performance optimizations
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Mobile performance optimizations
if (isMobile) {
    // Optimize touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Reduce motion for users who prefer it
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.style.setProperty('--transition-duration', '0.1s');
    }
}

// Simple website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Reduce loading time on mobile for better UX
        const loadingTime = isMobile ? 1000 : 2000;
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, loadingTime);
    }

    // Navigation toggle with improved mobile handling
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // Handle both mobile and desktop properly
        if (isMobile) {
            navToggle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking outside on mobile
            document.addEventListener('touchstart', (e) => {
                if (navMenu.classList.contains('active') && 
                    !navMenu.contains(e.target) && 
                    !navToggle.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        } else {
            // Desktop click handling
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    // Cart button functionality with mobile optimization
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        if (isMobile) {
            cartButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                window.location.href = 'cart.html';
            });
        } else {
            cartButton.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }
    }

    // Menu overlay functionality with mobile optimizations
    const menuButton = document.getElementById('menuButton');
    const menuOverlay = document.getElementById('menuOverlay');
    const backToHome = document.getElementById('backToHome');

    if (menuButton && menuOverlay) {
        if (isMobile) {
            menuButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                menuOverlay.style.display = 'flex';
                requestAnimationFrame(() => {
                    menuOverlay.style.opacity = '1';
                });
            });
        } else {
            menuButton.addEventListener('click', () => {
                menuOverlay.style.display = 'flex';
                setTimeout(() => {
                    menuOverlay.style.opacity = '1';
                }, 10);
            });
        }
    }

    if (backToHome && menuOverlay) {
        if (isMobile) {
            backToHome.addEventListener('touchstart', (e) => {
                e.preventDefault();
                menuOverlay.style.opacity = '0';
                setTimeout(() => {
                    menuOverlay.style.display = 'none';
                }, 300);
            });
        } else {
            backToHome.addEventListener('click', () => {
                menuOverlay.style.opacity = '0';
                setTimeout(() => {
                    menuOverlay.style.display = 'none';
                }, 300);
            });
        }
    }

    // Close menu overlay when clicking outside with mobile optimization
    if (menuOverlay) {
        if (isMobile) {
            menuOverlay.addEventListener('touchstart', (e) => {
                if (e.target === menuOverlay) {
                    menuOverlay.style.opacity = '0';
                    setTimeout(() => {
                        menuOverlay.style.display = 'none';
                    }, 300);
                }
            });
        } else {
            menuOverlay.addEventListener('click', (e) => {
                if (e.target === menuOverlay) {
                    menuOverlay.style.opacity = '0';
                    setTimeout(() => {
                        menuOverlay.style.display = 'none';
                    }, 300);
                }
            });
        }
    }

    // Spark effect for menu button (disabled on mobile for performance)
    const sparkContainer = document.getElementById('sparkContainer');
    if (menuButton && sparkContainer && !isMobile) {
        menuButton.addEventListener('mouseenter', createSparkEffect);
    }

    function createSparkEffect(event) {
        const button = event.currentTarget;
        const sparkContainer = button.querySelector('.spark-container');
        if (!sparkContainer) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        sparkContainer.innerHTML = '';
        
        const fragment = document.createDocumentFragment();
        
        // Reduce spark count on mobile for better performance
        const sparkCount = isMobile ? 15 : 25;
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            
            const angle = (Math.PI * 2 * i) / sparkCount;
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

    // Menu window spark animations with mobile optimization
    const menuWindows = document.querySelectorAll('.menu-window');
    
    menuWindows.forEach(window => {
        // Desktop hover effects (disabled on mobile)
        if (!isMobile) {
            window.addEventListener('mouseenter', function() {
                createSparks(this);
            });
        }
        
        // Mobile touch handling with performance optimizations
        if (isMobile) {
            let touchStartTime = 0;
            let isNavigating = false;
            let touchTimeout = null;
            
            // Use passive listeners for better performance
            window.addEventListener('touchstart', function(e) {
                if (isNavigating) return;
                
                touchStartTime = Date.now();
                e.preventDefault();
                e.stopPropagation();
                
                // Get the navigation link
                const parentLink = this.closest('a');
                if (!parentLink || !parentLink.href) return;
                
                const targetUrl = parentLink.href;
                
                // Show visual feedback immediately
                this.style.background = '#f9f7f3';
                this.style.boxShadow = '0 12px 40px rgba(166, 124, 82, 0.22)';
                this.style.transform = 'scale(1.08)';
                
                // Create minimal spark effects for mobile
                if (!isMobile) {
                    createSparks(this);
                }
                
                // Prevent multiple navigations
                isNavigating = true;
                
                // Clear any existing timeout
                if (touchTimeout) {
                    clearTimeout(touchTimeout);
                }
                
                // Navigate after shorter delay on mobile
                touchTimeout = setTimeout(() => {
                    try {
                        console.log('Navigating to:', targetUrl);
                        // Use location.assign for better performance
                        window.location.assign(targetUrl);
                    } catch (error) {
                        console.log('Navigation error:', error);
                        // Fallback navigation
                        try {
                            const link = document.createElement('a');
                            link.href = targetUrl;
                            link.click();
                        } catch (finalError) {
                            console.log('Final navigation fallback failed:', finalError);
                        }
                    }
                }, isMobile ? 800 : 1500);
            }, { passive: false });
            
            // Fallback click handler for mobile
            window.addEventListener('click', function(e) {
                if (isNavigating) return;
                
                e.preventDefault();
                e.stopPropagation();
                
                const parentLink = this.closest('a');
                if (!parentLink || !parentLink.href) return;
                
                const targetUrl = parentLink.href;
                
                // Show visual feedback
                this.style.background = '#f9f7f3';
                this.style.boxShadow = '0 12px 40px rgba(166, 124, 82, 0.22)';
                this.style.transform = 'scale(1.08)';
                
                // Prevent multiple navigations
                isNavigating = true;
                
                // Navigate after delay
                setTimeout(() => {
                    try {
                        window.location.assign(targetUrl);
                    } catch (error) {
                        console.log('Navigation error:', error);
                        try {
                            const link = document.createElement('a');
                            link.href = targetUrl;
                            link.click();
                        } catch (finalError) {
                            console.log('Final navigation fallback failed:', finalError);
                        }
                    }
                }, 800);
            });
        }
    });

    function createSparks(windowEl) {
        // Skip spark creation on mobile for better performance
        if (isMobile) return;
        
        const sparkContainer = windowEl.querySelector('.spark-container');
        if (!sparkContainer) return;

        const rect = windowEl.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        sparkContainer.innerHTML = '';
        
        const fragment = document.createDocumentFragment();
        
        // Reduce spark count for better performance
        const sparkCount = isMobile ? 12 : 15;
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            
            const angle = (Math.PI * 2 * i) / sparkCount;
            const baseDistance = 30 + Math.random() * 50;
            const sparkX = Math.cos(angle) * baseDistance;
            const sparkY = Math.sin(angle) * baseDistance;
            
            const randomOffsetX = (Math.random() - 0.5) * 15;
            const randomOffsetY = (Math.random() - 0.5) * 15;
            
            spark.style.left = centerX + 'px';
            spark.style.top = centerY + 'px';
            spark.style.setProperty('--spark-x', (sparkX + randomOffsetX) + 'px');
            spark.style.setProperty('--spark-y', (sparkY + randomOffsetY) + 'px');
            spark.style.animationDelay = Math.random() * 0.1 + 's';
            
            fragment.appendChild(spark);
        }
        
        sparkContainer.appendChild(fragment);
        
        setTimeout(() => {
            if (sparkContainer.parentNode) {
                sparkContainer.innerHTML = '';
            }
        }, 1000);
    }

    // Contact modal functionality with mobile optimizations
    const contactModals = document.querySelectorAll('.contact-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Handle contact modal close buttons with mobile optimization
    modalCloseButtons.forEach(button => {
        if (isMobile) {
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const modal = this.closest('.contact-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        } else {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const modal = this.closest('.contact-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        }
    });

    // Handle modal outside click with mobile optimization
    contactModals.forEach(modal => {
        if (isMobile) {
            modal.addEventListener('touchstart', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
        } else {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
        }
    });

    // Handle add to cart buttons with mobile optimization
    addToCartButtons.forEach(button => {
        if (isMobile) {
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const carType = this.getAttribute('data-car-type');
                const carName = this.getAttribute('data-car-name');
                const carImage = this.getAttribute('data-car-image');
                const category = this.getAttribute('data-category');
                
                if (carType && carName && carImage && category) {
                    cart.addItem(carType, carName, carImage, category);
                    
                    // Show feedback on mobile
                    this.style.background = '#4CAF50';
                    this.textContent = 'Added!';
                    setTimeout(() => {
                        this.style.background = '';
                        this.textContent = 'Add to Cart';
                    }, 1000);
                }
            });
        } else {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const carType = this.getAttribute('data-car-type');
                const carName = this.getAttribute('data-car-name');
                const carImage = this.getAttribute('data-car-image');
                const category = this.getAttribute('data-category');
                
                if (carType && carName && carImage && category) {
                    cart.addItem(carType, carName, carImage, category);
                }
            });
        }
    });

    // Optimize scroll performance on mobile
    if (isMobile) {
        let ticking = false;
        
        function updateScroll() {
            ticking = false;
            // Any scroll-based animations can go here
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Preload critical images for better mobile performance
    if (isMobile) {
        const criticalImages = [
            'images/classic.jpg',
            'images/antique.jpg',
            'images/rollsb.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}); 