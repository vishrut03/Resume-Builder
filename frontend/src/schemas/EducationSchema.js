import * as Yup from 'yup';

export const EducationSchema = Yup.object().shape({
    degeeName: Yup.string().required('Degree name is required'),
    instituteName: Yup.string().required('Institute name is required'),
    yearOfGraduation: Yup.number().min(1950).max(2050).required('Year of graduation is required'),
    cgpa: Yup.number().min(0).max(100).required('CGPA is required'),
});