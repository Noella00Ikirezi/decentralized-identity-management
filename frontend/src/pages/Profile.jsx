// Profile.jsx
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { FaUserCircle } from 'react-icons/fa';
import { FiMail, FiPhone, FiSave } from 'react-icons/fi';
import { uploadToIPFS } from '../utils/ipfs';
import { linkProfile } from '../utils/identityService';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', avatar: null });
  const [cid, setCid] = useState(null);

  useEffect(() => {
    const savedCid = localStorage.getItem('profileCid');
    if (savedCid && savedCid !== 'undefined') {
      fetch(`http://localhost:5000/ipfs/content/${savedCid}`)
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(err => console.error('Erreur récupération IPFS :', err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const data = await uploadToIPFS(profile);
      const cid = data.cid;
      setCid(cid);
      localStorage.setItem('profileCid', cid);

      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await linkProfile({ identity: address, cid, expiresIn: 0 });

      alert('Profil sauvegardé et lié à Ethereum !');
    } catch (err) {
      console.error('Erreur de sauvegarde :', err);
      alert('Erreur de sauvegarde.');
    }
  };

  return (
    <div className="profile-container">
      <h2><FaUserCircle /> Mon Profil</h2>
      <div className="profile-box">
        <div className="profile-avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Avatar" />
          ) : (
            <div className="placeholder-avatar"><FaUserCircle size={40} /></div>
          )}
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="profile-field">
          <label>Nom complet</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </div>

        <div className="profile-field">
          <label><FiMail /> Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        </div>

        <div className="profile-field">
          <label><FiPhone /> Téléphone</label>
          <input type="tel" name="phone" value={profile.phone} onChange={handleChange} />
        </div>

        <button onClick={handleSave} className="btn">
          <FiSave style={{ marginRight: '5px' }} /> Sauvegarder
        </button>

        {cid && <p>CID IPFS : {cid}</p>}
      </div>
    </div>
  );
};

export default Profile;