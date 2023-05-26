import "../../styles/EditCategory.css";

import { checkSubCategory, editSubCategory } from "../../services/product";

import { useLoaderData, Form, useNavigate, redirect } from "react-router-dom";

export async function loader({ params }) {
  const subCategory = await checkSubCategory(params.categoryId, params.subcategoryId);

  if (subCategory.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { subCategory };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await editSubCategory(params.subcategoryId, data);
  return redirect(`/admin/category/${params.categoryId}/SubCategory/${params.subcategoryId}/product`);
}

export default function EditSubCategory() {
  const { subCategory } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="edit-category-form-conatiner">
      <h2>Sub-Category ID: {subCategory[0].SubCategoryID}</h2>
      <Form key={subCategory[0].SubCategoryID} method="post">
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย</p>
          <input
            type="text"
            name="SubNameTH"
            defaultValue={subCategory[0].SubNameTH}
          />
        </div>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย (EN)</p>
          <input
            type="text"
            name="SubNameEN"
            defaultValue={subCategory[0].SubNameEN}
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
