import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import userStore from "../../store/UserStore";
import { notifyError, notifySuccess } from "../../utils/toast";

const RegistrationPage = observer(({ onClick, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [name, setName] = useState("");

  const reg = async () => {
    if (email === "" || password === "" || name === "") {
      return;
    }
    console.log(email, password, name, phone_number, address);

    const responce = await axios.post(
      "http://localhost:5000/auth/registration",
      {
        name: name,
        email: email,
        password: password,
        address: address,
        phone_number: phone_number,
        role: "customer",
      }
    );
    console.log(responce);
    if (responce.data !== undefined) {
      userStore.setUser(responce.data[1]);
      userStore.setToken(responce.data[0]);
      close(false);
      notifySuccess("Вы успешно зарегистрировались!");
    } else {
      notifyError("Произошла ошибка!");
    }
  };

  const phoneHandler = (e) => {
    setPhone_number(e.target.value);
  };
  const addrHandler = (e) => {
    setAddress(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
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
            X
          </button>
          <div className="login-form">
            <h2>Registration</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                value={name}
                onChange={(e) => nameHandler(e)}
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => emailHandler(e)}
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => passwordHandler(e)}
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                value={address}
                onChange={(e) => addrHandler(e)}
                type="text"
                id="address"
                name="address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                value={phone_number}
                onChange={(e) => phoneHandler(e)}
                type="text"
                id="phone_number"
                name="phone_number"
              />
            </div>
            <div className="form-group">
              <button onClick={reg}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RegistrationPage;
