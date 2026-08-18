# Contentful CMS Setup Guide

This guide will help you set up Contentful as the headless CMS for the Sofa Shop website.

## Prerequisites

- A Contentful account (free tier is sufficient for this project)
- Basic understanding of content modeling concepts

## Step 1: Create Contentful Account

1. Go to [https://www.contentful.com/sign-up/](https://www.contentful.com/sign-up/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create a New Space

1. After logging in, click "Create space"
2. Choose a name for your space (e.g., "Sofa Shop Website")
3. Select the free tier
4. Click "Create space"

## Step 3: Get API Credentials

1. Go to Settings → API keys
2. Click "Add API key"
3. Give it a name (e.g., "Website API")
4. Copy the following values:
   - **Space ID** (needed for both delivery and management APIs)
   - **Content Delivery API - access token** (for public website)
   - **Content Management API - access token** (for admin dashboard)

5. Save these credentials in your `.env` file:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_access_token
```

## Step 4: Create Content Models

### 4.1 Product Content Model

1. Go to Content model → Add content model
2. Name: `Product`
3. Add fields:
   - **Name** (Text, Required)
   - **Price** (Number, Required, Validations: Min 0)
   - **Short Description** (Text, Required)
   - **Full Description** (Long text, Required)
   - **Category** (Short text, Required, Dropdown: Sofa, Sofa Bed, Sectional, Recliner)
   - **Main Image** (Asset, Required)
   - **Gallery Images** (Assets, Multiple)
   - **Featured** (Boolean, Default: false)
   - **Best Seller** (Boolean, Default: false)
   - **Available** (Boolean, Default: true)
   - **Display Order** (Number, Default: 0)

### 4.2 Service Content Model

1. Create content model named `Service`
2. Add fields:
   - **Title** (Text, Required)
   - **Description** (Long text, Required)
   - **Image** (Asset, Required)
   - **Features** (Short text, Multiple - or use JSON)
   - **Button Text** (Short text)
   - **Button Link** (Short text)

### 4.3 Review Content Model

1. Create content model named `Review`
2. Add fields:
   - **Name** (Text, Required)
   - **Rating** (Number, Required, Validations: Min 1, Max 5)
   - **Review Text** (Long text, Required)
   - **Profile Picture** (Asset)
   - **Status** (Short text, Dropdown: Pending, Approved, Rejected, Default: Pending)

### 4.4 Hero Slide Content Model

1. Create content model named `Hero Slide`
2. Add fields:
   - **Background Image** (Asset, Required)
   - **Heading** (Text, Required)
   - **Badge** (Short text)
   - **Description** (Long text, Required)
   - **Primary Button Text** (Short text)
   - **Primary Button Link** (Short text)
   - **Secondary Button Text** (Short text)
   - **Secondary Button Link** (Short text)
   - **Order** (Number, Default: 0)
   - **Active** (Boolean, Default: true)

### 4.5 Business Info Content Model

1. Create content model named `Business Info`
2. Add fields:
   - **Shop Name** (Text, Required)
   - **Phone** (Short text, Required)
   - **WhatsApp** (Short text, Required)
   - **Email** (Short text, Required)
   - **Address** (Long text, Required)
   - **Opening Hours** (Short text, Required)
   - **Logo** (Asset)

### 4.6 Contact Request Content Model

1. Create content model named `Contact Request`
2. Add fields:
   - **Name** (Text, Required)
   - **Email** (Short text, Required)
   - **Phone** (Short text, Required)
   - **Service** (Short text, Required)
   - **Message** (Long text, Required)
   - **Status** (Short text, Dropdown: Pending, Contacted, Closed, Default: Pending)
   - **Date** (Date & time, Default: Now)

## Step 5: Add Sample Content

### Add Business Info

1. Go to Content → Business Info → Add entry
2. Fill in the business information
3. Publish the entry

### Add Sample Products

1. Go to Content → Product → Add entry
2. Add sample products with images
3. Publish each entry

### Add Sample Services

1. Go to Content → Service → Add entry
2. Add sample services
3. Publish each entry

### Add Sample Reviews

1. Go to Content → Review → Add entry
2. Add sample reviews
3. Set status to "Approved" for immediate display
4. Publish each entry

### Add Hero Slides

1. Go to Content → Hero Slide → Add entry
2. Add hero slides with order numbers
3. Set active to true
4. Publish each entry

## Step 6: Update Website Configuration

Update the Contentful configuration in your JavaScript files:

### Public Website (`public/assets/js/main.js`)

```javascript
const CONTENTFUL_CONFIG = {
    spaceId: 'YOUR_SPACE_ID',
    accessToken: 'YOUR_ACCESS_TOKEN'
};
```

### Admin Dashboard (`admin/assets/js/dashboard.js`)

```javascript
const CONTENTFUL_CONFIG = {
    spaceId: 'YOUR_SPACE_ID',
    accessToken: 'YOUR_ACCESS_TOKEN',
    managementToken: 'YOUR_MANAGEMENT_TOKEN'
};
```

## Step 7: Implement Contentful API Integration

Replace the placeholder data fetching functions with actual Contentful API calls:

### Example for fetching products:

```javascript
async function fetchProducts() {
    const response = await fetch(
        `https://cdn.contentful.com/spaces/${CONTENTFUL_CONFIG.spaceId}/environments/master/entries?access_token=${CONTENTFUL_CONFIG.accessToken}&content_type=product`
    );
    const data = await response.json();
    
    return data.items.map(item => ({
        id: item.sys.id,
        name: item.fields.name,
        price: item.fields.price,
        // ... map other fields
    }));
}
```

## Step 8: Test the Integration

1. Start your development server: `npm run dev`
2. Check if content loads from Contentful
3. Test the admin dashboard CRUD operations
4. Verify changes appear on the public website

## Security Notes

- **Never commit your API tokens to version control**
- Use environment variables for all sensitive data
- The Content Delivery API token can be exposed on the frontend
- The Content Management API token should only be used server-side
- Implement proper authentication for admin operations

## Contentful Management API vs Delivery API

- **Delivery API**: Used by the public website to fetch published content
- **Management API**: Used by the admin dashboard to create, update, and delete content

## Alternative: Using Contentful JavaScript SDK

For easier integration, consider using the official Contentful JavaScript SDK:

```bash
npm install contentful
```

```javascript
import { createClient } from 'contentful';

const client = createClient({
    space: 'YOUR_SPACE_ID',
    accessToken: 'YOUR_ACCESS_TOKEN'
});

const products = await client.getEntries({
    content_type: 'product'
});
```

## Next Steps

After setting up Contentful:

1. Set up Vercel/Netlify Functions for secure admin operations
2. Configure GitHub Pages for public website deployment
3. Test all functionality end-to-end
4. Add your actual images and content

## Troubleshooting

### Common Issues

- **401 Unauthorized**: Check your API tokens
- **404 Not Found**: Verify your Space ID and content model names
- **CORS Errors**: Ensure you're using the correct API endpoints
- **Empty Responses**: Check if your content is published

### Getting Help

- Contentful Documentation: https://www.contentful.com/docs/
- Contentful Community: https://www.contentful.com/community/