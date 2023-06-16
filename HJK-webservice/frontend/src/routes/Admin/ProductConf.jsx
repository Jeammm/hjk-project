import "../../styles/ProductConf.css";

import { useLoaderData, NavLink } from "react-router-dom";

import { checkSubCategory, getItems } from "../../services/product";

export async function loader({ params }) {
  const subCategory = await checkSubCategory(
    params.categoryId,
    params.subcategoryId
  );
  if (subCategory.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const products = await getItems(params.subcategoryId);
  return { products: products.product };
}

export default function ProductConf() {
  const { products } = useLoaderData();

  return (
    <div className="product-conf-list-container">
      {products.map((product) => {
        return (
          <NavLink
            to={`${product.ProductID}/edit`}
            className={`product-conf-item selectable ${product.Available? "" : "unavailable"}`}
            key={product.ProductID}
          >
            <img
              src={product.Thumbnail}
              alt={product.NameTH}
              className="product-conf-thumbnail"
            />
            <div className="product-conf-detail">
              <h2>{product.ProductID} {product.Available? "" : "(ไม่แสดง)"}</h2>
              <h3>{product.NameTH}</h3>
              <h4>{product.IsColor ? "หลายสี" : ""}</h4>
            </div>
          </NavLink>
        );
      })}
      <NavLink to="new" className="product-conf-item selectable">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2661/2661440.png"
          alt="Add new product"
          className="product-conf-thumbnail"
        />
        <div className="product-conf-detail">
          <p>เพิ่มสินค้า</p>
        </div>
      </NavLink>
    </div>
  );
}
