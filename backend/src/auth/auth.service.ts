import { Injectable, HttpException, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express'; 
import { CreateUser } from './dto/CreateUser.dto';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import * as CryptoJS from 'crypto-js'; 

@Injectable()

export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) {}

    async signIn(user: CreateUser, @Res() res:Response) {

        // Check if user exists
        const existingUser = await this.userModel.findOne({ email: user.email });

        if (!existingUser) {
            //console.log("first");
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Validate password
        const secretKey = 'your_secret_key';
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_CRYPTO || secretKey).toString(CryptoJS.enc.Utf8);
        const isPasswordValid = await bcrypt.compare(decryptedPassword, existingUser.password);

        if (!isPasswordValid) {
            //console.log("second");
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        // Remove password before returning user data
        const { password, ...userWithoutPassword } = existingUser.toObject();

        const accessToken = await this.jwtService.signAsync({ email: existingUser.email, sub: existingUser._id });

        res.cookie('token', accessToken, {
            sameSite: 'strict'
        });

        return res.json({ message: "Login successful", user: userWithoutPassword, token: accessToken });
    }

    async signUp(user: CreateUser, @Res() res:Response) {

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        //verify user email will come here

        
        // Hash the password
        const saltOrRounds = 10;
        const secretKey = 'your_secret_key';
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_CRYPTO || secretKey).toString(CryptoJS.enc.Utf8);
        const hashedPassword = await bcrypt.hash(decryptedPassword, saltOrRounds);

        // Save user to database
        const newUser = new this.userModel({
            email: user.email,
            password: hashedPassword
        });
        await newUser.save();

        // Remove password before returning response
        const dbUser = newUser.toObject();

        return res.json({ message: "Signup successful", user: dbUser });
    }
}
