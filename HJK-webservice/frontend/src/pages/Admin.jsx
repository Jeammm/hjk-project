import "../styles/Admin.css";

import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { login, isAuthorized } from "../services/admin";

export async function loader() {
  let authorized = false
  try {
    if (await isAuthorized()) authorized = true;
    return { authorized };
  } catch (error) {
    return { authorized };
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const loginDetail = Object.fromEntries(formData);
  try {
    await login(loginDetail);
    return redirect(`/admin`);
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      window.alert("Cannot connect to server. Please try again later.");
      return null;
    }
    window.alert(error.response.data.message);
    window.location.href = `${window.location.href}`;
    return null;
  }
}

export default function Admin() {
  const navigate = useNavigate();
  const { authorized } = useLoaderData();

  return (
    <div id="login-page-container">
      {authorized ? (
        <div id="login-container">
          <h2>You are already logged in</h2>
          <button type="button" onClick={() => navigate("/admin")}>Go to control panel</button>
        </div>
      ) : (
        <Form method="post" id="login-form">
          <div id="login-container">
            <h2>Login</h2>
            <input
              className="login-input login-text"
              type="username"
              placeholder="Username"
              name="username"
            />
            <input
              className="login-input login-text"
              type="password"
              placeholder="Password"
              name="password"
            />
            <button className="login-input login-button" type="submit">
              Login
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}
