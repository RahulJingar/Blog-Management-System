const Blog = require('../models/Blog');
const slugify = require('slugify');

const makeSlug = async (title, id = null) => {
  let slug = slugify(title, { lower: true, strict: true });
  const query = id ? { slug, _id: { $ne: id } } : { slug };
  const exists = await Blog.findOne(query);
  if (exists) slug = `${slug}-${Date.now()}`;
  return slug;
};

exports.getBlogs = async (req, res) => {
  try {
    const { status, category, tag, author, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.categories = category;
    if (tag) filter.tags = tag;
    if (author) filter.author = author;

    const blogs = await Blog.find(filter)
      .populate('author', 'name email')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Blog.countDocuments(filter);
    res.json({ blogs, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name email avatar')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const slug = await makeSlug(req.body.title);
    const blog = await Blog.create({ ...req.body, slug, author: req.user._id });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Author can only edit own blogs
    if (req.user.role === 'author' && blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    if (req.body.title && req.body.title !== blog.title) {
      req.body.slug = await makeSlug(req.body.title, req.params.id);
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (req.user.role === 'author' && blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
