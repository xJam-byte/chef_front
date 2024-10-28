import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import userStore from "../store/UserStore";
import profile from "../assets/images/profile.png";
import Modal from "../components/Modal";
import axios from "axios";

const ProfilePage = observer(() => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isOrdersModalOpen, setOrdersModalOpen] = useState(false);
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(userStore.user.name || "");
  const [email, setEmail] = useState(userStore.user.email || "");
  const [phone, setPhone] = useState(userStore.user.phone_number || "");

  const logOut = () => {
    window.location.reload();
    userStore.clearUser();
  };
  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        const response = await axios.post(
          "http://localhost:5000/user-customer/avatar",
          { avatar: base64String, userId: userStore.user.user_id }
        );
        userStore.user.profile_pic = response.data.profile_pic;
        userStore.setUser(userStore.user);
        setAvatarModalOpen(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user-customer/update/contacts", {
        name: name,
        email: email,
        phone_number: phone,
      });
      userStore.user.name = name;
      userStore.user.email = email;
      userStore.user.phone = phone;
      userStore.setUser(userStore.user);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="profile-container container">
      <div className="profile-header">
        <div
          className="avatar-wrapper"
          onClick={() => setAvatarModalOpen(true)}
        >
          <img
            src={
              userStore.user.profile_pic
                ? `http://localhost:5000${userStore.user.profile_pic}`
                : profile
            }
            alt="User Avatar"
            className="profile-avatar"
          />
          <div className="overlay-text">Change Avatar</div>
        </div>
        <h2 className="profile-name">{userStore.user.name}</h2>
      </div>

      <div className="profile-info">
        <p>Email: {userStore.user.email}</p>
        <p>
          Phone:{" "}
          {userStore.user.phone_number ? (
            userStore.user.phone_number
          ) : (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className="link-add-phone"
              href="#"
              onClick={() => setEditModalOpen(true)}
            >
              Add phone number
            </a>
          )}
        </p>
        {userStore.user.role === "chef" ? (
          <p>Total dishes: {userStore.user.totalDishes || "0"}</p>
        ) : null}
        {userStore.user.role === "chef" ? <p>Rating: ★★★★☆</p> : null}
      </div>

      <div className="profile-actions">
        <button className="btn-edit" onClick={() => setEditModalOpen(true)}>
          Edit Profile
        </button>
        <button
          className="btn-password"
          onClick={() => setPasswordModalOpen(true)}
        >
          Change Password
        </button>
        <button className="btn-orders" onClick={() => setOrdersModalOpen(true)}>
          Order History
        </button>
        <button className="btn-logout" onClick={logOut}>
          Log Out
        </button>
      </div>

      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
      >
        <h3>Change Avatar</h3>
        <form onSubmit={handleAvatarUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Upload</button>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <h3>Edit Profile</h3>
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      </Modal>

      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      >
        <h3>Change Password</h3>
        <form>
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <button type="submit">Change Password</button>
        </form>
      </Modal>

      <Modal
        isOpen={isOrdersModalOpen}
        onClose={() => setOrdersModalOpen(false)}
      >
        <h3>Order History</h3>
        <p>No orders yet.</p>
      </Modal>
    </div>
  );
});

export default ProfilePage;
