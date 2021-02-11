import { Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { KnexConfig } from './config/knex';
import { KnexModule } from '@nestjsplus/knex';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
    }),
    KnexModule.registerAsync({
      useClass: KnexConfig,
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

  @Inject(KNEX_CONNECTION) private readonly knex;

  async onModuleDestroy() {
    await this.knex.destroy();
  }
}
