const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settingsController");

const authController = require("../controllers/authController");

router
  .route("/banner")
  .get(settingsController.getBannerSettings)
  .post(authController.protect, settingsController.addBanner)
  .delete(authController.protect, settingsController.deleteBanner)
  .put(authController.protect, settingsController.selectBanner)
  .patch(authController.protect, settingsController.unselectBanner);
// .post(authController.protect, categoryController.createCategory);

module.exports = router;