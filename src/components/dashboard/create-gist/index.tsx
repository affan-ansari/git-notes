import CodeMirror from '@uiw/react-codemirror';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { LoadingButton } from '@mui/lab';
import { createGist } from '../dashboard-service';
import { GistFormInputs } from './create-gist.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { gistSchema } from '../../../validations/validation';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import './create-gist.styles.scss';

const CreateGist = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(gistSchema),
        defaultValues: {
            description: '',
            public: true,
            files: [{ filename: '', content: '' }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'files',
    });

    const onSubmit: SubmitHandler<GistFormInputs> = async (data) => {
        const transformedFiles = data.files.reduce((acc, file) => {
            acc[file.filename] = { content: file.content };
            return acc;
        }, {} as { [filename: string]: { content: string } });

        const payload = {
            ...data,
            files: transformedFiles,
        };

        try {
            const response = await createGist(payload);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box>
            <Typography variant="h5">Create a New Gist</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label=""
                            placeholder="Git description..."
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            size="small"
                        />
                    )}
                />

                {/* Files Section */}
                <Box className="create-gist__filesBox">
                    {fields.map((field, index) => (
                        <Box key={field.id} mb={1}>
                            {/* Filename */}
                            <Box className="create-gist__filenameBox">
                                <Controller
                                    name={`files.${index}.filename`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="gist-create__filenameField"
                                            label=""
                                            placeholder="Filename including extention..."
                                            variant="outlined"
                                            size="small"
                                            error={!!errors.files?.[index]?.filename}
                                            helperText={errors.files?.[index]?.filename?.message}
                                        />
                                    )}
                                />
                                {fields.length > 1 && (
                                    <IconButton aria-label="delete" onClick={() => remove(index)}>
                                        <DeleteOutlineIcon color="error" />
                                    </IconButton>
                                )}
                            </Box>

                            {/* Content */}
                            <Controller
                                name={`files.${index}.content`}
                                control={control}
                                render={({ field }) => (
                                    <Box className="create-gist__codeEditor">
                                        <CodeMirror
                                            value={field.value}
                                            onChange={(value) => field.onChange(value)}
                                            basicSetup={{
                                                lineNumbers: true,
                                                rectangularSelection: false,
                                                drawSelection: false,
                                                highlightActiveLine: false,
                                                highlightActiveLineGutter: false,
                                            }}
                                        />
                                        {errors.files?.[index]?.content && (
                                            <Typography
                                                color="error"
                                                variant="body2"
                                                sx={{ mt: 1 }}
                                            >
                                                {errors.files[index]?.content?.message}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            />
                        </Box>
                    ))}
                </Box>
                <Box className="create-gist__actionBtnBox">
                    <Button
                        disableElevation
                        className="create-gist__addBtn"
                        variant="contained"
                        onClick={() => append({ filename: '', content: '' })}
                    >
                        Add File
                    </Button>
                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                        loadingPosition="center"
                        disableElevation
                        disabled={!isValid}
                    >
                        Create Gist
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateGist;
