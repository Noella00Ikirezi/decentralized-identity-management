// __tests__/identity_add_delegate_flow.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import request from 'supertest';
import express from 'express';
import identityRoutes from '../routes/identity.routes.js';
import { wallet, contract } from '../utils/ethereum.js';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/identity', identityRoutes);

const testIdentity = process.env.TEST_IDENTITY;
const mainWalletAddress = process.env.WALLET_ADDRESS;
const delegate = mainWalletAddress;
const delegateType = 'TestDelegate';
const expiresIn = 60 * 60 * 24; // 1 jour

// Étape 1 : S'assurer que le bon owner est défini
test("Étape 1 - Changer le propriétaire de l'identité de test", async () => {
  const current = await request(app)
    .get(`/identity/owner/${testIdentity}`)
    .expect(200);

  if (current.body.owner.toLowerCase() !== mainWalletAddress.toLowerCase()) {
    const res = await request(app)
      .post('/identity/owner/change')
      .send({ identity: testIdentity, newOwner: mainWalletAddress })
      .expect(200);

    assert.ok(res.body.success, 'Échec du changement de propriétaire');
  } else {
    console.log('⏩ Propriétaire déjà correct, on skip');
  }
});

// Étape 2 : Ajout de délégué avec signature

test("Étape 2 - Ajouter un délégué à l'identité testée", async () => {
  const typeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(delegateType));
  const hash = await contract.callStatic.createAddDelegateHash(
    testIdentity,
    typeHash,
    delegate,
    expiresIn
  );
  const signature = await wallet.signMessage(ethers.utils.arrayify(hash));
  const { v, r, s } = ethers.utils.splitSignature(signature);

  const res = await request(app)
    .post('/identity/delegate/add-signed')
    .send({
      identity: testIdentity,
      delegate,
      delegateType,
      expiresIn,
      v, r, s,
      expectedAddress: mainWalletAddress
    })
    .expect(200);

  assert.ok(res.body.success, "Échec de l'ajout du délégué signé");
  assert.ok(res.body.txHash, 'Hash de transaction manquant');
});
