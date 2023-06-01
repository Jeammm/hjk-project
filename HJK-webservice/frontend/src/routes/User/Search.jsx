import { queryProduct } from "../../services/product";

import { useLoaderData, NavLink, useSubmit, Form } from "react-router-dom";

import { useEffect } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  let p = url.searchParams.get("p");
  if (!p) p = 1;
  const products = await queryProduct(q, p);
  return { products, q, p };
}

export default function Search(props) {
  const { products, q, p } = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById("p").value = p;
  }, [p]);

  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  return (
    <div id="subcategory-list">
      
      <ul className="subcat-list">
        {products.map((sub) => {
          return (
            <li key={sub.ProductID}>
              <NavLink
                to={`/product/${sub.ProductID}`}
                className="subcat-item selectable"
              >
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
        <input
          id="q"
          name="q"
          value={q}
          hidden
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
