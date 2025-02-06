import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUser } from './dto/CreateUser.dto';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {}

    async signIn(user: CreateUser) {
        // Check if the user exists
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
        return userWithoutPassword;
    }

    async signUp(user: CreateUser) {
        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        // Hash the password
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

        // Save user to database
        const newUser = new this.userModel({
            email: user.email,
            password: hashedPassword
        });
        await newUser.save();

        // Remove password before returning response
        const { password, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    }
}
