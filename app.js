// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections for animation
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Active navigation link highlighting
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    threshold: 0.6,
    rootMargin: '-70px 0px -30% 0px'
});

// Observe sections for active navigation
sections.forEach(section => {
    navObserver.observe(section);
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! Thank you for reaching out.', 'success');
    contactForm.reset();
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); color: #4CAF50;'
            : 'background: rgba(255, 84, 89, 0.1); border: 1px solid rgba(255, 84, 89, 0.3); color: #FF5459;'
        }
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: inherit;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(38, 40, 40, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(38, 40, 40, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    
    setTimeout(() => {
        typeWriter(heroSubtitle, originalText, 80);
    }, 1000);
});

// Skill cards hover effect enhancement
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Add click handlers for project buttons with placeholder functionality
document.querySelectorAll('.project-buttons .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonText = button.textContent.trim();
        showNotification(`${buttonText} link will be available soon. This is a placeholder.`, 'info');
    });
});

// Add custom styles for info notification
function showInfoNotification(message) {
    showNotification(message, 'info');
}

// Enhanced notification system to handle info type
const originalShowNotification = showNotification;
showNotification = function(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles based on type
    let bgColor, borderColor, textColor;
    switch(type) {
        case 'success':
            bgColor = 'rgba(76, 175, 80, 0.1)';
            borderColor = 'rgba(76, 175, 80, 0.3)';
            textColor = '#4CAF50';
            break;
        case 'error':
            bgColor = 'rgba(255, 84, 89, 0.1)';
            borderColor = 'rgba(255, 84, 89, 0.3)';
            textColor = '#FF5459';
            break;
        case 'info':
            bgColor = 'rgba(98, 108, 113, 0.1)';
            borderColor = 'rgba(98, 108, 113, 0.3)';
            textColor = '#626C71';
            break;
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${bgColor};
        border: 1px solid ${borderColor};
        color: ${textColor};
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: inherit;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
};

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.hero-content');
    const speed = 0.5;
    
    if (parallaxElement && scrolled < window.innerHeight) {
        parallaxElement.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Set initial active nav link based on scroll position
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});