import { BadRequestException, Body, Controller, Get, Post, Put, Delete, Param, Request, UseGuards, Res } from '@nestjs/common';
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
  async updateResume(@Request() request, @Param('field') field: string, @Body() data: any) {
    if (!field || Object.keys(data).length === 0) {
      throw new BadRequestException('Field name and data are required');
    }
    const userEmail = request.user.email; // Extract email from JWT token
    return this.resumeService.updateResume(request, userEmail, field, data);
  }

  @UseGuards(AuthGuard)
  @Get(':field')
  @ApiBearerAuth('JWT-auth')
  async getResumeField(@Request() request, @Param('field') field: string) {
    if (!field) {
      throw new BadRequestException('Field name is required');
    }
    const response = this.resumeService.getResumeField(request, field);
    if(typeof response === 'string'){
      return {description: response};
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Put(':field/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateResumeDto })
  async updateResumeEntry(@Request() request, @Param('field') field: string, @Param('id') id: number, @Body() data: any) {
    if (!field || Object.keys(data).length === 0) {
      throw new BadRequestException('Field name, id, and data are required');
    }
    return this.resumeService.updateResumeEntry(request, field, id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':field/:id')
  @ApiBearerAuth('JWT-auth')
  async deleteResumeEntry(@Request() request, @Param('field') field: string, @Param('id') id: number) {
    if (!field || id === undefined) {
      throw new BadRequestException('Field name and id are required');
    }
    return this.resumeService.deleteResumeEntry(request, field, id);
  }

  //api to fetch resume data by id
  @ApiBody({
    schema: {
        type: "object",
        properties: {
            userId: { type: "string", example: "1234567890" }
        }
    }
})
  @Post("my-resume")
    @UseGuards(AuthGuard)
    async getUserResume(@Request() req) {
        const userId = req.user.id; // Extract user ID from AuthGuard
        return this.resumeService.getUserResume(userId);
    }
}