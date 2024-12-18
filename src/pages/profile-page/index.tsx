import { Box } from '@mui/material';

import Profile from '../../components/dashboard/profile';

import './profile-page.styles.scss';

const ProfilePage = ({ getStarredGists = false }) => {
    return (
        <Box className="profile-page__mainBox">
            <Profile getStarredGists={getStarredGists} />
        </Box>
    );
};

export default ProfilePage;
