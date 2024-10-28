import React, { useState } from "react";
import axios from "axios";
import userStore from "../store/UserStore";
import { notifyError, notifySuccess } from "../utils/toast";

const CreateDish = () => {
  const [dishData, setDishData] = useState({
    chefId: userStore.chef?.chef_id,
    name: "",
    description: "",
    price: "",
    picture: "",
    type: "",
    ingredients: "",
  });

  const filter = [
    "Soups",
    "Salads",
    "Main course",
    "Desserts",
    "Vegeterian",
    "Spicy meals",
    "Cookies",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDishData({
          ...dishData,
          picture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setDishData({
        ...dishData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/dishes", {
        chefId: dishData.chefId,
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        picture: dishData.picture,
        type: dishData.type,
        ingredients: dishData.ingredients,
      });

      if (response.status >= 200 && response.status < 300) {
        notifySuccess("Dish created successfully!");
      } else {
        console.log(response);

        notifyError("Error creating dish");
      }
    } catch (error) {
      notifyError("Error:", error.message);
    }
  };

  return (
    <div className="create-dish-container container">
      <h2>Create a New Dish</h2>
      <form className="create-dish-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Dish Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={dishData.name}
            onChange={handleChange}
            required
            placeholder="Enter dish name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            style={{ resize: "none" }}
            id="description"
            name="description"
            value={dishData.description}
            onChange={handleChange}
            placeholder="Enter dish description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (€)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={dishData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={dishData.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select dish type
            </option>
            {filter.map((one, i) => (
              <option key={i} value={one}>
                {one}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={dishData.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients, separated by commas"
            required
          />
        </div>

        <button type="submit" className="create-dish-button">
          Create Dish
        </button>
      </form>
    </div>
  );
};

export default CreateDish;
