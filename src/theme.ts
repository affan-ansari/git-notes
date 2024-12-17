import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#003B44',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#E30000',
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
});

export default theme;
