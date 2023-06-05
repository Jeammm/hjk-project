const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const AppError = require("../utils/AppError");

const { query_gen } = require("../utils/query_gen");

exports.getAllProducts = async (subCategory, page = 1) => {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT * 
    FROM Product 
    WHERE SubCategory = ?
    LIMIT ?, ?`,
    [subCategory, `${offset}`, `${config.listPerPage}`]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
};

exports.getSubName = async (subcategoryId) => {
  const rows = await db.query(
    `SELECT *
    FROM SubCategory
    WHERE SubCategoryID = ?`,
    [subcategoryId]
  );
  return {
    rows,
  };
};

exports.checkSubCategory = async (categoryId, subCategoryId) => {
  const rows = await db.query(
    `SELECT *
    FROM 
      SubCategory
    WHERE 
      CategoryID = ? AND SubCategoryID = ?`,
    [categoryId, subCategoryId]
  );
  return {
    rows,
  };
};

exports.getAllSubCategory = async (categoryId, p = 1) => {
  const offset = helper.getOffset(p, config.listPerPage);

  const rows = await db.query(
    `SELECT *
    FROM SubCategory 
    WHERE CategoryID = ?
    LIMIT ?, ?;`,
    [categoryId, `${offset}`, `${config.listPerPage}`]
  );
  return {
    rows,
  };
};

exports.createSubCategory = async (id, subCategoryData) => {
  try {
    const result = await db.query(
      `INSERT INTO SubCategory 
      (CategoryID, SubNameTH, SubNameEN, Thumbnail) 
      VALUES 
      (?, ?, ?, ?)`,
      [
        id,
        subCategoryData.SubNameTH,
        subCategoryData.SubNameEN || null,
        subCategoryData.Thumbnail || null,
      ]
    );
    return "New Sub-Category created successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editSubCategory = async (id, subCategoryData) => {
  try {
    const result = await db.query(
      `UPDATE SubCategory 
      SET 
        SubNameTH = ?, 
        SubNameEN = ?, 
        Thumbnail = ?
      WHERE SubCategoryID = ?`,
      [
        subCategoryData.SubNameTH,
        subCategoryData.SubNameEN || null,
        subCategoryData.Thumbnail || null,
        id,
      ]
    );
    return "Sub-Category updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};
