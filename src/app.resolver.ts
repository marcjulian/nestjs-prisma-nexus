import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class AppResolver {

    constructor() {

    }

    @Query()
    helloWorld() {
        return 'Hello World!';
    }
}