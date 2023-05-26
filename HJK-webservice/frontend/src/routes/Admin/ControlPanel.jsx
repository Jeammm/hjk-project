import "../../styles/ControlPanel.css"

import { Outlet } from "react-router-dom"


export default function ControlPanel() {

  const token = "root"

  return (
    <div id="control-panel-container">
      <header className="header-bg">
        <div className="header-container">
          <h2>Control Panel</h2>
          <div className="left-m-auto">
            <p>Logged in as <big>{token}</big></p>
            <button id="logout-button" onClick={() => window.confirm("Logging out?")}>Logout</button>
          </div>
        </div>
      </header>

      <div id="control-panel-detail-container">
        <Outlet />
      </div>
    </div>
  )
}