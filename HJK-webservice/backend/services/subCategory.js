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
    WHERE SubCategory = ${subCategory}
    LIMIT ${offset},${config.listPerPage}`
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
    WHERE SubCategoryID = ${subcategoryId}`
  );
  return {
    rows,
  };
};

exports.checkSubCategory = async (categoryId, subCategoryId) => {
  const rows = await db.query(
    `SELECT *
    FROM SubCategory
    WHERE CategoryID = ${categoryId} AND SubCategoryID = ${subCategoryId}`
  );
  return {
    rows,
  };
};

exports.getAllSubCategory = async (param, p) => {
  const offset = helper.getOffset(p, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM SubCategory 
    WHERE CategoryID = ${param}
    LIMIT ${offset},${config.listPerPage};`
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
      ("${id}", "${subCategoryData.SubNameTH}", "${subCategoryData.SubNameEN}", "${subCategoryData.Thumbnail}")`
    );
    return "New Sub-Category created successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editSubCategory = async (id, subCategoryData) => {
  const updateQuery = query_gen(subCategoryData);

  try {
    const result = await db.query(
      `UPDATE SubCategory 
      SET ${updateQuery}
      WHERE SubCategoryID="${id}"`
    );
    return "Sub-Category updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};
