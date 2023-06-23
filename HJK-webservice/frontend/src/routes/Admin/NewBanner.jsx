import { useNavigate, Form, redirect } from "react-router-dom";

import { addBanner } from "../../services/settings";

import ImgUploader from "../../components/ImgUploader";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data)
  try {
    await addBanner(data);
    return redirect(`/admin/banner/`);
  } catch (err) {
    window.alert(err.response.data.message)
    return null;
  }
}

export default function NewBanner() {
  const navigate = useNavigate();

  return (
    <div className="blur-bg">
      <div className="new-banner-container">
        <h2>อัพโหลดแบนเนอร์</h2>
        <Form method="post">
          <ImgUploader
            prevImg="http://via.placeholder.com/2179x1000"
            img_field="BannerURL"
            width={400}
            height={130}
          />
          <div className="edit-input-field">
            <p>ชื่อ</p>
            <input type="text" name="BannerName" autoComplete="off" />
          </div>
          <div className="edit-input-field">
            <p>รายละเอียด</p>
            <input type="text" name="BannerDes" autoComplete="off" />
          </div>

          <div id="place-order-button-container">
            <button type="submit" className="order-button" id="add-to-basket">
              ยืนยัน
            </button>
            <button
              type="button"
              className="order-button"
              id="cancel"
              onClick={() => navigate("/admin/banner")}
            >
              ยกเลิก
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
