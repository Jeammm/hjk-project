import { useNavigate, Form, redirect} from "react-router-dom"

import { newSubCategory } from "../../services/product"

import ImgUploader from "../../components/ImgUploader";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newCatId = await newSubCategory(params.categoryId, data);
  return redirect(`/admin/category/${params.categoryId}/subcategory`);
}


export default function NewSubCategory() {
  const navigate = useNavigate();

  return (
    <div className="edit-category-form-conatiner">
      <h2>สร้างหมวดหมู่ย่อยใหม่</h2>
      <Form method="post">
        <ImgUploader prevImg="placeholder.png" img_field="Thumbnail"/>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย</p>
          <input
            type="text"
            name="SubNameTH"
          />
        </div>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย (EN)</p>
          <input
            type="text"
            name="SubNameEN"
          />
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