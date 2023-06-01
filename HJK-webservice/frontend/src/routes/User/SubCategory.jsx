import "../../styles/SubCategory.css";

import { useLoaderData, NavLink, Form, useSubmit } from "react-router-dom";

import { getItems, getSubName } from "../../services/product";

import { useEffect } from "react"

///subCategory/:subCategoryID

export async function loader({ request, params }) {
  const url = new URL(request.url);
  let p = url.searchParams.get("p");
  if (!p) p = 1;
  const items = await getItems(params.subCategoryId, p);
  // if (!items) {
  //   throw new Response("", {
  //     status: 404,
  //     statusText: "Not Found",
  //   });
  // }
  const subcategory = await getSubName(params.subCategoryId)
  return { items, p, subcategory };
}

export default function Category() {
  const { items, p, subcategory } = useLoaderData();

  const submit = useSubmit();

  useEffect(() => {
    document.getElementById("p").value = p;
  }, [p]);

  useEffect(() => {
    document.title = subcategory[0].SubNameTH;
  }, [subcategory]);

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
