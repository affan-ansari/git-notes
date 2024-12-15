import { Box } from '@mui/material';

import GistDetail from '../../components/dashboard/gist-detail';

import './gist-detail-page.styles.scss';

const GistDetailPage = () => {
    return (
        <Box className="gist-detail-page__mainBox">
            <GistDetail />
        </Box>
    );
};

export default GistDetailPage;
