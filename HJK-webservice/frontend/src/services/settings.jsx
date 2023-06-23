import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    "ngrok-skip-browser-warning": true,
  },
};

export async function getBannerSettings() {
  const res = await axios.get(`${url}/banner`, {
    ...config,
    withCredentials: true,
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