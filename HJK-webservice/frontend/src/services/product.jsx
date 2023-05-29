import axios from "axios"

const url = "http://localhost:8000/api/v1"

export async function getAllCategory() {
  const res = await axios.get(`${url}/category`)
  return res.data.data;
}

export async function checkCategory(id) {
  const res = await axios.get(`${url}/checkCategory/${id}`)
  return res.data.data;
}

export async function checkSubCategory(catId, subId) {
  const res = await axios.get(`${url}/checkSubCategory/${catId}/${subId}`)
  return res.data.data;
}

export async function getSubCategory(id) {
  const res = await axios.get(`${url}/category/${id}`)
  return res.data.data;
}

export async function getItems(id) {
  const res = await axios.get(`${url}/subCategory/${id}`)
  return res.data.data;
}

export async function getProduct(id) {
  const res = await axios.get(`${url}/product/${id}`)
  return res.data.data
}

export async function getBrands() {
  const res = await axios.get(`${url}/brands`)
  return res.data.data;
}

export async function getBrandItem(id) {
  const res = await axios.get(`${url}/brands/${id}`)
  return res.data.data;
}

export async function editCategory(id, detail) {
  try {
    const res = await axios.patch(`${url}/category/${id}`, detail, {
      withCredentials: true,
    });
    return res;

  } catch (err) {
    // console.log(err)
    window.alert(err.response.message);
  }
}

export async function newCategory(detail) {
  try {
    const res = await axios.post(`${url}/category`, detail, {
      withCredentials: true,
    });
    return res;

  } catch (err) {
    // console.log(err)
    window.alert(err.response.message);
  }
}

export async function editSubCategory(id, detail) {
  try {
    const res = await axios.patch(`${url}/subcategory/${id}`, detail, {
      withCredentials: true,
    });
    return res;

  } catch (err) {
    // console.log(err)
    window.alert(err.response.message);
  }
}

export async function newSubCategory(id, detail) {
  try {
    const res = await axios.post(`${url}/category/${id}`, detail, {
      withCredentials: true,
    });
    return res;

  } catch (err) {
    // console.log(err)
    window.alert(err.response.message);
  }
}

export async function editProduct(id, detail) {
  try {
    const res = await axios.patch(`${url}/product/${id}`, detail, {
      withCredentials: true,
    });

    return res;

  } catch (err) {
    // console.log(err)
    window.alert(err.response.message);
  }
}

export async function newProduct(id, detail) {
  try {
    const res = await axios.post(`${url}/subcategory/${id}`, detail, {
      withCredentials: true,
    });

    return res;

  } catch (err) {
    // console.log(err)
    window.alert(err.response.message);
  }
}