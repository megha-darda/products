import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ProductModule } from './product/product.module';

@Module({
 
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    
    ProductModule,
    
],

})
export class AppModule {}
