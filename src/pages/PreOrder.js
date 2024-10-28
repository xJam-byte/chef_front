import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import dishesStore from "../store/DishStore";
import Basket from "../components/Basket";

import search_icon from "../assets/icons/Search More.svg";
import menu from "../assets/icons/menu.png";
import DishCardOrder from "../components/DishCardOrder";

const PreOrder = observer(() => {
  const [preferences, setPreferences] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleRemoveFromBasket = (dishId) => {
    dishesStore.removeFromBasket(dishId);
  };

  const handleAddToBasket = (dish) => {
    dishesStore.addToBasket({ ...dish });
  };

  const filteredDishes = dishesStore.dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeIndex === null ||
      dish.type.toLowerCase() === filter[activeIndex].toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const closeModal = () => {
    setShowModal(false);
    setSelectedDish(null);
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
    setShowModal(true);
  };
  return (
    <>
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
      <div className="app container">
        <aside>
          <nav className="menu">
            <div
              style={{ cursor: "pointer" }}
              className="menu-title"
              onClick={() => handleClick(null)}
            >
              <img width={50} height={50} src={menu} alt="menu" />
              <h1>Menu</h1>
            </div>
            <ul>
              {filter.map((category, i) => (
                <li
                  onClick={() => handleClick(i)}
                  className={`element ${activeIndex === i ? "active" : ""}`}
                  key={i}
                >
                  {category}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main>
          <div className="dish-list">
            {filteredDishes.map((dish, i) => (
              <DishCardOrder
                key={i}
                dish={dish}
                onClick={(dish) => handleDishClick(dish)}
                handleAddToBasket={handleAddToBasket}
              />
            ))}
          </div>
        </main>
        <aside>
          <Basket handleRemoveFromBasket={handleRemoveFromBasket} />
        </aside>
      </div>
      {showModal && selectedDish && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <img
              src={
                selectedDish.picture
                  ? `http://localhost:5000/uploads/${selectedDish.picture}`
                  : null
              }
              alt="dish_picture"
            />
            <div className="details">
              <h2>{selectedDish.name}</h2>
              <p>
                Description:{" "}
                <span className="separator">{selectedDish.description}</span>
              </p>
              <p>
                Price: <span className="separator">{selectedDish.price}€</span>
              </p>
              <p>
                Type: <span className="separator">{selectedDish.type}</span>
              </p>
              <p>
                Chef: <span className="separator">{selectedDish.chef}</span>
              </p>
              <p>
                Ingredients:{" "}
                <span className="separator">{selectedDish.ingredients}</span>
              </p>
              <p>
                Status:{" "}
                <span className="separator">
                  {selectedDish.availability_status}
                </span>
              </p>
              <button className="add-button">add to basket</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default PreOrder;
