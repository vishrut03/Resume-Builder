import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUser } from './dto/CreateUser.dto';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) {}

    async signIn(user: CreateUser) {
        // Check if the user exists

        // console.log(process.env.JWT_SECRET);
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (!existingUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(user.password, existingUser.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        // Remove password before returning user data
        const { password, ...userWithoutPassword } = existingUser.toObject();

        const accessToken = await this.jwtService.signAsync({ email: existingUser.email, sub: existingUser._id });

        return {userWithoutPassword,accessToken};
    }

    async signUp(user: CreateUser) {
        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }


        //verify user email will come here

        

        // Hash the password
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

        // Save user to database
        const newUser = new this.userModel({
            email: user.email,
            password: hashedPassword
        });
        await newUser.save();

        const accessToken = await this.jwtService.signAsync({ email: newUser.email, sub: newUser._id });

        // Remove password before returning response
        const dbUser = newUser.toObject();
        return {dbUser, accessToken};
    }
}
