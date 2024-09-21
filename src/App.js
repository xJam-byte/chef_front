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
import DishesPage from "./pages/DishesPage";
import ChefPage from "./pages/ChefPage";

function App() {
  useEffect(() => {
    userStore.loadUserFromCookies();
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dishes"
            element={<PrivateRoute element={<DishesPage />} />}
          />
          <Route
            path="/chefs"
            element={<PrivateRoute element={<ChefPage />} />}
          />
          <Route
            path="/track_order"
            element={<PrivateRoute element={<></>} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
