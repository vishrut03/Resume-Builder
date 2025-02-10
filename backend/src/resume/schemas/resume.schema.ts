import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Resume {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ type: Object, required: false })
  personalDetails?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    linkedIn?: string;
  };

  @Prop({ type: String, required: false })
  briefDescription?: string;

  @Prop({
    type: [
      {
        jobTitle: { type: String, required: true },
        companyName: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        responsibilities: { type: String, required: true },
      },
    ],
    required: false,
  })
  workExperience?: Array<{
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
  }>;

  @Prop({
    type: [
      {
        degreeName: { type: String, required: true },
        institutionName: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        cgpa: { type: String, required: true },
      },
    ],
    required: false,
  })
  education?: Array<{
    degreeName: string;
    institutionName: string;
    startDate: string;
    endDate: string;
    cgpa: string;
  }>;

  @Prop({
    type: [
      {
        projectName: { type: String, required: true },
        description: { type: String, required: true },
        technologiesUsed: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    required: false,
  })
  projects?: Array<{ projectName: string; description: string; technologiesUsed: string; link: string }>;

  @Prop({ type: [String], required: false })
  skills?: string[];

  @Prop({ type: [String], required: false })
  achievements?: string[];

  @Prop({
    type: [
      {
        certificateName: { type: String, required: true },
        organisation: { type: String , required: true },
        date: { type: String, required: true },
      },
    ],
    required: false,
  })
  certificates?: Array<{ certificateName: string; organisation: string; date: string }>;

  @Prop({
    type: [
      {
        platform: { type: String, required: true },
        profileLink: { type: String, required: true },
      },
    ],
    required: false,
  })
  codingProfiles?: Array<{ platform: string; profileLink: string }>;

  @Prop({
    type: Object,
    required: false,
  })
  customSection?: { heading: string; description: string };

  @Prop({
    type: [
      {
        activityName: { type: String, required: true },
        achievements: { type: String, required: false },
        description: { type: String, required: false },
      },
    ],
    required: false,
  })
  extraCurricularActivities?: Array<{ activityName: string; achievements: string }>;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
