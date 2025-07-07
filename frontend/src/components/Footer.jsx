import React from 'react';
import { Box, Text, Link, HStack } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      as="footer"
      py={6}
      px={4}
      mt={12}
      bg="gray.800"
      color="gray.300"
      textAlign="center"
    >
      <HStack justify="center" spacing={4} flexWrap="wrap">
        <Text fontSize="sm">
          © {new Date().getFullYear()} <strong>DIMS</strong> — Tous droits réservés.
        </Text>
        <Link
          href="https://github.com/tonrepo" // 🔁 mets ton lien GitHub ou contact
          isExternal
          fontSize="sm"
          color="teal.200"
        >
          💻 Voir sur GitHub
        </Link>
        <Text fontSize="sm">Construit avec ❤️ et MetaMask</Text>
      </HStack>
    </Box>
  );
}
