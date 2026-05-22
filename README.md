# 📝 BlogPlatform — MERN Stack Blog Management System

A production-ready blog platform with JWT authentication, role-based access control, SEO optimization, and server-side rendering.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT |
| Admin Panel | React.js (Vite), React Router, Axios |
| Frontend | Next.js (SSR), ReactMarkdown |
| Auth | JWT + bcryptjs |

---

## 👥 Role Permissions

| Role | Permissions |
|------|-------------|
| **Super Admin** | Full access — users, all blogs, SEO, settings |
| **Author** | Create & manage own blogs only |
| **Viewer** | Read-only dashboard access |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd RewathiProject
```

### 2. Backend Setup
```bash
cd backend
npm install
# .env is already configured
npm run seed       # Seeds DB with users + sample blog
npm run dev        # Starts on http://localhost:5000
```

### 3. Admin Panel Setup
```bash
cd client
npm install
npm run dev        # Starts on http://localhost:5173
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:3000
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@blog.com | password123 |
| Author | author@blog.com | password123 |
| Viewer | viewer@blog.com | password123 |

---

## 📡 API Documentation

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login & get JWT |
| GET | `/api/auth/me` | Yes | Get current user |

### Blogs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/blogs` | No | Get published blogs (paginated) |
| GET | `/api/blogs/categories` | No | Get all categories |
| GET | `/api/blogs/tags` | No | Get all tags |
| GET | `/api/blogs/admin/all` | Yes | Get all blogs (admin) |
| GET | `/api/blogs/admin/:id` | Yes | Get single blog by ID |
| GET | `/api/blogs/:slug` | No | Get blog by slug |
| POST | `/api/blogs` | Yes | Create blog |
| PUT | `/api/blogs/:id` | Yes | Update blog |
| DELETE | `/api/blogs/:id` | Yes | Delete blog |

### Users (Super Admin only)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users` | SuperAdmin | Get all users |
| PUT | `/api/users/:id` | SuperAdmin | Update user role/status |
| DELETE | `/api/users/:id` | SuperAdmin | Delete user |

### Upload
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/upload` | Yes | Upload image (multipart/form-data) |

---

## 🔍 SEO Features Implemented

- ✅ Meta Title & Description per blog
- ✅ SEO-friendly URL slugs (auto-generated, duplicate-safe)
- ✅ Canonical URL support
- ✅ Open Graph tags (og:title, og:description, og:image, og:url)
- ✅ Twitter Card data
- ✅ JSON-LD structured data (BlogPosting schema)
- ✅ FAQ schema (FAQPage JSON-LD)
- ✅ Table of Contents (auto-generated)
- ✅ Server-Side Rendering via Next.js
- ✅ Sitemap at `/api/sitemap`
- ✅ Robots.txt at `/api/robots`
- ✅ Feature image support
- ✅ Tags & Categories

---

## 🗂️ Folder Structure

```
RewathiProject/
├── backend/
│   ├── controller/         # Auth, Blog, User logic
│   ├── middleware/         # JWT protect + RBAC authorize
│   ├── model/              # User & Blog Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── uploads/            # Uploaded images
│   ├── seed.js             # Database seeder
│   └── server.js           # Express app entry point
│
├── client/                 # React Admin Panel (Vite)
│   └── src/
│       ├── api/            # Axios instance
│       ├── context/        # AuthContext (JWT state)
│       ├── components/     # Layout, Sidebar, ProtectedRoute
│       └── pages/admin/    # Dashboard, BlogList, BlogEditor, Users
│
├── frontend/               # Next.js Public Website
│   ├── components/         # Navbar, BlogCard, SEOHead
│   ├── lib/                # API helper functions
│   ├── pages/              # index, blog/[slug], category, tag, author
│   └── styles/             # CSS modules
│
└── README.md
```

---

## 🎁 Bonus Features

- ✅ Markdown rich text editor (@uiw/react-md-editor)
- ✅ Blog preview mode
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Image upload with Multer
- ✅ SEO preview in editor (Google-style)
