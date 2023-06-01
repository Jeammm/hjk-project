import "../../styles/CategoryConf.css";
import edit from "../../assets/edit-246.svg";

import { useLoaderData, Outlet, NavLink, useParams } from "react-router-dom";

import { getAllCategory } from "../../services/product";

import { useState } from "react";

export async function loader() {
  const category = await getAllCategory();
  return { category };
}

export default function CategoryConf() {
  const { category } = useLoaderData();

  const params = useParams();

  const [query, setQuery] = useState("");
  const onChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const catIdSelecting = params.categoryId;

  return (
    <div className="category-conf-container">
      <div className="category-selection-area">
        <input
          aria-label="ค้นหาหมวดหมู่"
          placeholder="ค้นหาหมวดหมู่..."
          type="search"
          name="q"
          onChange={onChange}
          className="category-search-box"
        />

        {category
          .filter((c) =>
            `${c.CategoryTH} ${c.CategoryEN}`.toLowerCase().includes(query)
          )
          .map((cat) => {
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
