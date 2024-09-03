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

    setPostCode("");
    setStreet("");
    setCity("");
  }, []);

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
    <div className="container">
      {userStore.user.name}
      <button onClick={() => userStore.clearUser()}>Log out</button>
    </div>
  );
});

export default ProfilePage;
