const router = require('express').Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getCategories);
router.post('/', protect, authorize('superadmin', 'editor'), createCategory);
router.put('/:id', protect, authorize('superadmin', 'editor'), updateCategory);
router.delete('/:id', protect, authorize('superadmin'), deleteCategory);

module.exports = router;
