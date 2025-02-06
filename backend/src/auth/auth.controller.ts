import { Body, Controller, Post } from "@nestjs/common";
import { CreateUser } from '../dto/CreateUser.dto';
import { ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Sign in',description: 'Sign in a user'})
    @Post('signin')
    signIn(@Body() user: CreateUser) {
        return this.authService.signIn(user);
    }

    @ApiOperation({summary: 'Sign up',description: 'Sign up a user'})
    @Post('signup')
    signUp(@Body() user: CreateUser) {
        return this.authService.signUp(user);
    }
}