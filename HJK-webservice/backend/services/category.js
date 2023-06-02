const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const AppError = require("../utils/AppError");

const { query_gen } = require("../utils/query_gen");

exports.getAllCategory = async () => {
  const rows = await db.query(
    `SELECT *
    FROM Category`
  );
  return {
    rows,
  };
};

exports.checkCategory = async (categoryId) => {
  const rows = await db.query(
    `SELECT *
    FROM Category
    WHERE CategoryID = ${categoryId}`
  );
  return {
    rows,
  };
};

exports.createCategory = async (categoryData) => {
  try {
    const result = await db.query(
      `INSERT INTO Category 
      (CategoryTH, CategoryEN) 
      VALUES 
      ("${categoryData.CategoryTH}", "${categoryData.CategoryEN}")`
    );

    return "New Category created successfully";
  } catch (err) {
    throw new AppError(err, 409);
  }
};

exports.editCategory = async (id, categoryData) => {
  const updateQuery = query_gen(categoryData);

  try {
    const result = await db.query(
      `UPDATE Category 
      SET ${updateQuery}
      WHERE CategoryID=${id}`
    );

    return "Category data updated successfully";
  } catch (err) {
    throw new AppError(err, 409);
  }
};
