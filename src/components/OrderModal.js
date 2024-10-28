import React, { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react-lite";
import dishesStore from "../store/DishStore";
import axios from "axios";
import userStore from "../store/UserStore";

Modal.setAppElement("#root");

const OrderModal = observer(({ isOpen, onRequestClose }) => {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);

    const orderData = {
      userId: userStore.user.user_id,
      total_price: dishesStore.totalOfBasket,
      status: "pending",
      items: dishesStore.basket.map((item) => ({
        dishId: item.dish_id,
        quantity: item.quantity,
        preferences: JSON.stringify(item.preferences),
        price: item.price,
      })),
    };

    try {
      await axios.post("http://localhost:5000/order", orderData);
      dishesStore.basket = [];
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
      onRequestClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Confirmation of the order</h2>
      <p>Are you sure you want to place your order?</p>
      <div>
        <strong>Total price:</strong> {dishesStore.totalOfBasket.toFixed(2)}€
      </div>
      <button onClick={handleOrder} disabled={loading}>
        {loading ? "Ordering..." : "Order"}
      </button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
});

export default OrderModal;
