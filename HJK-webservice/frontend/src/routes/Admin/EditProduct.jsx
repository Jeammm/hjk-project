import { useState } from "react";
import "../../styles/EditProduct.css";

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

export default function EditProduct() {
  const { product, size } = useLoaderData();
  const navigate = useNavigate();
  const productDetail = product[0];
  const [sizeNo, setSizeNo] = useState(size.length);

  const sizeOptionGen = (amount) => {
    const sizeOption = [];
    const prod_id = productDetail.ProductID

    let biggest_size = 0;
    
    if (size.length) {
      biggest_size = size[size.length-1].SizeID;
    }

    for (let i = 0; i < amount; i++) {

      let size_id;

      if (size[i]) {
        size_id = cal_id(size[i].ProductID, size[i].SizeID)
      }
      else {
        biggest_size += 1;
        size_id = cal_id(prod_id, biggest_size)
      }

      sizeOption.push(
        <div
          className="size-detail"
          key={size_id}
        >
          <input
            className={`size-detail-box w-200 size-input-box ${cal_color(i)}`}
            value={size[i] ? cal_id(size[i].ProductID, size[i].SizeID) : size_id}
            readOnly
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            defaultValue={size[i] ? size[i].Des : ""}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            defaultValue={size[i] ? size[i].Packing : ""}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            defaultValue={size[i] ? size[i].Price : ""}
            type="number"
            min={0}
          />
        </div>
      );
    }
    return sizeOption;
  };

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
        <h3 id="product-detail-topic">แก้ไขรายละเอียด</h3>
        <button id="close-button" onClick={() => navigate(-1)}>
          X
        </button>
      </div>
      <Form>
        <div id="img-with-desc">
          <div id="product-img-container">
            <img src={productDetail.Thumbnail} alt="product" id="product-img" />
          </div>
          <div id="detail-beside-img">
            <input id="product-name" defaultValue={productDetail.NameTH} />
            <textarea id="product-desc" defaultValue={productDetail.DesTH} />
          </div>
        </div>

        <div className="color-checker-container">
          <input type="checkbox" className="color-check-box" name="IsColor" defaultChecked={productDetail.IsColor}/>
          <label for="IsColor">ติ๊กช่องนี้ถ้าสินค้านี้เป็นประเภท "สี"</label>
        </div>

        <div id="size-container">
          <div className="size-detail">
            <p className="size-detail-box w-200 table-topic">รหัสสินค้า</p>
            <p className="size-detail-box w-150 table-topic">ขนาด</p>
            <p className="size-detail-box w-150 table-topic">บรรจุ</p>
            <p className="size-detail-box w-150 table-topic">ราคา</p>
          </div>
          {sizeOptionGen(sizeNo)}
          <div className="add-new-size selectable" onClick={() => setSizeNo(prev => prev+1)}>+ เพิ่มไซส์</div>
        </div>
        <div id="place-order-button-container">
          <button type="submit" className="order-button" id="add-to-basket">
            ยืนยัน
          </button>
          <button
            type="button"
            className="order-button"
            id="cancel"
            onClick={() => navigate(-1)}
          >
            ยกเลิก
          </button>
        </div>
      </Form>
    </div>
  );
}
