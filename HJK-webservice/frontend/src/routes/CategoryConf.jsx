import "../styles/CategoryConf.css";

import { useLoaderData, Outlet, NavLink, useParams } from "react-router-dom";

import { getAllCategory } from "../services/product";

export async function loader() {
  const category = await getAllCategory();
  // if (!categories) {
  //   throw new Response("", {
  //     status: 404,
  //     statusText: "Not Found",
  //   });
  // }

  return { category };
}

export default function CategoryConf() {
  const { category } = useLoaderData();

  const params = useParams();

  const catIdSelecting = params.categoryId

  return (
    <div className="category-conf-container">
      <div className="category-selection-area">
        {category.map((cat) => {
          return (
            <NavLink to={`${cat.CategoryID}/SubCategory`} key={cat.CategoryID}>
              <div className={`category-conf-item selectable ${`${cat.CategoryID}` === catIdSelecting ? "isSelected" : ""}`}>
                <p>{cat.CategoryTH}</p>
              </div>
            </NavLink>
          );
        })}
        <div className="category-conf-item selectable">
          <p>+ หมวดหมู่ใหม่</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
