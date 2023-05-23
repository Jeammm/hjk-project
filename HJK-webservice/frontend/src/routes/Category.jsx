import "../styles/Category.css";

import { useLoaderData, NavLink } from "react-router-dom";

import { getSubCategory } from "../services/product";

export async function loader({ params }) {
  const subCategory = await getSubCategory(params.categoryId);
  // if (subCategory.length === 0) {
  //   throw new Response("", {
  //     status: 404,
  //     statusText: "Not Found",
  //   });
  // }
  return { subCategory };
}

export default function Category() {
  const { subCategory } = useLoaderData();

  return (
    <div id="subcategory-list">
      <ul className="subcat-list">
        {subCategory.map((sub) => {
          return (
            <li key={sub.SubCategoryID}>
              <NavLink to={`/subCategory/${sub.SubCategoryID}`} className="subcat-item selectable">
                <img
                  src={sub.Thumbnail}
                  alt={sub.SubNameTH}
                  className="category-thumbnail"
                />
                <p className="link-text">{sub.SubNameTH}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
