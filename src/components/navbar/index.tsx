import AvatarButton from './avatar-button';
import EmumbaIcon from '../../assets/svgComponents/EmumbaIcon';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { GithubAuth } from '../../firebase/init';
import { setSearchQuery } from '../../slices/globalSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser, setCurrentUser } from '../dashboard/slices/authSlice';
import { AppBar, Box, Button, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';

import './navbar.styles.scss';

export default function Navbar() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    async function GithubLogIn() {
        try {
            const { user, credential } = await GithubAuth();
            toast.success('Logged in successfully');
            dispatch(setCurrentUser({ user: user, token: credential?.accessToken }));
        } catch (error) {
            const err = error as Error;
            toast.error(err.message);
        }
    }

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const tokenString = localStorage.getItem('token');
        if (userString && tokenString) {
            const user = JSON.parse(userString);
            dispatch(setCurrentUser({ user: user, token: tokenString }));
        }
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(debouncedSearchQuery);
            dispatch(setSearchQuery(debouncedSearchQuery));
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, debouncedSearchQuery]);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box className="navbar__mainBox">
                    <Box component={Link} to="/" className="navbar__logoBox">
                        <EmumbaIcon />
                        <Typography variant="h5">EMUMBA</Typography>
                    </Box>
                    <Box className="navbar__loginBox">
                        <TextField
                            label=""
                            placeholder="Search gists..."
                            className="navbar__searchBox"
                            size="small"
                            onChange={(e) => setDebouncedSearchQuery(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search className="navbar__searchIcon" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        {currentUser ? (
                            <AvatarButton />
                        ) : (
                            <Button
                                className="navbar__loginBtn"
                                variant="contained"
                                onClick={GithubLogIn}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
