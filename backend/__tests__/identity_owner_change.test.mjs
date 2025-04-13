// __tests__/identity_owner_change.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import request from 'supertest';
import express from 'express';
import identityRoutes from '../routes/identity.routes.js';
import { wallet } from '../utils/ethereum.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/identity', identityRoutes);

// Identité fictive à tester
const TEST_IDENTITY = wallet.address;
const NEW_OWNER = '0x000000000000000000000000000000000000beef';

// Ce test modifie le propriétaire d'une identité contrôlée par le compte Ganache
test('POST /identity/owner/change devrait changer le propriétaire', async () => {
  const res = await request(app)
    .post('/identity/owner/change')
    .send({ identity: TEST_IDENTITY, newOwner: NEW_OWNER, from: wallet.address })
    .expect(200);

  assert.ok(res.body.success, 'La transaction a échoué');
  assert.ok(res.body.txHash, 'Aucun hash de transaction retourné');
});
