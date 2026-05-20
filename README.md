# Blog Management System

A production-ready blog platform with Authentication, Role-Based Access Control, and SEO optimization.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT
- **Admin Panel**: React.js
- **Frontend**: Next.js (SSR for SEO)

## Role Permissions

| Role | Permissions |
|------|-------------|
| Super Admin | Full access: users, blogs, SEO, settings |
| Editor | Create & edit all blogs, manage categories/tags |
| Author | Create & manage own blogs only |
| Viewer | Read-only (public frontend only) |

## Setup Steps

### 1. Backend
```bash
cd backend
npm install
# Make sure MongoDB is running on mongodb://localhost:27017/blogProject
npm run dev
# Seed superadmin:
node seed.js
```

### 2. Admin Panel
```bash
cd admin-panel
npm install --legacy-peer-deps
npm start
# Runs on http://localhost:3001
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## Default Login
- Email: `admin@blog.com`
- Password: `admin123`

## API Documentation

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |

### Blogs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/blogs | Public | Get all blogs |
| GET | /api/blogs/slug/:slug | Public | Get blog by slug |
| GET | /api/blogs/:id | Protected | Get blog by ID |
| POST | /api/blogs | superadmin/editor/author | Create blog |
| PUT | /api/blogs/:id | superadmin/editor/author | Update blog |
| DELETE | /api/blogs/:id | superadmin/editor/author | Delete blog |
| POST | /api/blogs/upload/image | Protected | Upload image |

### Users (Super Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| PUT | /api/users/:id | Update user role/status |
| DELETE | /api/users/:id | Delete user |

### Categories & Tags
- GET/POST/PUT/DELETE `/api/categories`
- GET/POST/DELETE `/api/tags`

### Sitemap
- GET `/api/sitemap` - XML sitemap

## SEO Features
- Meta Title & Description per blog
- Canonical URLs
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card data
- JSON-LD structured data (Article + FAQ schema)
- Auto-generated Table of Contents
- FAQ section with schema markup
- SEO-friendly URL slugs
- XML Sitemap generation
- robots.txt
- Server-Side Rendering (Next.js) for all public pages

## MongoDB Schema

### User
- name, email, password (hashed), role, status, timestamps

### Blog
- title, slug, content, excerpt
- metaTitle, metaDescription, canonicalUrl
- featureImage, ogTitle, ogDescription, ogImage
- twitterTitle, twitterDescription, twitterImage
- tableOfContents, faq, internalLinks, externalLinks
- tags[], categories[], author, status, views, timestamps

### Category
- name, slug, description

### Tag
- name, slug
