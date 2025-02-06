import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: (process.env.JWT_SECRET || 'defaultSecret'),//process.env not working
            signOptions: { expiresIn: '60m' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})


export class AuthModule {}