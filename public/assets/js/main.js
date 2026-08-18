// App State
const state = {
    heroSlides: [],
    products: [],
    services: [],
    reviews: [],
    businessInfo: {},
    currentSlide: 0,
    autoSlideInterval: null
};

// Data Management Functions
async function loadDataFromFile(filename) {
    try {
        const response = await fetch(`data/${filename}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

// DOM Elements
const elements = {
    heroSlider: document.getElementById('heroSlider'),
    galleryCarousel: document.getElementById('galleryCarousel'),
    reviewsGrid: document.getElementById('reviewsGrid'),
    servicesGrid: document.getElementById('servicesGrid'),
    bestsellersGrid: document.getElementById('bestsellersGrid'),
    contactInfo: document.getElementById('contactInfo'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    navMenu: document.getElementById('navMenu'),
    reviewForm: document.getElementById('reviewForm'),
    consultationForm: document.getElementById('consultationForm'),
    shopName: document.getElementById('shopName'),
    logo: document.getElementById('logo'),
    address: document.getElementById('address'),
    phone: document.getElementById('phone'),
    whatsapp: document.getElementById('whatsapp'),
    email: document.getElementById('email')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    try {
        // Show loading state
        showLoading();
        
        // Fetch all content from CMS
        await fetchAllContent();
        
        // Render content
        renderHeroSlider();
        renderGallery();
        renderReviews();
        renderServices();
        renderBestsellers();
        renderBusinessInfo();
        
        // Initialize interactions
        initializeMobileMenu();
        initializeHeroSlider();
        initializeForms();
        
        // Hide loading state
        hideLoading();
        
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to load content. Please refresh the page.');
    }
}

// Content Fetching Functions
async function fetchAllContent() {
    // Load data from JSON files
    state.heroSlides = await loadDataFromFile('hero-slides.json') || [];
    state.products = await loadDataFromFile('products.json') || [];
    state.services = await loadDataFromFile('services.json') || [];
    state.reviews = await loadDataFromFile('reviews.json') || [];
    state.businessInfo = await loadDataFromFile('business-info.json') || {};
}

// Render Functions
function renderHeroSlider() {
    if (!elements.heroSlider || state.heroSlides.length === 0) return;
    
    const activeSlides = state.heroSlides.filter(slide => slide.active).sort((a, b) => a.order - b.order);
    
    elements.heroSlider.innerHTML = activeSlides.map((slide, index) => `
        <div class="hero-slide ${index === 0 ? 'active' : ''}" data-slide="${index}" style="background-image: url('${slide.image}')">
            <div class="hero-content">
                <h2 class="hero-title">${slide.title}</h2>
                ${slide.description ? `<p class="hero-description">${slide.description}</p>` : ''}
                <div class="hero-buttons">
                    <a href="#products" class="btn btn-primary">View Products</a>
                    <a href="#contact" class="btn btn-secondary">Contact Us</a>
                </div>
            </div>
        </div>
    `).join('') + `
        <button class="hero-arrow prev" onclick="prevSlide()">❮</button>
        <button class="hero-arrow next" onclick="nextSlide()">❯</button>
        <div class="hero-nav">
            ${activeSlides.map((_, index) => `
                <div class="hero-nav-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>
            `).join('')}
        </div>
    `;
}

function renderGallery() {
    if (!elements.galleryCarousel || state.products.length === 0) return;
    
    elements.galleryCarousel.innerHTML = state.products.map(product => `
        <div class="gallery-item">
            <img src="${product.mainImage}" alt="${product.name}" loading="lazy">
        </div>
    `).join('');
}

function renderReviews() {
    if (!elements.reviewsGrid || state.reviews.length === 0) return;
    
    // Only show approved reviews
    const approvedReviews = state.reviews.filter(review => review.status === 'approved');
    
    elements.reviewsGrid.innerHTML = approvedReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${review.name.charAt(0).toUpperCase()}</div>
                <div>
                    <div class="review-name">${review.name}</div>
                    <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                </div>
            </div>
            <p class="review-text">${review.reviewText}</p>
        </div>
    `).join('');
}

function renderServices() {
    if (!elements.servicesGrid || state.services.length === 0) return;
    
    elements.servicesGrid.innerHTML = state.services.map(service => `
        <div class="service-card">
            <img src="${service.image}" alt="${service.title}" class="service-image">
            <div class="service-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <a href="#contact" class="btn btn-primary">Learn More</a>
            </div>
        </div>
    `).join('');
}

function renderBestsellers() {
    if (!elements.bestsellersGrid || state.products.length === 0) return;
    
    const bestsellers = state.products.filter(p => p.bestSeller).sort((a, b) => a.displayOrder - b.displayOrder);
    
    elements.bestsellersGrid.innerHTML = bestsellers.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.mainImage}" alt="${product.name}">
                ${product.featured ? '<span class="product-badge featured">Featured</span>' : ''}
                <span class="product-badge bestseller">Best Seller</span>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">AED ${product.price.toLocaleString()}</div>
                <p class="product-description">${product.shortDescription}</p>
                <div class="product-actions">
                    <a href="products.html?id=${product.id}" class="btn btn-primary">View Details</a>
                    <a href="https://wa.me/971500000000?text=I'm interested in ${encodeURIComponent(product.name)}" class="btn btn-secondary" target="_blank">WhatsApp</a>
                </div>
            </div>
        </div>
    `).join('');
}

function renderBusinessInfo() {
    if (!state.businessInfo) return;
    
    if (elements.shopName) elements.shopName.textContent = state.businessInfo.shopName;
    if (elements.address) elements.address.textContent = state.businessInfo.address;
    if (elements.phone) {
        elements.phone.textContent = state.businessInfo.phone;
        elements.phone.href = `tel:${state.businessInfo.phone}`;
    }
    if (elements.whatsapp) {
        elements.whatsapp.textContent = state.businessInfo.whatsapp;
        elements.whatsapp.href = `https://wa.me/${state.businessInfo.whatsapp.replace(/\D/g, '')}`;
    }
    if (elements.email) {
        elements.email.textContent = state.businessInfo.email;
        elements.email.href = `mailto:${state.businessInfo.email}`;
    }
}

// Hero Slider Functions
function initializeHeroSlider() {
    if (state.heroSlides.length < 2) return;
    
    startAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    state.autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function stopAutoSlide() {
    if (state.autoSlideInterval) {
        clearInterval(state.autoSlideInterval);
        state.autoSlideInterval = null;
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-nav-dot');
    
    if (slides.length === 0) return;
    
    slides[state.currentSlide].classList.remove('active');
    dots[state.currentSlide].classList.remove('active');
    
    state.currentSlide = (state.currentSlide + 1) % slides.length;
    
    slides[state.currentSlide].classList.add('active');
    dots[state.currentSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-nav-dot');
    
    if (slides.length === 0) return;
    
    slides[state.currentSlide].classList.remove('active');
    dots[state.currentSlide].classList.remove('active');
    
    state.currentSlide = (state.currentSlide - 1 + slides.length) % slides.length;
    
    slides[state.currentSlide].classList.add('active');
    dots[state.currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-nav-dot');
    
    if (slides.length === 0 || index < 0 || index >= slides.length) return;
    
    slides[state.currentSlide].classList.remove('active');
    dots[state.currentSlide].classList.remove('active');
    
    state.currentSlide = index;
    
    slides[state.currentSlide].classList.add('active');
    dots[state.currentSlide].classList.add('active');
    
    startAutoSlide();
}

// Mobile Menu
function initializeMobileMenu() {
    if (!elements.mobileMenuBtn || !elements.navMenu) return;
    
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = elements.navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            elements.navMenu.classList.remove('active');
        });
    });
}

// Form Handling
function initializeForms() {
    if (elements.reviewForm) {
        elements.reviewForm.addEventListener('submit', handleReviewSubmit);
    }
    
    if (elements.consultationForm) {
        elements.consultationForm.addEventListener('submit', handleConsultationSubmit);
    }
}

async function handleReviewSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reviewData = {
        name: formData.get('name'),
        rating: parseInt(formData.get('rating')),
        reviewText: formData.get('review'),
        status: 'pending'
    };
    
    try {
        // In production, send to your API endpoint
        console.log('Review submitted:', reviewData);
        
        // Show success message
        alert('Thank you for your review! It will be published after approval.');
        e.target.reset();
        
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again.');
    }
}

async function handleConsultationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const consultationData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    try {
        // In production, send to your API endpoint
        console.log('Consultation requested:', consultationData);
        
        // Show success message
        alert('Thank you for your inquiry! We will contact you shortly.');
        e.target.reset();
        
    } catch (error) {
        console.error('Error submitting consultation:', error);
        alert('Failed to submit inquiry. Please try again.');
    }
}

// Utility Functions
function showLoading() {
    document.body.classList.add('loading');
}

function hideLoading() {
    document.body.classList.remove('loading');
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.body.prepend(errorDiv);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Pause auto-slide on hover
const heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
}