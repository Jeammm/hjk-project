import "../../styles/EditCategory.css";

import { checkCategory } from "../../services/product";

import { useLoaderData, Form, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  const category = await checkCategory(params.categoryId);

  if (category.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { category };
}

export default function EditCategory() {
  const { category } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="edit-category-form-conatiner">
      <h2>Category ID: {category[0].CategoryID}</h2>
      <Form key={category[0].CategoryID}>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่</p>
          <input
            type="text"
            name="CategoryTH"
            defaultValue={category[0].CategoryTH}
          />
        </div>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ (EN)</p>
          <input
            type="text"
            name="CategoryEN"
            defaultValue={category[0].CategoryEN}
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