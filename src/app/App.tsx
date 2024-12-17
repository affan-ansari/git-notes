import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import RootLayout from '../layouts/root';
import ProfilePage from '../pages/profile-page';
import GistDetailPage from '../pages/gist-detail-page';
import CreateGistPage from '../pages/create-gist-page';

export const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="gists/:id" element={<GistDetailPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="gists/new" element={<CreateGistPage />} />
                </Route>
            </Routes>
        </div>
    );
};
