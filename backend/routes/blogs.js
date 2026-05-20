const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { getBlogs, getBlogBySlug, getBlogById, createBlog, updateBlog, deleteBlog, uploadImage } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Public
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);

// Protected
router.get('/:id', protect, getBlogById);
router.post('/', protect, authorize('superadmin', 'editor', 'author'), createBlog);
router.put('/:id', protect, authorize('superadmin', 'editor', 'author'), updateBlog);
router.delete('/:id', protect, authorize('superadmin', 'editor', 'author'), deleteBlog);
router.post('/upload/image', protect, upload.single('image'), uploadImage);

module.exports = router;
