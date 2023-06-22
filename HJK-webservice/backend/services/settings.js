const db = require("./db");

const config = require("../config");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getBannerSettings = async () => {
  return await db.query(
    `SELECT * 
      FROM 
        Banner`
  );
};

exports.addBanner = async (bannerData) => {
  try {
    const result = await db.query(
      `INSERT INTO Banner 
      (BannerURL, BannerDes)
      VALUES 
      (?, ?)`,
      [bannerData.BannerURL || null, bannerData.BannerDes || null]
    );

    return "New banner inserted successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.deleteBanner = async (id) => {
  try {
    const result = await db.query(
      `
      DELETE FROM 
        Banner
      WHERE
        BannerID = ?`,
      [id]
    );
    return "Banner deleted successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.selectBanner = async (selected) => {
  const c = [];

  selected.forEach((b, i) => {
    c.push(`WHEN BannerID = ${b} THEN ${i + 1}`);
  });

  if (c.length === 0) {
    throw new AppError("Please select at least 1 Banner", 400)
  }

  try {
    const result = await db.query(
      `
      UPDATE 
        Banner
      SET OrderNo = CASE
        ${c.join(" ")}
        ELSE 
          ${null}
      END`
    );

    return "Banner selected successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};
