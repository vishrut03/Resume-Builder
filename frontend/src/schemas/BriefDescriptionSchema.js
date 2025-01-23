import * as Yup from 'yup';

export const BriefDescriptionSchema = Yup.object().shape({
    briefDescription: Yup.string()
        .required('Brief Description is required')
        .min(10, 'Brief Description must be at least 10 characters')
        .max(100, 'Brief Description must be at most 100 characters'),
});