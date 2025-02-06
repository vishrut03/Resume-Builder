import { IsEmail, IsOptional, IsString, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResumeDTO {
  @ApiProperty({ example: "John", description: "First name of the user" })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: "Doe", description: "Last name of the user" })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: "user@example.com", description: "Email address" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: "1234567890", description: "Phone number" })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: "https://linkedin.com/in/example", description: "LinkedIn profile" })
  @IsOptional()
  @IsString()
  linkedIn?: string;

  @ApiProperty({ example: "Software Engineer at XYZ", description: "Brief description" })
  @IsOptional()
  @IsString()
  briefDescription?: string;

  @ApiProperty({ example: [{ jobTitle: "Developer", companyName: "XYZ", startDate: "2020", endDate: "2022", responsibilities: "Developed features" }], description: "Work experience" })
  @IsOptional()
  @IsArray()
  workExperience?: Array<{ jobTitle: string; companyName: string; startDate: string; endDate: string; responsibilities: string }>;

  @ApiProperty({ example: [{ degreeName: "B.Tech", institutionName: "LNMIIT", yearOfGraduation: "2024", cgpa: "8.5" }], description: "Education details" })
  @IsOptional()
  @IsArray()
  education?: Array<{ degreeName: string; institutionName: string; yearOfGraduation: string; cgpa: string }>;

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

  @ApiProperty({ example: [{ certificateName: "AWS Certified", organisation: "Amazon", date: "2023" }], description: "Certificates" })
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
