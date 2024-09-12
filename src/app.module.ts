import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppExceptionFilter, AppResponseInterceptor } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TouristModule } from './tourist/tourist.module';
import { LocationModule } from './location/location.module';
import { TravelManagementModule } from './travel-management/travel-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        PREFIX_NAME: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    AuthModule,
    UserModule,
    TouristModule,
    LocationModule,
    TravelManagementModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor,
    },
  ],
})
export class AppModule {}
