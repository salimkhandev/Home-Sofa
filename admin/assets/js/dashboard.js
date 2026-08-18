// Admin Dashboard JavaScript
let state = {
    products: [],
    services: [],
    reviews: [],
    heroSlides: [],
    businessInfo: {},
    contactRequests: [],
    currentSection: 'dashboard'
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

async function saveDataToFile(filename, data) {
    try {
        // In a real server environment, this would make an API call to save the file
        // For GitHub Pages static site, we'll save to localStorage and show a message
        localStorage.setItem(filename, JSON.stringify(data));
        console.log(`Data saved to ${filename}:`, data);
        return true;
    } catch (error) {
        console.error(`Error saving ${filename}:`, error);
        return false;
    }
}

// DOM Elements
const elements = {
    sidebar: document.getElementById('sidebar'),
    menuToggle: document.getElementById('menuToggle'),
    currentSection: document.getElementById('currentSection'),
    navLinks: document.querySelectorAll('.sidebar-nav a')
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    initializeDashboard();
});

function checkAuthentication() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Validate token (in production, verify with server)
    try {
        const payload = JSON.parse(atob(token));
        const tokenAge = Date.now() - payload.timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (tokenAge >= maxAge) {
            localStorage.removeItem('adminToken');
            window.location.href = 'index.html';
        }
    } catch (e) {
        localStorage.removeItem('adminToken');
        window.location.href = 'index.html';
    }
}

async function initializeDashboard() {
    try {
        // Load all data
        await loadDashboardData();
        
        // Initialize navigation
        initializeNavigation();
        
        // Render dashboard
        renderDashboard();
        
        // Initialize mobile menu
        initializeMobileMenu();
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showError('Failed to load dashboard data');
    }
}

async function loadDashboardData() {
    // Load data from JSON files
    state.products = await loadDataFromFile('products.json') || [];
    state.services = await loadDataFromFile('services.json') || [];
    state.reviews = await loadDataFromFile('reviews.json') || [];
    state.heroSlides = await loadDataFromFile('hero-slides.json') || [];
    state.businessInfo = await loadDataFromFile('business-info.json') || {};
    state.contactRequests = await loadDataFromFile('contact-requests.json') || [];
    
    // Check localStorage for any unsaved changes
    const localStorageProducts = localStorage.getItem('products.json');
    const localStorageServices = localStorage.getItem('services.json');
    const localStorageReviews = localStorage.getItem('reviews.json');
    const localStorageHeroSlides = localStorage.getItem('hero-slides.json');
    const localStorageBusinessInfo = localStorage.getItem('business-info.json');
    const localStorageContactRequests = localStorage.getItem('contact-requests.json');
    
    if (localStorageProducts) state.products = JSON.parse(localStorageProducts);
    if (localStorageServices) state.services = JSON.parse(localStorageServices);
    if (localStorageReviews) state.reviews = JSON.parse(localStorageReviews);
    if (localStorageHeroSlides) state.heroSlides = JSON.parse(localStorageHeroSlides);
    if (localStorageBusinessInfo) state.businessInfo = JSON.parse(localStorageBusinessInfo);
    if (localStorageContactRequests) state.contactRequests = JSON.parse(localStorageContactRequests);
}



function renderDashboard() {
    // Update stats
    document.getElementById('totalProducts').textContent = state.products.length;
    document.getElementById('totalReviews').textContent = state.reviews.length;
    document.getElementById('pendingInquiries').textContent = state.contactRequests.filter(r => r.status === 'pending').length;
    document.getElementById('pendingReviews').textContent = state.reviews.filter(r => r.status === 'pending').length;
    
    // Render recent activity
    renderRecentActivity();
    
    // Render products table
    renderProductsTable();
    
    // Render services table
    renderServicesTable();
    
    // Render reviews table
    renderReviewsTable();
    
    // Render hero slides table
    renderHeroTable();
    
    // Render contact requests table
    renderContactTable();
    
    // Populate business info form
    populateBusinessInfo();
}

function renderRecentActivity() {
    const activities = [
        { activity: 'New product added', type: 'Product', date: '2024-01-15', status: 'completed' },
        { activity: 'Review submitted', type: 'Review', date: '2024-01-14', status: 'pending' },
        { activity: 'Contact request received', type: 'Contact', date: '2024-01-13', status: 'pending' }
    ];
    
    const tbody = document.getElementById('recentActivity');
    tbody.innerHTML = activities.map(activity => `
        <tr>
            <td>${activity.activity}</td>
            <td><span class="badge badge-info">${activity.type}</span></td>
            <td>${activity.date}</td>
            <td><span class="badge badge-${activity.status === 'completed' ? 'success' : 'warning'}">${activity.status}</span></td>
        </tr>
    `).join('');
}

function renderProductsTable() {
    const tbody = document.getElementById('productsTable');
    tbody.innerHTML = state.products.map(product => `
        <tr>
            <td><img src="${product.mainImage}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td>${product.name}</td>
            <td>AED ${product.price.toLocaleString()}</td>
            <td>${product.category}</td>
            <td>
                <span class="badge badge-${product.available ? 'success' : 'danger'}">${product.available ? 'Available' : 'Unavailable'}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="table-btn edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="table-btn delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderServicesTable() {
    const tbody = document.getElementById('servicesTable');
    tbody.innerHTML = state.services.map(service => `
        <tr>
            <td><img src="${service.image}" alt="${service.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td>${service.title}</td>
            <td>${service.description.substring(0, 50)}...</td>
            <td>
                <div class="table-actions">
                    <button class="table-btn edit" onclick="editService(${service.id})">Edit</button>
                    <button class="table-btn delete" onclick="deleteService(${service.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderReviewsTable() {
    const tbody = document.getElementById('reviewsTable');
    tbody.innerHTML = state.reviews.map(review => `
        <tr>
            <td>${review.name}</td>
            <td>${'⭐'.repeat(review.rating)}</td>
            <td>${review.reviewText.substring(0, 50)}...</td>
            <td>
                <span class="badge badge-${review.status === 'approved' ? 'success' : review.status === 'rejected' ? 'danger' : 'warning'}">${review.status}</span>
            </td>
            <td>
                <div class="table-actions">
                    ${review.status === 'pending' ? `
                        <button class="table-btn view" onclick="approveReview(${review.id})">Approve</button>
                        <button class="table-btn delete" onclick="rejectReview(${review.id})">Reject</button>
                    ` : `
                        <button class="table-btn delete" onclick="deleteReview(${review.id})">Delete</button>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

function renderHeroTable() {
    const tbody = document.getElementById('heroTable');
    tbody.innerHTML = state.heroSlides.map(slide => `
        <tr>
            <td><img src="${slide.image}" alt="${slide.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td>${slide.title}</td>
            <td>${slide.order}</td>
            <td>
                <span class="badge badge-${slide.active ? 'success' : 'danger'}">${slide.active ? 'Active' : 'Inactive'}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="table-btn edit" onclick="editHeroSlide(${slide.id})">Edit</button>
                    <button class="table-btn delete" onclick="deleteHeroSlide(${slide.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderContactTable() {
    const tbody = document.getElementById('contactTable');
    tbody.innerHTML = state.contactRequests.map(request => `
        <tr>
            <td>${request.name}</td>
            <td>${request.email}</td>
            <td>${request.phone}</td>
            <td>${request.service}</td>
            <td>${request.date}</td>
            <td>
                <div class="table-actions">
                    <button class="table-btn view" onclick="viewContactRequest(${request.id})">View</button>
                    <button class="table-btn delete" onclick="deleteContactRequest(${request.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function populateBusinessInfo() {
    document.getElementById('shopName').value = state.businessInfo.shopName || '';
    document.getElementById('phone').value = state.businessInfo.phone || '';
    document.getElementById('whatsapp').value = state.businessInfo.whatsapp || '';
    document.getElementById('email').value = state.businessInfo.email || '';
    document.getElementById('address').value = state.businessInfo.address || '';
    document.getElementById('openingHours').value = state.businessInfo.openingHours || '';
}

// Navigation
function initializeNavigation() {
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
        });
    });
}

function navigateToSection(section) {
    // Update active nav link
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });
    
    // Update current section text
    elements.currentSection.textContent = section.charAt(0).toUpperCase() + section.slice(1);
    
    // Show/hide sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    state.currentSection = section;
    
    // Close mobile menu
    elements.sidebar.classList.remove('active');
}

// Mobile Menu
function initializeMobileMenu() {
    elements.menuToggle.addEventListener('click', () => {
        elements.sidebar.classList.toggle('active');
    });
}

// Product Management
function showProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    const form = document.getElementById('productForm');
    
    if (productId) {
        title.textContent = 'Edit Product';
        const product = state.products.find(p => p.id === productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productShortDescription').value = product.shortDescription;
            document.getElementById('productFullDescription').value = product.fullDescription;
            document.getElementById('productDisplayOrder').value = product.displayOrder;
            document.getElementById('productFeatured').checked = product.featured;
            document.getElementById('productBestSeller').checked = product.bestSeller;
            document.getElementById('productAvailable').checked = product.available;
        }
    } else {
        title.textContent = 'Add Product';
        form.reset();
        document.getElementById('productId').value = '';
        document.getElementById('productAvailable').checked = true;
    }
    
    modal.style.display = 'block';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

function saveProduct() {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    
    const productData = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        shortDescription: formData.get('shortDescription'),
        fullDescription: formData.get('fullDescription'),
        displayOrder: parseInt(formData.get('displayOrder')) || 0,
        featured: formData.get('featured') === 'on',
        bestSeller: formData.get('bestSeller') === 'on',
        available: formData.get('available') === 'on'
    };
    
    const productId = formData.get('productId');
    
    if (productId) {
        // Update existing product
        const index = state.products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            state.products[index] = { ...state.products[index], ...productData };
        }
    } else {
        // Add new product
        productData.id = Date.now();
        productData.mainImage = 'assets/images/product-placeholder.jpg';
        productData.galleryImages = [];
        state.products.push(productData);
    }
    
    // Save to localStorage
    saveDataToFile('products.json', state.products);
    
    renderProductsTable();
    renderDashboard();
    closeProductModal();
    
    alert('Product saved! Changes saved to browser storage. To make permanent changes, update admin/data/products.json and redeploy.');
}

function editProduct(productId) {
    showProductModal(productId);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        state.products = state.products.filter(p => p.id !== productId);
        saveDataToFile('products.json', state.products);
        renderProductsTable();
        renderDashboard();
        alert('Product deleted! Changes saved to browser storage. To make permanent changes, update admin/data/products.json and redeploy.');
    }
}

// Review Management
function approveReview(reviewId) {
    const review = state.reviews.find(r => r.id === reviewId);
    if (review) {
        review.status = 'approved';
        saveDataToFile('reviews.json', state.reviews);
        renderReviewsTable();
        renderDashboard();
        alert('Review approved! Changes saved to browser storage. To make permanent changes, update admin/data/reviews.json and redeploy.');
    }
}

function rejectReview(reviewId) {
    const review = state.reviews.find(r => r.id === reviewId);
    if (review) {
        review.status = 'rejected';
        saveDataToFile('reviews.json', state.reviews);
        renderReviewsTable();
        renderDashboard();
        alert('Review rejected! Changes saved to browser storage. To make permanent changes, update admin/data/reviews.json and redeploy.');
    }
}

function deleteReview(reviewId) {
    if (confirm('Are you sure you want to delete this review?')) {
        state.reviews = state.reviews.filter(r => r.id !== reviewId);
        saveDataToFile('reviews.json', state.reviews);
        renderReviewsTable();
        renderDashboard();
        alert('Review deleted! Changes saved to browser storage. To make permanent changes, update admin/data/reviews.json and redeploy.');
    }
}

// Business Info Management
function saveBusinessInfo() {
    state.businessInfo = {
        shopName: document.getElementById('shopName').value,
        phone: document.getElementById('phone').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        openingHours: document.getElementById('openingHours').value
    };
    
    // Save to localStorage
    saveDataToFile('business-info.json', state.businessInfo);
    
    alert('Business information saved! Changes saved to browser storage. To make permanent changes, update admin/data/business-info.json and redeploy.');
}

function populateBusinessInfo() {
    document.getElementById('shopName').value = state.businessInfo.shopName || '';
    document.getElementById('phone').value = state.businessInfo.phone || '';
    document.getElementById('whatsapp').value = state.businessInfo.whatsapp || '';
    document.getElementById('email').value = state.businessInfo.email || '';
    document.getElementById('address').value = state.businessInfo.address || '';
    document.getElementById('openingHours').value = state.businessInfo.openingHours || '';
}

// Contact Request Management
function viewContactRequest(requestId) {
    const request = state.contactRequests.find(r => r.id === requestId);
    if (request) {
        alert(`Name: ${request.name}\nEmail: ${request.email}\nPhone: ${request.phone}\nService: ${request.service}\nMessage: ${request.message}`);
    }
}

function markContactRequestAsRead(requestId) {
    const request = state.contactRequests.find(r => r.id === requestId);
    if (request) {
        request.status = 'read';
        saveDataToFile('contact-requests.json', state.contactRequests);
        renderContactTable();
        renderDashboard();
        alert('Contact request marked as read! Changes saved to browser storage. To make permanent changes, update admin/data/contact-requests.json and redeploy.');
    }
}

function deleteContactRequest(requestId) {
    if (confirm('Are you sure you want to delete this contact request?')) {
        state.contactRequests = state.contactRequests.filter(r => r.id !== requestId);
        saveDataToFile('contact-requests.json', state.contactRequests);
        renderContactTable();
        renderDashboard();
        alert('Contact request deleted! Changes saved to browser storage. To make permanent changes, update admin/data/contact-requests.json and redeploy.');
    }
}

// Service Management
function showServiceModal(serviceId = null) {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('serviceModalTitle');
    const form = document.getElementById('serviceForm');
    
    if (serviceId) {
        const service = state.services.find(s => s.id === serviceId);
        if (service) {
            title.textContent = 'Edit Service';
            document.getElementById('serviceId').value = service.id;
            document.getElementById('serviceTitle').value = service.title;
            document.getElementById('serviceDescription').value = service.description;
            document.getElementById('serviceFeatures').value = service.features ? service.features.join(', ') : '';
        }
    } else {
        title.textContent = 'Add Service';
        form.reset();
        document.getElementById('serviceId').value = '';
    }
    
    modal.style.display = 'block';
}

function closeServiceModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

function saveService() {
    const form = document.getElementById('serviceForm');
    const serviceId = document.getElementById('serviceId').value;
    
    const serviceData = {
        title: document.getElementById('serviceTitle').value,
        description: document.getElementById('serviceDescription').value,
        features: document.getElementById('serviceFeatures').value.split(',').map(f => f.trim()).filter(f => f),
        image: 'assets/images/service-placeholder.jpg'
    };
    
    if (serviceId) {
        // Update existing service
        const index = state.services.findIndex(s => s.id === parseInt(serviceId));
        if (index !== -1) {
            state.services[index] = { ...state.services[index], ...serviceData };
        }
    } else {
        // Add new service
        const newId = Math.max(...state.services.map(s => s.id), 0) + 1;
        state.services.push({ id: newId, ...serviceData });
    }
    
    // Save to localStorage
    saveDataToFile('services.json', state.services);
    
    renderServicesTable();
    closeServiceModal();
    
    alert('Service saved! Changes saved to browser storage. To make permanent changes, update admin/data/services.json and redeploy.');
}

function editService(serviceId) {
    showServiceModal(serviceId);
}

function deleteService(serviceId) {
    if (confirm('Are you sure you want to delete this service?')) {
        state.services = state.services.filter(s => s.id !== serviceId);
        saveDataToFile('services.json', state.services);
        renderServicesTable();
        alert('Service deleted! Changes saved to browser storage. To make permanent changes, update admin/data/services.json and redeploy.');
    }
}

// Hero Slide Management
function showHeroModal(slideId = null) {
    const modal = document.getElementById('heroModal');
    const title = document.getElementById('heroModalTitle');
    const form = document.getElementById('heroForm');
    
    if (slideId) {
        const slide = state.heroSlides.find(s => s.id === slideId);
        if (slide) {
            title.textContent = 'Edit Hero Slide';
            document.getElementById('heroId').value = slide.id;
            document.getElementById('heroTitle').value = slide.title;
            document.getElementById('heroDescription').value = slide.description || '';
            document.getElementById('heroOrder').value = slide.order;
            document.getElementById('heroActive').checked = slide.active;
        }
    } else {
        title.textContent = 'Add Hero Slide';
        form.reset();
        document.getElementById('heroId').value = '';
        document.getElementById('heroActive').checked = true;
    }
    
    modal.style.display = 'block';
}

function closeHeroModal() {
    document.getElementById('heroModal').style.display = 'none';
}

function saveHero() {
    const form = document.getElementById('heroForm');
    const heroId = document.getElementById('heroId').value;
    
    const heroData = {
        title: document.getElementById('heroTitle').value,
        description: document.getElementById('heroDescription').value,
        order: parseInt(document.getElementById('heroOrder').value),
        active: document.getElementById('heroActive').checked,
        image: 'assets/images/hero-placeholder.jpg'
    };
    
    if (heroId) {
        // Update existing slide
        const index = state.heroSlides.findIndex(s => s.id === parseInt(heroId));
        if (index !== -1) {
            state.heroSlides[index] = { ...state.heroSlides[index], ...heroData };
        }
    } else {
        // Add new slide
        const newId = Math.max(...state.heroSlides.map(s => s.id), 0) + 1;
        state.heroSlides.push({ id: newId, ...heroData });
    }
    
    // Save to localStorage
    saveDataToFile('hero-slides.json', state.heroSlides);
    
    renderHeroTable();
    closeHeroModal();
    
    alert('Hero slide saved! Changes saved to browser storage. To make permanent changes, update admin/data/hero-slides.json and redeploy.');
}

function editHeroSlide(slideId) {
    showHeroModal(slideId);
}

function deleteHeroSlide(slideId) {
    if (confirm('Are you sure you want to delete this hero slide?')) {
        state.heroSlides = state.heroSlides.filter(s => s.id !== slideId);
        saveDataToFile('hero-slides.json', state.heroSlides);
        renderHeroTable();
        alert('Hero slide deleted! Changes saved to browser storage. To make permanent changes, update admin/data/hero-slides.json and redeploy.');
    }
}

// Utility Functions
function refreshData() {
    loadDashboardData().then(() => {
        renderDashboard();
        alert('Data refreshed successfully!');
    });
}

function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('rememberAdmin');
    window.location.href = 'index.html';
}

function showError(message) {
    alert('Error: ' + message);
}

// Image upload handling
document.getElementById('mainImageInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('mainImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px;">`;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('galleryImagesInput')?.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    const preview = document.getElementById('galleryImagesPreview');
    preview.innerHTML = '';
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'image-preview-item';
            div.innerHTML = `
                <img src="${e.target.result}">
                <button type="button" class="image-preview-remove" onclick="this.parentElement.remove()">×</button>
            `;
            preview.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
});

document.getElementById('serviceImageInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('serviceImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px;">`;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('heroImageInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('heroImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px;">`;
        };
        reader.readAsDataURL(file);
    }
});