import { Box, CircularProgress } from '@mui/material';

const Spinner = ({ size = 20 }) => (
    <Box display="flex" alignItems="center" padding={1}>
        <CircularProgress size={size} />
    </Box>
);

export default Spinner;
