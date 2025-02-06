import { Injectable } from '@nestjs/common';
import { Resume } from './schemas/resume.schema';

@Injectable()
export class ResumeService {
    private resume: Resume;

    create(resume: Resume) {
      this.resume = resume;
    }
}
