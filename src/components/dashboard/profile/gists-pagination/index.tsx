import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { IPublicGistsPaginationControlsProps } from './gists-pagination.types';

import './gists-pagination.styles.scss';

const GistsPaginationControls: React.FC<IPublicGistsPaginationControlsProps> = ({
    page,
    totalPages,
    setPage,
}) => {
    const [currentPage, setCurrentPage] = useState<number | undefined>(page);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentPage !== undefined) {
            if (totalPages && currentPage >= 1 && currentPage <= totalPages) {
                setPage(currentPage);
            }
        }
    };

    return (
        <Box className="gists-pagination__mainBox">
            <IconButton onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 1}>
                <NavigateBeforeIcon />
            </IconButton>
            <Box display={'flex'} alignItems={'center'} gap={1}>
                <Typography>Page</Typography>
                <TextField
                    size="small"
                    type="number"
                    value={currentPage}
                    onKeyDown={handleKeyDown}
                    sx={{ width: '55px', padding: 'none' }}
                    onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        setCurrentPage(isNaN(parsedValue) ? undefined : parsedValue);
                    }}
                    error={Boolean(
                        currentPage === undefined ||
                            currentPage < 1 ||
                            (totalPages && currentPage > totalPages)
                    )}
                />
                <Typography>of {totalPages}</Typography>
            </Box>
            <IconButton
                onClick={() => setPage((prevPage) => prevPage + 1)}
                disabled={page === totalPages}
            >
                <NavigateNextIcon />
            </IconButton>
        </Box>
    );
};

export default GistsPaginationControls;
