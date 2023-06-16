import "../../styles/Category.css";

import { useLoaderData, NavLink, useSubmit, Form } from "react-router-dom";

import { getSubCategory, checkCategory } from "../../services/product";

import { useEffect } from "react";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  let p = url.searchParams.get("p");
  if (!p) p = 1;
  const subCategory = await getSubCategory(params.categoryId, p);
  const category = await checkCategory(params.categoryId);
  return { subCategory, p, category };
}

export default function Category() {
  const { subCategory, p, category } = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (document.getElementById("p")) {
      document.getElementById("p").value = p;
    }
  }, [p]);

  useEffect(() => {
    if (category[0]) {
      document.title = category[0].CategoryTH;
    }
  }, [category]);

  return subCategory.length === 0 ? (
    <div className="nothing-here">
      <h2>{category[0].CategoryTH}</h2>
      <p>ไม่มีสินค้าในหมวดหมู่ย่อยนี้...</p>
      <NavLink to={-1} className="go-back">{`< ย้อนกลับ`}</NavLink>
    </div>
  ) : (
    <div id="subcategory-list">
      <h2>หมวดหมู่สินค้า : {category[0].CategoryTH}</h2>
      <ul className="subcat-list">
        {subCategory.map((sub) => {
          return (
            <li key={sub.SubCategoryID}>
              <NavLink
                to={`/subCategory/${sub.SubCategoryID}`}
                className="subcat-item selectable"
              >
                <div className="category-thumbnail-container">
                  <img
                    src={sub.Thumbnail}
                    alt={sub.SubNameTH}
                  />
                </div>
                <p className="link-text">{sub.SubNameTH}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <Form className="paginator">
        <button
          className="paginator-btn"
          // type="button"
          onClick={() => {
            const page = parseInt(document.getElementById("p").value);
            if (page > 1) document.getElementById("p").value = page - 1;
          }}
        >
          ⬅️
        </button>

        <input
          autoComplete="off"
          id="p"
          name="p"
          // type="search"
          defaultValue={1}
          onChange={(event) => {
            submit(event.currentTarget.form);
          }}
        />
        <button
          className="paginator-btn"
          // type="button"
          onClick={() => {
            const page = parseInt(document.getElementById("p").value);
            document.getElementById("p").value = page + 1;
          }}
        >
          ➡️
        </button>
      </Form>
    </div>
  );
}
