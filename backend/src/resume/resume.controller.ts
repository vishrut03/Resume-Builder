import { Controller, Get } from '@nestjs/common';

@Controller('resume')
export class ResumeController {
  @Get()
  findAll(): string {
    return 'This action returns whole resume';
  }
}
