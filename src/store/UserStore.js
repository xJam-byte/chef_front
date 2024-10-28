import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
import { getLocalStorage, setLocalStorage } from "../utils/localstorage";
class UserStore {
  user = undefined;
  chef = undefined;
  token = "";
  favourites = [];
  addresses = [];
  constructor() {
    makeAutoObservable(this);
  }
  setUser(user) {
    this.user = user;
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
  }
  loadUserFromCookies() {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      this.user = JSON.parse(userCookie);
    }
    const addrs = getLocalStorage("addresses");
    if (addrs) {
      // this.addresses = JSON.parse(addrs);
    }
  }
  loadChefFromCookies() {
    const userCookie = Cookies.get("chef");
    if (userCookie) {
      this.chef = JSON.parse(userCookie);
    }
  }
  async setChef(chef) {
    this.chef = chef;
    Cookies.set("chef", JSON.stringify(chef), { expires: 1 });
  }
  clearUser() {
    this.user = undefined;
    Cookies.remove("user");
  }

  setToken(token) {
    this.token = token;
  }
  clearToken() {
    this.token = "";
  }
  setFavourites(favs) {
    this.favourites = favs;
  }
  setAddresses(addresses) {
    this.addresses = addresses;
    setLocalStorage("addresses", addresses);
  }
  clearFavs() {
    this.favourites = [];
  }
  clearAddresses() {
    this.addresses = [];
  }
  removeOneFormFavs(id) {
    this.favourites = this.favourites.filter((one) => one.id !== id);
  }
  addToFavourites(item) {
    this.favourites.push(item);
  }
  removeOneFormAddresses(id) {
    this.addresses = this.addresses.filter((one) => one.id !== id);
  }
  addToAddresses(item) {
    this.addresses.push(item);
  }
}

const userStore = new UserStore();
export default userStore;
