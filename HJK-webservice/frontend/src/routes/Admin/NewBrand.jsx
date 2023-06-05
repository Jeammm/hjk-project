import { useNavigate, Form, redirect } from "react-router-dom";

import { newBrand } from "../../services/product";

import ImgUploader from "../../components/ImgUploader";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await newBrand(data);
  return redirect(`/admin/brand/`);
}

export default function NewCategory() {
  const navigate = useNavigate();

  return (
    <div id="brand-edit-container">
      <Form id="brand-edit-form" method="post" key="new-brand">
        <h1>เพิ่มแบรนด์ใหม่</h1>
        <ImgUploader prevImg={"placeholder.png"} img_field="Logo" />
        <label>
          ชื่อไทย :
          <input
            type="text"
            name="NameTH"
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
