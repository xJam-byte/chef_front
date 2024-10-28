import React, { useEffect, useState } from "react";

import { Outlet, useLocation, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import discount_icon from "../assets/icons/discount_icon.png";
import Location_icon from "../assets/icons/Location_icon.svg";
import Shopping_basket from "../assets/icons/Shopping_basket.svg";
import Male_user from "../assets/icons/Male_user.png";
import userStore from "../store/UserStore";
import axios from "axios";
import dishesStore from "../store/DishStore";

const Layout = observer(() => {
  const [isAuth, setIsAuth] = useState(false);
  // const isAuth = true;
  const location = useLocation();
  const [isChef, setIsChef] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      setIsAuth(userStore.user !== undefined);
      if (isAuth && userStore.user && userStore.user.user_id) {
        if (userStore.user.role === "chef") {
          setIsChef(true);
          await fetchData();
        } else {
          setIsChef(false);
        }
      }
    };

    checkAuthAndFetch();
  }, [isAuth]);

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/chef/getChef/" + userStore.user.user_id
      );
      if (response.data !== undefined) {
        userStore.setChef(response.data);
      }
    } catch (error) {
      console.error("Error fetching chef data:", error);
    }
  }
  const authNavigate = () => {
    navigate("auth");
  };

  return (
    <main>
      <header className="container">
        {location.pathname === "/auth" ? null : (
          <div className="header">
            <div className="discount-block">
              <img src={discount_icon} alt="promo icon" />
              <p>
                Get 5% Off your first order,<span> Promo: ORDER5</span>
              </p>
            </div>
            <div className="right-block">
              <div className="location-block">
                <img src={Location_icon} alt="location icon" />
                <p>Regent Street, A4, A4201, London</p>
                <p className="change_location-btn">Change Location</p>
              </div>

              <div className="cart-block" onClick={() => navigate("/dishes")}>
                <div className="cart-icon cart-sub-block">
                  <img src={Shopping_basket} alt="cart icon" />
                </div>
                <div className="cart-count cart-sub-block">
                  {dishesStore.basket.length} items
                </div>
                <div className="cart-price cart-sub-block">
                  {dishesStore.totalOfBasket.toFixed(2)} €
                </div>
              </div>
            </div>
          </div>
        )}
        <nav>
          <div className="header-logo">Chef</div>
          <ul>
            <li className={location.pathname === "/" ? "active" : "inactive"}>
              <Link to="/">Home</Link>
            </li>
            <li
              className={
                location.pathname === "/dishes" ? "active" : "inactive"
              }
            >
              <Link to="/dishes">Dishes</Link>
            </li>
            {isChef ? (
              <li
                className={
                  location.pathname === "/create_dish" ? "active" : "inactive"
                }
              >
                <Link to="create_dish">Create dish</Link>
              </li>
            ) : null}
            <li
              className={
                location.pathname === "/track_order" ? "active" : "inactive"
              }
            >
              <Link to="track_order">Track order</Link>
            </li>
            <li
              className={
                location.pathname === "/profile"
                  ? "active profile-li"
                  : "inactive profile-li"
              }
            >
              {!isAuth ? (
                <button onClick={authNavigate} className="login-signup_btn">
                  <img src={Male_user} alt="btn icon" />{" "}
                  <span>Login/Signup</span>
                </button>
              ) : (
                <Link to="profile">Proflie</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer>
        <div className="first-block"></div>
        <div className="last-block"></div>
      </footer>
      <ToastContainer />
    </main>
  );
});

export default Layout;
