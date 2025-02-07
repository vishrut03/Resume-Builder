import { BadRequestException, Body, Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ResumeService } from './resume.service';

class UpdateResumeDto {
  [key: string]: any; // Accepts any key-value pairs
}

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @UseGuards(AuthGuard)
  @Post(':field')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateResumeDto })
  async updateResume(@Request() request, @Query('field') field: string, @Body() data: any) {
    if (!field || Object.keys(data).length === 0) {
      throw new BadRequestException('Field name and data are required');
    }
    const userEmail = request.user.email; // Extract email from JWT token
    return this.resumeService.updateResume(request, userEmail, field, data);
  }
}
