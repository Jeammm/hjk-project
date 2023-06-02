const express = require("express");

const subCategory = require("../services/subCategory");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getSubName = catchAsync(async (req, res, next) => {
  const result = await subCategory.getSubName(req.params.subCategoryId);
  const data = result.rows;
  if (data.length === 0) {
    return next(new AppError("No Category found with prodivded ID", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.checkSubCategory = catchAsync(async (req, res, next) => {
  const result = await subCategory.checkSubCategory(
    req.params.categoryId,
    req.params.subCategoryId
  );

  const data = result.rows;
  if (data.length === 0) {
    return next(new AppError("No Sub-Category found with prodivded ID", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllSubCategory = catchAsync(async (req, res, next) => {
  const result = await subCategory.getAllSubCategory(
    req.params.categoryId,
    req.query.page
  );
  const data = result.rows;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllItemBySub = catchAsync(async (req, res, next) => {
  const result = await subCategory.getAllProducts(
    req.params.subCategoryId,
    req.query.page
  );
  const data = result.data;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createSubCategory = catchAsync(async (req, res, next) => {
  const result = await subCategory.createSubCategory(
    req.params.categoryId,
    req.body
  );
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.editSubCategory = catchAsync(async (req, res, next) => {
  const result = await subCategory.editSubCategory(
    req.params.subCategoryId,
    req.body
  );
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});
