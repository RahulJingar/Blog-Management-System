const router = require("express").Router();
const { getUsers, updateUser, deleteUser } = require("../controller/userManage");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect, authorize("superadmin"));
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
