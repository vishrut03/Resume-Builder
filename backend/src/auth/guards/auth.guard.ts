import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];//bearer eyhnam.ss.ddd

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.user = {
                email: tokenPayload.email,
                id: tokenPayload.sub
            }
            return true;
            
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
    