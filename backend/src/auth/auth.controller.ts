import { Body, Controller, Post, ValidationPipe, Res } from "@nestjs/common"
import { CreateUser } from "./dto/CreateUser.dto"
import { ApiOperation, ApiBody, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { Response } from 'express';

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign in', description: 'Sign in a user' })
    @ApiBody({ type: CreateUser })
    @Post('signin')
    async signIn(@Body(ValidationPipe) user: CreateUser, @Res() res: Response) {
        return this.authService.signIn(user, res); 
    }

    @ApiOperation({ summary: 'Sign up', description: 'Sign up a user' })
    @ApiBody({ type: CreateUser })
    @Post('signup')
    async signUp(@Body() user: CreateUser, @Res() res: Response) {
        return this.authService.signUp(user, res);
    }
}
