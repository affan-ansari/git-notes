import EmumbaIcon from '../../assets/svgComponents/EmumbaIcon';

import { Search } from '@mui/icons-material';
import { GithubAuth } from '../../firebase/init';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser, setCurrentUser } from '../dashboard/slices/authSlice';
import { AppBar, Box, Button, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';

import './navbar.styles.scss';

export default function Navbar() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    async function GithubLogIn() {
        try {
            const { user, credential } = await GithubAuth();
            dispatch(setCurrentUser({ user: user, token: credential?.accessToken }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box className="navbar__mainBox">
                    <Box className="navbar__logoBox">
                        <EmumbaIcon />
                        <Typography variant="h5">EMUMBA</Typography>
                    </Box>
                    <Box className="navbar__loginBox">
                        <TextField
                            label=""
                            placeholder="Search gists..."
                            className="navbar__searchBox"
                            size="small"
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
                        <Button
                            className="navbar__loginBtn"
                            variant="contained"
                            onClick={GithubLogIn}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
