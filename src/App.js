import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.scss";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import userStore from "./store/UserStore";
import Layout from "./layout/Layout";
import Auth from "./pages/AuthPage";
import ChefPage from "./pages/ChefPage";
import CreateDish from "./pages/CreateDish";
import chefStore from "./store/ChefStore";
import ChefProfile from "./pages/ChefProfile";
import axios from "axios";
import dishesStore from "./store/DishStore";
import PreOrder from "./pages/PreOrder";
import BecomeChef from "./pages/BecomeChef";
import TrackOrder from "./pages/TrackOrder";

function App() {
  useEffect(() => {
    userStore.loadUserFromCookies();
    userStore.loadChefFromCookies();
    userStore.loadfrommini();
    chefStore.setChefs();
    async function fetchDishes() {
      const result = await axios.get("http://localhost:5000/dishes");
      dishesStore.setDishes(result.data);
    }
    fetchDishes();
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dishes"
            element={<PrivateRoute element={<PreOrder />} />}
          />
          <Route
            path="/chefs"
            element={<PrivateRoute element={<ChefPage />} />}
          />
          <Route
            path="/create_dish"
            element={<PrivateRoute element={<CreateDish />} />}
          />
          <Route
            path="/track_order"
            element={<PrivateRoute element={<TrackOrder />} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route
            path="/become_chef"
            element={<PrivateRoute element={<BecomeChef />} />}
          />
          <Route path="/chefs/:chefId" element={<ChefProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
