import { useNavigate, Form} from "react-router-dom"

export default function NewCategory() {
  const navigate = useNavigate();

  return (
    <div className="edit-category-form-conatiner">
      <h2>สร้างหมวดหมู่ใหม่</h2>
      <Form>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่</p>
          <input
            type="text"
            name="CategoryTH"
          />
        </div>
        <div className="edit-input-field">
          <p>ชื่อหมวดหมู่ (EN)</p>
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
  )
}