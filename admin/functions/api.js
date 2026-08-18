// Admin API Functions for Serverless Deployment
// This file contains the API endpoints that would be deployed as serverless functions

// For Vercel Functions, these would be in api/ directory
// For Netlify Functions, these would be in netlify/functions/ directory

const CONTENTFUL_CONFIG = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
};

// Generic Contentful API call helper
async function contentfulAPI(endpoint, options = {}) {
    const url = `https://api.contentful.com${endpoint}`;
    const headers = {
        'Authorization': `Bearer ${CONTENTFUL_CONFIG.managementToken}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        ...options.headers
    };
    
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
        throw new Error(`Contentful API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

// Product Management Endpoints

// Get all products
export async function getProducts(req, res) {
    try {
        const entries = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries?content_type=product`);
        res.json({ success: true, data: entries });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Create product
export async function createProduct(req, res) {
    try {
        const productData = req.body;
        
        const entry = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries`, {
            method: 'POST',
            body: JSON.stringify({
                fields: {
                    name: { 'en-US': productData.name },
                    price: { 'en-US': productData.price },
                    shortDescription: { 'en-US': productData.shortDescription },
                    fullDescription: { 'en-US': productData.fullDescription },
                    category: { 'en-US': productData.category },
                    featured: { 'en-US': productData.featured },
                    bestSeller: { 'en-US': productData.bestSeller },
                    available: { 'en-US': productData.available },
                    displayOrder: { 'en-US': productData.displayOrder }
                }
            })
        });
        
        // Publish the entry
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${entry.sys.id}/published`, {
            method: 'PUT'
        });
        
        res.json({ success: true, data: entry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Update product
export async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const productData = req.body;
        
        const entry = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                fields: {
                    name: { 'en-US': productData.name },
                    price: { 'en-US': productData.price },
                    shortDescription: { 'en-US': productData.shortDescription },
                    fullDescription: { 'en-US': productData.fullDescription },
                    category: { 'en-US': productData.category },
                    featured: { 'en-US': productData.featured },
                    bestSeller: { 'en-US': productData.bestSeller },
                    available: { 'en-US': productData.available },
                    displayOrder: { 'en-US': productData.displayOrder }
                }
            })
        });
        
        // Publish the updated entry
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}/published`, {
            method: 'PUT'
        });
        
        res.json({ success: true, data: entry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Delete product
export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        
        // Unpublish first
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}/published`, {
            method: 'DELETE'
        });
        
        // Then delete
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}`, {
            method: 'DELETE'
        });
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Review Management Endpoints

// Get all reviews
export async function getReviews(req, res) {
    try {
        const entries = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries?content_type=review`);
        res.json({ success: true, data: entries });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Approve review
export async function approveReview(req, res) {
    try {
        const { id } = req.params;
        
        const entry = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                fields: {
                    status: { 'en-US': 'approved' }
                }
            })
        });
        
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}/published`, {
            method: 'PUT'
        });
        
        res.json({ success: true, data: entry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Reject review
export async function rejectReview(req, res) {
    try {
        const { id } = req.params;
        
        const entry = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                fields: {
                    status: { 'en-US': 'rejected' }
                }
            })
        });
        
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${id}/published`, {
            method: 'PUT'
        });
        
        res.json({ success: true, data: entry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Image Upload Endpoints

// Upload image
export async function uploadImage(req, res) {
    try {
        const file = req.file;
        
        // Create asset
        const asset = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/assets`, {
            method: 'POST',
            body: JSON.stringify({
                fields: {
                    title: { 'en-US': file.originalname },
                    file: { 'en-US': {
                        contentType: file.mimetype,
                        fileName: file.originalname,
                        upload: `https://upload.contentful.com/spaces/${CONTENTFUL_CONFIG.spaceId}/uploads/${file.id}`
                    }}
                }
            })
        });
        
        // Process asset
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/assets/${asset.sys.id}/files/${asset.sys.id}/process`, {
            method: 'PUT',
            headers: {
                'X-Contentful-Content-Type': 'application/vnd.contentful.management.v1+json'
            }
        });
        
        // Publish asset
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/assets/${asset.sys.id}/published`, {
            method: 'PUT'
        });
        
        res.json({ success: true, data: asset });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Business Info Endpoints

// Get business info
export async function getBusinessInfo(req, res) {
    try {
        const entries = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries?content_type=businessInfo&limit=1`);
        res.json({ success: true, data: entries.items[0] || null });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Update business info
export async function updateBusinessInfo(req, res) {
    try {
        const businessData = req.body;
        
        // Get existing entry or create new one
        const existing = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries?content_type=businessInfo&limit=1`);
        
        let entry;
        if (existing.items.length > 0) {
            entry = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${existing.items[0].sys.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    fields: {
                        shopName: { 'en-US': businessData.shopName },
                        phone: { 'en-US': businessData.phone },
                        whatsapp: { 'en-US': businessData.whatsapp },
                        email: { 'en-US': businessData.email },
                        address: { 'en-US': businessData.address },
                        openingHours: { 'en-US': businessData.openingHours }
                    }
                })
            });
        } else {
            entry = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries`, {
                method: 'POST',
                body: JSON.stringify({
                    fields: {
                        shopName: { 'en-US': businessData.shopName },
                        phone: { 'en-US': businessData.phone },
                        whatsapp: { 'en-US': businessData.whatsapp },
                        email: { 'en-US': businessData.email },
                        address: { 'en-US': businessData.address },
                        openingHours: { 'en-US': businessData.openingHours }
                    }
                })
            });
        }
        
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${entry.sys.id}/published`, {
            method: 'PUT'
        });
        
        res.json({ success: true, data: entry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Contact Request Endpoints

// Create contact request
export async function createContactRequest(req, res) {
    try {
        const contactData = req.body;
        
        const entry = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries`, {
            method: 'POST',
            body: JSON.stringify({
                fields: {
                    name: { 'en-US': contactData.name },
                    email: { 'en-US': contactData.email },
                    phone: { 'en-US': contactData.phone },
                    service: { 'en-US': contactData.service },
                    message: { 'en-US': contactData.message },
                    status: { 'en-US': 'pending' },
                    date: { 'en-US': new Date().toISOString() }
                }
            })
        });
        
        await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries/${entry.sys.id}/published`, {
            method: 'PUT'
        });
        
        res.json({ success: true, data: entry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Get contact requests
export async function getContactRequests(req, res) {
    try {
        const entries = await contentfulAPI(`/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries?content_type=contactRequest&order=-fields.date`);
        res.json({ success: true, data: entries });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Authentication Middleware
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, error: 'No token provided' });
    }
    
    // Verify token (implement proper JWT verification)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, error: 'Invalid token' });
    }
}

// Export all functions for different serverless platforms
export default {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getReviews,
    approveReview,
    rejectReview,
    uploadImage,
    getBusinessInfo,
    updateBusinessInfo,
    createContactRequest,
    getContactRequests,
    authenticateToken
};