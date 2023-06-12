import "../../styles/Brand.css";

import { useLoaderData, NavLink, useSubmit, Form } from "react-router-dom";

import { getBrands } from "../../services/product";

import { useEffect } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  let p = url.searchParams.get("p");
  if (!p) p = 1;
  const brands = await getBrands(p);
  return { brands, p };
}

export default function Category() {
  const { brands, p } = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (document.getElementById("p")) {
      document.getElementById("p").value = p;
    }
  }, [p]);

  useEffect(() => {
    document.title = "แบรนด์";
  }, []);

  return brands.length === 0 ? (
    <div className="nothing-here">
      <p>ไม่มีแบรนด์นี้...</p>
      <NavLink to={-1} className="go-back">{`< ย้อนกลับ`}</NavLink>
    </div>
  ) : (
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
