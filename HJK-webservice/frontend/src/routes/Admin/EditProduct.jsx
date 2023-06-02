import { useState } from "react";
import "../../styles/EditProduct.css";

import { getProduct, editProduct, getBrands } from "../../services/product";
import {
  useLoaderData,
  useNavigate,
  Form,
  NavLink,
  redirect,
} from "react-router-dom";

import Select from "react-select";

import ImgUploader from "../../components/ImgUploader";

import trash from "../../assets/trash.png";
import listing from "../../assets/listing.png";

export async function loader({ params }) {
  const { product, size } = await getProduct(params.productId);
  if (product.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const brands = await getBrands();

  return { product, size, brands };
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  if (data.IsColor === undefined) data.IsColor = 0;
  else data.IsColor = 1;

  const res = await editProduct(params.productId, data);
  window.alert(res.data.data[0]);
  return redirect(`../${params.subcategoryId}/product`);
}

export default function EditProduct() {
  const navigate = useNavigate();
  const { product, size, brands } = useLoaderData();
  const productDetail = product[0];

  const [sizeOptions, setSizeOptions] = useState(size);
  const [isAvailable, setIsAvailable] = useState(productDetail.Available);

  const sizeOptionsGen = (productId) => {
    const sizeComponents = sizeOptions.map((s, i) => {
      const size_id = s.SizeID
        ? cal_id(productId, s.SizeID)
        : cal_id(productId, i + 1);

      return (
        <div className={`size-detail ${s.SizeID ? "" : "new-size"}`} key={i}>
          {!s.SizeID && i + 1 === sizeOptions.length ? (
            <div
              className="undo-size-button selectable"
              onClick={() => undoSizeHandler(i)}
            >
              ลบ
            </div>
          ) : null}

          <input
            className={`size-detail-box w-200 size-input-box ${cal_color(i)}`}
            value={size_id}
            readOnly
            // name={`${size_id}_Id`}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            defaultValue={s.Des}
            name={`${size_id}_Des`}
            required={true}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            defaultValue={s.Packing}
            name={`${size_id}_Packing`}
            required={true}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            defaultValue={s.Price}
            name={`${size_id}_Price`}
            type="number"
            min={0}
            required={true}
          />
        </div>
      );
    });

    return sizeComponents;
  };

  const undoSizeHandler = (i) => {
    setSizeOptions((prev) => {
      const before = prev.slice(0, i);
      const after = prev.slice(i + 1);
      const undoed = before.concat(after);

      console.log(prev, undoed);

      return undoed;
    });
  };

  const cal_id = (productId, sizeId) => {
    if (sizeId < 10) return `${productId}0${sizeId}`;
    else return `${productId}${sizeId}`;
  };

  const cal_color = (i) => {
    if (i % 2 === 0) return "dark";
    else return "grey";
  };

  const brands_option = brands.map((b) => {
    return { value: b.BrandID, label: `${b.NameTH} ${b.NameEN}` };
  });

  const default_brand = brands
    .filter((b) => b.BrandID === product[0].Brand)
    .map((b) => {
      return { value: b.BrandID, label: `${b.NameTH} ${b.NameEN}` };
    });

  const deleteHandler = async (productId) => {
    if (!window.confirm("ยืนยันการลบสินค้านี้?")) {
      return;
    } else {
      await editProduct(productId, { Available: "0" });
      setIsAvailable(0)
      window.alert("ลบสินค้านี้แล้ว");
    }
  };
  
  const listingHandler = async (productId) => {
    if (!window.confirm("ยืนยันนำสินค้านี้กลับมา?")) {
      return;
    } else {
      await editProduct(productId, { Available: "1" });
      setIsAvailable(1)
      window.alert("นำสินค้ากลับมาแล้ว");
    }
  };

  return (
    <div id="product-detail">
      <div className="topic-with-close">
        <div id="product-detail-topic">
          <h3>แก้ไขรายละเอียด</h3>
          <p className={isAvailable ? "hidden" : "show"}>(ไม่แสดง)</p>
        </div>
        <button id="close-button" onClick={() => navigate(-1)}>
          X
        </button>
      </div>
      <Form method="post">
        <div id="img-with-desc">
          <ImgUploader
            prevImg={productDetail.Thumbnail}
            img_field="Thumbnail"
          />
          {/* <div id="product-img-container">
            <img src={productDetail.Thumbnail} alt="product" id="product-img" />
          </div> */}
          <div id="detail-beside-img">
            <input
              id="product-name"
              defaultValue={productDetail.NameTH}
              name="NameTH"
            />
            <textarea
              id="product-desc"
              defaultValue={productDetail.DesTH}
              name="DesTH"
            />
          </div>
        </div>

        <div className="color-checker-container">
          <label htmlFor="IsColor">
            <input
              type="checkbox"
              className="color-check-box"
              name="IsColor"
              defaultChecked={productDetail.IsColor}
            />
            ติ๊กช่องนี้ถ้าสินค้านี้ "มีหลายสีให้เลือก"
          </label>

          <label htmlFor="Brand">
            เลือกแบรนด์
            <NavLink
              to="/admin/brand/new"
              target="_blank"
              rel="noopener noreferrer"
              className="add-brand-small-option"
            >
              คลิกถ้าหาแบรนด์ไม่เจอ
            </NavLink>
            <Select
              options={brands_option}
              name="Brand"
              isClearable={true}
              isSearchable={true}
              defaultValue={default_brand[0]}
            />
          </label>
        </div>

        <div id="size-container">
          <div className="size-detail">
            <p className="size-detail-box w-200 table-topic">รหัสสินค้า</p>
            <p className="size-detail-box w-150 table-topic">ขนาด</p>
            <p className="size-detail-box w-150 table-topic">บรรจุ</p>
            <p className="size-detail-box w-150 table-topic">ราคา</p>
          </div>
          {sizeOptionsGen(productDetail.ProductID)}
          <div
            className="add-new-size selectable"
            onClick={() =>
              setSizeOptions((prev) => {
                return [
                  ...prev,
                  {
                    ProductID: "",
                    SizeID: null,
                    Des: "",
                    Packing: "",
                    Price: null,
                  },
                ];
              })
            }
          >
            + เพิ่มไซส์
          </div>
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

          <button
            className="delete-button"
            type="button"
            style={{ display: isAvailable ? "" : "none" }}
            onClick={() => deleteHandler(productDetail.ProductID)}
          >
            <img
              src={trash}
              alt="delete product"
              className="delete-button-img"
            />
          </button>

          <button
            className="delete-button"
            type="button"
            style={{ display: isAvailable ? "none" : "" }}
            onClick={() => listingHandler(productDetail.ProductID)}
          >
            <img
              src={listing}
              alt="delete product"
              className="delete-button-img"
            />
          </button>
        </div>
      </Form>
    </div>
  );
}
