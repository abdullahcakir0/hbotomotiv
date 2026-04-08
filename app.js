// ========== HB Otomotiv - App JS ==========
document.addEventListener('DOMContentLoaded', () => {

    // === SPA Navigation ===
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-section');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    function navigateTo(pageName) {
        pages.forEach(p => { p.classList.add('hidden'); p.classList.remove('active'); });
        const target = document.getElementById('page-' + pageName);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active');
            // Re-trigger fade animation
            target.style.animation = 'none';
            target.offsetHeight; // reflow
            target.style.animation = '';
        }
        // Update active nav
        document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });
        // Close mobile menu
        mobileMenu.classList.add('hidden');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Update title for SEO
        const titles = {
            home: 'HB Otomotiv | İstanbul Oto Lastik & 7/24 Yol Yardım Hizmeti',
            hizmetler: 'Hizmetlerimiz | HB Otomotiv - Lastik Değişimi, Yol Yardım, Mobil Servis',
            kurumsal: 'Kurumsal | HB Otomotiv - Hakkımızda, Deneyim ve Güvenilirlik',
            iletisim: 'İletişim | HB Otomotiv - 7/24 Bize Ulaşın: 0539 570 52 75'
        };
        document.title = titles[pageName] || titles.home;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page) navigateTo(page);
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // === Dark/Light Mode ===
    const darkToggle = document.getElementById('dark-toggle');
    const themeIcon = document.getElementById('theme-icon');
    let isDark = true; // Default dark

    darkToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.documentElement.classList.toggle('dark', isDark);
        themeIcon.textContent = isDark ? '🌙' : '☀️';
    });
    // Start in dark mode
    document.documentElement.classList.add('dark');

    // === Counter Animation ===
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const increment = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current.toLocaleString('tr-TR') + (target >= 1000 ? '+' : '');
                }, 25);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // === Scroll Progress Bar ===
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.width = '0%';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });

    // === Intersection Observer for fade-in elements ===
    const fadeEls = document.querySelectorAll('.service-card, article');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});
