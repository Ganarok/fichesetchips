# Fiches&Chips - BackEnd Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Starter

### Installation

- Dependencies

```bash
cd server/
npm install
```

- Environment file

```bash
cp .env.example .env
```

Set your environnment variable as you want.

- Database

Init db :

1- Create database

Change `<DB_NAME>` by your database name

```
npm run db:create 'CREATE DATABASE <DB_NAME>;' 
```

2- Migrate and seed database

```bash
npm run db:refresh
```


### Running the app

- Run the app
```bash
# development
npm run start
# watch mode
npm run start:dev
# production mode
npm run start:prod
```

### Test

```bash
# unit tests
npm run test
# e2e tests
npm run test:e2e
# test coverage
npm run test:cov
```

## Developpers

### Swagger

Go to `http://localhost:3000/docs`

- Authorization : Bearer Token

Go to the padlock image

![Go to the padlock image](./img/auth1.png)

And enter your Bearer Token

![And enter your Bearer Token](./img/auth2.png)

### Migrations

- Generate migration file from new entities

```
npm run migration:generate src/database/migrations/<YourEntityName>Migrations
```

- Create blank migration file

```
npm run migration:create src/database/migrations/<YourMigrationName>
```

- Revert last migration

```
npm run migration:revert
```

- Show migrations

```
npm run migration:show
```

### Table creation

1- Creation of the Entity in `back/src/database/entities/<EntityName>.ts`

- Relations

**ManyToOne**
See https://orkhan.gitbook.io/typeorm/docs/many-to-one-one-to-many-relations
An example with preference_id inside the User entity (a user can have only one preference but a preference concern many users).

**Many-to-many relations with custom properties**
See https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations
An example with Friend entity and User entity (a user can ask many user as friend and a user can been asked by many user as friend).

2- Generation migration file with :
```
npm run migration:generate src/database/migrations/<YourEntityName>Migrations
```

3- Run migrations in order to have the database updated

```
npm run migration:run
```

4- Create the Seeder

- Create a blank migration file in `back/src/database/seeders/`

```
npm run migration:create src/database/seeders/<YourSeederName>
```

- Create the different fixture in `back/src/database/fixtures`

- Implement the seeder inside the migration file you created like this one : `back/src/database/seeders/1665931703695-SeedPrefrencesAndUsers.ts` using the fixtures and and the name=name of your class ex : `name = 'SeedPrefrencesAndUsers1665927924682'`

- Seed db with :

```
npm run db:seed
```

### Route Creation

1- Create the route file in `back/src/routes`

- Use a try catch and the method `getErrorMessage` in order to handle possible errors :

```typescript
  try {
    const response = await <Your Service>.<Your method>(<Your params>);
    res.status(200).send({ ...response, message: <Your message> });
  } catch (error) {
    return getErrorMessage(error, res);
  }
```

2- Swagger Documentation

You have to add, just after your road description the following kind of swagger documentation :

```typescript
router.get("/profile/:username", async (req, res) => {
  /**
   * @swagger
   * /users/profile/{username}:
   *   get:
   *     description: Get the public profile of a dedicated user.
   *     tags: 
   *       - Users
   *     parameters:
   *     - in: "path"
   *       name: "username"
   *       schema: { type: "string" }
   *       required: true
   *       description: "username of the user to get"
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Public profile found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       401:
   *         description: User isn't authorized
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
   */
```

You have to specify the road itself, the parameters, if a bearerAuth token can be required and the different responses. Each parameters or response schema can refferred to a definition defined here : `back/src/utils/swagger/definitions.ts`. This is needed in order to propose default values to the users of the Swagger interface.

**Code 200**

**Errors code**

If your error isn't managed by `back/src/utils/error-handler/getErrorMessage.ts`, you have to describe it in there.


To connect with the container postgres -> docker exec -it sleepy_banzai psql -h localhost -p 5432 -U postgres
After create the database -> CREATE DATABASE fetc;
After -> \c fetc;
After -> CREATE SCHEMA cem;