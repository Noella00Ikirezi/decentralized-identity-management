import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Container,
  Link
} from '@chakra-ui/react';

export default function Wallet() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const connectMetaMask = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask non détecté");
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      console.log("✅ Connecté avec MetaMask :", accounts[0]);
      setMessage({ type: 'success', text: `Connecté avec : ${accounts[0]}` });
    } catch (err) {
      console.error("❌ Erreur MetaMask :", err.message);
      setMessage({ type: 'error', text: err.message || "Échec MetaMask" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMetaMaskAccount = () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download.html', '_blank');
    } else {
      console.log("ℹ️ MetaMask détecté. Ouvre-le pour créer un compte.");
      setMessage({ type: 'info', text: "MetaMask détecté. Ouvre-le pour créer un compte." });
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

        {message && (
          <Text color={
            message.type === 'success' ? 'green.500' :
            message.type === 'error' ? 'red.500' : 'blue.500'
          }>
            {message.text}
          </Text>
        )}

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
