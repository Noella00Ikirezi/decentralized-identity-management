import React from 'react';
import { Box, Flex, Link, Spacer, Image, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Navbar() {
  return (
    <Box bg="gray.800" px={6} py={3} color="white" boxShadow="md">
      <Flex align="center">
        <Flex align="center">
          <Image src={logo} alt="DIMS Logo" boxSize="30px" mr={2} />
          <Heading size="md">DIMS</Heading>
        </Flex>
        <Spacer />
        <Flex gap={5} fontWeight="medium">
          <Link as={RouterLink} to="/">Accueil</Link>
          <Link as={RouterLink} to="/wallet">Portefeuille</Link>
          <Link as={RouterLink} to="/profile">Profil utilisateur</Link>
          <Link as={RouterLink} to="/documents">Documents & Signature</Link>
          <Link as={RouterLink} to="/apropos/1">À propos</Link>
        </Flex>
      </Flex>
    </Box>
  );
}
