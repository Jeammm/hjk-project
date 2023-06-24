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
    WHERE CategoryID = ?`,
    [categoryId]
  );
  return {
    rows,
  };
};

exports.createCategory = async (categoryData) => {
  try {
    const result = await db.query(
      `INSERT INTO Category 
      (CategoryTH, CategoryEN, Thumbnail) 
      VALUES 
      (?, ?, ?)`,
      [
        categoryData.CategoryTH,
        categoryData.CategoryEN || null,
        categoryData.Thumbnail || null,
      ]
    );

    return "New Category created successfully";
  } catch (err) {
    throw new AppError(err, 409);
  }
};

exports.editCategory = async (id, categoryData) => {
  try {
    const result = await db.query(
      `UPDATE Category 
      SET 
        CategoryTH = ?, 
        CategoryEN = ?,
        Thumbnail = ?
      WHERE CategoryID = ?`,
      [
        categoryData.CategoryTH,
        categoryData.CategoryEN || null,
        categoryData.Thumbnail || null,
        id,
      ]
    );

    return "Category data updated successfully";
  } catch (err) {
    throw new AppError(err, 409);
  }
};

exports.search = async (q) => {
  const queryStrings = q.split(" "); // Array of query strings
  const conditions = [];
  const param = [];

  queryStrings.forEach((queryString) => {
    conditions.push(
      `(
        CategoryTH LIKE ? 
        OR CategoryEN LIKE ? 
        OR CategoryID LIKE ? 
      )`
    );
    param.push(`%${queryString}%`, `%${queryString}%`, `%${queryString}%`);
  });

  const category = await db.query(
    `
    SELECT *
    FROM Category
    WHERE ${conditions.join(" OR ")}
    `,
    // [`%${q}%`, `%${q}%`, `%${q}%`, `${offset}`, `${config.listPerPage}`]
    param
  );

  return {
    category,
  };
};
