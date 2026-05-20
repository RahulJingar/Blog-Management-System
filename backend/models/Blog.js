const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },

  // SEO Fields
  metaTitle: { type: String },
  metaDescription: { type: String },
  canonicalUrl: { type: String },
  featureImage: { type: String },
  ogTitle: { type: String },
  ogDescription: { type: String },
  ogImage: { type: String },
  twitterTitle: { type: String },
  twitterDescription: { type: String },
  twitterImage: { type: String },

  // Content Structure
  tableOfContents: [{ id: String, text: String, level: Number }],
  faq: [{ question: String, answer: String }],
  internalLinks: [{ text: String, url: String }],
  externalLinks: [{ text: String, url: String }],

  // Relations
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
