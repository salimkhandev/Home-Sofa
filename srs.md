# Software Requirements Specification (SRS)

## 1. Project Overview

### 1.1 Project Name

**Sofa Shop Website & Content Management Dashboard**

### 1.2 Project Purpose

The system is a website for a physical sofa shop that currently sells products offline through its physical store.

The website will act as an online **showcase/catalogue**, not necessarily as an e-commerce checkout system.

Customers will be able to:

* View the sofa shop's products.
* View sofa images.
* Browse image sliders/carousels.
* Read product descriptions.
* View prices where applicable.
* View services offered by the shop.
* Read customer reviews/testimonials.
* View shop information.
* Contact the owner through WhatsApp.
* Call the shop.
* Send an email.
* View the shop's location.
* Submit a consultation/contact request.

The shop owner will have an **Admin Dashboard** where the owner can update the website content without manually editing HTML files.

---

# 2. Main System Concept

The system consists of two major parts.

## 2.1 Public Website

The website is accessible to everyone.

Example:

```text
yourdomain.com
```

It contains the customer-facing sofa shop website.

## 2.2 Owner/Admin Dashboard

A private dashboard where the shop owner manages website content.

Example:

```text
yourdomain.com/admin
```

The dashboard must require authentication.

The owner should be able to modify:

* Hero images
* Sofa images
* Products
* Prices
* Product descriptions
* Services
* Testimonials
* Reviews
* Contact information
* WhatsApp number
* Phone number
* Email
* Location
* Business information
* Feature/benefit sections
* Gallery images
* Working process
* Website text
* Some homepage sections

---

# 3. Design Reference

The provided screenshot is the primary visual reference.

The website should use a similar structure, spacing, card-based design, image-heavy presentation, and blue/white visual identity.

The screenshot contains approximately these major sections:

1. Top information bar
2. Navigation/header
3. Hero section
4. Sofa image gallery/carousel
5. Trust/benefit indicators
6. Customer reviews
7. Specialty services
8. Company/about section
9. Feature/benefit icons
10. Best-selling sofa collection
11. Sofa/product features
12. Working process
13. Consultation/contact form
14. Contact information
15. Location information
16. Footer

These sections should be implemented as reusable components.

---

# 4. Target Users

## 4.1 Website Visitor

A normal customer visiting the website.

The visitor can:

* Browse sofas.
* View images.
* View prices.
* View services.
* View reviews.
* Contact the shop.
* Submit an inquiry.
* View location.

## 4.2 Shop Owner / Administrator

The owner manages website content through the dashboard.

The owner can:

* Add content.
* Edit content.
* Delete content.
* Upload images.
* Remove images.
* Change prices.
* Manage products.
* Manage reviews.
* Manage contact details.
* Manage homepage sections.

## 4.3 Review Customer

A customer may optionally submit a review.

A review can contain:

```text
Name
Rating
Review text
Profile picture (optional)
```

The review should preferably enter a **Pending** state before appearing publicly.

---

# 5. Website Navigation

The main navigation should contain links such as:

```text
Home
Sofas / Products
Services
About
Reviews
Contact
```

The exact navigation labels can be changed from the Admin Dashboard if required.

The header should also contain a prominent contact action such as:

```text
WhatsApp Us
```

or

```text
Contact Us
```

---

# 6. Homepage Requirements

## 6.1 Top Information Bar

The top bar may contain:

* Location
* Phone number
* Opening hours
* WhatsApp/contact information

Example:

```text
Serving Dubai | Open Today 9:00 AM - 10:00 PM | WhatsApp
```

The information should be manageable from the Admin Dashboard.

---

# 7. Header / Navigation

The header should contain:

* Shop logo
* Shop name
* Navigation menu
* WhatsApp/contact button
* Mobile menu button

The logo should be configurable from the Admin Dashboard.

Admin should be able to:

* Upload logo.
* Replace logo.
* Change shop name.
* Change navigation labels if implemented.
* Change WhatsApp number.

---

# 8. Hero Section

The hero section is the first major visual section.

It should support:

* Background image.
* Main heading.
* Small label/badge.
* Description.
* Primary button.
* Secondary button.

Example structure:

```text
[Badge]

Custom Sofa Beds &
Upholstery Solutions

Description...

[WhatsApp Us] [Call Now]
```

### Admin Controls

The administrator should be able to:

* Change hero image.
* Add/remove hero slides.
* Change heading.
* Change description.
* Change badge.
* Change button text.
* Change button destination.
* Reorder slides.
* Enable/disable slides.

---

# 9. Hero Image Slider / Carousel

The homepage should contain an image carousel/gallery.

Requirements:

* Multiple images.
* Previous button.
* Next button.
* Automatic sliding.
* Manual navigation.
* Responsive design.
* Touch/swipe support on mobile.
* Optional captions.
* Image ordering.

### Admin Features

Admin can:

* Upload image.
* Delete image.
* Replace image.
* Reorder images.
* Enable/disable image.
* Add caption.
* Set image title.

Example:

```text
Hero Slider

[Image 1]  Active
[Image 2]  Active
[Image 3]  Active
[Image 4]  Disabled

        + Add Image
```

---

# 10. Sofa Products / Catalogue

The website should have a product catalogue.

Each product should support:

```text
Product Name
Price
Main Image
Additional Images
Short Description
Full Description
Category
Available / Unavailable
Featured
Best Seller
Display Order
```

Example:

```text
Nebraska U-Shape

AED 4,200

Custom-made U-shaped sofa...

[View Details]
```

### Admin Product Management

Admin should be able to:

* Add product.
* Edit product.
* Delete product.
* Hide product.
* Show product.
* Change price.
* Change product name.
* Change description.
* Upload images.
* Remove images.
* Reorder images.
* Mark as featured.
* Mark as best seller.
* Assign category.

---

# 11. Product Image Gallery

Each sofa can have multiple images.

Example:

```text
Nebraska U-Shape

Main Image
Gallery Image 1
Gallery Image 2
Gallery Image 3
Gallery Image 4
```

Customers should be able to click the product and view its complete image gallery.

The gallery should support:

* Image zoom.
* Full-screen viewing.
* Previous/next navigation.
* Mobile swipe.

---

# 12. Services Section

The screenshot contains a section called:

**Our Dubai Specialty Services**

The website should support service cards.

Each service contains:

```text
Image
Title
Description
Features
Button
```

Example:

```text
Premium Sofa Beds

Professional sofa bed solutions...

✓ Custom sizes
✓ Premium materials
✓ Multiple designs
```

### Admin Controls

Admin can:

* Add service.
* Edit service.
* Delete service.
* Upload service image.
* Change title.
* Change description.
* Add/remove features.
* Change display order.
* Enable/disable service.

---

# 13. About / Why Choose Us Section

The screenshot contains a section similar to:

**Why Home Sofa Is Dubai's Trusted Sofa Factory**

This section should explain why customers should choose the shop.

Possible content:

* Years of experience.
* Custom manufacturing.
* Quality materials.
* Skilled workers.
* Custom sizes.
* Delivery.
* Upholstery expertise.

### Admin Controls

Admin should be able to edit:

* Heading.
* Description.
* Image.
* Bullet points.
* Button text.
* Button link.

---

# 14. Trust / Benefits Section

The screenshot contains several small benefit cards.

Examples:

```text
Top Rated on Maps
Custom Manufacturing
10+ Years Experience
Polish Design
Fast Turnaround
```

The actual values should not be hard-coded.

Admin should be able to manage these cards.

Each card:

```text
Icon
Title
Description
```

Admin can:

* Add.
* Edit.
* Delete.
* Reorder.
* Enable/disable.

---

# 15. Feature / Capability Section

The screenshot contains another icon-based section similar to:

```text
Smart Control
Smartphone
Voice Assistant
Remote Control
Automated Scheduling
```

This section can be adapted to the actual sofa business.

Possible sofa-related features:

```text
Custom Sizes
Premium Fabrics
Custom Colors
Professional Installation
Fast Delivery
Custom Designs
```

Admin should be able to manage these items.

---

# 16. Best-Selling Collection

The homepage should have a section such as:

**Our Best-Selling Collections**

Each product card should contain:

```text
Image
Product Name
Price
Optional short description
View Details button
```

Admin should control which products appear in this section.

A product can be marked:

```text
Best Seller = YES
```

The homepage automatically displays products marked as best sellers.

This avoids manually editing the homepage whenever a best-selling product changes.

---

# 17. Product Categories

The system should support product categories.

Possible categories:

```text
U-Shape Sofas
L-Shape Sofas
Sofa Beds
Corner Sofas
Outdoor Sofas
Custom Sofas
Recliner Sofas
```

Admin can:

* Add category.
* Edit category.
* Delete category.
* Change category image.
* Enable/disable category.

---

# 18. Sofa Features / Selling Points

The screenshot contains a feature strip such as:

```text
SMOOTH MECHANISMS
SOLID WOOD FRAMES
CUSTOM FABRICS
```

The new website can contain similar selling points.

Examples:

```text
Premium Materials
Solid Wood Frames
Custom Fabrics
Custom Dimensions
High Density Foam
Professional Upholstery
```

Admin can manage these items.

---

# 19. Working Process Section

The screenshot contains:

**OUR WORKING PROCESS**

The website should explain the process from customer inquiry to completion.

Recommended process:

```text
1. Contact Us
2. Discuss Requirements
3. Select Design & Materials
4. Manufacturing
5. Delivery / Installation
```

Each step should support:

```text
Icon
Step Number
Title
Description
```

Admin can modify the process.

---

# 20. Customer Reviews / Testimonials

This is one of the most important dynamic sections.

A review should contain:

```text
Customer Name
Rating
Review Text
Customer Image (optional)
Date
Status
```

Example:

```text
★★★★★

"Very good quality sofa and excellent service."

Ahmed

[Customer Photo]
```

## Review Status

Reviews should have:

```text
Pending
Approved
Rejected
```

### Why moderation is required

If anyone can immediately publish reviews, someone could submit:

```text
★★★★★
Fake review
```

or spam.

Therefore:

```text
Customer submits review
        ↓
Pending
        ↓
Admin reviews it
        ↓
Approve
        ↓
Appears on website
```

---

# 21. Public Review Submission

The website should have an option such as:

```text
Share Your Experience
```

Form:

```text
Name
Rating
Review
Photo (optional)

[Submit Review]
```

The customer photo must be optional.

The rating should preferably be:

```text
1 - 5 stars
```

The system should validate:

* Name required.
* Review required.
* Rating required.
* Image optional.
* Reasonable maximum review length.

---

# 22. WhatsApp Integration

A prominent WhatsApp button should be available on the homepage.

Possible locations:

* Header.
* Hero section.
* Floating bottom-right button.
* Contact section.

When clicked, it should open WhatsApp using the owner's configured number.

Example behavior:

```text
Website
   ↓
WhatsApp button
   ↓
WhatsApp
   ↓
Owner's configured number
```

The admin should be able to change:

```text
WhatsApp Number
Default Message
Button Text
```

Example default message:

```text
Hello, I am interested in your sofa products.
```

---

# 23. Important Security Rule for WhatsApp / Admin

The public WhatsApp button **must not be the method used to access the Admin Dashboard**.

Correct structure:

```text
Public Website
      ↓
WhatsApp Button
      ↓
Owner's WhatsApp
```

Separate:

```text
/admin
   ↓
Login
   ↓
Admin Dashboard
```

The admin route must require authentication.

---

# 24. Contact Information Management

The Admin Dashboard must contain a dedicated **Business Information** section.

Admin can change:

### WhatsApp

```text
WhatsApp Number
```

### Phone

```text
Phone Number
Secondary Phone
```

### Email

```text
Business Email
```

### Location

```text
Address
City
Country
Google Maps URL
Latitude/Longitude (optional)
```

### Opening Hours

```text
Monday
Tuesday
Wednesday
...
Sunday
```

Each day should support:

```text
Open
Closed
Opening Time
Closing Time
```

---

# 25. Contact Section

The homepage should contain:

```text
Get Your Free Consultation
```

The contact form should contain:

```text
Name
Phone
Email
Message
```

Optional:

```text
Preferred Sofa Type
Budget
Preferred Contact Method
```

Submit button:

```text
Send
```

---

# 26. Contact Request Management

If a backend/database is available, customer inquiries should be saved.

Admin dashboard:

```text
Contact Requests

Customer
Phone
Email
Message
Date
Status
```

Status:

```text
New
Contacted
Completed
Cancelled
```

Admin can open each inquiry and mark its status.

---

# 27. Contact Cards

The screenshot contains contact cards for:

```text
Phone
Email
Location
Timing
```

These should automatically use the information configured in the Admin Dashboard.

For example:

```text
Admin changes phone
        ↓
Database/config updated
        ↓
Homepage automatically shows new phone
```

No HTML editing should be necessary.

---

# 28. Google Maps / Location

The location section should support:

* Address.
* Google Maps link.
* Embedded map if required.
* "Get Directions" button.

Admin should be able to update the location.

---

# 29. Footer

The footer should contain:

```text
Shop Logo
Short Description
Navigation
Services
Contact Information
WhatsApp
Phone
Email
Location
Social Media
Copyright
```

Admin should be able to change relevant footer content.

---

# 30. Social Media

Admin should be able to configure social media links.

Possible platforms:

```text
Facebook
Instagram
TikTok
YouTube
Google Business Profile
```

Each social account can be:

```text
Enabled
Disabled
```

The website should not display empty social icons.

---

# 31. Admin Dashboard

The dashboard should have a sidebar.

Recommended structure:

```text
Dashboard

├── Overview
├── Products
├── Categories
├── Hero Slider
├── Gallery
├── Services
├── Testimonials
├── Reviews
├── Homepage Sections
├── Business Information
├── Contact Requests
├── Social Media
├── Media Library
└── Settings
```

---

# 32. Dashboard Overview

The dashboard home should display useful statistics.

Example:

```text
Products       42
Services       8
Reviews        36
Pending Reviews 4
Contact Requests 12
Homepage Images 10
```

This gives the owner a quick overview.

---

# 33. Media Library

Because the website is image-heavy, a dedicated media library is recommended.

Admin should be able to:

* Upload image.
* Preview image.
* Delete image.
* Search image.
* Copy image reference.
* See where an image is being used.

Example:

```text
Media Library

[ sofa-1.jpg ]
[ sofa-2.jpg ]
[ sofa-3.jpg ]
[ hero-1.jpg ]
```

This prevents the owner from uploading the same image repeatedly.

---

# 34. Homepage Section Management

Instead of hard-coding every homepage section, the dashboard should allow sections to be enabled/disabled.

Example:

```text
Homepage Sections

Hero                  ON
Product Gallery       ON
Benefits              ON
Reviews               ON
Services              ON
About                 ON
Best Sellers          ON
Working Process       ON
Consultation          ON
Contact               ON
```

The owner can turn a section off without modifying code.

---

# 35. Content Editing Principle

The website should separate **content** from **code**.

Bad approach:

```text
HTML
  ↓
Hard-coded product
  ↓
Hard-coded price
  ↓
Hard-coded image
```

Recommended approach:

```text
HTML/CSS/JS
      ↓
Reads website data
      ↓
Content data
      ↓
Admin changes content
```

Therefore the owner does not need a developer for normal content changes.

---

# 36. GitHub Pages Architecture

Because the requested website is based on HTML/CSS/JavaScript and GitHub Pages, the frontend can remain static.

Recommended architecture:

```text
                    ┌──────────────────┐
                    │   GitHub Pages   │
                    │  HTML/CSS/JS     │
                    └────────┬─────────┘
                             │
                             ↓
                    Public Website
                             │
                             │
                             ↓
                  ┌─────────────────────┐
                  │ Secure API / Server │
                  └──────────┬──────────┘
                             │
                             ↓
                       GitHub API
                             │
                             ↓
                    Repository Data
```

The admin dashboard should not expose a GitHub access token in browser JavaScript.

---

# 37. GitHub API Content Storage

If the GitHub API approach is selected, website content can be stored in structured files.

Example:

```text
/data
    products.json
    services.json
    reviews.json
    homepage.json
    business.json
    settings.json
```

The admin dashboard updates these files through a secure API.

Example:

```text
Admin changes price
        ↓
Save Changes
        ↓
API
        ↓
GitHub API
        ↓
products.json updated
        ↓
GitHub Pages
        ↓
Website reads new data
```

---

# 38. Image Storage Recommendation

Images require special consideration.

Do not store hundreds of large original images directly in the GitHub repository.

For a small website, GitHub can work for a limited number of optimized images.

For a growing catalogue, use dedicated image storage such as:

```text
Cloudinary
Supabase Storage
Cloudflare R2
```

The database/content file stores the image URL.

Example:

```text
Product
├── name
├── price
├── description
└── imageUrl
```

This is better for performance and repository size.

---

# 39. Admin Authentication

The Admin Dashboard must not be publicly editable.

Required:

```text
/admin
   ↓
Login
   ↓
Authenticated
   ↓
Dashboard
```

Minimum requirements:

* Username/email.
* Password.
* Secure authentication.
* Protected admin routes.
* Logout.
* Session expiration.

For a single-owner shop, one administrator account may be enough initially.

---

# 40. Admin CRUD Operations

Every major content type should support CRUD.

CRUD means:

```text
Create
Read
Update
Delete
```

Required for:

* Products.
* Categories.
* Services.
* Hero slides.
* Gallery images.
* Reviews.
* Testimonials.
* Benefits.
* Features.
* Working-process steps.

---

# 41. Delete Confirmation

Destructive actions must ask for confirmation.

Example:

```text
Delete Product?

Nebraska U-Shape

[Cancel] [Delete]
```

Images should also ask for confirmation before deletion.

---

# 42. Responsive Design

The website must work on:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

The admin dashboard should also be responsive.

The screenshot is desktop-oriented, but the actual implementation must not simply scale the desktop layout down.

Mobile navigation should use a hamburger menu.

---

# 43. Performance Requirements

Because the website contains many large sofa images, image optimization is important.

Requirements:

* Use compressed images.
* Use modern image formats where possible.
* Lazy-load images below the fold.
* Avoid loading every large image immediately.
* Use responsive image sizes.
* Avoid unnecessarily huge original files.

Recommended:

```text
WebP / AVIF
```

where supported by the image-storage system.

---

# 44. SEO Requirements

The public website should have:

* Proper page title.
* Meta description.
* Semantic HTML.
* Proper heading hierarchy.
* Image alt text.
* Open Graph metadata.
* Favicon.
* Sitemap.
* Robots.txt.
* Local business structured data where appropriate.

Product images should have meaningful alt text.

Example:

```text
Custom grey U-shaped sofa in Dubai
```

rather than:

```text
image123.jpg
```

---

# 45. Local Business Information

Since this is a physical store, the website should clearly communicate:

```text
Shop Name
Physical Address
City
Phone
WhatsApp
Email
Opening Hours
Google Maps
```

This is important because the website is primarily a **physical-store discovery and lead-generation website**, rather than an online checkout store.

---

# 46. Product Pricing

Products may display prices.

The admin should be able to:

```text
Set Price
Change Price
Hide Price
Show "Contact for Price"
```

This is useful because physical sofa prices may change based on:

* Size.
* Fabric.
* Material.
* Customization.
* Design.

Therefore the system should not assume every sofa has a permanently fixed price.

---

# 47. Product Availability

Each product should support:

```text
Available
Unavailable
Custom Order
```

The admin can change the status.

The customer should see the current status.

---

# 48. Inquiry Instead of Online Checkout

The first version does not require:

```text
Cart
Checkout
Online Payment
Order Processing
```

unless the business later decides to sell sofas online.

The primary conversion actions should be:

```text
WhatsApp
Call
Request Consultation
Visit Store
Get Directions
```

This matches the physical-store business model.

---

# 49. WhatsApp Message Generation

The website can automatically create a useful WhatsApp message.

For example, when a customer is viewing:

```text
Nebraska U-Shape
AED 4,200
```

and clicks:

```text
Ask on WhatsApp
```

WhatsApp can open with:

```text
Hello, I am interested in the Nebraska U-Shape sofa.
```

This reduces the amount of information the customer needs to type.

---

# 50. Review Moderation

Customer reviews should not automatically become public unless the owner chooses that behavior.

Recommended flow:

```text
Customer
   ↓
Submit Review
   ↓
Pending
   ↓
Admin Dashboard
   ↓
Approve / Reject
   ↓
Public Website
```

The admin should also be able to:

* Edit review.
* Delete review.
* Change rating.
* Remove customer image.
* Hide review.

---

# 51. Error Handling

The website should handle:

* Missing images.
* Failed API requests.
* Empty product lists.
* Empty reviews.
* Invalid forms.
* Failed uploads.
* Network failures.

Example:

If no products are available:

```text
Our sofa collection is currently being updated.
Please contact us on WhatsApp for available designs.
```

The website should not show broken layouts.

---

# 52. Admin Validation

The dashboard should validate input before saving.

Examples:

### Product price

Must be a valid number.

### Email

Must have valid email format.

### Phone

Must contain a valid phone number format.

### Image

Allowed file types:

```text
JPG
JPEG
PNG
WEBP
```

Maximum upload size should be enforced.

---

# 53. Data Structure

A simplified product structure could be:

```text
Product
{
    id,
    name,
    category,
    price,
    priceLabel,
    description,
    images[],
    status,
    featured,
    bestSeller,
    displayOrder
}
```

Review:

```text
Review
{
    id,
    customerName,
    rating,
    reviewText,
    image,
    status,
    createdAt
}
```

Business information:

```text
Business
{
    name,
    logo,
    phone,
    whatsapp,
    email,
    address,
    city,
    mapsUrl,
    openingHours
}
```

---

# 54. Theme / Color Scheme

The screenshot uses a strong **blue + white + black + light-gray** visual system.

Recommended theme:

### Primary Blue

```text
#496BAE
```

Used for:

* Buttons.
* Section elements.
* Cards.
* Important links.
* Admin controls.

### Dark Blue

```text
#304F88
```

Used for:

* Strong headings.
* Footer.
* Darker buttons.
* Important UI elements.

### Light Blue

```text
#67BDE0
```

Used as an accent for:

* Icons.
* Secondary highlights.
* Small UI elements.

### White

```text
#FFFFFF
```

Used as the primary background.

### Light Gray

```text
#F3F3F3
```

Used for:

* Alternate sections.
* Product areas.
* Background blocks.

### Black

```text
#050505
```

Used for:

* Review section.
* Strong contrast sections.
* Footer/secondary backgrounds.

### Text Gray

```text
#555555
```

Used for normal descriptions.

---

# 55. Visual Style

The design should follow these principles:

### Cards

Use:

* White background.
* Rounded corners.
* Light shadow.
* Clean borders.

### Buttons

Primary:

```text
Blue background
White text
Rounded corners
```

Secondary:

```text
Light/white background
Dark text
```

### Images

Sofa images should be the visual focus.

Avoid excessive text over images.

### Typography

Use a clean modern sans-serif font.

Possible choices:

```text
Poppins
Inter
Montserrat
```

A rounded modern font similar to the screenshot can be used for headings.

---

# 56. Homepage Visual Order

Recommended final homepage:

```text
1. Top Bar
        ↓
2. Header / Navigation
        ↓
3. Hero Slider
        ↓
4. Sofa Image Gallery
        ↓
5. Trust / Benefits
        ↓
6. Customer Reviews
        ↓
7. Specialty Services
        ↓
8. Why Choose Us
        ↓
9. Features / Benefits
        ↓
10. Best-Selling Sofas
        ↓
11. Sofa Materials / Features
        ↓
12. Working Process
        ↓
13. Consultation Form
        ↓
14. Contact Information
        ↓
15. Location / Map
        ↓
16. Footer
```

---

# 57. Admin Dashboard Homepage

Recommended dashboard:

```text
┌─────────────────────────────────────────────┐
│ Dashboard                                   │
├─────────────┬───────────────────────────────┤
│ Sidebar     │ Statistics                    │
│             │                               │
│ Dashboard   │ Products       42              │
│ Products    │ Services        8              │
│ Categories  │ Reviews        36              │
│ Hero        │ Pending         4              │
│ Gallery     │ Messages       12              │
│ Services    │                               │
│ Reviews     │ Recent Activity              │
│ Contact     │                               │
│ Business    │                               │
│ Settings    │                               │
└─────────────┴───────────────────────────────┘
```

---

# 58. Admin Product Page

Example:

```text
Products

[+ Add Product]

Search products...

------------------------------------------------

Image | Name | Category | Price | Status | Actions

      | Sofa A | U-Shape | AED 4,200 | Active | Edit

      | Sofa B | L-Shape | AED 3,800 | Active | Edit

      | Sofa C | Sofa Bed | Contact | Hidden | Edit
```

---

# 59. Admin Review Page

Example:

```text
Reviews

Pending Reviews: 4

Ahmed
★★★★★
"Excellent sofa and excellent service."

[Approve] [Reject] [Edit]

------------------------------------------------

Sara
★★★★★
"Very good quality."

[Approved]
```

---

# 60. Admin Business Information Page

This page should contain:

```text
Business Name
Logo
Phone
WhatsApp
Email
Address
City
Google Maps URL

Opening Hours

Monday      [09:00] - [22:00]
Tuesday     [09:00] - [22:00]
...

[Save Changes]
```

---

# 61. Admin Homepage Manager

A dedicated page should allow the owner to control homepage content.

Example:

```text
Homepage Manager

Hero Section             [Edit]
Hero Slider              [Manage]
Trust Cards              [Manage]
Reviews                  [Manage]
Services                 [Manage]
About Section            [Edit]
Best Sellers             [Manage]
Features                 [Manage]
Working Process          [Manage]
Consultation             [Edit]
Contact                  [Edit]
```

---

# 62. User Experience Requirements

The customer should be able to understand within a few seconds:

1. What the shop sells.
2. Where the shop is located.
3. What kind of sofas are available.
4. Why they should choose the shop.
5. How to contact the owner.

The primary CTA should therefore be highly visible:

```text
WhatsApp Us
```

and/or:

```text
Get a Free Consultation
```

---

# 63. Security Requirements

The following must never be exposed publicly:

* GitHub access token.
* Admin credentials.
* Private API credentials.
* Storage credentials.
* Database credentials.

The admin dashboard must use authenticated requests.

The GitHub token, if used, must be stored server-side.

---

# 64. Important Architecture Decision

There are two different concepts:

### Static Website

```text
HTML
CSS
JS
Images
```

This can be hosted directly on GitHub Pages.

### Dynamic Management

```text
Admin
Database/content
Image uploads
Authentication
```

GitHub Pages itself does not provide these backend capabilities.

Therefore the final system should use:

```text
GitHub Pages
+
Secure API/serverless function
+
Content storage
+
Image storage
```

The public website can still remain simple HTML/CSS/JS.

---

# 65. Future Features

The system should be designed so these can be added later:

```text
Online ordering
Shopping cart
Online payment
Customer accounts
Product comparison
Wishlist
Advanced search
Product filtering
WhatsApp lead tracking
Analytics
Google Analytics
Google Business integration
Multiple administrators
Inventory management
Order management
```

These are not required for Version 1.

---

# 66. Version 1 Scope

The first version should focus on:

### Public Website

* Responsive homepage.
* Hero slider.
* Sofa gallery.
* Product catalogue.
* Product details.
* Services.
* About section.
* Benefits.
* Best sellers.
* Reviews.
* Review submission.
* Consultation form.
* WhatsApp.
* Phone.
* Email.
* Location.
* Google Maps.
* Footer.

### Admin Dashboard

* Authentication.
* Dashboard overview.
* Product CRUD.
* Category CRUD.
* Image management.
* Hero slider management.
* Service management.
* Review moderation.
* Testimonial management.
* Homepage content management.
* Business information.
* WhatsApp management.
* Phone management.
* Email management.
* Location management.
* Contact request management.

---

# 67. What Should NOT Be Hard-Coded

The following should come from managed data:

```text
Product names
Product prices
Product images
Product descriptions
Hero images
Hero text
Services
Reviews
Testimonials
Business name
Phone
WhatsApp
Email
Address
Opening hours
Social links
Best sellers
Homepage feature cards
Working process
```

This is the key requirement that makes the website manageable by the shop owner.

---

# 68. Final System Flow

The complete system should work like this:

```text
                    CUSTOMER
                       │
                       ↓
                Public Website
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Products      Reviews     Contact
          │            │            │
          └────────────┼────────────┘
                       ↓
                  Secure API
                       ↑
                       │
                Admin Dashboard
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
     Products        Reviews        Images
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                 Content Storage
                       │
                       ↓
                  Public Website
```

---

# 69. Final Recommendation

For this particular business, **do not build a full e-commerce system in Version 1**.

The shop is physical, so the website's primary purpose should be:

```text
SHOW SOFAS
    ↓
BUILD TRUST
    ↓
SHOW LOCATION
    ↓
GET CUSTOMER INTEREST
    ↓
WHATSAPP / CALL / VISIT STORE
```

The Admin Dashboard is the important dynamic part.

The owner should be able to change the website without touching the source code:

```text
Change sofa image
        ↓
Save Changes
        ↓
Website updated

Change price
        ↓
Save Changes
        ↓
Website updated

Add sofa
        ↓
Save Changes
        ↓
Website updated

Approve review
        ↓
Approve
        ↓
Review appears on website
```

This gives you a **simple static-style frontend with a manageable CMS**, instead of turning the entire project into a large e-commerce application.
