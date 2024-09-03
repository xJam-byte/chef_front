import axios from "axios";
import React, { useState } from "react";
import userStore from "../store/UserStore";
import { notifyError, notifySuccess } from "../utils/toast";
import { useNavigate } from "react-router";
import PasswordInput from "../components/PasswordInput";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [name, setName] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const reg = async () => {
    if (email === "" || password === "" || name === "") {
      notifyError("Required fields are must not be empty!");
      return;
    }

    const responce = await axios.post(
      "http://localhost:5000/auth/registration",
      {
        name: name,
        email: email,
        password: password,
        address: "",
        phone_number: phone_number,
        role: "customer",
      }
    );
    if (responce.data !== undefined) {
      userStore.setUser(responce.data[1]);
      userStore.setToken(responce.data[0]);
      notifySuccess("Вы успешно зарегистрировались!");
      navigate("/");
    } else {
      notifyError("Произошла ошибка!");
    }
  };

  const phoneHandler = (e) => {
    setPhone_number(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const login = async () => {
    if (email === "" || password === "") {
      notifyError("Required fields are must not be empty!");
      return;
    }
    try {
      const responce = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      });
      if (responce.data !== undefined) {
        userStore.setUser(responce.data[1]);
        userStore.setToken(responce.data[0]);
        notifySuccess("Вы успешно вошли!");
        navigate("/");
      }
    } catch (e) {
      notifyError("Произошла ошибка! Логин или пароль неверны!");
    }
  };

  const passwordHandler = (password) => {
    setPassword(password);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container auth">
      {isLogin ? (
        <div className="login-block">
          <p className="p">Sign In to your account</p>
          <div className="form-group">
            <label htmlFor="email">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              onChange={(e) => emailHandler(e)}
              value={email}
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <PasswordInput
              handleChange={passwordHandler}
              placeholder="Create a strong password"
            />
          </div>
          <div className="form-grou">
            <p className="question-p">
              Don't have an account?{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="signup-link"
              >
                Sign Up here!
              </span>
            </p>
            <button className="submit-button" onClick={login}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="reg-block">
          <p className="p">Create a new account</p>
          <div className="name_and_email">
            <div className="form-group">
              <label htmlFor="name">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="input"
                placeholder="Name..."
                value={name}
                onChange={(e) => nameHandler(e)}
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="input"
                placeholder="Email..."
                value={email}
                onChange={(e) => emailHandler(e)}
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <PasswordInput
              handleChange={passwordHandler}
              placeholder="Create a strong password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              value={phone_number}
              onChange={(e) => phoneHandler(e)}
              type="text"
              className="input"
              placeholder="Phone Number..."
              id="phone_number"
              name="phone_number"
            />
          </div>
          <div className="form-grou">
            <p className="question-p">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="signup-link"
              >
                Sign Up here!
              </span>
            </p>
            <button className="submit-button" onClick={reg}>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
