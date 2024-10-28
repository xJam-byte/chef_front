import axios from "axios";
import { makeAutoObservable } from "mobx";

class ChefStore {
  chefs = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllChefs() {
    return this.chefs;
  }

  async setChefs() {
    const c = await axios.get("http://localhost:5000/chef/getAll");
    this.chefs = c.data;
  }
}

const chefStore = new ChefStore();
export default chefStore;
