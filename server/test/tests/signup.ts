import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { getApp } from '../util';

import { users as testUsers } from '../testData';

export const signup = () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  it('GQL signup', async () => {
    const query = `
    mutation signup($credentials: UserSignupInput!){
      signup(user: $credentials){
        email
        status
        roles
      }
    }
    `;

    const userCredentials = testUsers.ADMIN[0];

    const signupRes = await supertest(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: {
          credentials: userCredentials,
        },
      })
      .expect(200)
      .expect('Content-Type', /json/);

    // This expects the new user TO CONTAIN (not to be equal to) the ['ADMIN', 'NORMAL'] roles. 
    // And the order doesn't matter either.
    expect(signupRes?.body?.data?.signup?.roles).toEqual(
      expect.arrayContaining(['ADMIN', 'NORMAL']),
    );
  });

  it('GQL second signup (with the same email) fails ', async () => {
    const query = `
    mutation signup($credentials: UserSignupInput!){
      signup(user: $credentials){
        email
        status
        roles
      }
    }
    `;

    const userCredentials = testUsers.ADMIN[0];
    const signupRes = await supertest(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: {
          credentials: userCredentials,
        },
      })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(signupRes).toBeDefined();
    const errorsRes = signupRes.body.errors;
    expect(errorsRes[0].message).toMatch(new RegExp('duplicate key value violates unique constraint', 'gi'));
  });

  it('GQL second signup works (with a different email)', async () => {
    const query = `
    mutation signup($credentials: UserSignupInput!){
      signup(user: $credentials){
        email
        status
        roles
      }
    }
    `;

    const userCredentials = testUsers.NORMAL[0];
    const signupRes = await supertest(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: {
          credentials: userCredentials,
        },
      })
      .expect(200)
      .expect('Content-Type', /json/);

      expect(signupRes?.body?.data?.signup?.roles).toHaveLength(1);
      expect(signupRes?.body?.data?.signup?.roles?.[0]).toEqual('NORMAL');
  });
};
