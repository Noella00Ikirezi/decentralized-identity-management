import React from 'react';
import { Box, Heading, VStack, Container } from '@chakra-ui/react';
import UploadDocument from '../components/UploadDocument';
import SignatureLogin from '../components/SignatureLogin';
import IdentityActions from '../components/IdentityActions';

export default function Documents() {
  return (
    <Container maxW="5xl" py={10}>
      <VStack spacing={10} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>📂 Documents & Signature</Heading>
          <UploadDocument />
        </Box>

        <Box>
          <Heading size="md" mb={4}>🔑 Signature MetaMask</Heading>
          <SignatureLogin />
        </Box>

        <Box>
          <Heading size="md" mb={4}>🪪 Révocation d’accès</Heading>
          <IdentityActions />
        </Box>
      </VStack>
    </Container>
  );
}
