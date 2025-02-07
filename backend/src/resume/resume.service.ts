import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume } from './schemas/resume.schema';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume.name) private resumeModel: Model<Resume>) {}

  async updateResume(request: AuthenticatedRequest, userEmail: string, field: string, value: any) {
    const allowedFields = [
      "personalDetails",
      "briefDescription",
      "workExperience",
      "education",
      "projects",
      "skills",
      "achievements",
      "certificates",
      "codingProfiles",
      "customSection",
      "extraCurricularActivities"
    ];
    if (!allowedFields.includes(field)) {
      throw new BadRequestException(`Invalid field: ${field}`);
    }

    // Correctly access user from request
    const userId = request.user?.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    // Find the resume for the user
    let resume = await this.resumeModel.findOne({ userId });

    if (resume) {
      // Update only the specified field
      resume[field] = value;
      return resume.save();
    } else {
      // Create a new resume with userId and the specified field
      return this.resumeModel.create({
        userId,
        [field]: value,
      });
    }
  }
}
