import { makeAutoObservable } from "mobx";

class OrderStore {
  order = [];

  constructor() {
    makeAutoObservable(this);
  }

  setOrder(o) {
    this.order = o;
  }

  clearOrder() {
    this.order = [];
  }

  addNewOrder(newOrder) {
    this.order.push(newOrder);
  }
}

const orderStore = new OrderStore();
export default orderStore;
