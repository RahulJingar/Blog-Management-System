const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "" },

    // SEO
    metaTitle: { type: String, maxlength: 70, default: "" },
    metaDescription: { type: String, maxlength: 160, default: "" },
    canonicalUrl: { type: String, default: "" },
    featureImage: { type: String, default: "" },

    // Open Graph
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },

    // Twitter Card
    twitterTitle: { type: String, default: "" },
    twitterDescription: { type: String, default: "" },
    twitterImage: { type: String, default: "" },

    // Taxonomy
    tags: [{ type: String }],
    categories: [{ type: String }],

    // FAQ (schema.org ready)
    faqs: [{ question: String, answer: String }],

    // Links
    internalLinks: [{ text: String, url: String }],
    externalLinks: [{ text: String, url: String }],

    // Table of Contents
    tableOfContents: [{ id: String, text: String, level: Number }],

    // Relations
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    relatedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],

    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
