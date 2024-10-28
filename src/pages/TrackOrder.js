import React from "react";

const TrackOrder = () => {
  return (
    <div className="track-order">
      <h2>Track Your Order</h2>
      <div className="order-status">
        <div className="status-step completed">
          <span className="status-circle">1</span>
          <p>Order Received</p>
        </div>
        <div className="status-line completed"></div>
        <div className="status-step completed">
          <span className="status-circle">2</span>
          <p>Preparing</p>
        </div>
        <div className="status-line completed"></div>
        <div className="status-step active">
          <span className="status-circle">3</span>
          <p>On the Way</p>
        </div>
        <div className="status-line"></div>
        <div className="status-step">
          <span className="status-circle">4</span>
          <p>Delivered</p>
        </div>
      </div>
      <div className="order-info">
        <h3>Order Details</h3>
        <p>Order ID: #12345</p>
        <p>Estimated Delivery: 45 minutes</p>
      </div>
    </div>
  );
};

export default TrackOrder;
