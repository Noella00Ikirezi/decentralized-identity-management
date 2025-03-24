import React, { useState, useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";

const Profile = () => {
  const { account } = useContext(AccountContext);
  const [profile, setProfile] = useState({ name: "", email: "" });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Profile for: {account}</h2>
      <input
        type="text"
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <button>Save Profile</button>
    </div>
  );
};

export default Profile;
