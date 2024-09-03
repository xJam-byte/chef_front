import React from "react";
import pizza from "../assets/images/pizza.png";
import noodles from "../assets/images/noodles.png";
import background from "../assets/images/hero_background.png";
import Restaurants from "../components/Restaurants";
import BecomeChef from "../components/BecomeChef";

function HomePage() {
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-content">
          <p>Order Restaurant food, takeaway and groceries.</p>
          <h1>
            Feast Your Senses, <span>Fast and Fresh</span>
          </h1>
          <div className="hero-search">
            <input type="text" placeholder="e.g. EC4R 3TE" />
            <button>Search</button>
          </div>
        </div>

        <div className="hero-images">
          <img className="first" src={pizza} alt="Woman eating pizza" />
          <img className="sec" src={noodles} alt="Woman eating noodles" />
          <img className="third" src={background} alt="Woman eating noodles" />
        </div>
      </div>
      <Restaurants h2_text="Popular Chefs" />
      <BecomeChef />
    </div>
  );
}

export default HomePage;
