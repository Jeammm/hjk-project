import "../../styles/CPIndex.css";

import product_icon from "../../assets/product-icon.png";
import brand_icon from "../../assets/brand.png";
import banner_icon from "../../assets/banner.png";


import { NavLink } from "react-router-dom";

export default function Index() {
  return (
    <div id="control-section">
      <NavLink to="category" className="cpindex-menu-item selectable">
        <img loading="lazy" src={product_icon} alt="product setting" />
        <p>เพิ่มหมวดหมู่/สินค้า</p>
      </NavLink>

      <NavLink to="brand" className="cpindex-menu-item selectable">
        <img loading="lazy" src={brand_icon} alt="brand setting" />
        <p>เพิ่มแบรนด์</p>
      </NavLink>
      
      <NavLink to="banner" className="cpindex-menu-item selectable">
        <img loading="lazy" src={banner_icon} alt="banner setting" />
        <p>ตั้งค่าแบนเนอร์</p>
      </NavLink>
      
      <NavLink to="contact" className="cpindex-menu-item selectable">
        <img loading="lazy" src={banner_icon} alt="banner setting" />
        <p>ตั้งค่าข้อมูลติดต่อ</p>
      </NavLink>
      
      <NavLink to="map" className="cpindex-menu-item selectable">
        <img loading="lazy" src={banner_icon} alt="banner setting" />
        <p>ตั้งค่าแผนที่</p>
      </NavLink>
    </div>
  );
}
