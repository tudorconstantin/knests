import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { users as testUsers } from '../testData';

import { getApp, setToken, getToken } from '../util';

const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

export const loginAdminUser = () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await getApp();
  });

  it('GQL login', async () => {
    const query = `
    mutation login($credentials: UserLoginInput!){
      login(user: $credentials){
        token
      }
    }
    `;

    const userCredentials = testUsers.ADMIN[0];

    const loginResult = await supertest(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: {
          credentials: userCredentials,
        },
      })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(loginResult).toBeDefined();
    const resultData = loginResult.body.data;
    expect(resultData).toMatchObject({
      login: { token: expect.stringMatching(jwtRegex) },
    });

    setToken(resultData.login.token);

  });
};

export const tokenExists = () => {
  it('JWT Token should be set', () => {
    expect(getToken()).toMatch(jwtRegex);
  });

};
