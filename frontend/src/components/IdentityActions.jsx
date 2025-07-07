import React, { useState } from 'react';
import { Box, Input, Button, VStack, useToast } from '@chakra-ui/react';

export default function IdentityActions() {
  const [docId, setDocId] = useState('');
  const [recipient, setRecipient] = useState('');
  const toast = useToast();

  const revokeAccess = async () => {
    try {
      const res = await fetch('http://localhost:5000/identity/revoke-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, recipient }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: 'Accès révoqué',
          description: `Document ${docId} pour ${recipient}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error || 'Erreur serveur');
      }
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Input
          placeholder="ID du document"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
        />
        <Input
          placeholder="Adresse du destinataire"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Button colorScheme="red" onClick={revokeAccess}>
          Révoquer l’accès
        </Button>
      </VStack>
    </Box>
  );
}
