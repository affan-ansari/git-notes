import EmumbaIcon from '../../assets/svgComponents/EmumbaIcon';
import { Search } from '@mui/icons-material';
import { GithubAuth } from '../../firebase/init';
import { AppBar, Box, Button, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';

import './navbar.styles.scss';

export default function Navbar() {
    async function GithubLogIn() {
        const user = await GithubAuth();
        console.log('github user: ', user);
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
