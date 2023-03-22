import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from './modules/config/config';
import { AllExceptionFilter } from './modules/exceptions/common/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { formatValidationException } from './modules/exceptions/common/format-validation-exception';
import * as cookieParser from 'cookie-parser';
import { RolesGuard } from './modules/auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<Config>(Config);

  app.setGlobalPrefix('/api');
  app.use(cookieParser(config.security.cookie.key));

  const swaggerConfig = new DocumentBuilder().setTitle('Progerbox API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: formatValidationException,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  const rolesGuard = app.get<RolesGuard>(RolesGuard);
  app.useGlobalGuards(rolesGuard);

  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  await app.listen(config.common.port);
}
bootstrap();
