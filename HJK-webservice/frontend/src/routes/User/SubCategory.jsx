import "../../styles/SubCategory.css";

import { useLoaderData, NavLink, Form, useSubmit } from "react-router-dom";

import { getItems, getSubName } from "../../services/product";

import { useEffect } from "react";

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
  const subcategory = await getSubName(params.subCategoryId);
  return { items, p, subcategory };
}

export default function Category() {
  const { items, p, subcategory } = useLoaderData();

  const submit = useSubmit();

  useEffect(() => {
    if (document.getElementById("p")) {
      document.getElementById("p").value = p;
    }
  }, [p]);

  useEffect(() => {
    document.title = subcategory[0].SubNameTH;
    console.log(items);
  }, [subcategory]);

  return items.length === 0 ? (
    <div className="nothing-here">
      <h2>{subcategory[0].SubNameTH}</h2>
      <p>ไม่มีสินค้าในหมวดหมู่ย่อยนี้...</p>
      <NavLink to={-1} className="go-back">{`< ย้อนกลับ`}</NavLink>
    </div>
  ) : (
    <div id="product-list">
      <h1>{subcategory[0].SubNameTH}</h1>
      <div className="product-detail-container">
        <Form className="filter-container">
          <div className="filter-header">
            <h3>ค้นหาแบบละเอียด</h3>
            <div className="filter-sting">
              <input type="search" placeholder="กรองสินค้า" id="s" />
              <button type="submit">ค้นหา</button>
            </div>
          </div>

          <div className="filter-section">
            <h3>แบรนด์</h3>
            {items.options.map((o) => {
              return (
                <div className="filter-item-container" key={o.BrandID}>
                  <input type="checkbox" id={o.BrandID} className="filter-item-checkbox"/>
                  <label htmlFor={o.BrandID} className="checkbox-label">
                    {o.NameTH} / {o.NameEN}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="filter-section">
            <h3>แบรนด์</h3>
            {items.options.map((o) => {
              return (
                <div className="filter-item-container" key={o.BrandID}>
                  <input type="checkbox" id={o.BrandID} className="filter-item-checkbox"/>
                  <label htmlFor={o.BrandID} className="checkbox-label">
                    {o.NameTH} / {o.NameEN}
                  </label>
                </div>
              );
            })}
          </div>
        </Form>
        <ul className="product-item-list">
          {items.product.map((sub) => {
            return (
              <li key={sub.ProductID} className="product-item selectable">
                <NavLink to={`/product/${sub.ProductID}`}>
                  <div className="product-list-img-container">
                    <img src={sub.Thumbnail} alt={sub.NameTH} />
                  </div>
                  <div className="product-list-detail">
                    <p className="link-text">{sub.NameTH}</p>
                    <div className="prod-detail-bottom">
                      <p className="prod-brand">{sub.Brand ? sub.Brand : "No Brand"}</p>
                      {/* <p className="right-end">{sub.MinPrice}</p> */}
                      <p className="right-end prod-price">1205.50</p>
                      <p className="prod-id">{sub.ProductID}</p>
                      <p className="right-end avilability">มีสินค้า</p>
                    </div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <Form className="paginator">
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
      </Form> */}
    </div>
  );
}
