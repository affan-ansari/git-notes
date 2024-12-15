import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import RootLayout from '../layouts/root';
import GistDetailPage from '../pages/gist-detail-page';

export const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="gists/:id" element={<GistDetailPage />} />
                </Route>
            </Routes>
        </div>
    );
};
