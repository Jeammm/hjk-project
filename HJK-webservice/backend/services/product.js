const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const query_gen = (data) => {
  const keys = Object.keys(data);
  let updateQuery = "";

  keys.forEach((key, index) => {
    if (index !== 0) {
      updateQuery += ", ";
    }
    updateQuery += `${key}="${data[key]}"`;
  });

  return updateQuery;
};

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

exports.getProductByName = async (productName) => {
  const product = await db.query(
    `SELECT * 
    FROM Product 
    WHERE NameTH = "${productName}"`
  );

  return {
    product
  }
}

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

exports.createProduct = async (id, productData) => {
  const keys = Object.keys(productData);
  const values = [];
  keys.forEach((key) => {
    values.push(`"${productData[key]}"`);
  });

  try {
    const result = await db.query(
      `INSERT INTO Product 
      (${keys.join(", ")}, SubCategory)
      VALUES 
      ( ${values.join(", ")}, "${id}")`
    );

    return "New product detail inserted successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editProduct = async (id, productData) => {
  const updateQuery = query_gen(productData);

  try {
    const result = await db.query(
      `UPDATE Product
      SET ${updateQuery}
      WHERE ProductID="${id}"`
    );
    return "Product data updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editSize = async (id, sizeData) => {
  const checkIfRowExists = async (key, id) => {
    const result = await db.query(`
    SELECT *
    FROM Size
    WHERE ProductID = "${id}" AND SizeID = "${key}"
    `);
    return result;
  };

  const updateRow = async (id, key, sizeData) => {
    const updateQuery = query_gen(sizeData);
    
    result = await db.query(
      `UPDATE Size
      SET ${updateQuery}
      WHERE ProductID="${id}" AND SizeID="${key}"`
    );
    return result.row;
  };

  const insertRow = async (id, key, sizeData) => {

    const result = await db.query(`
      INSERT INTO Size 
      (ProductID, SizeID, Des, Packing, Price)
      VALUES 
      ("${id}", ${key}, "${sizeData.Des}", "${sizeData.Packing}" ,"${sizeData.Price}")
      `);
  };

  try {
    for (const key in sizeData) {
      const rowExists = await checkIfRowExists(key, id);

      if (rowExists.length !== 0) {
        updateRow(id, key, sizeData[key]);
      } else {
        insertRow(id, key, sizeData[key]);
      }
    }
    return "Product data updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
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
