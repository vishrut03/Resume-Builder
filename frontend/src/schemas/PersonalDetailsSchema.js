import * as Yup from 'yup';

export const PersonalDetailsSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string().required('Last name is required').min(2,'Last name must be at least 2 characters'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    address: Yup.string(),
    linkedIn: Yup.string()
});


