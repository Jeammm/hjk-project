import "../styles/Admin.css";

import { Form } from "react-router-dom"

export default function Admin() {
  return (
    <div id="login-page-container">
        <Form>
          <div id="login-container">
            <h2>Login</h2>
            <input className="login-input login-text" type="username" placeholder="Username"/>
            <input className="login-input login-text" type="password" placeholder="Password"/>
            <button className="login-input login-button" type="submit">Login</button>
          </div>
        </Form>
    </div>
  )
}