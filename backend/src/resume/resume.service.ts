import { Injectable, BadRequestException, Res } from '@nestjs/common';
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
  
    const userId = request.user?.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
  
    // For simple fields, unwrap expected property:
    if (field === 'briefDescription') {
      value = value.description;
    }
  
    if (field === 'skills') {
      // If value is already an array, use it directly.
      if (Array.isArray(value)) {
        // Nothing to do.
      } else if (value && typeof value === "object" && Array.isArray(value.skills)) {
        value = value.skills;
      } else {
        throw new BadRequestException("Invalid format for skills.");
      }
    }
  
    console.log("Updating field:", field, "with value:", value);
  
    let resume = await this.resumeModel.findOne({ userId });
  
    if (resume) {
      // Update only the specified field.
      resume[field] = value;
      return resume.save();
    } else {
      return this.resumeModel.create({
        userId,
        personalDetails: { email: userEmail },
        [field]: value,
      });
    }
  }
  

  async getResumeField(request: AuthenticatedRequest, field: string) {
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

    const userId = request.user?.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const resume = await this.resumeModel.findOne({ userId });

    if (resume) {
      return resume[field];
    } 
  }

  async updateResumeEntry(request: AuthenticatedRequest, field: string, id: number, data: any) {
    const allowedFields = ["workExperience", "education", "projects"];
    if (!allowedFields.includes(field)) {
      throw new BadRequestException(`Invalid field: ${field}`);
    }

    const userId = request.user?.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const resume = await this.resumeModel.findOne({ userId });

    if (resume && resume[field] && Array.isArray(resume[field])) {
      resume[field][id] = { ...resume[field][id], ...data };
      return resume.save();
    } else {
      throw new BadRequestException('Resume or field not found');
    }
  }

  async deleteResumeEntry(request: AuthenticatedRequest, field: string, id: number) {
    const allowedFields = ["workExperience", "education", "projects"];
    if (!allowedFields.includes(field)) {
      throw new BadRequestException(`Invalid field: ${field}`);
    }

    const userId = request.user?.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const resume = await this.resumeModel.findOne({ userId });

    if (resume && resume[field] && Array.isArray(resume[field])) {
      resume[field].splice(id, 1);
      return resume.save();
    } else {
      throw new BadRequestException('Resume or field not found');
    }
  }
}