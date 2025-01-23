import * as Yup from 'yup';

export const ProjectSchema = Yup.object().shape({
    projectName: Yup.string().required('Project name is required'),
    description: Yup.string().required('Description is required'),
    technologiesUsed: Yup.string().required('Technologies used are required'),
    link: Yup.string().required('Link is required'),
});