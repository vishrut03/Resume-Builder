import { Injectable } from "@nestjs/common";
import { CreateUser } from './dto/CreateUser.dto';

@Injectable()

export class AuthService {

    signIn(user: CreateUser) {
        return user; ///jwt  etc stuff here
    }

    signUp(user: CreateUser) {
        return user;//add in db //jwt  etc stuff here
    }
}