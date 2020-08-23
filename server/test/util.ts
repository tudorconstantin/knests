import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';

let app: INestApplication;

// singletoning the app
export const getApp = async (): Promise<INestApplication> => {
  if (app !== undefined) return app;
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app = await app.init();
  return app;
};

// using this "hack" because Jest discourages the usage of global variables, but we'll need the JWT token to test authenticated requests
let jwtToken: string;
export const setToken = (token: string): void => {
  jwtToken = token;
};

export const getToken = (): string => {
  return jwtToken;
};