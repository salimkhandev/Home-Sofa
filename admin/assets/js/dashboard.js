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
    // In production, fetch from your API/Contentful
    // For now, using placeholder data
    
    state.products = await fetchProducts();
    state.services = await fetchServices();
    state.reviews = await fetchReviews();
    state.heroSlides = await fetchHeroSlides();
    state.businessInfo = await fetchBusinessInfo();
    state.contactRequests = await fetchContactRequests();
}

// Placeholder data fetching functions
async function fetchProducts() {
    return [
        {
            id: 1,
            name: 'Nebraska U-Shape',
            price: 4200,
            shortDescription: 'Custom-made U-shaped sofa',
            fullDescription: 'Elegant U-shaped sofa perfect for large living rooms.',
            category: 'sectional',
            mainImage: 'assets/images/product1.jpg',
            galleryImages: [],
            featured: true,
            bestSeller: true,
            available: true,
            displayOrder: 1
        },
        {
            id: 2,
            name: 'L-Shaped Modern',
            price: 3500,
            shortDescription: 'Contemporary L-shaped sofa',
            fullDescription: 'Modern L-shaped sofa with clean lines.',
            category: 'sectional',
            mainImage: 'assets/images/product2.jpg',
            galleryImages: [],
            featured: true,
            bestSeller: false,
            available: true,
            displayOrder: 2
        }
    ];
}

async function fetchServices() {
    return [
        {
            id: 1,
            title: 'Premium Sofa Beds',
            description: 'Professional sofa bed solutions',
            image: 'assets/images/service1.jpg',
            features: ['Custom sizes', 'Premium materials']
        },
        {
            id: 2,
            title: 'Upholstery Services',
            description: 'Expert upholstery services',
            image: 'assets/images/service2.jpg',
            features: ['Fabric replacement', 'Foam replacement']
        }
    ];
}

async function fetchReviews() {
    return [
        {
            id: 1,
            name: 'Sarah Johnson',
            rating: 5,
            reviewText: 'Amazing quality and service!',
            status: 'approved'
        },
        {
            id: 2,
            name: 'Mohammed Ali',
            rating: 5,
            reviewText: 'Best sofa shop in Dubai.',
            status: 'pending'
        }
    ];
}

async function fetchHeroSlides() {
    return [
        {
            id: 1,
            image: 'assets/images/hero1.jpg',
            title: 'Custom Sofa Beds',
            order: 1,
            active: true
        }
    ];
}

async function fetchBusinessInfo() {
    return {
        shopName: 'Home Sofa',
        phone: '+971 50 000 0000',
        whatsapp: '+971 50 000 0000',
        email: 'info@homesofa.ae',
        address: 'Dubai, UAE',
        openingHours: '9:00 AM - 10:00 PM'
    };
}

async function fetchContactRequests() {
    return [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+971 50 123 4567',
            service: 'sofa-bed',
            message: 'Interested in custom sofa bed',
            date: '2024-01-15',
            status: 'pending'
        }
    ];
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
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
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
    
    renderProductsTable();
    renderDashboard();
    closeProductModal();
    
    // In production, save to Contentful
    console.log('Product saved:', productData);
}

function editProduct(productId) {
    showProductModal(productId);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        state.products = state.products.filter(p => p.id !== productId);
        renderProductsTable();
        renderDashboard();
        
        // In production, delete from Contentful
        console.log('Product deleted:', productId);
    }
}

// Review Management
function approveReview(reviewId) {
    const review = state.reviews.find(r => r.id === reviewId);
    if (review) {
        review.status = 'approved';
        renderReviewsTable();
        renderDashboard();
        
        // In production, update in Contentful
        console.log('Review approved:', reviewId);
    }
}

function rejectReview(reviewId) {
    const review = state.reviews.find(r => r.id === reviewId);
    if (review) {
        review.status = 'rejected';
        renderReviewsTable();
        renderDashboard();
        
        // In production, update in Contentful
        console.log('Review rejected:', reviewId);
    }
}

function deleteReview(reviewId) {
    if (confirm('Are you sure you want to delete this review?')) {
        state.reviews = state.reviews.filter(r => r.id !== reviewId);
        renderReviewsTable();
        renderDashboard();
        
        // In production, delete from Contentful
        console.log('Review deleted:', reviewId);
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
    
    alert('Business information saved successfully!');
    
    // In production, save to Contentful
    console.log('Business info saved:', state.businessInfo);
}

// Contact Request Management
function viewContactRequest(requestId) {
    const request = state.contactRequests.find(r => r.id === requestId);
    if (request) {
        alert(`Name: ${request.name}\nEmail: ${request.email}\nPhone: ${request.phone}\nService: ${request.service}\nMessage: ${request.message}`);
    }
}

function deleteContactRequest(requestId) {
    if (confirm('Are you sure you want to delete this contact request?')) {
        state.contactRequests = state.contactRequests.filter(r => r.id !== requestId);
        renderContactTable();
        renderDashboard();
        
        // In production, delete from Contentful
        console.log('Contact request deleted:', requestId);
    }
}

// Service Management (placeholder functions)
function showServiceModal() {
    alert('Service modal would open here');
}

function editService(serviceId) {
    alert('Edit service: ' + serviceId);
}

function deleteService(serviceId) {
    if (confirm('Are you sure you want to delete this service?')) {
        state.services = state.services.filter(s => s.id !== serviceId);
        renderServicesTable();
        console.log('Service deleted:', serviceId);
    }
}

// Hero Slide Management (placeholder functions)
function showHeroModal() {
    alert('Hero slide modal would open here');
}

function editHeroSlide(slideId) {
    alert('Edit hero slide: ' + slideId);
}

function deleteHeroSlide(slideId) {
    if (confirm('Are you sure you want to delete this hero slide?')) {
        state.heroSlides = state.heroSlides.filter(s => s.id !== slideId);
        renderHeroTable();
        console.log('Hero slide deleted:', slideId);
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

// Image upload handling (placeholder)
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