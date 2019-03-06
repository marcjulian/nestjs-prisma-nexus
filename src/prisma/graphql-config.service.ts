import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma';
import * as path from 'path';
import { prisma } from '../generated/prisma-client';
import datamodelInfo from '../generated/nexus-prisma/datamodel-info';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<GqlModuleOptions> {

        const Query = prismaObjectType({
            name: 'Query',
            definition(t) {
                t.prismaFields(['*'])

                t.field('helloWorld', {
                    type: 'String',
                    resolve: (_, { id }, ctx) =>{
                        return 'Hello World'
                    }
                });
            }
        });

        const user = prismaObjectType({
            name: 'User',
            definition(t) {
                t.prismaFields(['id', 'createdAt', 'updatedAt', 'name', 'email'])
            }
        })

        const Mutation = prismaObjectType({
            name: 'Mutation',
            definition(t) {
                t.prismaFields(['*'])
            }
        })

        const schema = makePrismaSchema({
            types: [Query, user, Mutation],

            prisma: {
                datamodelInfo,
                client: prisma
            },

            outputs: {
                schema: path.join(__dirname, '../generated/schema.graphql'),
                typegen: path.join(__dirname, '../generated/nexus.ts'),
            },
        });

        return {
            debug: true,
            playground: true,
            schema,
        };
    }
}
