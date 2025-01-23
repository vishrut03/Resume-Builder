import * as Yup from 'yup';

export const WorkExperienceSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Job Title is required'),
    companyName: Yup.string().required('Company Name is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date(),
    responsibilities: Yup.string().required('Responsibilities are required'),
});