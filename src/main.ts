import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
  .setTitle('Product')
  .setDescription (`Create and Get Products. For APIS used by SELLER 'sellerId' MUST be added in Headers`)  
  .build();

  const document = SwaggerModule.createDocument (app, options);
  
  SwaggerModule.setup('/swagger', app, document);
 
  const config = new ConfigService();
  await app.listen(await config.getPortConfig());
}
bootstrap();
