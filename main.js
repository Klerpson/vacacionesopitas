// Selección de elementos DOM
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Control del menú móvil
function toggleMenu() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Control del header en scroll
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Lazy loading de imágenes
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar menú móvil si está abierto
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Galería de imágenes con lightbox
function initLightbox() {
    const galleryImages = document.querySelectorAll('.imagen-dispersa img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            lightbox.innerHTML = `
                <div class="lightbox__content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox__close">&times;</button>
                </div>
            `;
            
            lightbox.addEventListener('click', e => {
                if (e.target === lightbox || e.target.className === 'lightbox__close') {
                    lightbox.remove();
                }
            });
            
            document.body.appendChild(lightbox);
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initLazyLoading();
    initScrollAnimations();
    initSmoothScroll();
    initLightbox();
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    window.addEventListener('scroll', handleScroll);
});