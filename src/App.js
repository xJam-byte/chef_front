import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.scss";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import Header from "./layout/Header";
import { ToastContainer } from "react-toastify";
import userStore from "./store/UserStore";

function App() {
  const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [isRegistrationDrawerOpen, setRegistrationDrawerOpen] = useState(false);

  const toggleLoginDrawer = () => {
    setLoginDrawerOpen(!isLoginDrawerOpen);
  };

  const toggleRegistrationDrawer = () => {
    setRegistrationDrawerOpen(!isRegistrationDrawerOpen);
  };

  useEffect(() => {
    userStore.loadUserFromCookies();
  }, []);

  return (
    <div className="App">
      <Header
        onLoginClick={toggleLoginDrawer}
        onRegistrationClick={toggleRegistrationDrawer}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {isLoginDrawerOpen && (
        <LoginPage onClick={toggleLoginDrawer} close={setLoginDrawerOpen} />
      )}

      {isRegistrationDrawerOpen && (
        <RegistrationPage
          onClick={toggleRegistrationDrawer}
          close={setRegistrationDrawerOpen}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
