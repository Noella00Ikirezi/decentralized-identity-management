// ProfileView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import './Profile.css';
import { FaUserCircle } from 'react-icons/fa';
import { getAttribute } from '../utils/identityService';
import { GET_IPFS } from '../api/api';

const ProfileView = () => {
  const { address } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!ethers.isAddress(address)) throw new Error('Adresse Ethereum invalide');
        const nameHash = ethers.keccak256(ethers.toUtf8Bytes('profile'));

        const res = await getAttribute(address, nameHash);
        const { value } = res.data;
        if (!value) throw new Error('Profil non trouvé.');

        const cid = ethers.toUtf8String(value);
        const ipfsRes = await fetch(GET_IPFS(cid));
        const data = await ipfsRes.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [address]);

  return (
    <div className="profile-container">
      <h2><FaUserCircle /> Profil Public</h2>
      <p style={{ fontStyle: 'italic' }}>Adresse : {address}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {profile ? (
        <div className="profile-box">
          {profile.avatar && (
            <div className="profile-avatar">
              <img src={profile.avatar} alt="Avatar" />
            </div>
          )}
          <div className="profile-field">
            <label>Nom</label>
            <div className="profile-input">{profile.name}</div>
          </div>
          <div className="profile-field">
            <label>Email</label>
            <div className="profile-input">{profile.email}</div>
          </div>
          <div className="profile-field">
            <label>Téléphone</label>
            <div className="profile-input">{profile.phone}</div>
          </div>
        </div>
      ) : (
        !error && <p>Chargement du profil...</p>
      )}
    </div>
  );
};

export default ProfileView;