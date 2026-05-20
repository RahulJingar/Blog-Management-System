const router = require('express').Router();
const { getTags, createTag, deleteTag } = require('../controllers/tagController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTags);
router.post('/', protect, authorize('superadmin', 'editor', 'author'), createTag);
router.delete('/:id', protect, authorize('superadmin', 'editor'), deleteTag);

module.exports = router;
