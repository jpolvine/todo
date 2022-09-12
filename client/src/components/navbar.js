import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import './style.css';


// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
      {/*   <img id="boticon"style={{"width" : 5 + '%'}} alt="icon" src="https://previews.123rf.com/images/makc76/makc761709/makc76170900058/86223168-icono-de-bot-de-chat-esquema-robot-firmar-en-c%C3%ADrculo-azul-ilustraci%C3%B3n-vectorial-bot-de-servicio-de-s.jpg"></img>*/}
        <h3 class="d-inline-block align-text-middle" >TODO List</h3></NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create"><h3 id="createmotdlink">
                Create New TODO</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
