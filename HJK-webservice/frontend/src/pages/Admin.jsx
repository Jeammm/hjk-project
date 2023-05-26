import "../styles/Admin.css";

import { Form, redirect } from "react-router-dom";
import { login } from "../services/admin"

export async function action({ request }) {
  const formData = await request.formData();
  const loginDetail = Object.fromEntries(formData);
  await login(loginDetail);
  return redirect(`/admin`);
}

export default function Admin() {
  return (
    <div id="login-page-container">
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
    </div>
  );
}
