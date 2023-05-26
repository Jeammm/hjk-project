import "../../styles/Product.css";

import { getProduct } from "../../services/product";

import { useLoaderData, useNavigate, Form } from "react-router-dom";

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
  const navigate = useNavigate();
  const productDetail = product[0];

  const cal_id = (productId, sizeId) => {
    if (sizeId < 10) return `${productId}0${sizeId}`;
    else return `${productId}${sizeId}`;
  };

  const cal_color = (i) => {
    if (i % 2 === 0) return "dark";
    else return "grey";
  };

  return (
    <div id="product-detail">
      <div className="topic-with-close">
        <h3 id="product-detail-topic">รายละเอียดสินค้า</h3>
        <button id="close-button" onClick={() => navigate(-1)}>X</button>
      </div>
      <div id="img-with-desc">
        <div id="product-img-container">
          <img src={productDetail.Thumbnail} alt="product" id="product-img" />
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
            <p className="size-detail-box w-150 table-topic">จำนวนที่สั่ง</p>
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
                  {s.Price} บาท
                </p>
                <div className={`size-detail-box w-150 ${cal_color(i)}`}>
                  <input type="number" className="order-amount" min="0"/>
                </div>
                <div
                  className={`size-detail-box w-150 ${cal_color(i)}`}
                  hidden={!productDetail.IsColor}
                >
                  <input type="text" className="order-amount" />
                </div>
              </div>
            );
          })}
        </div>
        <div id="place-order-button-container">
          <button type="submit" className="order-button" id="add-to-basket">เพิ่มลงในตะกร้า</button>
          <button type="reset" className="order-button" id="cancel" value="ยกเลิก">ยกเลิก</button>
        </div>
      </Form>
    </div>
  );
}
