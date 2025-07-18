import express from 'express';
import abi from '../abi.json' assert { type: "json" };

const router = express.Router();

router.get('/abi', (req, res) => {
  res.json({
    address: process.env.CONTRACT_ADDRESS,  // ou une valeur hardcodée
    abi
  });
});

export default router;
