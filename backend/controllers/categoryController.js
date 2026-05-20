const Category = require('../models/Category');
const slugify = require('slugify');

exports.getCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const slug = slugify(req.body.name, { lower: true, strict: true });
    const cat = await Category.create({ ...req.body, slug });
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
