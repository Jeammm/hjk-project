import "../../styles/CategoryConf.css";
import edit from "../../assets/edit-246.svg";

import { useLoaderData, Outlet, NavLink, useParams } from "react-router-dom";

import { getAllCategory } from "../../services/product";

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

  const catIdSelecting = params.categoryId;

  return (
    <div className="category-conf-container">
      <div className="category-selection-area">
        {category.map((cat) => {
          return (
            <div className="edit-on-right" key={cat.CategoryID}>
              <NavLink
                to={`${cat.CategoryID}/SubCategory`}
                className="flex-grow-1"
              >
                <div
                  className={`category-conf-item selectable ${
                    `${cat.CategoryID}` === catIdSelecting ? "isSelected" : ""
                  }`}
                >
                  <p>{cat.CategoryTH}</p>
                </div>
              </NavLink>
              <NavLink to={`${cat.CategoryID}/edit`}>
                <img
                  src={edit}
                  alt="edit"
                  className="cat-edit-button selectable"
                />
              </NavLink>
            </div>
          );
        })}
        <div className="selectable">
          <NavLink to="./new">
            <p>+ หมวดหมู่ใหม่</p>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
