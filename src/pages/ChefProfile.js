import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import chefStore from "../store/ChefStore";
import profile from "../assets/images/profile.png";
import dishesStore from "../store/DishStore";
import DishCard from "../components/DishCard";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import StarRating from "../components/StartRating";
import axios from "axios";
import userStore from "../store/UserStore";

const ChefProfile = () => {
  const { chefId } = useParams();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const foundChef = chefStore.chefs.find(
      (chef) => chef.user.user_id === Number(chefId)
    );

    if (foundChef) {
      console.log(foundChef.chef_id);

      setChef(foundChef);
      setLoading(false);
    } else {
      setError("Chef not found");
      setLoading(false);
    }
  }, [chefId]);

  const handleAddReview = async (review) => {
    try {
      console.log(
        userStore.user.user_id,
        Number(chef.chef_id),
        rating,
        review.comment
      );

      const response = await axios.post("http://localhost:5000/reviews", {
        userId: userStore.user.user_id,
        chefId: Number(chef.chef_id),
        rating: rating,
        comment: review.comment,
      });

      const savedReview = response.data;
      setReviews((prevReviews) => [...prevReviews, savedReview]);
      setRating(0);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/reviews/chef/${chef.chef_id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [chef]);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  const filteredDishes = dishesStore.dishes.filter(
    (dish) => dish.chefId === Number(chef.chef_id)
  );

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
          <StarRating onRatingSelect={(value) => setRating(value)} />
        </div>
        <div className="review-section">
          <ReviewForm
            rating={rating}
            setRating={setRating}
            onSubmitReview={handleAddReview}
          />
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
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ChefProfile;
