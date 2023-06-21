import "../../styles/Home.css";

import { getHome } from "../../services/product";

import { useLoaderData, NavLink } from "react-router-dom";

import { useEffect } from "react"

import CarouselBanner from "../../components/CarouselBanner";
import banner from "../../assets/banner/7582414.jpg";

export async function loader() {
  try {
    const { category, brand } = await getHome();
    return { category, brand };
  } catch (err) {
    throw new Error(err);
  }
}

const categoryComponent = (category) => {
  return category.map((c) => {
    return (
      <NavLink to={`category/${c.CategoryID}`} className="cat-home-item selectable" key={c.CategoryID}>
        <div className="cat-img-container">
          <img src={c.Thumbnail} alt={c.CategoryTH}/>
        </div>
        <p className="cut-off-2-line">{c.CategoryTH}</p>
      </NavLink>
    );
  });
};

const brandComponent = (brand) => {
  return brand.map((b) => {
    return (
      <NavLink to={`brands/${b.BrandID}`} className="brand-home-item selectable" key={b.BrandID}>
        <div className="brand-img-conatiner">
          <img src={b.Logo} alt={b.NameTH}/>
        </div>
      </NavLink>
    );
  });
};

export default function Home() {
  const { category, brand } = useLoaderData();

  useEffect(() => {
    document.title = "หกจ.กิจเจริญรุ่งเรืองการค้า";
  });

  return (
    <div id="home">
      <div className="banner-container">
        <CarouselBanner />
      </div>
      <div className="category-home">
        <div className="category-header">
          <h2>หมวดหมู่</h2>
        </div>
        <div className="cat-list">{categoryComponent(category)}</div>
      </div>

      <div className="brand-home">
        <div className="brand-header">
          <h2>แบรนด์</h2>
          <NavLink to="brands">{"แบรนด์ทั้งหมด >>"}</NavLink>
        </div>
        <div className="brand-list">{brandComponent(brand)}</div>
      </div>
    </div>
  );
}
