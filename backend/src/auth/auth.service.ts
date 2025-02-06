import { Injectable } from "@nestjs/common";
import { CreateUser } from '../dto/CreateUser.dto';

@Injectable()

export class AuthService {

    signIn(user: CreateUser) {
        return user;
    }

    signUp(user: CreateUser) {
        return user;
    }
}