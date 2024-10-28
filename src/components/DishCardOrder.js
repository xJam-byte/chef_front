import React, { useState } from "react";

const DishCardOrder = ({ onClick, dish, handleAddToBasket }) => {
  const [preferences, setPreferences] = useState("");
  return (
    <div className="dish-card">
      <div
        className="top-dish-block"
        onClick={() => onClick(dish)}
        style={{ cursor: "pointer" }}
      >
        <div className="left-dish-block">
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p>{dish.ingredients}</p>
        </div>
        <div
          className="right-dish-block"
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${dish.picture})`,
          }}
        ></div>
      </div>
      <div className="bottom-dish-block">
        <textarea
          placeholder="Your preferences (optional)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <button onClick={() => handleAddToBasket({ ...dish, preferences })}>
          add to basket
        </button>
      </div>
    </div>
  );
};

export default DishCardOrder;
