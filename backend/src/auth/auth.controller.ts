import { Body, Controller, Post } from "@nestjs/common";
import { CreateUser } from '../dto/CreateUser.dto';
import { ApiBody, ApiOperation } from "@nestjs/swagger";

@Controller('auth')

export class AuthController {
    constructor() {}

    @ApiOperation({summary: 'Sign in',description: 'Sign in a user'})
    @Post('signin')
    signIn(@Body() user: CreateUser) {
        return {user};
    }

    @ApiOperation({summary: 'Sign up',description: 'Sign up a user'})
    @Post('signup')
    signUp(@Body() user: CreateUser) {
        return {user};
    }
}