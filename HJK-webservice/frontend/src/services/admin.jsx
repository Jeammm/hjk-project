import axios from "axios";

// const url = "http://localhost:8000/api/v1/user";
const url = `${process.env.REACT_APP_BACKEND_URL}/user`;

const config = {
  headers: {
    "ngrok-skip-browser-warning": true,
  },
};

export async function login(loginDetail) {
  const res = await axios.post(
    `${url}/login`,
    { ...config, ...loginDetail },
    {
      withCredentials: true,
    }
  );
  return res;
}

export async function isAuthorized() {
  try {
    const res = await axios.post(
      `${url}/isAuthorized`,
      { ...config },
      { withCredentials: true }
    );

    return res.data;
  } catch (err) {
    if (err.code === 401) {
      // window.alert("You are not Logged in")
      return false;
    }
    // window.alert("You are not Authorized")
    return false;
  }
}

export async function logout() {
  try {
    const res = await axios.post(
      `${url}/logout`,
      { ...config },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (err) {
    window.alert(err.response.data.message);
  }
}
