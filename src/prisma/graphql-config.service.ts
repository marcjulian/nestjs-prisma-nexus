import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma';
import * as path from 'path';
import { prisma } from './client';
import datamodelInfo from './nexus/datamodel-info';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<GqlModuleOptions> {

        const Query = prismaObjectType({
            name: 'Query',
            definition(t) {
                t.prismaFields(['*'])
            }
        });

        const schema = makePrismaSchema({
            types: [Query],

            prisma: {
                datamodelInfo,
                client: prisma
            },

            outputs: {
                schema: path.join(__dirname, './schema.graphql'),
                typegen: path.join(__dirname, './nexus.ts'),
            },
        });

        return {
            debug: true,
            playground: true,
            schema,
        };
    }
}
