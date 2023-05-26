const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const query_gen = (data) => {
  const keys = Object.keys(data);
  let updateQuery = "";

  keys.forEach((key, index) => {
    if (index !== 0) {
      updateQuery += ', ';
    }
    updateQuery += `${key}="${data[key]}"`;
  });

  return updateQuery;
}

exports.getMultiple = async (subCategory, page = 1) => {
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

exports.getProduct = async (productId) => {
  const product = await db.query(
    `SELECT * 
    FROM Product 
    WHERE ProductID = ${productId}`
  );

  const size = await db.query(
    `SELECT * 
    FROM Size 
    WHERE ProductID = ${productId}`
  );

  return {
    product,
    size,
  };
};

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

exports.getAllBrands = async () => {
  const rows = await db.query(
    `SELECT *
    FROM Brand`
  );
  return {
    rows,
  };
};

exports.getBrandItem = async (brandId) => {
  const rows = await db.query(
    `SELECT *
    FROM Product
    WHERE Brand = ${brandId}`
  );
  return {
    rows,
  };
};

exports.getAllSubCategory = async (param) => {
  const rows = await db.query(
    `SELECT *
    FROM SubCategory 
    WHERE CategoryID = ${param}`
  );
  return {
    rows,
  };
};

exports.createCategory = async (categoryData) => {
  
  const result = await db.query(
    `INSERT INTO Category 
    (CategoryTH, CategoryEN) 
    VALUES 
    ("${categoryData.CategoryTH}", "${categoryData.CategoryEN}")`
  );

  let message = "Error in creating new category";

  if (result.affectedRows) {
    message = "New Category created successfully";
  }

  return { message };
};

exports.editCategory = async (id, categoryData) => {
  const updateQuery= query_gen(categoryData);
  
  const result = await db.query(
    `UPDATE Category 
    SET ${updateQuery}
    WHERE CategoryID=${id}`
  );

  let message = "Error in updating category data";

  if (result.affectedRows) {
    message = "Category data updated successfully";
  }

  return { message };
};

exports.createSubCategory = async (id, subCategoryData) => {

  const result = await db.query(
    `INSERT INTO SubCategory 
    (CategoryID, SubNameTH, SubNameEN, Thumbnail) 
    VALUES 
    ("${id}", "${subCategoryData.SubNameTH}", "${subCategoryData.SubNameEN}", "${subCategoryData.Thumbnail}")`
  );

  let message = "Error in creating new sub-category";

  if (result.affectedRows) {
    message = "New Sub-Category created successfully";
  }

  return { message };
};

exports.editSubCategory = async (id, subCategoryData) => {

  const updateQuery= query_gen(subCategoryData);

  const result = await db.query(
    `UPDATE SubCategory 
    SET ${updateQuery}
    WHERE SubCategoryID="${id}"`
  );

  let message = "Error in updating category data";

  if (result.affectedRows) {
    message = "Category data updated successfully";
  }

  return { message };
};

exports.createProduct = async (id, productData) => {

  const keys = Object.keys(productData);

  const values = [];

  keys.forEach((key) => {
    values.push(`"${productData[key]}"`);
  });

  console.log(keys, values)

  const result = await db.query(
    `INSERT INTO Product 
    (${keys.join(", ")}, SubCategory)
    VALUES 
    ( ${values.join(", ")}, "${id}")`
  );

  let message = "Error in creating new product";

  if (result.affectedRows) {
    message = "New product created successfully";
  }

  return { message };
};

exports.editProduct = async (id, productData) => {

  const updateQuery= query_gen(productData);

  const result = await db.query(
    `UPDATE Product
    SET ${updateQuery}
    WHERE ProductID="${id}"`
  );

  let message = "Error in updating product data";

  if (result.affectedRows) {
    message = "Product data updated successfully";
  }

  return { message };
};

exports.remove = async (id) => {
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=${id}`
  );

  let message = "Error in deleting programming language";

  if (result.affectedRows) {
    message = "Programming language deleted successfully";
  }

  return { message };
};

// module.exports = {
//   getMultiple,
//   getAllCategory,
//   getAllSubCategory,
//   getOneProduct,
//   create,
//   update,
//   remove,
// };
