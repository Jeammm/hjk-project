import "../../styles/Brand.css";

import { useLoaderData, NavLink } from "react-router-dom";

import { getBrandItem } from "../../services/product";

export async function loader({ params }) {
  const brandItems = await getBrandItem(params.brandId);
  return { brandItems };
}

export default function Category() {
  const { brandItems } = useLoaderData();

  return (
    <div id="subcategory-list">
      <ul className="subcat-list">
        {brandItems.map((b) => {
          return (
            <li key={b.BrandID}>
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
