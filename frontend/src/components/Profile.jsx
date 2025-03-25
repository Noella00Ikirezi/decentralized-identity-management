// components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAccount } from '../contexts/AccountContext';

const Profile = () => {
  const { profile, updateProfile } = useAccount();

  const [email, setEmail] = useState(profile.email);
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = { email, phoneNumber, ipfsPhoto: photo };
    await updateProfile(updatedProfile);
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    setEmail(profile.email);
    setPhoneNumber(profile.phoneNumber);
  }, [profile]);

  return (
    <div>
      <h2>Mon Profil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Numéro de téléphone :</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Photo de profil :</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>

      <div>
        <h3>Informations actuelles :</h3>
        <p>Email: {profile.email}</p>
        <p>Téléphone: {profile.phoneNumber}</p>
        <p>
          Photo de profil:{' '}
          {profile.ipfsPhoto && <img src={`https://ipfs.io/ipfs/${profile.ipfsPhoto}`} alt="profile" width="100" />}
        </p>
      </div>
    </div>
  );
};

export default Profile;
