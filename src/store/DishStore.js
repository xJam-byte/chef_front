import { makeAutoObservable } from "mobx";

class DishesStore {
  dishes = [];
  basket = [];
  totalOfBasket = 0.0;
  constructor() {
    makeAutoObservable(this);
  }
  addToBasket(dish) {
    const existingDish = this.basket.find(
      (item) => item.dish_id === dish.dish_id
    );

    if (existingDish) {
      if (
        JSON.stringify(existingDish.preferences) !==
        JSON.stringify(dish.preferences)
      ) {
        existingDish.preferences = {
          ...existingDish.preferences,
          ...dish.preferences,
        };
      }
      existingDish.quantity += 1;
      existingDish.totalPrice = existingDish.price * existingDish.quantity;
      this.totalOfBasket += Number(existingDish.price);
    } else {
      this.basket.push({
        ...dish,
        quantity: 1,
        totalPrice: Number(dish.price),
        preferences: dish.preferences || {},
      });
      this.totalOfBasket += Number(dish.price);
    }
  }

  removeFromBasket(dishId) {
    const existingDishIndex = this.basket.findIndex(
      (item) => item.dish_id === dishId
    );

    if (existingDishIndex !== -1) {
      const existingDish = this.basket[existingDishIndex];

      if (existingDish.quantity > 1) {
        existingDish.quantity -= 1;
        existingDish.totalPrice = existingDish.price * existingDish.quantity;
        this.totalOfBasket -= Number(existingDish.price);
      } else {
        this.totalOfBasket -= Number(existingDish.price);
        this.basket.splice(existingDishIndex, 1);
      }
    }
  }

  setDishes(o) {
    this.dishes = o;
  }

  clearDishes() {
    this.dishes = [];
  }

  addNewDish(newOrder) {
    this.dishes.push(newOrder);
  }
}

const dishesStore = new DishesStore();
export default dishesStore;
