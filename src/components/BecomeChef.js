import React from "react";
import { useNavigate } from "react-router";

const BecomeChef = () => {
  const navigate = useNavigate();
  return (
    <div className="become container">
      <div className="top-block">Earn more with us</div>
      <div className="get-started-block">
        <p className="yellow-text">Signup as a chef</p>
        <p className="main-text">Partner with us</p>
        <button onClick={() => navigate("/become_chef")}>Get Started</button>
      </div>
    </div>
  );
};

export default BecomeChef;
