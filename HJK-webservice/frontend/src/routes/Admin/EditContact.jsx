import "../../styles/EditContact.css"

import {Form } from "react-router-dom"

import ImgUploader from "../../components/ImgUploader";

export async function loader() {
  return null;
}

export async function action() {
  return null;
}


export default function EditContact() {
  return (
    <div className="contact-edit-container">
      <h2>อัพโหลดรูปข้อมูลติดต่อ</h2>
      <Form method="post">
        <ImgUploader prevImg={"" || "http://via.placeholder.com/1400x600"} img_field="ContactCard" width="1100px" height="500px"/>
        <button type="submit">ยืนยัน</button>
      </Form>
    </div>
  )
}