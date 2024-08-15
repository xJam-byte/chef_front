import React from "react";
import BurgerMenu from "../components/Burger/BurgerMenu";
import { observer } from "mobx-react-lite";
import userStore from "../store/UserStore";
import cartStore from "../store/CartStore";
import { useNavigate } from "react-router";

const Header = observer(({ onLoginClick, onRegistrationClick }) => {
  const navigate = useNavigate();

  const cartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="App-header">
      <BurgerMenu />
      {userStore.user !== undefined ? (
        <div className="icons" onClick={cartClick}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <div>
            Cart <span className="spoon"> {cartStore.itemCount}</span>
          </div>
        </div>
      ) : (
        <div className="btns">
          <button onClick={onLoginClick} className="signin-btn">
            Sign In
          </button>
          <button onClick={onRegistrationClick} className="signup-btn">
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
});

export default Header;
