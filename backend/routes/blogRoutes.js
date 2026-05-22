const router = require("express").Router();
const {
  getBlogs, getAdminBlogs, getBlogById, getBlogBySlug,
  createBlog, updateBlog, deleteBlog, getCategories, getTags,
} = require("../controller/blog");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public — static routes FIRST (before /:slug)
router.get("/", getBlogs);
router.get("/categories", getCategories);
router.get("/tags", getTags);

// Protected admin routes
router.get("/admin/all", protect, authorize("superadmin", "editor", "author"), getAdminBlogs);
router.get("/admin/:id", protect, authorize("superadmin", "editor", "author"), getBlogById);
router.post("/", protect, authorize("superadmin", "editor", "author"), createBlog);
router.put("/:id", protect, authorize("superadmin", "editor", "author"), updateBlog);
router.delete("/:id", protect, authorize("superadmin", "editor", "author"), deleteBlog);

// Public dynamic route LAST
router.get("/:slug", getBlogBySlug);

module.exports = router;
