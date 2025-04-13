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

test('POST /ipfs/upload should return a valid CID and metadata', async () => {
  const response = await request(app)
    .post('/ipfs/upload')
    .send({ content: 'Hello IPFS depuis test natif Node !' })
    .expect(200);

  assert.ok(response.body.cid);
  assert.ok(response.body.size);
  assert.ok(response.body.type);
  assert.ok(response.body.base64);
});
