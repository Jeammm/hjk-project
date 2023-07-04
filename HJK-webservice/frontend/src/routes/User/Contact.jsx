import { getContact } from "../../services/settings";

import { useLoaderData } from "react-router-dom"

export async function loader () {
  return {contact: "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000"}
}

export default function Contact() {

  const { contact } = useLoaderData();

  return (
    <div className="contact-container">
      <img src={contact} alt="contact" style={{width: "300px"}}/>
      <p>contact here</p>
    </div>
  )
}