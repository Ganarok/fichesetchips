# Contruire un Back maintenable et efficace

## Introduction

L'objectif de ce document est de détailler l'architecture de notre server de manière à :
 - Faciliter la lecture de l'API par les développeurs Front
 - Faciliter la lecture du code par les développeurs Back
 - Faciliter les reviews
 - Faciliter le process d'onboarding
 - Avoir un code uniforme

Nous avons de la chance ! Puisque ce projet est un projet Nest, codé en typescript !

_____________________________________________________

## Interface Swagger

### Introduction

Swagger est un outil open source de documentation d'API. Directement intégré à Nest et utilisable grâce à des décorateurs, Swagger permet la génération d'une interface lisible et simplifiée de l'API.

![Interface](./assets/screen1.png)

Cet outil nous permet de visualiser faciliment les types et valeurs par défault des objets utilisés (body, params, query, ...).

![Schemas](./assets/schemas.png)

Il nous permet également de visualiser des examples de réponses en fonction du status http.

![Responses](./assets/responses.png)

### Intégration

 - Configuration

`main.ts`
```typescript
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Fiches&Chips')
    .setDescription("Le projet propose une plate-forme en ligne permettant de créer/générer des scénarios de jeu de rôle via un moteur de création. Des rooms peuvent ensuite être créées pour y tenir une partie en vocal/textuel, sous la gouverne d'un MJ diabolique ou d'une AI en NLU/NLP.")
    .setVersion('1.0')
    .addTag('Authentification')
    .addTag('Users')
    .addBearerAuth(
      {
        type: 'http',
        description: 'Enter JWT token',
        name: 'JWT',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth'
    )
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // End Swagger config
```

 - Décorateurs - Controllers

`auth.controller.ts`
```typescript
@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  //...
  @Post('login')
  @HttpCode(302)
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 302, description: 'The record has been successfully found.', type: ResponseAuthDto })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: AuthUnauthorizedException })
  async login(@Body() body: LoginAuthDto) {
    return await this.authService.login(body)
  }
  //...
}
```

![Controller](./assets/authcontroller.png)

![body](./assets/body.png)

![Responses](./assets/responses2.png)

 - Typage - Dto & Exceptions

`request-auth.dto.ts`
```typescript
export class LoginAuthDto  {
    @ApiProperty({ default: defaultUser.username })
    username: string;

    @ApiProperty({ default: defaultUser.password })
    password: string;
}
```

`response-auth.dto.ts`
```typescript
export class ResponseAuthDto  {

    @ApiProperty({ default: defaultUser })
    user: UserType;

    @ApiProperty({ default: defaultAuthResponse.access_token })
    access_token: string;

    @ApiProperty({ default: defaultAuthResponse.expires_in })
    expires_in: string;

}
```

`exceptions-auth.dto.ts`

```typescript
export class AuthUnauthorizedException {
    @ApiProperty({ default: unauthorizedException.status })
    "status": number
    @ApiProperty({ default: unauthorizedException.type })
    "type": string
    @ApiProperty({ default: unauthorizedException.message })
    "message": string
}
```

 - Valeurs par défault

`users.fixtures.ts`
```typescript
export const defaultUser: UserType = {
    id: 1,
    username: "user0",
    password: "password",
    avatar: "url",
    role: "USER",
    preference_id: 1,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}
```

`auth.fixtures.ts`
```typescript
export const defaultAuthResponse = {
    user: defaultUser,
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIwIiwiX2lkIjoiNjI5OGJhZGIxOTBjNmQ1MmFjYTFhYzA0IiwiaWF0IjoxNjU0MTgwMzY1LCJleHAiOjE2NTQxODM5NjV9.Qq-ZR_SWoSYPeAnumI6OkOcwv6o88QzcqCC0aK-AGgk",
    expires_in: "3600s"
}
```

`exceptions-auth.dto.ts`
```typescript
export const unauthorizedException = {
    "status": 401,
    "type": "UnauthorizedException",
    "message": "Wrong login or password"
}
```

 - Bearer Token

```typescript
@UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthDto })
  @ApiResponse({ status: 401, description: 'Wrong token.', type: AuthTokenUnauthorizedException })
  getProfile(@Request() req: any) {
    return req.user;
  }
```

![bearer1](./assets/bearer1.png)

![bearer2](./assets/bearer2.png)


____________________________________________________________________________________________
## Notre utilisation de Nest

### Introduction

Nest fournit une architecture d'application prête à l'emploi qui permet aux développeurs et aux équipes de créer des applications hautement testables, évolutives, faiblement couplées et facilement maintenables. L'architecture est fortement inspirée d'Angular.

### Architecture MVC

```typescript
├── src
│   ├── controllers
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── users.controller.spec.ts
│   │   └── users.controller.ts
│   ├── database
│   │   ├── database.module.ts
│   │   └── database.providers.ts
│   ├── main.ts
│   ├── modules
│   │   ├── app.module.ts
│   │   ├── auth.module.ts
│   │   └── users.module.ts
│   ├── schemas
│   │   └── user.schema.ts
│   ├── seeder.ts
│   ├── services
│   │   ├── app.service.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   ├── users.service.spec.ts
│   │   └── users.service.ts
│   └── utils
│       ├── all-exceptions.filter.ts
│       ├── dto
│       │   ├── auth
│       │   │   ├── request-auth.dto.ts
│       │   │   └── response-auth.dto.ts
│       │   ├── types.ts
│       │   └── users
│       │       ├── request-user.dto.ts
│       │       └── response-user.dto.ts
│       ├── guards
│       │   └── auth.guard.ts
│       ├── seeders
│       │   ├── fixtures.ts
│       │   └── users.seeder.ts
│       └── strategies
│           └── jwt.strategy.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

### Cycle de vie de l'applicatipon
<!-- TODO -->
<!-- imports, exports, providers, ... -->

- Initialisation des modules

Création  de l'application dans le main file à partir du app.module.

`main.ts`
```typescript
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
// ...
    await app.listen(parseInt(process.env.PORT) || 3000)
}
```

- Gestion des imports

L'import des differents modules doivent se faire dans un ordre précis.

`app.module.ts`
```typescript
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
```

Ici, on importe d'abord le module database. Ensuite le module Users qui lui même sera utilisé par le module Auth (certaines méthodes du service Users sont utilisées par Auth : check if user exist pour le login etc ...).

`auth.module.ts`
```typescript
@Module({
  imports: [UsersModule, ...],
  providers: [AuthService, ...],
  controllers: [AuthController]
})
export class AuthModule { }
```

Pour celà, le service Users doit être exporté depuis le module Users.

`users.module.ts`
```typescript
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...],
  exports: [UsersService]
})
export class UsersModule { }
```

### Gestion des variables d'environnement

```typescript
import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.PORT) {
  console.log("Failed to get .env variables")
}
```

### Guards

Les Guards ont une seule responsabilité. Ils déterminent si une requête donnée sera traitée par le gestionnaire de route ou non, en fonction de certaines conditions (comme les autorisations, les rôles, les ACL, etc.) présentes au moment de l'exécution.
<!-- TODO -->
<!-- + add check private functions -->

### Gestion des exceptions

Pas besoin de `try {...} catch (e) {...}`. L'ensemble des exceptions sont directements gérée dans `./backnest/src/utils/all-exceptions.filter.ts`

- Configuration

`main.ts`
```typescript
app.useGlobalFilters(new AllExceptionsFilter())
```

- Gestion des différentes erreurs
<!-- TODO -->

_____________________________________________________________

## Onboarding

### Process d'implémentation d'une nouvelle route

Les routes à implémenter peuvent être retrouvée sur le document technique [Spécification Back](https://docs.google.com/document/d/1M4xSmhlM6TDsh3xuz_-ARrAxN-OhbqEOgfmDYradQuo/edit#).

Une fois le document pris en considération, le procédé suivant peut être un guide. Nous nous baseront sur l'implémentation de la route `GET auth/profile` :

```typescript
import { Controller, Get, Post, Body, Request, UseGuards, HttpCode, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/auth.guard';
import { AuthService } from 'src/services/auth.service';
import { LoginAuthDto, RegisterAuthDto } from 'src/utils/dto/auth/request-auth.dto';
import { ResponseAuthDto } from 'src/utils/dto/auth/response-auth.dto';
import { AuthSequelizeUniqueConstraintError, AuthTokenUnauthorizedException, AuthUnauthorizedException } from 'src/utils/exceptions/auth/exceptions-auth';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

// ...

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthDto })
  @ApiResponse({ status: 401, description: 'Wrong token.', type: AuthTokenUnauthorizedException })
  getProfile(@Request() req: any) {
    return req.user;
  }
}
```

1- Définition de la route - Controller
- Guard. 
Exemple : JWT Auth Guard qui permet de s'assurer qu'un Bearer token valide a été renseigné : `@UseGuards(JwtAuthGuard)`
Si le Guard n'est pas encore implémenté, le mettre en commentaire.
Pour récupérer les données de token c'est avec `@Request() req: any` puis `req.user`.

- Méthode (GET, POST, PATCH, PUT, DELETE)
Ici c'est un GET. 

- route (url)
Définie dans un premier à la définition du controller `@Controller('auth')` et la suite à la définition de la méthode `@Get('profile')`

- query params 
Si l'on souhaite récupérer des données de l'url c'est `@Param('id') id: string`.

- body 
Si l'ont souhaite récupérer des données du body c'est grâce à `@Body() body: RegisterAuthDto` par exemple. 

- response
Il est important de typer également la réponse de l'appel de la route en fonction de son statut :
```typescript
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthDto })
  @ApiResponse({ status: 401, description: 'Wrong token.', type: AuthTokenUnauthorizedException })
```

2- Valeurs par défaut
à renseigner dans les constantes associées `utils>constants>...constants.ts`

3- Types
- type défaut à reprendre des fixtures
- dto à rédiger pour request et response
- exception à renseigner dans `utils>exceptions>...>...exceptions.ts`

4- Tests

Tester c'est douter

### Process d'implémentation d'un guard

A rédiger dans `utils>guards>...guards.ts`.
Exemple :
```typescript
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs/internal/Observable";
import { PicturesService } from "src/pictures/pictures.service";
import { AlbumsService } from "./albums.service";

// Check that a user is owner
@Injectable()
export class AlbumIsOwner implements CanActivate {
    constructor(private albumsService: AlbumsService, private pictureService: PicturesService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.validateRequest(context)
    }

    async validateRequest(execContext: ExecutionContext): Promise<boolean> {
        const request = execContext.switchToHttp().getRequest();
        const album_id = request.params.id
        const user = request.user
        if (!await this.albumsService.checkOwnership(user.id, album_id)) {
            return false
        }
        if (request.body.picture_id) {
            const picture_id = request.body.picture_id
            if (!await this.pictureService.checkOwnership(user.id, picture_id)) {
                return false
            }
        }
        return true
    }
}

// Check that a user has access
@Injectable()
export class AlbumHasAccess implements CanActivate {
    constructor(private albumsService: AlbumsService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.validateRequest(context)
    }

    async validateRequest(execContext: ExecutionContext): Promise<boolean> {
        const request = execContext.switchToHttp().getRequest();
        const id = request.params.id
        const user = request.user
        return await this.albumsService.checkAccess(user.id, id)
    }
}
```

### Process de création d'une nouvelle table

Les tables à implémenter au sien de notre bdd postgres peuvent être retrouvée sur le document technique [Spécification Back](https://docs.google.com/document/d/1M4xSmhlM6TDsh3xuz_-ARrAxN-OhbqEOgfmDYradQuo/edit#).

Une fois le document pris en considération, le procédé suivant peut être un guide. Nous nous baseront sur l'implémentation de la table `users` :

1- Schéma

A rédiger dans `back/src/schemas/...`.
`users.schema.ts`

- Définition des champs

```typescript
import { Table, Column, Model, BeforeCreate} from 'sequelize-typescript';
import { defaultUser } from 'src/utils/constants/users/users.constants';
import { ROLE } from 'src/utils/types/users/users.types';
import { UUID, UUIDV4 } from 'sequelize';

@Table
export class User extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ allowNull: false, unique: true })
    username: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: false, defaultValue: defaultUser.avatar })
    avatar: string;

    @Column({ allowNull: false, defaultValue: defaultUser.role })
    role: ROLE;

    @Column({ allowNull: false, type: UUID, defaultValue: UUIDV4 })
    preference_id: string;
}
```

- Hooks

Dans le cas de la création d'un user, il est nécessaire de hasher le mot de passe avant création. Celà peut être fait automatiquement via l'utilisation du décorateur nest `@BeforeCreate` :

`users.schema.ts`
```typescript
import * as bcrypt from 'bcrypt';

...
    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash
...
```

2- Création de la table

Les création de table, gestion des jointures etc ... sont géré par le module database et défini dans le provider database: `back/src/database/...`

`database.providers.ts`
```typescript
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'fichesetchips',
            });
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
```

3- Seeder

Après téléchargement de la librairie et ajour du script `"seed": "node dist/seeder",` dans `package.json`. Le fichier `seeder.ts` à la racine du projet s'occupe de lancer les différents Seeder :

```typescript
import { seeder } from "nestjs-seeder";
import { DatabaseModule } from "./database/database.module";
import { PreferencesSeeder } from "./utils/seeders/preferences/preferences.seeder";
import { UsersSeeder } from "./utils/seeders/users/users.seeder";
 
seeder({
  imports: [DatabaseModule],
}).run([PreferencesSeeder, UsersSeeder]);
```

Exemple du UsersSeeder (utilisant les constantes du dossier `back/src/utils/constants/...`):

```typescript
import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { User } from "src/schemas/user.schema";
import { defaultUser } from "src/utils/constants/users/users.constants";

@Injectable()
export class UsersSeeder implements Seeder {
  constructor() { }

  async seed(): Promise<any> {
    try {
      return await User.create(defaultUser);
    } catch (e) {
      console.log(e)
    }
  }

  async drop(): Promise<any> {
    return await User.destroy({ where: {} });
  }
}
```



4- Liasons entre tables

- Cas d'une liaison 1:N
Exemple : liaison entre les tables `users` et `preferences`.
Un user ne peut être lié qu'à une unique préférence. Une préférence peut être utilisée par plusieurs users.

Si la préférence en question est supprimée, il faut que tous les users impactés se retrouvent avec la préférence par défault.

```typescript
            sequelize.addModels([User, Preference]);
            Preference.hasOne(User, {foreignKey: "preference_id", onDelete: "SET DEFAULT"})
            await sequelize.sync();
            return sequelize;
```




