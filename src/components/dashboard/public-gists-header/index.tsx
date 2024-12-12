import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { IPublicGistsHeaderProps } from './public-girsts-header.types';
import NotesIcon from '@mui/icons-material/Notes';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import './public-gists-header.styles.scss';

const PublicGistsHeader: React.FC<IPublicGistsHeaderProps> = ({ viewStyle, setViewStyle }) => {
    return (
        <Box className="public-gists-header__headingBox">
            <Typography variant="h4">Public Gists</Typography>
            <ButtonGroup>
                <Button
                    className={`public-gists-header__btnGroupBtn ${
                        viewStyle === 'card' ? 'public-gists-header__selectedViewBtn' : ''
                    }`}
                    onClick={() => setViewStyle('card')}
                >
                    <NotesIcon />
                </Button>
                <Button
                    className={`public-gists-header__btnGroupBtn ${
                        viewStyle === 'list' ? 'public-gists-header__selectedViewBtn' : ''
                    }`}
                    onClick={() => setViewStyle('list')}
                >
                    <FormatListBulletedIcon color="primary" />
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default PublicGistsHeader;
