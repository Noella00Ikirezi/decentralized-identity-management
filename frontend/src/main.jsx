// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
<<<<<<< HEAD
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
=======
      <BrowserRouter>
>>>>>>> 033a0c7cf4583b98f5ecba33ed7edf0aa16cd4bf
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

