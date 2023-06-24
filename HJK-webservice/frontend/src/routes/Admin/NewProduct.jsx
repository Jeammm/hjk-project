import { useState } from "react";

import {
  checkSubCategory,
  newProduct,
  getBrands,
} from "../../services/product";

import {
  useLoaderData,
  useNavigate,
  Form,
  redirect,
  NavLink,
} from "react-router-dom";

import Select from "react-select";

import ImgUploader from "../../components/ImgUploader";

export async function loader({ params }) {
  const subCategoryCheck = await checkSubCategory(
    params.categoryId,
    params.subcategoryId
  );
  if (subCategoryCheck.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const brands = await getBrands();

  const subCategoryId = params.subcategoryId;
  return { subCategoryId, brands };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.IsColor === undefined) data.IsColor = 0;
  else data.IsColor = 1;

  const res = await newProduct(params.subcategoryId, data);
  // const productId = res.data.productId;
  window.alert(res.data.data[0]);
  return redirect(
    `/admin/category/${params.categoryId}/subcategory/${params.subcategoryId}/product/`
  );
}

export default function NewProduct() {
  const { brands } = useLoaderData();
  const [brandOptions, setBrandOptions] = useState(brands);
  const fetchOption = async () => {
    const brands = await getBrands();
    setBrandOptions(brands);
  };

  const navigate = useNavigate();

  const [sizeNo, setSizeNo] = useState(1);

  const sizeOptionGen = (amount) => {
    const sizeOption = [];

    for (let i = 1; i <= amount; i++) {
      sizeOption.push(
        <div className="size-detail" key={i}>
          <input
            className={`size-detail-box w-200 size-input-box ${cal_color(i)}`}
            value={i}
            readOnly
            required={true}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            name={`${i}_Des`}
            required={true}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            name={`${i}_Packing`}
            required={true}
          />

          <input
            className={`size-detail-box w-150 size-input-box ${cal_color(i)}`}
            name={`${i}_Price`}
            required={true}
            type="number"
            min={0}
          />
        </div>
      );
    }
    return sizeOption;
  };

  const cal_color = (i) => {
    if (i % 2 === 0) return "dark";
    else return "grey";
  };

  const brands_option = brandOptions.map((b) => {
    return { value: b.BrandID, label: `${b.NameTH} ${b.NameEN}` };
  });

  return (
    <div id="product-detail">
      <div className="topic-with-close">
        <h3 id="product-detail-topic">เพิ่มสินค้าใหม่</h3>
        <button id="close-button" onClick={() => navigate(-1)}>
          X
        </button>
      </div>
      <Form method="post">
        <div id="img-with-desc">
          {/* <img loading="lazy" src="../assets/logo.svg" alt="product" id="product-img" /> */}
          <ImgUploader
            prevImg="http://via.placeholder.com/170x200"
            img_field="Thumbnail"
          />
          <div id="detail-beside-img">
            {/* <input
              type="text"
              value={subCategoryId}
              readOnly
              hidden
              name="SubCategory"
            /> */}
            <input
              id="product-name"
              placeholder="ชื่อสินค้า..."
              name="NameTH"
              autoComplete="off"
            />
            <textarea
              id="product-desc"
              placeholder="รายละเอียดสินค้า..."
              name="DesTH"
            />
          </div>
        </div>

        <div className="color-checker-container">
          <label htmlFor="IsColor">
            <input type="checkbox" className="color-check-box" name="IsColor" />
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
            <div className="select-container">
              <Select
                options={brands_option}
                name="Brand"
                isClearable={true}
                isSearchable={true}
                className="select-component"
              />
              <button type="button" onClick={fetchOption}>
                refresh
              </button>
            </div>
          </label>
        </div>

        <div id="size-container">
          <div className="size-detail">
            <p className="size-detail-box w-200 table-topic">รหัสสินค้า</p>
            <p className="size-detail-box w-150 table-topic">ขนาด</p>
            <p className="size-detail-box w-150 table-topic">บรรจุ</p>
            <p className="size-detail-box w-150 table-topic">ราคา</p>
          </div>
          {sizeOptionGen(sizeNo)}
          <div
            className="add-new-size selectable"
            onClick={() => setSizeNo((prev) => prev + 1)}
          >
            ADD +
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
        </div>
      </Form>
    </div>
  );
}
