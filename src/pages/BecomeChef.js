import React, { useState } from "react";
import axios from "axios";
import userStore from "../store/UserStore";

const BecomeChef = () => {
  const [formData, setFormData] = useState({
    userId: userStore.user.user_id,
    bio: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:5000/chef/becomeChef",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ userId: "", bio: "" });
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="become-chef-container">
      <h1>Become our Chef!</h1>
      <form onSubmit={handleSubmit} className="chef-form">
        <div className="form-group">
          <label htmlFor="bio">Biography</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Now you are Chef!</div>}
    </div>
  );
};

export default BecomeChef;
