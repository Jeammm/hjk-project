const express = require("express");

const settings = require("../services/category");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getBannerSettings = catchAsync(async (req, res, next) => {
  const result = await settings.getBannerSettings();
  const data = result;
  res.status(200).json({
    status: "success",
    data,
  });
});
