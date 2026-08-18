# Admin Dashboard - File-Based CMS

## Overview
This admin dashboard uses a file-based CMS system instead of a database. All content is stored in JSON files in the `admin/data/` directory.

## How It Works

### Data Storage
- **Admin Data**: `admin/data/*.json` - Editable via admin dashboard
- **Public Data**: `public/data/*.json` - Read by the public website
- **Browser Storage**: Temporary storage for testing changes

### Workflow
1. **Make Changes**: Use the admin dashboard to add/edit/delete content
2. **Test Changes**: Changes are saved to browser localStorage for immediate testing
3. **Make Permanent**: Copy localStorage data to JSON files and redeploy

## Data Files

### Products (`admin/data/products.json`)
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 1000,
    "shortDescription": "Short description",
    "fullDescription": "Full description",
    "category": "sofa",
    "mainImage": "assets/images/product.jpg",
    "galleryImages": [],
    "featured": true,
    "bestSeller": false,
    "available": true,
    "displayOrder": 1
  }
]
```

### Services (`admin/data/services.json`)
```json
[
  {
    "id": 1,
    "title": "Service Title",
    "description": "Service description",
    "image": "assets/images/service.jpg",
    "features": ["Feature 1", "Feature 2"]
  }
]
```

### Reviews (`admin/data/reviews.json`)
```json
[
  {
    "id": 1,
    "name": "Customer Name",
    "rating": 5,
    "reviewText": "Review text",
    "status": "approved"
  }
]
```

### Hero Slides (`admin/data/hero-slides.json`)
```json
[
  {
    "id": 1,
    "image": "assets/images/hero.jpg",
    "title": "Slide Title",
    "order": 1,
    "active": true
  }
]
```

### Business Info (`admin/data/business-info.json`)
```json
{
  "shopName": "Shop Name",
  "phone": "+971 50 000 0000",
  "whatsapp": "+971 50 000 0000",
  "email": "info@example.com",
  "address": "Address",
  "openingHours": "9:00 AM - 10:00 PM"
}
```

### Contact Requests (`admin/data/contact-requests.json`)
```json
[
  {
    "id": 1,
    "name": "Name",
    "email": "email@example.com",
    "phone": "+971 50 000 0000",
    "service": "service-name",
    "message": "Message",
    "date": "2024-01-15",
    "status": "pending"
  }
]
```

## Deployment Process

### To Update Content:
1. Make changes in the admin dashboard
2. Test changes in the browser
3. Open browser DevTools → Application → Local Storage
4. Copy the JSON data from localStorage
5. Update the corresponding file in `admin/data/`
6. Copy updated files to `public/data/`
7. Commit and push to GitHub
8. GitHub Actions will automatically deploy

### Quick Update Script:
```javascript
// In browser console after making changes:
console.log(JSON.parse(localStorage.getItem('products.json')));
```

## Login Credentials
- **Email**: admin@homesofa.ae
- **Password**: admin123

## Security Notes
- Change the admin credentials before production deployment
- Currently uses client-side authentication (for demo purposes)
- For production, implement proper server-side authentication
- Never commit sensitive data to repository

## Features
- ✅ Product management (CRUD)
- ✅ Service management (CRUD)
- ✅ Review moderation
- ✅ Hero slider management
- ✅ Business info management
- ✅ Contact request tracking
- ✅ Real-time preview via localStorage
- ✅ File-based deployment

## Troubleshooting
- **Changes not appearing**: Clear browser cache and localStorage
- **Data not persisting**: Check browser localStorage has space available
- **Deployment issues**: Verify GitHub Actions workflow is running