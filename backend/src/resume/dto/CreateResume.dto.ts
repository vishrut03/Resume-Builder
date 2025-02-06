import { IsOptional, IsString, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResumeDTO {
    @ApiProperty({ 
        example: { 
          firstName: "John", 
          lastName: "Doe", 
          email: "user@example.com", 
          phoneNumber: "1234567890", 
          linkedIn: "https://linkedin.com/in/example" 
        }, 
        description: "Personal details of the user" 
      })
    @IsOptional()
        personalDetails?: { 
        firstName?: string; 
        lastName?: string; 
        email?: string; 
        phoneNumber?: string; 
        linkedIn?: string; 
        };
      
  @ApiProperty({ example: "Software Engineer at XYZ", description: "Brief description" })
  @IsOptional()
  @IsString()
  briefDescription?: string;

  @ApiProperty({ example: [{ jobTitle: "Developer", companyName: "XYZ", startDate: "2021-02-01", endDate: "2025-02-26", responsibilities: "Developed features" }], description: "Work experience" })
  @IsOptional()
  @IsArray()
  workExperience?: Array<{ jobTitle: string; companyName: string; startDate: string; endDate: string; responsibilities: string }>;

  @ApiProperty({ example: [{ degreeName: "B.Tech", institutionName: "LNMIIT", startDate: "2021-02-01", endDate: "2025-02-26", cgpa: "8.5" }], description: "Education details" })
  @IsOptional()
  @IsArray()
  education?: Array<{ degreeName: string; institutionName: string; startDate: string; endDate: string; cgpa: string }>;

  @ApiProperty({ example: [{ projectName: "Resume Builder", description: "A full-stack project", technologiesUsed: "React, NestJS", link: "https://github.com" }], description: "Projects" })
  @IsOptional()
  @IsArray()
  projects?: Array<{ projectName: string; description: string; technologiesUsed: string; link: string }>;

  @ApiProperty({ example: ["JavaScript", "TypeScript"], description: "List of skills" })
  @IsOptional()
  @IsArray()
  skills?: string[];

  @ApiProperty({ example: ["Winner of Hackathon"], description: "Achievements" })
  @IsOptional()
  @IsArray()
  achievements?: string[];

  @ApiProperty({ example: [{ certificateName: "AWS Certified", organisation: "Amazon", date: "2025-02-26" }], description: "Certificates" })
  @IsOptional()
  @IsArray()
  certificates?: Array<{ certificateName: string; organisation: string; date: string }>;

  @ApiProperty({ example: [{ platform: "LeetCode", profileLink: "https://leetcode.com/user" }], description: "Coding profiles" })
  @IsOptional()
  @IsArray()
  codingProfiles?: Array<{ platform: string; profileLink: string }>;

  @ApiProperty({ 
    example: { heading: "Volunteer Work", description: "Taught underprivileged kids every weekend." }, 
    description: "Custom section added by the user" 
  })
  @IsOptional()
  customSection?: { heading: string; description: string };
  

  @ApiProperty({ example: [{ activityName: "Football", achievements: "Won college tournament" }], description: "Extra curricular activities" })
  @IsOptional()
  @IsArray()
  extraCurricularActivities?: Array<{ activityName: string; achievements: string }>;
}
