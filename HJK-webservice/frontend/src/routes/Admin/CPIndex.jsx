import "../../styles/CPIndex.css";

import product_icon from "../../assets/product-icon.png";
import brand_icon from "../../assets/brand.png";

import { NavLink } from "react-router-dom";

export default function Index() {
  return (
    <div id="control-section">
      <NavLink to="category" className="cpindex-menu-item selectable" >
        <img src={product_icon} alt="product setting" />
        <p>เพิ่มหมวดหมู่/สินค้า</p>
      </NavLink>

      <NavLink to="brand" className="cpindex-menu-item selectable" >
        <img src={brand_icon} alt="brand setting" />
        <p>เพิ่มแบรนด์</p>
      </NavLink>
    </div>
  );
}
