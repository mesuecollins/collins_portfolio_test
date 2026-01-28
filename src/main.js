import './style.css'

// Theme Switcher Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}
// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('nav-active');
    });
});

// Smooth Scroll for Anchor Links (polishing standard behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Account for fixed navbar height
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Navbar Scroll Effect (Glassmorphism intensity)
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(30, 41, 59, 0.7)'; // Default glass
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .hero-content').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// 3D Tilt Effect for Cards
document.querySelectorAll('.glass').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalContent = btn.innerHTML;

        // Loading state
        btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled = true;

        // Send email via EmailJS
        // Service ID: contact_service, Template ID: contact_form
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(() => {
                // Success state
                btn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
                btn.style.background = 'var(--color-secondary)';
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, (error) => {
                // Error state
                console.error('FAILED...', error);
                btn.innerHTML = '<span>Failed to Send</span> <i class="fa-solid fa-triangle-exclamation"></i>';
                btn.style.background = '#ef4444'; // Red color

                alert('Failed to send message. Please try again later or contact me directly via email.');

                // Reset button
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            });
    });
}
