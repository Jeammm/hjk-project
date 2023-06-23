import "../../styles/BannerConf.css";

import { useLoaderData, Outlet, NavLink } from "react-router-dom";

import { getBannerSettings } from "../../services/settings";

import { useState, useEffect } from "react";

export async function loader({ params }) {
  const bannerSettings = await getBannerSettings();
  return { bannerSettings };
}

export async function action() {
  return null;
}

const GetAllBanner = ({ data }) => {
  return data.map((b) => {
    return (
      <div className="banner-item" key={`${b.BannerID}`}>
        <div className="all-banner-img-container">
          <img src={b.BannerURL} alt={b.BannerName} />
        </div>
        <div className="banner-detail">
          <p className="name-text">{b.BannerName}</p>
          <p>{b.BannerDes}</p>
        </div>
      </div>
    );
  });
};

const SelectedBanner = ({ data }) => {
  return data.map((b) => {
    return (
      <div className="selected-banner-item" key={`s-${b.BannerID}`}>
        <div className="selected-banner-image-container">
          <img src={b.BannerURL} alt={b.BannerURL} />
        </div>
        <p>{b.BannerName}</p>
      </div>
    );
  });
};

export default function BannerConf() {
  const { bannerSettings } = useLoaderData();

  return (
    <div className="banner-conf-container">
      <Outlet />

      <h2 className="banner-header">แบนเนอร์ที่เลือก</h2>
      <div className="selected-banner-container">
        <div className="flex-flow">
          <NavLink to="select">
            <div className="selected-banner-item">
              <div className="selected-banner-image-container select-button">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2661/2661440.png"
                  alt="select banner"
                />
              </div>
              <p>เลือกแบนเนอร์</p>
            </div>
          </NavLink>
          <SelectedBanner data={bannerSettings.filter((b) => b.BannerNo)} />
        </div>
      </div>

      <h2 className="banner-header">แบนเนอร์ทั้งหมด</h2>
      <div className="all-banner-container">
        <NavLink to="new" className="all-banner-item">
          <div className="banner-item">
            <div className="all-banner-img-container select-button">
              <img src="https://cdn-icons-png.flaticon.com/512/2661/2661440.png" alt="upload"/>
            </div>
            <div className="banner-detail">
              <p>อัพโหลดแบนเนอร์</p>
            </div>
          </div>
        </NavLink>
        <GetAllBanner data={bannerSettings} />
      </div>
    </div>
  );
}
