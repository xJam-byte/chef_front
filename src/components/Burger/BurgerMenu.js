import React, { useState } from "react";
import "./BurgerMenu.scss";
import { Link } from "react-router-dom";
import userStore from "../../store/UserStore";
import { useNavigate } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    userStore.clearUser();
    navigate("/");
  };

  return (
    <div className="burger-menu">
      <div
        className={`burger-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <nav className={`menu-nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {userStore.user !== undefined ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </>
          ) : null}

          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {userStore.user !== undefined ? (
            <li>
              <button onClick={logout}>Log out</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;
