import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    "ngrok-skip-browser-warning": true,
  },
};

export async function getBannerSettings(role="admin") {
  const res = await axios.get(`${url}/banner` ,{
    ...config,
    withCredentials: true,
    header: {role}
  });
  return res.data.data;
}

export async function addBanner(detail) {
  const res = await axios.post(`${url}/banner`, detail, {
    ...config,
    withCredentials: true,
  });
  return res.data.data;
}

export async function deleteBanner(detail) {
  const res = await axios.delete(`${url}/banner`, detail, {
    ...config,
    withCredentials: true,
  });
  return res.data.data;
}

export async function selectBanner(detail) {
  console.log(detail)
  const res = await axios.put(`${url}/banner`, detail, {
    ...config,
    withCredentials: true,
  });
  console.log(res)
  return res.data.data;
}

export async function unselectBanner(detail) {
  const res = await axios.patch(`${url}/banner`, detail, {
    ...config,
    withCredentials: true,
  });
  return res.data.data;
}
