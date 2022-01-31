import { Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { InjectKnex, Knex } from 'nestjs-knex';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
    }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        debug: true,
        connection: process.env.DATABASE_URL,
        pool: { min: 0, max: 7, idleTimeoutMillis: 300_000 },
      },
    }),
    // schema first dev
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      // installSubscriptionHandlers: true,
      installSubscriptionHandlers: false,
      debug: !isProduction,
      playground: !isProduction,
      context: ({ req }) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    // this would be for "code first" development
    // GraphQLModule.forRoot({
    //   context: ({ req }) => ({ req }),
    //   autoSchemaFile: 'schema.gql',
    //   debug: !isProduction,
    //   playground: !isProduction,
    // }),
    AuthModule,
    UsersModule,
    AppService,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements OnModuleDestroy {

  @InjectKnex() private readonly knex: Knex;

  async onModuleDestroy() {
    await this.knex.destroy();
  }
}
