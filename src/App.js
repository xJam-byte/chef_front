import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.scss";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import userStore from "./store/UserStore";
import Layout from "./layout/Layout";
import Auth from "./pages/AuthPage";

function App() {
  useEffect(() => {
    userStore.loadUserFromCookies();
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/top" element={<AboutPage />} />
          <Route path="/chefs" element={<ContactPage />} />
          <Route path="/track_order" element={<ContactPage />} />
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
