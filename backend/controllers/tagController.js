const Tag = require('../models/Tag');
const slugify = require('slugify');

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTag = async (req, res) => {
  try {
    const slug = slugify(req.body.name, { lower: true, strict: true });
    const tag = await Tag.create({ ...req.body, slug });
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
