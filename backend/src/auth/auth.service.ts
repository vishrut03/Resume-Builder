import { Injectable } from "@nestjs/common";
import { CreateUser } from './dto/CreateUser.dto';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import * as mongoose from "mongoose";

@Injectable()

export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {}

    async signIn(user: CreateUser) {

        const res = await this.userModel.findOne({email: user.email});
        if(res && res.password === user.password){
            return res;
        }
    }

    async signUp(user: CreateUser) {
        
        const res = await this.userModel.create(user);
        return res;
    }

    async findAll(){
        const users = await this.userModel.find();
        return users;
    }
}