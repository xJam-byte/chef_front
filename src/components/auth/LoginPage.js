import React, { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import { notifyError, notifySuccess } from "../../utils/toast";

const LoginPage = observer(({ onClick, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (email === "" || password === "") {
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
        close(false);
        notifySuccess("Вы успешно вошли!");
      }
    } catch (e) {
      notifyError("Произошла ошибка! Логин или пароль неверны!");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="page">
      <div className="drawer">
        <div className="card login-card">
          <button className="close-drawer-btn" onClick={onClick}>
            X{" "}
          </button>
          <div className="login-form">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                onChange={(e) => emailHandler(e)}
                value={email}
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                onChange={(e) => passwordHandler(e)}
                value={password}
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <div className="form-group">
              <button onClick={login}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoginPage;
