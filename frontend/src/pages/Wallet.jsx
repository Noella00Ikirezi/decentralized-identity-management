import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  useToast,
  Container,
  Link
} from '@chakra-ui/react';

export default function Wallet() {
  const toast = useToast();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectMetaMask = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask non détecté");
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      toast({
        title: "Connecté",
        description: `Adresse : ${accounts[0]}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erreur de connexion",
        description: err.message || "Échec MetaMask",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMetaMaskAccount = () => {
    if (typeof window.ethereum === 'undefined') {
      window.open('https://metamask.io/download.html', '_blank');
    } else {
      toast({
        title: 'MetaMask détecté',
        description: "Ouvre MetaMask puis clique sur 'Créer un compte'.",
        status: 'info',
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="4xl" py={10}>
      <VStack spacing={10}>
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            Créer ou connecter votre portefeuille Ethereum
          </Text>
          <Text fontSize="md" mt={2}>
            Pour utiliser DIMS, vous devez disposer d'un portefeuille Ethereum sécurisé via MetaMask.
          </Text>
        </Box>

        <Button colorScheme="orange" size="lg" onClick={handleCreateMetaMaskAccount}>
          Installer ou créer un compte MetaMask
        </Button>

        {account ? (
          <Text color="green.500">✅ Connecté : {account}</Text>
        ) : (
          <Button colorScheme="blue" onClick={connectMetaMask} isLoading={loading}>
            Se connecter avec MetaMask
          </Button>
        )}

        <Box textAlign="center">
          <Text fontSize="sm">Besoin d'aide ?</Text>
          <Link
            href="https://cryptoast.fr/tutoriel-wallet-metamask/"
            isExternal
            color="blue.500"
            fontWeight="bold"
          >
            📘 Tutoriel MetaMask (Cryptoast)
          </Link>
        </Box>
      </VStack>
    </Container>
  );
}
