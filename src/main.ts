import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule,  DocumentBuilder } from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle('Anuncios API')
    .setDescription('API de anuncios de artículos de Segunda Mano.\n Jesús Quintana')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Anuncios')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  await app.listen(3000);
}
bootstrap();
