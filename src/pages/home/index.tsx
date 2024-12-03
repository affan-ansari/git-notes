import { Box } from '@mui/material';
import Dashboard from '../../components/dashboard';

import './home.styles.scss';

const Home: React.FC = () => {
    return (
        <Box className="dashboard__mainBox">
            <Dashboard />
        </Box>
    );
};
export default Home;
