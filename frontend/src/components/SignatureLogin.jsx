import React from 'react';
import {
  Box,
  Button,
  VStack,
  useToast,
  Text,
  Icon,
  HStack,
  Link
} from '@chakra-ui/react';
import { FiKey } from 'react-icons/fi';

export default function SignatureLogin() {
  const toast = useToast();

  const handleSign = async () => {
    if (!window.ethereum) return alert("MetaMask non détecté");

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    const message = "Je confirme mon identité sur DIMS";

    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      toast({
        title: "Signature validée",
        description: `Signature : ${signature.slice(0, 20)}...`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erreur de signature",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <VStack spacing={4} align="start">
        <HStack spacing={2}>
          <Icon as={FiKey} color="blue.500" boxSize={5} />
          <Text fontWeight="bold" fontSize="lg">
            Authentification par signature
          </Text>
        </HStack>

        <Text fontSize="sm" color="gray.600">
          Cette fonctionnalité permet de prouver que vous êtes bien le détenteur de votre portefeuille Ethereum.
          En signant un message avec votre clé privée (via MetaMask), vous confirmez votre identité.
        </Text>

        <Button onClick={handleSign} colorScheme="blue">
          Signer avec MetaMask
        </Button>

        <Text fontSize="sm" color="gray.500">
          🔐 La signature est une méthode de connexion sécurisée sans identifiant ni mot de passe.
        </Text>

        <Link
          href="https://docs.metamask.io/guide/signing-data.html"
          isExternal
          color="blue.500"
          fontWeight="medium"
          fontSize="sm"
        >
          📘 En savoir plus sur la signature MetaMask
        </Link>
      </VStack>
    </Box>
  );
}
