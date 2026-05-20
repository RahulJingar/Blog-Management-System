const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    metaTitle: String,
    metaDescription: String,
    featureImage: String,
    tags: [String],
    categories: [String],
    faq: [{ question: String, answer: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
