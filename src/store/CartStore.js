import { makeAutoObservable } from "mobx";

class CartStore {
  items = [];
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item) {
    this.items.push(item);
    this.calculateTotal();
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.items = [];
    this.total = 0;
  }

  get itemCount() {
    return this.items.length;
  }
}

const cartStore = new CartStore();
export default cartStore;
