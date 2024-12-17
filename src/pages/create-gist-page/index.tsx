import { Box } from '@mui/material';

import CreateGist from '../../components/dashboard/create-gist';

import './create-gist-page.styles.scss';

const CreateGistPage = () => {
    return (
        <Box className="create-gist-page__mainBox">
            <CreateGist />
        </Box>
    );
};

export default CreateGistPage;
