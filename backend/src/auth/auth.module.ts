import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
// import * as dotenv from 'dotenv';

// dotenv.config();

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: (process.env.JWT_SECRET || 'defaultSecret'),
            signOptions: { expiresIn: '60m' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule {}