import { Box, IconButton } from '@mui/material';
import { GistActionsCellProps } from './gist-actions-cell.types';
import GitForkIcon from '../../../../../assets/svgComponents/GitForkIcon';
import GitStarIcon from '../../../../../assets/svgComponents/GitStarIcon';
import './gist-actions-cell.styles.scss';
const GistActionsCell = ({ row: gist, onFork, onStar }: GistActionsCellProps) => {
    return (
        <Box className="gist-actions-cell__btnBox">
            <IconButton onClick={() => onFork(gist)}>
                <GitForkIcon />
            </IconButton>
            <IconButton onClick={() => onStar(gist)}>
                <GitStarIcon />
            </IconButton>
        </Box>
    );
};

export default GistActionsCell;
