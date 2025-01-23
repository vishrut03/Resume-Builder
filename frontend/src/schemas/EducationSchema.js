import * as Yup from 'yup';

export const EducationSchema = Yup.object().shape({
    degreeName: Yup.string().required('Degree name is required'),
    institutionName: Yup.string().required('Institute name is required'),
    yearOfGraduation: Yup
    .number().typeError('Year must be a number')
    .required('Year of graduation is required')
    .positive(`Can't be nagative`)
    .min(1950,'You are too old to create a resume')
    .max(2050,'You are too young to create a resume'),
    cgpa: Yup.number().typeError('CGPA/% must be a number').required('CGPA is required').min(0,"CGPA can't be less than 0").max(100,"CGPA can't be more than 100"),
});