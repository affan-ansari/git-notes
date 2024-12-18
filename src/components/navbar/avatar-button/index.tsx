import useSWR from 'swr';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { GithubSignout } from '../../../firebase/init';
import { getUser } from '../../../components/dashboard/dashboard-service';
import { clearCurrentUser } from '../../../components/dashboard/slices/authSlice';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import './avatar-button.styles.scss';

const AvatarButton = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: currentUser } = useSWR('/user', getUser);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLElement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await GithubSignout();
        dispatch(clearCurrentUser());
        navigate('/');
    };
    return (
        <Box>
            <IconButton onClick={handleAvatarClick} size="medium">
                <Avatar src={currentUser?.avatar_url ?? 'https://avatar.iran.liara.run/public'} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box className="avatar-button__displayNameBox">
                    <Typography className="avatar-button__menuSubText" component={'div'}>
                        Signed in as
                    </Typography>
                    <Typography className="avatar-button__menuText">{currentUser?.name}</Typography>
                </Box>
                <Divider />
                <MenuItem onClick={() => navigate('/profile')}>Your gists</MenuItem>
                <MenuItem onClick={() => navigate('/profile/starred-gists')}>
                    Starred gists
                </MenuItem>
                <a
                    href={currentUser?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <MenuItem>Your GitHub profile</MenuItem>
                </a>
                <Divider />
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </Menu>
        </Box>
    );
};

export default AvatarButton;
