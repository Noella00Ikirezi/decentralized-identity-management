import React from 'react';
import { Box, Button, VStack, Text, useToast, Link } from '@chakra-ui/react';

export default function IdentityActions() {
  const toast = useToast();

  const handleRevoke = () => {
    toast({
      title: "Accès révoqué",
      description: "L'identité ou le document partagé a été révoqué.",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <VStack spacing={4} align="start">
        <Text fontWeight="bold" fontSize="lg">🪪 Gestion de l'identité</Text>

        <Text fontSize="sm" color="gray.600">
          Cette section vous permet de révoquer les accès à des documents ou des données 
          que vous avez précédemment partagés. Cela peut inclure :
        </Text>

        <Box pl={4}>
          <Text fontSize="sm">• Un document IPFS partagé avec une autre adresse</Text>
          <Text fontSize="sm">• Un accès délégué à votre profil ou à certaines données</Text>
          <Text fontSize="sm">• Une autorisation temporaire expirée</Text>
        </Box>

        <Text fontSize="sm" color="gray.600">
          Les révocations peuvent être gérées via un smart contract ou votre backend, selon la logique choisie.
        </Text>

        <Button colorScheme="red" onClick={handleRevoke}>
          Révoquer un accès
        </Button>

        <Text fontSize="sm" color="gray.500">
          🔗 Besoin d’aide ? Consultez notre guide :
        </Text>
        <Link
          href="https://docs.example.com/gestion-identite"
          isExternal
          color="blue.500"
          fontWeight="medium"
          fontSize="sm"
        >
          📘 Tutoriel : Comment fonctionne la révocation d’accès
        </Link>
      </VStack>
    </Box>
  );
}
