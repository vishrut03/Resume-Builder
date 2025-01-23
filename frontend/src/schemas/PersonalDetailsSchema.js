import * as Yup from 'yup';

export const PersonalDetailsSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string(),
    linkedIn: Yup.string()
});