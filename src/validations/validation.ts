import * as yup from 'yup';

export const fileSchema = yup.object().shape({
    filename: yup.string().required('Filename is required'),
    content: yup.string().required('Content is required'),
});

export const gistSchema = yup.object().shape({
    description: yup.string(),
    public: yup.boolean().required(),
    files: yup
        .array()
        .of(fileSchema)
        .min(1, 'At least one file is required')
        .required('Files are required'),
});
