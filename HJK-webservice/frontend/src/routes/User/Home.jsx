import "../../styles/Home.css";

import { getHome } from "../../services/product";
import { getBannerSettings } from "../../services/settings";

import { useLoaderData, NavLink } from "react-router-dom";

import { useEffect } from "react"

import CarouselBanner from "../../components/CarouselBanner";

export async function loader() {
  try {
    const { category, brand } = await getHome();
    const bannerSettings = await getBannerSettings('user');
    return { category, brand, bannerSettings };
  } catch (err) {
    throw new Error(err);
  }
}

const FeaturedComponent = () => {
  return (
    [
      <NavLink to={`/search/?b=${1}`} className="cat-home-item selectable" key={`f-${1}`}>
        <div className="cat-img-container">
          <img src="https://iili.io/HPz9kJ4.jpg" alt="WaiZon"/>
        </div>
        <p className="cut-off-2-line">WaiZon</p>
      </NavLink>,
      <NavLink to={`/search/?b=${2}`} className="cat-home-item selectable" key={`f-${2}`}>
        <div className="cat-img-container">
          <img src="https://iili.io/HPx6oTx.jpg" alt="Marker"/>
        </div>
        <p className="cut-off-2-line">Marker</p>
      </NavLink>,
    ]
  )
}

const CategoryComponent = ({category}) => {
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

const BrandComponent = ({brand}) => {
  return brand.map((b) => {
    return (
      <NavLink to={`/search/?b=${b.BrandID}`} className="brand-home-item selectable" key={b.BrandID}>
        <div className="brand-img-conatiner">
          <img src={b.Logo} alt={b.NameTH}/>
        </div>
        <p>{b.NameEN}</p>
      </NavLink>
    );
  });
};

export default function Home() {
  const { category, brand, bannerSettings } = useLoaderData();

  useEffect(() => {
    document.title = "หกจ.กิจเจริญรุ่งเรืองการค้า";
  });

  return (
    <div id="home">
      <div className="banner-container">
        <CarouselBanner data={bannerSettings}/>
      </div>
      
      <div className="category-home">
        <div className="category-header">
          <h2>✨ แนะนำ ✨</h2>
        </div>
        <div className="cat-list"><FeaturedComponent /></div>
      </div>
      
      <div className="category-home">
        <div className="category-header">
          <h2>หมวดหมู่</h2>
        </div>
        <div className="cat-list"><CategoryComponent category={category} /></div>
      </div>

      <div className="brand-home">
        <div className="brand-header">
          <h2>แบรนด์</h2>
          <NavLink to="brands">{"แบรนด์ทั้งหมด >>"}</NavLink>
        </div>
        <div className="brand-list"><BrandComponent brand={brand}/></div>
      </div>
    </div>
  );
}
