import Grid from '@mui/material/Grid2';
import PublicGistCard from './public-gist-card';

import { Box, CircularProgress } from '@mui/material';
import { IPublicGistsCardsProps } from './public-gists-cards.types';

import './public-gists-cards.style.scss';

const PublicGistsCards: React.FC<IPublicGistsCardsProps> = ({ gists, loading }) => {
    return (
        <Grid container spacing={4} mb={2}>
            {loading ? (
                <Box className="public-gists-cards__loadingBox">
                    <CircularProgress />
                </Box>
            ) : (
                gists.map((gist) => (
                    <Grid key={gist.id} size={{ xl: 3, md: 4 }}>
                        <PublicGistCard gist={gist} />
                    </Grid>
                ))
            )}
            {}
        </Grid>
    );
};

export default PublicGistsCards;
