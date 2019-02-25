import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfigService } from './prisma/graphql-config.service';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService
    }),
    PrismaModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
