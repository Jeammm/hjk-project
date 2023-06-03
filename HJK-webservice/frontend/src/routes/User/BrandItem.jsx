import "../../styles/Brand.css";

import { useLoaderData, NavLink, useSubmit, Form } from "react-router-dom";

import { getBrandItem, getBrands } from "../../services/product";

import { useEffect } from "react";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  let p = url.searchParams.get("p");
  if (!p) p = 1;
  const brandItems = await getBrandItem(params.brandId, p);
  const brand = await getBrands();
  const brandId = params.brandId
  return { brandItems, brand, p, brandId };
}

export default function Category() {
  const { brandItems, brand, p, brandId } = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    const brandName = brand.filter((b) => b.BrandID == brandId);
    document.title = brandName[0].NameTH;
  }, [brandItems, brand, brandId]);

  useEffect(() => {
    document.getElementById("p").value = p;
  }, [p]);

  return (
    <div id="subcategory-list">
      <ul className="subcat-list">
        {brandItems.map((b) => {
          return (
            <li key={b.ProductID}>
              <NavLink
                to={`/product/${b.ProductID}`}
                className="subcat-item selectable"
              >
                <img
                  src={b.Thumbnail}
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
