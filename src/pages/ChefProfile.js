import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import chefStore from "../store/ChefStore";
import profile from "../assets/images/profile.png";
import dishesStore from "../store/DishStore";
import DishCard from "../components/DishCard";

const ChefProfile = () => {
  const { chefId } = useParams();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundChef = chefStore.chefs.find(
      (chef) => chef.user.user_id === Number(chefId)
    );

    if (foundChef) {
      setChef(foundChef);
      setLoading(false);
    } else {
      setError("Chef not found");
      setLoading(false);
    }
  }, [chefId]);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;
  const filteredDishes = dishesStore.dishes.filter((dish) => {
    return dish.chefId === Number(chef.chef_id);
  });
  return (
    <div className="chef-profile container">
      <div className="chef-info">
        <img
          src={
            chef.user.profile_pic
              ? `http://localhost:5000${chef.user.profile_pic}`
              : profile
          }
          alt={chef.user.name}
          className="chef-image"
        />
        <div className="chef-details">
          <h1>{chef.user.name}</h1>
          <p className="chef-bio">{chef.bio}</p>
          <p className="chef-rating">Rating: {chef.rating}</p>
        </div>
      </div>

      <div className="chef-dishes">
        <h2>Chef's Dishes</h2>
        <div className="dishes-grid">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <DishCard key={dish.dish_id} dish={dish} />
            ))
          ) : (
            <p>No dishes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChefProfile;
