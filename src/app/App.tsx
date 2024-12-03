import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import RootLayout from '../layouts/root';

export const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
};
