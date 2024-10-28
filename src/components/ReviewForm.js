import React, { useState } from "react";

const ReviewForm = ({ onSubmitReview, rating, setRating }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReview({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className="review-form">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};
export default ReviewForm;
