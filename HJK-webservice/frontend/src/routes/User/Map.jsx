import { getMap } from "../../services/settings";

import { useLoaderData } from "react-router-dom"

export async function loader () {
  // const res = await getMap();
  return {map: "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000"}
}

export default function Map() {

  const { map } = useLoaderData();

  return (
    <div className="contact-container">
      <img src={map} alt="contact" style={{width: "300px"}}/>
      <p>map here</p>
    </div>
  )
}