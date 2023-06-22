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

export default function BannerConf() {
  const { bannerSettings } = useLoaderData();


  return (
    <div className="banner-conf-container">

    </div>
  );
}
