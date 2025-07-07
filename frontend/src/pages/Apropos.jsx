import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Divider,
  AspectRatio
} from '@chakra-ui/react';

export default function Apropos() {
  return (
    <Box p={8} maxW="5xl" mx="auto">
      <VStack spacing={8} align="start">
        <Heading size="xl">À propos de DIMS</Heading>
        <Text fontSize="md">
          DIMS (Decentralized Identity Management System) est une application décentralisée conçue pour offrir une gestion d'identité numérique sécurisée en s'appuyant sur la technologie blockchain.
        </Text>

        <Divider />

        <Heading size="lg">🔗 Partie Smart Contract</Heading>
        <Text fontSize="sm">
          Le cœur du système repose sur un smart contract Ethereum, écrit en Solidity, qui :
        </Text>
        <Box pl={4}>
          <Text fontSize="sm">• Gère les profils utilisateurs associés à une adresse Ethereum</Text>
          <Text fontSize="sm">• Permet d’enregistrer des documents (CID IPFS)</Text>
          <Text fontSize="sm">• Supporte la délégation, la révocation et l’historique des accès</Text>
        </Box>
        <Link href="https://ethereum.org/en/developers/docs/smart-contracts/" isExternal color="blue.500">
          En savoir plus sur les smart contracts Ethereum
        </Link>

        <Divider />

        <Heading size="lg">🧠 Backend Express</Heading>
        <Text fontSize="sm">
          Le backend est construit avec Node.js et Express. Il gère les opérations suivantes :
        </Text>
        <Box pl={4}>
          <Text fontSize="sm">• Connexion au contrat via ethers.js</Text>
          <Text fontSize="sm">• Envoi de fichiers vers IPFS via une API</Text>
          <Text fontSize="sm">• Signature de messages et vérification côté serveur</Text>
        </Box>
        <Link href="https://docs.ethers.io/v5/" isExternal color="blue.500">
          Documentation ethers.js
        </Link>

        <Divider />

        <Heading size="lg">🖼️ Frontend React</Heading>
        <Text fontSize="sm">
          L’interface utilisateur est construite avec React et Chakra UI. Elle inclut :
        </Text>
        <Box pl={4}>
          <Text fontSize="sm">• Connexion MetaMask et signature</Text>
          <Text fontSize="sm">• Upload de documents avec prévisualisation CID</Text>
          <Text fontSize="sm">• Navigation sécurisée et responsive</Text>
        </Box>
        <Link href="https://chakra-ui.com/" isExternal color="blue.500">
          Documentation Chakra UI
        </Link>

        <Divider />

        <Heading size="lg">🎥 Tutoriels vidéos</Heading>
        <Text fontSize="sm">Ces vidéos expliquent la logique et l’architecture d’une DApp :</Text>
        <VStack spacing={4} w="100%">
          <AspectRatio ratio={16 / 9} w="100%">
            <iframe
              src="https://www.youtube.com/embed/3681ZYbDSSk"
              title="What is a Smart Contract?"
              allowFullScreen
            />
          </AspectRatio>
          <AspectRatio ratio={16 / 9} w="100%">
            <iframe
              src="https://www.youtube.com/embed/x7W8Zg_4Txw"
              title="How IPFS works"
              allowFullScreen
            />
          </AspectRatio>
        </VStack>

        <Divider />

        <Text fontSize="sm" color="gray.500">
          DIMS est un projet open source en cours de développement. Pour contribuer ou poser des questions, consultez notre dépôt GitHub ou contactez-nous.
        </Text>
      </VStack>
    </Box>
  );
}
