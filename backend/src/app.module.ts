import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ResumeModule } from './resume/resume.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI || 'mongodb://localhost:27017/defaultdb'),
    AuthModule,
    ResumeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
