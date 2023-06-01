import "../../styles/Brand.css";

import { useLoaderData, NavLink } from "react-router-dom";

import { getBrandItem, getBrands } from "../../services/product";

import { useEffect } from "react";

export async function loader({ params }) {
  const brandItems = await getBrandItem(params.brandId);
  const brand = await getBrands();
  return { brandItems, brand };
}

export default function Category() {
  const { brandItems, brand } = useLoaderData();
  useEffect(() => {
    const brandName = brand.filter(b => b.BrandID === brandItems[0].Brand)
    document.title = brandName[0].NameTH;
  }, [brand]);

  return (
    <div id="subcategory-list">
      <ul className="subcat-list">
        {brandItems.map((b) => {
          return (
            <li key={b.ProductID}>
              <NavLink to={`/product/${b.ProductID}`} className="subcat-item selectable">
                <img
                  src={b.Thumbnail}
                  alt={b.NameTH}
                  className="category-thumbnail"
                />
                <p className="link-text">{b.NameTH}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
