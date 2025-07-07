// ✅ NAVBAR MODIFIÉE AVEC NOUVEAUX LIENS
import React from 'react';
<<<<<<< HEAD
import { Box, Flex, Link, Spacer, Image, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
=======
import { Link } from 'react-router-dom';
//import logo.png from /assets
>>>>>>> 033a0c7cf4583b98f5ecba33ed7edf0aa16cd4bf

export default function Navbar() {
  return (
<<<<<<< HEAD
    <Box bg="gray.800" px={6} py={3} color="white">
      <Flex align="center">
        <Flex align="center">
          <Image src={logo} alt="DIMS Logo" boxSize="30px" mr={2} />
          <Heading size="md">DIMS</Heading>
        </Flex>
        <Spacer />
        <Flex gap={4}>
          <Link as={RouterLink} to="/">Accueil</Link>
          <Link as={RouterLink} to="/wallet">Portefeuille</Link>
          <Link as={RouterLink} to="/profile">Profil utilisateur</Link>
          <Link as={RouterLink} to="/documents">Documents & Signature</Link>
          <Link as={RouterLink} to="/Apropos/1">À propos</Link>
        </Flex>
      </Flex>
    </Box>
=======
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">DIMS</Link>
      </div>
      <ul className="navbar-links">
        
      </ul>
    </nav>
>>>>>>> 033a0c7cf4583b98f5ecba33ed7edf0aa16cd4bf
  );
}
