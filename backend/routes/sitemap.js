const router = require('express').Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).select('slug updatedAt');
    const baseUrl = 'http://localhost:3000';
    const urls = blogs.map(b => `
  <url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <lastmod>${b.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><priority>1.0</priority></url>
  <url><loc>${baseUrl}/blogs</loc><priority>0.9</priority></url>
  ${urls}
</urlset>`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
