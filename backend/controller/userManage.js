const User = require("../model/user");

// GET /api/users  (superadmin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/users/:id  (superadmin only)
exports.updateUser = async (req, res) => {
  try {
    const { name, role, status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id, { name, role, status }, { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/users/:id  (superadmin only)
exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString())
      return res.status(400).json({ message: "Cannot delete yourself" });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
