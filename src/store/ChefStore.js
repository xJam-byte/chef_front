import { makeAutoObservable } from "mobx";

class ChefStore {
  chefs = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllChefs() {
    return this.chefs;
  }

  setChefs(chefs) {
    this.chefs = chefs;
  }
}

const chefStore = new ChefStore();
export default chefStore;
