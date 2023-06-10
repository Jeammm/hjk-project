import axios from "axios";

// const url = "http://localhost:8000/api/v1/user";
const url = `${process.env.REACT_APP_BACKEND_URL}/user`;

export async function login(loginDetail) {
  const res = await axios.post(`${url}/login`, loginDetail, {
    withCredentials: true,
  });
  return res;
}

export async function isAuthorized() {
  try {
    const res = await axios.post(
      `${url}/isAuthorized`,
      {},
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
      {},
      {
        withCredentials: true,
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    // console.log(err)
    window.alert(err.response.data.message);
  }
}
