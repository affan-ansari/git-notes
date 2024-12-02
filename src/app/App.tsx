import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import RootLayout from '../layouts/root';
import './App.scss';

export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
};
