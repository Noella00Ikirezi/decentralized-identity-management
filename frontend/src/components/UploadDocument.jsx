import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  useToast,
  Text,
  Link,
  HStack,
  Icon,
  Input,
} from '@chakra-ui/react';
import { FiUpload, FiInfo } from 'react-icons/fi';

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/ipfs/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      toast({
        title: "Fichier envoyé à IPFS",
        description: `CID : ${data.cid}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erreur IPFS",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <VStack spacing={4} align="start">
        <HStack spacing={2}>
          <Icon as={FiUpload} color="purple.500" boxSize={5} />
          <Text fontWeight="bold" fontSize="lg">Ajouter un document à IPFS</Text>
        </HStack>

        <Text fontSize="sm" color="gray.600">
          Ce module permet d’envoyer un document vers le réseau IPFS.
        </Text>

        <Box w="100%">
          <Input
            id="hiddenFileInput"
            type="file"
            onChange={handleFileSelect}
            display="none"
          />
          <HStack spacing={4}>
            <Button
              as="label"
              htmlFor="hiddenFileInput"
              colorScheme="purple"
              variant="outline"
            >
              Choisir un fichier
            </Button>
            <Text fontSize="sm">
              {file ? file.name : "Aucun fichier sélectionné"}
            </Text>
          </HStack>
        </Box>

        <Button onClick={handleUpload} colorScheme="purple">
          Envoyer
        </Button>

        <HStack align="center" fontSize="sm" color="gray.500">
          <Icon as={FiInfo} />
          <Text>IPFS est un système décentralisé — les fichiers sont stockés sur le réseau.</Text>
        </HStack>

        <Link
          href="https://docs.ipfs.tech/concepts/what-is-ipfs/"
          isExternal
          color="blue.500"
          fontWeight="medium"
          fontSize="sm"
        >
          📘 En savoir plus sur IPFS
        </Link>
      </VStack>
    </Box>
  );
}
