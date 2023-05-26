import "../../styles/SubCategory.css";

import { useLoaderData, NavLink } from "react-router-dom";

import { getItems } from "../../services/product";

///subCategory/:subCategoryID

export async function loader({ params }) {
  const items = await getItems(params.subCategoryId);
  if (!items) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { items };
}

export default function Category() {
  const { items } = useLoaderData();

  return (
    <div id="subcategory-list">
      <ul className="subcat-list">
        {items.map((sub) => {
          return (
            <li key={sub.ProductID}>
              <NavLink to={`/product/${sub.ProductID}`} className="subcat-item selectable">
                <img
                  src={sub.Thumbnail}
                  alt={sub.NameTH}
                  className="category-thumbnail"
                />
                <p className="link-text">{sub.NameTH}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
