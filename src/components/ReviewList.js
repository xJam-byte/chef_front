// src/components/ReviewList.js
import React from "react";

const ReviewList = ({ reviews }) => (
  <div className="review-list">
    <h2>Reviews</h2>
    <div className="wrr">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <h4>Anonim</h4>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  </div>
);

export default ReviewList;
