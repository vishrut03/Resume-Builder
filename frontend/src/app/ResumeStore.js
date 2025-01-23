import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { addResumeField, updateObjectField, updateSimpleField, updateArrayField, deleteResumeField } from './ResumeUtils';

const useResumeStore = create(
  persist(
    (set) => ({
      resume: {
        personalDetails: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          address: '',
          linkedIn: '',
        },
        briefDescription: '',
        workExperience: [
          {
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            responsibilities: '',
          },
        ],
        education: [
          {
            degreeName: '',
            institutionName: '',
            yearOfGraduation: '',
            cgpa: '',
          },
        ],
        projects: [
          {
            projectName: '',
            description: '',
            technologiesUsed: '',
            link: '',
          },
        ],
        skills: [],
        achievements: [],
        certificates: [
          {
            certificateName: '',
            organization: '',
            date: '',
          },
        ],
        codingProfiles: [
          {
            platform: '',
            profileLink: '',
          },
        ],
        extracurricularActivities: [
          {
            activityName: '',
            description: '',
            achievements: '',
          },
        ],
        customDetails: {
          heading: '',
          description: '',
        },
      },

      editSimpleField: (section, value) =>
        set((state) => ({
          resume: updateSimpleField(state.resume, section, value),
        })),

      editArrayField: (section, index, fieldKey, value) =>
        set((state) => ({
          resume: updateArrayField(state.resume, section, index, fieldKey, value),
        })),

        editObjectField: (section, modifiedObject) =>
          set((state) => ({
            resume: updateObjectField(state.resume, section, modifiedObject),
          })),

      addResumeEntry: (section, newEntry) =>
        set((state) => ({
          resume: addResumeField(state.resume, section, newEntry),
        })),

      deleteResumeEntry: (section, index) =>
        set((state) => ({
          resume: deleteResumeField(state.resume, section, index),
        })),
    }),


    {
      name: "resumeDetails", 
      getStorage: () => localStorage, 
    }
  )
);

export default useResumeStore;
