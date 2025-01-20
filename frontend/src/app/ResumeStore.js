import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useResumeStore = create(
  persist(
    (set) => ({
      // Step 1: Personal Details
      personalDetails: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        linkedIn: '',
      },

      // Step 2: Brief Description
      briefDescription: '',

      // Step 3: Work Experience
      workExperience: [
        {
          jobTitle: '',
          companyName: '',
          startDate: '',
          endDate: '',
          responsibilities: '',
        },
      ],

      // Step 4: Education
      education: [
        {
          degreeName: '',
          institutionName: '',
          yearOfGraduation: '',
          cgpa: '',
        },
      ],

      // Step 5: Projects
      projects: [
        {
          projectName: '',
          description: '',
          technologiesUsed: '',
          link: '',
        },
      ],

      // Step 6: Skills
      skills: [],

      // Step 7: Achievements
      achievements: [],

      // Step 8: Certificates
      certificates: [
        {
          certificateName: '',
          organization: '',
          date: '',
        },
      ],

      // Step 9: Coding Profiles
      codingProfiles: [
        {
          platform: '',
          profileLink: '',
        },
      ],

      // Step 10: Extra Curricular Activities
      extracurricularActivities: [
        {
          activityName: '',
          description: '',
          achievements: '',
        },
      ],

      // Update personal details
      setPersonalDetails: (field, value) =>
        set((state) => ({
          personalDetails: {
            ...state.personalDetails,
            [field]: value,
          },
        })),

      // Update brief description
      setBriefDescription: (value) => set({ briefDescription: value }),

      // Add/update work experience
      addWorkExperience: (newExperience) =>
        set((state) => ({
          workExperience: [...state.workExperience, newExperience],
        })),
        updateWorkExperience: (index, updatedExperience) =>
            set((state) => {
              const updatedWorkExperience = [...state.workExperience];
              updatedWorkExperience[index] = { ...updatedExperience }; // Update entire object
              return { workExperience: updatedWorkExperience };
            }),
          

      // Add/update education
      addEducation: (newEducation) =>
        set((state) => ({
          education: [...state.education, newEducation],
        })),
      updateEducation: (index, field, value) =>
        set((state) => {
          const updatedEducation = [...state.education];
          updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value,
          };
          return { education: updatedEducation };
        }),

      // Add/update project
      addProject: (newProject) =>
        set((state) => ({
          projects: [...state.projects, newProject],
        })),
      updateProject: (index, field, value) =>
        set((state) => {
          const updatedProjects = [...state.projects];
          updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: value,
          };
          return { projects: updatedProjects };
        }),

      // Add/update skill
      addSkill: (newSkill) =>
        set((state) => ({
          skills: [...state.skills, newSkill],
        })),
      
      deleteSkill: (index) =>
        set((state) => ({
          skills: state.skills.filter((_, i) => i !== index),
        })),

      // Add/update achievement
      addAchievement: (newAchievement) =>
        set((state) => ({
          achievements: [...state.achievements, newAchievement],
        })),

      deleteAchievement: (index) =>
          set((state) => ({
            achievements: state.achievements.filter((_, i) => i !== index),
          })),

      // Add/update certificate
      addCertificate: (newCertificate) =>
        set((state) => ({
          certificates: [...state.certificates, newCertificate],
        })),
      updateCertificate: (index, field, value) =>
        set((state) => {
          const updatedCertificates = [...state.certificates];
          updatedCertificates[index] = {
            ...updatedCertificates[index],
            [field]: value,
          };
          return { certificates: updatedCertificates };
        }),

      // Add/update coding profile
      addCodingProfile: (newProfile) =>
        set((state) => ({
          codingProfiles: [...state.codingProfiles, newProfile],
        })),

      // Add/update extra curricular activity
      addExtracurricularActivity: (newActivity) =>
        set((state) => ({
          extracurricularActivities: [
            ...state.extracurricularActivities,
            newActivity,
          ],
        })),
    }),
    {
      name: "resumeDetails", 
      getStorage: () => localStorage, 
    }
  )
);

export default useResumeStore;
