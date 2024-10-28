import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import dishesStore from "../store/DishStore";
import OrderModal from "./OrderModal";

const Basket = observer(({ handleRemoveFromBasket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="basket">
      <h2>My Basket</h2>
      <ul>
        {dishesStore.basket.map((item, index) => (
          <li key={index} className="basket-item">
            <div className="first-block">{item.quantity}x</div>
            <div className="second-block">
              <div className="price">
                £ {item.totalPrice ? item.totalPrice.toFixed(2) : item.price}
              </div>
              <div className="name">{item.name}</div>
              <div className="preferences">
                {Object.keys(item.preferences).length > 0 ? (
                  <p>{JSON.stringify(item.preferences)}</p>
                ) : (
                  <p>No preferences</p>
                )}
              </div>
            </div>
            <div
              className="third-block"
              onClick={() => handleRemoveFromBasket(item.dish_id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={50}
                widths={50}
                viewBox="0 -960 960 960"
                width="30px"
                fill="gray"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </div>
          </li>
        ))}
      </ul>
      <div className="total">
        <strong>Total:</strong> {dishesStore.totalOfBasket.toFixed(2)}£
      </div>
      <button onClick={() => setIsModalOpen(true)}>Order</button>
      <OrderModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
});

export default Basket;
