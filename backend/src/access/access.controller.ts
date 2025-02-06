import { Body, Controller, Post } from "@nestjs/common";

@Controller()

export class AccessController {
    constructor() {}

    @Post('signin')
    signIn(@Body('email') email: string, @Body('password') password: string) {
        return {email,password};
    }

    @Post('signup')
    signUp(@Body('email') email: string, @Body('password') password: string) {
        return {email,password};
    }
}