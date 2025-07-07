import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  useToast,
  Spinner,
  Heading
} from '@chakra-ui/react';

export default function Profile() {
  const [account, setAccount] = useState(null);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const connectAndLoadProfile = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask non détecté');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const addr = accounts[0];
      setAccount(addr);

      const res = await fetch(`http://localhost:5000/identity/profile/${addr}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        console.log('✅ Profil chargé depuis IPFS:', data);
      } else {
        toast({
          title: 'Profil non trouvé',
          description: "Vous pouvez créer un nouveau profil.",
          status: 'info',
          duration: 4000,
          isClosable: true
        });
      }
    } catch (err) {
      toast({
        title: 'Erreur de connexion',
        description: err.message || 'Veuillez réessayer',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!account) return;

    try {
      console.log('📤 Envoi du profil JSON au backend...');
      const res = await fetch('http://localhost:5000/ipfs/profile/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identity: account,
          profile
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('❌ Erreur backend:', errorData);
        toast({
          title: 'Erreur serveur',
          description: errorData.error || 'Impossible d’enregistrer le profil.',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        return;
      }

      const data = await res.json();
      console.log('✅ Profil enregistré:', data);

      toast({
        title: 'Profil enregistré',
        description: `CID : ${data.cid}`,
        status: 'success',
        duration: 5000,
        isClosable: true
      });

    } catch (err) {
      console.error('❌ Erreur JS:', err);
      toast({
        title: 'Erreur inattendue',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  useEffect(() => {
    connectAndLoadProfile();
  }, []);

  return (
    <Box p={8} maxW="lg" mx="auto">
      <VStack spacing={6}>
        <Heading size="lg">Mon Profil</Heading>

        {loading ? <Spinner size="lg" /> : (
          <>
            <Text fontSize="sm" color="gray.500">
              Adresse Ethereum : {account || 'Non connectée'}
            </Text>

            <Input placeholder="Nom" name="name" value={profile.name} onChange={handleChange} />
            <Input placeholder="Email" name="email" value={profile.email} onChange={handleChange} />
            <Input placeholder="Téléphone" name="phone" value={profile.phone} onChange={handleChange} />

            <Button colorScheme="teal" onClick={handleSave}>
              Enregistrer mon profil
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
}
