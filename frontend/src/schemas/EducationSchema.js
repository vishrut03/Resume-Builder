import * as Yup from 'yup';

export const EducationSchema = Yup.object().shape({
  degreeName: Yup.string().required('Degree name is required'),
  institutionName: Yup.string().required('Institute name is required'),
  startDate: Yup.date()
    .required('Start date is required')
    .max(new Date(), 'Start date cannot be in the future'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date cannot be before start date'),
  cgpa: Yup.number()
    .typeError('CGPA/% must be a number')
    .required('CGPA is required')
    .min(0, "CGPA can't be less than 0")
    .max(100, "CGPA can't be more than 100"),
});
