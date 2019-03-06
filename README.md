# Nestjs Prisma Nexus

## Prisma & Docker
Install prisma and docker

```bash
npm i -g prisma
```

Run: 
```bash
docker-compose up -d
```

To deploy the Prisma schema run:

```bash
prisma deploy
```

This generates the prisma client and nexus-prisma bindings and schema.graphql.

Playground of Prisma is available here: http://localhost:4466/

## Start Nestjst
To start the NestJS Server run:

```bash
npm run start
```

Playground for the NestJS Server is available here: http://localhost:3000/graphql