// Simple website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 2000);
    }

    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Menu overlay functionality
    const menuButton = document.getElementById('menuButton');
    const menuOverlay = document.getElementById('menuOverlay');
    const backToHome = document.getElementById('backToHome');

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
    const sparkContainer = document.getElementById('sparkContainer');
    if (menuButton && sparkContainer) {
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

    // Menu window spark animations
    const menuWindows = document.querySelectorAll('.menu-window');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    menuWindows.forEach(window => {
        // Desktop hover effects
        if (!isMobile) {
            window.addEventListener('mouseenter', function() {
                createSparks(this);
            });
        }
        
        // Mobile touch handling
        if (isMobile) {
            let touchStartTime = 0;
            let isNavigating = false;
            
            window.addEventListener('touchstart', function(e) {
                if (isNavigating) return;
                
                touchStartTime = Date.now();
                e.preventDefault();
                e.stopPropagation();
                
                // Get the navigation link
                const parentLink = this.closest('a');
                if (!parentLink || !parentLink.href) return;
                
                const targetUrl = parentLink.href;
                
                // Show visual feedback
                this.style.background = '#f9f7f3';
                this.style.boxShadow = '0 12px 40px rgba(166, 124, 82, 0.22)';
                this.style.transform = 'scale(1.08)';
                
                // Create spark effects
                createSparks(this);
                
                // Prevent multiple navigations
                isNavigating = true;
                
                // Navigate after spark animation completes
                setTimeout(() => {
                    try {
                        console.log('Navigating to:', targetUrl);
                        // First try: window.location.href
                        if (window && window.location) {
                            window.location.href = targetUrl;
                        }
                        // Second try: window.location.assign
                        else if (window && window.location && window.location.assign) {
                            window.location.assign(targetUrl);
                        }
                        // Final fallback: Create and click a link
                        else {
                            const link = document.createElement('a');
                            link.href = targetUrl;
                            link.click();
                        }
                    } catch (error) {
                        console.log('Navigation error:', error);
                        // Final fallback - direct link click
                        try {
                            const link = document.createElement('a');
                            link.href = targetUrl;
                            link.click();
                        } catch (finalError) {
                            console.log('Final navigation fallback failed:', finalError);
                        }
                    }
                }, 1500);
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
                
                // Create spark effects
                createSparks(this);
                
                // Prevent multiple navigations
                isNavigating = true;
                
                // Navigate after spark animation completes
                setTimeout(() => {
                    try {
                        console.log('Navigating to:', targetUrl);
                        // First try: window.location.href
                        if (window && window.location) {
                            window.location.href = targetUrl;
                        }
                        // Second try: window.location.assign
                        else if (window && window.location && window.location.assign) {
                            window.location.assign(targetUrl);
                        }
                        // Final fallback: Create and click a link
                        else {
                            const link = document.createElement('a');
                            link.href = targetUrl;
                            link.click();
                        }
                    } catch (error) {
                        console.log('Navigation error:', error);
                        // Final fallback - direct link click
                        try {
                            const link = document.createElement('a');
                            link.href = targetUrl;
                            link.click();
                        } catch (finalError) {
                            console.log('Final navigation fallback failed:', finalError);
                        }
                    }
                }, 1500);
            });
        }
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