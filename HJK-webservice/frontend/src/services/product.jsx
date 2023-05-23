import axios from "axios"

const url = "http://localhost:8000/api/v1"

export async function getAllCategory() {
  const res = await axios.get(`${url}/category`)
  return res.data;
}

export async function getSubCategory(id) {
  const res = await axios.get(`${url}/category/${id}`)
  return res.data;
}

export async function getItems(id) {
  const res = await axios.get(`${url}/subCategory/${id}`)
  return res.data.data;
}

export async function getProduct(id) {
  const res = await axios.get(`${url}/product/${id}`)
  return res.data
}

export async function getBrands() {
  const res = await axios.get(`${url}/brands`)
  return res.data;
}

export async function getBrandItem(id) {
  const res = await axios.get(`${url}/brands/${id}`)
  return res.data;
}