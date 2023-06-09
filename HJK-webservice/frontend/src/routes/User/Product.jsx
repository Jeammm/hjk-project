import "../../styles/Product.css";

import { getProduct } from "../../services/product";

import { useLoaderData, Form, NavLink } from "react-router-dom";

import { useEffect } from "react";

import Select from "react-select";

export async function loader({ params }) {
  const { product, size } = await getProduct(params.productId);
  if (product.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { product, size };
}

export default function Product() {
  const { product, size } = useLoaderData();
  const productDetail = product[0];

  const cal_id = (productId, sizeId) => {
    if (sizeId < 10) return `${productId}0${sizeId}`;
    else return `${productId}${sizeId}`;
  };

  const cal_color = (i) => {
    if (i % 2 === 0) return "dark";
    else return "grey";
  };

  useEffect(() => {
    document.title = productDetail.NameTH;
  }, [productDetail.NameTH]);

  const color_option = [
    {
      value: "เขียว",
      label: "#32a852 เขียว",
    },
    {
      value: "แดง",
      label: "#a83232 แดง",
    },
    {
      value: "น้ำเงิน",
      label: "#0004ff น้ำเงิน",
    },
  ];

  const targetHeight = 30;

  const styles = {
    control: (base) => ({
      ...base,
      minHeight: "initial",
    }),
    valueContainer: (base) => ({
      ...base,
      height: `${targetHeight - 1 - 1}px`,
      padding: "0 8px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
  };

  return (
    <div id="product-detail">
      <div className="path-container">
        <NavLink className="selectable" to={`/category/${productDetail.CategoryID}`}>{productDetail.CategoryTH}{" > "}</NavLink>
        <NavLink className="selectable" to={`/subcategory/${productDetail.SubCategoryID}`}>{productDetail.SubNameTH}{" > "}</NavLink>
        <NavLink className="current-path selectable" to={`/product/${productDetail.ProductID}`}>{productDetail.NameTH}</NavLink>
      </div>
      <div className="topic-with-close">
        <h3 id="product-detail-topic">รายละเอียดสินค้า</h3>
        <NavLink to={`/subcategory/${productDetail.SubCategoryID}`} id="close-button" className="selectable">
          X
        </NavLink>
      </div>
      <div id="img-with-desc">
        <div id="product-img-container">
          <img
            loading="lazy"
            src={productDetail.Thumbnail}
            alt="product"
            id="product-img"
          />
        </div>
        <div id="detail-beside-img">
          <h3 id="product-name">{productDetail.NameTH}</h3>
          <p id="product-desc">{productDetail.DesTH}</p>
        </div>
      </div>
      <Form>
        <div id="size-container">
          <div className="size-detail">
            <p className="size-detail-box w-200 table-topic">รหัสสินค้า</p>
            <p className="size-detail-box w-150 table-topic">ขนาด</p>
            <p className="size-detail-box w-150 table-topic">บรรจุ</p>
            <p className="size-detail-box w-150 table-topic">ราคา</p>
            <p className="size-detail-box w-150 table-topic">จำนวน</p>
            <p
              className="size-detail-box w-150 table-topic"
              hidden={!productDetail.IsColor}
            >
              รหัสสี
            </p>
          </div>
          {size.map((s, i) => {
            return (
              <div className="size-detail" key={`${s.ProductID}${s.SizeID}`}>
                <p className={`size-detail-box w-200 ${cal_color(i)}`}>
                  {cal_id(s.ProductID, s.SizeID)}
                </p>
                <p className={`size-detail-box w-150 ${cal_color(i)}`}>
                  {s.Des}
                </p>
                <p className={`size-detail-box w-150 ${cal_color(i)}`}>
                  {s.Packing}
                </p>
                <p className={`size-detail-box w-150 ${cal_color(i)}`}>
                  {s.Price}
                </p>
                <div className={`size-detail-box w-150 ${cal_color(i)}`}>
                  <input type="number" className="order-amount" min="0" />
                </div>
                <div
                  className={`
                  size-detail-box w-150 
                  ${cal_color(i)} 
                  color-select-box
                  ${productDetail.IsColor ? "" : "hidden-box"}
                  `}
                  hidden={!productDetail.IsColor}
                  // hidden
                >
                  {/* <input type="text" className="order-amount" /> */}
                  <Select
                    options={color_option}
                    name="color"
                    isSearchable={true}
                    styles={styles}
                    // defaultValue=""
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div id="place-order-button-container">
          <button type="submit" className="order-button" id="add-to-basket">
            เพิ่มลงในตะกร้า
          </button>
          <button
            type="reset"
            className="order-button"
            id="cancel"
            value="ยกเลิก"
          >
            ยกเลิก
          </button>
        </div>
      </Form>
    </div>
  );
}
