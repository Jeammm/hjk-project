const express = require("express");

const category = require("../services/category");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const result = await category.getAllCategory();
  const data = result.rows;
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.checkCategory = catchAsync(async (req, res, next) => {
  const result = await category.checkCategory(req.params.categoryId);
  const data = result.rows;
  if (data.length === 0) {
    return next(new AppError("No Category found with prodivded ID", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const result = await category.createCategory(req.body);

  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.editCategory = catchAsync(async (req, res, next) => {
  const result = await category.editCategory(req.params.categoryId, req.body);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});
