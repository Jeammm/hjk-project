import { useNavigate, Form} from "react-router-dom"


export default function NewSubCategory() {
  const navigate = useNavigate();

  return (
    <div className="edit-category-form-conatiner">
      <h2>สร้างหมวดหมู่ย่อยใหม่</h2>
      <Form>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย</p>
          <input
            type="text"
            name="SubCategoryTH"
          />
        </div>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ย่อย (EN)</p>
          <input
            type="text"
            name="CategoryEN"
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