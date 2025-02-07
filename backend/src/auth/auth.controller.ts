import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common"
import { CreateUser } from "./dto/CreateUser.dto"
import { ApiOperation, ApiBody, ApiTags, ApiResponse, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiBadRequestResponse } from "@nestjs/swagger"
import { AuthService } from "./auth.service"

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign in', description: 'Sign in a user' })
    // @ApiOkResponse({ description: 'User signed in' , type: CreateUser})
    // @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBody({ type: CreateUser })
    @Post('signin')
    signIn(@Body(ValidationPipe) user: CreateUser) {
        return this.authService.signIn(user);
    }

    @ApiOperation({ summary: 'Sign up', description: 'Sign up a user' })
    // @ApiCreatedResponse({ description: 'User signed up' })
    // @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiBody({ type: CreateUser })
    @Post('signup')
    signUp(@Body() user: CreateUser) {
        return this.authService.signUp(user);
    }
    
}

