const Blog = require("../model/blog");

const makeSlug = async (title, excludeId = null) => {
  let slug = title.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  let exists = await Blog.findOne({ slug, _id: { $ne: excludeId } });
  let i = 1;
  while (exists) {
    slug = `${slug}-${i++}`;
    exists = await Blog.findOne({ slug, _id: { $ne: excludeId } });
  }
  return slug;
};

// GET /api/blogs  (public - published only)
exports.getBlogs = async (req, res) => {
  try {
    const { category, tag, author, page = 1, limit = 10 } = req.query;
    const filter = { status: "published" };
    if (category) filter.categories = category;
    if (tag) filter.tags = tag;
    if (author) filter.author = author;
    const blogs = await Blog.find(filter)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-content");
    const total = await Blog.countDocuments(filter);
    res.json({ blogs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/blogs/admin/all  (protected)
exports.getAdminBlogs = async (req, res) => {
  try {
    const filter = ["superadmin", "editor"].includes(req.user.role) ? {} : { author: req.user._id };
    const blogs = await Blog.find(filter).populate("author", "name email").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/blogs/admin/:id  (protected - for edit page)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/blogs/:slug  (public)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: "published" })
      .populate("author", "name email avatar")
      .populate("relatedBlogs", "title slug featureImage");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/blogs  (protected)
exports.createBlog = async (req, res) => {
  try {
    const slug = await makeSlug(req.body.title);
    const blog = await Blog.create({ ...req.body, slug, author: req.user._id });
    res.status(201).json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/blogs/:id  (protected)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (req.user.role === "author" && blog.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "You can only edit your own blogs" });
    if (req.body.title && req.body.title !== blog.title)
      req.body.slug = await makeSlug(req.body.title, blog._id);
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/blogs/:id  (protected)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (req.user.role === "author" && blog.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "You can only delete your own blogs" });
    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/blogs/categories  (public)
exports.getCategories = async (req, res) => {
  try {
    const cats = await Blog.distinct("categories", { status: "published" });
    res.json(cats);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/blogs/tags  (public)
exports.getTags = async (req, res) => {
  try {
    const tags = await Blog.distinct("tags", { status: "published" });
    res.json(tags);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
