import axios from "axios"

const url = "http://localhost:8000/api/v1/user"

export async function login(loginDetail) {
  console.log(loginDetail)
  const res = await axios.post(`${url}/login`, loginDetail)
  return res.data;
}