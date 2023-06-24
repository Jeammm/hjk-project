import "../../styles/SubCategory.css";

import {
  useLoaderData,
  NavLink,
  Form,
  // useSubmit
} from "react-router-dom";

import { getItems, getSubName } from "../../services/product";

import { useEffect } from "react";

import Product from "../../components/ProductListDisplay";

///subCategory/:subCategoryID

export async function loader({ request, params }) {
  const url = new URL(request.url);
  let p = url.searchParams.get("p");
  if (!p) {
    p = 1;
  }
  const items = await getItems(params.subCategoryId, p);
  const subcategory = await getSubName(params.subCategoryId);
  return { items, p, subcategory };
}

const Options = ({ options }) => {
  return options.map((o) => {
    return (
      <div className="filter-item-container" key={o.BrandID}>
        <input
          type="checkbox"
          id={o.BrandID}
          className="filter-item-checkbox"
        />
        <label htmlFor={o.BrandID} className="checkbox-label">
          {o.NameTH} / {o.NameEN}
        </label>
      </div>
    );
  });
};

export default function Category() {
  const { items, p, subcategory } = useLoaderData();

  useEffect(() => {
    if (document.getElementById("p")) {
      document.getElementById("p").value = p;
    }
  }, [p]);

  useEffect(() => {
    document.title = subcategory[0].SubNameTH;
  }, [subcategory]);

  return items.length === 0 ? (
    <div className="nothing-here">
      <h2>{subcategory[0].SubNameTH}</h2>
      <p>ไม่มีสินค้าในหมวดหมู่ย่อยนี้...</p>
      <NavLink to={-1} className="go-back">{`< ย้อนกลับ`}</NavLink>
    </div>
  ) : (
    <div id="product-list">
      <div className="path-container">
        <NavLink
          className="selectable"
          to={`/category/${subcategory[0].CategoryID}`}
        >
          {subcategory[0].CategoryTH}
          {" > "}
        </NavLink>
        <NavLink
          className="current-path selectable"
          to={`/subcategory/${subcategory[0].SubCategoryID}`}
        >
          {subcategory[0].SubNameTH}
        </NavLink>
      </div>
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
            <Options options={items.options} />
          </div>
        </Form>
        <Product products={items.product} />
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
