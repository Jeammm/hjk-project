const db = require("./db");

const config = require("../config");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getBannerSettings = async () => {
  return await db.query(`
    SELECT *, Banner.BannerID 
    FROM 
      Banner
    LEFT JOIN BannerSelected ON BannerSelected.BannerID = Banner.BannerID
    `);
};

exports.addBanner = async (bannerData) => {
  try {
    const result = await db.query(
      `INSERT INTO Banner 
      (BannerURL, BannerName , BannerDes)
      VALUES 
      (?, ?, ?)`,
      [
        bannerData.BannerURL,
        bannerData.BannerName,
        bannerData.BannerDes || null,
      ]
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
  console.log(selected)
  try {
    const result = await db.query(
      `
      INSERT INTO BannerSelected
        (BannerID, \`Interval\`)
      VALUES 
        (?, ?)
      `,
      [selected.BannerID, selected.Interval || 5000]
    );

    return "Banner selected successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.unselectBanner = async (id) => {
  try {
    const result = await db.query(
      `
      DELETE FROM 
        BannerSelected
      WHERE
        BannerNO = ?
      `,
      [id]
    );

    return "Banner unselected successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};
