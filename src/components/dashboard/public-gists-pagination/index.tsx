import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { Box, Button } from '@mui/material';
import { IPublicGistsPaginationControlsProps } from './public-gists-pagination.types';

import './public-gists-pagination.styles.scss';

const PublicGistsPaginationControls: React.FC<IPublicGistsPaginationControlsProps> = ({
    page,
    variant,
    setPage,
}) => {
    return (
        <Box
            className="public-gists-pagination__mainBox"
            sx={{
                backgroundColor: variant === 'list' ? '#EFEFEF' : 'none',
            }}
        >
            <Button onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 1}>
                <NavigateBeforeIcon />
                Prev
            </Button>
            <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
                Next
                <NavigateNextIcon />
            </Button>
        </Box>
    );
};

export default PublicGistsPaginationControls;
