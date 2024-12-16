import { Box } from '@mui/material';

import Profile from '../..//components/dashboard/profile';

import './profile-page.styles.scss';

const ProfilePage = () => {
    return (
        <Box className="profile-page__mainBox">
            <Profile />
        </Box>
    );
};

export default ProfilePage;
