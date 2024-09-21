import { makeAutoObservable } from "mobx";

class DishesStore {
  dishes = [];

  constructor() {
    makeAutoObservable(this);
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
