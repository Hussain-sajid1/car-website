// DOM elements
const menuButton = document.getElementById('menuButton');
const sparkContainer = document.getElementById('sparkContainer');
const scrollbar = document.querySelector('.scrollbar');

// Spark effect configuration
const SPARK_COUNT = 50;
const SPARK_COLOR = '#d2b48c'; // Tan color

// Create spark effect on button hover
function createSparkEffect(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Clear existing sparks
    sparkContainer.innerHTML = '';
    
    // Use a document fragment for better performance
    const fragment = document.createDocumentFragment();
    const removalTimeouts = [];
    for (let i = 0; i < SPARK_COUNT; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        const angle = (Math.PI * 2 * i) / SPARK_COUNT;
        const distance = 60 + Math.random() * 120;
        const sparkX = Math.cos(angle) * distance;
        const sparkY = Math.sin(angle) * distance;
        const randomOffsetX = (Math.random() - 0.5) * 40;
        const randomOffsetY = (Math.random() - 0.5) * 40;
        spark.style.left = centerX + 'px';
        spark.style.top = centerY + 'px';
        spark.style.setProperty('--spark-x', (sparkX + randomOffsetX) + 'px');
        spark.style.setProperty('--spark-y', (sparkY + randomOffsetY) + 'px');
        spark.style.animationDelay = Math.random() * 0.2 + 's';
        fragment.appendChild(spark);
        // Use requestAnimationFrame for removal
        removalTimeouts.push(setTimeout(() => {
            requestAnimationFrame(() => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            });
        }, 1200));
    }
    sparkContainer.appendChild(fragment);
}

// Add hover event listeners
menuButton.addEventListener('mouseenter', createSparkEffect);

// Custom scrollbar functionality
function updateScrollbar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
    
    // Update scrollbar thumb height
    const scrollbarThumb = scrollbar.querySelector('::before');
    if (scrollbar) {
        scrollbar.style.setProperty('--scroll-percent', scrollPercent + '%');
        // Update the actual height of the scrollbar thumb
        const thumbHeight = Math.max(20, scrollPercent * 0.8);
        scrollbar.style.setProperty('--thumb-height', thumbHeight + '%');
    }
}

// Smooth scroll functionality
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll event listener
window.addEventListener('scroll', updateScrollbar);

// Add click event to scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        // Scroll to next section or bottom of page
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - scroll down
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        } else {
            // Swipe down - scroll up
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
        }
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.intro-page');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add menu button click functionality
menuButton.addEventListener('click', () => {
    // Add click animation
    menuButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        menuButton.style.transform = '';
    }, 150);
    
    // Here you can add navigation to menu page or open menu modal
    console.log('Menu button clicked - Navigate to menu page');
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.store-title, .about-section, .menu-button-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});

// Add window resize handler
window.addEventListener('resize', () => {
    // Recalculate spark positions if needed
    if (menuButton.matches(':hover')) {
        // Recreate spark effect on resize
        const event = { currentTarget: menuButton };
        createSparkEffect(event);
    }
});

// Initialize scrollbar on page load
document.addEventListener('DOMContentLoaded', updateScrollbar); 