import React, { useEffect, useState } from 'react';
import { useAccount } from '../contexts/AccountContext';

const Profile = () => {
  const { address, contract } = useAccount();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        setLoading(true);
        const result = await contract.getOwner(address);
        setOwner(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (contract && address) {
      fetchOwner();
    }
  }, [contract, address]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Mon Identité</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-2">
          <p><strong>Adresse actuelle :</strong> {address}</p>
          <p><strong>Propriétaire DID :</strong> {owner}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;