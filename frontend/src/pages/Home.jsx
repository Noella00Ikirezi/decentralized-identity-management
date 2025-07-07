import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Container,
  Link
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Container maxW="5xl" py={10}>
      <VStack spacing={10}>
        <Box textAlign="center">
          <Heading>Bienvenue sur DIMS</Heading>
          <Text mt={2}>
            Votre solution d'identité décentralisée sécurisée basée sur la blockchain Ethereum.
          </Text>
        </Box>

        <Box textAlign="left" w="100%">
          <Heading size="md">🔐 Gestion de votre identité numérique</Heading>
          <Text fontSize="sm" mt={2}>
            DIMS permet aux utilisateurs de gérer leurs informations personnelles via un contrat intelligent. Chaque action (création, mise à jour, partage, révocation) est associée à une adresse Ethereum et enregistrée de manière transparente.
          </Text>
          <Button as={RouterLink} to="/profile" mt={3} colorScheme="teal">
            Gérer mon profil
          </Button>
        </Box>

        <Box textAlign="left" w="100%">
          <Heading size="md">📂 Stockage décentralisé</Heading>
          <Text fontSize="sm" mt={2}>
            Envoyez vos documents dans IPFS pour garantir leur intégrité et leur disponibilité. Chaque document est lié à un identifiant unique (CID).
          </Text>
          <Button as={RouterLink} to="/documents" mt={3} colorScheme="purple">
            Accéder aux documents
          </Button>
        </Box>

        <Box textAlign="left" w="100%">
          <Heading size="md">🔑 Authentification par signature</Heading>
          <Text fontSize="sm" mt={2}>
            Utilisez votre portefeuille MetaMask pour vous connecter et signer des opérations sensibles sans mot de passe.
          </Text>
          <Button as={RouterLink} to="/wallet" mt={3} colorScheme="blue">
            Se connecter avec MetaMask
          </Button>
        </Box>

        <Box textAlign="left" w="100%">
          <Heading size="md">🧾 En savoir plus</Heading>
          <Text fontSize="sm" mt={2}>
            Consultez notre page de présentation pour découvrir comment le projet fonctionne (backend, frontend, smart contract).
          </Text>
          <Button as={RouterLink} to="/apropos/1" mt={3} colorScheme="gray">
            À propos du projet
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}
