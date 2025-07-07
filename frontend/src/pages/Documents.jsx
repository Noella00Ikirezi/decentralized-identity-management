import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  useToast // ✅ Import essentiel
} from '@chakra-ui/react';

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast(); // ✅ utilisation correcte

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'Erreur',
        description: 'Aucun fichier sélectionné.',
        status: 'error',
        duration: 4000,
        isClosable: true
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('expiresIn', '3600');

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:5000/ipfs/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: `✅ CID : ${data.cid}` });
        toast({
          title: 'Document envoyé',
          description: `CID : ${data.cid}`,
          status: 'success',
          duration: 4000,
          isClosable: true
        });
      } else {
        console.error(data);
        setMessage({ type: 'error', text: data.error || 'Erreur côté serveur' });
      }
    } catch (err) {
      console.error('Erreur JS:', err);
      setMessage({ type: 'error', text: err.message || 'Échec' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Input type="file" onChange={handleFileChange} />
        <Button colorScheme="teal" onClick={handleUpload} isLoading={loading}>
          Uploader sur IPFS
        </Button>
        {message && (
          <Text color={
            message.type === 'success' ? 'green.500' :
            message.type === 'error' ? 'red.500' : 'blue.500'
          }>
            {message.text}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
