import useSWR from 'swr';
import GistsPaginationControls from './gists-pagination';
import PublicGistCard from '../public-gists-cards/public-gist-card';

import { useMemo, useState } from 'react';
import { getAuthenticatedGists, getUser } from '../dashboard-service';
import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material';

import './profile.styles.scss';

const Profile = () => {
    const PER_PAGE = 2;
    const [page, setPage] = useState(1);

    const { data: user, isLoading, isValidating } = useSWR('/user', getUser);
    const loading = isLoading || isValidating;

    const {
        data: gists,
        isLoading: isGistsLoading,
        isValidating: isGistsValidating,
    } = useSWR(`/gists?page=${page}&per_page=${PER_PAGE}`, getAuthenticatedGists);
    const gistsLoading = isGistsLoading || isGistsValidating;

    const totalGists = useMemo(() => {
        if (gists?.totalPages && gists.totalPages > 1) {
            return (gists.totalPages - 1) * PER_PAGE;
        }
    }, [gists?.totalPages]);

    if (loading) {
        return (
            <Box className="profile__loadingBox">
                <CircularProgress disableShrink />
            </Box>
        );
    }

    return (
        <Box className="profile__mainBox">
            <Box className="profile__details">
                <Avatar sx={{ width: 250, height: 250 }} alt={user?.name} src={user?.avatar_url} />
                <Typography className="profile__name">{user?.name}</Typography>
                <Button href={user?.html_url ?? '#'} target="_blank" variant="contained">
                    View GitHub Profile
                </Button>
            </Box>
            <Box className="profile__gistsBox">
                <Box display={'flex'} alignItems={'center'} gap={1}>
                    <Typography variant="h4">All Gists</Typography>
                    <Box className="profile__gistsCountBox">{totalGists}+</Box>
                </Box>

                {gistsLoading ? (
                    <Box className="profile__loadingBox">
                        <CircularProgress disableShrink />
                    </Box>
                ) : (
                    <>
                        {gists?.gistsData.map((gist) => (
                            <PublicGistCard key={gist.id} gist={gist} />
                        ))}
                        <GistsPaginationControls
                            page={page}
                            totalPages={gists?.totalPages}
                            setPage={setPage}
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Profile;
