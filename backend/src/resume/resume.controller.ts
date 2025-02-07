import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('resume')
export class ResumeController {

  //'resume/check' ko authenticate krra hai 
  @UseGuards(AuthGuard)
  @Get('check')

  check(@Request() request): string {
    return request.user;
  }

  @Get()
  findAll(): string {
    return 'This action returns whole resume';
  }

  //yahan ki request ko authenticate krna hai
}
