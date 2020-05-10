import { INestApplication } from '@nestjs/common';

import { getApp } from './util';
import { signup, loginAdminUser, tokenExists } from './tests';

describe('knests (e2e)', () => {
  let app: INestApplication;
  const dataHolder = {};

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    // this closes the knex DB connection, so the tests can exit
    await app.close();
  });

  // The actual tests
  describe('Signing up first admin user', signup);
  describe('Login the first admin user', loginAdminUser);
  describe(
    'Have access to the JWT Token for future tests',
    tokenExists,
  );

  // describe("Logging in the admin", login );
});
