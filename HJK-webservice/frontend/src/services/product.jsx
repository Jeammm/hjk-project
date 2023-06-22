import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    "ngrok-skip-browser-warning": true,
  },
};

export async function getHome() {
  const cat = getAllCategory();
  const brand = getBrands(1);

  const finalResult = {
    category: await cat,
    brand: await brand,
  };
  return finalResult;
}

export async function getAllCategory() {
  try {
    const res = await axios.get(`${url}/category`, config);
    if (!res.data.data) {
      throw new Error();
    }
    return res.data.data;
  } catch (err) {
    return [];
  }
}

export async function checkCategory(id) {
  const res = await axios.get(`${url}/checkCategory/${id}`, config);
  return res.data.data;
}

export async function checkSubCategory(catId, subId) {
  const res = await axios.get(
    `${url}/checkSubCategory/${catId}/${subId}`,
    config
  );
  return res.data.data;
}

export async function getSubName(subId) {
  const res = await axios.get(`${url}/getSubName/${subId}`, config);
  return res.data.data;
}

export async function getSubCategory(id, page) {
  const res = await axios.get(`${url}/category/${id}`, {
    ...config,
    params: {
      page: page,
    },
  });
  return res.data.data;
}

export async function getItems(id, page) {
  const res = await axios.get(`${url}/subCategory/${id}`, {
    ...config,
    params: {
      page: page,
    },
  });
  return res.data.data;
}

export async function getProduct(id) {
  const res = await axios.get(`${url}/product/${id}`, { ...config });
  return res.data.data;
}

export async function getBrands(page) {
  const res = await axios.get(`${url}/brands`, {
    ...config,
    params: {
      page: page,
    },
  });
  return res.data.data;
}

export async function getBrandItem(id, page) {
  const res = await axios.get(`${url}/brands/${id}`, {
    ...config,
    params: {
      page: page,
    },
  });
  return res.data.data;
}

export async function editCategory(id, detail) {

  try {
    const res = await axios.patch(`${url}/category/${id}`, detail, {
      ...config,
      withCredentials: true,
    });
    return res;
  } catch (err) {
    window.alert(err.response.message);
  }
}

export async function newCategory(detail) {
  try {
    const res = await axios.post(`${url}/category`, detail, {
      ...config,
      withCredentials: true,
    });
    return res;
  } catch (err) {
    window.alert(err.response.message);
  }
}

export async function editSubCategory(id, detail) {
  try {
    const res = await axios.patch(`${url}/subcategory/${id}`, detail, {
      ...config,
      withCredentials: true,
    });
    return res;
  } catch (err) {
    window.alert(err.response.message);
  }
}

export async function newSubCategory(id, detail) {
  try {
    const res = await axios.post(`${url}/category/${id}`, detail, {
      ...config,
      withCredentials: true,
    });
    return res;
  } catch (err) {
    window.alert(err.response.message);
  }
}

export async function editProduct(id, detail) {
  try {
    const res = await axios.patch(`${url}/product/${id}`, detail, {
      ...config,
      withCredentials: true,
    });

    return res;
  } catch (err) {
    window.alert(err.response);
  }
}

export async function delistProduct(id, detail) {
  try {
    const res = await axios.put(`${url}/product/${id}`, detail, {
      ...config,
      withCredentials: true,
    });

    return res;
  } catch (err) {
    window.alert(err.response);
  }
}

export async function newProduct(id, detail) {
  try {
    const res = await axios.post(`${url}/subcategory/${id}`, detail, {
      ...config,
      withCredentials: true,
    });

    return res;
  } catch (err) {
    window.alert(err.response.message);
  }
}

export async function editBrand(id, detail) {
  try {
    const res = await axios.patch(`${url}/brands/${id}`, detail, {
      ...config,
      withCredentials: true,
    });

    return res;
  } catch (err) {
    window.alert(err.response.message);
  }
}

export async function newBrand(detail) {
  try {
    const res = await axios.post(`${url}/brands/`, detail, {
      ...config,
      withCredentials: true,
    });

    return res;
  } catch (err) {
    window.alert(err.response.message);
  }
}

export async function queryProduct(q, p) {
  const query = { q: q ? q : "", p: p ? p : 1 };
  const res = await axios.get(`${url}/products`, { ...config, params: query });
  return res.data.data.product;
}

export async function searchProduct(q) {
  //simulate delay

  const query = { q };
  const res = await axios.get(`${url}/search`, { ...config, params: query });
  return res.data;
}
