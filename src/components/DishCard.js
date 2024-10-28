import React from "react";
import carb from "../assets/images/Carbonara.jpg";

const DishCard = ({ dish }) => {
  return (
    <div className="dish-card">
      <img
        src={
          dish.picture ? `http://localhost:5000/uploads/${dish.picture}` : carb
        }
        alt={dish.name}
        className="dish-image"
      />
      <div className="dish-details">
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <p className="dish-price">{dish.price} €</p>
        <p className="dish-ingredients">{dish.ingredients}</p>
      </div>
    </div>
  );
};

export default DishCard;
