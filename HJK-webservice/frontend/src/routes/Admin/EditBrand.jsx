import { getBrands, editBrand } from "../../services/product";

import { useLoaderData, Form, useNavigate, redirect } from "react-router-dom";

import ImgUploader from "../../components/ImgUploader";

export async function loader({ params }) {
  const allBrands = await getBrands();

  const brand = allBrands.filter((b) => b.BrandID === parseInt(params.brandId));

  if (brand.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { brand };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await editBrand(params.brandId, data);
  return redirect(`/admin/brand/`);
}

export default function EditCategory() {
  const { brand } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div id="brand-edit-container">
      <Form id="brand-edit-form" method="post" key={brand[0].BrandID}>
        <h1>แก้ไขแบรนด์</h1>
        <ImgUploader
          prevImg={brand[0].Logo || "http://via.placeholder.com/200x200"}
          img_field="Logo"
        />
        <label>
          ชื่อไทย :
          <input
            type="text"
            name="NameTH"
            defaultValue={brand[0].NameTH}
            aria-label="ชื่อไทย"
            placeholder="ชื่อไทย"
            autoComplete="off"
          />
        </label>
        <label>
          ชื่อ Eng :
          <input
            type="text"
            name="NameEN"
            defaultValue={brand[0].NameEN}
            aria-label="ชื่อ EN"
            placeholder="ชื่อ EN"
            autoComplete="off"
          />
        </label>

        <div id="place-order-button-container">
          <button type="submit" className="order-button" id="add-to-basket">
            ยืนยัน
          </button>
          <button
            type="button"
            className="order-button"
            id="cancel"
            onClick={() => navigate("/admin/brand")}
          >
            ยกเลิก
          </button>
        </div>
      </Form>
    </div>
  );
}
