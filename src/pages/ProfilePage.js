import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import userStore from "../store/UserStore";
import axios from "axios";

const ProfilePage = observer(() => {
  const [email, setEmail] = useState(userStore.user.email);
  const [phone_number, setPhone_number] = useState(userStore.user.phone_number);
  const [name, setName] = useState(userStore.user.name);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");

  const phoneHandler = (e) => {
    setPhone_number(e.target.value);
  };
  const streetHandler = (e) => {
    setStreet(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const cityHandler = (e) => {
    setCity(e.target.value);
  };
  const postCodeHandler = (e) => {
    setPostCode(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      if (userStore.addresses.length === 0) {
        const data = await axios.get(
          `http://localhost:5000/address/ofOne?userId=${userStore.user.user_id}`
        );
        userStore.setAddresses(data.data);
      }
    }

    fetchData();
  }, [street, city, postCode]);

  const onAddrSave = () => {
    console.log(userStore.user.user_id);
    async function fetch() {
      const responce = await axios.post(
        "http://localhost:5000/address/addOne",
        {
          userId: userStore.user.user_id,
          street,
          city,
          postalCode: postCode,
        }
      );
      userStore.addToAddresses(responce.data);
    }

    fetch();
  };

  return (
    <div className="page profile-page">
      <div className="profile-card">
        <h2>Welcome {userStore.user.name}!</h2>
        <div className="login-form" style={{ width: 400 }}>
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
            <button>Save</button>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h2>
          Your addresses:{" "}
          <select>
            <option defaultValue="Your address">Your address</option>
            {userStore.addresses.map((addr, i) => (
              <option value={addr.street + " " + addr.postalCode} key={i}>
                {addr.street}, {addr.postalCode}
              </option>
            ))}
          </select>
        </h2>
        <>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              value={city}
              onChange={(e) => cityHandler(e)}
              type="text"
              id="city"
              name="city"
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input
              value={street}
              onChange={(e) => streetHandler(e)}
              type="text"
              id="street"
              name="street"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postCode">Postal code:</label>
            <input
              value={postCode}
              onChange={(e) => postCodeHandler(e)}
              type="text"
              id="postCode"
              name="postCode"
            />
          </div>
          <div className="form-group">
            <button onClick={onAddrSave}>Save</button>
          </div>
        </>
      </div>
    </div>
  );
});

export default ProfilePage;
