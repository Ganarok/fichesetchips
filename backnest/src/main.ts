import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';
import { ValidationErrorFilter } from './utils/validation-error.filter';

if (!process.env.PORT) {
  console.log("Failed to get .env variables")
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Fiches&Chips')
    .setDescription("Le projet propose une plate-forme en ligne permettant de créer/générer des scénarios de jeu de rôle via un moteur de création. Des rooms peuvent ensuite être créées pour y tenir une partie en vocal/textuel, sous la gouverne d'un MJ diabolique ou d'une AI en NLU/NLP.")
    .setVersion('1.0')
    .addTag('Authentification')
    .addTag('Users')
    .addTag('Preferences')
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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // End Swagger config

  // app.useGlobalFilters(new ValidationErrorFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
