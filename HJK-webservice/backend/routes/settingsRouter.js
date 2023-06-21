const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settingsController");

const authController = require("../controllers/authController");

router
  .route("/banner")
  .get(authController.protect, settingsController.getBannerSettings)
  // .post(authController.protect, categoryController.createCategory);
