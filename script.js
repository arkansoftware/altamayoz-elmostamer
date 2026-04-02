/* =================================================
   ALTAMAYOZ ELMOSTAMER - MAIN JAVASCRIPT
   ================================================= */

'use strict';

/* ========== Language System ========== */
const TRANSLATIONS = {
    ar: {
        // Navigation
        'nav-home':     'الرئيسية',
        'nav-about':    'من نحن',
        'nav-services': 'خدماتنا',
        'nav-products': 'منتجاتنا',
        'nav-branches': 'فروعنا',
        'nav-contact':  'تواصل معنا',

        // Hero
        'hero-badge':   '🇱🇾 طبرق • درنة • ليبيا',
        'hero-cta-1':   'استكشف منتجاتنا',
        'hero-cta-2':   'تواصل معنا',
        'stat-1':       'منتج متوفر',
        'stat-2':       'فرع في ليبيا',
        'stat-3':       'قطع أصلية',

        // Form
        'form-name':    'الاسم الكامل',
        'form-phone':   'رقم الهاتف',
        'form-email':   'البريد الإلكتروني',
        'form-msg':     'رسالتك',
        'form-send':    'إرسال الرسالة',

        // Contact form success
        'form-success': '✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
        'form-error':   '❌ حدث خطأ. يرجى المحاولة مجدداً.'
    },
    en: {
        // Navigation
        'nav-home':     'Home',
        'nav-about':    'About',
        'nav-services': 'Services',
        'nav-products': 'Products',
        'nav-branches': 'Branches',
        'nav-contact':  'Contact',

        // Hero
        'hero-badge':   '🇱🇾 Tobruk • Derna • Libya',
        'hero-cta-1':   'Explore Products',
        'hero-cta-2':   'Contact Us',
        'stat-1':       'Products Available',
        'stat-2':       'Branches in Libya',
        'stat-3':       'Genuine Parts',

        // Form
        'form-name':    'Full Name',
        'form-phone':   'Phone Number',
        'form-email':   'Email Address',
        'form-msg':     'Your Message',
        'form-send':    'Send Message',

        // Contact form success
        'form-success': '✅ Message sent successfully! We\'ll get back to you soon.',
        'form-error':   '❌ An error occurred. Please try again.'
    }
};

let currentLang = 'ar';

function setLanguage(lang) {
    currentLang = lang;
    const body = document.body;

    if (lang === 'en') {
        body.classList.add('lang-en');
        body.classList.remove('lang-ar');
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
        document.title = 'Altamayoz Elmostamer | Mobile Phones & Spare Parts';
    } else {
        body.classList.remove('lang-en');
        body.classList.add('lang-ar');
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
        document.title = 'شركة التميز المستمر | استيراد الهواتف وقطع الغيار';
    }

    // Update all elements with data-ar / data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update form placeholders (labels are updated above)
    updateFormLabels(lang);

    // Save preference
    localStorage.setItem('altamayoz-lang', lang);

    // Re-apply nav active link
    highlightActiveNav();
}

function updateFormLabels(lang) {
    const t = TRANSLATIONS[lang];
    const nameLabel = document.querySelector('label[for="name"]');
    const phoneLabel = document.querySelector('label[for="phone"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const msgLabel   = document.querySelector('label[for="message"]');
    const sendBtn    = document.querySelector('#contact-form .btn .btn-text');

    if (nameLabel)  nameLabel.textContent = t['form-name'];
    if (phoneLabel) phoneLabel.textContent = t['form-phone'];
    if (emailLabel) emailLabel.textContent = t['form-email'];
    if (msgLabel)   msgLabel.textContent   = t['form-msg'];
}

/* ========== Toggle Language Button ========== */
document.getElementById('lang-toggle').addEventListener('click', () => {
    setLanguage(currentLang === 'ar' ? 'en' : 'ar');
});

/* ========== Header Scroll Effect ========== */
const header = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll to top button
    const scrollBtn = document.getElementById('scroll-top');
    if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }

    // Highlight active nav item
    highlightActiveNav();
}

window.addEventListener('scroll', handleScroll, { passive: true });

/* ========== Active Nav Highlighting ========== */
const sections = ['home', 'about', 'services', 'products', 'branches', 'contact'];

function highlightActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(id => {
        const section = document.getElementById(id);
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (!section || !link) return;

        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

/* ========== Mobile Menu ========== */
const menuToggle = document.getElementById('menu-toggle');
const navMenu    = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ========== Scroll To Top Button ========== */
document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========== Reveal on Scroll (Intersection Observer) ========== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

/* ========== Contact Form ========== */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const t = TRANSLATIONS[currentLang];

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Simulate sending
    btn.disabled = true;
    btn.innerHTML = `<span>${currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}</span>`;

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;

        // Show feedback
        showNotification(t['form-success'], 'success');
        contactForm.reset();
    }, 1500);
});

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = `notification notif-${type}`;
    notif.textContent = message;

    Object.assign(notif.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: '#fff',
        padding: '16px 28px',
        borderRadius: '50px',
        fontWeight: '700',
        fontSize: '0.92rem',
        zIndex: '9999',
        boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
        transition: 'all 0.4s ease',
        opacity: '0',
        fontFamily: 'inherit',
        maxWidth: '90vw',
        textAlign: 'center'
    });

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = '1';
        notif.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => notif.remove(), 400);
    }, 4000);
}

/* ========== Smooth Section Hover (Service Cards) ========== */
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
});

/* ========== Counter Animation ========== */
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);  // easeOutCubic
        const value = Math.floor(eased * target);
        el.textContent = (suffix === '+' ? '+' : '') + value + (suffix !== '+' ? suffix : '');
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = (suffix === '+' ? '+' : '') + target + (suffix !== '+' ? suffix : '');
    }
    requestAnimationFrame(update);
}

// Observe hero stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-num');
            nums.forEach(num => {
                const text = num.textContent;
                if (text.includes('+')) {
                    const val = parseInt(text.replace('+', ''));
                    animateCounter(num, val, '+');
                } else if (text.includes('%')) {
                    const val = parseInt(text.replace('%', ''));
                    animateCounter(num, val, '%');
                } else {
                    animateCounter(num, parseInt(text));
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ========== Initialize ========== */
function init() {
    // Load saved language
    const savedLang = localStorage.getItem('altamayoz-lang') || 'ar';
    setLanguage(savedLang);

    // Run scroll handler once on load
    handleScroll();

    // Make hero content visible immediately
    document.querySelectorAll('.hero .reveal').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
    });
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
