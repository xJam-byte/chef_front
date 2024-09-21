import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

import search_icon from "../assets/icons/Search More.svg";
import plus from "../assets/icons/Plus.svg";
import axios from "axios";
import dishesStore from "../store/DishStore";

const DishesPage = observer(() => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filter = [
    "Soups",
    "Salads",
    "Main course",
    "Desserts",
    "Vegeterian",
    "Spicy meals",
    "Cookies",
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    async function fetchDishes() {
      const result = await axios.get("http://localhost:5000/dishes");
      console.log(result.data);
      dishesStore.setDishes(result.data);
    }
    fetchDishes();
  }, []);
  const filteredDishes = dishesStore.dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeIndex === null ||
      dish.type.toLowerCase() === filter[activeIndex].toLowerCase();
    return matchesSearch && matchesCategory;
  });
  return (
    <>
      <div className="container d-block">
        <div className="discount-block dis1">
          <div className="top-text">-20%</div>
          <div className="bottom-text">
            <div className="text-block">
              <div className="yellow-text">Chef's name</div>
              <div className="main-text">First Order Discount</div>
            </div>
          </div>
          <div className="add">
            <img src={plus} alt="plus" />
          </div>
        </div>
        <div className="discount-block dis2">
          <div className="top-text">-20%</div>
          <div className="bottom-text">
            <div className="text-block">
              <div className="yellow-text">Chef's name</div>
              <div className="main-text">Vegan Discount</div>
            </div>
          </div>
          <div className="add">
            <img src={plus} alt="plus" />
          </div>
        </div>
        <div className="discount-block dis3">
          <div className="top-text">-100%</div>
          <div className="bottom-text">
            <div className="text-block">
              <div className="yellow-text">Chef's name</div>
              <div className="main-text">Free Ice Cream Offer</div>
            </div>
          </div>
          <div className="add">
            <img src={plus} alt="plus" />
          </div>
        </div>
      </div>
      <div className="seacrh-block">
        <p className="title">All Offers from all Chefs</p>
        <div className="search-container">
          <img src={search_icon} className="search-icon" alt="icon" />
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search...`}
          />
        </div>
      </div>
      <div className="mini-filter">
        <div className="filter">
          <div
            onClick={() => handleClick(null)}
            className={`element ${activeIndex === null ? "active" : ""}`}
          >
            All
          </div>
          {filter.map((one, i) => (
            <div
              onClick={() => handleClick(i)}
              className={`element ${activeIndex === i ? "active" : ""}`}
              key={i}
            >
              {one}
            </div>
          ))}
        </div>
      </div>
      <div className="container dishes">
        <h2>{activeIndex !== null ? filter[activeIndex] : "All Dishes"}</h2>
        <div className="df">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish, i) => (
              <div className="dish" key={i}>
                <div className="left-block">
                  <p className="dish-name">{dish.name}</p>
                  <p className="dish-description">{dish.description}</p>
                  <p className="dish-price">{dish.price}</p>
                </div>
                <div className="right-block">
                  {/* <img src={carb} alt="dish_picture" /> */}
                  <div className="add">
                    <img src={plus} alt="plus" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No dishes found matching your criteria.</p>
          )}
        </div>
      </div>
    </>
  );
});

export default DishesPage;
