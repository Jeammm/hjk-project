import "../../styles/Brand.css";

import { useLoaderData, NavLink } from "react-router-dom";

import { getBrands } from "../../services/product";

export async function loader() {
  const brands = await getBrands();
  return { brands };
}

export default function Category() {
  const { brands } = useLoaderData();

  return (
    <div id="subcategory-list">
      <ul className="subcat-list">
        {brands.map((b) => {
          return (
            <li key={b.BrandID}>
              <NavLink
                to={`/brands/${b.BrandID}`}
                className="subcat-item selectable"
              >
                <img
                  src={b.Logo}
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
