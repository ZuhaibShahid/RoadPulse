import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink} from "react-router-dom";
import { faTachometerAlt, faGlobe, faCar} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <>
          <ul className="nav flex-column">
          <NavLink to="/" className="nav-link">
            <li className="nav-item">
              <FontAwesomeIcon icon={faTachometerAlt} className="icon me-2" /> Dashboard
            </li>
            </NavLink>
            <NavLink to="/countries" className="nav-link">
            <li className="nav-item">
              <FontAwesomeIcon icon={faGlobe} className="icon me-2" /> Countries
            </li>
            </NavLink>
            <NavLink to="/vehicles" className="nav-link">
            <li className="nav-item">
              <FontAwesomeIcon icon={faCar} className="icon me-2" /> Vehicle
            </li>
            </NavLink>
          </ul>
    </>
  );
};

export default Nav;
