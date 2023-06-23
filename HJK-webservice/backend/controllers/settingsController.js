const express = require("express");

const settings = require("../services/settings");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getBannerSettings = catchAsync(async (req, res, next) => {
  const result = await settings.getBannerSettings(req.headers.role);
  const data = result;
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.addBanner = catchAsync(async (req, res, next) => {
  const result = await settings.addBanner(req.body);
  const data = result;
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const result = await settings.deleteBanner(req.body.id);
  const data = result;
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.selectBanner = catchAsync(async (req, res, next) => {
  const result = await settings.selectBanner(req.body);
  const data = result;
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.unselectBanner = catchAsync(async (req, res, next) => {
  const result = await settings.unselectBanner(req.body.id);
  const data = result;
  res.status(200).json({
    status: "success",
    data,
  });
});
