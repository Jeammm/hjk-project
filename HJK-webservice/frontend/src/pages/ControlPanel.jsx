import "../styles/ControlPanel.css";

import {
  Outlet,
  Navigate,
  useLoaderData,
  useNavigate,
  NavLink,
} from "react-router-dom";

import { isAuthorized, logout } from "../services/admin";

export async function loader() {
  const data = async () => {
    return await isAuthorized();
  };

  const user = await data();

  return { user };
}

const logoutHandler = async () => {
  await logout();
};

export default function ControlPanel() {
  const { user } = useLoaderData();

  const navigate = useNavigate();

  return user ? (
    <div id="control-panel-container">
      <header className="header-bg">
        <div className="header-container">
          <NavLink to="/admin">
            <h2 style={{ cursor: "pointer" }}>Control Panel</h2>
          </NavLink>
          <div className="left-m-auto">
            <p>
              Logged in as <big>{user.freshUser.username}</big>
            </p>
            <button
              id="logout-button"
              onClick={(event) => {
                if (!window.confirm("Logging out?")) {
                  event.preventDefault();
                } else {
                  logoutHandler().then(navigate(0));
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div id="control-panel-detail-container">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
