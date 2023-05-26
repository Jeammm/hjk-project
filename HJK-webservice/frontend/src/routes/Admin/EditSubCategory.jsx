import "../../styles/EditCategory.css";

import { checkSubCategory } from "../../services/product";

import { useLoaderData, Form, useNavigate } from "react-router-dom";

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

export default function EditSubCategory() {
  const { subCategory } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="edit-category-form-conatiner">
      <h2>Sub-Category ID: {subCategory[0].SubCategoryID}</h2>
      <Form key={subCategory[0].SubCategoryID}>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย</p>
          <input
            type="text"
            name="SubCategoryTH"
            defaultValue={subCategory[0].SubNameTH}
          />
        </div>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย (EN)</p>
          <input
            type="text"
            name="CategoryEN"
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
