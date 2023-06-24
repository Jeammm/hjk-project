import { useNavigate, Form, redirect } from "react-router-dom";

import { newCategory } from "../../services/product";

import ImgUploader from "../../components/ImgUploader";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // const newCatId = await newCategory(data);
  await newCategory(data);
  window.alert("New Category created successfully")
  return redirect(`/admin/category/`);
}

export default function NewCategory() {
  const navigate = useNavigate();

  return (
    <div className="edit-category-form-conatiner">
      <h2>สร้างหมวดหมู่ใหม่</h2>
      <Form method="post">
        <ImgUploader prevImg="http://via.placeholder.com/270x150" img_field="Thumbnail" />
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่</p>
          <input type="text" name="CategoryTH" autoComplete="off" />
        </div>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ (EN)</p>
          <input type="text" name="CategoryEN" autoComplete="off" />
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
