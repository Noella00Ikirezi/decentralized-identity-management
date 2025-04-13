// __tests__/ipfs_get_content.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import request from 'supertest';
import express from 'express';
import ipfsRoutes from '../routes/ipfs.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/ipfs', ipfsRoutes);

const testText = 'Contenu IPFS testé via node:test';

let uploadedCID = '';

// Étape 1 : upload vers IPFS
test('POST /ipfs/upload retourne un CID', async () => {
  const res = await request(app)
    .post('/ipfs/upload')
    .send({ content: testText })
    .expect(200);

  assert.ok(res.body.cid, 'CID manquant');
  uploadedCID = res.body.cid;
});

// Étape 2 : récupération du contenu depuis le CID
test('GET /ipfs/content/:cid retourne le bon contenu', async () => {
  const res = await request(app)
    .get(`/ipfs/content/${uploadedCID}`)
    .expect(200);

  const responseText = res.text;
  assert.strictEqual(responseText, testText, 'Le contenu récupéré est différent de loriginal');
});
