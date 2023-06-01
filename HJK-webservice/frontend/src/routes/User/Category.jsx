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
    document.getElementById("p").value = p;
  }, [p]);

  useEffect(() => {
    document.title = category[0].CategoryTH;
  }, [category]);

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
