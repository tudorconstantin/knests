import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { getApp } from '../util';

import { users as testUsers } from '../testData';

export const signup = () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  it('GQL signup', () => {
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

    return supertest(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: {
          credentials: userCredentials,
        },
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        data: {
          signup: {
            email: userCredentials.email,
            status: 'UNCONFIRMED',
            roles: ['ADMIN'],
          },
        },
      });
  });

  it('GQL second signup fails ', async () => {
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
      expect(errorsRes[0].message).toEqual('Signup disabled');
  });
};
